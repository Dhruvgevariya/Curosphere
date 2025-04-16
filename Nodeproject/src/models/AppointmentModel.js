// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const appointmentSchema = new Schema({
//   patientId: {
//     type: Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   },
//   doctorId: {
//     type: Schema.Types.ObjectId,
//     ref: 'doctor',
//     required: true
//   },
// //   statusId: {
// //     type: Schema.Types.ObjectId,
// //     ref: 'AppointmentStatus',
// //     required: true,
// //     default: 'pending' // Assuming you have a default status
// //   },
//   appCreateDate: {
//     type: Date,
//     default: Date.now,
//     required: true
//   },
//   comment: {
//     type: String,
//     trim: true
//   },
//   clinicId: {
//     type: Schema.Types.ObjectId,
//     ref: 'clinic',
//     required: true
//   },
//   reference: {
//     type: String,
//     trim: true
//   },
//   complain: {
//     type: String,
//     trim: true
//   },
//   appointmentDate: {
//     type: Date,
//     required: true
//   },
//   appointmentTime: {
//     type: String,
//     required: true
//   },
//   cancelReason: {
//     type: String,
//     trim: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// },{
//             timestamps: true
//         })

        
//         module.exports = mongoose.model("appointment",appointmentSchema)  

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'doctor',
    required: true
  },
  statusId: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  appCreateDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: 'clinic',
    required: true
  },
  reference: {
    type: String,
    trim: true
  },
  complain: {
    type: String,
    trim: true,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  cancelReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
appointmentSchema.index({ doctorId: 1, appointmentDate: 1, appointmentTime: 1 });
appointmentSchema.index({ patientId: 1, appointmentDate: 1 });

module.exports = mongoose.model("appointment", appointmentSchema);