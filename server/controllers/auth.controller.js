const User = require('../models/user');
const bcrypt = require('bcrypt')

const authController = {
    signIn: async (req, res) => {
        try {
            let username = req.body.username
            let isRegistered = await User.findOne({ username: username });
            if (!isRegistered) {
                const hassPass = await bcrypt.hash(req.body.password, 10);
                const user = new User({
                    username: username,
                    password: hassPass,
                    email: req.body.email
                })
                console.log("newgin", username, hassPass, req.body.email)

                const dbres = await user.save()
            } else {
                res.json(" username already exists !!");
            }
        } catch (e) {
            console.log(e.message)
            res.status(400).json("Sigin failed")
        }

    },
    logIn: (req, res) => {

    },
    Logout: (req, res) => {

    }
}

module.exports = authController;