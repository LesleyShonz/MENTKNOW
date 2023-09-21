const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

const router = express.Router();

/**
 * Registers a new user.
 * 
 * @route POST /api/users
 * @access Public
 * @param {string} name - User's name
 * @param {string} surname - User's surname
 * @param {string} email - User's email
 * @param {string} password - User's password (min. 6 characters)
 * @param {string} userType - Type of user (e.g. 'mentor')
 * @param {string} groupNumber - User's group number
 * @param {string} accessPin - Access PIN (required for mentors)
 */
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be atleast 6 character').isLength({ min: 6 }),
    check('userType', 'User type is required'),
    check('groupNumber', 'Group Number is required').not().isEmpty(),
    check('accessPin', 'Access Pin is required for Mentors').custom((value, { req }) => {
        if (req.body.userType === 'mentor' && !value) {
            throw new Error('Access Pin is required for Mentors');
        }
        return true;
    })
], registerUser);

/**
 * Authenticate user and return user details.
 * 
 * @route POST /api/users/login
 * @access Public
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser);

/**
 * Retrieve up to 5 mentees from the same group as the querying user, excluding the querying user.
 * 
 * @route POST /api/users/group-members
 * @access Public
 * @param {number} groupNumber - Group number of querying user
 * @param {string} userEmail - Email address of querying user
 */
router.post('/group-members', getGroupMembers);

/**
 * Retrieve the mentor of a group.
 * 
 * @route POST /api/users/group-mentor
 * @access Public
 * @param {number} groupNumber - Group number
 * @param {string} userEmail - Email address of querying user (to be excluded from result)
 */
router.post('/group-mentor', getGroupMentor);


/**
 * Get the total count of all mentees in the database.
 * 
 * @route GET /api/users/total-mentees-count
 * @access Public
 */
router.get('/total-mentees-count', getTotalMenteesCount);


module.exports = router;

// Controller Functions

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var { name, surname, email, password, userType, groupNumber, accessPin } = req.body;
    email = email.toLowerCase();
    try {
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
        return res.json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var { email, password } = req.body;

    email = email.toLowerCase();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Incorrect email address. Please try again' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Incorrect password. Please try again' }] });
        }

        res.json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            userType: user.userType,
            groupNumber: user.groupNumber
        });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function getGroupMembers(req, res) {
    const { groupNumber, userEmail } = req.body;

    try {
        const groupMembers = await User.find({
            email: { $ne: userEmail },
            groupNumber: groupNumber,
            userType: 'mentee'
        }).select('name surname').limit(5).exec();

        res.json(groupMembers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

async function getGroupMentor(req, res) {
    const { groupNumber, userEmail } = req.body;

    try {
        const groupMentor = await User.find({
            email: { $ne: userEmail },
            groupNumber: groupNumber,
            userType: 'mentor',
        }).select('name surname').limit(1).exec();

        res.json(groupMentor);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

async function getTotalMenteesCount(req, res) {
    try {
        const menteeCount = await User.countDocuments({ userType: 'mentee' });

        res.json({ menteeCount });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
