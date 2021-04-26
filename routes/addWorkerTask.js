const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();
const getMinTimeWorker = require('../external/getMinTimeWorker')

router.post('/addworkertask', (req, res) => {
    let incomingTask = {
        name: req.body.name,
        task: req.body.task,
        time: req.body.time,
        isSpRequest: req.body.isSpecialtyRequest,
        isOWRequest: req.body.isOverWorkRequest,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        isChooseBtwSp: req.body.isChooseBtwSp
    }
    let tasks = []
    if (incomingTask.isSpRequest) {
    }

    if (!incomingTask.isSpRequest) {
        if (incomingTask.isChooseBtwSp && incomingTask.isChooseBtwSp !== 'Не выбран') {

        }
    }

    if (!incomingTask.isSpRequest && (incomingTask.isChooseBtwSp === 'Не выбран' || incomingTask.isChooseBtwSp === undefined) ) {
        console.log("Ничего не поменялось")
        fs.appendFile('./data/Tasks.csv', `${incomingTask.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
        console.log(`Задание для ${incomingTask.name} добавлено`)
        return res.sendStatus(200)
    }

})

module.exports = router