const mongoose = require('mongoose')
const validator = require('validator')

// ==============Driver collection=======================
const driverSchema = new mongoose.Schema({

    fName:{type: String, required: true, trim: true },
    lName:{type: String, required: true, trim: true },
    email:{type: String, required: true, trim: true,lowercase:true,unique:true,
    validator(value){
        if(!validator.isEmail(value)){throw new Error('invalid Email')}
    }},
    password:{type:String, required:true, trim:true, minlength:7, maxlength:15,
    validate(value) {
        if (value.toLowerCase().includes('password')) {throw new Error('Password cannot contain "password"')}
        if (value.toLowerCase().includes(this.fName || this.lName)) {throw new Error('Password can not contain your name')}
    }},
    phoneNumber:{type:String,required:true,unique:true},
    drivingLicense:{type:String, required:true,trim:true,unique:true},
    addressLocationLat:{type: Number},
    addressLocationLon:{type: Number},
    streetName:{type:String, trim:true}
})
const Driver = mongoose.model('driver',driverSchema)

module.exports = Driver