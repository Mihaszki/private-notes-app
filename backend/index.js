const express = require('express');
const app = express();
const port = 3000;

const usersRoute = require('./routers/users');

// API routes
app.use('/api/users', usersRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});