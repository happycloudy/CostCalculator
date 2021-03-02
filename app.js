const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')
const csv = require('csv-parser')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/addworker', async (req, res) => {
  let worker = {
    name: req.body.WorkerName,
    payment: req.body.WorkerCost
  }
  fs.appendFile('./data/Workers.csv', `${worker.name},${worker.payment}\n`, err => err?console.log(err):null)
  
  return res.redirect('/')
});

app.get('/loadworkerswithcost', (req,res) =>{
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
        workers.forEach((worker) =>{
          let ArrOfTasks = tasks.filter((task) => task.name === worker.name )
          worker = {
            name : worker.name,
            cost: CalculateCost(worker,ArrOfTasks) || 0,
            time: CalculateTime(ArrOfTasks)
          }
          workersWithFullCost.push(worker)
        })
        console.log(workersWithFullCost);
        res.send(workersWithFullCost)
      });
  });

  function CalculateCost(worker,ArrOfTasks){
    let time = 0
    ArrOfTasks.forEach((task) => time += parseFloat(task.time))
    let Cost = time * worker.payment
    return(Cost)
  }
  function CalculateTime(ArrOfTasks){
    let time = 0
    ArrOfTasks.forEach(task => time += parseFloat(task.time))  
    return time
  }
})

app.post('/addworkertask', (req,res) =>{
  let task = {
    name: req.body.name,
    task: req.body.task,
    time: req.body.time
  }
  console.log(task);
  fs.appendFile('./data/Tasks.csv', `${task.name},${task.task},${task.time}\n`, err => err?console.log(err):null)
  
  return res.redirect('/')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
