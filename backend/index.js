const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use('/', require('./routes/get'));
app.use('/', require('./routes/post'));
app.use('/', require('./routes/delete'));
app.use('/', require('./routes/put'));
const PORT = 5000;

app.listen(PORT, () => console.log('Server running on port ' + PORT));
