let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []


// Produktdatat finns i variabeln shopData (se data.js)


function generateCartItems() {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()

    let filteredShopData = shopData.filter
    
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    let total = 1;
    let cartList = shopData.map(cartItem => {
        return  ` <div class="cart-item">
        <img width="100" src=${cartItem.image} alt="" />
        <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
                <p>${cartItem.title}</p>
                <p class="cart-item-price"> ${cartItem.price}</p>
            </h4>
            <i onclick="removeItem(${cartItem.id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${cartItem.id})" class="bi bi-dash-lg"></i>
                <div id=${cartItem.id} class="quantity">${total}</div>
                <i onclick="increment(${cartItem.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3> {${total} * ${cartItem.price}}</h3>
        </div>
        </div>` 
    })
  shoppingCart.innerHTML = cartList.join('');
}

generateCartItems();
