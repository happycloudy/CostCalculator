const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();

router.get('/getspecialties', (req, res) => {
    let specialties = []
    fs.createReadStream('./data/Specialties.csv')
        .pipe(csv())
        .on('data', (data) => specialties.push(data.specialty))
        .on('end', () => {
            res.send(specialties)
        })
})

module.exports = router