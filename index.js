const Joi = require('joi');
const genres = require('./route/genre');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);


const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`Listening to port ${port}`))