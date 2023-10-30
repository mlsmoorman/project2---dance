const PerformanceModel = require('../models/performance')

module.exports = {
    create
}

async function create(req, res) {
    console.log('<==========scores create function ======>');
    try{
        const performanceDoc = await PerformanceModel.findById(req.params.id);
        console.log(performanceDoc)
        performanceDoc.scores.push(req.body);

        await performanceDoc.save();

        res.redirect(`/performances/${performanceDoc._id}`);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}