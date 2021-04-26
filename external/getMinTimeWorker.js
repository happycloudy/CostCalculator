module.exports = function getInfo(tasks, specialty, workers) {
    let sortedArrByTasks = []
    workers.forEach(worker => { // сортировка по имени
        let uniqueTasks = tasks.filter(task => task.name === worker.name)
        let sumTime = 0
        uniqueTasks.forEach(task => {
            sumTime += parseInt(task.time)
        })
        sortedArrByTasks.push({
            name: worker.name,
            sumTime: sumTime,
            specialty: worker.specialty
        })
    })

    if (specialty !== undefined) {
        if (specialty !== 'Не выбран') {
            let workerWthMinTime = sortedArrByTasks[0]
            let minTime = sortedArrByTasks[0].sumTime || 10 ** 10
            sortedArrByTasks.forEach(worker => {
                if (specialty === worker.specialty) {
                    if (minTime > worker.sumTime) {
                        minTime = worker.sumTime
                        workerWthMinTime = worker
                    }
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