import mongoose, { Schema } from 'mongoose';


const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required: [true, 'Name id required'],
        unique: true,
    }, 
    available : {
        type : Boolean,
        default:false,
    },
    price :  {
type: Number,
default : 0,
    },

    user: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required :true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref : 'Categoty',
        required : true
    }
});


productSchema.set('toJSON', {
    virtuals :true,
    versionKey : false,
    transform: function(doc, ret, options) { //no usar funcnion de flcha
         delete ret._id;
    },
})


export const ProductModel = mongoose.model('Product', productSchema);