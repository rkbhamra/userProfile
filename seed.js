const mongoose = require('mongoose');
const PurchaseHistory = require('./models/buyHistory'); 

const sampleData = [
    { purchaseId: 30, plateNumber: 'CCCC555',  purchaseDate: new Date('2021-01-15'), points: '+100' },
    { purchaseId: 35, plateNumber: 'USR404',  purchaseDate: new Date('2022-02-20'), points: '+200' },    
    { purchaseId: 40, plateNumber: 'YES537',  purchaseDate: new Date('2023-03-10'), points: '+600' },
    { purchaseId: 45, plateNumber: 'SFR543',  purchaseDate: new Date('2023-11-10'), points: '-400' },
    { purchaseId: 50, plateNumber: 'IOS18',  purchaseDate: new Date('2024-02-10'), points: '-100' },
    { purchaseId: 55, plateNumber: 'MOM4U',  purchaseDate: new Date('2024-010-10'), points: '+700' }
];

mongoose.connect('mongodb://localhost/fleetRewards', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
        await PurchaseHistory.deleteMany(); 
        await PurchaseHistory.insertMany(sampleData); 
        console.log('Sample data inserted');
        mongoose.connection.close();
    })
    .catch(err => console.error('Database connection error:', err));
