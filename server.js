if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const purchaseRouter = require('./routes/purchasePref');
const contactInfoRouter = require('./routes/contactInfo');
const fleetRouter = require('./routes/fleets');
const purHistoryRouter = require('./routes/purHistory');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
      secret: 'your-secret-key', 
      resave: false,
      saveUninitialized: true,
  })
);

app.use('/purchasePref', purchaseRouter);
app.use('/', indexRouter);
app.use('/fleetsize', fleetRouter);
app.use('/purchaseHistory', purHistoryRouter);

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
