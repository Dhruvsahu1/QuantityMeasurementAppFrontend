// Simple HTTP Server for the Quantity Measurement Frontend
// Run this script to serve the frontend files

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Extract path without query string (e.g., "/dashboard.html?oauth_token=xyz" -> "/dashboard.html")
    const pathParts = req.url.split('?');
    let filePath = pathParts[0];
    
    // Default to index.html for root
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    console.log('Serving file:', filePath);
    
    // Resolve the full file path
    const fullPath = path.join(BASE_DIR, filePath);
    
    // Security: prevent directory traversal
    if (!fullPath.startsWith(BASE_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    // Get the file extension
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found: ' + filePath);
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log('\n========================================');
    console.log('🌐 Frontend Server Running!');
    console.log('========================================');
    console.log(`   URL: http://localhost:${PORT}`);
    console.log(`   Press Ctrl+C to stop\n`);
    console.log('Make sure your Spring Boot backend is running on http://localhost:8080');
    console.log('========================================\n');
});