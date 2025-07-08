// js/navigation.js

// Get references to all main sections
const reservasSection = document.getElementById('reservas-section');
const galeriaSection = document.getElementById('galeria-section');
const deliverySection = document.getElementById('delivery-section');

// Get references to all navigation buttons (by their IDs)
const navHomeBtn = document.getElementById('nav-home');
const navGaleriaBtn = document.getElementById('nav-galeria');
const navReservasBtn = document.getElementById('nav-reservas');
const navDeliveryBtn = document.getElementById('nav-delivery');
const navContatoBtn = document.getElementById('nav-contato');
const navParceriaBtn = document.getElementById('nav-parceria');

// Get references to modals and overlays
const bookingCheckoutModal = document.getElementById('bookingCheckoutModal');
const contatoModal = document.getElementById('contatoModal');
const contatoModalContent = document.getElementById('contatoModalContent');
const closeContatoModalBtn = document.getElementById('closeContatoModal');
const closeContatoModalButton = document.getElementById('closeContatoModalButton');
const parceriaModal = document.getElementById('parceriaModal');
const parceriaModalContent = document.getElementById('parceriaModalContent');
const closeParceriaModalBtn = document.getElementById('closeParceriaModal');
const closeParceriaModalButton = document.getElementById('closeParceriaModalButton');
const galleryOverlay = document.getElementById('galleryOverlay');


/**
 * Handles the navigation between main content sections and hides any active modals/overlays.
 * Hides all main sections and shows only the specified one.
 * Updates the 'active' class on navigation items.
 * @param {string} activeSectionId - The ID of the section to show (e.g., 'reservas-section').
 */
function handleNavigation(activeSectionId) {
    // Esconde todas as seções principais
    if (reservasSection) reservasSection.classList.add('hidden');
    if (galeriaSection) galeriaSection.classList.add('hidden');
    if (deliverySection) deliverySection.classList.add('hidden');

    // Esconde todos os modais e overlays abertos
    if (bookingCheckoutModal && !bookingCheckoutModal.classList.contains('hidden')) {
        bookingCheckoutModal.classList.add('hidden');
    }
    if (contatoModal && !contatoModal.classList.contains('hidden')) {
        hideModalInstant(contatoModal, contatoModalContent); // Usar hideModalInstant para evitar loop com handleNavigation
    }
    if (parceriaModal && !parceriaModal.classList.contains('hidden')) {
        hideModalInstant(parceriaModal, parceriaModalContent); // Usar hideModalInstant
    }
    if (galleryOverlay && !galleryOverlay.classList.contains('hidden')) {
        galleryOverlay.classList.add('hidden');
    }


    // Mostra a seção ativa
    const targetSection = document.getElementById(activeSectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Atualiza a classe 'active' nos itens de navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Adiciona a classe 'active' ao item de menu clicado
    let activeNavItem = null;
    if (activeSectionId === 'reservas-section') {
        activeNavItem = navReservasBtn; // 'Home' ou 'Reservas' ativam esta seção
        if (navHomeBtn) navHomeBtn.classList.add('active'); // Garante que Home também seja 'active'
    } else if (activeSectionId === 'galeria-section') {
        activeNavItem = navGaleriaBtn;
    } else if (activeSectionId === 'delivery-section') {
        activeNavItem = navDeliveryBtn;
    }

    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

/**
 * Função genérica para mostrar um modal com transição.
 * @param {HTMLElement} modalElement - O elemento DIV do modal (o fundo escuro).
 * @param {HTMLElement} modalContentElement - O elemento DIV do conteúdo do modal.
 * @param {HTMLElement} navItemElement - O item de navegação correspondente (para ativar/desativar).
 */
function showModal(modalElement, modalContentElement, navItemElement = null) {
    // Esconde todas as seções principais
    if (reservasSection) reservasSection.classList.add('hidden');
    if (galeriaSection) galeriaSection.classList.add('hidden');
    if (deliverySection) deliverySection.classList.add('hidden');
    // Esconde outros modais/overlays abertos (para evitar sobreposição)
    if (bookingCheckoutModal && !bookingCheckoutModal.classList.contains('hidden')) {
        bookingCheckoutModal.classList.add('hidden');
    }
    if (galleryOverlay && !galleryOverlay.classList.contains('hidden')) {
        galleryOverlay.classList.add('hidden');
    }
    // Esconde outros modais específicos se estiverem abertos
    if (contatoModal && contatoModal !== modalElement && !contatoModal.classList.contains('hidden')) {
        hideModalInstant(contatoModal, contatoModalContent);
    }
    if (parceriaModal && parceriaModal !== modalElement && !parceriaModal.classList.contains('hidden')) {
        hideModalInstant(parceriaModal, parceriaModalContent);
    }


    // Remove 'active' de todos os itens de navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Adiciona 'active' ao item de navegação que abriu o modal (se fornecido)
    if (navItemElement) {
        navItemElement.classList.add('active');
    }

    // Mostra o modal
    modalElement.classList.remove('hidden');
    setTimeout(() => {
        modalContentElement.classList.remove('opacity-0', 'scale-95');
        modalContentElement.classList.add('opacity-100', 'scale-100');
    }, 10);
}

/**
 * Função genérica para esconder um modal com transição.
 * Após a transição, volta para a seção padrão (reservas).
 * @param {HTMLElement} modalElement - O elemento DIV do modal (o fundo escuro).
 * @param {HTMLElement} modalContentElement - O elemento DIV do conteúdo do modal.
 */
function hideModal(modalElement, modalContentElement) {
    modalContentElement.classList.remove('opacity-100', 'scale-100');
    modalContentElement.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        modalElement.classList.add('hidden');
        handleNavigation('reservas-section'); // Volta para a seção de Reservas/Home
    }, 300); // Corresponde à duração da transição CSS
}

