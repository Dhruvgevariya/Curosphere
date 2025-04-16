const mongoose = require("mongoose")
const Schema = mongoose.Schema
const clinicSchema = new Schema({
    clinicName:{
            type:String,
            required:true
        },
        stateId:{
            type:Schema.Types.ObjectId,
            ref:"State"
        },
        cityId:{
            type:Schema.Types.ObjectId,
            ref:"City"
        },
        timing:{
            type:String,
            required:true
        },
        address:{
            type:String
        },
        rating:{
            type:Number
        },
        about:{
            type:String
        },
        contactNum:{
            type:Number,
            required:true
        },
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        },
        pincode:{
            type:Number
        }, doctorId:{
            type:Schema.Types.ObjectId,
            ref:"doctor",
            unique:true
        },
    },{
        timestamps: true
    })
    
    module.exports = mongoose.model("clinic",clinicSchema)