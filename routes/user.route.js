const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//route   users/
//desc    testRoute
//access  public

// router.get('/', (req, res) => { res.send("User route") })

router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', "Password should be more than 6 characters.").isLength({ min: 6 }),
    check('birthdate', "Birthdate is required"),
    check('gender', "Gender is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //See if user Exist
    const { name, email, password, birthdate, gender } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: [{ msg: "User already exists" }] });
        }

        const user = new User({ name, email, password, birthdate, gender });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)


        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }


    //Encrypt the password

    //Return the jsonwebtoken

    // res.send('User route');
})

module.exports = router;