var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var session = require('express-session')
var bcrypt = require('bcrypt-nodejs');

var app = express();

// Application configuration

app.set('port', process.env.PORT || 3000)

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(function (error, req, res, next) {
    error.location = "ERROR_JSON_PARSE";
    error.code = 400;
    next(error);
});

app.use(methodOverride());
app.use(cors());
app.use(session({
    secret: '63?gdº93!6dg36dºb36%Vv57V%c$%/(!V497',
    resave: true,
    saveUninitialized: true
}))

app.use(serveStatic(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));

// Database initialization

app.db = require('./models')

app.db.init(app.get('env'))

    //Inserir Colors
    .then(function() {return app.db.Color.create({nom: 'Vermell'})})
    .then(function() {return app.db.Color.create({nom: 'Verd'})})
    .then(function() {return app.db.Color.create({nom: 'Groc'})})
    .then(function() {return app.db.Color.create({nom: 'Blau'})})
    .then(function() {return app.db.Color.create({nom: 'taronja'})})
    .then(function() {return app.db.Color.create({nom: 'Porpra'})})
    .then(function() {return app.db.Color.create({nom: 'Cian'})})
    .then(function() {return app.db.Color.create({nom: 'Magenta'})})
    .then(function() {return app.db.Color.create({nom: 'Lima'})})
    .then(function() {return app.db.Color.create({nom: 'Rosa'})})
    .then(function() {return app.db.Color.create({nom: 'Teal'})})
    .then(function() {return app.db.Color.create({nom: 'Lavanda'})})
    .then(function() {return app.db.Color.create({nom: 'Marró'})})
    .then(function() {return app.db.Color.create({nom: 'Beix'})})
    .then(function() {return app.db.Color.create({nom: 'Granat'})})
    .then(function() {return app.db.Color.create({nom: 'Menta'})})
    .then(function() {return app.db.Color.create({nom: 'Oliva'})})
    .then(function() {return app.db.Color.create({nom: 'Coral'})})
    .then(function() {return app.db.Color.create({nom: 'Armada'})})
    .then(function() {return app.db.Color.create({nom: 'Gris'})})
    .then(function() {return app.db.Color.create({nom: 'Blanc'})})
    .then(function() {return app.db.Color.create({nom: 'Negre'})})
    .then(function() {return app.db.Rol.create({nom: 'Admin'})})
    .then(function() {return app.db.Rol.create({nom: 'User'})})
    .then(function() {return app.db.Rol.create({nom: 'Worker'})})
    .then(function() {return app.db.Area.create({nom: 'Blava', preuMinut: 0.02, maxMinuts: 90})})
    .then(function() {return app.db.Area.create({nom: 'Verda', preuMinut: 0.03, maxMinuts: 60})})
    .then(function() {return app.db.Marca.create({nom: 'Audi'})})
    .then(function() {
        return app.db.User.create({username: 'admin', password: bcrypt.hashSync('admin'), email: 'admin@admin.com', RolId: 1})
    })
    .then(function() {
        return app.db.User.create({username: 'usuari', password: bcrypt.hashSync('usuari'), email: 'user@jo.com', RolId: 3})
    })
    .then(function() {
        return app.db.User.create({username: 'revisor', password: bcrypt.hashSync('revisor'), email: 'revisor@revisor.com', RolId: 2})
    })
    .then(function() {return app.db.Vehicle.create({ matricula: '4432CGN', MarcaId: 1, UserId: 2})})
    .then(function() {return app.db.Tiquet.create({dataInici: new Date(), dataFi: new Date(new Date().getTime() + 60000), import: 2.5, VehicleId: 1, AreaId: 1})})
    .then(function() {return app.db.Tiquet.create({dataInici: '2018-03-02 10:15', dataFi: '2018-05-22 11:15', import: 2.5, VehicleId: 1, AreaId: 1})})
    .then(function() {return app.db.Sancio.create({ import: 100, data: new Date(), VehicleId: 1, AreaId: 1 })})

    .then(function () {
        app.use('/api/users', require('./routers/r_users')(app));
        app.use('/api/revisor', require('./routers/r_revisor')(app));
        app.use('/api/colors', require('./routers/r_colors')(app));
        app.use('/api/arees', require('./routers/r_arees')(app));
        app.use('/api/tiquets', require('./routers/r_tiquets')(app));
        app.use('/api/vehicles', require('./routers/r_vehicles')(app));
        app.use('/api/marcas', require('./routers/r_marcas')(app));
        app.use('/api/sancio', require('./routers/r_sancios')(app));

        app.use(function (err, req, res, next) {
            var code = err.code || 500;
            var json = {};
            json.type = err.type || "ERROR_UNKNOWN";
            json.name = err.name || "UNKNOWN";
            json.message = err.message || "Unknown error";
            if (!err.message) json.stack = err.stack || "No stack trace available";
            res.status(code).json({
                error: json
            });
        });


        var port = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');
        var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

        http.createServer(app).listen(port, ip, function () {
            console.log("Express server listening on " + ip + ":" + port);
        })
    })
    .catch(function (err) {
        console.log("Error initializing database: " + err);
    })
    .done();
