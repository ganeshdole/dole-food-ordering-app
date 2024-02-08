import { menuArray } from "./data.js";
const container = document.getElementById("container");

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
