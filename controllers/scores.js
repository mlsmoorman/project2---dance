const PerformanceModel = require('../models/performance')

module.exports = {
    create,
    deleteScore,
}

async function deleteScore(req, res) {
    // function deleteScore allows a logged in user to delete the score they personally entered for a team
    console.log(req.user);
    try {
        // this is looking in the performance model for the scores ID and user ID that matches the X clicked on
        const performanceDoc = await PerformanceModel.findOne({
            "scores._id": req.params.id,
            "scores.user": req.user._id
        });
        // console.log(performanceDoc)
        // removes the scores from the performance:
        performanceDoc.scores.remove(req.params.id);

        // const scoreDoc = performanceDoc.scores.id(req.params.id)
        
        // this is saving the changes in the database
        await performanceDoc.save()

        // here we go back to the same page with the removed scores
        res.redirect(`/performances/${performanceDoc._id}`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

async function create(req, res) {
    // console.log('<==========scores create function ======>');
    try{
        // this is looking up the ID of the performance we are adding a score to:
        const performanceDoc = await PerformanceModel.findById(req.params.id);
        // console.log(performanceDoc)
        console.log(performanceDoc.scores[1], '<------trying to figure a way to add these')

        // this is also pulling in our user data into the form to attach to the review for future use
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        // this is adding the scores and user data from the form to the performance's scores array
        performanceDoc.scores.push(req.body);

        // this is tellnig mongoDb that we made changes to the document to add the scores
        await performanceDoc.save();

        // this takes us back to the same page we were on, which will now show the updated scores
        res.redirect(`/performances/${performanceDoc._id}`);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}