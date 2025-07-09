// js/carousel.js

import { CAROUSEL_IMAGES } from './constants.js'; // Importa a lista de imagens do carrossel

// Referências aos IDs específicos do carrossel de DELIVERY
const carouselContainer = document.getElementById('delivery-carousel-container');
const carouselPrevBtn = document.getElementById('delivery-carousel-prev');
const carouselNextBtn = document.getElementById('delivery-carousel-next');

export function initCarousel() {
    // Verifica se os elementos HTML foram encontrados. Se não, exibe um aviso e sai.
    if (!carouselContainer || !carouselPrevBtn || !carouselNextBtn) {
        console.warn("Elementos do carrossel do Delivery não encontrados. O carrossel não pode ser inicializado. Verifique os IDs 'delivery-carousel-container', 'delivery-carousel-prev', 'delivery-carousel-next' no HTML.");
        return;
    }

    let carouselCurrentIndex = 0; // Índice do primeiro item visível no carrossel

    renderCarousel();          // Renderiza os itens do carrossel no HTML
    setupCarouselControls();   // Configura os event listeners para os botões e redimensionamento da janela
    // startCarouselAutoPlay(); // Esta linha está comentada para desativar o auto-play

    /**
     * Renderiza todos os itens do carrossel no container.
     */
    function renderCarousel() {
        carouselContainer.innerHTML = ''; // Limpa o conteúdo existente para evitar duplicação
        CAROUSEL_IMAGES.forEach(image => {
            const carouselItem = document.createElement('div');
            // Classes Tailwind CSS para responsividade:
            // min-w-full: 1 item em telas muito pequenas
            // sm:min-w-[50%]: 2 itens em telas pequenas (sm)
            // md:min-w-[33.33%]: 3 itens em telas médias (md)
            // lg:min-w-[25%]: 4 itens em telas grandes (lg)
            carouselItem.className = 'carousel-item min-w-full sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] flex-shrink-0 px-2';
            carouselItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}"
                     class="w-full h-64 object-contain rounded-lg shadow-md"
                     onerror="this.onerror=null;this.src='https://placehold.co/300x150/EEEEEE/333333?text=Banner';">
                `;
            carouselContainer.appendChild(carouselItem);
        });
        updateCarouselPosition(); // Garante que o carrossel esteja na posição inicial correta após a renderização
    }

    /**
     * Configura os event listeners para os botões de navegação e para o redimensionamento da janela.
     */
    function setupCarouselControls() {
        carouselPrevBtn.addEventListener('click', () => {
            moveCarousel(-1); // Move o carrossel para a esquerda
        });
        carouselNextBtn.addEventListener('click', () => {
            moveCarousel(1); // Move o carrossel para a direita
        });

        // Adiciona um event listener para o redimensionamento da janela
        // Isso garante que o carrossel se ajuste e recalcule sua posição quando a tela muda de tamanho.
        window.addEventListener('resize', () => {
            updateCarouselPosition();
        });
    }

    /**
     * Calcula dinamicamente quantos itens do carrossel estão visíveis na tela atual.
     * @returns {number} O número de itens visíveis.
     */
    function getItemsVisible() {
        if (carouselContainer.children.length === 0) return 1; // Se não há itens, assume 1 para evitar erros.

        // Pega a largura visível do elemento pai do carouselContainer.
        // Isso é importante porque o overflow: hidden está no pai, e ele define a "janela" do carrossel.
        const containerWidth = carouselContainer.parentElement.offsetWidth;
        // Pega a largura de um único item do carrossel.
        const itemWidth = carouselContainer.children[0].offsetWidth;

        // Calcula quantos itens cabem na largura visível, arredondando para baixo.
        // Garante que o resultado seja no mínimo 1.
        return Math.max(1, Math.floor(containerWidth / itemWidth));
    }

    /**
     * Atualiza a posição CSS do carrossel para exibir os itens corretos.
     */
    function updateCarouselPosition() {
        if (carouselContainer.children.length === 0) return;

        const itemsVisible = getItemsVisible(); // Quantos itens estão visíveis agora
        const totalItems = CAROUSEL_IMAGES.length; // Número total de imagens na lista
        const itemWidth = carouselContainer.children[0].offsetWidth; // Largura de um único item

        // Calcula o índice máximo que o carrossel pode ter sem mostrar espaço vazio no final.
        // Ex: Se há 6 itens e 4 visíveis, o último índice válido é 2 (para mostrar itens 2,3,4,5).
        const maxIndex = Math.max(0, totalItems - itemsVisible);

        // Garante que o carouselCurrentIndex não exceda o índice máximo válido.
        carouselCurrentIndex = Math.min(carouselCurrentIndex, maxIndex);

        // Aplica a transformação CSS para mover o carrossel.
        // O carrossel se move pela largura de um item, mas o índice representa o "bloco" visível.
        carouselContainer.style.transform = `translateX(-${carouselCurrentIndex * itemWidth}px)`;
    }

    /**
     * Move o carrossel para a próxima/anterior posição.
     * @param {number} direction - -1 para mover para a esquerda (anterior), 1 para mover para a direita (próximo).
     */
    function moveCarousel(direction) {
        const itemsVisible = getItemsVisible();
        const totalItems = CAROUSEL_IMAGES.length;

        let newIndex = carouselCurrentIndex + direction;

        // Lógica de loop infinito para navegar pelos grupos de itens:
        if (newIndex < 0) {
            // Se tentar ir para trás do início, vai para o final (mostrando os últimos itens).
            newIndex = Math.max(0, totalItems - itemsVisible);
        } else if (newIndex > Math.max(0, totalItems - itemsVisible)) {
            // Se tentar ir para frente do final, volta para o início.
            newIndex = 0;
        }

        carouselCurrentIndex = newIndex; // Atualiza o índice atual
        updateCarouselPosition();        // Atualiza a posição visual do carrossel
    }

    // As funções startCarouselAutoPlay e pauseCarouselAutoPlay foram removidas
    // pois o auto-play foi desativado conforme sua solicitação.
}