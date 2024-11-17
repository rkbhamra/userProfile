if  (process.env.NODE_ENV !== 'production' ){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const espressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');


console.log('Current directory:', __dirname);

// Import routes
const purchasePrefRouter = require('./routes/purchasePref');
const indexRouter = require('./routes/index');
const methodOverride = require('method-override');
const userRouter = require('./routes/user');
const fleetRouter = require('./routes/fleets');

console.log('Fleet router loaded:', fleetRouter); // Debug log

// Middleware setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(espressLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/', userRouter);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Route handlers with debug logging
app.use('/purchasepref', purchasePrefRouter);
app.use('/', indexRouter);
app.use('/', fleetRouter); // Changed back to root mounting

// Add a test route
app.get('/test', (req, res) => {
    res.send('Test route working');
});


app.use((req, res, next) => {
    console.log('Request URL:', req.url); // Debug log
    next();
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error:', error));

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});