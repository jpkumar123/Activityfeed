const express = require('express');
const Router = require('./routes');
const bcrypt = require('bcrypt');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Router);


app.listen(3000, ()=>{
    console.log(`server running at port:3000`);
});