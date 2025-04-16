// const express = require('express');
// const router = express.Router();
// const appointmentController = require('../controllers/AppointmentController');

// router.get('/getall', appointmentController.getAllAppointments);
// router.get('/get/:id', appointmentController.getAppointment);
// router.post('/add', appointmentController.createAppointment);
// router.put('/update/:id', appointmentController.updateAppointment);
// router.delete('/delete/:id', appointmentController.deleteAppointment);
// router.patch('/cancel/:id', appointmentController.cancelAppointment);

// module.exports = router;

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { check } = require('express-validator');

router.get('/getall', appointmentController.getAllAppointments);
router.get('/get/:id', appointmentController.getAppointment);
router.get('/available-slots', appointmentController.getAvailableTimeSlots);

router.post('/add', [
  check('patientId', 'Patient ID is required').notEmpty(),
  check('doctorId', 'Doctor ID is required').notEmpty(),
  check('appointmentDate', 'Appointment date is required').notEmpty(),
  check('appointmentTime', 'Appointment time is required').notEmpty(),
  check('complain', 'Complain/Reason is required').notEmpty()
], appointmentController.createAppointment);

router.put('/update/:id', appointmentController.updateAppointment);
router.delete('/delete/:id', appointmentController.deleteAppointment);
router.patch('/cancel/:id', appointmentController.cancelAppointment);

module.exports = router;