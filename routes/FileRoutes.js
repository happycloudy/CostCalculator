const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();
const getMinTimeWorker = require('../external/getMinTimeWorker')

router.post('/addworker', async (req, res) => {
    let worker = {
        name: req.body.WorkerName,
        payment: req.body.WorkerCost,
        specialty: req.body.WorkerSpecialty
    }
    fs.appendFile('./data/Workers.csv', `${worker.name},${worker.payment},${worker.specialty}\n`, err => err ? console.log(err) : null)
    return res.redirect('/')
});


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


router.get('/loadworkerswithcost', (req, res) => {
    let workers = []
    fs.createReadStream('./data/Workers.csv')
        .pipe(csv())
        .on('data', (data) => workers.push(data))
        .on('end', () => {
            let tasks = []
            fs.createReadStream('./data/Tasks.csv')
                .pipe(csv())
                .on('data', (data) => tasks.push(data))
                .on('end', () => {
                    let workersWithFullCost = []
                    workers.forEach((worker) => {
                        let ArrOfTasks = tasks.filter((task) => task.name === worker.name) // задания отдельного сотрудника
                        worker = {
                            name: worker.name,
                            payment: worker.payment,
                            specialty: worker.specialty,
                            cost: CalculateCost(worker, ArrOfTasks) || 0,
                            time: CalculateTime(ArrOfTasks),
                            tasks: ArrOfTasks,

                        }
                        workersWithFullCost.push(worker)
                    })
                    res.send(workersWithFullCost)
                });

        });


    function CalculateCost(worker, ArrOfTasks) {
        let time = 0
        ArrOfTasks.forEach((task) => {
            time += parseFloat(task.time)
            if (task.isOWRequest === 'true') time += 4
        })
        let Cost = time * worker.payment
        return (Cost)
    }

    function CalculateTime(ArrOfTasks) {
        let time = 0
        ArrOfTasks.forEach(task => time += parseFloat(task.time))
        return time
    }
})


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
                let workerWthMinTime = getMinTimeWorker(tasks,undefined)
                fs.appendFile('./data/Tasks.csv', `${workerWthMinTime.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
                console.log(`Задание для ${workerWthMinTime.name} добавлено`)
            })
    }

    if (incomingTask.name === undefined && !incomingTask.isSpRequest) {
        if (incomingTask.isChooseBtwSp && incomingTask.isChooseBtwSp !== 'Не выбран')
            console.log('Выбрана специальность, минимум по специальности')
            fs.createReadStream('./data/Tasks.csv')
                .pipe(csv())
                .on('data', (data) => tasks.push(data))
                .on('end', () => {
                    let workers = []
                    fs.createReadStream('./data/Workers.csv')
                        .pipe(csv())
                        .on('data', (data) => workers.push(data))
                        .on('end', () => {
                            let workerWthMinTime = getMinTimeWorker(tasks,incomingTask.isChooseBtwSp, workers)
                            fs.appendFile('./data/Tasks.csv', `${incomingTask.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
                            console.log(`Задание для ${workerWthMinTime.name} добавлено`)
                        })
                })
    }
    if (incomingTask.name !== undefined && !incomingTask.isSpRequest) {
        console.log("Ничего не поменялось")
        fs.appendFile('./data/Tasks.csv', `${incomingTask.name},${incomingTask.task},${incomingTask.StartTime},${incomingTask.EndTime},${incomingTask.time},${incomingTask.isOWRequest}\n`, err => err ? console.log(err) : null)
        console.log(`Задание для ${incomingTask.name} добавлено`)
    }
    return res.redirect('/')
})

router.get('/getspecialties', (req, res) => {
    let workers = []
    let specialties = []
    fs.createReadStream('./data/Workers.csv')
        .pipe(csv())
        .on('data', (data) => workers.push(data))
        .on('end', async () => {
            specialties.push(workers[0].specialty)
            await workers.forEach(worker => {
                let isExist = specialties.find(specialty => specialty === worker.specialty)
                if (!isExist) specialties.push(worker.specialty)
            })
            res.send(specialties)
        })
})

module.exports = router;