document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("dynamic-header");
    header.innerHTML = `
        <div class="logo-container">
            <i data-lucide="monitor-play"></i>
            <h1>MicroVision</h1>
        </div>
        <nav>
            <a href="#hero-section"><i data-lucide="home"></i> Accueil</a>
            <a href="#download-section"><i data-lucide="download"></i> Télécharger</a>
        </nav>
    `;

    const hero = document.getElementById("hero-section");
    hero.innerHTML = `
        <div class="hero-content">
            <h2>Rejoignez l'aventure MicroVision</h2>
            <p>Notre launcher sur mesure gère automatiquement l'installation de Forge, la synchronisation de tous les mods et le paramétrage des shaders. Vous n'avez qu'à cliquer sur Jouer.</p>
        </div>
    `;

    const download = document.getElementById("download-section");
    download.innerHTML = `
        <div class="card">
            <i data-lucide="package"></i>
            <h3>Launcher Windows</h3>
            <p>Téléchargez l'exécutable pour Windows. L'installation et la configuration sont automatiques.</p>
            <a href="MicroVision-Setup.exe" class="btn" id="btn-dl-win"><i data-lucide="monitor"></i> Télécharger le .exe</a>
        </div>
    `;

    const footer = document.getElementById("dynamic-footer");
    footer.innerHTML = `
        <p>&copy; 2026 MicroVision - Plateforme gérée par Bryan. Tous droits réservés.</p>
    `;

    lucide.createIcons();
});