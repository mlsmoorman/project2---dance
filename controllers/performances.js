const PerformanceModel = require("../models/performance");

module.exports = {
    index,
    new: newPerformance,
    create,
    show
};

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
        const performanceDoc = await PerformanceModel.create(req.body);
        res.redirect("performances")
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

