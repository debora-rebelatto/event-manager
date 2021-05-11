const express = require("express");
var cors = require('cors');
var morgan = require('morgan')

const app = express();

require('dotenv').config();

const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

require('./app/routes/authRoutes')(app);
require('./app/routes/eventRoutes')(app);
require('./app/routes/userRoutes')(app);

app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));