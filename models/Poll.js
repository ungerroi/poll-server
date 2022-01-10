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

const Poll = model('poll', pollSchema);
module.exports = Poll;