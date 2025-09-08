// Menu items data
let menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        category: "burgers",
        price: 12.99,
        description: "Juicy beef patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        active: true
    },
    {
        id: 2,
        name: "Margherita Pizza",
        category: "pizzas",
        price: 14.99,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80",
        active: true
    }
];

// Display menu items
function displayMenuItems(items) {
    const container = $('#menu-items');
    container.empty();
    
    items.forEach(item => {
        const row = $(`
            <tr>
                <td>
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                </td>
                <td>${item.name}</td>
                <td>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" ${item.active ? 'checked' : ''} 
                            onchange="toggleItemStatus(${item.id})">
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-icon me-1" onclick="editItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger btn-icon" onclick="deleteItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
        
        container.append(row);
    });
}

// Filter items by category
function filterItems(category) {
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    displayMenuItems(filteredItems);
}

// Toggle item status
function toggleItemStatus(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        item.active = !item.active;
        showToast(`${item.name} ${item.active ? 'activated' : 'deactivated'}`);
    }
}

// Edit item
function editItem(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        // Populate form
        const form = $('#menuItemForm');
        form.find('[name="name"]').val(item.name);
        form.find('[name="category"]').val(item.category);
        form.find('[name="price"]').val(item.price);
        form.find('[name="description"]').val(item.description);
        form.find('[name="image"]').val(item.image);
        form.find('[name="active"]').prop('checked', item.active);
        
        // Update modal
        $('#addItemModal').modal('show');
        $('.modal-title').text('Edit Menu Item');
        $('#saveMenuItem').data('itemId', itemId);
    }
}

// Delete item
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== itemId);
        displayMenuItems(menuItems);
        showToast('Item deleted successfully');
    }
}

// Save item
function saveMenuItem() {
    const form = $('#menuItemForm');
    const itemId = $('#saveMenuItem').data('itemId');
    
    const newItem = {
        name: form.find('[name="name"]').val(),
        category: form.find('[name="category"]').val(),
        price: parseFloat(form.find('[name="price"]').val()),
        description: form.find('[name="description"]').val(),
        image: form.find('[name="image"]').val(),
        active: form.find('[name="active"]').is(':checked')
    };
    
    if (itemId) {
        // Update existing item
        const index = menuItems.findIndex(item => item.id === itemId);
        if (index !== -1) {
            menuItems[index] = { ...menuItems[index], ...newItem };
        }
    } else {
        // Add new item
        newItem.id = menuItems.length + 1;
        menuItems.push(newItem);
    }
    
    $('#addItemModal').modal('hide');
    displayMenuItems(menuItems);
    form[0].reset();
    showToast(`Item ${itemId ? 'updated' : 'added'} successfully`);
}

// Show toast notification
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

// Initialize menu manager
$(document).ready(function() {
    // Display all items initially
    displayMenuItems(menuItems);
    
    // Category filter buttons
    $('.btn-group button').click(function() {
        $('.btn-group button').removeClass('active');
        $(this).addClass('active');
        filterItems($(this).data('category'));
    });
    
    // Save item button
    $('#saveMenuItem').click(saveMenuItem);
    
    // Reset form when modal is closed
    $('#addItemModal').on('hidden.bs.modal', function() {
        $('#menuItemForm')[0].reset();
        $('.modal-title').text('Add Menu Item');
        $('#saveMenuItem').removeData('itemId');
    });
});