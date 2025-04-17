

// import React, { useState, useEffect } from "react";
// import {
//   People as PeopleIcon,
//   LocationOn as LocationIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Person as PersonIcon,
//   Cake as AgeIcon,
//   Info as InfoIcon,
//   ArrowBack as ArrowBackIcon,
//   Logout,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const PatientsList = ({ 
//   upcomingAppointments = [], 
//   doctorFullName, 
//   doctorSpecialization, 
//   doctorQualification, 
//   handleLogout 
// }) => {
//   const [uniquePatients, setUniquePatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const patientIds = new Set();
//         const patientsData = [];

//         // First get all unique patient IDs from appointments
//         upcomingAppointments.forEach(appointment => {
//           if (appointment.patientId && appointment.patientId._id) {
//             patientIds.add(appointment.patientId._id);
//           }
//         });

//         // Fetch details for each unique patient
//         for (const patientId of patientIds) {
//           try {
//             const response = await axios.get(`/user/get/${patientId}`, {
//               headers: { Authorization: `Bearer ${token}` }
//             });
            
//             const patient = response.data.data;
//             const patientAppointments = upcomingAppointments.filter(
//               appt => appt.patientId._id === patientId
//             );

//             patientsData.push({
//               id: patientId,
//               name: `${patient.firstName} ${patient.lastName}`,
//               avatar: `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`,
//               details: {
//                 ...patient,
//                 // Ensure address exists even if empty
//                 address: patient.address || {
//                   street: '',
//                   city: '',
//                   state: '',
//                   pincode: ''
//                 }
//               },
//               appointments: patientAppointments.map(appt => ({
//                 id: appt._id,
//                 time: `${new Date(appt.appointmentDate).toLocaleDateString()} at ${appt.appointmentTime}`,
//                 type: appt.complain || "General Checkup"
//               }))
//             });
//           } catch (err) {
//             console.error(`Error fetching patient ${patientId}:`, err);
//             // Continue with next patient even if one fails
//           }
//         }

//         setUniquePatients(patientsData);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load patient data");
//         console.error("Error in fetchPatientData:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (upcomingAppointments.length > 0) {
//       fetchPatientData();
//     } else {
//       setLoading(false);
//     }
//   }, [upcomingAppointments, token]);

//   if (loading) {
//     return (
//       <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-3">
//         <div className="alert alert-danger">
//           {error}
//           <button 
//             onClick={() => window.location.reload()} 
//             className="btn btn-sm btn-outline-danger ml-2"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 animate__animated animate__fadeIn">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center">
//           <Link to="/doctordashboard" className="mr-3 text-decoration-none">
//             <ArrowBackIcon className="text-primary" />
//           </Link>
//           <div>
//             <h4 className="font-weight-bold mb-0" style={{marginLeft:"20px", marginTop:"23px"}}>
//               My Patients
//             </h4>
//             <small className="text-secondary">
//               {doctorSpecialization}, {doctorQualification}
//             </small>
//           </div>
//         </div>
//         <div className="d-flex align-items-center">
//           <button
//             onClick={handleLogout}
//             type="submit"
//             className="btn btn-primary"
//           >
//             <Logout /> <span className="ml-1">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Card */}
//       <div className="row mb-4">
//         <div className="col-md-12">
//           <div className="card border-top border-primary border-4">
//             <div className="card-body d-flex align-items-center">
//               <div className="rounded-circle bg-primary-light p-2 mr-3">
//                 <PeopleIcon className="text-primary" style={{ fontSize: '2rem' }} />
//               </div>
//               <div>
//                 <h5 className="font-weight-bold mb-0">
//                   {uniquePatients.length} {uniquePatients.length === 1 ? 'Patient' : 'Patients'}
//                 </h5>
//                 <small className="text-secondary">Total patients with appointments</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Patients Cards */}
//       <div className="row">
//         {uniquePatients.length > 0 ? (
//           uniquePatients.map(patient => (
//             <div key={patient.id} className="col-md-6 col-lg-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center">
//                     <div
//                       className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mr-3"
//                       style={{ width: "40px", height: "40px" }}
//                     >
//                       {patient.avatar}
//                     </div>
//                     <h5 className="mb-0">{patient.name}</h5>
//                   </div>
//                   <span className="badge badge-primary">
//                     {patient.appointments.length} appointment{patient.appointments.length !== 1 ? 's' : ''}
//                   </span>
//                 </div>
                
