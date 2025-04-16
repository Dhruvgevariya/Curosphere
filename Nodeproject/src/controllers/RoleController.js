const roleModel = require("../models/RoleModel")
const getAllRoles = async(req,res)=>{
    const roles = await roleModel.find()

    res.json({
        message:"role fetched successfully",
        data:roles
    })
};

const addRoles = async (req,res)=>{
    const savedRole = await roleModel.create(req.body)
    res.json({
        message:"Role Created",
        data:savedRole
    })
}

const deleteRole = async (req,res)=>{
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"Role Deleted Successfully",
        data:deletedRole
    })
}

const getRoleByID = async (req,res)=>{
    const foundRole = await roleModel.findById(req.params.id)
    res.json({
        message:"Role fetched Succesfully",
        data:foundRole
    })
}

module.exports = {
    getAllRoles,addRoles,deleteRole,getRoleByID
};