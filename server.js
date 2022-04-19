const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

app.use(cors());
app.use(express.json());

const db = require('./config/keys').mongo_uri;

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connection established successfully');
});


app.use(passport.initialize());
require('./config/passport')(passport); 

const Users = require('./routes/users');
app.use('/users',Users);


const port = process.env.PORT || 5000;
app.listen(port, () => { 
    console.log('Server is up and running on ',port);
});