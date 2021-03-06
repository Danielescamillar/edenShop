const express = require("express");
const routes = require('./routes/edenShop'); // import the routes
require('dotenv').config();
const mongoose = require('mongoose'); //import mongoose
const helmet = require('helmet'); // add this line below the other import statements

// add this line below const app = express();
app.use(helmet());

// add this line below the helmet import statement
const compression = require('compression');

// add this below app.use(helmet())
app.use(compression()); //Compress all routes

const app = express();

app.use(express.json());

app.use('/', routes); //to use the routes
app.use('/uploads', express.static('./uploads'));

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})


//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);