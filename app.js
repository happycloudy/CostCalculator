const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const addWorker = require('./routes/addWorker')
const addWorkerTask = require('./routes/addWorkerTask')
const getSpecialties = require('./routes/getSpecialties')
const getWorkersTasks = require('./routes/getWorkersTasks')
const loadWorkerWithCost = require('./routes/loadWorkerWithCost')
const removeTask = require('./routes/removeTask')
const removeWorker = require('./routes/removeWorker')
const addWorkerSpecialty = require('./routes/addWorkerSpecialty')
const addSpecialty = require('./routes/addSpecialty')
const removeSpecialty = require('./routes/removeSpecialty')
const ChooseTaskWorker = require('./routes/ChooseTaskWorker')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

// routes
app.use((req,res,next)=>{
  console.log(`\n${(new Date()).toLocaleString()}:`)
  next()
})

app.use(addWorker)
app.use(addWorkerTask)
app.use(getSpecialties)
app.use(getWorkersTasks)
app.use(loadWorkerWithCost)
app.use(removeTask)
app.use(removeWorker)
app.use(addWorkerSpecialty)
app.use(addSpecialty)
app.use(removeSpecialty)
app.use(ChooseTaskWorker)


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5001,()=>{
  console.log("Сервер запущен на порту " + (process.env.PORT || 5001))
});

