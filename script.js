const addToCart = (event) => {
  const id = event.target.getAttribute('data-id');
  const parent = event.target.parentElement;
  parent.classList.add('item-in-cart');
  parent.querySelector('.add-to-cart-quantity').value = 1;

  cart[id] = { quantity: 1 };
  updateMiniCart();
};

const cart = {};

const updateCart = (event) => {
  const parent = event.target.parentElement;
  const button = parent.querySelector('.add-to-cart');
  const id = button.getAttribute('data-id');

  if (event.target.value == 0) {
    // cart back to 0
    delete cart[id];
    parent.classList.remove('item-in-cart');
  } else if (cart[id]) {
    cart[id].quantity = event.target.value;
  }

  updateMiniCart();
};

const updateMiniCart = () => {
  const miniCartCounter = document.querySelector('#cartCounter');
  let cartTotal = 0;

  for (const cartItem in cart) {
    console.log(cartItem);
    cartTotal += Number(cart[cartItem].quantity);
  }
  miniCartCounter.innerText = cartTotal;
};

const renderProducts = (products) => {
  for (const item in products) {
    const productTile = document.createElement('div');

    productTile.classList.add('product-box');

    productTile.innerHTML = `<h3>${products[item]['productName']}</h3>

      <img src="${products[item]['image']}" />

      <p class="text-desc">${products[item]['shortDescription']}</p>
      
      <p class="text-price">$${products[item]['price']}</p>
      

      <section class="modal hidden">

        <div class="flex-close">

          <button class="btn-close">⨉</button>

        </div>

        <div>

          <h3>${products[item]['productName']}</h3>
          <h3>${products[item]['author']}</h3>

          <img src="${products[item]['image']}" />

          <p>${products[item]['longDescription']}</p>

        </div>
        <p class="stock-info"><b>${products[item]['stock']}</b></p>
        <p class="text-price">$${products[item]['price']}</p>

        
      </section>
      <button class="btn-detail btn-open">View more</button>
      <button onclick="addToCart(event)" class="add-to-cart" data-id="${item}">Add to cart</button>

      <input class="add-to-cart-quantity" type="number" min="0" onchange="updateCart(event)" value="1"/>`;

    const productsInfo = document.querySelector('#productInfo');

    productsInfo.appendChild(productTile);
  }

  const productBoxes = document.querySelectorAll('.product-box');

  productBoxes.forEach((box) => {
    const modal = box.querySelector('.modal');

    const openModalBtn = box.querySelector('.btn-open');

    const closeModalBtn = box.querySelector('.btn-close');

    // Open

    const openModal = function () {
      modal.classList.remove('hidden');
    };

    // Close

    const closeModal = function () {
      modal.classList.add('hidden');
    };

    // Event listeners

    openModalBtn.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', closeModal);
  });
};

fetch('products.json')
  .then((response) => response.json())
  .then((res) => res['products'])
  .then((products) => renderProducts(products));
