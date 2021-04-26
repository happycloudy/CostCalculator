const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();

router.post('/choosetaskworker', (req, res) => {
    let choosingTask = {
        task: req.body.task,
        workerName: req.body.workerName
    }
    if(choosingTask.task === undefined) res.sendStatus(404)
    let tasks = []
    fs.createReadStream('./data/Tasks.csv')
        .pipe(csv())
        .on('data', (data) => tasks.push(data))
        .on('end', () => {
            let taskInArr = tasks.filter(task=> !(task === choosingTask.task) && task.name === 'Свободно' )
            choosingTask.task = taskInArr[0]
            choosingTask.task.name = choosingTask.workerName // исходный вид задания из файла, в поле task

            fs.writeFileSync('./data/Tasks.csv', 'name,task,StartTime,EndTime,time,isOWRequest\n')
            tasks.forEach(task=>{
                if(task.task === choosingTask.task.task && task.time === choosingTask.task.time){
                    task = choosingTask.task // замена задания
                }
                fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.StartTime},${task.EndTime},${task.time},${task.isOWRequest}\n`, err => err ? console.log(err) : null)
            })
        })
    res.sendStatus(200)
})

module.exports = router