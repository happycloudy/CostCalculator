const express = require('express')
const fs = require('fs')
const router = express.Router();
const csv = require('csv-parser')

router.post('/removespecialty', async (req, res) => {
    let removedSpec = req.body.specialty
    let specialties = []

    fs.createReadStream('./data/Specialties.csv')
        .pipe(csv())
        .on('data', (data) => specialties.push(data))
        .on('end', () => {
            fs.writeFileSync('./data/Specialties.csv', 'specialty\n')
            specialties.forEach(spec=>{
                if(spec.specialty !== removedSpec){
                    console.log(spec.specialty)
                    fs.appendFile('./data/Specialties.csv', `${spec.specialty}\n`, err => err ? console.log(err) : null)
                }
            })
            console.log(`Специальность '${removedSpec}' удалена`)
            res.sendStatus(200)
        })
});

module.exports = router