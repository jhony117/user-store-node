import { regularExps } from "../../../config";


export class LoginUserDto {

    constructor(
        private email_ : string,
        private password_ : string
    ){}

    static login(object : {[key:string]:any}) : [string?, LoginUserDto?] {
 
        const {email , password} = object;

        if (!email) return ['Missing Email'] ; 
        if (!password) return ['Missig Password'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];


        return [undefined, new LoginUserDto(email, password)];



    }


    get email() {
     return this.email_;
    }

    get password() {
        return this.password_;
    }
}