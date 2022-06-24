const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/easy-bus')

try{


   const mongo = process.env.MONGO_URL||'mongodb://127.0.0.1:27017/easy-bus'
   console.log(mongo)
   mongoose.connect(mongo)
   


}catch(e){

console.log(e)


}
