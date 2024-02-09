import { menuArray } from "./data.js";
const container = document.getElementById("container");
const shoppingCart = document.getElementById("shopping-cart");
let count = 0;
document.addEventListener("click", (event) => {
  if (event.target.id == "add-item") {
    renderShoppingCart(event.target.parentElement.id);
  }
});

function renderShoppingCart(id) {
  count++;
  if (count == 0) {
    shoppingCart.innerHTML += addItemToCart(id);
    shoppingCart.innerHTML += `<hr />
    <div class="total-card">
      <p id="total-name" class="total-name">Total Price</p>
      <p class="price" id="price">$12</p>
    </div>
    <button class="purchase-btn">Complete order</button>`;
  } else {
    shoppingCart.innerHTML += addItemToCart(id);
  }
}
function addItemToCart(id) {
  return ` <p class="title">Your Order</p>
    <div id="cart" class="cart">
      <p id="cart-item" class="cart-item">Pizza</p>
      <a id="cart-remove" class="cart-remove">remove</a>
      <p id="cart-price" class="price">$14</p>
    </div>
    `;
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
