// js/carousel.js

import { CAROUSEL_IMAGES } from './constants.js'; // Importa a lista de imagens do carrossel

const carouselContainer = document.getElementById('carousel-container');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');

// Exporta initCarousel para ser chamado de fora (ex: delivery.js)
export function initCarousel() {
    if (!carouselContainer || !carouselPrevBtn || !carouselNextBtn) {
        console.warn("Elementos do carrossel não encontrados. O carrossel não pode ser inicializado.");
        return; // Sai se os elementos não existirem
    }

    let carouselCurrentIndex = 0;
    let carouselInterval;

    renderCarousel();
    setupCarouselControls();
    startCarouselAutoPlay(); // Inicia o auto-play ao inicializar

    function renderCarousel() {
        carouselContainer.innerHTML = '';
        CAROUSEL_IMAGES.forEach(image => { // Usa CAROUSEL_IMAGES importado
            const carouselItem = document.createElement('div');
            // Classes responsivas para o carrossel: 1 item em telas pequenas, 2 em md, 3 em lg, 4 em xl
            carouselItem.className = 'carousel-item min-w-full sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] flex-shrink-0 px-2'; 
            carouselItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" 
                     class="w-full h-64 object-contain rounded-lg shadow-md" 
                     onerror="this.onerror=null;this.src='https://placehold.co/300x150/EEEEEE/333333?text=Banner';">
                `; // object-contain para não cortar, alt adequado
            carouselContainer.appendChild(carouselItem);
        });
        updateCarouselPosition(); // Garante a posição inicial correta
    }

    function setupCarouselControls() {
        carouselPrevBtn.addEventListener('click', () => {
            moveCarousel(-1);
            pauseCarouselAutoPlay(); // Pausa o auto-play na interação manual
            startCarouselAutoPlay(); // Reinicia após um curto período
        });
        carouselNextBtn.addEventListener('click', () => {
            moveCarousel(1);
            pauseCarouselAutoPlay(); // Pausa o auto-play na interação manual
            startCarouselAutoPlay(); // Reinicia após um curto período
        });

        // Este seletor pode precisar ser mais específico se houver outros elementos com essas classes
        const carouselWrapper = document.querySelector('.w-full.bg-pandora-bg-dark.p-6.rounded-xl.shadow-md.border.border-gray-200.relative.overflow-hidden');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', pauseCarouselAutoPlay);
            carouselWrapper.addEventListener('mouseleave', startCarouselAutoPlay);
        }

        window.addEventListener('resize', updateCarouselPosition); // Ajusta ao redimensionar
    }

    function updateCarouselPosition() {
        if (carouselContainer.children.length === 0) return;
        const item = carouselContainer.children[0];
        const itemWidth = item.offsetWidth; // Simplificado, assumindo que px-2 já está no offsetWidth
        carouselContainer.style.transform = `translateX(-${carouselCurrentIndex * itemWidth}px)`;
    }

    function moveCarousel(direction) {
        carouselCurrentIndex += direction;

        // Lógica de loop infinito
        if (carouselCurrentIndex < 0) {
            carouselCurrentIndex = CAROUSEL_IMAGES.length - 1;
        } else if (carouselCurrentIndex >= CAROUSEL_IMAGES.length) {
            carouselCurrentIndex = 0;
        }
        updateCarouselPosition();
    }

    function startCarouselAutoPlay() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            moveCarousel(1);
        }, 3000); // Muda a cada 3 segundos
    }

    function pauseCarouselAutoPlay() {
        clearInterval(carouselInterval);
    }
}