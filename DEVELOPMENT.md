# Développement local - Commandes essentielles

## Recompilation du Launcher

Après modification de la configuration ou du code du launcher:

```bash
cd HeliosLauncher
npm run dist:win
```

Génère: `HeliosLauncher/dist/Helios Launcher-setup-X.X.X.exe`

## Génération de la distribution.json

Après ajout/modification de mods:

```bash
cd Nebula
npm run faststart -- generate distro
```

## Réécriture des URLs après génération

Les mods doivent pointer vers R2, les libs Forge vers GitHub Pages:

```bash
# Remplacer dans distribution.json:
# servers/MicroVision-1.20.1/forgemods/required/ → /mods/
# /repo/ → /repo/ (sur le bon domaine)
```

## Fichiers de configuration du launcher

- **Langues**: `HeliosLauncher/app/assets/lang/`
  - `fr_FR.toml` (Français)
  - `en_US.toml` (Anglais)
  - `es_ES.toml` (Espagnol)
  - `_custom.toml` (Configuration personnalisée MicroVision)

- **Images**: `HeliosLauncher/app/assets/images/`
  - `SealCircle.png` (Logo principal)
  - `backgrounds/0-7.jpg` (Images de fond)

## Ajouter lien YouTube

Éditer: `HeliosLauncher/app/assets/lang/_custom.toml`

```toml
mediaYouTubeURL = "https://www.youtube.com/@VotreChaine"
```

Puis recompiler (voir section "Recompilation du Launcher")

## Installation des dépendances

```bash
# Launcher
cd HeliosLauncher
npm install

# Nebula
cd Nebula
npm install
```

## Variables d'environnement utiles

- `DISTRO_URL`: URL de distribution.json (par défaut: `https://microvision-modpack.bryan.ovh/distribution.json`)
- `REPO_URL`: URL du repo Forge (par défaut: `https://microvision-modpack.bryan.ovh/repo/`)
- `MODS_URL`: URL des mods R2 (par défaut: `https://mods.microvision-modpack.bryan.ovh/mods/`)
