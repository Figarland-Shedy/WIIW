const menuItems = [
  { id: 1, name: "Margherita Pizza", restaurant: "Roma House", category: "pizza", price: 12.5, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Cheese Burger", restaurant: "Stacked Grill", category: "burgers", price: 10.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Dragon Roll", restaurant: "Tokyo Wave", category: "sushi", price: 14.25, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Chocolate Lava Cake", restaurant: "Sugar Spot", category: "dessert", price: 7.75, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Pepperoni Pizza", restaurant: "Roma House", category: "pizza", price: 13.9, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Crispy Chicken Burger", restaurant: "Birdy Buns", category: "burgers", price: 11.45, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80" }
];

const cart = [];
const menuGrid = document.getElementById("menu-grid");
const template = document.getElementById("menu-item-template");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const cartPanel = document.getElementById("cart-panel");
const progressBar = document.getElementById("progress-bar");
const statusText = document.getElementById("status-text");

function renderMenu() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = menuItems.filter((item) => {
    const inCategory = category === "all" || item.category === category;
    const matchQuery =
      item.name.toLowerCase().includes(query) ||
      item.restaurant.toLowerCase().includes(query);
    return inCategory && matchQuery;
  });

  menuGrid.innerHTML = "";
  filtered.forEach((item) => {
    const node = template.content.cloneNode(true);
    node.querySelector("img").src = item.image;
    node.querySelector("img").alt = item.name;
    node.querySelector("h3").textContent = item.name;
    node.querySelector(".restaurant").textContent = item.restaurant;
    node.querySelector(".price").textContent = `$${item.price.toFixed(2)}`;
    node.querySelector("button").addEventListener("click", () => addToCart(item));
    menuGrid.appendChild(node);
  });
}

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = String(cart.length);
}

function runDeliveryTracker() {
  const phases = [
    { text: "Order received by restaurant", width: 25 },
    { text: "Chef is preparing your food", width: 50 },
    { text: "Courier picked up your order", width: 75 },
    { text: "Delivered. Enjoy your meal!", width: 100 }
  ];

  let index = 0;
  statusText.textContent = phases[index].text;
  progressBar.style.width = `${phases[index].width}%`;

  const interval = setInterval(() => {
    index += 1;
    if (index >= phases.length) {
      clearInterval(interval);
      cart.length = 0;
      updateCart();
      return;
    }
    statusText.textContent = phases[index].text;
    progressBar.style.width = `${phases[index].width}%`;
  }, 1500);
}

searchInput.addEventListener("input", renderMenu);
categorySelect.addEventListener("change", renderMenu);
document.getElementById("view-cart-btn").addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});
document.getElementById("close-cart").addEventListener("click", () => {
  cartPanel.classList.add("hidden");
});
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (!cart.length) {
    statusText.textContent = "Your cart is empty. Add a dish before placing an order.";
    progressBar.style.width = "0%";
    return;
  }
  runDeliveryTracker();
});

renderMenu();
