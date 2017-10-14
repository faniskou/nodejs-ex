//  OpenShift sample Node application
var express = require('express'),
    app     = express();
var Http = require('http');
const swaggerUi = require('swagger-ui-express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
global.db = low(adapter);

Object.assign=require('object-assign')



var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({
        extended: true
    }));
    const swaggerDocument = require('./config/swagger.port.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(Swaggerize({
        api: Path.resolve('./config/swagger.json'),
        handlers: Path.resolve('./handlers')
    }));
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
