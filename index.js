const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const candidateRoutes = require('./routes/candidate')
const crypt = require('crypto')


const mongo_uri = process.env.MONGO_URI
const port = process.env.PORT
const app = express()

mongoose.connect(mongo_uri).then(()=>{
    console.log("connected mongo db")
}).catch((error)=>{
    console.log("Failed to connect", error)
})

// const random = Math.random()*10000000
// const randomStr = random.toString();
// console.log(random)
// const encrypted = crypt.createHash('SHA256').update(randomStr).digest('hex')
// console.log("encrypted", encrypted)

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    return res.status(200).json({message: "app working well"})
})

app.use('/api', userRoutes)
app.use('/api', candidateRoutes)





app.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
})