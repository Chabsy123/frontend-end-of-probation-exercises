//Product data

const products = [
    {id:1, title:"Headphones", price:99.99, category: "Electronics"},
    {id:2, title:"Smart Watch", price:199.99, category: "Electronics"},
    {id:3, title:"T-shirt", price:129.99, category: "Clothing"}
]

//cart items
let cart = JSON.parse(localStorrage.getItem('cart')) || [];

//Display products
function showProducts(productsToShow) {
    const grid =  document.querySelector('.product-grid');
    grid.innerHTML = '';
    productsToShow.forEach(product => {
        grid.innerHTML += `
        <div class = "product-card">
        <img src="https://placeholder.com/34" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button onclick ="addToCart(${product.id})">Add to Cart</button>
        </div>
        `
    });

}

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    pulseCart();
}

//Update cart count
function updateCartCount(){
    document.querySelector('.cart-count').textContent = cart.length;
}

//Cart icon animation
function pulseCart(){
    const icon = document.querySelector('.cart-icon');
    icon.style.transform = 'scale(1.1)';
    setTimeout(() => icon.style.transform = 'scale(1)', 300);

}

//Search for Products
document.querySelector('.search-form input').addEventListener('input',(e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(term));
    showProducts(filtered);

});

