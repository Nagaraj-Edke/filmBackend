const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    filmName:{type:String,required:true},
    id:{type:String,required:true},
    boxOffice:{type:Number,required:true},
    rating:{type:Number,required:true},
    director:{ type:String,
        // [ {type:String,required:true}],
        // type:[{
        //     name:{
        //         type:String,
        //         required:true
        //     } 
        // }],
        required:true
    }
    
});

const filmModel = mongoose.model("Flim_details",filmSchema);
module.exports = filmModel;