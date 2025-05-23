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