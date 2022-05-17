const Task = require('../model/tasksModel');


class tasksController {

    static allTasks = async (req, res) => {
        try { 
            res.status(200).render('index');
    } catch(e) {
        res.sendStatus(400);
    }
    }

    static singleTask = async (req, res) => {
        try {

        } catch(e) {
            res.sendStatus(400);
        }
    }

}


module.exports = tasksController;