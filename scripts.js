document.addEventListener('DOMContentLoaded', () => {
    initGalaxy();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    initCarousel();
    initStars();
});

/* --- GENERADOR DE ESTRELLAS (FONDO GALAXY) --- */
function initGalaxy() {
    const galaxyContainer = document.getElementById('galaxy-bg');
    if (!galaxyContainer) return;
    const starCount = 150; 
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        galaxyContainer.appendChild(star);
    }
}

/* --- SISTEMA DE VISTAS --- */
function openView(viewName) {
    document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active-view'));
    const activeView = document.getElementById('view-' + viewName);
    if(activeView) activeView.classList.add('active-view');
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.getElementById('btn-' + viewName);
    if(activeButton) activeButton.classList.add('active');
    window.scrollTo(0, 0);
}

/* --- LOGICA DEL CARRUSEL --- */
let currentSlideIndex = 0;
function initCarousel() {
    const track = document.getElementById('gallery-track');
    if(!track) return;
    updateCarouselUI();
}
function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if(slides.length === 0) return;
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    updateCarouselUI();
}
function updateCarouselUI() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-nav-dots button');
    slides.forEach((slide, index) => {
        slide.classList.remove('current-slide');
        if(index === currentSlideIndex) slide.classList.add('current-slide');
    });
    if(dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.remove('current-dot');
            if(index === currentSlideIndex) dot.classList.add('current-dot');
        });
    }
}

/* --- MODALES Y UI --- */
function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    if(menu) menu.classList.toggle('show');
}
function openModal(modalId) {
    const el = document.getElementById('modal-' + modalId);
    if(el) el.classList.add('active');
}
function closeModal(modalId) {
    const el = document.getElementById('modal-' + modalId);
    if(el) el.classList.remove('active');
}
function initStars() {
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-val'));
            stars.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-val'));
                if(sVal <= val) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                    s.style.color = "white"; 
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                    s.style.color = "#444";
                }
            });
        });
    });
}
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
    if (!event.target.closest('.lang-dropdown')) {
        const menu = document.getElementById('langMenu');
        if(menu) menu.classList.remove('show');
    }
}

/* ------------------------------------------
   LÓGICA DE IA "SIMULADA" AVANZADA (V2.0)
   ------------------------------------------
   Ahora usa un sistema de puntuación para detectar
   contexto complejo como "apocalipsis solar".
*/
async function generateMods() {
    const promptInput = document.getElementById('aiPrompt').value.toLowerCase();
    const resultDiv = document.getElementById('aiResult');
    const loader = document.getElementById('loader');

    if (!promptInput.trim()) { 
        alert("Por favor, describe tu estilo de juego."); 
        return; 
    }
    
    loader.style.display = 'inline-block';
    resultDiv.innerHTML = '<span style="color:var(--text-muted)">Analizando red neuronal de mods...</span>';
    
    const delay = Math.floor(Math.random() * 800) + 1200; // 1.2s a 2s de espera

    setTimeout(() => {
        // --- BASE DE DATOS DE INTENCIONES ---
        const brain = [
            {
                id: 'apocalypse',
                keywords: ['apocalipsis', 'sol', 'quemar', 'fuego', 'destruccion', 'nuclear', 'zombie', 'parasito', 'miedo', 'fin del mundo', 'hardcore', 'sobrevivir', 'calor'],
                response: "Detecto un escenario de extinción masiva.",
                mods: ["Solar Apocalypse", "Scape and Run: Parasites", "Mustard Virus", "First Aid"]
            },
            {
                id: 'tech',
                keywords: ['tecnico', 'maquina', 'energia', 'automatizar', 'fabrica', 'tech', 'industrial', 'cables', 'nuclear', 'reactor', 'trenes'],
                response: "Optimización industrial y automatización requerida.",
                mods: ["Create", "Mekanism", "Applied Energistics 2", "Thermal Series"]
            },
            {
                id: 'magic',
                keywords: ['magia', 'hechizo', 'mago', 'varita', 'mana', 'arcano', 'bruja', 'pociones', 'fantasy', 'fantasia'],
                response: "Tus palabras resuenan con energía arcana.",
                mods: ["Iron's Spells 'n Spellbooks", "Ars Nouveau", "Botania", "Forbidden and Arcanus"]
            },
            {
                id: 'rpg',
                keywords: ['aventura', 'dragon', 'dungeon', 'mazmorra', 'espada', 'escudo', 'clase', 'rpg', 'rol', 'medieval', 'rey', 'castillo', 'boss'],
                response: "Tu perfil busca combate épico y exploración.",
                mods: ["Ice and Fire: Dragons", "Cataclysm", "Better Combat", "When Dungeons Arise"]
            },
            {
                id: 'building',
                keywords: ['construir', 'decorar', 'casa', 'mueble', 'bloque', 'diseño', 'ciudad', 'moderno', 'arquitectura', 'bonito'],
                response: "Para el arquitecto que llevas dentro.",
                mods: ["Macaw's Furniture", "Chipped", "FramedBlocks", "Adorn"]
            },
            {
                id: 'performance',
                keywords: ['fps', 'lag', 'lento', 'rendimiento', 'optimizar', 'rápido', 'bajos recursos', 'pc mala'],
                response: "Maximizando cuadros por segundo...",
                mods: ["Sodium", "Lithium", "FerriteCore", "ModernFix"]
            }
        ];

        // --- SISTEMA DE PUNTUACIÓN ---
        let bestMatch = null;
        let maxScore = 0;

        brain.forEach(category => {
            let score = 0;
            category.keywords.forEach(word => {
                if (promptInput.includes(word)) {
                    score++;
                }
            });

            // Si encontramos una coincidencia mejor, la guardamos
            if (score > maxScore) {
                maxScore = score;
                bestMatch = category;
            }
        });

        // --- GENERAR RESPUESTA ---
        let finalMods = [];
        let finalMsg = "";

        if (bestMatch && maxScore > 0) {
            finalMods = bestMatch.mods;
            finalMsg = bestMatch.response;
        } else {
            // Fallback inteligente si no entiende nada
            finalMods = ["Quark", "Jei", "Jade", "AppleSkin"];
            finalMsg = "No estoy seguro del género, pero esto es esencial:";
        }

        const htmlResponse = `
            <strong style="color:var(--secondary-accent)">${finalMsg}</strong><br>
            <div style="margin-top:0.5rem; text-align:left; display:inline-block; width:100%;">
                ${finalMods.map((mod, index) => 
                    `<div style="margin-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:2px;">
                        <span style="color:var(--secondary-accent); font-weight:bold;">${index + 1}.</span> 
                        <span style="color:white;">${mod}</span>
                    </div>`
                ).join('')}
            </div>
        `;

        resultDiv.innerHTML = htmlResponse;
        loader.style.display = 'none';
        
    }, delay);
}