//                 <div className="card-body">
//                   <div className="mb-3">
//                     <h6 className="font-weight-bold text-primary d-flex align-items-center">
//                       <InfoIcon className="mr-2" />
//                       Personal Information
//                     </h6>
//                     <div className="d-flex align-items-center mb-2">
//                       <EmailIcon className="mr-2 text-muted" />
//                       <span>{patient.details.email}</span>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <PhoneIcon className="mr-2 text-muted" />
//                       <span>{patient.details.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <PersonIcon className="mr-2 text-muted" />
//                       <span>{patient.details.gender || 'Not specified'}</span>
//                     </div>
//                     {patient.details.age && (
//                       <div className="d-flex align-items-center">
//                         <AgeIcon className="mr-2 text-muted" />
//                         <span>{patient.details.age} years old</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <h6 className="font-weight-bold text-primary d-flex align-items-center">
//                       <LocationIcon className="mr-2" />
//                       Address
//                     </h6>
//                     <div className="pl-4">
//                       <p className="mb-1">{patient.details.address.street || 'Not specified'}</p>
//                       <p className="mb-1">
//                         {patient.details.address.city}, {patient.details.address.state}
//                       </p>
//                       <p className="mb-0">{patient.details.address.pincode}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <h6 className="font-weight-bold text-primary">Upcoming Appointments</h6>
//                     <ul className="list-group list-group-flush">
//                       {patient.appointments.slice(0, 2).map(appointment => (
//                         <li key={appointment.id} className="list-group-item px-0 py-2">
//                           <small className="text-muted d-block">Appointment ID: {appointment.id}</small>
//                           <small className="d-block">{appointment.time}</small>
//                           <small className="text-muted d-block">Reason: {appointment.type}</small>
//                         </li>
//                       ))}
//                       {patient.appointments.length > 2 && (
//                         <li className="list-group-item px-0 py-2 text-center">
//                           <small className="text-primary">
//                             +{patient.appointments.length - 2} more appointment{patient.appointments.length - 2 !== 1 ? 's' : ''}
//                           </small>
//                         </li>
//                       )}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <div className="card shadow-sm">
//               <div className="card-body text-center py-5">
//                 <PeopleIcon style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
//                 <h4 className="mb-3">No Patients Found</h4>
//                 <p className="text-muted mb-4">
//                   You don't have any patients with scheduled appointments yet.
//                 </p>
//                 <Link to="/doctordashboard" className="btn btn-primary">
//                   Back to Dashboard
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientsList;


// import React, { useState, useEffect } from "react";
// import {
//   People as PeopleIcon,
//   LocationOn as LocationIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Person as PersonIcon,
//   Cake as AgeIcon,
//   Info as InfoIcon,
//   ArrowBack as ArrowBackIcon,
//   Logout,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const PatientsList = ({ 
//   upcomingAppointments = [], 
//   doctorFullName, 
//   doctorSpecialization, 
//   doctorQualification, 
//   handleLogout 
// }) => {
//   const [uniquePatients, setUniquePatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");
//   const doctorId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
        
//         const patientIds = new Set();
//         const patientsData = [];

//         // First get all unique patient IDs from appointments
//         upcomingAppointments.forEach(appointment => {
//           if (appointment.patientId && appointment.patientId._id) {
//             patientIds.add(appointment.patientId._id);
//           }
//         });

//         // Fetch details for each unique patient
//         for (const patientId of patientIds) {
//           try {
//             // Fetch patient details
//             const patientResponse = await axios.get(`/user/get/${patientId}`, {
//               headers: { Authorization: `Bearer ${token}` }
//             });
            
//             const patient = patientResponse.data.data;
            
//             // Get all appointments for this patient with this doctor
//             const patientAppointments = upcomingAppointments.filter(
//               appt => appt.patientId._id === patientId
//             );

//             // Calculate age from bornyear if available
//             const age = patient.bornyear ? new Date().getFullYear() - patient.bornyear : null;

//             patientsData.push({
//               id: patientId,
//               name: `${patient.firstName} ${patient.lastName}`,
//               avatar: `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`,
//               details: {
//                 email: patient.email,
//                 phone: patient.contactNum,
//                 gender: patient.gender,
//                 age: age,
//                 address: patient.address || {
//                   street: '',
//                   city: '',
//                   state: '',
//                   pincode: ''
//                 },
//                 profilePic: patient.profilePic
//               },
//               appointments: patientAppointments.map(appt => ({
//                 id: appt._id,
//                 time: `${new Date(appt.appointmentDate).toLocaleDateString()} at ${appt.appointmentTime}`,
//                 type: appt.complain || "General Checkup",
//                 status: appt.statusId || 'scheduled',
//                 clinic: appt.clinicId ? appt.clinicId.name : 'Unknown Clinic',
//                 reference: appt.reference,
//                 cancelReason: appt.cancelReason
//               }))
//             });
//           } catch (err) {
//             console.error(`Error fetching patient ${patientId}:`, err);
//             // Continue with next patient even if one fails
//           }
//         }

