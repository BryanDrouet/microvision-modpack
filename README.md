# MicroVision Modpack

**Minecraft 1.20.1 Modpack** - 135+ mods, Forge 47.2.0

## 🎮 Download

Download **MicroVision-Setup.exe** and run it. That's it!

The launcher will automatically download and manage all 135 mods.

## 🔄 Automatic Updates

- The launcher checks for mod updates every time it starts
- Changes to `distribution.json` are fetched automatically
- Mods are hosted on Cloudflare R2 for fast downloads
- Users get updates instantly without manual intervention

## 📦 Repository Structure

- `index.html` - Landing page
- `distribution.json` - Mod metadata and URLs
- `MicroVision-Setup.exe` - Launcher installer
- `.env.cloudflare.example` - Template for Cloudflare R2 configuration

## 🚀 For Developers

### Update Mods
1. Change mod files in local `mods/` folder
2. Run Nebula to generate new `distribution.json`:
   ```bash
   cd Nebula
   npm run generate:distro
   ```
3. Upload updated mods to R2
4. Push `distribution.json` to GitHub

Users will receive updates automatically on next launcher start.