import UserApplication from "../UserApplication"
import { Logger } from "../../util/Logger"

export default class PackageManager {

    constructor() {
        Logger.info('Initialize PackageManager')
    }

    async registerPackages(userApplications: UserApplication[]) {
        Logger.info(`Register Packages : ${userApplications.length}`)

        for (const userApplication of userApplications) {
            const { components, services } = userApplication.application

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