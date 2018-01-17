import UserApplication from "../package/UserApplication";
import { Logger } from "./Logger";
import ApplicationLoader from "../loader/ApplicationLoader";

export class ApplicationProvider {

    userApplications: UserApplication[]

    async setUserApplications(userApplications) {
        this.userApplications = userApplications
    }

    async getUserApplications() {
        return this.userApplications
    }

    async findApplication(applicationName) {
        const filteredApp = this.userApplications.filter(
            userApplication => userApplication.name === applicationName
        )

        // Found Application
        if (filteredApp.length === 1) {
            Logger.info(`Application Found : ${applicationName}`)
            return filteredApp[0]
        }

        if (filteredApp.length == 0) {
            Logger.error(`Application Is Not Found : ${applicationName}`)
        } else if (filteredApp.length > 1) {
            Logger.error(`Duplicate ApplicationName : ${applicationName}`)
        }

        return null
    }

    async findComponent(applicationName, componentName) {
        const app = await this.findApplication(applicationName)
        if (!app) {
            Logger.error(`Fail find component -- ${applicationName}/${componentName}`)
            return null
        }

        const components = app.application.components.filter(component => component.name === componentName)
        if (components.length === 1) {
            Logger.info(`Application Component Found : ${applicationName}`)
            
            // Return from User ApplicationCode
            const evaluateApp: UserApplication = eval(app.code)
            console.log(evaluateApp.application.components.filter(component => component.name === componentName)[0])
            return evaluateApp.application.components.filter(component => component.name === componentName)[0]
        }

        Logger.error(`Fail find component -- ${applicationName}/${componentName}`)
        return null
    }

}

const instance = new ApplicationProvider()
export default instance