// Sample orders data
let orders = [
    {
        id: "ORD-001",
        customer: {
            name: "John Doe",
            email: "john@example.com",
            phone: "(555) 123-4567"
        },
        date: "2023-12-01 14:30",
        items: [
            { name: "Classic Burger", quantity: 2, price: 12.99 },
            { name: "Fries", quantity: 1, price: 4.99 }
        ],
        address: "123 Main St, City, State 12345",
        notes: "No onions please",
        status: "pending",
        total: 30.97
    },
    {
        id: "ORD-002",
        customer: {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "(555) 987-6543"
        },
        date: "2023-12-01 15:15",
        items: [
            { name: "Margherita Pizza", quantity: 1, price: 14.99 },
            { name: "Coke", quantity: 2, price: 2.99 }
        ],
        address: "456 Oak Ave, City, State 12345",
        notes: "Extra cheese",
        status: "preparing",
        total: 20.97
    }
];

// Display orders
function displayOrders(ordersList) {
    const container = $('#orders-list');
    container.empty();
    
    ordersList.forEach(order => {
        const row = $(`
            <tr>
                <td>${order.id}</td>
                <td>${order.customer.name}</td>
                <td>${order.date}</td>
                <td>${order.items.length} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${getStatusBadge(order.status)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-icon me-1" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary btn-icon" onclick="printOrder('${order.id}')">
                        <i class="fas fa-print"></i>
                    </button>
                </td>
            </tr>
        `);
        
        container.append(row);
    });
}

// Get status badge HTML
function getStatusBadge(status) {
    const statusClasses = {
        pending: 'status-pending',
        preparing: 'status-preparing',
        delivering: 'status-delivering',
        completed: 'status-completed',
        cancelled: 'status-cancelled'
    };
    
    return `<span class="status-badge ${statusClasses[status]}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

// View order details
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Populate customer info
    $('#customerInfo').html(`
        <strong>Name:</strong> ${order.customer.name}<br>
        <strong>Email:</strong> ${order.customer.email}<br>
        <strong>Phone:</strong> ${order.customer.phone}
    `);
    
    // Populate delivery address
    $('#deliveryAddress').text(order.address);
    
    // Populate order items
    const itemsContainer = $('#orderItems');
    itemsContainer.empty();
    
    order.items.forEach(item => {
        const row = $(`
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `);
        itemsContainer.append(row);
    });
    
    // Populate order notes
    $('#orderNotes').text(order.notes || 'No notes');
    
    // Populate order summary
    $('#orderSummary').html(`
        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>$${order.total.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Delivery Fee:</span>
            <span>$5.00</span>
        </div>
        <div class="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>$${(order.total + 5).toFixed(2)}</strong>
        </div>
    `);
    
    // Show modal
    $('#orderDetailsModal').modal('show');
}

// Print order
function printOrder(orderId) {
    // Implement print functionality
    console.log(`Printing order ${orderId}`);
}

// Filter orders
function filterOrders() {
    const status = $('#statusFilter').val();
    const date = $('#dateFilter').val();
    const search = $('#searchOrders').val().toLowerCase();
    
    let filtered = orders;
    
    // Apply status filter
    if (status !== 'all') {
        filtered = filtered.filter(order => order.status === status);
    }
    
    // Apply date filter
    if (date !== 'all') {
        const today = new Date();
        const orderDate = new Date(date);
        filtered = filtered.filter(order => {
            const orderDate = new Date(order.date);
            switch (date) {
                case 'today':
                    return orderDate.toDateString() === today.toDateString();
                case 'week':
                    const weekAgo = new Date(today.setDate(today.getDate() - 7));
                    return orderDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
                    return orderDate >= monthAgo;
            }
        });
    }
    
    // Apply search filter
    if (search) {
        filtered = filtered.filter(order => 
            order.id.toLowerCase().includes(search) ||
            order.customer.name.toLowerCase().includes(search) ||
            order.customer.email.toLowerCase().includes(search)
        );
    }
    
    displayOrders(filtered);
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

// Initialize orders manager
$(document).ready(function() {
    // Display initial orders
    displayOrders(orders);
    
    // Set up filter handlers
    $('#statusFilter, #dateFilter').change(filterOrders);
    $('#searchOrders').on('input', filterOrders);
    
    // Refresh button
    $('#refreshOrders').click(function() {
        displayOrders(orders);
        showToast('Orders refreshed');
    });
    
    // Update order status
    $('#updateOrderStatus').click(function() {
        // Implement status update
        showToast('Order status updated');
        $('#orderDetailsModal').modal('hide');
    });
});