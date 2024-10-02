const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db')();
const AuthRouter = require('./Routers/AuthRouter');

PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);




app.get('/', (req, res) => {
    res.send('Hello to the world of Gambler');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
