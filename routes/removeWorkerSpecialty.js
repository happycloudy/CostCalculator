const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/removeworkerspec', (req, res) => {
    let removingName = req.body.name
    let removingSpec = req.body.spec
    let workers = []

    fs.createReadStream('./data/Workers.csv')
        .pipe(csv())
        .on('data', (data) => workers.push(data))
        .on('end', () => {
            let remWorker = workers.find(worker => worker.name === removingName)
            let specialties = ''
            remWorker.specialty.split('; ').forEach(spec=>{
                if (spec !== removingSpec){
                    specialties = specialties === ''? `${spec}` : `${specialties}; ${spec}`
                }
            })


            fs.writeFileSync('./data/Workers.csv', 'name,payment,specialty\n')
            workers.forEach((worker) => {
                if(worker.name === remWorker.name){
                    fs.appendFileSync('./data/Workers.csv', `${worker.name},${worker.payment},${specialties}\n`)
                    return
                }
                fs.appendFileSync('./data/Workers.csv', `${worker.name},${worker.payment},${worker.specialty}\n`)
            })

            res.redirect('/')
        })
})

module.exports = router