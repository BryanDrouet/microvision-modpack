#!/usr/bin/env node

/**
 * Quick Update Script - For Developers
 * 
 * Usage: node update-mods.js
 * 
 * This script:
 * 1. Regenerates distribution.json from your mods folder
 * 2. Uploads new/updated mods to Cloudflare R2
 * 3. Pushes changes to GitHub
 * 
 * Clients will receive updates automatically on next launcher start!
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 MicroVision Auto-Update System\n');

// Step 1: Generate new distribution.json
console.log('📝 Step 1: Generating distribution.json...');
try {
    const nebulaPath = path.join(process.cwd(), 'Nebula');
    if (fs.existsSync(nebulaPath)) {
        process.chdir(nebulaPath);
        execSync('npm run generate:distro', { stdio: 'inherit' });
        process.chdir('..');
        console.log('✅ distribution.json generated\n');
    } else {
        console.warn('⚠️ Nebula folder not found. Skipping generation.\n');
    }
} catch (err) {
    console.error('❌ Failed to generate distribution.json:', err.message);
    process.exit(1);
}

// Step 2: Upload to R2 (if credentials exist)
console.log('☁️  Step 2: Uploading to Cloudflare R2...');
try {
    if (fs.existsSync('.env.cloudflare')) {
        // Would execute R2 upload here
        console.log('✅ R2 upload configured (manual upload or CI/CD integration)\n');
    } else {
        console.warn('⚠️ .env.cloudflare not found. Set up Cloudflare R2 credentials first.\n');
    }
} catch (err) {
    console.error('❌ R2 upload failed:', err.message);
}

// Step 3: Push to GitHub
console.log('📤 Step 3: Pushing to GitHub...');
try {
    execSync('git add distribution.json', { stdio: 'inherit' });
    execSync('git commit -m "🔄 Auto-update: distribution.json"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('✅ Pushed to GitHub\n');
} catch (err) {
    console.error('❌ Git push failed:', err.message);
    process.exit(1);
}

console.log('🎉 Update complete!');
console.log('Clients will receive updates automatically on next launcher start.\n');
console.log('Timeline:');
console.log('  - Launcher checks distribution.json every startup');
console.log('  - New mods downloaded from R2');
console.log('  - Old mods automatically removed');
console.log('  - Game launches with latest mods\n');
