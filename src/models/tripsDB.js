//--------------NPM Modules---------------------
const mongoose = require('mongoose')
const validator = require('validator')

// ==============Trip collection=======================
const tripsSchema = new mongoose.Schema({
    stationsINTrip:[{
        stationName:{type:String,trim:true,required:true,unique:true},
        Lat:{type: Number,required:true,unique:true},
        Lon:{type: Number,required:true,unique:true}
    }],
    busesONTrip:[{
        busNum:{type:String,required:true,trim:true,unique:true},
        tripEstimatedTime:{type:String,required:true,trim:true},
        stationFrom: {type:String,trim:true,required:true,unique:true},
        stationTo: {type:String,trim:true,required:true,unique:true},
        DriverName:{type:String,required:true,trim:true}
        
    }]
    
})
const Trip = mongoose.model('trip',tripsSchema)
module.exports = Trip
