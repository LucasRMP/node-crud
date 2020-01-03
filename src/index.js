const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// DATABASE
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = `mongodb+srv://${user}:${password}@cluster0-immkt.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('DataBase connected!') }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);