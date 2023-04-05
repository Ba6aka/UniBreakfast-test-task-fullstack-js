const { createServer } = require('http');
const { readFileSync, writeFileSync } = require('fs');

//! Create and listen server
createServer(async function (req, res) {
    if (req.method == 'GET') {
        serveFile(req.url, res)
    } else {
        const message = await getBody(req)
        if (req.url == '/postCalculation') {
            saveFile(message, res, 'numbers')
        } else {
            saveFile(message, res, 'messages')
        }

    }
}).listen(1337)

//! Serve and save files
function serveFile(path, res) {
    let file;
    try {
        switch (path) {
            case '/message.html':
                file = readFileSync(__dirname + '/public/message.html', 'utf-8')
                const html = renderMessages()
                file = file.replace('{smth}', html)
                break;
            case '/':
                path += 'index.html'
                file = readFileSync(__dirname + '/public' + path)
                break
            case '/getCalculation':
                file = calculation()
                break
            case '/db.json':
                file = readFileSync(__dirname + path)
                break;
            default:
                file = readFileSync(__dirname + '/public' + path);
        }
        res.end(file)
    }

    catch {
        file = readFileSync(__dirname + '/public/404.html');
        res.end(file);
    }


}


function saveFile(message, res, type) {
    const json = readFileSync(__dirname + '/db.json', 'utf-8');
    const arr = JSON.parse(json);
    arr[type].push(JSON.parse(message));

    const newJson = JSON.stringify(arr);
    const file = writeFileSync(__dirname + '/db.json', newJson);
    res.end(file);
}

async function getBody(req) {
    let body = '';

    for await (const chunk of req) body += chunk

    return body
}

function renderMessages() {
    const json = readFileSync(__dirname + '/db.json', 'utf-8');
    const arr = JSON.parse(json)['messages'];

    let html = '';

    for (let i of arr) {
        html += `
        <li>
      <p>${i.message}</p>
      <div class="row">
          <span class="author">${i.author}</span>
          <span class="date">${i.dataTime}</span>
      </div>
      <button id='${i.id}'>delete</button>
      </li>
    `
    };

    return html
}