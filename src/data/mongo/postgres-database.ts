import mongoose from "mongoose";


interface Options {
    mongoUrl:string;
    dbName: string ;
}

export class MongoDataBase {
    static async connect(options: Options) {
            const {mongoUrl, dbName} = options;


            try{

                await mongoose.connect(mongoUrl, {
                    dbName:dbName
                });

                //console.log('connected');
                return true 

            } catch(e) {
                console.log('DB connnection error');
                throw e;
            }
    }
}