import { Request, Response } from "express";
import { CretaeCategoryDto, CustomError } from "../../domain";
import { CategoryService } from '../services/category.service';


export class CategoryController {


    // DI
    constructor(
        private readonly categoryService:CategoryService
    ){}


    private handleError = (error:unknown, res:Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error : error.message});
        }

        console.log(error);

        return res.status(500).json({error : 'Internla Server Error'})
    }

    createCategory = async(req: Request, res:Response) => {
        const [error, createCategoryDto] =   CretaeCategoryDto.create(req.body);
        if (error) return res.status(400).json();

        this.categoryService.createCategory(createCategoryDto!, req.body.user)
        .then(category => res.status(201).json(category))
        .catch(erro => this.handleError(error, res));



        // res.json(createCategoryDto);

    }

    getCategory = async(req: Request, res:Response) => {
        res.json('get Category');
//todo: termina esto
    }
}

//exprezs recomienda no poner async await dento de los controladores