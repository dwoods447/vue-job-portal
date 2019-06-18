/* global require */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan  = require('morgan');
const process = require('process');
const {sequelize} = require('./models')
const config = require('./config/config.js');
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(cors());


require('./JobSeekerPassport')
require('./EmployerPassport')
require('../src/routes/routes.js')(app, express)

app.set('port', process.env.PORT || config.port);



try{
    sequelize.sync().then(() =>{
        app.listen(process.env.PORT || config.port, () => console.log(`App listening on port ${config.port}!`))

    })
}catch(err){
    console.log(`${err}`)
}


