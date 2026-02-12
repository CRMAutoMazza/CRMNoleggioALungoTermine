
const http = require('http');

const port = process.env.PORT || 3000;

console.log(`[SANITY] Starting simple server... TIMESTAMP: ${new Date().toISOString()}`);
console.log(`[SANITY] PORT: ${port}`);
console.log(`[SANITY] Binding to 0.0.0.0`);

const server = http.createServer((req, res) => {
    console.log(`[SANITY] Request received: ${req.method} ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Sanity Check Passed: Server is Reachable!\n');
});

server.listen(port, '0.0.0.0', () => {
    console.log(`[SANITY] Server running at http://0.0.0.0:${port}/`);
});

// Prevent immediate exit
process.on('SIGTERM', () => {
    console.log('[SANITY] SIGTERM received');
    server.close(() => {
        console.log('[SANITY] Process terminated');
    });
});
