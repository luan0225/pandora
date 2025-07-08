// js/gallery.js

import { GALLERY_IMAGES } from './constants.js'; // Importa a lista de imagens da galeria

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const fullGalleryImage = document.getElementById('fullGalleryImage');
    const closeGalleryBtn = document.getElementById('closeGalleryBtn');
    const prevGalleryBtn = document.getElementById('prevGalleryBtn');
    const nextGalleryBtn = document.getElementById('nextGalleryBtn');

    let currentImageIndex = 0;

    // Validação de existência de elementos para evitar erros
    if (!galleryGrid || !galleryOverlay || !fullGalleryImage || !closeGalleryBtn || !prevGalleryBtn || !nextGalleryBtn) {
        console.warn("Um ou mais elementos HTML necessários para a galeria não foram encontrados. A galeria pode não funcionar corretamente.");
        // Não retorna aqui para que o renderGallery ainda possa tentar adicionar imagens
    }

    function renderGallery() {
        if (!galleryGrid) return; // Sai se o grid da galeria não for encontrado

        galleryGrid.innerHTML = ''; // Limpa o grid antes de renderizar
        GALLERY_IMAGES.forEach((image, index) => { // Usa GALLERY_IMAGES importado
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('relative', 'group', 'overflow-hidden', 'rounded-lg', 'shadow-md');
            
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.classList.add('w-full', 'h-48', 'object-cover', 'transition-transform', 'duration-300', 'group-hover:scale-105');
            
            const imgOverlay = document.createElement('div');
            imgOverlay.classList.add('absolute', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'duration-300', 'text-pandora-text-light', 'font-bold', 'text-xl');
            imgOverlay.textContent = 'Ver Detalhes';
            
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(imgOverlay);
            galleryGrid.appendChild(imgContainer);

            imgContainer.addEventListener('click', () => openGalleryOverlay(index));
        });
    }

    function openGalleryOverlay(index) {
        currentImageIndex = index;
        updateGalleryOverlayImage();
        if (galleryOverlay) {
            galleryOverlay.classList.remove('hidden');
        }
    }

    function updateGalleryOverlayImage() {
        if (fullGalleryImage && GALLERY_IMAGES[currentImageIndex]) { // Usa GALLERY_IMAGES
            fullGalleryImage.src = GALLERY_IMAGES[currentImageIndex].src;
            fullGalleryImage.alt = GALLERY_IMAGES[currentImageIndex].alt;
        }
    }

    function closeGalleryOverlay() {
        if (galleryOverlay) {
            galleryOverlay.classList.add('hidden');
        }
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length; // Usa GALLERY_IMAGES
        updateGalleryOverlayImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; // Usa GALLERY_IMAGES
        updateGalleryOverlayImage();
    }

    // Event Listeners for the overlay (verificações de existência adicionadas)
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', closeGalleryOverlay);
    }
    if (nextGalleryBtn) {
        nextGalleryBtn.addEventListener('click', showNextImage);
    }
    if (prevGalleryBtn) {
        prevGalleryBtn.addEventListener('click', showPrevImage);
    }
    if (galleryOverlay) {
        // Fechar overlay ao clicar fora da imagem
        galleryOverlay.addEventListener('click', (e) => {
            if (e.target === galleryOverlay) {
                closeGalleryOverlay();
            }
        });
    }

    // Inicializa a renderização da galeria quando este script carrega
    renderGallery();
});