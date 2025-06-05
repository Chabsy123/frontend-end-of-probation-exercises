document.addEventListener('DOMContentLoaded', function() {
    // 1. PRODUCT DATA
    const products = [
        { id: 1, title: "Wireless Headphones", price: 99.99, category: "Electronics" },
        { id: 2, title: "Smart Watch", price: 199.99, category: "Electronics" },
        { id: 3, title: "Cotton T-Shirt", price: 24.99, category: "Clothing" },
        { id: 4, title: "Coffee Maker", price: 49.99, category: "Home" },
        { id: 5, title: "Running Shoes", price: 79.99, category: "Clothing" },
        { id: 6, title: "Bluetooth Speaker", price: 59.99, category: "Electronics" }
    ];

    // 2. INITIALIZE CART
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // 3. DISPLAY PRODUCTS
    function displayProducts(productsToShow = products) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="https://via.placeholder.com/150?text=${encodeURIComponent(product.title)}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // 4. CART FUNCTIONS
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        animateCart();
    }

    function updateCartCount() {
        document.querySelector('.cart-count').textContent = cart.length;
    }

    function animateCart() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('pulse');
        setTimeout(() => cartIcon.classList.remove('pulse'), 500);
    }

    // 5. SEARCH FUNCTIONALITY
    function setupSearch() {
        const searchInput = document.querySelector('.search-form input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const filtered = searchTerm.length >= 2 
                ? products.filter(p => p.title.toLowerCase().includes(searchTerm))
                : products;
            displayProducts(filtered);
        });
    }

    // 6. FILTER/SORT FUNCTIONALITY
    function setupFilters() {
        // Category filters
        document.querySelectorAll('.categories input').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });

        // Price range display
        const priceRange = document.querySelector('input[type="range"]');
        priceRange.addEventListener('input', function() {
            document.querySelector('.price-range-values span:first-child').textContent = `$${this.value}`;
            applyFilters();
        });

        // Sort functionality
        document.querySelector('.sort-section select').addEventListener('change', applyFilters);
    }

    function applyFilters() {
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('.categories input:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent);

        // Get price range
        const maxPrice = parseFloat(document.querySelector('input[type="range"]').value);

        // Get search term
        const searchTerm = document.querySelector('.search-form input').value.toLowerCase().trim();

        // Get sort value
        const sortValue = document.querySelector('.sort-section select').value;

        // Apply filters
        let filtered = [...products];
        
        // Search filter
        if (searchTerm.length >= 2) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm));
        }
        
        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }
        
        // Price filter
        filtered = filtered.filter(p => p.price <= maxPrice);
        
        // Sorting
        filtered.sort((a, b) => {
            switch (sortValue) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.title.localeCompare(b.title);
                case 'name-desc': return b.title.localeCompare(a.title);
                default: return 0;
            }
        });
        
        displayProducts(filtered);
    }

    // 7. INITIALIZE EVERYTHING
    displayProducts();
    setupSearch();
    setupFilters();

    // Event delegation for cart buttons
    document.querySelector('.product-grid').addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(e.target.dataset.id));
        }
    });
});