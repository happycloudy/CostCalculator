const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/addspecialty', async (req, res) => {
    let newSpec = req.body.specialty
    let specialties = []

    fs.createReadStream('./data/Specialties.csv')
        .pipe(csv())
        .on('data', (data) => specialties.push(data))
        .on('end', () => {
            fs.appendFile('./data/Specialties.csv', `${newSpec}\n`, err => err ? console.log(err) : null)
            console.log(`Специальность '${newSpec}' добавлена`)
            res.sendStatus(200)
        })
});

module.exports = router