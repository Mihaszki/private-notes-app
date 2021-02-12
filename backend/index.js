const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

const userAuth = require('./routers/auth');
const notesRoute = require('./routers/notes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', userAuth);
app.use('/api/notes', notesRoute);

// Connect to mongodb
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('Connected to mongodb'));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});