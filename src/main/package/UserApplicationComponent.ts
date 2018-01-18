import IRegister from "./register/IRegister";
import { Logger } from "../util/Logger";
import UserApplication from "./UserApplication";
import { mainWindowProvider } from "../util/MainWindowProvider"
import vueProvider from '../util/VueProvider'

import * as path from 'path'
import * as fs from 'fs'

export default class UserApplicationComponent {
    name: string
}   