const express = require('express');
const directorModel = require('../model/directorModel');

var route = express.Router();

route.get('/listOfDirectors',async(req,res)=>{

    try{
        const listOfDirectors = await directorModel.find({});
        var len = await directorModel.estimatedDocumentCount();
        if(len == 0){
            throw "Database is empty";
        }
        res.json(listOfDirectors);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }

});

//only retrive director names form collection: as array only values
route.get('/directorNames',async(req,res)=>{
    try {
        names=[];
        const dirNames = await directorModel.find({},{_id:0,name:1})//.toArray().newDirectormap((key)=>{return key.name})
        dirNames.forEach((key)=>{
            names.push(key.name)
        })
        res.json(names)
    } catch (error) {
        res.json({error:error.message})
    }
})

route.post('/newDirector', async(req,res)=>{
    
    try{
        let newDirector = new directorModel(req.body);
        let data = await newDirector.save();
        res.json({"message":"Successfully added data","data":data})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

});

route.get('/director/:name',async(req,res)=>{

    const directorName = req.params.name;
    try{
        var regex = new RegExp(["^", directorName, "$"].join(""), "i");
        const find =  await directorModel.findOne({name:regex});
        if(find == null){
            return res.json({feedback:false})
        }
        else{
           return res.json({data:find,feedback:true});
        }
    }
    catch(error){
        res.json({error:error.message})

    }
});

route.put('/director/:name',async(req,res)=>{
    const directorName = req.params.name;
    var age = req.body.age;
    var awards = req.body.noOfAwards;
    console.log(age," ",awards," ",directorName);

    try{
         const update = await directorModel.updateOne({name:directorName},{$set:{age:age,noOfAwards:awards}});
         const data = await directorModel.findOne({name:directorName});

         res.json({message:"success",operation:update,data:data})


    }catch(error){
        res.status(500).json({error:error.message})

    }
})

route.delete('/director/delete/:name',async(req,res)=>{
    const directorName = req.params.name;
    try{
        await  directorModel.deleteOne({name:directorName});
        res.json({deleted:true})
    }
    catch(error){
        res.json({deleted:false})

    }
})

module.exports = route;