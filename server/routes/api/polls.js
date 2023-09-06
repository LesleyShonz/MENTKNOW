const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Poll = require('../../models/Poll');

// @route   POST api/polls
// @desc    Create a new poll
// @access  Public
router.post('/', [
    check('question', 'Question is required').not().isEmpty(),
    check('options', 'Options should be an array with at least 2 values').isArray({ min: 2 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { question, options } = req.body;

    try {
        await Poll.deleteMany({});
        const newPoll = new Poll({
            question,
            options: options.map(option => ({ name: option, votes: 0 }))
        });
        
        const poll = await newPoll.save();
        res.json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/polls/vote/:poll_id
// @desc    Vote on a poll
// @access  Public
router.post('/vote/:poll_id', [
    check('option', 'Option is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { option } = req.body;

    try {
        const poll = await Poll.findById(req.params.poll_id);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        const optionIndex = poll.options.findIndex(opt => opt.name === option);
        if (optionIndex === -1) {
            return res.status(400).json({ msg: 'Option not found' });
        }

        poll.options[optionIndex].votes++;
        await poll.save();
        res.json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route   GET api/polls/latest
// @desc    Get the latest poll
// @access  Public
router.get('/latest', async (req, res) => {
    try {
        const poll = await Poll.findOne(); // assuming there's a createdAt field in your schema

        if (!poll) {
            console.log('No poll found');
            return res.status(404).json({ msg: 'No polls found' });
        }

        res.json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route   GET api/polls/results/:poll_id
// @desc    Get poll results
// @access  Public
router.get('/results/:poll_id', async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.poll_id);

        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        res.json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route   GET api/polls/getPoll
// @desc    Get a poll for voting
// @access  Public
router.get('/getPoll', async (req, res) => {
    try {
        const poll = await Poll.findOne();  // Fetch the first poll
        if (!poll) {
            return res.status(404).json({ msg: 'No polls available' });
        }
        res.json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
