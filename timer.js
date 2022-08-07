import EventEmitter from 'events'
import moment from 'moment'
import 'moment-precise-range-plugin'

const emitter = new EventEmitter()

const [timerValue] = process.argv.slice(2)
const dateFormat = 'YYYY-MM-DD HH'

const getDateFromTimerValue = dateString => {
    const [hour, day, month, year] = dateString.split('-')
    return new Date(year, month - 1, day, hour)
}

const endDate = getDateFromTimerValue(timerValue)

const showTimer = endDate => {
    const currentDate = new Date()

    if (currentDate >= endDate) {
        emitter.emit('timerEnd')
        return
    }

    const currentFormatDate = moment(currentDate, dateFormat)
    const timerFormatDate = moment(endDate, dateFormat)
    const result = moment.preciseDiff(currentFormatDate, timerFormatDate)

    console.log(result)
}

const showTimerDone = intervalId => {
    clearInterval(intervalId)
    console.log('End')
}

emitter.on('timerTick', showTimer)
emitter.on('timerEnd', () => showTimerDone(intervalId))

const intervalId = setInterval(
    () => emitter.emit('timerTick', endDate),
    1000
)