/* ==========================================================================
   ✨ ORBIT CREW - PREMIUM LAUNCHER SITE CONTROLLER (MONOCHROMATIC) ✨
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initGalaxy();
    
    // Observador para animaciones fluidas al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    initCarousel();
    initStars();
});

/* --- GENERADOR DE PARTICULAS CINEMÁTICAS BLANCAS --- */
function initGalaxy() {
    const galaxyContainer = document.getElementById('galaxy-bg');
    if (!galaxyContainer) return;
    
    const starCount = 100; // Densidad balanceada para no ahogar el renderizado
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.5 + 1; // Partículas más finas y elegantes
        const duration = Math.random() * 12 + 6;
        const delay = Math.random() * -5; // Delay negativo para que arranquen ya esparcidas
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        galaxyContainer.appendChild(star);
    }
}

/* --- SISTEMA DE CONTROL DE VISTAS (SPA) --- */
function openView(viewName) {
    // Apagar todas las secciones
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view');
    });
    
    // Encender la sección solicitada
    const activeView = document.getElementById('view-' + viewName);
    if (activeView) activeView.classList.add('active-view');
    
    // Actualizar estados activos en los botones de navegación
    document.querySelectorAll('.nav-menu .nav-link').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.getElementById('btn-' + viewName);
    if (activeButton) activeButton.classList.add('active');
    
    // Resetear scroll a la cabecera cinemática
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- MOTOR DEL CARRUSEL DE INSTANCIAS --- */
let currentSlideIndex = 0;

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    updateCarouselUI();
}

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    if (direction === 'next') {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    } else {
        currentSlideIndex--;
        if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    }
    
    updateCarouselUI();
}

function jumpToSlide(index) {
    currentSlideIndex = index;
    updateCarouselUI();
}

function updateCarouselUI() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('#carousel-dots button');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('current-slide');
        if (index === currentSlideIndex) slide.classList.add('current-slide');
    });
    
    dots.forEach((dot, index) => {
        dot.classList.remove('current-dot');
        if (index === currentSlideIndex) dot.classList.add('current-dot');
    });
}

/* --- INTERFAZ MULTILENGUAJE COMPACTA --- */
function toggleLangMenu() {
    const menu = document.getElementById('lang-menu');
    if (menu) menu.classList.toggle('show');
}

function changeLanguage(langCode) {
    const currentLangLabel = document.getElementById('current-lang');
    if (currentLangLabel) currentLangLabel.innerText = langCode.toUpperCase();
    
    // Aquí puedes acoplar tu lógica de i18next si traduces el sitio de forma dinámica,
    // de momento el switch visual responde y sella el menú de inmediato.
    const menu = document.getElementById('lang-menu');
    if (menu) menu.classList.remove('show');
}

/* --- MODALES Y CONTROL DE CALIFICACIONES (FEEDBACK) --- */
let selectedActiveRating = 0;

function openModal(modalId) {
    const el = document.getElementById('modal-' + modalId);
    if (el) el.classList.add('active');
}

function closeModal(modalId) {
    const el = document.getElementById('modal-' + modalId);
    if (el) el.classList.remove('active');
}

function initStars() {
    const stars = document.querySelectorAll('#rating-container i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedActiveRating = parseInt(star.getAttribute('data-val'), 10);
            updateStarsUI();
        });
    });
}

