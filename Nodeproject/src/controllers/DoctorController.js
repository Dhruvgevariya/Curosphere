

const doctorModel = require("../models/DoctorModel")
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path")
const cloudinaryUtil = require("../utils/CloudinaryUtil")
const { uploadFileToCloudinary, deleteFileFromCloudinary } = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
}).single("image")

const loginDoctor = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const foundDoctorFromEmail = await doctorModel.findOne({ email: email }).populate("roleId")
  console.log(foundDoctorFromEmail)
  if (foundDoctorFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundDoctorFromEmail.password)
    
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundDoctorFromEmail,
      })
    } else {
      res.status(404).json({
        message: "invalid cred..",
      })
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    })
  }
}

const signupDoctor = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    req.body.password = hashedPassword
    const createdDoctor = await doctorModel.create(req.body)
    res.status(201).json({
      message: "Doctor created..",
      data: createdDoctor,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().populate("roleId stateId cityId")
    res.status(200).json({
      message: "Doctors fetched Successfully",
      data: doctors
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const addDoctor = async (req, res) => {
  try {
    // Ensure userId is unique
    const existingDoctor = await doctorModel.findOne({ userId: req.body.userId })
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor profile already exists for this user"
      })
    }

    const saveDoctor = await doctorModel.create(req.body)
    res.status(201).json({
      message: "Doctor Added Successfully",
      data: saveDoctor
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete profile picture from Cloudinary if exists
    if (doctor.profilePic) {
      const publicId = doctor.profilePic.split('/').pop().split('.')[0];
      await deleteFileFromCloudinary(`doctor-profiles/${publicId}`);
    }

    await doctorModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctorById = await doctorModel.findById(req.params.id)
    if (!doctorById) {
      res.status(404).json({ message: "No Doctor found" })
    } else {
      res.status(200).json({
        message: "Doctor fetched Successfully",
        data: doctorById
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getProfile = async (req, res) => {
  try {
    const profile = await doctorModel
      .findOne({ userId: req.params.userId })
      .populate("stateId cityId")
    
    if (!profile) {
      return res.status(404).json({
        message: "No profile found",
        data: null
      })
    }

    res.status(200).json({
      message: "Profile found successfully",
      data: profile
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const addDoctorWithFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const existingDoctor = await doctorModel.findOne({ userId: req.body.userId });
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor profile already exists for this user"
      });
    }

    const cloudinaryResponse = await uploadFileToCloudinary(req.file.path);
    req.body.profilePic = cloudinaryResponse.secure_url;

    const saveDoctor = await doctorModel.create(req.body);
    res.status(201).json({
      message: "Doctor Saved Successfully",
      data: saveDoctor
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const updateDoctor = async (req, res) => {
//   try {
//     const existingDoctor = await doctorModel.findById(req.params.id);
//     if (!existingDoctor) {
//       return res.status(404).json({
//         message: "Doctor profile not found"
//       });
//     }

//     // Handle file upload if present
//     if (req.file) {
//       const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
//       req.body.profilePic = cloudinaryResponse.secure_url;
//     }

//     // Update the doctor profile
//     const updatedDoctor = await doctorModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).populate("stateId cityId");

//     res.status(200).json({
//       message: "Doctor Updated Successfully",
//       data: updatedDoctor
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error while updating doctor",
//       error: err.message
//     });
//   }
// };


const updateDoctor = async (req, res) => {
  try {
    const existingDoctor = await doctorModel.findById(req.params.id);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    let profilePicUrl = existingDoctor.profilePic;

    // Handle file upload if present
    if (req.file) {
      // Delete old image if exists
      if (existingDoctor.profilePic) {
        const publicId = existingDoctor.profilePic.split('/').pop().split('.')[0];
        await deleteFileFromCloudinary(`doctor-profiles/${publicId}`);
      }

      // Upload new image
      const cloudinaryResponse = await uploadFileToCloudinary(req.file.path);
      profilePicUrl = cloudinaryResponse.secure_url;
    }

    // Update the doctor profile
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profilePic: profilePicUrl },
      { new: true }
    ).populate("stateId cityId");

    res.status(200).json({
      message: "Doctor Updated Successfully",
      data: updatedDoctor
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while updating doctor",
      error: err.message
    });
  }
};
module.exports = {
  signupDoctor,
  loginDoctor,
  addDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
  addDoctorWithFile,
  getProfile,
  updateDoctor
}