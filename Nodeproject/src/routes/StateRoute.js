const routes = require('express').Router();
const stateController = require('../controllers/StateController');
routes.post("/add", stateController.addState);
routes.get("/all", stateController.getAllStates);
routes.delete("/delete/:id",stateController.deleteState)
routes.get("/get/:id",stateController.getStateById)
module.exports = routes;