function updateStarsUI() {
    const stars = document.querySelectorAll('#rating-container i');
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-val'), 10);
        if (val <= selectedActiveRating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function submitReview() {
    const name = document.getElementById('review-name').value;
    const comment = document.getElementById('review-comment').value;
    
    if (selectedActiveRating === 0) {
        alert("Por favor, selecciona una calificación mediante las estrellas.");
        return;
    }
    
    // Módulo de envío simulado para la telemetría del Admin Panel
    alert(`¡Gracias por tu reporte! Calificación: ${selectedActiveRating}/5 enviado al servidor de Orbit Crew.`);
    
    // Limpiar campos y cerrar modal
    document.getElementById('review-name').value = "";
    document.getElementById('review-comment').value = "";
    selectedActiveRating = 0;
    updateStarsUI();
    closeModal('review');
}

/* --- EL ORÁCULO DE ORBIT (PROCESADOR INTELECTUAL DE MODS V2.5) --- */
async function consultAI() {
    const promptInput = document.getElementById('view-home').querySelector('#ai-prompt').value.toLowerCase();
    const outputArea = document.getElementById('ai-output');
    const loader = document.getElementById('ai-loader');

    if (!promptInput.trim()) { 
        alert("Por favor, introduce los parámetros para que el Oráculo pueda analizar."); 
        return; 
    }
    
    loader.style.display = 'inline-block';
    outputArea.innerHTML = '<span style="opacity: 0.5; font-style: italic;">Sincronizando red neuronal de la bóveda de mods...</span>';
    
    // Tiempo de respuesta cinemático simulado
    const networkDelay = Math.floor(Math.random() * 600) + 1200; 

    setTimeout(() => {
        // --- BASE DE DATOS ESTRUCTURADA DE CATEGORÍAS ORBIT ---
        const coreCategories = [
            {
                id: 'apocalypse',
                keywords: ['apocalipsis', 'sol', 'quemar', 'fuego', 'destruccion', 'nuclear', 'zombie', 'parasito', 'miedo', 'fin del mundo', 'sobrevivir', 'mutante', 'infeccion'],
                response: "Escenario catastrófico de extinción masiva detectado en los registros.",
                mods: ["Solar Apocalypse", "Scape and Run: Parasites", "Mustard Virus", "First Aid Core"]
            },
            {
                id: 'tech',
                keywords: ['tecnico', 'maquina', 'energia', 'automatizar', 'fabrica', 'tech', 'industrial', 'cables', 'reactor', 'trenes', 'mecanismo', 'tuberias'],
                response: "Cálculo estructural completado: Automatización y optimización de flujos requerida.",
                mods: ["Create Live", "Mekanism Core", "Applied Energistics 2", "Thermal Expansion"]
            },
            {
                id: 'magic',
                keywords: ['magia', 'hechizo', 'mago', 'varita', 'mana', 'arcano', 'bruja', 'pociones', 'fantasia', 'runas', 'pergamino'],
                response: "Frecuencias místicas estables. Energía arcana canalizada con éxito.",
                mods: ["Iron's Spells 'n Spellbooks", "Ars Nouveau", "Botania Evolution", "Forbidden & Arcanus"]
            },
            {
                id: 'rpg',
                keywords: ['aventura', 'dragon', 'dungeon', 'mazmorra', 'espada', 'escudo', 'clase', 'rpg', 'rol', 'medieval', 'jefe', 'boss', 'combate', 'armadura'],
                response: "Búsqueda de combate dinámico y exploración de mazmorras indexada.",
                mods: ["Ice and Fire: Dragons", "L_Ender 's Cataclysm", "Better Combat System", "When Dungeons Arise"]
            },
            {
                id: 'building',
                keywords: ['construir', 'decorar', 'casa', 'mueble', 'bloque', 'diseño', 'ciudad', 'arquitectura', 'bonito', 'textura', 'paleta'],
                response: "Módulos estéticos y de arquitectura creativa listos para el despliegue.",
                mods: ["Macaw's Furniture Line", "Chipped Blocks", "FramedBlocks", "Adorn Deco"]
            },
            {
                id: 'performance',
                keywords: ['fps', 'lag', 'lento', 'rendimiento', 'optimizar', 'rapido', 'bajos recursos', 'optifine', 'graficos', 'frenado'],
                response: "Configuración de aceleración por hardware y optimización extrema activa.",
                mods: ["Sodium Core", "Lithium Engine", "FerriteCore Memory", "ModernFix Pipeline"]
            }
        ];

        // --- ALGORITMO DE DETECCIÓN DE ENTRADA ---
        let bestMatch = null;
        let maxScore = 0;

        coreCategories.forEach(category => {
            let currentScore = 0;
            category.keywords.forEach(word => {
                if (promptInput.includes(word)) currentScore++;
            });

            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestMatch = category;
            }
        });

        // --- DESPLEGAR ESTRUCTURA EN LA INTERFAZ DE CRISTAL ---
        let finalMods = [];
        let finalMsg = "";

        if (bestMatch && maxScore > 0) {
            finalMods = bestMatch.mods;
            finalMsg = bestMatch.response;
        } else {
            // Configuración esencial por defecto si los parámetros no coinciden
            finalMods = ["Quark Core", "Just Enough Items (JEI)", "Jade Tooltips", "AppleSkin HUD"];
            finalMsg = "Parámetros difusos. Desplegando suite de utilidades esenciales del Orbit Client:";
        }

        const htmlResponse = `
            <strong style="color: #ffffff; text-shadow: 0 0 10px rgba(255,255,255,0.2); font-size: 1.1rem; display: block; margin-bottom: 12px;">
                <i class="fas fa-microchip" style="margin-right: 8px;"></i> ${finalMsg}
            </strong>
            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                ${finalMods.map((mod, index) => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; transition: all 0.3s ease;">
                        <span style="font-weight: 500; color: rgba(255,255,255,0.4); font-size: 0.9rem;">Módulo #${index + 1}</span>
                        <span style="font-weight: 700; color: #ffffff; text-align: right;">${mod}</span>
                    </div>
                `).join('')}
            </div>
        `;

        outputArea.innerHTML = htmlResponse;
        loader.style.display = 'none';
        
    }, networkDelay);
}

// Cierre de clicks externos para dropdowns y overlays
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
    if (!event.target.closest('.lang-dropdown')) {
        const menu = document.getElementById('lang-menu');
        if (menu) menu.classList.remove('show');
    }
}
