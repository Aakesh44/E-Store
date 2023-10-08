const express = require('express')
const app = express()
const cors= require('cors')
const mongoose = require('mongoose')
const router = require('./routes/appRoute')


app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

async function main() {
    try {
        let local = "mongodb://127.0.0.1:27017/store"
        const atlas = "mongodb+srv://aakeshviswanathan:QwpOR9Q8OuRczk3N@cluster0.j0bdh3f.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(atlas,{useNewUrlParser: true,useUnifiedTopology: true})
        console.log(`connected to atlas db`);
    } catch (error) {
        console.error(error);
    }
}

main()
app.get('/',(req,res)=>res.json('server is running'))
app.use('/',router)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{console.log(`your app is running on ${PORT}`);})