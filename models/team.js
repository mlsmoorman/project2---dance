const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: String,
    conference: String,
    section: {
        type: String,
        enum: ['A', 'AA', 'AAA']
    },
    championship: Date,
    scores: {
        type: Number,
        min: 1,
        max: 100
    }
})

module.exports = mongoose.model("Team", teamSchema);