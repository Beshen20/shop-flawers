document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    const headerIcons = document.querySelector('.header__icons');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        headerIcons.classList.toggle('active');
    });
});

async function loadProducts() {
    try {
        const response = await fetch('../js/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

// Функция для создания HTML карточки товара
function createProductCard(product) {
    return `
        <div class="product__wrapper-item">
            <img src="img/${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        </div>
    `;
}

// Функция для отображения всех товаров
async function displayProducts() {
    const productWrapper = document.getElementById('productWrapper');
    const products = await loadProducts();

    products.forEach(product => {
        productWrapper.innerHTML += createProductCard(product);
    });
}

// Вызываем функцию отображения товаров при загрузке страницы
window.addEventListener('load', displayProducts);