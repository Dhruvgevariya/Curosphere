const adminModel = require("../models/AdminModel")
const bcrypt = require("bcrypt")


const loginAdmin = async (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;
  
    const foundAdminFromEmail = await adminModel.findOne({ email: email }).populate("roleId");
    console.log(foundAdminFromEmail);
 
    if (foundAdminFromEmail != null) {
     
      const isMatch = bcrypt.compareSync(password, foundAdminFromEmail.password);
      if (isMatch == true) {
        res.status(200).json({
          message: "login success",
          data: foundAdminFromEmail,
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

  const signupAdmin = async (req, res) => {
   
    try {
 
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const createdAdmin = await adminModel.create(req.body);
      res.status(201).json({
        message: "Admin created..",
        data: createdAdmin,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "error",
        data: err,
      });
    }
  };
  

  module.exports={
    loginAdmin,signupAdmin
  }