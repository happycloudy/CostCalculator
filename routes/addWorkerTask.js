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
        console.log('Минимум среди всех')
        fs.createReadStream('./data/Tasks.csv')
            .pipe(csv())
            .on('data', (data) => tasks.push(data))
            .on('end', () => {
                let workers = []
                fs.createReadStream('./data/Workers.csv')
                    .pipe(csv())
                    .on('data', (data) => workers.push(data))
                    .on('end',  () => {
                        if(workers.length === 0) {
                            res.send('Нету работников')
                            return
                        }
                        let workerWthMinTime = getMinTimeWorker(tasks, undefined, workers)
                        fs.appendFile('./data/Tasks.csv', `${workerWthMinTime.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
                        console.log(`Задание для ${workerWthMinTime.name} добавлено`)
                        return res.sendStatus(200)
                    })
            })
    }

    if (!incomingTask.isSpRequest) {
        if (incomingTask.isChooseBtwSp && incomingTask.isChooseBtwSp !== 'Не выбран') {
            console.log('Выбрана специальность, минимум по специальности')
            fs.createReadStream('./data/Tasks.csv')
                .pipe(csv())
                .on('data', (data) => tasks.push(data))
                .on('end', () => {
                    let workers = []
                    fs.createReadStream('./data/Workers.csv')
                        .pipe(csv())
                        .on('data', (data) => workers.push(data))
                        .on('end',  () => {
                            if(workers.length === 0) {
                                res.send('Нету работников')
                                return
                            }
                            let workerWthMinTime = getMinTimeWorker(tasks, incomingTask.isChooseBtwSp, workers)
                            console.log(workerWthMinTime)
                            fs.appendFile('./data/Tasks.csv', `${workerWthMinTime.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
                            console.log(`Задание для ${workerWthMinTime.name} добавлено`)
                            return res.sendStatus(200)
                        })
                })
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