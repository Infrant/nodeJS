import * as fs from 'fs'
import * as readline from 'readline'

const readStream = fs.createWriteStream('./access.log', 'utf8')
const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log')
const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log')

const rl = readline.createInterface({
    input: readStream,
    terminal: true,
})

rl.on('line', line => {
    if (line.includes('89.123.1.41')) {
        writeStream1.write(line + '\n')
    }

    if (line.includes('34.48.240.111')) {
        writeStream2.write(line + '\n')
    }
})