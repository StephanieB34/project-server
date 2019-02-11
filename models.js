const uuid = require("uuid");

function StorageException(message) {
    this.message = message;
    this.name = "StorageException";
}

const projects = {
    create: function(projectName, startDate, budget, materialsNeeded, endDate) {
        const post = {
            projectName: projectName,
            startDate: startDate,
            budget: budget,
            materialsNeeded: materialsNeeded,
            endDate: endDate
        };
        this.posts.push(post);
        return post;
    },

    
}