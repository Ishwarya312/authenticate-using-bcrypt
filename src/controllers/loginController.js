const users = require('../data/data');
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
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
}

module.exports = loginController