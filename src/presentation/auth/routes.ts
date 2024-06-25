import { Router } from 'express';
import { AuthController } from './constroller';
import { AuthService } from '../services/auth.service';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const authService = new AuthService();
    
    // Definir las rutas


    const constroller = new AuthController(authService);



       router.post('/login', constroller.loginUser);
       router.post('/register', constroller.registerUser);

       router.get('/vallidate-email/:token',constroller.validateEmail );

  

    return router;
  }


}

