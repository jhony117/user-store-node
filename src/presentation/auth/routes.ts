import { Router } from 'express';
import { AuthController } from './constroller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config/envs';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL,
    );
    const authService = new AuthService(emailService);
    
    // Definir las rutas


    const constroller = new AuthController(authService);



       router.post('/login', constroller.loginUser);
       router.post('/register', constroller.registerUser);

       router.get('/vallidate-email/:token',constroller.validateEmail );

  

    return router;
  }


}

