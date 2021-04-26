const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();
const getMinTimeWorker = require('../external/getMinTimeWorker')

router.post('/sorttaskwthoutspec', (req, res) => {
    let incomingTask = {
        name: req.body.name,
        task: req.body.task,
        time: req.body.time,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime
    }

    let tasks = []
    console.log('Минимум среди всех')
    fs.createReadStream('./data/Tasks.csv')
        .pipe(csv())
        .on('data', (data) => tasks.push(data))
        .on('end', () => {
            let workers = []
            fs.createReadStream('./data/Workers.csv')
                .pipe(csv())
                .on('data', (data) => workers.push(data))
                .on('end', () => {
                    if (workers.length === 0) {
                        res.send('Нету работников')
                        return
                    }
                    let workerWthMinTime = getMinTimeWorker(tasks, undefined, workers)

                    fs.writeFileSync('./data/Tasks.csv', 'name,task,StartTime,EndTime,time,isOWRequest\n')
                    tasks.forEach((task) => {
                        if(task.task === incomingTask.task){
                            fs.appendFile('./data/Tasks.csv', `${workerWthMinTime.name},${task.task},${task.StartTime},${task.EndTime},${task.time},${task.isOWRequest}\n`, err => err ? console.log(err) : null)
                            return
                        }
                        fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.StartTime},${task.EndTime},${task.time},${task.isOWRequest}\n`, err => err ? console.log(err) : null)
                    })
                    console.log(`Задание для ${workerWthMinTime.name} добавлено`)
                })
        })
    res.sendStatus(200)
})

module.exports = router