const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();

const usersRoute = require('./routers/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/users', usersRoute);

// Connect to mongodb
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to mongodb'));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});