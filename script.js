let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

function getCartItems() {
  fetch("http://localhost:3000/product", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let cartItemInsert = document.getElementById("cart-items");
      let row = "";

      for (let i = 0; i < response.length; i++) {
        let tr = `
          <div class="col mx-5 mx-md-0">
             <img src="${response[i].img}" class="d-block bg-transparent image1" height="150px" alt="">
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star"></span><br><br>
             <a href="product.html" class="mt-4 fw-bold myprod" onclick="saveId(${response[i].id})">${response[i].title}</a>
             <p class="text-primary">$${response[i].price}</p>
          </div>
          `;

        // <div class="col">
        //   <img src="images/3DVR.jpg" class="d-block bg-transparent image1" height="150px" alt="">
        //   <span class="fa fa-star checked"></span>
        //   <span class="fa fa-star checked"></span>
        //   <span class="fa fa-star checked"></span>
        //   <span class="fa fa-star checked"></span>
        //   <span class="fa fa-star"></span><br><br>
        //   <a href="product.html" class="mt-4 fw-bold myprod">3D Glass</a>
        //   <p class="text-primary"><s class="text-secondary">$640.00</s>$540.00</p>
        // </div>

        row += tr;
      }

      cartItemInsert.innerHTML = row;
    });
}

function saveId(id) {
  // console.log(id);
  // localStorage.clear();
  localStorage.setItem("ID", id);
}

function getProductData() {
  let id = localStorage.getItem("ID");

  fetch("http://localhost:3000/product/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // debugger;
      let cart = document.getElementById("cart-page-item");

      let tr = `
        <div class="col-lg-5 col-md-12 col-sm-12">
            <img src="${response.img}" class="w-100 img-fluid pb-1" height="50%" id="MainImg" alt="">
  
            <div class="small-img-group">
                <div class="small-img-col">
                    <img src="${response.img}" width="100%" class="small-img product-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${response.img2}" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${response.img3}" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="${response.img4}" width="100%" class="small-img" alt="">
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
            <h3 class="my-5 product-title">${response.title}</h3>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            (1 customer review)
            <p class="mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In eaque nihil quasi ipsam, magnam minima! Eveniet pariatur dolor magni voluptatum accusamus omnis qui sequi eum repellendus. Itaque, culpa. Iste non nihil magni odit suscipit id culpa vitae, sapiente, natus ipsa debitis, similique fugit fugiat ut itaque quidem atque tempora nobis?
            </p>
            <p class="text-primary mt-5 ms-1 fs-4 product-price">
                $${response.price}
            </p>
            <button class="btn btn-outline-success mybg1 border-0 px-4 py-2 add-cart">
                Add to cart
            </button>
      </div>
        `;

      cart.innerHTML = tr;
      getOnLoad();
      //   localStorage.clear();
    });
}

function getData() {
  fetch("http://localhost:3000/cart", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      debugger;
      //   var cartItemNames = document.getElementsByClassName("cart-product-title");

      //   // Iterate through the items in the response
      //   for (var i = 0; i < response.length; i++) {
      //     var itemTitle = response[i].title;

      //     // Check if the item title is already in the cart
      //     var itemAlreadyInCart = false;
      //     for (var j = 0; j < cartItemNames.length; j++) {
      //       if (cartItemNames[j].innerText === itemTitle) {
      //         itemAlreadyInCart = true;
      //         break; // No need to continue searching
      //       }
      //     }

      //     if (itemAlreadyInCart) {
      //       alert("You have already added this item to the cart!!!");
      //       return; // Exit the loop if the item is already in the cart
      //     }
      //   }
      //   var cartItems = document.getElementsByClassName("cart-content")[0];

      var cartItems = document.getElementsByClassName("cart-content")[0];
      var cartItemNames = document.getElementsByClassName("cart-product-title");

      for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == response[i].title) {
          alert("You have already added this item to the cart!!!");
          return;
        }
      }

      for (let i = 0; i < response.length; i++) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");

        var cartContentBox = `
                        <img src="${response[i].img}" class="w-75" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${response[i].title}</div>
                            <div class="cart-price">${response[i].price}</div>
                            <input type="number" value="${response[i].quantity}" class="cart-quantity">
                        </div>
                        <i class="fa fa-trash-o cart-remove"></i>
                    `;

        cartShopBox.innerHTML = cartContentBox;
        cartItems.append(cartShopBox);

        var removeButton = cartShopBox.querySelector(".cart-remove");
        var quantityInput = cartShopBox.querySelector(".cart-quantity");

        removeButton.addEventListener("click", removeCartItem);
        quantityInput.addEventListener("change", quantityChanged);
        updatetotal();
      }
    });
}

function getOnLoad() {
  //   debugger;
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

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

function removeCartItem(event) {
  //   debugger;
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
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
  //   debugger;
  var button = event.target;
  var shopProduct = button.parentElement;
  var shopImg = shopProduct.parentElement;
  var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  var price = shopProduct.getElementsByClassName("product-price")[0].innerText;
  var porductImg = shopImg.getElementsByClassName("product-img")[0].src;
  cart.classList.add("active");
  addProductToCart(title, price, porductImg);
  //   updatetotal();
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
  updatetotal();
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

    getFromProduct(quantity);
  }

  if (cartBoxes.length == 0) {
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    document.getElementsByClassName("totalQuan")[0].innerText = 0;
  } else {
    document.getElementsByClassName("totalQuan")[0].innerText =
      cartBoxes.length;
  }
}

function getFromProduct(quantity) {
  let id = localStorage.getItem("ID");

  fetch("http://localhost:3000/product/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      addToCartItem(response, quantity);
    });
}

function addToCartItem(res, quan) {
  //   debugger;
  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: res.id,
      title: res.title,
      price: res.price,
      img: res.img,
      quantity: quan,
    }),
  });
  //   .then(() => getTodos());
}
