// Menu Items Data
const menuItems = [
    // Burgers
    {
        id: 1,
        name: "Classic Burger",
        price: 12.99,
        category: "burgers",
        description: "Juicy beef patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Cheese Burger",
        price: 13.99,
        category: "burgers",
        description: "Classic burger with melted cheddar",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80"
    },
    // Pizzas
    {
        id: 3,
        name: "Margherita Pizza",
        price: 14.99,
        category: "pizzas",
        description: "Fresh tomatoes, mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        price: 15.99,
        category: "pizzas",
        description: "Classic pepperoni with mozzarella",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80"
    },
    // Drinks
    {
        id: 5,
        name: "Fresh Lemonade",
        price: 4.99,
        category: "drinks",
        description: "Homemade lemonade with mint",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5c005?auto=format&fit=crop&w=500&q=80"
    },
    // Desserts
    {
        id: 6,
        name: "Chocolate Cake",
        price: 6.99,
        category: "desserts",
        description: "Rich chocolate cake with ganache",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('.cart-count').text(cartCount);
}

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
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

// Filter menu items by category
function filterItems(category) {
    const items = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    displayMenuItems(items);
}

// Display menu items
function displayMenuItems(items) {
    const menuContainer = $('#menu-items');
    menuContainer.empty();
    
    items.forEach(item => {
        const itemElement = $(`
            <div class="col-md-4 mb-4 fade-in">
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
        
        menuContainer.append(itemElement);
    });
}

$(document).ready(function() {
    // Display all items initially
    displayMenuItems(menuItems);
    
    // Initialize cart count
    updateCartCount();
    
    // Category filter buttons
    $('.category-filter button').click(function() {
        $('.category-filter button').removeClass('active');
        $(this).addClass('active');
        filterItems($(this).data('category'));
    });
});