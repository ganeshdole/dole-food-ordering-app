import { menuArray } from "./data.js";
// Retrieving HTML elements by ID
const container = document.getElementById("container");
const shoppingCart = document.getElementById("shopping-cart");
const totalCart = document.getElementById("total-cart");
const purchaseCard = document.getElementById("purchase-card");
const formEl = document.getElementById("card-info");

// Array to store items in the shopping cart
let cartItem = [];

// Event listener for clicks
document.addEventListener("click", (event) => {
  // Handling click on "add-item" button
  if (event.target.id == "add-item") {
    addItemToCart(event.target.parentElement.id);
  }
  // Handling click on "remove-item" button
  else if (event.target.id == "remove-item") {
    removeItemFromCart(event.target.parentElement.id);
  }
  // Handling click on "purchase-btn" button (placeholder for future functionality)
  else if (event.target.id === "purchase-btn") {
    formEl.classList.remove("hide");
    // renderPurchaseCard();
  } else if (event.target.id === "pay") {
    // renderThankYou();
  }
});

// Use this instead of renderThankYou()
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("fname").value;
  document.getElementById("card-info").classList.add("display-none");
  cartItem = [];
  shoppingCart.innerHTML = `<p class="title green">Thanks, ${name}! Your order is on its way!</p>`;
  if (cartItem.length != 0) {
    document.getElementById("title").classList.remove("hidden");
  } else {
    document.getElementById("title").classList.add("hidden");
  }
  totalCart.innerHTML = renderTotal();
});

// Function to add an item to the shopping cart
function addItemToCart(id) {
  cartItem.push(menuArray[id]);
  renderCart();
}

// Function to render the shopping cart
function renderCart() {
  // Show or hide the cart title based on the cart contents
  if (cartItem.length != 0) {
    document.getElementById("title").classList.remove("hidden");
  } else {
    document.getElementById("title").classList.add("hidden");
  }
  // Render individual cart items
  shoppingCart.innerHTML = cartItem
    .map((item) => {
      return `<div id="${item.id}" class="cart">
    <p id="cart-item" class="cart-item">${item.name}</p>
    <button id="remove-item" class="cart-remove">remove</button>
    <p id="cart-price" class="price">$${item.price}</p>
  </div>`;
    })
    .join("");
  // Render the total section
  totalCart.innerHTML = renderTotal();
}

// Function to render the total section
function renderTotal() {
  if (cartItem.length != 0) {
    return `<hr class="width-508"/>
  <div class="total-card">
    <p id="total-name" class="total-name">Total Price</p>
    <p class="price" id="price">$${cartItem.reduce((total, item) => {
      return total + item.price;
    }, 0)}</p>
  </div>
  <button class="purchase-btn" id="purchase-btn">Complete order</button>`;
  }
  return null;
}

// Function to remove an item from the shopping cart
function removeItemFromCart(id) {
  let removed = false;
  cartItem = cartItem.filter((item) => {
    if (!removed && item.id === parseInt(id)) {
      removed = true;
      return false;
    }
    return true;
  });
  renderCart();
}

//Function for render purchase card Info
function renderPurchaseCard() {
  purchaseCard.innerHTML = `<form class="card-info white" id="card-info">
  <p class="title">Enter card details</p>
  <input type="text" id="fname" name="fname" placeholder="Enter your name" class="input" id="fname" required>
  <input type="text" id="lname" name="lname" placeholder="Enter card number" class="input" required>
  <input type="text" id="lname" name="lname" placeholder="Enter CVV" class="input" required>
  <button type="submit" class="input green" id="pay">Pay<button/>
  </form>`;
}

// Function Render Thankyou Message
function renderThankYou(e) {
  e.preventDefault();

  const name = document.getElementById("fname").value;
  document.getElementById("card-info").classList.add("display-none");
  cartItem = [];
  shoppingCart.innerHTML = `<p class="title green">Thanks, ${name}! Your order is on its way!</p>`;
  if (cartItem.length != 0) {
    document.getElementById("title").classList.remove("hidden");
  } else {
    document.getElementById("title").classList.add("hidden");
  }
  totalCart.innerHTML = renderTotal();
}
// Function to generate HTML for menu items
function getMenuItem(array) {
  return array.map((item) => {
    const { name, ingredients, id, price, emoji } = item;
    return `
         <div class="item-card" id="${id}">
            <p class="item-image">${emoji}</p>
                <div class="item-info">
                    <p class="item-name">${name}</p>
                    <p class="item-ingredients">${ingredients}</p>
                    <p class="item-price">$${price}</p>
                </div>
            <i class="fa-solid  fa-plus" id="add-item"></i>
        </div>
     <hr/>`;
  });
}

// Populate the container with menu items
container.innerHTML += getMenuItem(menuArray).join("");
