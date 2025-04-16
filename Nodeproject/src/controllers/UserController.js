const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailUtil = require("../utils/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "secret"
const fs = require('fs');
const { uploadFileToCloudinary, deleteFileFromCloudinary } = require("../utils/CloudinaryUtil");

const loginUser = async (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;
  
    const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
    console.log(foundUserFromEmail);
 
    if (foundUserFromEmail != null) {
     
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch == true) {
        res.status(200).json({
          message: "login success",
          data: foundUserFromEmail,
        });
      } else {
        res.status(404).json({
          message: "invalid cred..",
        });
      }
    } else {
      res.status(404).json({
        message: "Email not found..",
      });
    }
  };

  const signup = async (req, res) => {
   
    try {
 
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const createdUser = await userModel.create(req.body);

      await mailUtil.sendingMail(createdUser.email,"welcome to Curosphere","this is welcome mail")
      res.status(201).json({
        message: "user created..",
        data: createdUser,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "error",
        data: err,
      });
    }
  };
  

const getAllUsers = async(req,res)=>{
  try{
    const users = await userModel.find().populate("roleId stateId cityId")
    res.status(200).json({
        message:"Users fetched Successfully",
        data:users
    })
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

const addUSers = async(req,res)=>{
  try{
    const saveUser = await userModel.create(req.body)
    res.status(201).json({
        message:"User Added Successfully",
        data:saveUser
    })
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

const deleteUser = async(req,res)=>{
  try{
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"USer Deleted Successfully",
        data:deletedUser
    })
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

const getUserById = async(req,res)=>{
  try{
    const userById = await userModel.findById(req.params.id)
    res.status(200).json({
        message:"USer fetched Successfully",
        data:userById
    })
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}


const addUSer1 = async(req,res)=>{
    try{
        const createdUSer = await userModel.create(req.body)
        res.status(201).json({
            message:"USer Created",
            data:createdUSer
        })
    }catch(err){
        res.status(500).json({
            message:"error",
            data:err
        })
    }
}


const forgetPassword = async(req,res)=>{
    const email = req.body.email;
    const foundUser = await userModel.findOne({email:email})

    if(foundUser){
        const token = jwt.sign(foundUser.toObject(),secret)
        console.log(token)

        const url = `http://localhost:5173/resetpassword/${token}`
        const mailContent = `<html>
                          <a href ="${url}">reset password</a>
                          </html>`;


        await mailUtil.sendingMail(foundUser.email,"reset password",mailContent)
        res.json({
          message:"Reset password link sent to email."
        })
    }else{
      res.json({
        message:"User not found."
      })
    }

} 

const resetPassword = async(req,res)=>{
  const token = req.body.token;
  const newPassword = req.body.password

  const userFromToken = jwt.verify(token, secret)
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(newPassword,salt)

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id,{
    password : hashedPassword
  })
  res.json({
    message:"Password Updated Successfully."
  })
}

const updateProfile = async (req, res) => {
  try {
    const { email, ...updateData } = req.body; // Remove email from update data
    let profilePicUrl = null;

    // Handle file upload if present
    if (req.file) {
      try {
        // Upload to Cloudinary
        const cloudinaryResponse = await uploadFileToCloudinary(req.file.path);
        profilePicUrl = cloudinaryResponse.secure_url;
        
        // Delete the temporary file
        // fs.unlinkSync(req.file.path);
        
        // Delete old image from Cloudinary if exists
        // const existingUser = await userModel.findById(req.params.id);
        // if (existingUser?.profilePic) {
        //   const publicId = getPublicIdFromUrl(existingUser.profilePic);
        //   await deleteFileFromCloudinary(publicId);
        // }
      } catch (uploadErr) {
        // Clean up the temporary file if Cloudinary upload fails
        // if (req.file?.path) {
        //   fs.unlinkSync(req.file.path);
        // }
        throw uploadErr;
      }
    }

    // Update the user data
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        ...(profilePicUrl && { profilePic: profilePicUrl })
      },
      { new: true, runValidators: true }
    ).populate("roleId stateId cityId");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      message: err.message || "Error updating profile",
      error: err.message
    });
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     const { email, ...updateData } = req.body; // Remove email from update data
//     let profilePicUrl = null;

//     // Handle file upload if present
//     if (req.file) {
//       // Upload new image to Cloudinary
//       const cloudinaryResponse = await uploadFileToCloudinary(req.file.path);
//       profilePicUrl = cloudinaryResponse.secure_url;
      
//       // Optionally: Delete old image from Cloudinary if exists
//       const existingUser = await userModel.findById(req.params.id);
//       if (existingUser?.profilePic) {
//         const publicId = existingUser.profilePic.split('/').pop().split('.')[0];
//         await deleteFileFromCloudinary(`user-profiles/${publicId}`);
//       }
//     }

//     // Prepare final update data
//     const finalUpdateData = {
//       ...updateData,
//       ...(profilePicUrl && { profilePic: profilePicUrl }) // Only include if new image was uploaded
//     };

//     // Update the user profile
//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.params.id,
//       finalUpdateData,
//       { new: true, runValidators: true }
//     ).populate("roleId stateId cityId");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       data: updatedUser
//     });
//   } catch (err) {
//     console.error("Profile update error:", err);
//     res.status(500).json({ 
//       message: "Error updating profile",
//       error: err.message 
//     });
//   }
// };

// Remove the separate uploadProfilePic function since it's now integrated
// const updateProfile = async (req, res) => {
//   try {
//       const { email, ...updateData } = req.body; // Remove email from update data
      
//       const updatedUser = await userModel.findByIdAndUpdate(
//           req.params.id,
        
//           updateData,
//           { new: true }
//       ).populate("roleId stateId cityId");
      
//       if (!updatedUser) {
//           return res.status(404).json({ message: "User not found" });
//       }

//       res.status(200).json({
//           message: "Profile updated successfully",
//           data: updatedUser
//       });
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// };

// const uploadProfilePic = async (req, res) => {
//   try {
//       if (!req.file) {
//           return res.status(400).json({ message: "No file uploaded" });
//       }

//       const updatedUser = await userModel.findByIdAndUpdate(
//           req.params.id,
//           { profilePic: req.file.path },
//           { new: true }
//       ).populate("roleId stateId cityId");

//       if (!updatedUser) {
//           return res.status(404).json({ message: "User not found" });
//       }

//       res.status(200).json({
//           message: "Profile picture uploaded successfully",
//           data: updatedUser
//       });
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// };

const getProfile = async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id)
          .populate("roleId stateId cityId");
          
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
          message: "Profile fetched successfully",
          data: user
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


module.exports ={
    getAllUsers,deleteUser,addUSers,getUserById,addUSer1,loginUser,signup,forgetPassword,resetPassword, updateProfile, getProfile
}