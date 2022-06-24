//---------------NPM modules--------------
const express = require('express')
//-------------Connection-----------------
require('./db/mongoose')
//------------database modules -----------
const Passenger = require('./models/passengerDB')
const Admin = require('./models/adminDB')
const Driver = require('./models/driverDB')
const Bus = require('./models/busDB')
const Station = require('./models/stationDB')
const Trip = require('./models/tripsDB')
//--------------port------------------
const port = process.env.PORT || 3000
//---------------------------------------
const app = express()
app.use(express.json())

app.post('/logIn/driver', async (req,res)=>{ 
    try{

       const email =  await Driver.findOne({email:req.body.email.toLowerCase()})

       const driver = await Driver.findOne({email:req.body.email.toLowerCase(),password: req.body.password})
       

            if(!email){
                return res.send({error: "user were not found"})
            }
            if ( req.body.password!=  driver.password ){
                return res.send({error:"password and email do not match"})
            }
            res.send(driver)
         }catch(e){res.send({error: `${e}`})}
    })

app.post('/logIn/admin',async (req,res)=>{

    try{
    const email =  await Admin.findOne({email:req.body.email.toLowerCase()})
    const admin = await Admin.findOne({email:req.body.email.toLowerCase(),password: req.body.password})
        if(!email){

            return res.send({error: "user were not found"})
        }
        if ( req.body.password != admin.password ){
            return res.send({error:"password and email do not match"})
        }
        res.send(admin)}catch(e){res.send({error: `${e}`})
    }
 })

app.post('/logIn/passenger',async (req,res)=>{
    
    try{
        const email =  await Passenger.findOne({email:req.body.email.toLowerCase()})
    const passenger = await Passenger.findOne({email:req.body.email.toLowerCase(),password: req.body.password})
    if(!email){
    
        return res.send({error : "user were not found"})
    }
    if ( req.body.password!= passenger.password ){
        return res.send({error:"password and email do not match"})
        
    }
    res.send(passenger)

    }catch(e){
        res.send({error: `${e}`})
    }
   
})

app.post('/signUp/admin',async(req,res)=>{ 

    
        try{

        const newAdmin = await new Admin(req.body)
        await newAdmin.save()
        res.send(newAdmin)
     }catch(e){
    
            res.status(400).send(e)
    }
})

app.post('/signUp/driver',async(req,res)=>{
      
    try{
        const newDriver = await new Driver(req.body)
        await newDriver.save()
        res.send(newDriver)
        }catch(e){
            res.status(400).send({error: `${e}`})
        }
    })

app.post('/signUp/passenger',async(req,res)=>{ 

    
    try{

        const newPassenger = await new Passenger(req.body)
        await newPassenger.save()
        res.send(newPassenger)
    }catch(e){
        res.status(400).send({error: `${e}`})
        
    }
})

app.post('/busCreate',(req,res)=>{

    const newBus = new Bus(req.body)
    try{
    newBus.save()
    res.send(newBus)
    }
    catch(e){
        res.status(400).send(e)
}
})

app.post('/stationCreate',(req,res)=>{
    const newStation = new Station(req.body)
     try{
         newStation.save()

         res.send(newStation)
    }
      catch(e){

        res.status(400).send(e)
     }
    })
app.post('/tripCreate',(req,res)=>{

    const newTrip = new Trip(req.body)
    try{
    newTrip.save()
    res.send(newTrip)
    }catch(e){
        res.status(400).send(e)
}
})
app.get('/trip/:area',async (req,res)=>{
    try{

    const trip = await Trip.find({"stationsINTrip.stationName": req.params.area.toLowerCase()})
        if(!trip){
            return res.send("area were not found")
        }
        
        res.send(trip[0]?.busesONTrip)
    }catch(e){
        res.send(e)
    }
    
})


app.get('/passengerReports',async(req,res)=>{
    try{
    const users = await Passenger.find()
    const map = users.map((report)=>{
        if(report.reports){
        return {reports:report.reports,user:report.email}}
    })
    res.send(map)

    }catch(e){
        res.status(400).send({error: `${e}`})

    }
})

app.post('/makeReport', async (req,res)=>{
    try{


    const report= await Passenger.findOne({email:req.body.email,password:req.body.password})
    report.reports.push(req.body)
    await report.save()
    res.send(report.reports)
}catch(e){
        res.status(400).send({error: `${e}`})
    }
    
})

app.post('/makeTripHistory', async (req,res)=>{

    try{
    const tripsHistory= await Passenger.findOne({email:req.body.email,password:req.body.password})
    if(!tripsHistory){res.send({error:"user were not found"})}
    tripsHistory.tripHistory.push({
        
        busNum:req.body.busNum,
        dateAndTime:req.body.dateAndTime,
        fromName:req.body.fromName,
        fromLat:req.body.fromLat,
        fromLon:req.body.fromLon,
        toName:req.body.toName,
        toLat:req.body.toLat,
        toLon:req.body.toLon
        })
    tripsHistory.save()
    res.send(tripsHistory.tripHistory)}
    catch(e){
        res.status(400).send({error: `${e}`})
    }
    
})

app.get('/getTripHistory',async (req,res)=>{


    try{
        const users = await Passenger.find({email:req.body.email,password:req.body.password})
        if(!users){res.send({error:"user were not found"})}
        const map = users.map((history)=>{
            return {tripHistory:history.tripHistory}
        })
        res.send(map)
    
        }catch(e){
            res.status(400).send({error: `${e}`})
        }

})

app.post('/change-password/:email/:newPassword',async (req,res)=>{
    try{

    const password =await Passenger.findOneAndUpdate(req.params.email,{password: req.params.newPassword},{new :true,runValidators:true})
    if(!password){

        return res.send({error: "no user were found"})
    }
    res.send({msg :"password has been reset"})
 }catch(e){
    console.log(e)
        res.send(e)
    }
})

app.get('/*',(req,res)=>{

    res.send("Request were not found")
})

app.listen(port , ()=>{
    console.log ('server is running')
})



const bcrypt = require('bcryptjs')

const myFunction = async ()=>
{
    const myPassword  = 'red123456789'
    const hashedPassword = await bcrypt.hash(myPassword,8)
    console.log (myPassword,
    `
${hashedPassword}
    `)

    const isMatch =await bcrypt.compare(myPassword,hashedPassword)
    console.log(isMatch)
}
myFunction() 