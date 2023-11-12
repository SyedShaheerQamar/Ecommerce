let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeButton = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeButton.length; i++) {
    var button = removeButton[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInput = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementById("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  var pro = buttonClicked.parentElement;
  var t = pro.getElementsByClassName("cart-product-title")[0].innerText;
  var check = sessionStorage.getItem("title");
  if (check === t) {
    sessionStorage.removeItem("title");
    sessionStorage.removeItem("price");
    sessionStorage.removeItem("img");
  }
  buttonClicked.parentElement.remove();
  removeFromCart(t);
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updatetotal();
}

function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var shopImg = shopProduct.parentElement;
  var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  var price = shopProduct.getElementsByClassName("product-price")[0].innerText;
  var porductImg = shopImg.getElementsByClassName("product-img")[0].src;
  cart.classList.add("active");
  addProductToCart(title, price, porductImg);
  updatetotal();
}

function addProductToCart(title, price, porductImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = document.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already add this item to cart!!!");
      return;
    }
  }

  var cartContentBox = `
    <img src="${porductImg}" class="w-75" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa fa-trash-o cart-remove"></i>
    `;

  cartShopBox.innerHTML = cartContentBox;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;

    let t = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
    let p = cartBox.getElementsByClassName("cart-price")[0].innerText;

    // addtocart(t, p, quantity);
  }

  if (cartBoxes.length == 0) {
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    document.getElementsByClassName("totalQuan")[0].innerText = 0;
  } else {
    document.getElementsByClassName("totalQuan")[0].innerText =
      cartBoxes.length;
  }
}

// localStorage.clear();

function addtocart(t, p, q) {
  //   debugger;
  let temp = [];
  temp = localStorage.getItem("ItemList")
    ? JSON.parse(localStorage.getItem("ItemList"))
    : [];
  const existingItemIndex = temp.findIndex((item) => item.name === t);
  if (existingItemIndex !== -1) {
    // temp[existingItemIndex].quantity += q;
    let val = parseInt(temp[existingItemIndex].quantity);
    let val2 = parseInt(q);
    let total = 0 + val2;
    temp[existingItemIndex].quantity = total;
  } else {
    temp.push({
      name: t,
      price: p,
      quantity: q,
    });
  }
  localStorage.setItem("ItemList", JSON.stringify(temp));
  //   localStorage.clear();
}

function removeFromCart(t) {
  let temp = [];
  temp = localStorage.getItem("ItemList")
    ? JSON.parse(localStorage.getItem("ItemList"))
    : [];
  const existingItemIndex = temp.findIndex((item) => item.name === t);
  if (existingItemIndex !== -1) {
    temp.splice(existingItemIndex, 1);
  }
  localStorage.setItem("ItemList", JSON.stringify(temp));
}
