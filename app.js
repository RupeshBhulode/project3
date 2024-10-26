// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simpleDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully'); // Message on successful connection
    })
    .catch(err => {
        console.error('MongoDB connection error:', err); // Log connection error
    });

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/add', (req, res) => {
    const newUser = new User({ name: req.body.name });
    newUser.save()
        .then(() => res.redirect('/data'))
        .catch(err => res.status(400).send(err));
});

app.get('/data', (req, res) => {
    User.find()
        .then(users => res.render('data', { users }))
        .catch(err => res.status(400).send(err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
