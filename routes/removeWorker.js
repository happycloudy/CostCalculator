const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/removeworker', (req, res) => {
    let RemovingName = req.body.name
    let workers = []
    let tasks = []

    fs.createReadStream('./data/Workers.csv')
        .pipe(csv())
        .on('data', (data) => workers.push(data))
        .on('end', () => {
            fs.createReadStream('./data/Tasks.csv')
                .pipe(csv())
                .on('data', (data) => tasks.push(data))
                .on('end', () => {
                    let RemovedArrOfWorkers = workers.filter((worker) => worker.name != RemovingName)
                    let RemovedArrOfTasks = tasks.filter((task) => task.name != RemovingName)

                    fs.writeFileSync('./data/Workers.csv', 'name,payment,specialty\n')
                    RemovedArrOfWorkers.forEach((worker) => {
                        fs.appendFileSync('./data/Workers.csv', `${worker.name},${worker.payment},${worker.specialty}\n`)
                    })
                    fs.writeFileSync('./data/Tasks.csv', 'name,task,StartTime,EndTime,time,isOWRequest\n')
                    RemovedArrOfTasks.forEach((task) => {
                        fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.StartTime},${task.EndTime},${task.time},${task.isOWRequest}\n`, err => err ? console.log(err) : null)
                    })
                    console.log('удален ' + RemovingName);
                })
            res.redirect('/')
        })
})

module.exports = router