const express= require('express');
const app= express();

const http =require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport= require('passport');
/*
importar las rutas
*/

const rutasUsuarioss = require('./routes/rutasUsuarios');
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port',port);
//llamar a las rutas 
rutasUsuarioss(app);

server.listen(3000,'192.168.1.8'||'localhost',function(){
    console.log('aplicacion de NodJs '+port+ 'iniciada.....');
});

app.get('/',(req,res)=>{
    res.send('ruta raiz del backend');
});
app.get('/test',(req,res)=>{
    res.send('esta es la ruta test');
});
//Manejo de Errores 
app.use((err,req,res,next)=>{
console.log(err);
res.status(err.status||500).send(err.stack)
});

//200 -exito
// 404 -URL no existe
// 500- error interno del servidor