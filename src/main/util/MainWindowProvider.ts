import { Logger } from "./Logger";
import { BrowserWindow } from 'electron'

class MainWindowProvider {

    mainWindow: BrowserWindow

    constructor() {
        Logger.info('Initialize MainWindow Provider')
    }

    createMainWindow(options) {
        this.updateMainWindow(new BrowserWindow(options))
    }

    updateMainWindow(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
    }

    getMainWindow(): BrowserWindow {
        return this.mainWindow
    }

}

export const mainWindowProvider = new MainWindowProvider()