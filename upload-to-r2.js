const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.cloudflare' });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME;
const BUCKET_URL = process.env.CLOUDFLARE_BUCKET_URL;

if (!ACCOUNT_ID || !API_TOKEN || !BUCKET_NAME || !BUCKET_URL) {
    console.error('❌ Missing Cloudflare R2 credentials in .env.cloudflare');
    console.error('Please configure: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_BUCKET_NAME, CLOUDFLARE_BUCKET_URL');
    process.exit(1);
}

const s3Client = new S3Client({
    region: 'auto',
    credentials: {
        accessKeyId: ACCOUNT_ID,
        secretAccessKey: API_TOKEN,
    },
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
});

async function calculateMD5(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);
        stream.on('data', data => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

async function uploadFile(filePath, key) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const fileSize = fileBuffer.length;
        const md5Hash = await calculateMD5(filePath);

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
        }));

        console.log(`✅ Uploaded: ${key} (${(fileSize / 1024 / 1024).toFixed(2)} MB) - MD5: ${md5Hash}`);
        return { key, size: fileSize, md5: md5Hash };
    } catch (error) {
        console.error(`❌ Error uploading ${key}:`, error.message);
        throw error;
    }
}

async function uploadModsDirectory(modsPath) {
    if (!fs.existsSync(modsPath)) {
        console.error(`❌ Mods directory not found: ${modsPath}`);
        process.exit(1);
    }

    const files = fs.readdirSync(modsPath);
    const results = [];

    console.log(`📦 Found ${files.length} mods to upload...`);
    console.log('');

    for (const file of files) {
        const filePath = path.join(modsPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && (file.endsWith('.jar') || file.endsWith('.zip'))) {
            const key = `mods/${file}`;
            const result = await uploadFile(filePath, key);
            results.push(result);
        }
    }

    return results;
}

async function main() {
    try {
        console.log('🚀 Starting upload to Cloudflare R2...\n');

        // Upload from Nebula/servers/MicroVision/mods
        const nebulaModsPath = path.join(__dirname, '..', '..', 'Nebula', 'servers', 'MicroVision', 'mods');
        
        if (fs.existsSync(nebulaModsPath)) {
            console.log(`📂 Uploading mods from: ${nebulaModsPath}\n`);
            const results = await uploadModsDirectory(nebulaModsPath);
            
            console.log('');
            console.log(`✨ Upload complete! ${results.length} files uploaded.`);
            console.log(`📍 Base URL: ${BUCKET_URL}/mods/`);
        } else {
            console.log(`⚠️  Mods directory not found at: ${nebulaModsPath}`);
        }
    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

main();
