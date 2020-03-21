const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json())


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const router = require('./routes/router');

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});