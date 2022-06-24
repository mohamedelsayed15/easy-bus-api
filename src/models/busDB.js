//--------------NPM Modules---------------------
const mongoose = require('mongoose')
const validator = require('validator')

// ==============Bus collection=======================
const busSchema = new mongoose.Schema({
    busNum:{type:String,required:true,trim:true,unique:true},
    fromLat:{type: Number,required:true},
    fromLon:{type: Number,required:true},
    toLat:{type: Number,required:true},
    toLon:{type: Number,required:true},
    tripEstimatedTime:{type:String,required:true,trim:true}
})
const Bus = mongoose.model('bus',busSchema)

module.exports= Bus