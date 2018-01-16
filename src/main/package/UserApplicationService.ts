import IRegister from "./register/IRegister";

export default class UserApplicationService implements IRegister {
    
    register() {
        console.log('register service')
    }

}