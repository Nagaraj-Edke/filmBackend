const { Router } = require('express');
const express = require('express');
const { db } = require('../model/filmModel');
const filmModel = require('../model/filmModel');

var route = express.Router();

route.post('/film/addFilm',async(req,res)=>{

    try{
        let filmName = req.body.filmName;
        filmName= new RegExp(["^", filmName, "$"].join(""), "i");

        let films = await filmModel.find({});

        let isFilmNameExist = false;

        for(let i=0;i<films.length;i++){
            if((films[i].filmName).search(filmName) ==0){
                isFilmNameExist = true;
                break;
            }
        }
        if(isFilmNameExist){
            res.json({isFilmNameExist:isFilmNameExist})
        }
        else{
            let film = new filmModel(req.body);
            let data = await film.save();
            res.json({msg:"Successfully!!! added data",isFilmNameExist:isFilmNameExist,data:data}); 
        }
        console.log(isFilmNameExist);
        // console.log(film);
        // console.log(req.body.filmName);
        // let data = await film.save();
        // res.json({msg:"Successfully!!! added data",data:film});
    }
    catch(error){
        res.status(400).json({errMsg:error.message});
    }

})
route.delete('/film/:filmName',async(req,res)=>{
    let filmName = req.params.filmName;
    console.log(filmName);
    var regex = new RegExp(["^", filmName, "$"].join(""), "i");
    try {
        var findnDel = await filmModel.deleteOne({filmName:regex})
        res.json({msg:"OK",findnDel});
    } catch (error) {
        res.json({error:error.message})
    }
    
});

route.get('/film/:filmName',async(req,res)=>{
    let filmName = req.params.filmName;
    var regex = new RegExp(["^", filmName, "$"].join(""), "i");
    try {
        var film = await filmModel.findOne({filmName:regex})
        if(film ==null){
            res.json({isFound:false})
        }
        else{
            res.json({isFound:true,film})
        }
       
    } catch (error) {
        res.json({error:error.message})
    }
    
});

route.get('/films',async(req,res)=>{

    try {
        let films = await filmModel.find({});
        res.json({films:films});
        
    } catch (error) {
        res.json({error:error.message})   
    }
});

route.get('/films/:directorName',async(req,res)=>{

    let directorName = req.params.directorName;
    var regex = new RegExp(["^", directorName, "$"].join(""), "i");

    try {
        let films = await filmModel.find({director:regex});
        if(films.length == 0){
            res.json({isNull:true});
        }
        else{
            res.json({isNull:false,films})
        }
        
    } catch (error) {
        
    }
});

route.delete('/deleteFilms',async(req,res)=>{

    try{
        let data = await filmModel.remove({});
        res.json({msg:"Success!! deletd",data:data})

    }
    catch(error){
        res.status(404).json({msg:error.message})

    }
});


module.exports = route;

