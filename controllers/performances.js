const PerformanceModel = require("../models/performance");

module.exports = {
    index,
    new: newPerformance,
    create,
    show,
    update,
    edit,
    deletePerformance
};

async function deletePerformance(req, res) {
    // function deletePerformance allows a logged in user to delete the performance they personally entered
    //console.log('<==========PERFORMANCE DELETE FUNCTION ======>');
    try {
        // this is looking in the performance model for the performance ID that matches the X clicked on, removing it and saving
        const performanceDoc = await PerformanceModel.findOneAndRemove({_id: req.params.id},
        req.body,
        {new: true}
        );
        res.redirect(`/performances/`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

async function update(req, res) {
    // console.log('<========= UPDATE FUNCTION =======>');
    try {
    // based on the id of the performance selected, this returns that performance to udpate    
    const updatePerformance = await PerformanceModel.findOneAndUpdate({_id: req.params.id},
    // this updates the body of the document
    req.body,
    // this returns the updated document
    {new: true}
    );   
    // returns the user to the updated performance page
    return res.redirect(`/performances/${updatePerformance._id}`)
    
    } catch(err) {
        console.log(err);
        res.send(err);
    }
  }

async function edit(req, res) {
    // console.log('<========= EDIT FUNCTION =======>');
    // looking in performance Model to find the ids that match to pull up the selected performance
    const performanceDoc = await PerformanceModel.findOne({_id: req.params.id});

    // checking if there nothing in performanceDoc to update to return to the performance page
    if (!performanceDoc) return res.redirect('/performances')
    console.log(performanceDoc._id)
    // otherwise, go to the edit page
    res.render('performances/edit', { performance: performanceDoc });
  }



async function show(req, res) {
    //console.log('<======THIS IS RUNNING THE SHOW FUNCTION=====>')
    try {
        const performanceDocument = await PerformanceModel.findById(req.params.id)
        console.log(performanceDocument)
        res.render("performances/show", { performance: performanceDocument })
    } catch(err) {
        console.log(err)
        res.send(err)
    }
}

async function index(req, res) {
    //console.log('<=====RUNNING THE INDEX FUNCTION=====>')
    try  {
        const performanceDocuments = await PerformanceModel.find({}).sort({performanceDate: 1});
        res.render("performances/index", { performanceDocs: performanceDocuments });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

async function newPerformance(req, res, next) {
    //console.log('<=====RUNNING THE NEW FUNCTION=====>')
    res.render("performances/new")
}

async function create(req, res, next) {
    //console.log('<=====RUNNING THE CREATE FUNCTION=====>')
    try {
        req.body.user = req.user._id;
        const performanceDoc = await PerformanceModel.create(req.body);
        res.redirect("performances")
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

