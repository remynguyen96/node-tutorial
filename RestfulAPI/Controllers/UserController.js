const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                return res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },

    signUp: (req, res, next) => {
        const newUser = new User();
        let email = req.body.email;
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(req.body.password);
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    return res.status(203).json({
                        errors: 'Email is existed !'
                    });
                }
                newUser.save()
                    .then(user => {
                        sendToken(user, 201, res);
                    })
                    .catch(err => {
                        next(err);
                    })
            })
            .catch(err => {
                next(err);
            })
    },

    login: (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({
                email: email
            })
            .then(user => {
                if (!user) {
                    return res.status(203).json({
                        errors: 'Email or password incorrect !'
                    });
                }
                if (!user.validPassword(password)) {
                    return res.status(203).json({
                        errors: 'Email or password incorrect !'
                    });
                }
                sendToken(user, 200, res);
            })
            .catch(err => {
                next(err);
            })
    }


};

function sendToken(user, status, res) {
    const token = jwt.sign(user, process.env.JWT, {
        expiresIn: 3600 // 1 hour
    });
    return res.status(status).json({
        token: token,
        // token: 'JWT ' + token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
}


