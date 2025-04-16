const routes = require("express").Router()

const roleController= require("../controllers/RoleController")
routes.get("/roles",roleController.getAllRoles)
routes.post("/roles",roleController.addRoles)
routes.delete("/role/:id",roleController.deleteRole)
routes.get("/role/:id",roleController.getRoleByID)
//v-imp
module.exports = routes