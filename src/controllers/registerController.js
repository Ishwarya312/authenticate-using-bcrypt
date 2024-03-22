const bcrypt = require('bcrypt');
const workFactor = 10;

const registerController = async (req, res) => {
    const { username, password } = req.body;

    bcrypt.genSalt(workFactor, function (err, salt) {
        if (err) {
            return res.status(401);
        }
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return res.status(401);
            }
            console.log(`Hash: ${hash}`);
            return res.send(hash);
        });
    });
}

module.exports = registerController