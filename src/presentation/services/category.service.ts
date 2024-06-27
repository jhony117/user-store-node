//ruta a controlador y controlador a servicio

import { CategoryModel } from "../../data";
import { CretaeCategoryDto, CustomError, UserEntity } from "../../domain";




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

    async getCategories() {


     const allCategories = await CategoryModel.find({});
     if(!allCategories) throw CustomError.internalServer('internala server error -- no categories model');



     return allCategories.forEach(category => {
         category.id ,
          category.name ,
         category.available    
     });
   

        //[{}, {}, {}]
    }
}