import NodeModule from './NodeModule'
import PackageInfo from './PackageInfo'
import UserApplicationComponent from './UserApplicationComponent';
import UserApplicationService from './UserApplicationService';

export default class UserApplicationInfo implements PackageInfo {
    name: string
    version: string
    description: string
    main: string
    keywords: string[]
    nodeModule: NodeModule
    application: {
        components: string,
        services: string,
        plugins: string
    }
    plugins: string
    code: {
        components: string
        plugins: string
    } = { components: null, plugins: null }

}