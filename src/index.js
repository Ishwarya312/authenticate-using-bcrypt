var express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const users = require('./data/data');

const app = express();
const PORT = 3000;
const workFactor = 10;
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.genSalt(workFactor, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(`Hash: ${hash}`);
        });
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    console.log(user);
    if (!user.username) {
        return res.status(401).send('Invalid username or password');
    }

    bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
            return res.status(401).send(`Invalid credentials `);
        }
        res.send(`Login successful ${result}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
