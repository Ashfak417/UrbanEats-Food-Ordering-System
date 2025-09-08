// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('.cart-count').text(cartCount);
}

function updateCartDisplay() {
    const cartContainer = $('#cart-items');
    cartContainer.empty();
    
    if (cart.length === 0) {
        cartContainer.append(`
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                <h4>Your cart is empty</h4>
                <a href="menu.html" class="btn btn-primary mt-3">Browse Menu</a>
            </div>
        `);
        updateSummary();
        return;
    }
    
    cart.forEach(item => {
        const itemElement = $(`
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="flex-grow-1 mx-3">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-0 text-muted">${item.description}</p>
                </div>
                <div class="text-end">
                    <div class="mb-2">
                        <span class="menu-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `);
        
        cartContainer.append(itemElement);
    });
    
    updateSummary();
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        }
    }
}

function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 5.00 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + deliveryFee + tax;
    
    $('#subtotal').text(`$${subtotal.toFixed(2)}`);
    $('#delivery-fee').text(`$${deliveryFee.toFixed(2)}`);
    $('#tax').text(`$${tax.toFixed(2)}`);
    $('#total').text(`$${total.toFixed(2)}`);
    
    // Enable/disable checkout button
    $('#checkout-btn').prop('disabled', cart.length === 0);
}

// Checkout handler
$('#checkout-btn').click(function() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
});

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

$(document).ready(function() {
    updateCartDisplay();
    updateCartCount();
});