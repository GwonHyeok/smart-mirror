import UserApplication from "../UserApplication"
import { Logger } from "../../util/Logger"
import { mainWindowProvider } from "../../util/MainWindowProvider";

export default class PackageManager {

    constructor() {
        Logger.info('Initialize PackageManager')
    }

    async registerPackages(userApplications: UserApplication[]) {
        Logger.info(`Register Packages : ${userApplications.length}`)

        for (const userApplication of userApplications) {
            const { components, services } = userApplication.application

            // Register Plugins
            Logger.info('Register Plugins')
            mainWindowProvider.getMainWindow()
                .webContents.send('register-vue-plugin', userApplication)


            // Register Component
            for (const component of components) {
                component.register(userApplication)
            }

            // Register Service
            for (const service of services) {

            }
        }
    }

    async updatePackages(userApplications: UserApplication) {
        // console.log(userApplications)
    }

}