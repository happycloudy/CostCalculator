const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

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

module.exports = router