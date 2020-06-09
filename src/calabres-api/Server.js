
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port port 4000");
});