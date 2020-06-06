
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
var cors = require('cors')
// create express app
const app = express();
app.use(cors());

mongoose.Promise = global.Promise;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port port 4000");
});