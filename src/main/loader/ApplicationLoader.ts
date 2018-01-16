import { Logger } from '../util/Logger'
import NodeModule from '../package/NodeModule'
import UserApplication from '../package/UserApplication'
import PackageInfo from '../package/PackageInfo'

import gmPath from 'global-modules'
import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import UserApplicationComponent from '../package/UserApplicationComponent';

export default class ApplicationLoader {

    private globalModulePath: string

    // Promisify Functions
    private readFile = util.promisify(fs.readFile)
    private readDirectory = util.promisify(fs.readdir)

    constructor() {
        Logger.info('Initialize ApplicationLoader')

        // Initialize Global Module Path
        this.globalModulePath = gmPath
        Logger.info(`Set Global Module Paths : ${this.globalModulePath}`)
    }

    /**
     * 유저가 설치한 어플리케이션을, 로드한다
     */
    async loadUserApplicatioin(): Promise<UserApplication[]> {
        Logger.info('Load User Applicatioin')
        const installedNodeModules = (await Promise.all([this.getGlobalModules(), this.getLocalUserModules()]))
            .reduce((previousValue, currentValue): NodeModule[] => {
                previousValue.push(...currentValue)
                return previousValue
            })

        // Find User Applications from Global, Local Node Modules
        Logger.info(`Check All Modules : ${installedNodeModules.length}`)
        const smartMirrorApplications: UserApplication[] = []
        for (const nodeModule of installedNodeModules) {
            const smartMirrorApplication = await this.checkSmartMirrorApplication(nodeModule)
            if (smartMirrorApplication) {
                // Node Module To UserApplication
                smartMirrorApplications.push(smartMirrorApplication)
            }
        }

        Logger.info(`Found User Application : ${smartMirrorApplications.length}`)
        Logger.debug(`Application List`)
        smartMirrorApplications.forEach(app => Logger.debug(`${app.name}(${app.version})`))

        return smartMirrorApplications
    }

    /**
     * Get Global Scope Node Modules
     * ( ex: /usr/local/lib/node_modules)
     */
    private async getGlobalModules(): Promise<Array<NodeModule>> {
        Logger.info('Get Global Modules')

        // Global Application Load Fail
        if (!this.globalModulePath) {
            Logger.error('Global Module Load Fail')
        }

        return await this.getModules(this.globalModulePath)
    }

    /**
     * Get Local Node Modules (node_modules)
     */
    private async getLocalUserModules(): Promise<Array<NodeModule>> {
        Logger.info('Get Local Modules')
        return await this.getModules('node_modules')
    }

    /**
     * Get node module file lsit from directory path
     *
     * @param directory directory path
     */
    private async getModules(directory: string): Promise<Array<NodeModule>> {
        Logger.info(`Get Modules : ${directory}`)
        const directoryList = await this.readDirectory(directory)

        return directoryList
            .map(moduleDirectory => path.join(directory, moduleDirectory))
            .map(modulePath => new NodeModule(modulePath))
    }

    /**
     * Check This Module is Smart Mirror Application
     *
     * @param nodeModule node module
     */
    private async checkSmartMirrorApplication(nodeModule: NodeModule): Promise<UserApplication> {
        if (!nodeModule.path) {
            Logger.warn(`path is not set. Skip This Module -- ${nodeModule.path}`)
            return null
        }

        let userApplication: UserApplication = null
        let packageInfo: PackageInfo = null

        let hasSmartMirrorAppKeyword = false

        // Check it has package.json in node module
        const packageJsonPath = path.join(nodeModule.path, 'package.json')
        const isExistPackageJson = fs.existsSync(packageJsonPath)

        // skip this module if package.json is not found
        if (!isExistPackageJson) {
            Logger.warn(`package.json is not found. Skip This Module -- ${nodeModule.path}`)
            return null
        }

        // Parse Package Info
        try {
            packageInfo = await this.parsePackageInfo(packageJsonPath)
            const { name, version, keywords } = packageInfo

            // It has Smart Mirror App Keywords (aka smart-mirror)
            if (keywords) hasSmartMirrorAppKeyword = keywords.indexOf('smart-mirror') !== -1

            // Smart Mirror App Keyword
            if (!hasSmartMirrorAppKeyword) return null
        } catch (error) {
            Logger.error(`${error} : ${nodeModule.path}`)
            return null
        }

        // Parse Manifest
        try {
            // Check it has manifest.json in this module
            const manifestJsonPath = path.join(nodeModule.path, 'manifest.json')
            const isExistManifestJson = await fs.existsSync(manifestJsonPath)

            // skip this module if manifest.json is not found
            if (!isExistManifestJson) {
                Logger.warn(`manifest.json is not found. Skip This Module -- ${nodeModule.path}`)
                return null
            }

            userApplication = await this.parseManifest(manifestJsonPath)
        } catch (error) {
            Logger.error(`${error} : ${nodeModule.path}`)
            return null
        }

        const isSmartMirrorApp = hasSmartMirrorAppKeyword
        if (isSmartMirrorApp) {
            Object.assign(userApplication, packageInfo)
            userApplication.nodeModule = nodeModule
            userApplication.application.components.map(
                value => new UserApplicationComponent()
            )
            return userApplication
        }

        return null
    }

    /**
     * Parse package.json from file path
     *
     * @param packageJsonPath packageJsonPath
     */
    private async parsePackageInfo(packageJsonPath: string): Promise<PackageInfo> {
        const file = await this.readFile(packageJsonPath)
        return JSON.parse(String(file))
    }

    /**
     * Parse manifest.json from file path
     *
     * @param manifestJsonPath manifestJsonPath
     */
    private async parseManifest(manifestJsonPath: string): Promise<UserApplication> {
        const file = await this.readFile(manifestJsonPath)
        const userApplicationJSON: UserApplication = JSON.parse(String(file))

        let userApplication = Object.assign(new UserApplication(), userApplicationJSON)
        if (userApplication.application && userApplication.application.components) {
            userApplication.application.components = userApplication.application.components.map(componentJson => {
                const component = new UserApplicationComponent()
                component.name = componentJson.name
                component.filePath = componentJson.filePath
                return component
            })
        }

        return userApplication
    }

}