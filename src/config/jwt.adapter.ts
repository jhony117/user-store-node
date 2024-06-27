import jwt from 'jsonwebtoken'
import { envs } from './envs';



const JWT_SEED = envs.JWT_SEED;

//parece que lo mejor seria cambiar los metodos por normale y entablar un cosntructor

export class JwtAdapter {

    // DI?

    static generateToken(payload:any, duration:string = '2h')  {

        return new Promise(resolve =>{

 jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {

    if (err) return resolve(null);

    return resolve(token);
        });
        })

       
    
    }

    static validateToken(token:string) {
          return new Promise((resolve) => {
            jwt.verify(token,JWT_SEED, (err, decoded) => {
                if(err) return resolve(null);

                resolve(decoded);
            } )
          });
    }
}