const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('userType', 'User type is required'),
    check('groupNumber', 'Group Number is required').not().isEmpty(),
    check('accessPin', 'Access Pin is required for Mentors').custom((value, { req }) => {
        if (req.body.userType === 'mentor' && !value) {
            throw new Error('Access Pin is required for Mentors');
        }
        return true;
    })
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, userType, groupNumber, accessPin} = req.body;


    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
        name,
        surname,
        email,
        password: await bcrypt.hash(password, 10),
        userType,
        groupNumber,
        accessPin
    });

    await user.save();

    res.json('success')
});


// TODO: Add a login route
// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        res.json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            userType: user.userType,
            groupNumber: user.groupNumber
        });
        // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        // });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
