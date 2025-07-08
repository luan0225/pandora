// js/constants.js

export const WHATSAPP_NUMBER = '5592991456365'; // Seu número de WhatsApp

export const RESERVED_DATES = [
    '2025-07-12', // Exemplo: Data alugada
];

export const GALLERY_IMAGES = [
    { src: './imagens/banner1.jpg', alt: 'Vista da Chácara Pandora' }, // Ajuste de caminho se gallery for subpasta
    { src: './imagens/banner2.jpg', alt: 'Piscina Principal' },
    { src: './imagens/banner3.jpg', alt: 'Área da Churrasqueira' },
    { src: './imagens/banner4.jpg', alt: 'Interior da Edícula' },
    { src: './imagens/banner5.jpg', alt: 'Campo de Futebol' },
    { src: './imagens/banner6.jpg', alt: 'Vista Noturna' },
    { src: './imagens/banner7.jpg', alt: 'Espaço de Eventos' },
    { src: './imagens/banner8.jpg', alt: 'Cozinha Equipada' },
    { src: './imagens/banner9.jpg', alt: 'Entrada da Chácara' },
];

export const PRODUCTS = [
    // Longneck
    { id: 'prod001', name: 'Heineken Longneck', price: 10.00, description: 'Cerveja puro malte em garrafa longneck.', img: './imagens/heineken1.jpg' },
    { id: 'prod002', name: 'Budweiser Longneck', price: 10.00, description: 'Cerveja americana premium em garrafa longneck.', img: './imagens/budweiser1.jpg' },
    { id: 'prod003', name: 'Corona Longneck', price: 10.00, description: 'Cerveja leve e refrescante com limão em garrafa longneck.', img: './imagens/corona1.jpg' },

    // Lata
    { id: 'prod004', name: 'Skol Lata', price: 5.00, description: 'Cerveja pilsen clássica em lata.', img: './imagens/skol.jpg' },
    { id: 'prod005', name: 'Brahma Lata', price: 5.00, description: 'Cerveja com sabor marcante e cremosidade em lata.', img: './imagens/brahma.jpg' },
    { id: 'prod006', name: 'Antartica Lata', price: 5.00, description: 'A boa cerveja brasileira em lata.', img: './imagens/antartica.jpg' },

    // Outras Bebidas
    { id: 'prod007', name: 'Skarlof Ice', price: 10.00, description: 'Bebida mista refrescante.', img: './imagens/skarlof_ice.jpg' },
    { id: 'prod008', name: 'Skarlof 1L', price: 25.00, description: 'Bebida mista Skarlof em garrafa de 1 litro.', img: './imagens/skarlof_1l.jpg' },
    { id: 'prod009', name: 'Energético 1,5L', price: 25.00, description: 'Energético de diversos sabores em garrafa de 1,5 litros.', img: './imagens/energetico_1_5l.jpg' },
    { id: 'prod010', name: 'Gelo de Sabor', price: 5.00, description: 'Gelo com diversos sabores para suas bebidas.', img: './imagens/gelo_sabor.jpg' },
];

export const CAROUSEL_IMAGES = [
    { src: './imagens/heineken.jpg', alt: 'Cerveja Heineken Longneck' }, // Imagem de banner
    { src: './imagens/budweiser.jpg', alt: 'Cerveja Budweiser Longneck' }, // Imagem de banner
    { src: './imagens/corona.jpg', alt: 'Cerveja Corona Longneck' },     // Imagem de banner
    { src: './imagens/caxinha.jpg', alt: 'Cerveja skol lata' },      // Imagem de banner
    { src: './imagens/balde.jpg', alt: 'Balde de Gelo com Bebidas' },  // Imagem de banner
    { src: './imagens/garrafa.jpg', alt: 'Seleção de Garrafas de Bebidas' }, // Imagem de banner
];

export function isHoliday(date) {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    // Feriados Nacionais 2025
    const federalHolidays = [
        `2025-01-01`, // Confraternização Universal
        `2025-02-25`, // Carnaval (terça-feira)
        `2025-02-26`, // Quarta-feira de Cinzas
        `2025-04-18`, // Paixão de Cristo
        `2025-04-21`, // Tiradentes
        `2025-05-01`, // Dia do Trabalho
        `2025-06-19`, // Corpus Christi
        `2025-09-07`, // Independência do Brasil
        `2025-10-12`, // Nossa Senhora Aparecida
        `2025-11-02`, // Finados
        `2025-11-15`, // Proclamação da República
        `2025-12-25`  // Natal
    ];

    // Feriados Estaduais do Amazonas (2025)
    const stateHolidays = [
        `2025-09-05`, // Elevação do Amazonas à Categoria de Província
    ];

    // Feriados Municipais de Itacoatiara (2025)
    const municipalHolidays = [
        `2025-07-15`, // Aniversário de Itacoatiara
        `2025-06-29`, // Dia de São Pedro (Padroeiro de Itacoatiara - verificar se é feriado municipal oficial)
    ];

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return federalHolidays.includes(dateString) ||
           stateHolidays.includes(dateString) ||
           municipalHolidays.includes(dateString);
}