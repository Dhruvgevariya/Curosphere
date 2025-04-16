const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/ClinicController');

// GET all clinics
router.get('/all', clinicController.getAllClinic);

// GET clinics by doctor ID
router.get('/doctor/:doctorId', clinicController.getClinicsByDoctor);

// POST new clinic
router.post('/add', clinicController.addClinic);

// PUT update clinic
router.put('/update/:id', clinicController.updateClinic);

// DELETE clinic
router.delete('/delete/:id', clinicController.deleteClinic);

module.exports = router;