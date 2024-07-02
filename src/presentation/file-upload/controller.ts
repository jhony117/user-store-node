import { Request, Response } from "express";
import { CretaeCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from '../services/category.service';
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {


    // DI
    constructor(
        private readonly fileUploadService:FileUploadService
    ){}


    private handleError = (error:unknown, res:Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error : error.message});
        }

        console.log(error);

        return res.status(500).json({error : 'Internla Server Error'})
    }

      uploadFile = async(req: Request, res:Response) => {

        // const files = req.files;

 
        const type = req.url.split('/').at(2) ?? '';
        // const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadSingle(file, `uploads/${type}`)
        .then(uploaded => res.json(uploaded))
        .catch(error => this.handleError(error, res));


    }

    uploadMultipleFIle = async(req: Request, res:Response) => {
        // const files = req.files;

        // const type = req.params.type; 
        const type = req.url.split('/').at(2) ?? '';
        const files = req.body.files as UploadedFile[];
       

    


        this.fileUploadService.uploadMultipleFile(files, `uploads/${type}`)
        .then(uploaded => res.json(uploaded))
        .catch(error => this.handleError(error, res));

       
    }
}

//exprezs recomienda no poner async await dento de los controladores

//query params -> siemrpe opcionales