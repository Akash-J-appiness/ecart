let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Laptop',
        tag: "laptops",
        price: 1000,
        inCart: 0
    }, {
        name: 'Iphone',
        tag: "iphone",
        price: 400,
        inCart: 0
    }, {
        name: 'HeadPhone',
        tag: "headphone",
        price: 50,
        inCart: 0
    }, {
        name: 'Smart Watch',
        tag: 'swatch',
        price: 200,
        inCart: 0
    }
];


function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (!productNumbers) {
        // If no items in cart, set cart span to 0
        document.querySelector('.nav-link span').textContent = '0';
    } else {
        document.querySelector('.nav-link span').textContent = productNumbers;
    }
}

function removeFromCart(tag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems[tag]) {
        let item = cartItems[tag];
        let totalCost = localStorage.getItem('totalCost');
        let cartCount = localStorage.getItem('cartNumbers');

        // Update total cost and cart count
        totalCost = parseInt(totalCost);
        cartCount = parseInt(cartCount);
        localStorage.setItem('totalCost', totalCost - (item.price * item.inCart));
        localStorage.setItem('cartNumbers', cartCount - item.inCart);

        // Remove item from cart
        delete cartItems[tag];
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));

        // Update cart span
        let cartSpan = document.querySelector('.nav-link span');
        let remainingItems = parseInt(cartSpan.textContent) - item.inCart; // Calculate remaining items
        if (remainingItems > 0) {
            cartSpan.textContent = remainingItems;
        } else {
            // If no items are remaining, set cart span to 0
            cartSpan.textContent = '0';
        }
    }
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems))
}



function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class="product">
                <img class="widths" src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
                <div class="price1"> &#8377 ${item.price}.00</div>
                <div class="quantity1">
                    <button class="quantity-btn minus" data-tag="${item.tag}">-</button>
                    <span>${item.inCart}</span>
                    <button class="quantity-btn plus" data-tag="${item.tag}">+</button>
                </div>
                <div class="total1"> &#8377 ${item.inCart * item.price}.00</div>
                <button class="delete-item" data-tag="${item.tag}">Delete</button>
            </div>`;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal"> &#8377 ${cartCost}.00</h4>
        </div>`;

        // Add event listener for delete buttons
        let deleteButtons = document.querySelectorAll('.delete-item');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                let tag = button.getAttribute('data-tag');
                removeFromCart(tag);
                displayCart(); // Refresh the cart display after deletion
            });
        });

        // Add event listeners for quantity buttons
        let quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                let tag = button.getAttribute('data-tag');
                if (button.classList.contains('plus')) {
                    addToCart(tag);
                } else if (button.classList.contains('minus')) {
                    removeFromCart(tag);
                }
                displayCart(); // Refresh the cart display after quantity change
            });
        });
    }
}

// Function to add one item to cart
function addToCart(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    cartItems[tag].inCart += 1;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartTotal();
}

// Function to remove one item from cart
function removeFromCart(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems[tag].inCart > 1) {
        cartItems[tag].inCart -= 1;
    } else {
        delete cartItems[tag];
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartTotal();
}

// Function to update the total cost displayed in the cart
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalCost = 0;
    Object.values(cartItems).forEach(item => {
        totalCost += item.price * item.inCart;
    });
    localStorage.setItem('totalCost', totalCost);
}


// Function to remove item from cart
// Function to remove one item from cart
function removeFromCart(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems[tag].inCart > 1) {
        cartItems[tag].inCart -= 1;
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        updateCartTotal();
    } else {
        // If only one item is in cart, remove it completely
        delete cartItems[tag];
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        updateCartTotal();
        displayCart(); // Refresh the cart display after deletion
    }
}




onLoadCartNumbers()
displayCart()

// Function to add one item to cart
function addToCart(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    cartItems[tag].inCart += 1;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartTotal();
    updateCartCount(1); // Increase cart count by 1
}

// Function to remove one item from cart
function removeFromCart(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems[tag].inCart > 1) {
        cartItems[tag].inCart -= 1;
    } else {
        delete cartItems[tag];
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartTotal();
    updateCartCount(-1); // Decrease cart count by 1
}

// Function to update the total cost displayed in the cart
function updateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalCost = 0;
    Object.values(cartItems).forEach(item => {
        totalCost += item.price * item.inCart;
    });
    localStorage.setItem('totalCost', totalCost);
}

// Function to update the cart count
function updateCartCount(change) {
    let cartCount = localStorage.getItem('cartNumbers');
    cartCount = parseInt(cartCount) || 0;
    localStorage.setItem('cartNumbers', cartCount + change);

    // Update displayed cart count
    document.querySelector('.nav-link span').textContent = cartCount + change;
}
