const express = require("express");
var cors = require('cors');

const app = express();

const port = 3000;

require('dotenv').config()

app.use(express.json());

require('./app/controllers/authController')(app);
require('./app/controllers/eventController')(app);

app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));