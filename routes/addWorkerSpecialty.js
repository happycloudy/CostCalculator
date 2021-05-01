const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/addworkerspecialty', async (req, res) => {
    let newSpec = {
        name: req.body.worker,
        specialty: req.body.specialty
    }
    let workers = []

    fs.createReadStream('./data/Workers.csv')
        .pipe(csv())
        .on('data', (data) => workers.push(data))
        .on('end', () => {
            let worker = workers.find(worker=> worker.name === newSpec.name)
            worker.specialty =  worker.specialty !== ''? `${worker.specialty}; ${newSpec.specialty}` : `${newSpec.specialty}`
            console.log(worker.specialty)
            fs.writeFileSync('./data/Workers.csv', 'name,payment,specialty\n')
            workers.forEach(workerArr=>{
                if(workerArr.name === worker.name){
                    workerArr = worker
                }
                fs.appendFile('./data/Workers.csv', `${workerArr.name},${workerArr.payment},${workerArr.specialty}\n`, err => err ? console.log(err) : null)
            })
            console.log(`Специальность '${newSpec.specialty}' для сотрудник ${newSpec.name} добавлен(а)`)
            res.sendStatus(200)
        })
});

module.exports = router