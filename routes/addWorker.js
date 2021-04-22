const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/addworker', async (req, res) => {
    let worker = {
        name: req.body.WorkerName,
        payment: req.body.WorkerCost,
        specialty: req.body.WorkerSpecialty
    }
    let specialies = []

    fs.createReadStream('./data/Specialties.csv')
        .pipe(csv())
        .on('data', (data) => specialies.push(data))
        .on('end', () => {
            if (!specialies.find(spec => spec === worker.specialty))
                fs.appendFile('./data/Specialties.csv', `${worker.specialty}\n`, err => err ? console.log(err) : null)

            fs.appendFile('./data/Workers.csv', `${worker.name},${worker.payment},${worker.specialty}\n`, err => err ? console.log(err) : null)
            console.log(`Сотрудник ${worker.name} добавлен(а)`)
            return res.redirect('/')
        })
});

module.exports = router