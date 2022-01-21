const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Mongoose = require('mongoose');

// MODELS
const User = require('../models/users');

// MIDDLEWARES
router.use(bodyParser.json()) // to parse json
router.use(bodyParser.urlencoded({extended:true}))
router.use(cookieParser()) // to parse cookies

const auth = require('../middlewares/auth');

// ROUTES
router.post('/register', async (req, res) => {

    console.log('Users Route: register here! Body is', req.body)

    try {

        const user = new User(req.body); //create model. That's AN INSTANCE OF THE USER OBJECT
    
        console.log('register route: User is', user)
    
        const newUser = await user.save();
    
        console.log('user added is', newUser)
        
        if (newUser) res.send({success: true});
        else res.send({success: false, errorId: 1}) // user not created successfully

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
    
})

router.post('/login', async (req, res) => {

    console.log('Users Route: login here! Body is', req.body)

    try {

        const userToCheck = await User.findOne({username: req.body.username}); //create model. That's AN INSTANCE OF THE USER OBJECT
    
        console.log('Login: User to check is', userToCheck)
        
        if (userToCheck) {
            console.log('user found')
            
            const passMatch = await userToCheck.comparePassword(req.body.pass, userToCheck.pass)
            console.log('pass match is', passMatch)
            
            if (passMatch) { // passwords match

                // token needs to be generated
                const updatedUser = await userToCheck.generateToken();

                if (updatedUser) {
                    console.log('updateduser is :',updatedUser)
                    res.cookie('userid',updatedUser.username)
                    res.cookie('user_auth',updatedUser.token).send({success: true,_id:updatedUser._id});
                   

                } else {
                    res.status(400).send({success: false, errorId: 3}) // error in token creation
                }

            } else {
                res.send({success: false, errorId: 2}); // wrong pass 

            }
        } else res.send({success: false, errorId: 1}) // user not found

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
    
})

router.get('/list', auth, async (req, res) => {

    console.log('Users Route: list here')

    try {

        const users = await User.find()
        .limit(5)
        .select('username')

       res.send(users);

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
    
})

// authenticates client by checking the token
router.get('/auth', auth, async (req, res) => {

    console.log('Users Route: auth here')

    try {

        res.send({success: true})

    } catch (err) {
        console.log(err.message)
        res.status(400).send({success: false, error: err.message})
    }
    
})

router.get('/logout', auth, async (req, res) => {

    console.log('Users Route: logout here')

    try {

        console.log('logout: req.user is', req.user)
        const user = await User.findOneAndUpdate({_id: req.user._id}, {token: ''})

        if (!user) return res.send({success: false, errorId: 1}) // user is not found
        res.cookie('userid',null)
        res.cookie('user_auth',null)
        res.send({success: true})

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
    
})




module.exports = router;