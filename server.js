const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const directorRoutes = require('./routes/directorRoutes');
const filmRoutes = require('./routes/flimRoutes');

const databaseUrl ="mongodb+srv://Nag-test:Test@mongodb.ga6r7.mongodb.net/FlimDatabase?retryWrites=true&w=majority";

const app = express();
mongoose.connect(databaseUrl,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(response=>{
        console.log("Connected to FlimDatabase",response.now());

}).catch(err=>{
    console.log("Problem while connecting to Flim Database=>",err.message);
});

app.use(bodyParser.json());
app.use(cors());
app.use('/',directorRoutes);
app.use('/',filmRoutes);

app.listen(5000,()=>{
    console.log("Database server is running on port 5000");
});
console.log("Wait to connect Database...");
