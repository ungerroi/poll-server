const contextService = require('request-context');
const mongoose = require('mongoose');
const { Schema, model, ObjectId } = mongoose;

const optionSchema = new Schema({
    option: {type: String},
    votes: {type: Number}
})

const pollSchema = new Schema({
    title: {type: String, require: true},
    options: {type: [optionSchema]}
})

// 18:00 > I researched about ״pre״ after the exercise finished, I missed the way to access the payload of the client, now I know its the the "this" keyword

const Poll = model('poll', pollSchema);
module.exports = Poll;
