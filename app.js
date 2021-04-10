const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const FileRoutes = require('./routes/FileRoutes')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('',FileRoutes)
app.use(cors())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8083,()=>{
  console.log("Сервер запущен на порту " + (process.env.PORT || 8083))
});




//График не грузится


// TODO для остальных : написать документацию( как пользоваться приложением со скринами и красивым оформлением)
// Всевозможно протестировать

