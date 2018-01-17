import NodeModule from './NodeModule'
import PackageInfo from './PackageInfo'
import UserApplicationComponent from './UserApplicationComponent';
import UserApplicationService from './UserApplicationService';

export default class UserApplication implements PackageInfo {
    name: string
    version: string
    description: string
    main: string
    keywords: string[]
    nodeModule: NodeModule
    application: {
        components: UserApplicationComponent[],
        services: UserApplicationService[]
    }
    code: string
}