const csv = require('csv-parser')
const fs  = require('fs')

module.exports = function getInfo(inputPath){
    let array = []
    fs.createReadStream(inputPath)
        .pipe(csv())
        .on('data', (data) => array.push(data)) 
        .on('end', ()=>{
            console.log(array);
            return array
        })
}