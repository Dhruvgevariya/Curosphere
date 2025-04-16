const routes = require('express').Router();
const cityController = require('../controllers/CityController');
routes.post("/add", cityController.addCity);    
routes.get("/all", cityController.getCities);
routes.delete("/delete/:id",cityController.deleteCity)
routes.get("/get/:id",cityController.getCityById)
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId)
module.exports = routes;