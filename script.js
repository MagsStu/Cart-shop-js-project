const addToCart = (event) => {
  const id = event.target.getAttribute('data-id');
  const parent = event.target.parentElement;
  parent.classList.add('num-in-cart');
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
    parent.classList.remove('num-in-cart');
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

          <button class="btn-close">&#120;</button>

        </div>

        <div>

          <h3>${products[item]['productName']}</h3>
          <h3>by ${products[item]['author']}</h3>

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

    const openModal = function () {
      modal.classList.remove('hidden');
    };

    const closeModal = function () {
      modal.classList.add('hidden');
    };

    openModalBtn.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', closeModal);
  });
};

fetch('products.json')
  .then((response) => response.json())
  .then((res) => res['products'])
  .then((products) => renderProducts(products));

// Slider mechanics

let slideNum = 1;
showSlides(slideNum);

function currentSlide(n) {
  showSlides((slideNum = n));
}

function changeSlides(n) {
  showSlides((slideNum += n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('specSlides');
  let dots = document.getElementsByClassName('dots');
  if (n > slides.length) {
    slideNum = 1;
  }
  if (n < 1) {
    slideNum = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideNum - 1].style.display = 'block';
  dots[slideNum - 1].className += ' active';
}

function search() {
  let filter = document.getElementById('search').value.toUpperCase();
  let item = document.querySelectorAll('.product-box');
  let l = document.getElementsByTagName('h3');
  for (let i = 0; i <= l.length; i++) {
    let a = item[i].getElementsByTagName('h3')[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      item[i].style.display = '';
    } else {
      item[i].style.display = 'none';
    }
  }
}
