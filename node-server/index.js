let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const path = require('path')

let server = express()

//DB Connection
async function dbConnect() {
    await mongoose.connect("mongodb+srv://ssssgggg550:Bhusan_Pass@cluster0.zzld01g.mongodb.net/reactConnect")
    console.log('db connected')
} 
dbConnect().catch(err => console.log(err))

'mongodb://localhost:27017/reactConnect'

//Schema
let userSchema = mongoose.Schema({
    username : String,
    password : String
})


//Model
let User = mongoose.model("User",userSchema)



//Server initialization
server.listen(8080, () => {
    console.log('server started')
})


//Middlewares
server.use(express.static(path.join(__dirname,'build')))
server.use(cors())
server.use(bodyParser.json())  //to use req.body and extract json



// HTTP Methods
server.post('/user', async (req,res) => {
    console.log(req.body)
    await User.create({
        username : req.body.username,
        password : req.body.password
    })

    let data = await User.find()
    res.json(data[data.length-1])
})


server.get('/user', async (req,res) => {
    let users = await User.find()
    console.log('get response sent')
    res.json(users)
})

server.delete('/user/:_id', async (req,res) => {
    let id = req.params._id
    await User.findOneAndDelete({_id : id})
   res.end()
})






