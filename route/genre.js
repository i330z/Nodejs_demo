const express = require('express');
const route = express.Router();
const Joi = require('joi');


const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Horror'},
    {id:3, name: 'Fiction'}
]

route.get('/',(req,res)=>{
    res.send(genres);
})

//FINDING THE GENRE WITH ID
route.get('/:id' , (req,res)=>{
    const genre = genres.find(movGen => movGen.id === parseInt(req.params.id))
    if(!genre){
        res.status(404).send('The Genre of the ID not Found');
        return;
    }
    res.send(genre)
})

route.post('/', (req,res)=>{
    const {error} = validationGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };
    
    genres.push(genre);
    res.send(genres);
    
});

route.put('/:id',(req,res)=>{
    const genre = genres.find( movGen => movGen.id === parseInt(req.params.id));
    if(!genre){
        res.ststus(404).send('The Genre not found');
        return;
    } 
    
//    const result = validationGenre(req.body)
    const {error} = validationGenre(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)   
    }
    
    
    genre.name = req.body.name;
    res.send(genres);
})


route.delete('/:id', (req,res)=>{
    const genre = genres.find(movGen => movGen.id === parseInt(req.params.id));
    
    if(!genre) {
        res.status(404).send('Not Found')
        return
    }
    
    const index = genres.indexOf(genre);
    genres.splice(genre,1);
    res.send(genre)
})

function validationGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    }
    
    return Joi.validate(genre, schema)
}

module.exports = route;


















