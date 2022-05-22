let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Octopus',
        tag: "Octopus1",
        price: 499,
        inCart: 0
    }, {
        name: 'Elephant',
        tag: "elephant",
        price: 699,
        inCart: 0
    }, {
        name: 'Teddy',
        tag: "download",
        price: 599,
        inCart: 0
    }, {
        name: 'Panda',
        tag: 'panda1',
        price: 899,
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

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
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
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost')

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class="product">
            
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            <div class="price"> &#8377 ${item.price}.00</div>
            <div class="quantity">
           
            <span>${item.inCart}</span>
            
            </div>
            <div class="total"> &#8377 ${item.inCart * item.price}.00</div>
            </div>`
        })
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket Total  </h4>
        <h4 class="basketTotal"> &#8377 ${cartCost}.00</h4>
        </div>`

    }
    // <ion-icon name="caret-back-circle-outline"></ion-icon>
    // <ion-icon name="caret-forward-circle-outline"></ion-icon>
    // <ion-icon name="close-circle-outline"></ion-icon>
}


onLoadCartNumbers()
displayCart()