//         setUniquePatients(patientsData);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load patient data");
//         console.error("Error in fetchPatientData:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (upcomingAppointments.length > 0) {
//       fetchPatientData();
//     } else {
//       setLoading(false);
//     }
//   }, [upcomingAppointments, token]);

//   if (loading) {
//     return (
//       <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-3">
//         <div className="alert alert-danger">
//           {error}
//           <button 
//             onClick={() => window.location.reload()} 
//             className="btn btn-sm btn-outline-danger ml-2"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 animate__animated animate__fadeIn">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center">
//           <Link to="/doctordashboard" className="mr-3 text-decoration-none">
//             <ArrowBackIcon className="text-primary" />
//           </Link>
//           <div>
//             <h4 className="font-weight-bold mb-0" style={{marginLeft:"20px", marginTop:"23px"}}>
//               My Patients
//             </h4>
//             <small className="text-secondary">
//               {doctorSpecialization}, {doctorQualification}
//             </small>
//           </div>
//         </div>
//         <div className="d-flex align-items-center">
//           <button
//             onClick={handleLogout}
//             type="submit"
//             className="btn btn-primary"
//           >
//             <Logout /> <span className="ml-1">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Card */}
//       <div className="row mb-4">
//         <div className="col-md-12">
//           <div className="card border-top border-primary border-4">
//             <div className="card-body d-flex align-items-center">
//               <div className="rounded-circle bg-primary-light p-2 mr-3">
//                 <PeopleIcon className="text-primary" style={{ fontSize: '2rem' }} />
//               </div>
//               <div>
//                 <h5 className="font-weight-bold mb-0">
//                   {uniquePatients.length} {uniquePatients.length === 1 ? 'Patient' : 'Patients'}
//                 </h5>
//                 <small className="text-secondary">Total patients with appointments</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Patients Cards */}
//       <div className="row">
//         {uniquePatients.length > 0 ? (
//           uniquePatients.map(patient => (
//             <div key={patient.id} className="col-md-6 col-lg-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center">
//                     {patient.details.profilePic ? (
//                       <img 
//                         src={patient.details.profilePic} 
//                         alt={patient.name}
//                         className="rounded-circle mr-3"
//                         style={{ width: "40px", height: "40px", objectFit: "cover" }}
//                       />
//                     ) : (
//                       <div
//                         className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mr-3"
//                         style={{ width: "40px", height: "40px" }}
//                       >
//                         {patient.avatar}
//                       </div>
//                     )}
//                     <h5 className="mb-0">{patient.name}</h5>
//                   </div>
//                   <span className={`badge ${
//                     patient.appointments.some(a => a.status === 'scheduled') 
//                       ? 'badge-primary' 
//                       : 'badge-secondary'
//                   }`}>
//                     {patient.appointments.length} appointment{patient.appointments.length !== 1 ? 's' : ''}
//                   </span>
//                 </div>
                
