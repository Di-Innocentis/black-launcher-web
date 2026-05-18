/* ==========================================================================
   ✨ ORBIT CREW - SERIES SHOWCASE CONTROLLER (GLASSMORPHISM) ✨
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SISTEMA DE NAVEGACIÓN (PÍLDORAS)
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover la clase 'active' de todos los botones
            navButtons.forEach(b => b.classList.remove('active'));
            // Añadir 'active' solo al botón clickeado
            btn.classList.add('active');
        });
    });

    // 2. SCROLL HORIZONTAL CON ARRASTRE DEL MOUSE (Estilo Netflix)
    const episodesGrid = document.querySelector('.episodes-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (episodesGrid) {
        episodesGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            episodesGrid.style.cursor = 'grabbing';
            startX = e.pageX - episodesGrid.offsetLeft;
            scrollLeft = episodesGrid.scrollLeft;
        });

        episodesGrid.addEventListener('mouseleave', () => {
            isDown = false;
            episodesGrid.style.cursor = 'default';
        });

        episodesGrid.addEventListener('mouseup', () => {
            isDown = false;
            episodesGrid.style.cursor = 'default';
        });

        episodesGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - episodesGrid.offsetLeft;
            const walk = (x - startX) * 2; // Multiplicador de velocidad de arrastre
            episodesGrid.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. EFECTO PARALLAX 3D PREMIUM PARA EL RENDER DEL PERSONAJE
    const characterPanel = document.querySelector('.character-panel');
    const characterRender = document.querySelector('.character-render');

    if (characterPanel && characterRender) {
        // Movimiento sutil siguiendo el cursor
        characterPanel.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            // Combinamos la escala del hover con el translate del mouse
            characterRender.style.transform = `scale(1.08) translateY(-10px) translate(${xAxis}px, ${yAxis}px)`;
        });

        // Suavizar el regreso a la posición original al quitar el mouse
        characterPanel.addEventListener('mouseleave', () => {
            characterRender.style.transform = 'scale(1) translateY(0) translate(0, 0)';
            characterRender.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        // Eliminar el tiempo de transición mientras se mueve para que no haya lag (delay)
        characterPanel.addEventListener('mouseenter', () => {
            characterRender.style.transition = 'none';
        });
    }

});
