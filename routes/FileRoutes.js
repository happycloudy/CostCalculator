const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();



router.post('/addworker', async (req, res) => {
    let worker = {
      name: req.body.WorkerName,
      payment: req.body.WorkerCost
    }
    fs.appendFile('./data/Workers.csv', `${worker.name},${worker.payment}\n`, err => err?console.log(err):null)
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

                    fs.writeFileSync('./data/Workers.csv', 'name,payment\n')
                    RemovedArrOfWorkers.forEach((worker) => {
                        fs.appendFileSync('./data/Workers.csv', `${worker.name},${worker.payment}\n`)
                    })
                    fs.writeFileSync('./data/Tasks.csv', 'name,task,time\n')
                    RemovedArrOfTasks.forEach((task) => {
                        fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.time}\n`, err => err ? console.log(err) : null)
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
            res.send(tasks)
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
                        let ArrOfTasks = tasks.filter((task) => task.name === worker.name)
                        worker = {
                            name: worker.name,
                            payment: worker.payment,
                            cost: CalculateCost(worker, ArrOfTasks) || 0,
                            time: CalculateTime(ArrOfTasks),
                            tasks: ArrOfTasks
                        }
                        workersWithFullCost.push(worker)
                    })
                    res.send(workersWithFullCost)
                });

        });


    function CalculateCost(worker, ArrOfTasks) {
        let time = 0
        ArrOfTasks.forEach((task) => time += parseFloat(task.time))
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
            fs.writeFileSync('./data/Tasks.csv', 'name,task,time\n')
            RemovedArrOfTasks.forEach((task) => {
                fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.time}\n`, err => err ? console.log(err) : null)
            })
            console.log('удалено задание: ' + TaskInfo.task + ', ' + TaskInfo.name);
        })
    res.send(true)
})




router.post('/addworkertask', (req, res) => {
    let task = {
        name: req.body.name,
        task: req.body.task,
        time: req.body.time
    }
    fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.time}\n`, err => err ? console.log(err) : null)
    return res.redirect('/')
})

module.exports = router;