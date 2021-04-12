module.exports = function getInfo(tasks, specialty, workers) {
    let sortedArrByTasks = []
    tasks.forEach(task => { // сортировка по имени
        let workerInArr = tasks.find(worker => worker.name === task.name)
        if (!sortedArrByTasks.find(worker => worker.name === task.name)) {
            let uniqueTasks = tasks.filter(task => task.name === workerInArr.name)
            let sumTime = 0
            uniqueTasks.forEach(task => {
                sumTime += parseInt(task.time)
            })
            sortedArrByTasks.push({
                name: task.name,
                sumTime: sumTime
            })
        }
    }) // люди с заданиями
    workers.forEach(worker=>{
        let workerWithTasks = sortedArrByTasks.find(workerWthTasks=> worker.name === workerWthTasks.name)
        if(workerWithTasks === undefined) sortedArrByTasks.push({
            name: worker.name,
            sumTime: 0
        })
    }) // включая людей без заданий


    if (specialty !== undefined ) {
        if(specialty !== 'Не выбран'){
            let workerWthMinTime = sortedArrByTasks[0]
            let minTime = sortedArrByTasks[0].sumTime || 10 ^ 10

            sortedArrByTasks.forEach((workerInArr) => {
                let currentWorker = workers.find(worker => worker.name === workerInArr.name)
                workerInArr.specialty = currentWorker.specialty
            })

            sortedArrByTasks.forEach(worker => {
                if (minTime > worker.sumTime && worker.specialty === specialty) {
                    minTime = worker.sumTime
                    workerWthMinTime = worker
                }
            })
            return workerWthMinTime
        }
    }

    let minTime = sortedArrByTasks[0].sumTime || 10 ^ 10
    let workerWthMinTime = sortedArrByTasks[0]
    sortedArrByTasks.forEach(worker => {
        if (minTime > worker.sumTime) {
            minTime = worker.sumTime
            workerWthMinTime = worker
        }
    })
    return workerWthMinTime
}