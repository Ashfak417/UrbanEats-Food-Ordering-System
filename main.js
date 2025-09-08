// Popular Items Data
const popularItems = [
    {
        id: 1,
        name: "Classic Burger",
        price: 12.99,
        description: "Juicy beef patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Margherita Pizza",
        price: 14.99,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Caesar Salad",
        price: 9.99,
        description: "Crispy romaine with classic Caesar dressing",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('.cart-count').text(cartCount);
}

function addToCart(itemId) {
    const item = popularItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Item added to cart!');
}

function showToast(message) {
    const toast = $('<div>')
        .addClass('toast')
        .css({
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#333',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000
        })
        .text(message);

    $('body').append(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Load popular items
$(document).ready(function() {
    const popularItemsContainer = $('#popular-items');
    
    popularItems.forEach(item => {
        const itemElement = $(`
            <div class="col-md-4 mb-4">
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-content">
                        <h5>${item.name}</h5>
                        <p>${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="menu-item-price">$${item.price}</span>
                            <button class="btn btn-primary" onclick="addToCart(${item.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        popularItemsContainer.append(itemElement);
    });

    // Initialize cart count
    updateCartCount();
});