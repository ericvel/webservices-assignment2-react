const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

// Define Services as routes
app.use('/url', require('./services/url/index'))
app.use('/user', require('./services/user/index'))
const PORT = 5000;

app.listen(PORT, () => console.log('Server running on port ' + PORT));
