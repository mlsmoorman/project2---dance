const TeamModel = require("../models/team");

module.exports = {
    index,
    new: newTeam,
    create,
};

async function index(req, res) {
    try  {
        console.log('<=====RUNNING THE TEAMS/INDEX FUNCTION=====>')
        const teamDocuments = await TeamModel.find({});
        console.log("teamDocs", teamDocuments)
        res.render("/teams/index", { teamDocs: teamDocuments });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
    
}

async function newTeam(req, res, next) {
    console.log('<=====RUNNING THE TEAMS/NEW FUNCTION=====>')
    res.render("teams/new")
}

async function create(req, res, next) {
    console.log('<=====RUNNING THE CREATE FUNCTION=====>')
    console.log(req.body, " <--- contents of the form ")
    console.log(req.user)
    try {
        const teamDoc = await TeamModel.create(req.body);
        res.redirect("/teams")
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

