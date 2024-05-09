const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server to serve the files
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const contentType = getContentType(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

// Define MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
};

// Function to get content type based on file extension
function getContentType(filePath) {
    const extname = path.extname(filePath);
    return mimeTypes[extname] || 'text/html';
}

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Open the browser automatically
exec(`xdg-open http://localhost:${PORT}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error opening browser: ${error}`);
        return;
    }
    console.log(stdout);
});
