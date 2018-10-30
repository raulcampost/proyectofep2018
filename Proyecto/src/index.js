const mongo = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const config = require('./config');
var url = config.db;
//const indexroutes = require('./routes/index');
const indextask = require('./routes/tasks');
const indexuser = require('./routes/users');


//settings
app.set('views',path.join(__dirname, 'views'));
app.set('port',process.env.PORT || 3000);
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//routS
//app.use(indexroutes);
app.use('/api',indextask);
app.use('/app',indexuser);

//static files
app.use(express.static(path.join(__dirname, 'dist/client')));


//estableciendo conexion con bases de datos mongodb y levantando servidor
mongoose.connect(url,{ useNewUrlParser: true },(err,db)=>{
    if(err){
        throw err;
    }
    console.log("database corriendo...");
    app.listen(app.get('port'),() => {
        console.log(`api-pdm corriendo en http://localhost:${app.get('port')}`);
    });
});
