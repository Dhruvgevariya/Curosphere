const mailer = require("nodemailer")

const sendingMail = async(to,subject,text)=>{
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"gevariyadhruv3@gmail.com",
            pass:"pdce neyt eodr hjei"
        }
    })


    const mailOptions = {
        from:"gevariyadhruv3@gmail.com",
        to: to,
        subject : subject,
        html: text
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)
    return mailOptions
}

module.exports ={
    sendingMail
}