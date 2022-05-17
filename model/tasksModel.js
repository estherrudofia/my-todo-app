const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    input: String
});

const Tasks = mongoose.model('Tasks', taskSchema); 

module.exports = Tasks;