//                 <div className="card-body">
//                   <div className="mb-3">
//                     <h6 className="font-weight-bold text-primary d-flex align-items-center">
//                       <InfoIcon className="mr-2" />
//                       Personal Information
//                     </h6>
//                     <div className="d-flex align-items-center mb-2">
//                       <EmailIcon className="mr-2 text-muted" />
//                       <span>{patient.details.email}</span>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <PhoneIcon className="mr-2 text-muted" />
//                       <span>{patient.details.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <PersonIcon className="mr-2 text-muted" />
//                       <span>{patient.details.gender || 'Not specified'}</span>
//                     </div>
//                     {patient.details.age && (
//                       <div className="d-flex align-items-center">
//                         <AgeIcon className="mr-2 text-muted" />
//                         <span>{patient.details.age} years old</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <h6 className="font-weight-bold text-primary d-flex align-items-center">
//                       <LocationIcon className="mr-2" />
//                       Address
//                     </h6>
//                     <div className="pl-4">
//                       <p className="mb-1">{patient.details.address.street || 'Not specified'}</p>
//                       <p className="mb-1">
//                         {patient.details.address.city}, {patient.details.address.state}
//                       </p>
//                       <p className="mb-0">{patient.details.address.pincode}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <h6 className="font-weight-bold text-primary">Appointments</h6>
//                     <ul className="list-group list-group-flush">
//                       {patient.appointments.map(appointment => (
//                         <li key={appointment.id} className="list-group-item px-0 py-2">
//                           <div className="d-flex justify-content-between align-items-start">
//                             <div>
//                               <small className="text-muted d-block">Appointment ID: {appointment.id}</small>
//                               <small className="d-block">{appointment.time}</small>
//                               <small className="text-muted d-block">Reason: {appointment.type}</small>
//                               {appointment.clinic && (
//                                 <small className="text-muted d-block">Clinic: {appointment.clinic}</small>
//                               )}
//                               {appointment.reference && (
//                                 <small className="text-muted d-block">Reference: {appointment.reference}</small>
//                               )}
//                             </div>
//                             <span className={`badge ${
//                               appointment.status === 'scheduled' ? 'badge-primary' :
//                               appointment.status === 'completed' ? 'badge-success' :
//                               appointment.status === 'cancelled' ? 'badge-danger' : 'badge-secondary'
//                             }`}>
//                               {appointment.status}
//                             </span>
//                           </div>
//                           {appointment.status === 'cancelled' && appointment.cancelReason && (
//                             <small className="text-danger d-block mt-1">Reason: {appointment.cancelReason}</small>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <div className="card shadow-sm">
//               <div className="card-body text-center py-5">
//                 <PeopleIcon style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
//                 <h4 className="mb-3">No Patients Found</h4>
//                 <p className="text-muted mb-4">
//                   You don't have any patients with scheduled appointments yet.
//                 </p>
//                 <Link to="/doctordashboard" className="btn btn-primary">
//                   Back to Dashboard
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientsList;


