import IRegister from "./register/IRegister";
import { Logger } from "../util/Logger";
import UserApplication from "./UserApplication";
import { mainWindowProvider } from "../util/MainWindowProvider"
import * as path from 'path'
import * as fs from 'fs'

export default class UserApplicationComponent implements IRegister {

    name: string
    filePath: string

    register(userApplication: UserApplication) {
        const { nodeModule } = userApplication
        const moduleRootDirectoryPath = nodeModule.path
        const componentFilePath = path.join(moduleRootDirectoryPath, this.filePath)

        // Read Component Script As Text
        const componentText = String(fs.readFileSync(componentFilePath))

        Logger.info(`Register Component '${this.name}' : (${componentFilePath})`)
        mainWindowProvider.getMainWindow()
            .webContents
            .send('register-component', this.name, componentText)
    }
}