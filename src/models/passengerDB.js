//--------------NPM Modules---------------------
const mongoose = require('mongoose')
const validator = require('validator')

// ==============Passenger collection=======================
const passengerSchema = new mongoose.Schema({

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
    addressLocationLat:{type: Number},
    addressLocationLon:{type: Number},
    streetName:{type:String, trim:true},
    tripHistory:[{
        busNum:{type:String,required:true,trim:true},
        dateAndTime:{type:String,required:true,trim:true},
        fromName:{type:String,required:true,trim:true},
        fromLat:{type: Number,required:true},
        fromLon:{type: Number,required:true},
        toName:{type:String,required:true,trim:true},
        toLat:{type: Number,required:true},
        toLon:{type: Number,required:true}}],
    reports: [{
        reportDescription:{type:String,required:true,trim:true},
        reportDateTime:{type:String,required:true,trim:true}}],
    payments:[{
        paymentNum:{type:String,trim:true,required:true},
        paymentMethod:{type:String,trim:true,required:true},
        paymentValue:{type:Number,trim:true,required:true}}]
})
const Passenger = mongoose.model('passenger',passengerSchema)

module.exports = Passenger