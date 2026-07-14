# MicroVision Modpack

**Minecraft 1.20.1 Modpack** - 135+ mods, Forge 47.2.0

## Download

Download **MicroVision-Setup.exe** and run it. That's it!

The launcher will automatically download and manage all 135 mods.

## Automatic Updates
- The launcher checks for mod updates **every time it starts**
- Changes to `distribution.json` are fetched automatically
- Mods are hosted on Cloudflare R2 for fast downloads
- **Users get updates instantly without manual intervention**

### How It Works

```
Your Computer (Local)          GitHub              Cloudflare R2          User's Computer
    │                             │                      │                       │
    ├─ Change mod files          │                      │                       │
    ├─ Run: node update-mods.js   │                      │                       │
    │   ├─ Generate JSON ────────────────────────────────────────────────────────>
    │   ├─ Upload mods ───────────────────────────────────────────────────────────>
    │   └─ Push to GitHub ───────────>
    │                             │
    │                        Launcher downloads
    │                        distribution.json <─────────────────────────────────
    │                             │                      │                       │
    │                             │                   Launcher downloads
    │                             │                   mods from R2 <─────────────
    │                             │                      │                ✅ Automatic!
```

## For Developers

### Update Mods Easily

**One command to update everything:**

```bash
node update-mods.js
```

This will:
1. Generate new `distribution.json` from your mods
2. Upload changes to Cloudflare R2
3. Push to GitHub

Users get updates automatically on next launcher start!

### Manual Steps (if needed)

1. Edit or add mods in the local `mods/` folder
2. Run Nebula to generate `distribution.json`:
   ```bash
   cd Nebula
   npm run generate:distro
   ```
3. Upload updated mods to R2:
   ```bash
   # Use your Cloudflare R2 credentials from .env.cloudflare
   # Upload the mods/ folder to your R2 bucket
   ```
4. Push to GitHub:
   ```bash
   git add distribution.json
   git commit -m "Update: [describe changes]"
   git push origin main
   ```

## Repository Structure

- `index.html` - Landing page
- `distribution.json` - Mod metadata and URLs
- `MicroVision-Setup.exe` - Launcher installer
- `update-mods.js` - Quick update script
- `.env.cloudflare.example` - Template for Cloudflare R2
- `README.md` - This file

## Configuration

### Cloudflare R2 Setup

1. Create `.env.cloudflare` file (copy from `.env.cloudflare.example`)
2. Add your R2 credentials:
   ```
   CLOUDFLARE_ACCOUNT_ID=...
   CLOUDFLARE_ACCESS_KEY_ID=...
   CLOUDFLARE_SECRET_ACCESS_KEY=...
   CLOUDFLARE_BUCKET_NAME=microvision-modpack
   CLOUDFLARE_BUCKET_URL=https://...r2.cloudflarestorage.com
   ```

## Result

**Perfect for users:**
- Download .exe once
- Updates happen automatically
- No manual intervention needed
- Always latest mods

**Perfect for developers:**
- One command to update
- Changes propagate instantly
- No complicated deployment
- Mods stored in cloud