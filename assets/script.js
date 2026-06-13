// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Category Pills interactivity
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Favorite button toggle
    const favBtns = document.querySelectorAll('.favorite-btn');
    favBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
        });
    });

    // Add to cart animation
    const cartBtns = document.querySelectorAll('.add-cart-btn');
    const cartBadge = document.querySelector('.cart-badge');
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simple animation effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);

            // Increment cart
            let currentCount = parseInt(cartBadge.innerText);
            cartBadge.innerText = currentCount + 1;
            
            // Highlight cart icon
            cartBadge.parentElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBadge.parentElement.style.transform = 'scale(1)';
            }, 300);
        });
    });
});

// Interactive Filter Reset
window.resetFilters = function() {
    // Uncheck all brand checkboxes
    const checkboxes = document.querySelectorAll('.brand-list input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Reset slider visually (if applicable)
    const minThumb = document.querySelector('.slider-thumb.min');
    const maxThumb = document.querySelector('.slider-thumb.max');
    const fill = document.querySelector('.slider-fill');
    
    if (minThumb && maxThumb && fill) {
        minThumb.style.right = '0%';
        maxThumb.style.left = '0%';
        fill.style.left = '0%';
        fill.style.right = '0%';
    }
    
    // In a real Shopify OS 2.0 store, this would redirect to the base collection URL to clear filters.
    // window.location.href = window.location.pathname;
};
