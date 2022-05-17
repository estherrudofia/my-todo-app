const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/natours-test',  () => {console.log('Connected to Mongodb...')}, e => console.log(e));
