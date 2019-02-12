'use strict';

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require ("passport");
const bodyParser = require("body-Parser");
mongoose.promise = global.Promise;

const{DATABASE_URL, PORT} = require('./config');
const {projects} = require('./models');
const projectsRouter = require("./projectsRouter");
const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/projects" , projectsRouter);


function runServer () {
    const port = process.env.port || 8080 ;
    return new Promise((resolve, reject) => {
        server = app
        .listen(port , () => {
            console.log(`app is listening on port $(port)`);
            resolve(server);
        })
        .on("error", err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

app.get('./project', (req, res) => {
    Projects
    .find()
    .then(project => {
        res.json(project.map(post => post.serialize()));
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});

app.post('/project', (req,res) => {
    const requiredFields = ['projectName', 'startDate', 'budget', 'materialsNeeded', 'endDate'];
    for(let i = 0; i <requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \` ${field}\` in request body`;
            console.error(message);
            return res.status (400).send(message);
        }
    }

    project
        .create({
            projectName: req.body.projectName,
            startDate: req.body.startDate,
            budget: req.body.budget,
            materialsNeeded: req.body.materialsNeeded,
            endDate: req.body.endDate
        })
        .then(project => res.status(201).json(project.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        });
});

app.delete('/project', (req,res) => {
    project
    .find()
    .then(() => {
        res.status(204).json({message: 'success'});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});
/**************************don't understand put endpoint?******************************/
app.put('/project', (req, res) => {
    if(!(r))
});

const updated = {};
const updatableFields = ['projectName', 'startDate', 'budget', 'materialsNeeded', 'endDate'];
updatableFields.forEach(field => {
    if (field in req.body) {
        updated[field] = req.body.[field];
    }
});

app.use('*', function (req,res) {
    res.status(404).json({message: 'Not found'});
});


if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};