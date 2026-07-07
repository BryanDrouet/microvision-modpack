# 🎮 Guide d'Installation du MicroVision Modpack Launcher

## ✅ Ce qui a été fait automatiquement

1. ✅ Configuration complète du projet Nebula
2. ✅ Génération du serveur MicroVision (Minecraft 1.20.1 + Forge 47.2.0)
3. ✅ Création du fichier `distribution.json` avec tous les mods
4. ✅ Configuration du HeliosLauncher avec ton URL personnalisée
5. ✅ Compilation de l'exécutable Windows (`MicroVision-Setup.exe`)
6. ✅ Préparation de l'infrastructure Cloudflare R2

---

## 🔧 Tâches à Faire Manuellement

### 1️⃣ Configurer Cloudflare R2 (Dashboard)

#### Créer un Bucket R2:
1. Accède à https://dash.cloudflare.com/
2. **R2** → **Create bucket**
3. Remplis:
   - **Bucket name**: `microvision-modpack`
   - **Region**: Auto
   - Clique **Create**

#### Générer les Clés API:
1. Va à **R2** → **API Tokens**
2. **Create API Token**
3. Remplis:
   - **Token name**: `modpack-upload`
   - **Permission**: Object Read and Write
   - **Bucket resources**: Select `microvision-modpack`
   - **TTL**: 10 years (ou ne l'expire jamais)
4. **Create Token**
5. Copie et sauvegarde:
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (visible sur le dashboard R2)

### 2️⃣ Créer le Fichier `.env.cloudflare`

Dans la racine du projet, crée le fichier `.env.cloudflare`:

```powershell
# À la racine: C:\Users\Administrateur\Desktop\Autre\microvision-modpack\microvision-modpack
# Créer le fichier .env.cloudflare avec ce contenu:

CLOUDFLARE_ACCOUNT_ID=1a2b3c4d5e6f7g8h9i0j
CLOUDFLARE_API_TOKEN=v1.cxyz...abcd123...
CLOUDFLARE_BUCKET_NAME=microvision-modpack
CLOUDFLARE_BUCKET_URL=https://1a2b3c4d5e6f7g8h9i0j.r2.cloudflarestorage.com
```

### 3️⃣ Uploader les Mods sur Cloudflare R2

Exécute dans PowerShell:

```powershell
cd "C:\Users\Administrateur\Desktop\Autre\microvision-modpack\microvision-modpack"

# Installe la dépendance AWS SDK
npm install --save-dev @aws-sdk/client-s3

# Lance l'upload
node upload-to-r2.js
```

**Résultat attendu**: Tous tes mods (134 fichiers) seront uploadés sur R2.

### 4️⃣ Héberger le Site Web

Tu as plusieurs options:

#### Option A: Héberger sur GitHub Pages (Recommandé pour commencer)
```powershell
cd "C:\Users\Administrateur\Desktop\Autre\microvision-modpack\microvision-modpack"
git push origin main
```

Puis dans GitHub:
- Va à **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** / root
- Sauvegarde

Ton site sera accessible à: `https://github.com/BryanDrouet/microvision-modpack`

#### Option B: Custom Domain (ton domaine OVH)
- Change le CNAME DNS vers GitHub Pages
- Ou utilise un autre hébergeur (Vercel, Netlify, etc.)

#### Option C: Cloudflare Pages
- Push sur GitHub
- Cloudflare créera automatiquement un déploiement
- C'est gratis et ultra rapide

### 5️⃣ Mettre à Jour `distribution.json` si Nécessaire

Une fois les mods sur R2, vérifie que les URLs pointent vers R2:

```json
{
  "url": "https://1a2b3c4d5e6f7g8h9i0j.r2.cloudflarestorage.com/mods/nom-du-mod.jar"
}
```

Le fichier `distribution.json` à la racine contient déjà les bonnes URLs.

---

## 🚀 Tester le Launcher

Une fois tout configuré:

1. Exécute: `MicroVision-Setup.exe` (dans la racine du projet)
2. Le launcher s'installe
3. Clique sur le bouton "Play"
4. Le launcher devrait:
   - Télécharger la distribution depuis `https://microvision-modpack.bryan.ovh/distribution.json`
   - Télécharger les mods depuis Cloudflare R2
   - Installer Forge automatiquement
   - Lancer Minecraft

---

## 📁 Structure Finale

```
microvision-modpack/
├── MicroVision-Setup.exe          ← Fichier à télécharger pour les utilisateurs
├── distribution.json               ← Métadonnées du modpack
├── index.html                      ← Page d'accueil du site
├── script.js                       ← Logique du site
├── style.css                       ← Styles du site
├── mods/                           ← Dossier local (ignoré par Git)
├── resourcepacks/                  ← Ressources du modpack
├── shaderpacks/                    ← Shaders
├── schematics/                     ← Schematics
├── HeliosLauncher/                 ← Code source du launcher
├── Nebula/                         ← Outils de génération
├── .env.cloudflare                 ← Configuration R2 (local, pas en Git)
├── upload-to-r2.js                 ← Script d'upload
└── .git/                           ← Dépôt Git
```

---

## 🔗 URLs Finales à Mémoriser

| Ressource | URL |
|-----------|-----|
| Site Web | `https://microvision-modpack.bryan.ovh/` |
| Distribution | `https://microvision-modpack.bryan.ovh/distribution.json` |
| Mods (R2) | `https://1a2b3c4d5e6f7g8h9i0j.r2.cloudflarestorage.com/mods/` |
| Launcher Exe | `https://microvision-modpack.bryan.ovh/MicroVision-Setup.exe` |
| Dépôt Git | `https://github.com/BryanDrouet/microvision-modpack` |

---

## ❓ Troubleshooting

### Le launcher ne démarre pas
- Vérifie que la URL dans `HeliosLauncher/app/assets/js/distromanager.js` est correcte
- Regarde la console (F12) pour les erreurs

### Les mods ne téléchargent pas
- Vérifie que les URLs dans `distribution.json` sont accessibles
- Teste manuellement: `https://r2-url.com/mods/nom-du-mod.jar`
- Vérifie les permissions R2 (Public read access)

### Le site ne s'affiche pas
- Assure-toi que GitHub Pages est activé
- Vérifie les fichiers dans la racine du dépôt
- Attends 5 minutes après le push pour que GitHub Pages se redéploie

---

## 📞 Support

Pour toute question sur:
- **HeliosLauncher**: https://github.com/dscalzi/HeliosLauncher
- **Cloudflare R2**: https://developers.cloudflare.com/r2/
- **Distribution format**: Voir `Nebula/docs/`

---

**Prêt à lancer ? Commence par l'étape 1️⃣ sur Cloudflare !**
