const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const usersRoute = require('./routers/users');

// API routes
app.use('/api/users', usersRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to mongodb
mongoose.connect('mongodb://localhost/notes-db', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to mongodb'));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});