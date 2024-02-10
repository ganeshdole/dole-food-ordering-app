import { menuArray } from "./data.js";
const container = document.getElementById("container");
const shoppingCart = document.getElementById("shopping-cart");
const totalCart = document.getElementById("total-cart");
let cartItem = [];

document.addEventListener("click", (event) => {
  if (event.target.id == "add-item") {
    addItemToCart(event.target.parentElement.id);
  } else if (event.target.id == "remove-item") {
    removeItemFromCart(event.target.parentElement.id);
  } else if (event.target.id === "purchase-btn") {
  }
});

function addItemToCart(id) {
  cartItem.push(menuArray[id]);
  renderCart();
}

function renderCart() {
  if (cartItem.length != 0) {
    document.getElementById("title").classList.remove("hidden");
  } else {
    document.getElementById("title").classList.add("hidden");
  }
  shoppingCart.innerHTML = cartItem
    .map((item) => {
      return `<div id="${item.id}" class="cart">
    <p id="cart-item" class="cart-item">${item.name}</p>
    <button id="remove-item" class="cart-remove">remove</button>
    <p id="cart-price" class="price">$${item.price}</p>
  </div>`;
    })
    .join("");
  totalCart.innerHTML = renderTotal();
}

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

container.innerHTML += getMenuItem(menuArray).join("");
