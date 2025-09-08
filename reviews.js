// Sample reviews data
let reviews = [
    {
        id: 1,
        name: "John Doe",
        rating: 5,
        date: "2023-12-01",
        comment: "Amazing food and quick delivery! The burger was perfectly cooked and the fries were crispy. Will definitely order again!",
        helpful: 12
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        date: "2023-11-30",
        comment: "Great experience overall. The pizza was delicious but took a bit longer than expected to arrive.",
        helpful: 8
    },
    {
        id: 3,
        name: "Mike Johnson",
        rating: 5,
        date: "2023-11-29",
        comment: "Best delivery service in town! Food was hot and fresh, and the delivery person was very polite.",
        helpful: 15
    }
];

// Display reviews
function displayReviews() {
    const container = $('#reviews-list');
    container.empty();
    
    reviews.forEach(review => {
        const stars = Array(5).fill('').map((_, index) => 
            `<i class="fas fa-star${index >= review.rating ? '-o' : ''}"></i>`
        ).join('');
        
        const reviewElement = $(`
            <div class="review-item mb-4">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 class="mb-1">${review.name}</h5>
                        <div class="stars mb-2">
                            ${stars}
                        </div>
                    </div>
                    <small class="text-muted">${review.date}</small>
                </div>
                <p class="mb-2">${review.comment}</p>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="markHelpful(${review.id})">
                        <i class="fas fa-thumbs-up"></i> Helpful (${review.helpful})
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="reportReview(${review.id})">
                        <i class="fas fa-flag"></i> Report
                    </button>
                </div>
            </div>
        `);
        
        container.append(reviewElement);
    });
}

// Handle star rating input
$('.rating-input i').click(function() {
    const rating = $(this).data('rating');
    $('#rating').val(rating);
    
    $('.rating-input i').removeClass('fas').addClass('far');
    $('.rating-input i').each(function(index) {
        if (index < rating) {
            $(this).removeClass('far').addClass('fas');
        }
    });
});

// Submit review
$('#submitReview').click(function() {
    const form = $('#reviewForm');
    const rating = parseInt($('#rating').val());
    const comment = form.find('[name="review"]').val();
    
    if (!rating || !comment) {
        showToast('Please provide both rating and review');
        return;
    }
    
    // Add new review
    const newReview = {
        id: reviews.length + 1,
        name: 'Anonymous User', // In real app, get from logged-in user
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        comment: comment,
        helpful: 0
    };
    
    reviews.unshift(newReview);
    displayReviews();
    
    // Reset and close modal
    form[0].reset();
    $('.rating-input i').removeClass('fas').addClass('far');
    $('#writeReviewModal').modal('hide');
    
    showToast('Review submitted successfully');
});

// Mark review as helpful
function markHelpful(reviewId) {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        displayReviews();
        showToast('Thanks for your feedback!');
    }
}

// Report review
function reportReview(reviewId) {
    showToast('Review reported to moderators');
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

// Initialize reviews
$(document).ready(function() {
    displayReviews();
});