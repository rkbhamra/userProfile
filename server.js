if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const purchaseRouter = require('./routes/purchasePref');
const indexRouter = require('./routes/index');
const contactInfoRouter = require('./routes/contactInfo');
const fleetRouter = require('./routes/fleets');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/purchasePref', purchaseRouter);
app.use('/', indexRouter);
app.use('/fleetsize', fleetRouter);

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Connection error:', error));

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/contactInfo', contactInfoRouter);

app.listen(process.env.PORT || 3000);
