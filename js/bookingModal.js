// js/bookingModal.js

import { WHATSAPP_NUMBER } from './constants.js';

const bookingCheckoutModal = document.getElementById('bookingCheckoutModal');
const modalContent = document.getElementById('modalContent');
const closeBookingModalBtn = document.getElementById('closeBookingModal');
const bookingContactForm = document.getElementById('bookingContactForm');
const clientNameInput = document.getElementById('clientName');
const clientPhoneInput = document.getElementById('clientPhone');
const clientEmailInput = document.getElementById('clientEmail');
const modalSelectedDateDisplay = document.getElementById('modalSelectedDate');
const modalEstimatedPriceDisplay = document.getElementById('modalEstimatedPrice');

let currentSelectedDate = null; // Para armazenar a data vinda do calendário
let currentEstimatedPrice = null; // Para armazenar o preço vindo do calendário

let onBookingConfirmedCallback = () => {}; // Callback para notificar o calendário após a reserva

export function initBookingModal(onConfirmed) {
    onBookingConfirmedCallback = onConfirmed;

    closeBookingModalBtn.addEventListener('click', hideBookingModal);
    bookingContactForm.addEventListener('submit', handleFormSubmit);
}

export function showBookingModal(date, price) {
    currentSelectedDate = date;
    currentEstimatedPrice = price;

    modalSelectedDateDisplay.textContent = date.toLocaleDateString('pt-BR');
    modalEstimatedPriceDisplay.textContent = price;
    
    bookingCheckoutModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('opacity-0', 'scale-95');
        modalContent.classList.add('opacity-100', 'scale-100');
    }, 10);
}

function hideBookingModal() {
    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        bookingCheckoutModal.classList.add('hidden');
        // Resetar campos do formulário ao fechar o modal
        clientNameInput.value = '';
        clientPhoneInput.value = '';
        clientEmailInput.value = '';
    }, 300);
}

function handleFormSubmit(event) {
    event.preventDefault(); 

    const clientName = clientNameInput.value.trim();
    const clientPhone = clientPhoneInput.value.trim();
    const clientEmail = clientEmailInput.value.trim();

    if (!currentSelectedDate) {
        alert('Erro: Nenhuma data selecionada para reserva. Por favor, tente novamente.');
        return;
    }
    if (!clientName || !clientPhone) {
        alert('Por favor, preencha seu nome e telefone WhatsApp para prosseguir.');
        return;
    }

    const formattedDate = currentSelectedDate.toLocaleDateString('pt-BR');
    
    let whatsappMessage = `Olá, Chácara Pandora!\n\n`;
    whatsappMessage += `Gostaria de confirmar a reserva para o dia *${formattedDate}*, no valor estimado de *${currentEstimatedPrice}*.\n\n`;
    whatsappMessage += `Meus dados para contato são:\n`;
    whatsappMessage += `*Nome:* ${clientName}\n`;
    whatsappMessage += `*WhatsApp:* ${clientPhone}\n`;
    if (clientEmail) {
        whatsappMessage += `*E-mail:* ${clientEmail}\n`;
    }
    whatsappMessage += `\nPor favor, entre em contato para finalizarmos o pagamento de 50% e confirmar a data. Obrigado!`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank'); 

    // Notifica o módulo do calendário para atualizar a data como reservada
    onBookingConfirmedCallback(currentSelectedDate);

    hideBookingModal();
}