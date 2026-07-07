# 📦 Instructions pour Publier le Launcher

## ✅ État Actuel

Le fichier `MicroVision-Setup.exe` est prêt à être publié:
- ✅ Compilé et prêt à l'emploi
- ✅ Ignord par Git (dans .gitignore) 
- ✅ Hébergé localement: `c:\Users\Administrateur\Desktop\Autre\microvision-modpack\microvision-modpack\MicroVision-Setup.exe`
- ✅ Taille: ~50 MB

## 🚀 Options de Distribution

### Option 1: GitHub Releases (RECOMMANDÉ)

Les meilleures pratiques pour tes utilisateurs:

**Voici comment le publier manuellement:**

1. Va sur GitHub: https://github.com/BryanDrouet/microvision-modpack/releases/new
2. Clique sur "Create a new release"
3. Remplis les champs:
   - **Tag version**: `v2.2.1-launcher`
   - **Release title**: `MicroVision Modpack Launcher v2.2.1`
   - **Description**: 
     ```
     🎮 MicroVision Modpack Launcher
     
     ### Features:
     - 135+ Mods for Minecraft 1.20.1
     - Automatic cloud download (Cloudflare R2)
     - Easy installation
     - Automatic updates
     
     ### System Requirements:
     - Java 17+
     - Windows 7+ / macOS 10.12+
     - 20GB free disk space
     - 8GB RAM (16GB recommended)
     
     ### Installation:
     1. Download MicroVision-Setup.exe
     2. Run the installer
     3. Follow the on-screen instructions
     4. Play!
     ```
4. Glisse-dépose le fichier `MicroVision-Setup.exe` dans la zone des fichiers
5. Clique sur "Publish release"

**Lien de téléchargement automatique sera:**
```
https://github.com/BryanDrouet/microvision-modpack/releases/download/v2.2.1-launcher/MicroVision-Setup.exe
```

### Option 2: Hébergement personnalisé (Si tu veux)

Tu peux aussi héberger le .exe sur Cloudflare R2 comme les mods:

```bash
# Ajouter à ton script R2
cloudflare-r2 upload-file ./MicroVision-Setup.exe
# URL: https://mods.microvision-modpack.bryan.ovh/MicroVision-Setup.exe
```

## 🔄 Mise à jour de la Page Web

Une fois que tu as créé la GitHub Release, mets à jour le lien dans `index.html`:

Le lien actuellement utilisé:
```html
href="https://github.com/BryanDrouet/microvision-modpack/releases/download/latest/MicroVision-Setup.exe"
```

À remplacer par (après publication):
```html
href="https://github.com/BryanDrouet/microvision-modpack/releases/download/v2.2.1-launcher/MicroVision-Setup.exe"
```

## 📊 Checklist de Lancement

- [ ] Publier GitHub Release avec MicroVision-Setup.exe
- [ ] Tester le lien de téléchargement
- [ ] Vérifier que le launcher s'installe correctement
- [ ] Vérifier que les mods se téléchargent depuis R2
- [ ] Mettre à jour les liens sur index.html si nécessaire
- [ ] Annoter https://microvision-modpack.bryan.ovh en tant que site officiel

## 🎯 Flux Utilisateur Final

```
User visits:
1. https://microvision-modpack.bryan.ovh
   ↓ (clique Télécharger)
2. GitHub Release page
   ↓ (télécharge .exe)
3. Lance MicroVision-Setup.exe
   ↓ (installateur)
4. Launcher télécharge les mods de R2
   ↓ (cloudflare mods.microvision-modpack.bryan.ovh)
5. Jeu lancé! 🎮
```

## 🌐 Domaine Personnalisé

Pour que le site soit plus officiel, tu peux:

1. Pointer `microvision-modpack.bryan.ovh` vers GitHub Pages:
   - Va sur ton repo GitHub
   - Settings → Pages
   - Choisis `main` branche et `/` root
   - Activate

2. Ou utilise Cloudflare Pages (plus simple):
   - Connecte ton repo GitHub
   - Cloudflare detectera automatiquement le site
   - Configure le domaine personnalisé

---

**C'est prêt! À toi de publier! 🚀**
