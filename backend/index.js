const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define Services as routes
app.use('/url', require('./services/url/index'))
app.use('/user', require('./services/user/index'))
const PORT = 5000;

app.listen(PORT, () => console.log('Server running on port ' + PORT));
