import NodeModule from './NodeModule'
import PackageInfo from './PackageInfo'

export class UserApplicationComponent {
    name: string
    path: string
}

export class UserApplicationService {

}

export default class UserApplication implements PackageInfo {
    name: string
    version: string
    description: string
    keywords: string[]
    nodeModule: NodeModule
    application: {
        components: UserApplicationComponent[],
        services: UserApplicationService[]
    }
}