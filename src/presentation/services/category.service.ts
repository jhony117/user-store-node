//ruta a controlador y controlador a servicio

import { CategoryModel } from "../../data";
import { CretaeCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";




export class CategoryService {

    // DI
    constructor(){}

    async createCategory(createCategoryDto:CretaeCategoryDto, user:UserEntity) {

        const categoryExists = await CategoryModel.findOne({name : createCategoryDto.name})
        if (categoryExists) throw CustomError.badRequest('Category alredy exist');

        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            })

            await category.save();

            return {
                id : category.id,
                name : category.name,
                aveilable : category.available,
            }

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }

    }

    async getCategories(paginationDyo:PaginationDto) {


        const {page , limit} = paginationDyo;
    
     try {
        // const total = await CategoryModel.countDocuments();
        // const allCategories = await CategoryModel.find()
        // .skip((page - 1) * limit) ///pagia 2
        // .limit(limit)
       // if(!allCategories) throw CustomError.internalServer('internala server error -- no categories model');
   
       const [total, categories ] =await Promise.all([
        CategoryModel.countDocuments(),
         CategoryModel.find()
         .skip((page - 1) * limit) ///pagia 2
         .limit(limit)
       ])

        return  {
            page : page, 
            limit : limit,
            total : total,
            next : `/api/categories?page?${(page + 1)}&limit=${limit}`,
            prev : (page - 1 > 0) ? `/api/categoirs?page?${(page +1)}&limit=${limit}` : null,
            

            categories : categories.map(category => ({
                id:    category.id ,
                 name:    category.name ,
                  avaible :  category.available    
                }))
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