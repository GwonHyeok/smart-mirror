import UserApplication from "../package/UserApplication";
import { Logger } from "./Logger";
import ApplicationLoader from "../loader/ApplicationLoader";
import UserApplicationInfo from "../package/UserApplicationInfo";
import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'

export class ApplicationProvider {

    userApplicationInfos: UserApplicationInfo[]

    async setUserApplicationInfos(userApplicationInfos) {
        this.userApplicationInfos = userApplicationInfos
    }

    async getUserApplicationInfos() {
        return this.userApplicationInfos
    }

    async findApplication(applicationName): Promise<UserApplicationInfo> {
        const filteredApp = this.userApplicationInfos.filter(
            userApplication => userApplication.name === applicationName
        )

        // Found Application
        if (filteredApp.length === 1) {
            Logger.info(`Application Found : ${applicationName}`)
            return filteredApp[0]
        }

        if (filteredApp.length == 0) {
            Logger.error(`Application Is No Found : ${applicationName}`)
        } else if (filteredApp.length > 1) {
            Logger.error(`Duplicate ApplicationName : ${applicationName}`)
        }

        return null
    }
    
}

const instance = new ApplicationProvider()
export default instance