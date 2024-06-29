import { Request, Response } from "express";
import { CreateProductDto, CretaeCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from '../services/category.service';
import { ProductService } from "../services/product.service";


export class ProductController {


    // DI
    constructor(
         private readonly productService:ProductService
    ){}


    private handleError = (error:unknown, res:Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error : error.message});
        }

        console.log(`${error}`);

        return res.status(500).json({error : 'Internla Server Error'})
    }

    createProduct = async(req: Request, res:Response) => {
        const [error, createProductDto] =   CreateProductDto.create({
            ...req.body,
        user : req.body.user.id});
        if (error) return res.status(400).json();

        this.productService.createProduct(createProductDto!)
        .then(products => res.status(201).json(products))
        .catch(error => this.handleError(error, res));


 

        return  res.json('create Products');

    }

    getProducts = async(req: Request, res:Response) => {
   
        const {page = 1, limit =10 } =  req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({error});




            this.productService.getCategories(paginationDto!)
            .then(products => res.json(products))
            .catch(error => this.handleError(error, res));
    }
}

//exprezs recomienda no poner async await dento de los controladores

//query params -> siemrpe opcionales