import React, { useState, useEffect } from "react";
import {
  People as PeopleIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Cake as AgeIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
  Logout,
  CalendarToday as CalendarIcon,
  ArrowForward as ArrowForwardIcon,
  DashboardCustomizeSharp,
  DashboardCustomize,
  DashboardSharp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientsList = ({ 
  doctorFullName, 
  doctorSpecialization, 
  doctorQualification, 
  handleLogout 
}) => {
  const [uniquePatients, setUniquePatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doctorId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch all appointments for this doctor
        const appointmentsRes = await axios.get(`/appointment/getall?doctorId=${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Process appointments to get unique patients with their details
        const patientsMap = new Map();

        for (const appointment of appointmentsRes.data.data) {
          const patientId = appointment.patientId._id;
          
          if (!patientsMap.has(patientId)) {
            try {
              // Fetch patient details
              const patientRes = await axios.get(`/user/get/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              
              const patient = patientRes.data.data;
              const age = patient.bornyear ? new Date().getFullYear() - patient.bornyear : null;
              
              patientsMap.set(patientId, {
                id: patientId,
                name: `${patient.firstName} ${patient.lastName}`,
                avatar: `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`,
                details: {
                  email: patient.email,
                  phone: patient.contactNum,
                  gender: patient.gender,
                  age: age,
                  
                  profilePic: patient.profilePic
                },
                appointments: []
              });
            } catch (err) {
              console.error(`Error fetching patient ${patientId}:`, err);
              // Skip this patient if we can't fetch their details
              continue;
            }
          }

          // Add appointment to the patient's record
          if (patientsMap.has(patientId)) {
            const patientData = patientsMap.get(patientId);
            patientData.appointments.push({
              id: appointment._id,
              date: new Date(appointment.appointmentDate),
              time: appointment.appointmentTime,
              type: appointment.complain || "General Checkup",
              status: appointment.statusId || 'scheduled',
              clinic: appointment.clinicId ? appointment.clinicId.name : 'Unknown Clinic',
              cancelReason: appointment.cancelReason
            });
          }
        }

        // Convert map to array and sort by most recent appointment
        const patientsArray = Array.from(patientsMap.values()).map(patient => ({
          ...patient,
          appointments: patient.appointments.sort((a, b) => b.date - a.date)
        }));

        setUniquePatients(patientsArray);
        setError(null);
      } catch (err) {
        setError("Failed to load patient data");
        console.error("Error in fetchPatientData:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [doctorId, token]);

  if (loading) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3">
        <div className="alert alert-danger">
          {error}
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-sm btn-outline-danger ml-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Link to="/doctordashboard" className="mr-3 text-decoration-none">
            <ArrowBackIcon className="text-primary" />
          </Link>
          <div>
            <h4 className="font-weight-bold mb-0" style={{marginLeft:"20px", marginTop:"22px"}}>
              My Patients
            </h4>
            <small className="text-secondary">
              {doctorSpecialization}, {doctorQualification}
            </small>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/doctordashboard">
          <button
            
            type="submit"
            className="btn btn-primary"
          >
            <DashboardSharp /> <span className="ml-1">Dashboard</span>
          </button>
          </Link>
        </div>
      </div>

      {/* Stats Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-top border-primary border-4">
            <div className="card-body d-flex align-items-center">
              <div className="rounded-circle bg-primary-light p-2 mr-3">
                <PeopleIcon className="text-primary" style={{ fontSize: '2rem' }} />
              </div>
              <div>
                <h5 className="font-weight-bold mb-0">
                  {uniquePatients.length} {uniquePatients.length === 1 ? 'Patient' : 'Patients'}
                </h5>
                <small className="text-secondary">Total patients with appointments</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Cards */}
      <div className="row">
        {uniquePatients.length > 0 ? (
          uniquePatients.map(patient => (
            <div key={patient.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {patient.details.profilePic ? (
                      <img 
                        src={patient.details.profilePic} 
                        alt={patient.name}
                        className="rounded-circle mr-3"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mr-3"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {patient.avatar}
                      </div>
                    )}
                    <h5 className="mb-0">{patient.name}</h5>
                  </div>
                  <span className={`badge ${
                    patient.appointments.some(a => a.status === 'scheduled') 
                      ? 'badge-primary' 
                      : 'badge-secondary'
                  }`} style={{color:"black"}}>
                    {patient.appointments.length} appointment{patient.appointments.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="font-weight-bold text-primary d-flex align-items-center">
                      <InfoIcon className="mr-2" />
                      Personal Information
                    </h6>
                    <div className="d-flex align-items-center mb-2">
                      <EmailIcon className="mr-2 text-muted" />
                      <span>{patient.details.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <PhoneIcon className="mr-2 text-muted" />
                      <span>{patient.details.phone || 'Not provided'}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <PersonIcon className="mr-2 text-muted" />
                      <span>{patient.details.gender || 'Not specified'}</span>
                    </div>
                    {patient.details.age && (
                      <div className="d-flex align-items-center">
                        <AgeIcon className="mr-2 text-muted" />
                        <span>{patient.details.age} years old</span>
                      </div>
                    )}
                  </div>

                  {/* {patient.details.address && (
                    <div className="mb-3">
                      <h6 className="font-weight-bold text-primary d-flex align-items-center">
                        <LocationIcon className="mr-2" />
                        Address
                      </h6>
                      <div className="pl-4">
                        {/* <p className="mb-1">{patient.details.address.street || 'Not specified'}</p> */}
                        {/* <p className="mb-1">
                          {patient.details.address.city}, {patient.details.address.state}
                        </p> */}
                        {/* <p className="mb-0">{patient.details.address.pincode}</p> */}
                      {/* </div>
                    </div>
                  )} 
                  */} 

                  <div className="mt-4">
                    <h6 className="font-weight-bold text-primary">Recent Appointments</h6>
                    <ul className="list-group list-group-flush">
                      {patient.appointments.slice(0, patient.appointments.length).map(appointment => (
                        <li key={appointment.id} className="list-group-item px-0 py-2">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <small className="text-muted d-block">
                                {appointment.date.toLocaleDateString()} at {appointment.time}
                              </small>
                              <small className="d-block">{appointment.type}</small>
                              {appointment.clinic && (
                                <small className="text-muted d-block">Clinic: {appointment.clinic}</small>
                              )}
                            </div>
                            <span className={`badge ${
                              appointment.status === 'scheduled' ? 'badge-primary' :
                              appointment.status === 'completed' ? 'badge-success' :
                              appointment.status === 'cancelled' ? 'badge-danger' : 'badge-secondary'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          {appointment.status === 'cancelled' && appointment.cancelReason && (
                            <small className="text-danger d-block mt-1">Reason: {appointment.cancelReason}</small>
                          )}
                        </li>
                      ))}
                      {/* {patient.appointments.length > 2 && (
                        <li className="list-group-item px-0 py-2 text-center">
                          <small className="text-primary">
                            +{patient.appointments.length - 2} more appointment{patient.appointments.length - 2 !== 1 ? 's' : ''}
                          </small>
                        </li>
                      )} */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <PeopleIcon style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }} />
                <h4 className="mb-3">No Patients Found</h4>
                <p className="text-muted mb-4">
                  You don't have any patients with scheduled appointments yet.
                </p>
                <Link to="/doctordashboard" className="btn btn-primary">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;