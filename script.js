// ----------------------
const products = [
{
id: 1,
name: "Eco Tumbler",
price: 24.99,
img: "https://images.unsplash.com/photo-1516594798943-3f6e6b1b6d5b?q=80&w=1200&auto=format",
},
{
id: 2,
name: "Canvas Tote",
price: 18.5,
img: "https://images.unsplash.com/photo-1475180098328-9b0b77a4f6b2?q=80&w=1200&auto=format",
},
{
id: 3,
name: "Notebook Pack",
price: 12.0,
img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format",
}
];


const container = document.getElementById("products");


products.forEach(p => {
const card = document.createElement("div");
card.className = "product-card";


card.innerHTML = `
<img src="${p.img}" alt="${p.name}" />
<h3>${p.name}</h3>
<p>$${p.price.toFixed(2)}</p>
<button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
`;


container.appendChild(card);
});


function addToCart(id) {
alert("Added product #" + id + " to cart (demo only)");
}
