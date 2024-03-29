# D3.js

My notes learning JavaScript and D3.js.

Each folder contains a different project or example.

## Usage

### Basic File Serving

In order to access the data in the browser, a local server must be running.

To serve files locally with Node.js:

1. cd into the desired directory
2. Initialize a Node.js project with `npm init -y`
3. Install http-server with `npm install http-server`
4. Run the server with `npx http-server`

### File Serving with Node.js Script

To serve files locally with a Node.js script:

1. cd into the desired directory
2. Create a new file called `server.js`
3. Run the server with `node server.js`
4. Access the server at `http://localhost:3000/` in your browser

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html by default if no specific file is requested
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```
