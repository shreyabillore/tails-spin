const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const auth = async (req, res, next) => {

    console.log('auth here')

    try {

        console.log('auth: cookies are', req.cookies.user_auth)

        const token = req.cookies.user_auth;

        console.log('auth: token is', token)
        console.log('auth: secret is', process.env.SECRET)


        if (!token) return res.status(403).send({success: false})

        // decode cookie
        const decoded = jwt.verify(token, process.env.SECRET)

        console.log('decoded is', decoded.user)

        if (decoded) {

            const user = await Users.findOne({"_id": decoded.user, token})

            console.log('User from auth is', user)

            if (user) {

                req.user = user
                req.token = token;
                next()
            } else {
                res.status(403).send({success: false})
            }
            
        } else return res.status(403).send({success: false})

    } catch (err) {

        console.log('auth error:', err.message)
        return res.status(400).send({error: err.message, sucess: false})
    }
}

module.exports = auth;