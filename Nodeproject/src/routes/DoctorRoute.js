// const routes = require("express").Router()
// const doctorController = require("../controllers/DoctorController")

// routes.post("/signup",doctorController.signupDoctor)
// routes.post("/login",doctorController.loginDoctor)

// routes.get("/all",doctorController.getAllDoctors)
// routes.post("/add",doctorController.addDoctor)
// routes.get("/getprofile/:id",doctorController.getProfile)
// routes.delete("/delete/:id",doctorController.deleteDoctor)
// // routes.get("/get/:id",doctorController.getDoctorById)
// routes.post("/addwithfile",doctorController.addDoctorWithFile)
// routes.put("/updatedoctor/:id",doctorController.updateDoctor)
// routes.get("/getdoctorbyid/:id",doctorController.getDoctorById)

// module.exports = routes

// const routes = require("express").Router()
// const doctorController = require("../controllers/DoctorController")

// routes.post("/signup", doctorController.signupDoctor)
// routes.post("/login", doctorController.loginDoctor)

// routes.get("/all", doctorController.getAllDoctors)
// routes.post("/add", doctorController.addDoctor)
// routes.get("/getprofile/:userId", doctorController.getProfile)  // Changed to userId
// routes.delete("/delete/:id", doctorController.deleteDoctor)
// routes.post("/addwithfile", doctorController.addDoctorWithFile)
// routes.put("/updatedoctor/:id", doctorController.updateDoctor)
// routes.get("/getdoctorbyid/:id", doctorController.getDoctorById)

// module.exports = routes

const routes = require("express").Router();
const doctorController = require("../controllers/DoctorController");
const upload = require("../middlewares/UploadMiddleware");

routes.post("/signup", doctorController.signupDoctor);
routes.post("/login", doctorController.loginDoctor);
routes.get("/all", doctorController.getAllDoctors);
routes.post("/add", doctorController.addDoctor);
routes.get("/getprofile/:userId", doctorController.getProfile);
routes.delete("/delete/:id", doctorController.deleteDoctor);
routes.post("/addwithfile", upload.single('profilePic'), doctorController.addDoctorWithFile);
routes.put("/updatedoctor/:id", upload.single('profilePic'), doctorController.updateDoctor);
routes.get("/getdoctorbyid/:id", doctorController.getDoctorById);

module.exports = routes;