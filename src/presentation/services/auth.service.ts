import { bcryotAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { compare } from 'bcryptjs';


 

 
export class AuthService {
    //DI
    constructor() { }

     
    //registerUser deveria ser un case de usp , en arquitecura limpia al 100
    public async registerUser(registerUserDtio:RegisterUserDto) {
      const existUser = await UserModel.findOne({email : registerUserDtio.email})
      if(existUser) throw CustomError.badRequest('Email alredy exist');

      try {
        const user =  new UserModel(registerUserDtio);

        // Encriptar la contraseña

        user.password = bcryotAdapter.hash(registerUserDtio.password)

        await user.save();


        // JET <---- para mantener la atentuficacion del usuario

        // Email de confirmacion

        const {password, ...userEntity} =  UserEntity.fromObject(user);


        return {
         user :  userEntity,
          token : 'ABC'
        };

      } catch(e) {
        throw CustomError.internalServer(`${e}`);

      }

      //grabar en BF usa try catch

      // return 'todo ok !'
    }

    public async loginUser(loginUserDto:LoginUserDto) { 

   

      try {

           //Find para verificar si existe

     
 
      const user = await UserModel.findOne({email : loginUserDto.email});

      if(!user) throw CustomError.notFound('Incorrect email or password ');


      //isMAtch... bcrypt ... compare(123456, DPWFEPOFVEM)


      const isMatching = bcryotAdapter.compare(loginUserDto.password, user.password)

      if(!isMatching) throw CustomError.notFound('Incorrect email or password ');

      const{password, ...userEntity} = UserEntity.fromObject(user)

 return {
        user : {userEntity},
        token : 'ABC',
      }

      } catch(e) {
        throw CustomError.internalServer(`${e}`);

      }


     

    }

}