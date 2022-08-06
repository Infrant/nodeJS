import colors from 'colors'

let [from, to] = process.argv.slice(2)

const argsIsNaN = isNaN(from) || isNaN(to)
if (argsIsNaN) throw new Error('Some of arguments is not a number')

from = from < 2 ? 2 : from

const {green, yellow, red} = colors
const colorsList = [green, yellow, red]
let counter = 0

for (let i = from; i <= to; i++) {
    let isPrime = true

    for (let j = 2; j < i; j++) {
        if (i % j === 0) isPrime = false
    }

    if (isPrime) {
        const idx = counter % 3
        const colorPrime = colorsList[idx](i)
        console.log(colorPrime)
        counter++
    }
}

if (!counter) console.log(red('В диапозоне нет простых чисел'))
