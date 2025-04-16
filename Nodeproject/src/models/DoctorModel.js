// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
// const doctorSchema = new Schema({
//     firstName:{
//         type:String
//     },
//     lastName:{
//         type:String 
//     },
//     specialization:{
//         type:String,
//         required:true
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
//     qualification:{
//         type:String,
//         required:true
//     },
//     experience:{
//         type:Number
//     },
//     profilePic:{
//         type:String
//     },
//     about:{
//         type:String
//     },
//     contactNum:{ 
//         type:Number,
//         required:true
//     }
// },{
//     timestamps: true
// })

// module.exports = mongoose.model("doctor",doctorSchema)

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: "State"
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: "City"
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    profilePic: {
        type: String
    },
    about: {
        type: String
    },
    contactNum: { 
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("doctor", doctorSchema)