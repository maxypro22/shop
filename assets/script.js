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

            btn.style.transform = 'scale(0.95)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);

            if (cartBadge) {
                let currentCount = parseInt(cartBadge.innerText) || 0;
                cartBadge.innerText = currentCount + 1;
                cartBadge.parentElement.style.transform = 'scale(1.2)';
                setTimeout(() => { cartBadge.parentElement.style.transform = 'scale(1)'; }, 300);
            }
        });
    });
});

// Interactive Filter Reset
window.resetFilters = function() {
    const checkboxes = document.querySelectorAll('.brand-list input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
};

// Product Page JS
function changeMainImage(thumbnail, newSrc) {
    document.getElementById('MainProductImage').src = newSrc;
    document.querySelectorAll('.thumbnail').forEach(function(t) { t.classList.remove('active'); });
    thumbnail.classList.add('active');
}

function adjustQty(amount) {
    var input = document.getElementById('Quantity');
    if (!input) return;
    var newQty = parseInt(input.value) + amount;
    if (newQty >= 1) input.value = newQty;
}

function updateVariantSelection() {
    var TEXT_ADD     = 'إضافة إلى السلة'; // إضافة إلى السلة
    var TEXT_OUT     = 'نفدت الكمية';                   // نفدت الكمية
    var TEXT_UNAVAIL = 'غير متاح';                                     // غير متاح
    var CURRENCY     = 'ر.ق';                                                                    // ر.ق

    var radios = document.querySelectorAll('.variant-radio:checked');
    var selectedOptions = Array.from(radios).map(function(r) { return r.value; });
    var select = document.getElementById('ProductSelect');
    if (!select || !window.productVariants) return;

    var matchedVariant = window.productVariants.find(function(variant) {
        return variant.options.every(function(option, index) {
            return option === selectedOptions[index];
        });
    });

    var addToCartBtn  = document.getElementById('AddToCart');
    var addToCartText = document.getElementById('AddToCartText');
    var priceElement  = document.getElementById('ProductPrice');

    if (matchedVariant) {
        select.value = matchedVariant.id;
        if (priceElement && matchedVariant.price) {
            priceElement.innerText = (matchedVariant.price / 100).toFixed(2) + ' ' + CURRENCY;
        }
        if (matchedVariant.available) {
            addToCartBtn.disabled = false;
            addToCartText.innerText = TEXT_ADD;
        } else {
            addToCartBtn.disabled = true;
            addToCartText.innerText = TEXT_OUT;
        }
    } else {
        addToCartBtn.disabled = true;
        addToCartText.innerText = TEXT_UNAVAIL;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.variant-radio')) updateVariantSelection();
});

// Categories Modal
function openCategoriesModal() {
    var m = document.getElementById('CategoriesModal');
    if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeCategoriesModal() {
    var m = document.getElementById('CategoriesModal');
    if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('CategoriesModal');
    if (modal) document.body.appendChild(modal);
});

// Scroll Reveal
(function () {
    if (!window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            observer.unobserve(el);
            el.classList.add('revealed');
            // Remove the reveal class after the transition so hover transforms work normally
            el.addEventListener('transitionend', function cleanup() {
                el.classList.remove('reveal');
                el.style.transitionDelay = '';
                el.removeEventListener('transitionend', cleanup);
            });
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    function addReveal(el, delayMs) {
        if (el.classList.contains('reveal')) return;
        el.classList.add('reveal');
        if (delayMs) el.style.transitionDelay = delayMs + 'ms';
        observer.observe(el);
    }

    function setupReveals() {
        // Stagger children inside grids (product cards, best seller cards, feature cards)
        document.querySelectorAll('.product-grid, .bs-grid, .features-grid').forEach(function (grid) {
            Array.from(grid.children).forEach(function (child, i) {
                addReveal(child, i * 90);
            });
        });

        // Individual section-level reveals
        [
            '.bs-header',
            '.features-header',
            '.filter-section',
            '.section-title',
            '.product-gallery',
            '.product-info',
            '.app-download-wrapper',
            '.pagination-wrapper'
        ].forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                addReveal(el, 0);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupReveals);
    } else {
        setupReveals();
    }
})();
