import { menuArray } from "./data.js";
const container = document.getElementById("container");
const shoppingCart = document.getElementById("shopping-cart");
const totalCart = document.getElementById("total-cart");
const shoppingCartTitle = document.getElementById("title");

let cartItem = [];
document.addEventListener("click", (event) => {
  if (event.target.id == "add-item") {
    renderShoppingCart(event.target.parentElement.id);
  }
});

function renderShoppingCart(id) {
  shoppingCartTitle.classList.remove("hidden");
  shoppingCart.innerHTML = addItemToCart(id);
  totalCart.innerHTML = renderTotal();
}

function addItemToCart(id) {
  cartItem.push(menuArray[id]);
  return render().join("");
}

function render() {
  return cartItem.map((item) => {
    return `<div id="${item.id}" class="cart">
    <p id="cart-item" class="cart-item">${item.name}</p>
    <a id="remove-item" class="cart-remove">remove</a>
    <p id="cart-price" class="price">$${item.price}</p>
  </div>`;
  });
}

function renderTotal() {
  return `
  <hr class="width-508"/>  
  <div class="total-card">
    <p id="total-name" class="total-name">Total Price</p>
    <p class="price" id="price">$${cartItem.reduce((total, item) => {
      return total + item.price;
    }, 0)}</p>
  </div>
  <button class="purchase-btn">Complete order</button>`;
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
