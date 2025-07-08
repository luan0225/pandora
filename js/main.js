// js/main.js

import { showSection, setupNavigation } from './navigation.js';
import { initCalendar, getSelectedDate, updateBookingDetails, reserveDate } from './calendar.js';
import { renderGallery } from './gallery.js';
import { initDelivery } from './delivery.js';
import { initBookingModal, showBookingModal } from './bookingModal.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Callback para o calendário chamar quando o botão "Prosseguir" é clicado
    const handleProceedToBooking = (date, price) => {
        showBookingModal(date, price);
    };

    // Callback para o modal chamar quando a reserva é confirmada
    const handleBookingConfirmed = (date) => {
        reserveDate(date); // Notifica o calendário para marcar a data como reservada
    };

    // Inicializa a navegação, passando a função para mudar de seção
    setupNavigation(showSection);

    // Inicializa o calendário, passando os callbacks
    initCalendar(updateBookingDetails, handleProceedToBooking);

    // Inicializa o modal de booking, passando o callback de confirmação
    initBookingModal(handleBookingConfirmed);

    // Inicializa o delivery
    initDelivery();

    // Inicializa a galeria
    renderGallery();

    // Inicializa o carrossel de bebidas
    initCarousel();

    // Exibe a seção de reservas por padrão ao carregar
    showSection('reservas');
});