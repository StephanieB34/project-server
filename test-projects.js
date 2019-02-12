'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { projects } = require('../models');
const { closeServer, runServer, app } = require('../server');

chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject (err));
    });
}

/*function seedProjectData() {
    console.info('seeding project data');
    const seedData = [];
    for(let i=1; i <=10 ; i++) {
        seedData.push({
            startDate: 
        ); 
    }
}*/