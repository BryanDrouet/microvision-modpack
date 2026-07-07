#!/usr/bin/env node

/**
 * Simple server to serve MicroVision modpack files
 * Serves distribution.json locally and proxies mods from Cloudflare R2
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const DIST_FILE = path.join(__dirname, 'distribution.json');
const R2_BASE_URL = 'https://795767fa6982c647550f340c15378e6a.r2.cloudflarestorage.com';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Distribution.json endpoint
    if (pathname === '/distribution.json') {
        res.setHeader('Content-Type', 'application/json');
        
        if (fs.existsSync(DIST_FILE)) {
            const content = fs.readFileSync(DIST_FILE, 'utf8');
            res.writeHead(200);
            res.end(content);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'distribution.json not found' }));
        }
        return;
    }

    // Health check endpoint
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'ok',
            r2_base: R2_BASE_URL,
            distro_file: fs.existsSync(DIST_FILE) ? 'exists' : 'missing'
        }));
        return;
    }

    // Default response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('MicroVision Modpack Server\nAvailable endpoints:\n- /distribution.json\n- /health');
});

server.listen(PORT, () => {
    console.log(`🚀 MicroVision server running at http://localhost:${PORT}`);
    console.log(`📋 Distribution: http://localhost:${PORT}/distribution.json`);
    console.log(`🏥 Health: http://localhost:${PORT}/health`);
    console.log(`📦 Mods hosted on Cloudflare R2: ${R2_BASE_URL}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\n👋 Server stopped');
    process.exit(0);
});
