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

app.post("/user", async (req, res) => {
    try{
        //Get user inputs
        const { name, age, nationality, phoneNumber } = req.body;
        console.log(req.body);

        //Create an instance in our DB
        const user = await User.create({
            name: name,
            age: age,
            nationality: nationality,
            phoneNumber: phoneNumber
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

//Retrieve data from DB
app.get("/user", (req, res) => {
    const resultArray = [];
    mongoose.connect(db, function(err, db){
        // assert.equal(null, err);
        const profile = db.collection("userforms").find();
        console.log("User profile:", profile)
        profile.forEach(function(err, doc) {
        // assert.equal(null, err);
        resultArray.push(doc)
    }, function(){
        db.close();
        res.render("app", {items: resultArray})
    })
    })
})

//Server listening to routes
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});