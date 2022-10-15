const userControlador= require('../controllers/controladorUsuario');
module.exports=(app)=>{
    app.post('/api/users/create',userControlador.registro);
    app.post('/api/users/login',userControlador.login);
}