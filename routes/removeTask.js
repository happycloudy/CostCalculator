const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();

router.post('/removetask', (req, res) => {
    let TaskInfo = req.body
    let tasks = []
    fs.createReadStream('./data/Tasks.csv')
        .pipe(csv())
        .on('data', (data) => tasks.push(data))
        .on('end', () => {
            let RemovedArrOfTasks = tasks.filter((task) => {
                if (task.name == TaskInfo.name) {
                    if (task.task == TaskInfo.task) {
                        return false
                    }
                }
                return true
            })
            fs.writeFileSync('./data/Tasks.csv', 'name,task,StartTime,EndTime,time,isOWRequest\n')
            RemovedArrOfTasks.forEach((task) => {
                fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.StartTime},${task.EndTime},${task.time},${task.isOWRequest}\n`, err => err ? console.log(err) : null)
            })
            console.log('удалено задание: ' + TaskInfo.task + ', ' + TaskInfo.name);
        })
    res.sendStatus(200)
})

module.exports = router