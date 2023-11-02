const mongoose = require('mongoose');

const scoresSchema = new mongoose.Schema({
    techniqueTurnKick: {
        type: Number,
        min: 1,
        max: 10
    },
    techLeapJumpHeight: {
        type: Number,
        min: 1,
        max: 10
    },
    creativity: {
        type: Number,
        min: 1,
        max: 10
    },
    visualEffectiveness: {
        type: Number,
        min: 1,
        max: 10
    },
    difficultyChoreo: {
        type: Number,
        min: 1,
        max: 10
    },
    difficultyFormTrans: {
        type: Number,
        min: 1,
        max: 10
    },
    diffSkillsKicks: {
        type: Number,
        min: 1,
        max: 10
    },
    placementControl: {
        type: Number,
        min: 1,
        max: 10
    },
    accuracy: {
        type: Number,
        min: 1,
        max: 10
    },
    routineEffectiveness: {
        type: Number,
        min: 1,
        max: 10
    },
    comments: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true,
}
);

const performanceSchema = new mongoose.Schema({
    teamName: String,
    conference: String,
    style: {
        type: String,
        enum: ['High Kick', 'Jazz']
    },
    class: {
        type: String,
        enum: ['A', 'AA', 'AAA']
    },
    performanceDate: {
        type: Date,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    scores: [scoresSchema]
}, {
})

module.exports = mongoose.model("Performance", performanceSchema);