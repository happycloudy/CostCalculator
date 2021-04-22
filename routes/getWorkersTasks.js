const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.get('/getworkerstasks', (req, res) => { // не используется
    let tasks = []
    fs.createReadStream('./data/Tasks.csv')
        .pipe(csv())
        .on('data', (data) => tasks.push(data))
        .on('end', () => {
            let tasksGroupedByName = []
            tasks.forEach(task => {
                let worker = tasksGroupedByName.find(worker => worker.name === task.name)
                worker = worker === undefined ? {name: undefined, tasks: undefined} : worker
                if (task.name !== worker.name && worker.name === undefined) { // была ошибка с вопросами(знаками :///)
                    tasksGroupedByName.push(
                        {
                            name: task.name,
                            tasks: []
                        }
                    )
                }
            })
            tasks.forEach(task => {
                let worker = tasksGroupedByName.find(worker => worker.name === task.name)
                worker.tasks.push(
                    {
                        task: task.task,
                        StartTime: task.StartTime,
                        EndTime: task.EndTime,
                        time: task.time
                    })
            })
            res.send(tasksGroupedByName)
        });
})

module.exports = router