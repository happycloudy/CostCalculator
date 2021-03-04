const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')
const csv = require('csv-parser')
const FileRoutes = require('./routes/FileRoutes')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('',FileRoutes)




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8083,()=>{
  console.log("Сервер запущен на порту " + (process.env.PORT || 8083))
});







// TODO для остальных : написать документацию( как пользоваться приложением со скринами и красивым оформлением)
// Всевозможно протестировать

