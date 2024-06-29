import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor(
        public readonly name : string,
        public readonly aveilable : boolean,
        public readonly price : string,
        public readonly description : string,
        public readonly user : string, // ID
        public readonly category : string, // ID

    ) {    }

    static create(props : {[key :string] : any}) : [string ? , CreateProductDto?] {



        const { 
            name,
            aveilable,
            price,
            description,
            user,
            category,
        } =  props ;

        if(!name) return ['Missig name'];

        if(!user) return ['Missig user'];
        if(Validators.isMongoID(user)) return ['Invalid user ID'];
        if(!category) return ['Missig category'];
        if(Validators.isMongoID(category)) return ['Invalid Catorgory ID'];


        return [undefined, new CreateProductDto(
            name,
            !!aveilable,
            price,
            description,
            user,
            category,
            
        )]



    }
}

//domain no tiene que tener dependencias de 3rso 