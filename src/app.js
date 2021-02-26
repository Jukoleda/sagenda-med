const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://sa_root:root@localhost:27017/super_agenda', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));

const indexRoutes = require('./routes/index');


