import colors from 'colors'

let [from, to] = process.argv.slice(2)

const argsIsNaN = isNaN(from) || isNaN(to)
if (argsIsNaN) throw new Error('Some of arguments is not a number')

from = from < 2 ? 2 : from

const {green, yellow, red} = colors
const colorsList = [green, yellow, red]
let counter = 0

const isPrime = num => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false
    }

    return true
}

for (let i = from; i <= to; i++) {
    if (isPrime(i)) {
        const idx = counter % 3
        const colorPrime = colorsList[idx](i)
        console.log(colorPrime)
        counter++
    }
}

if (!counter) console.log(red('В диапазоне нет простых чисел'))
