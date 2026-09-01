document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Display products
  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;

    productList.appendChild(productDiv);
  });

  // Add product to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));

      const product = products.find((p) => p.id === productId);

      addToCart(product);
    }
  });

  // Add product
  function addToCart(product) {
    if (product) {
      cart.push(product);
      renderCart();
    }
  }

  // Display cart
  function renderCart() {
    // Clear previous cart items
    cartItems.innerHTML = "";

    let totalPrice = 0;

    if (cart.length > 0) {
      // Show total section
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      // Cart is empty
      cartItems.appendChild(emptyCartMessage);

      cartTotalMessage.classList.add("hidden");

      totalPriceDisplay.textContent = "$0.00";
    }
  }

  // Checkout
  checkOutBtn.addEventListener("click", function () {
    cart.length = 0;

    alert("Checkout successfully");

    renderCart();
  });
});
