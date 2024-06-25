import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";


 

 
export class AuthService {
    //DI
    constructor() { }

     
    public async registerUser(registerUSerDtio:RegisterUserDto) {
      const existUser = await UserModel.findOne({email : registerUSerDtio.email})
      if(existUser) throw CustomError.badRequest('Email alredy exist');

      return 'todo ok !'
    }
}