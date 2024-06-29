//ruta a controlador y controlador a servicio

import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";




export class ProductService {

    // DI
    constructor(){}

    async createProduct(createProductDto:CreateProductDto) {

        const productExists = await ProductModel.findOne({name : createProductDto.name})
        if (productExists) throw CustomError.badRequest('Product alredy exist');

        try {
            const product = new ProductModel(
                     CreateProductDto
            )

            await product.save();

            return  product;

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }

    }

    async getCategories(paginationDyo:PaginationDto) {


        const {page , limit} = paginationDyo;
    
     try {
       
       const [total, products ] =await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
         .skip((page - 1) * limit) ///pagia 2
         .limit(limit)
          .populate('user', 'name email')
       ])

        return  {
            page : page, 
            limit : limit,
            total : total,
            next : `/api/products?page?${(page + 1)}&limit=${limit}`,
            prev : (page - 1 > 0) ? `/api/products?page?${(page +1)}&limit=${limit}` : null,
            

            products : products 
        };


        // return  allCategories.forEach(category => ({
        //     id:    category.id ,
        //     name:    category.name ,
        //      avaible :  category.available      
        // }));
        //    ;

        //? forEanch devuelve undefined



     } catch(e) {
            throw CustomError.internalServer('Internal server Error');
     }


   
   

        //[{}, {}, {}]
    }
}
