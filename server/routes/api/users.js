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

    const { name, surname, email, password, userType, groupNumber, accessPin } = req.body;


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
/**
 * @route   GET /group-members/:groupNumber/:userEmail
 * @desc    Retrieve up to 5 mentees from the same group as the querying user, excluding the querying user.
 * @access  Public (Note: You might want to make this private depending on your app's design)
 *
 * @param {Number} groupNumber - The group number of the querying user.
 * @param {String} userEmail - The email address of the querying user.
 *
 * @returns {Array} An array of objects containing names and surnames of the matching mentees.
 *
 * Example success response:
 * [
 *    { name: "John", surname: "Doe" },
 *    { name: "Jane", surname: "Smith" },
 *    ...
 * ]
 *
 * Note: It's advisable not to pass email as a route parameter for security concerns.
 */

router.post('/group-members', async (req, res) => {
    try {
        const { groupNumber, userEmail } = req.body; // Destructure the values from the request body

        const groupMembers = await User.find({
            email: { $ne: userEmail },
            groupNumber: groupNumber,
            userType: 'mentee'
        })
            .select('name surname')
            .limit(5)
            .exec();

        res.json(groupMembers);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
/**
 * @route   GET /group-members/:groupNumber/:userEmail
 * @desc    Retrieve up to 5 mentees from the same group as the querying user, excluding the querying user.
 * @access  Public (Note: You might want to make this private depending on your app's design)
 *
 * @param {Number} groupNumber - The group number of the querying user.
 * @param {String} userEmail - The email address of the querying user.
 *
 * @returns {Array} An array of objects containing names and surnames of the matching mentees.
 *
 * Example success response:
 * [
 *    { name: "John", surname: "Doe" },
 *    { name: "Jane", surname: "Smith" },
 *    ...
 * ]
 *
 * Note: It's advisable not to pass email as a route parameter for security concerns.
 */

router.post('/group-mentor', async (req, res) => {
    try {
        const { groupNumber, userEmail } = req.body; // Destructure the values from the request body

        const groupMentors = await User.find({
            email: { $ne: userEmail },
            groupNumber: groupNumber,
            userType: 'mentor',
        })
            .select('name surname')
            .limit(1)
            .exec();

        res.json(groupMentors);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
