// const Appointment = require('../models/AppointmentModel');
// const { validationResult } = require('express-validator');

// /**
//  * @desc    Get all appointments
//  * @route   GET /api/appointments
//  * @access  Public/Private (adjust based on your needs)
//  */
// exports.getAllAppointments = async (req, res, next) => {
//   try {
//     // You can add query parameters for filtering
//     const { patientId, doctorId, statusId, date } = req.query;
    
//     let query = {};
    
//     // if (patientId) query.patientId = patientId;
//     if (doctorId) query.doctorId = doctorId;
//     // if (statusId) query.statusId = statusId;
//     if (date) {
//       const startOfDay = new Date(date);
//       startOfDay.setHours(0, 0, 0, 0);
      
//       const endOfDay = new Date(date);
//       endOfDay.setHours(23, 59, 59, 999);
      
//       query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
//     }
    
//     const appointments = await Appointment.find(query)
//       .populate('doctorId clinicId patientId')
//       .sort({ appointmentDate: 1, appointmentTime: 1 });
    
//     res.status(200).json({
//       success: true,
//       count: appointments.length,
//       data: appointments
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * @desc    Get single appointment
//  * @route   GET /api/appointments/:id
//  * @access  Public/Private
//  */
// exports.getAppointment = async (req, res, next) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id)
//       .populate('doctorId clinicId patientId');
    
//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: 'Appointment not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: appointment
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * @desc    Create new appointment
//  * @route   POST /api/appointments
//  * @access  Public/Private
//  */
// exports.createAppointment = async (req, res, next) => {
//   try {
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
    
//     const appointment = await Appointment.create(req.body);
    
//     // Populate the references after creation
//     const populatedAppointment = await Appointment.findById(appointment._id)
//     //   .populate('patientId doctorId statusId clinicId');
    
//     res.status(201).json({
//       success: true,
//       data: populatedAppointment
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * @desc    Update appointment
//  * @route   PUT /api/appointments/:id
//  * @access  Public/Private
//  */
// exports.updateAppointment = async (req, res, next) => {
//   try {
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true
//       }
//     ).populate('patientId doctorId clinicId');
    
//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: 'Appointment not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: appointment
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * @desc    Delete appointment
//  * @route   DELETE /api/appointments/:id
//  * @access  Public/Private
//  */
// exports.deleteAppointment = async (req, res, next) => {
//   try {
//     const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: 'Appointment not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * @desc    Cancel appointment
//  * @route   PATCH /api/appointments/:id/cancel
//  * @access  Public/Private
//  */
// exports.cancelAppointment = async (req, res, next) => {
//   try {
//     const { cancelReason } = req.body;
    
//     if (!cancelReason) {
//       return res.status(400).json({
//         success: false,
//         error: 'Please provide a cancellation reason'
//       });
//     }
    
//     const appointment = await Appointment.findById(req.params.id);
    
//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: 'Appointment not found'
//       });
//     }
    
//     // Assuming you have a statusId for 'cancelled'
//     appointment.statusId = 'cancelled'; // Replace with your actual cancelled status ID
//     appointment.cancelReason = cancelReason;
    
//     await appointment.save();
    
//     const populatedAppointment = await Appointment.findById(appointment._id)
//       .populate('patientId doctorId clinicId');
    
//     res.status(200).json({
//       success: true,
//       data: populatedAppointment
//     });
//   } catch (err) {
//     next(err);
//   }
// };


const Appointment = require('../models/AppointmentModel');
const Clinic = require('../models/ClinicModel')
const { validationResult } = require('express-validator');

/**
 * @desc    Get all appointments
 * @route   GET /api/appointments
 * @access  Public/Private (adjust based on your needs)
 */
