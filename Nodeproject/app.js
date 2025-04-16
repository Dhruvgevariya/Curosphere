const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

const roleRoutes = require("./src/routes/RoleRoute")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoute")
app.use("/user",userRoutes)

const appointmentRoutes = require("./src/routes/AppointmentRoutes")
app.use("/appointment",appointmentRoutes)

const doctorRoutes = require("./src/routes/DoctorRoute")
app.use("/doctor",doctorRoutes)

const stateRoutes = require("./src/routes/StateRoute")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoute")
app.use("/city",cityRoutes)

const adminRoutes = require("./src/routes/AdminRoute")
app.use(adminRoutes)

const clinicRoutes = require("./src/routes/ClinicRoute")
app.use("/clinic",clinicRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/docon").then(()=>{
    console.log("database connected....")
})


app.listen(PORT,()=>{
    console.log("Hello world",PORT)
})