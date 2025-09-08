// Sample data for recent orders
const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        items: 3,
        total: 45.97,
        status: "pending"
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        items: 2,
        total: 29.98,
        status: "preparing"
    },
    {
        id: "ORD-003",
        customer: "Mike Johnson",
        items: 4,
        total: 62.96,
        status: "completed"
    }
];

// Sample data for popular items
const popularItems = [
    {
        name: "Classic Burger",
        category: "Burgers",
        price: 12.99,
        orders: 45,
        revenue: 584.55
    },
    {
        name: "Margherita Pizza",
        category: "Pizzas",
        price: 14.99,
        orders: 38,
        revenue: 569.62
    },
    {
        name: "Chocolate Cake",
        category: "Desserts",
        price: 6.99,
        orders: 32,
        revenue: 223.68
    }
];

// Function to get status badge HTML
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

// Load recent orders
function loadRecentOrders() {
    const ordersContainer = $('#recent-orders');
    ordersContainer.empty();
    
    recentOrders.forEach(order => {
        const row = $(`
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.items} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${getStatusBadge(order.status)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-icon" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `);
        
        ordersContainer.append(row);
    });
}

// Load popular items
function loadPopularItems() {
    const itemsContainer = $('#popular-items');
    itemsContainer.empty();
    
    popularItems.forEach(item => {
        const row = $(`
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.orders}</td>
                <td>$${item.revenue.toFixed(2)}</td>
            </tr>
        `);
        
        itemsContainer.append(row);
    });
}

// View order details
function viewOrder(orderId) {
    // Implement order viewing functionality
    console.log(`Viewing order ${orderId}`);
}

// Initialize dashboard
$(document).ready(function() {
    loadRecentOrders();
    loadPopularItems();
});