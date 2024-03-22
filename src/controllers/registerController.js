const bcrypt = require('bcrypt');
const workFactor = 10;

const registerController = async (req, res) => {
    const { username, password } = req.body;

    bcrypt.genSalt(workFactor, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(`Hash: ${hash}`);
            return res.send(hash);
        });
    });
}

module.exports = registerController