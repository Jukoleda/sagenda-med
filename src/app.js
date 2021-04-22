const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDBSession = require('connect-mongodb-session')(session);


const app = express();


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('./public'));

const mongoURI = 'mongodb://sa_root:root@localhost:27017/super_agenda';

app.set('port', 3000);
mongoose.connect(mongoURI, 
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));

const store = new mongoDBSession({
    uri: mongoURI,
    collection: 'mySessions'
})

app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    store: store
}))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
const contactosRoutes = require('./routes/contactos');



app.use('/', indexRoutes);
app.use('/', contactosRoutes);
app.use('/src/js/contactos.js', (req, res) => {
    res.sendFile(__dirname + '/js/contactos.js');
});

app.listen(app.get('port'), () => {
    console.log(`server listening at port ${app.get('port')}`);
});


