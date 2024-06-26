import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required: [true, 'Name id required']
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique:true,
    },
    emailValidated : {
        type : Boolean,
        default:false,
    },
    password : {
        type :String ,
        required : [true, 'Password id required'],
    },
    img : {
        type :String ,
    },
    role : {
            type : [String],
            default  : ['USER_ROLE'] ,
            enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
});



export const UserModel = mongoose.model('User', userSchema);