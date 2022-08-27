import http from 'http'
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _ = async () => {
    const isFile = path => fs.lstatSync(path).isFile()

    http.createServer((req, res) => {
        const fullPath = path.join(process.cwd(), req.url)

        if (!fs.existsSync(fullPath)) return res.end('File or directory not found')

        if (isFile(fullPath)) return fs.createReadStream(fullPath).pipe(res)

        let linksList = ''

        const urlParams = req.url.match(/[\d\w\.]+/gi)

        if (urlParams) {
            urlParams.pop()
            const prevUrl = urlParams.join('/')
            linksList = urlParams.length ? `<li><a href="/${prevUrl}">..</a>` : `<li><a href="/">..</a>`
        }
        fs.readdirSync(fullPath)
            .forEach(fileName => {
                linksList += `<li><a href="/${fileName}">${fileName}</a>`
            })
        const HTML = fs
            .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
            .replace('##App', linksList)

        res.writeHead(200, {
            'Content-Type': 'text-html',
        })

        return res.end(HTML)
    }).listen(8080)
}

_()