import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

// const server = http.createServer((req, res) => {
//     fs.readFile('./public/index.html', (err, data) => {
//         if (err) {
//             console.log('Something went wrong:', err);
//             res.writeHead(500);
//             res.end('Internal Server Error');
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(data);
//         }
//     });
// });

const server = http.createServer((req, res) => {
    const filePath = req.url === '/script.js' ? './public/script.js'  : './public/index.html';

    const contentType = req.url === '/script.js'  ? 'text/javascript' : 'text/html';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.end(data);
        }
    });
});

const wss = new WebSocketServer({ server });

const PORT = 3001;

wss.on('connection', (socket, req) => {
    const username = new URL(
        req.url,
        'http://localhost'
    ).searchParams.get('username');

    
    const message = {
        type: 'system',
        text: `${username} joined`
    };

    const messageString = JSON.stringify(message);

    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(messageString);
        }
    });

  
    socket.on('message', (data) => {
        const { username, text } = JSON.parse(data);

        const msg = {
            type: 'chat',
            username,
            text
        };

        const stringMsg = JSON.stringify(msg);

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(stringMsg);
            }
        });
    });


    socket.on('close', () => {
        const msg = {
            type: 'system',
            text: `${username} left`
        };

        const msgString = JSON.stringify(msg);

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(msgString);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
});
