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

// Product Page JS
function changeMainImage(thumbnail, newSrc) { document.getElementById('MainProductImage').src = newSrc; document.querySelectorAll('.thumbnail').forEach(function(t) { t.classList.remove('active'); }); thumbnail.classList.add('active'); }
function adjustQty(amount) { var input = document.getElementById('Quantity'); if(!input) return; var current = parseInt(input.value); var newQty = current + amount; if (newQty >= 1) { input.value = newQty; } }
function updateVariantSelection() { var radios = document.querySelectorAll('.variant-radio:checked'); var selectedOptions = Array.from(radios).map(radio => radio.value); var select = document.getElementById('ProductSelect'); if(!select || !window.productVariants) return; var matchedVariant = window.productVariants.find(function(variant) { return variant.options.every(function(option, index) { return option === selectedOptions[index]; }); }); var addToCartBtn = document.getElementById('AddToCart'); var addToCartText = document.getElementById('AddToCartText'); var priceElement = document.getElementById('ProductPrice'); if (matchedVariant) { select.value = matchedVariant.id; var formatMoney = function(cents) { return (cents / 100).toFixed(2) + ' —.ﬁ'; }; if(priceElement && matchedVariant.price) { priceElement.innerText = formatMoney(matchedVariant.price); } if (matchedVariant.available) { addToCartBtn.disabled = false; addToCartText.innerText = '≈÷«›… ≈·Ï «·”·…'; } else { addToCartBtn.disabled = true; addToCartText.innerText = '‰›œ  «·ﬂ„Ì…'; } } else { addToCartBtn.disabled = true; addToCartText.innerText = '€Ì— „ Ê›—'; } }
document.addEventListener('DOMContentLoaded', function() { if(document.querySelector('.variant-radio')) { updateVariantSelection(); } });

// Categories Modal
function openCategoriesModal() { var m = document.getElementById('CategoriesModal'); if(m){ m.classList.add('active'); document.body.style.overflow = 'hidden'; } }
function closeCategoriesModal() { var m = document.getElementById('CategoriesModal'); if(m){ m.classList.remove('active'); document.body.style.overflow = ''; } }
