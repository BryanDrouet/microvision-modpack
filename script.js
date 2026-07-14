const app = document.getElementById('app');
const currentYear = new Date().getFullYear();

const githubIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

const buildPage = () => {
    const heroSection = document.createElement('section');
    heroSection.className = 'hero';
    heroSection.innerHTML = `
        <div class="container">
            <div class="hero-content">
                <img src="modpack-logo.png" alt="Logo MicroVision Modpack" class="hero-logo">
                <h1>MicroVision Modpack</h1>
                <p>Vivez la Microvision ${currentYear} directement dans Minecraft.</p>
                <a href="#download" class="btn btn-primary" aria-label="Aller à la section de téléchargement du launcher">
                    Télécharger
                </a>
            </div>
        </div>
    `;

    const downloadSection = document.createElement('section');
    downloadSection.className = 'download';
    downloadSection.id = 'download';
    downloadSection.innerHTML = `
        <div class="container fade-in-target">
            <div class="download-box">
                <p>Le launcher téléchargera automatiquement tous les mods depuis le cloud pour une installation sans effort.</p>
                <a href="https://github.com/BryanDrouet/microvision-modpack/releases/download/latest/MicroVision-Setup.exe" class="btn btn-download" rel="noopener noreferrer" aria-label="Télécharger l'exécutable du launcher MicroVision">
                    <i data-lucide="cloud-download" aria-hidden="true"></i> Télécharger le launcher
                </a>
                <div class="version-info">
                    <span><strong>Prérequis :</strong> Java 17+, Windows 7+</span>
                    <span><strong>Taille estimée :</strong> ~ 107 MB</span>
                </div>
            </div>
        </div>
    `;

    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-brand">
                <i data-lucide="tree-pine" aria-hidden="true"></i> MicroVision Modpack
            </div>
            <nav class="footer-links" aria-label="Liens de pied de page">
                <a href="https://github.com/BryanDrouet/microvision-modpack" target="_blank" rel="noopener noreferrer" aria-label="Consulter le code source sur GitHub">
                    ${githubIconSVG} GitHub
                </a>
                <a href="https://github.com/BryanDrouet/microvision-modpack/issues" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir un ticket de support technique">
                    <i data-lucide="circle-help" aria-hidden="true"></i> Support
                </a>
            </nav>
            <div class="footer-bottom">
                <span>&copy; ${currentYear} MicroVision Modpack | Basé sur HeliosLauncher</span>
                <span>Minecraft est une marque déposée de Mojang Studios. Non officiel, non approuvé ou affilié à Mojang Studios ou Microsoft.</span>
            </div>
        </div>
    `;

    app.appendChild(heroSection);
    app.appendChild(downloadSection);
    app.appendChild(footer);

    lucide.createIcons();
    initInteractions();
};

const initInteractions = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-target').forEach(el => {
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', buildPage);