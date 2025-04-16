// const clinicModel = require("../models/ClinicModel") 

 
 
 
 
//  const getAllClinic = async(req,res)=>{
//     try{
//       const clinic = await clinicModel.find().populate("stateId cityId")
//       res.status(200).json({
//           message:"Clinic fetched Successfully",
//           data:clinic
//       })
//     }catch(err){
//       res.status(500).json({ message: err.message });
//     }
//   }
  
//   const addClinic = async(req,res)=>{
//     try{
//       const saveClinic = await (await clinicModel.create(req.body)).populate("doctorId")
//       res.status(201).json({
//           message:"Clinic Added Successfully",
//           data:saveClinic
//       })
//     }catch(err){
//       res.status(500).json({ message: err.message });
//     }
//   }
  
//   const deleteClinic = async(req,res)=>{
//     try{
//       const deletedClinic = await clinicModel.findByIdAndDelete(req.params.id)
//       res.status(200).json({
//           message:"Clinic Deleted Successfully",
//           data:deletedClinic
//       })
//     }catch(err){
//       res.status(500).json({ message: err.message });
//     }
//   }

//   module.exports={
//     addClinic,deleteClinic,getAllClinic
//   }


const clinicModel = require("../models/ClinicModel");

// Get all clinics
const getAllClinic = async (req, res) => {
  try {
    const clinics = await clinicModel.find().populate("stateId cityId doctorId");
    res.status(200).json({
      success: true,
      message: "Clinics fetched successfully",
      count: clinics.length,
      data: clinics
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching clinics",
      error: err.message 
    });
  }
};

// Get clinics by doctorId
const getClinicsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required"
      });
    }

    const clinics = await clinicModel.find({ doctorId }).populate("stateId cityId");
    
    res.status(200).json({
      success: true,
      message: "Clinics fetched successfully by doctor ID",
      // count: clinics.length,
      data: clinics
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching clinics by doctor",
      error: err.message 
    });
  }
};

// Add new clinic
const addClinic = async (req, res) => {
  try {
    const newClinic = await clinicModel.create(req.body);
    const populatedClinic = await clinicModel.findById(newClinic._id)
      .populate("stateId cityId doctorId");
    
    res.status(201).json({
      success: true,
      message: "Clinic added successfully",
      data: populatedClinic
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Server error while adding clinic",
      error: err.message 
    });
  }
};

// Update clinic
const updateClinic = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const updates = req.body;

    const updatedClinic = await clinicModel.findByIdAndUpdate(
      clinicId,
      updates,
      { new: true, runValidators: true }
    ).populate("stateId cityId doctorId");

    if (!updatedClinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Clinic updated successfully",
      data: updatedClinic
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Server error while updating clinic",
      error: err.message 
    });
  }
};

// Delete clinic
const deleteClinic = async (req, res) => {
  try {
    const deletedClinic = await clinicModel.findByIdAndDelete(req.params.id);
    
    if (!deletedClinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Clinic deleted successfully",
      data: deletedClinic
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Server error while deleting clinic",
      error: err.message 
    });
  }
};

module.exports = {
  addClinic,
  deleteClinic,
  getAllClinic,
  getClinicsByDoctor,
  updateClinic
};