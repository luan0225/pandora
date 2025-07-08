// js/delivery.js

import { PRODUCTS, WHATSAPP_NUMBER, CAROUSEL_IMAGES } from './constants.js'; // Importa de constants.js
import { initCarousel } from './carousel.js'; // Importa a função de inicialização do carrossel

document.addEventListener('DOMContentLoaded', () => {
    // Referências do Carrossel são movidas para carousel.js
    // const carouselContainer = document.getElementById('carousel-container');
    // const carouselPrevBtn = document.getElementById('carousel-prev');
    // const carouselNextBtn = document.getElementById('carousel-next');

    const productsGrid = document.getElementById('products-grid');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Validação de existência de elementos para evitar erros
    if (!productsGrid || !cartItemsList || !cartTotalSpan || !checkoutBtn) {
        console.warn("Um ou mais elementos HTML necessários para a parte de Produtos/Carrinho do Delivery não foram encontrados. A seção pode não funcionar corretamente.");
    }

    let cart = [];

    function renderProducts() {
        if (!productsGrid) return; // Sai se o grid de produtos não for encontrado

        productsGrid.innerHTML = '';
        PRODUCTS.forEach(product => { // Usa PRODUCTS importado
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'items-center', 'text-center');
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="w-full h-32 object-contain rounded-md mb-3"> <h4 class="text-lg font-semibold text-pandora-text-dark">${product.name}</h4>
                <p class="text-pandora-blue font-bold text-xl mt-1">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button class="add-to-cart-btn bg-pandora-green text-pandora-text-light px-4 py-2 rounded-lg mt-3 hover:bg-green-600 transition duration-300" data-id="${product.id}">Adicionar ao Carrinho</button>
            `;
            productsGrid.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id; // ID é string agora
                const productToAdd = PRODUCTS.find(p => p.id === productId); // Usa PRODUCTS
                if (productToAdd) {
                    addToCart(productToAdd);
                }
            });
        });
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (!cartItemsList || !cartTotalSpan || !checkoutBtn) return; // Sai se os elementos do carrinho não forem encontrados

        cartItemsList.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="py-3 text-center text-gray-500">Nenhum item no carrinho.</li>';
            checkoutBtn.disabled = true;
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('flex', 'justify-between', 'items-center', 'py-2');
                li.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span class="font-semibold">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    <button class="remove-from-cart-btn text-pandora-red hover:text-red-700 ml-4" data-id="${item.id}">&times;</button>
                `;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
            });
            checkoutBtn.disabled = false;
        }
        cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id; // ID é string
                removeFromCart(productId);
            });
        });
    }

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartDisplay();
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                const cartSummary = cart.map(item => `${item.name} (${item.quantity}x) - R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2).replace('.', ',');
                const message = `Olá, gostaria de fazer um pedido de bebidas para a Chácara Pandora:\n\n${cartSummary}\n\nTotal: R$ ${total}\n\nPor favor, confirme a disponibilidade e como devo proceder com o pagamento.`;
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; // Usa WHATSAPP_NUMBER
                window.open(whatsappUrl, '_blank');
                cart = []; // Limpa o carrinho após o checkout
                updateCartDisplay();
            } else {
                alert('Seu carrinho está vazio!');
            }
        });
    }

    // Inicializa a renderização para Delivery (produtos e carrinho) quando este script carrega
    renderProducts();
    updateCartDisplay();

    // Inicializa o carrossel (que agora está em seu próprio arquivo JS)
    initCarousel(); 
});