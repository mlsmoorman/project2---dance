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
    // ===== Function deletePerformance allows a logged in user to delete the performance they personally entered =====
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
    // ===== The update function takes the information the user adds to the edit page form and updates the database =====
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
    // ===== Function edit reacts to a customer clicking on the edit button and directs them to the edit page showing the form =====
    // looking in performance Model to find the ids that match to pull up the selected performance
    const performanceDoc = await PerformanceModel.findOne({_id: req.params.id});

    // checking if there nothing in performanceDoc to update to return to the performance page
    if (!performanceDoc) return res.redirect('/performances')
    console.log(performanceDoc._id)
    // otherwise, go to the edit page
    res.render('performances/edit', { performance: performanceDoc });
  }



async function show(req, res) {
    // ===== The show function directs the customer to the show page once they click on the details of a specific performance =====
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
    // ===== When "All Performances" is clicked from the Home Page it directs to this page which shows all performances =====
    try  {
        const performanceDocuments = await PerformanceModel.find({}).sort({performanceDate: 1});
        res.render("performances/index", { performanceDocs: performanceDocuments });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


async function newPerformance(req, res, next) {
    // ===== Directs the user to the new performer form when they want to add a new performance to the database =====
    res.render("performances/new")
}

async function create(req, res, next) {
    // ===== Create takes the information on the new performance form 'new page' 
    //       and enters it in the database to be displayed on the performance page =====
    try {
        req.body.user = req.user._id;
        const performanceDoc = await PerformanceModel.create(req.body);
        res.redirect("performances")
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

