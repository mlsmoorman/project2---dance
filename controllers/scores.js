const PerformanceModel = require('../models/performance')

module.exports = {
    create,
    deleteScore
}

async function deleteScore(req, res) {
    console.log(req.user);
    try {
        const performanceDoc = await PerformanceModel.findOne({
            "scores._id": req.params.id,
            "scores.user": req.user._id
        });

        console.log(performanceDoc)

        performanceDoc.scores.remove(req.params.id);

        const scoreDoc = performanceDoc.scores.id(req.params.id)

        await performanceDoc.save()

        res.redirect(`/performances/${performanceDoc._id}`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

async function create(req, res) {
    console.log('<==========scores create function ======>');
    try{
        const performanceDoc = await PerformanceModel.findById(req.params.id);
        console.log(performanceDoc)
        // console.log(performanceDoc.scores[1], '<------trying to figure a way to add these')
        performanceDoc.scores.push(req.body);
 
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        performanceDoc.scores.push(req.body);

        await performanceDoc.save();

        res.redirect(`/performances/${performanceDoc._id}`);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}