const { createServer } = require('http');
const { readFileSync, writeFileSync } = require('fs');

//! Create and listen server
createServer(async function (req, res) {
    if (req.method == 'GET') {
        serveFile(req.url, res)
    } 

    }
).listen(1337)

function serveFile(path, res) {
    let file;
    try{
        switch (path) {
            case '/message.html':
                file = readFileSync(__dirname + '/public/message.html', 'utf-8')
                break;
            case '/':
                path += 'index.html'
                file = readFileSync(__dirname + '/public' + path)
                break         
            default:
                file = readFileSync(__dirname + '/public' + path);
        }
        res.end(file)
    }
    
    catch {
        file = readFileSync(__dirname + '/404.html');
        res.end(file);
    }

    
}