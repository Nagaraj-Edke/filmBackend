const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name:{ type:String, required:true },
    age:{ type:Number, required:true },
    gender:{type:String, required:true},
    noOfAwards:{ type:Number, required:true }
});

const directorModel = mongoose.model("Directors_details",directorSchema);
module.exports = directorModel;