exports.getAllAppointments = async (req, res, next) => {
  try {
    const { patientId, doctorId, statusId, date } = req.query;
    
    let query = {};
    
    if (patientId) query.patientId = patientId;
    if (doctorId) query.doctorId = doctorId;
    if (statusId) query.statusId = statusId;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }
    
    const appointments = await Appointment.find(query)
      .populate('doctorId clinicId patientId')
      .sort({ appointmentDate: 1, appointmentTime: 1 });
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single appointment
 * @route   GET /api/appointments/:id
 * @access  Public/Private
 */
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctorId clinicId patientId');
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new appointment
 * @route   POST /api/appointments
 * @access  Public/Private
 */
// // exports.createAppointment = async (req, res, next) => {
// //   try {
// //     // Validate request body
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({
// //         success: false,
// //         errors: errors.array()
// //       });
// //     }
    
// //     const { patientId, doctorId, appointmentDate, appointmentTime, complain } = req.body;
    
// //     // Check if the time slot is available
// //     const existingAppointment = await Appointment.findOne({
// //       doctorId,
// //       appointmentDate,
// //       appointmentTime,
// //       statusId: { $ne: 'cancelled' }
// //     });
    
// //     if (existingAppointment) {
// //       return res.status(400).json({
// //         success: false,
// //         error: 'This time slot is already booked'
// //       });
// //     }
    
// //     const appointment = await Appointment.create({
// //       patientId,
// //       doctorId,
// //       appointmentDate,
// //       appointmentTime,
// //       complain,
// //       statusId: 'scheduled', // Default status
// //       clinicId: 'default-clinic-id' // Replace with actual clinic ID logic
// //     });
    
// //     const populatedAppointment = await Appointment.findById(appointment._id)
// //       .populate('patientId doctorId');
    
// //     res.status(201).json({
// //       success: true,
// //       data: populatedAppointment
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };
// exports.createAppointment = async (req, res, next) => {
//   try {
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
    
//     const { patientId, doctorId, appointmentDate, appointmentTime, complain } = req.body;
    
//     // Check if the time slot is available
//     const existingAppointment = await Appointment.findOne({
//       doctorId,
//       appointmentDate,
//       appointmentTime,
//       statusId: { $ne: 'cancelled' }
//     });
    
//     if (existingAppointment) {
//       return res.status(400).json({
//         success: false,
//         error: 'This time slot is already booked'
//       });
//     }

//     // Fetch the doctor to get their associated clinic
//     const doctor = await Doctor.findById(doctorId).select('clinicId');
    
//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         error: 'Doctor not found'
//       });
//     }

//     if (!doctor.clinicId) {
//       return res.status(400).json({
//         success: false,
//         error: 'Doctor is not associated with any clinic'
//       });
//     }
    
//     const appointment = await Appointment.create({
//       patientId,
//       doctorId,
//       appointmentDate,
//       appointmentTime,
//       complain,
//       statusId: 'scheduled',
//       clinicId: doctor.clinicId // Use the doctor's clinicId
//     });
    
//     const populatedAppointment = await Appointment.findById(appointment._id)
//       .populate('patientId doctorId clinicId');
    
//     res.status(201).json({
//       success: true,
//       data: populatedAppointment
//     });
//   } catch (err) {
//     next(err);
//   }
// };

exports.createAppointment = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    console.log(req.body)
    const { patientId, doctorId, appointmentDate, appointmentTime, complain } = req.body;
    
    
    // Check if the time slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      statusId: { $ne: 'cancelled' }
    });
    
    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        error: 'This time slot is already booked'
      });
    }

    // Find the clinic that has this doctor
    const clinic = await Clinic.findOne({ doctorId });
    
    if (!clinic) {
      return res.status(404).json({
        success: false,
        error: 'No clinic found for this doctor'
      });
    }
    
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      complain,
      statusId: 'scheduled',
      clinicId: clinic._id // Use the found clinic's ID
    });
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patientId doctorId clinicId');
    
    res.status(201).json({
      success: true,
      data: populatedAppointment
    });
  } catch (err) {
    next(err);
  }
};
/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Public/Private
 */
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('patientId doctorId clinicId');
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete appointment
 * @route   DELETE /api/appointments/:id
 * @access  Public/Private
 */
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Cancel appointment
 * @route   PATCH /api/appointments/:id/cancel
 * @access  Public/Private
 */
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { cancelReason } = req.body;
    
    if (!cancelReason) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a cancellation reason'
      });
    }
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    appointment.statusId = 'cancelled';
    appointment.cancelReason = cancelReason;
    
    await appointment.save();
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patientId doctorId clinicId');
    
    res.status(200).json({
      success: true,
      data: populatedAppointment
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get available time slots for a doctor on a specific date
 * @route   GET /api/appointments/available-slots
 * @access  Public/Private
 */
exports.getAvailableTimeSlots = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;
    
    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        error: 'Doctor ID and date are required'
      });
    }
    
    // Get all appointments for the doctor on the specified date
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: new Date(date),
      statusId: { $ne: 'cancelled' }
    });
    
    // Define available time slots (in a real app, this might come from doctor's schedule)
    const allTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '13:00', '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00', '16:30', '17:00'
    ];
    
    // Get booked time slots
    const bookedSlots = appointments.map(app => app.appointmentTime);
    
    // Filter available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.status(200).json({
      success: true,
      data: availableSlots
    });
  } catch (err) {
    next(err);
  }
};