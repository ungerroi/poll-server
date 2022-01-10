const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll')
const {checkApiKey} = require('../middlewares/auth')

router.get('/polls', async (req, res, next) => {
    const page = parseInt(req.query.page || 1);
    const limit = 3
    const skip = (page - 1) * limit;
    const last = page * limit

    const total = await Poll.count()
    const polls = await Poll.find({}).limit(limit).skip(skip)
    const finale = {
        data: polls,
        complete: last > total,
        page: page
    }

    res.json(finale)

});

router.post('/poll/add-poll', checkApiKey, async (req, res, next) => {
    const {title, options} = req.body


    const newOptions = options.map($ => {return {option: $, votes: 0}})
    const newPoll = {title, options: newOptions}
    console.log(newPoll)
    try {
        const poll = new Poll(newPoll);
        await poll.save();
        res.status(201).send();
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }

});

router.put('/poll/:poll/vote/:option', async (req, res, next) => {
    const {poll, option} = req.params
    try {
        await Poll.updateOne(
            {
                "_id": ObjectId(poll),
                "options.title": option
            },
            {
                $inc: { "options.$.vote" : 1 } //   :(  not working...
            } 
        )
        res.status(200).send('done');
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }

});

module.exports = router;