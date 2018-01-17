import IRegister from "./register/IRegister";
import { Logger } from "../util/Logger";
import UserApplication from "./UserApplication";
import { mainWindowProvider } from "../util/MainWindowProvider"
import vueProvider from '../util/VueProvider'

import * as path from 'path'
import * as fs from 'fs'

export default class UserApplicationComponent implements IRegister {

    name: string

    register(userApplication: UserApplication) {
        const { nodeModule } = userApplication
        const moduleRootDirectoryPath = nodeModule.path

        // Read Component Script As Text
        Logger.info(`Register Component '${this.name}'`)
        mainWindowProvider.getMainWindow()
            .webContents
            .send('register-component', userApplication.name, this.name)
    }
}   