/**
 * Função genérica para esconder um modal *imediatamente*, sem transição.
 * Útil para evitar loops ou quando o foco muda rapidamente.
 * @param {HTMLElement} modalElement - O elemento DIV do modal.
 * @param {HTMLElement} modalContentElement - O elemento DIV do conteúdo do modal.
 */
function hideModalInstant(modalElement, modalContentElement) {
    modalContentElement.classList.remove('opacity-100', 'scale-100');
    modalContentElement.classList.add('opacity-0', 'scale-95'); // Reset state for next show
    modalElement.classList.add('hidden');
}


// Event listeners para os botões de navegação de seção
if (navHomeBtn) {
    navHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation('reservas-section');
    });
}
if (navGaleriaBtn) {
    navGaleriaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation('galeria-section');
    });
}
if (navReservasBtn) {
    navReservasBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation('reservas-section');
    });
}
if (navDeliveryBtn) {
    navDeliveryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation('delivery-section');
    });
}

// Event listeners para o modal de Contato
if (navContatoBtn && contatoModal && closeContatoModalBtn && closeContatoModalButton) {
    navContatoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(contatoModal, contatoModalContent, navContatoBtn);
    });
    closeContatoModalBtn.addEventListener('click', () => hideModal(contatoModal, contatoModalContent));
    closeContatoModalButton.addEventListener('click', () => hideModal(contatoModal, contatoModalContent));
    // Clicar fora do modal para fechar
    contatoModal.addEventListener('click', (e) => {
        if (e.target === contatoModal) {
            hideModal(contatoModal, contatoModalContent);
        }
    });
}

// Event listeners para o modal de Parceria
if (navParceriaBtn && parceriaModal && closeParceriaModalBtn && closeParceriaModalButton) {
    navParceriaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(parceriaModal, parceriaModalContent, navParceriaBtn);
    });
    closeParceriaModalBtn.addEventListener('click', () => hideModal(parceriaModal, parceriaModalContent));
    closeParceriaModalButton.addEventListener('click', () => hideModal(parceriaModal, parceriaModalContent));
    // Clicar fora do modal para fechar
    parceriaModal.addEventListener('click', (e) => {
        if (e.target === parceriaModal) {
            hideModal(parceriaModal, parceriaModalContent);
        }
    });
}

// Inicializa: Garante que a seção de Reservas/Home esteja visível e ativa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation('reservas-section'); // Define a seção padrão na carga da página
});