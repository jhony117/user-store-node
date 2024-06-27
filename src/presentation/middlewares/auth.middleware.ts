import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";


export class AuthMiddleware {

    static async validateJWT(req:Request,res:Response, next:NextFunction) {

        const authrization = req.header('Aithorization');
        if (!authrization) return res.status(401).json({error : 'Nor token provided'});
        if (!authrization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalud Barer token'});

        const token = authrization.split(' ').at(1) || '';


        try {

            const payload = await JwtAdapter.validateToken<{id : string}>(token);
            if(!payload) return res.status(401).json({error : 'Invalid token'});

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({error: 'Invalid token - user'});

            // todo : validar si el usuario est activo

            req.body.user = UserEntity.fromObject(user) ;

            next();

        }catch (e) {
                   
            console.log(e);
            res.status(500).json({error: 'Internal server error'});

        }

    }

}