const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0-immkt.mongodb.net/test?retryWrites=true&w=majority`, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('DataBase connected!') }
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./controllers/authController')(app);

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);