if  (process.env.NODE_ENV !== 'production' ){
  require('dotenv').config();
}


const express = require('express');
const app = express();
const espressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const contactInfoRouter = require('./routes/contactInfo');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(espressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true  // Fix me: enable TLS/SSL connection
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/', contactInfoRouter);

app.listen(process.env.PORT || 3000);