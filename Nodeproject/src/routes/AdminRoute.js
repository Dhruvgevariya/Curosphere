const routes = require("express").Router()
const adminController = require("../controllers/AdminController")

routes.post("/admin/signup",adminController.signupAdmin)
routes.post("/admin/login",adminController.loginAdmin)

module.exports = routes