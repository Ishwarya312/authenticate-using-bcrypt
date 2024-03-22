var express = require('express');
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

const app = express();
const PORT = 3000;
const workFactor = 10;

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/register', registerController);

app.post('/login', loginController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;