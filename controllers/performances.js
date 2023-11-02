const PerformanceModel = require("../models/performance");

module.exports = {
    index,
    new: newPerformance,
    create,
    show,
    update,
    edit
};

async function update(req, res) {
    console.log('<========= UPDATE FUNCTION =======>');
    try {
    // based on the id of the performance selected, this returns that performance to udpate    
    const updatePerformance = await PerformanceModel.findOneAndUpdate({_id: req.params.id},
    // this updates the body of the document
    req.body,
    {new: true}
    // this returns the updated document

    );   
    // returns the updated performance
    return res.redirect(`/performances/${updatePerformance._id}`)
    
    } catch(err) {
        console.log(err);
        res.send(err);
    }
  }

async function edit(req, res) {
    console.log('<========= EDIT FUNCTION =======>');
    // looking in performance Model to find the ids that match to pull up the selected performance
    const performanceDoc = await PerformanceModel.findOne({_id: req.params.id});

    // checking if there nothing in performanceDoc to update to return to the performance page
    if (!performanceDoc) return res.redirect('/performances')
    console.log(performanceDoc._id)
    // otherwise, go to the edit page
    res.render('performances/edit', { performance: performanceDoc });
  }



async function show(req, res) {
    console.log('<======THIS IS RUNNING THE SHOW FUNCTION=====>')
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
    try  {
        console.log('<=====RUNNING THE INDEX FUNCTION=====>')
        const performanceDocuments = await PerformanceModel.find({});
    
        console.log("performanceDocs", performanceDocuments)
        
        res.render("performances/index", { performanceDocs: performanceDocuments });


    } catch (err) {
        console.log(err);
        res.send(err);
    }
    
}

async function newPerformance(req, res, next) {
    console.log('<=====RUNNING THE NEW FUNCTION=====>')
    res.render("performances/new")
}

async function create(req, res, next) {
    console.log('<=====RUNNING THE CREATE FUNCTION=====>')
    console.log(req.body, " <--- contents of the form ")
    console.log(req.user)
    try {
        req.body.user = req.user._id;
        const performanceDoc = await PerformanceModel.create(req.body);
        res.redirect("performances")
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

