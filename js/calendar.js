// js/calendar.js

import { RESERVED_DATES, isHoliday, WHATSAPP_NUMBER } from './constants.js'; // Importa do constants.js

document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    const estimatedPriceDisplay = document.getElementById('estimatedPriceDisplay');
    const proceedToBookingBtn = document.getElementById('proceedToBooking');
    const bookingCheckoutModal = document.getElementById('bookingCheckoutModal');
    const closeBookingModalBtn = document.getElementById('closeBookingModal');
    const modalContent = document.getElementById('modalContent');
    const bookingContactForm = document.getElementById('bookingContactForm');
    const modalSelectedDate = document.getElementById('modalSelectedDate');
    const modalEstimatedPrice = document.getElementById('modalEstimatedPrice');

    // Validação de existência de elementos para evitar erros
    if (!calendarDays || !currentMonthYear || !prevMonthBtn || !nextMonthBtn || !selectedDateDisplay || !estimatedPriceDisplay || !proceedToBookingBtn || !bookingCheckoutModal || !closeBookingModalBtn || !modalContent || !bookingContactForm || !modalSelectedDate || !modalEstimatedPrice) {
        console.error("Um ou mais elementos HTML necessários para o calendário não foram encontrados. Verifique os IDs no seu HTML.");
        return; // Sai do script se os elementos essenciais não existirem
    }


    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = null; // Para armazenar a data selecionada pelo usuário

    // Preços de exemplo (ajuste conforme necessário)
    const BASE_PRICE_WEEKDAY = 180; // Preço base para dias de semana
    const BASE_PRICE_WEEKEND = 200; // Preço base para fins de semana (Sábado/Domingo)
    const HOLIDAY_SURCHARGE = 200; // Sobretaxa para feriados (exemplo)

    /**
     * Calcula o preço estimado para uma data.
     * @param {Date} date - A data selecionada.
     * @returns {number} - O preço estimado.
     */
    function calculateEstimatedPrice(date) {
        let price = 0;
        const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

        if (dayOfWeek === 0 || dayOfWeek === 6) { // Fim de semana (Domingo ou Sábado)
            price = BASE_PRICE_WEEKEND;
        } else { // Dia de semana
            price = BASE_PRICE_WEEKDAY;
        }

        if (isHoliday(date)) { // Usa a função isHoliday importada
            price += HOLIDAY_SURCHARGE;
        }

        return price;
    }

    /**
     * Renderiza o calendário para o mês e ano atuais.
     */
    function renderCalendar() {
        calendarDays.innerHTML = ''; // Limpa os dias anteriores
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Domingo) a 6 (Sábado)

        currentMonthYear.textContent = new Date(currentYear, currentMonth).toLocaleString('pt-br', { month: 'long', year: 'numeric' });

        // Preenche os dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', 'p-2', 'rounded-lg', 'cursor-pointer', 'transition', 'duration-200');
            dayDiv.textContent = day;

            const currentDate = new Date(currentYear, currentMonth, day);
            currentDate.setHours(0, 0, 0, 0); // Zera a hora para comparação

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Zera a hora para comparação

            // Desabilita datas passadas
            if (currentDate < today) {
                dayDiv.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
            } else {
                dayDiv.classList.add('hover:bg-pandora-bg-dark', 'hover:shadow-md');

                // Marca feriados ou datas já reservadas
                const dateString = currentDate.toISOString().slice(0, 10);
                if (isHoliday(currentDate)) { // Usa a função isHoliday importada
                    dayDiv.classList.add('bg-pandora-red', 'text-pandora-text-light', 'font-bold');
                    dayDiv.title = 'Feriado';
                } else if (RESERVED_DATES.includes(dateString)) { // Usa a constante RESERVED_DATES importada
                    dayDiv.classList.add('bg-gray-500', 'text-pandora-text-light', 'cursor-not-allowed', 'opacity-80');
                    dayDiv.title = 'Reservado';
                }


                // Marca a data selecionada
                if (selectedDate && currentDate.toDateString() === selectedDate.toDateString()) {
                    dayDiv.classList.add('bg-pandora-blue', 'text-pandora-text-light', 'font-bold', 'shadow-lg');
                }

                dayDiv.addEventListener('click', () => {
                    // Apenas permite selecionar datas futuras e não reservadas
                    if (currentDate >= today && !RESERVED_DATES.includes(dateString)) {
                        selectedDate = currentDate;
                        updateBookingDetails();
                        renderCalendar(); // Renderiza novamente para atualizar a seleção visual
                    }
                });
            }
            calendarDays.appendChild(dayDiv);
        }
    }

    /**
     * Atualiza os detalhes da reserva exibidos.
     */
    function updateBookingDetails() {
        if (selectedDate) {
            selectedDateDisplay.textContent = selectedDate.toLocaleDateString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const price = calculateEstimatedPrice(selectedDate);
            estimatedPriceDisplay.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
            proceedToBookingBtn.disabled = false;
        } else {
            selectedDateDisplay.textContent = 'Nenhuma';
            estimatedPriceDisplay.textContent = 'R$ 0,00';
            proceedToBookingBtn.disabled = true;
        }
    }

    // Event Listeners para navegação do calendário
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Event Listener para o botão de finalizar reserva
    proceedToBookingBtn.addEventListener('click', () => {
        if (selectedDate) {
            modalSelectedDate.textContent = selectedDate.toLocaleDateString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            modalEstimatedPrice.textContent = estimatedPriceDisplay.textContent;

            // Mostra o modal com transição
            bookingCheckoutModal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('opacity-0', 'scale-95');
                modalContent.classList.add('opacity-100', 'scale-100');
            }, 10);
        }
    });

    closeBookingModalBtn.addEventListener('click', () => {
        // Esconde o modal com transição
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            bookingCheckoutModal.classList.add('hidden');
        }, 300); // Corresponde à duração da transição CSS
    });

    // Fechar modal ao clicar fora
    bookingCheckoutModal.addEventListener('click', (e) => {
        if (e.target === bookingCheckoutModal) {
            modalContent.classList.remove('opacity-100', 'scale-100');
            modalContent.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                bookingCheckoutModal.classList.add('hidden');
            }, 300);
        }
    });

    // Lidar com o envio do formulário de contato (apenas um exemplo)
    bookingContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('clientName').value;
        const clientPhone = document.getElementById('clientPhone').value;
        const clientEmail = document.getElementById('clientEmail').value;

        const whatsappMessage = `Olá, gostaria de reservar a Chácara Pandora para o dia ${selectedDate.toLocaleDateString('pt-br')} (Valor Estimado: ${estimatedPriceDisplay.textContent}). Meus dados: Nome: ${clientName}, WhatsApp: ${clientPhone}, E-mail: ${clientEmail || 'Não fornecido'}.`;
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`; // Usa WHATSAPP_NUMBER importado
        
        window.open(whatsappLink, '_blank');

        // Opcional: Mostrar uma mensagem de sucesso e fechar o modal
        alert('Sua solicitação de reserva foi enviada! Entraremos em contato via WhatsApp em breve.');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            bookingCheckoutModal.classList.add('hidden');
            bookingContactForm.reset(); // Limpa o formulário
            selectedDate = null; // Reseta a data selecionada
            updateBookingDetails(); // Atualiza a exibição
            renderCalendar(); // Renderiza o calendário para limpar a seleção
        }, 300);
    });

    // Inicializa o calendário e os detalhes da reserva
    renderCalendar();
    updateBookingDetails();
});