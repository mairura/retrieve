const express = require("express");
const app = express();
const cors = require("cors");
const mognoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser")
var path = require("path");
const assert = require('assert');

const PORT = 4000;

// View engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', '.ejs');

//Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Import user context
const User = require("./Model/user");
const { default: mongoose } = require("mongoose");

//Connect to DB
const db = process.env.MONGO_DB_URL;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB...")
})

//Routes
app.get("/", (req, res) => {
    res.send("Welcome Home")
})

app.post("/register", async (req, res) => {
    try{
        //Get user inputs
        const { name, age, nationality, phoneNumber } = req.body;
        console.log(req.body);

        //Create an instance in our DB
        const user = await User.create({
            name: name,
            username: username,
            age: age,
            nationality: nationality,
            phoneNumber: phoneNo
        })

        //Save user to DB
        user.save();

        //Return new user
        res.status(201).json(user);
        console.log("User created successfully")

    }catch(err){
        console.log("Error:", err.message)
    }
})

//Login user
app.post("/login", async (req, res) => {
    try{
        //Get user data
        const { username, phoneNumber} = req.body;

        //Validate if user exists
        const user = await User.findOne({username});

    }catch(err){
        console.log("Error", err.message)
    }
})

//Retrieve data from DB
// app.get("/user", async (req, res) => {

//     User.find({}, (err, data) => {
//         if(err) {
//             res.status(500).send(err.message);
//             console.log(err)
//         }else{
//             res.status(200).send(data)
//         }
//     })     
// })

//Fetch idividual user
app.get("/user", (req, res) => {
    

    User.findById("63481e5067d91d6cb532df19", function(err, data){
        if(err) res.json(err)
        else res.send(data);
    })
})



//Server listening to routes
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});