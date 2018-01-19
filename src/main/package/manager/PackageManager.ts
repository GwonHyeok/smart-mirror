import UserApplication from "../UserApplication"
import { Logger } from "../../util/Logger"
import { mainWindowProvider } from "../../util/MainWindowProvider";
import UserApplicationInfo from "../UserApplicationInfo";
import * as electron from "electron"
import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'
import UserApplicationComponent from "../UserApplicationComponent";

declare var __non_webpack_require__

export default class PackageManager {

    constructor() {
        Logger.info('Initialize PackageManager')
    }

    /**
     * Register Pakcages
     * 
     * @param userApplications 
     */
    async registerPackages(userApplications: UserApplicationInfo[]) {
        Logger.info(`Register Packages : ${userApplications.length}`)

        for (const userApplication of userApplications) {
            await this.registerComponents(userApplication)
            await this.registerPlugins(userApplication)
            await this.registerService(userApplication)
        }
    }

    /**
     * Register Components From Application Info
     * 
     * @param appInfo 
     */
    private async registerComponents(appInfo: UserApplicationInfo) {
        const componentsPath = appInfo.application.components
        const nodeModule = appInfo.nodeModule

        const { componentsCode, components } = await this.parseComponents(nodeModule.path, componentsPath)

        // Update User Application Info Component Code
        appInfo.code.components = componentsCode

        for (let userApplicationComponent of components) {
            await this.registerComponent(appInfo, userApplicationComponent)
        }
    }

    /**
     * Parse Components from module path and component path
     * 
     * @param contextPath 
     * @param componentsPath 
     */
    private async parseComponents(contextPath: string, componentsPath: string) {
        Logger.info(`Parse Components : contextPath ${contextPath}, componentsPath ${componentsPath}`)
        const filePath = path.join(contextPath, componentsPath)
        const readFile = util.promisify(fs.readFile)

        const componentsFile = await readFile(filePath)
        const componentsCode = String(componentsFile)
        const components = eval(componentsCode)

        return { componentsCode, components }
    }

    /**
     * Register Component -- Call Maindow register-component function
     * Check Splash.vue
     * 
     * @param app 
     * @param appComponent 
     */
    private async registerComponent(app: UserApplicationInfo, appComponent: UserApplicationComponent) {

        // Read Component Script As Text
        Logger.info(`Register Component '${appComponent.name}'`)
        mainWindowProvider.getMainWindow()
            .webContents
            .send('register-component', app.name, appComponent.name)
    }


    /**
     * Register Plugins
     * 
     * @param appInfo 
     */
    private async registerPlugins(appInfo: UserApplicationInfo) {
        const pluginsPath = appInfo.application.plugins
        const nodeModule = appInfo.nodeModule

        const { pluginsCode, plugins } = await this.parsePlugins(nodeModule.path, pluginsPath)

        // Update User Application Info Plugin Code
        appInfo.code.plugins = pluginsCode

        // Register Plugin
        await this.registerPlugin(appInfo)
    }

    /**
     * Parse Plugins
     */
    private async parsePlugins(contextPath: string, pluginsPath: string) {
        Logger.info(`Parse Plugins : contextPath ${contextPath}, pluginsPath ${pluginsPath}`)
        const filePath = path.join(contextPath, pluginsPath)
        const readFile = util.promisify(fs.readFile)

        const pluginsFile = await readFile(filePath)
        const pluginsCode = String(pluginsFile)
        const plugins = eval(pluginsCode)

        return { pluginsCode, plugins }
    }

    /**
     * Register Plugin
     * @param app 
     */
    private async registerPlugin(app: UserApplicationInfo) {

        // Register Plugin Script As Text
        Logger.info(`Register Plugins '${app.name}'`)
        mainWindowProvider.getMainWindow()
            .webContents
            .send('register-vue-plugin', app.name)
    }

    /**
     * Register Service
     * @param app 
     */
    private async registerService(app: UserApplicationInfo) {
        Logger.info(`Register Services '${app.application.services}'`)

        const path = `${app.nodeModule.path}/${app.application.services}`
        const userServices = __non_webpack_require__(path)
        userServices.forEach(userService => {
            const Service = userService.component
            const ServiceName = userService.name

            Logger.info(`Register Service '${ServiceName}'`)
            const service = new Service(electron)
        })
    }
}