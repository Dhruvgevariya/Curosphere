// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
// const userSchema = new Schema ({
//     firstName:{
//         type:String
//     },
//     lastName:{
//         type:String 
//     },
//     password:{
//         type:String
//     },
//     email:{
//         type:String,
//         unique:true
//     },
//     gender:{
//         enum :['male','female','other'],
//         type:String,
//         required:true
//     },
//     contactNum:{
//         type:Number,
//         required:true
//     },
//     bornyear:{
//         type:Number,
//         required:true
//     },
//     status:{
//         type:Boolean,
//         default:true
//     },
//     roleId:{
//         type:Schema.Types.ObjectId,
//         ref:"roles"
//     }, 
//     stateId:{
//         type:Schema.Types.ObjectId,
//         ref:"State"
//     },
//     cityId:{
//         type:Schema.Types.ObjectId,
//         ref:"City"
//     },
// },{timestamps:true});

// module.exports = mongoose.model("users",userSchema)

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema ({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true 
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    gender:{
        enum: ['male','female','other'],
        type:String,
        required:true
    },
    contactNum:{
        type:Number,
        required:true
    },
    bornyear:{
        type:Number,
        required:true
    },
    profilePic: {
        type: String
    },
    about: {
        type: String
    },
    status:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles",
        required: true
    }, 
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"State"
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"City"
    },
},{timestamps:true});

module.exports = mongoose.model("users",userSchema)