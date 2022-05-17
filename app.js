const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tasks = require('./routes/taskRoutes');


mongoose.connect('mongodb://localhost:27017/todo-list')
.then(() => {
    console.log('Connected to mongodb');
})
.catch(e => {
    console.log(e)
});


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// ejs
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;

// API ROUTES
app.use('/', tasks);

// .....................................
// .....................................

// START THE SERVER
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
