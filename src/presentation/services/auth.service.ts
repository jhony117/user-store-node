import { JwtAdapter, bcryotAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { compare } from 'bcryptjs';
import { EmailService } from "./email.service";


 

 
export class AuthService {
    //DI
    constructor(
      private readonly emailService:EmailService
    ) { }

     
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
        this.sendEmailValidatinLink(user.email);


        const {password, ...userEntity} =  UserEntity.fromObject(user);


        const token =await JwtAdapter.generateToken({if : user.id});
        if(!token) throw CustomError.internalServer('Error while creating JWT');

        return {
         user :  userEntity,
          token : token
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

      const{password, ...userEntity} = UserEntity.fromObject(user);

      const token =await JwtAdapter.generateToken({if : user.id});
      if(!token) throw CustomError.internalServer('Error while creating JWT');


 
 return {
        user : {userEntity},
        token : token,
      }

      } catch(e) {
        throw CustomError.internalServer(`${e}`);

      }


     

    }

    // could be a use-case
    private sendEmailValidatinLink =async(email :string)  => {

      const token = await JwtAdapter.generateToken({email});
      if(!token) throw CustomError.internalServer('Error getting Token');

      const link = `${envs.WEBSERVICE_URL}/auth/validate-email${token}`;
      const html = `
        <h1> Validate your email</h1>
        <p>Click on the followign link validate your email</p>
        <a href="${link}">Validate your email: ${email} </a>
      `;

      const options = {
        to : email,
        subject : 'Validate your email',
        htmlBody : html,
      }

      const isSent = await this.emailService.sendEmail(options);
      if(!isSent) throw CustomError.internalServer('Error sending Email');

      return true; // return true




    }
    public validateEmail = async(token:string) => {
        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid token');

        const {email} = payload as {email:string};
        if(!email) throw CustomError.internalServer('Email  not in token');

          const user = await UserModel.findOne({email});
          if(!user) throw CustomError.internalServer('Email not exist');

          user.emailValidated = true;
          await user.save();

          return true ;
    }

}