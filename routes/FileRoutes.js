const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')
const router = express.Router();
const getMinTimeWorker = require('../external/getMinTimeWorker')

router.get('*',(req,res,next)=>{
    console.log(`\n${(new Date()).toLocaleString()}:`)
    next()
})
router.post('*',(req,res,next)=>{
    console.log(`\n${(new Date()).toLocaleString()}:`)
    next()
})

module.exports = router;