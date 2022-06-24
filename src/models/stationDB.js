const mongoose = require('mongoose')
const validator = require('validator')

// ==============Station collection=======================
const stationSchema = new mongoose.Schema({
    stationName:{type:String,trim:true,required:true,unique:true},
    Lat:{type: Number,required:true,unique:true},
    Lon:{type: Number,required:true,unique:true}
})
const Station = mongoose.model('station',stationSchema) 

module.exports = Station