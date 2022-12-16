let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []

const cartAmountEl = document.querySelector('.cartAmount');

function generateCartItems() {

    basket = JSON.parse(localStorage.getItem("data"));
    
    let basketArray = [];

    for (let i = 0; i < basket.length; i++) {
        basketArray.push(shopData[(basket[i].ind)-1]);
    }

    let cartList = basketArray.map(cartItem => {

        getTotal(cartItem.id);
        let partSum = Math.floor(totals * cartItem.price);

        return  ` <div class="cart-item">
        <img width="100" src=${cartItem.image} alt="" />
        <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
                <p>${cartItem.title}</p>
                <p class="cart-item-price"> ${cartItem.price}</p>
            </h4>
            <i onclick="deleteFromCart(${cartItem.id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${cartItem.id})" class="bi bi-dash-lg"></i>
                <div id=${cartItem.id} class="quantity">${totals}</div>
                <i onclick="increment(${cartItem.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3>${partSum} $</h3>
        </div>
        </div>` 
    })
  shoppingCart.innerHTML = cartList.join('');
}

toggleDeletebtn();

function toggleDeletebtn() {
    
let deleteAllBtn = document.createElement('button');
deleteAllBtn.textContent = 'Empty cart';
shoppingCart.before(deleteAllBtn)
deleteAllBtn.addEventListener('click', removeAll);
}


function removeAll() {
    basket = JSON.parse(localStorage.getItem("data"));
    basket = [];
    localStorage.setItem(('data'), JSON.stringify(basket));
    generateCartItems();
    cartCount();
}


cartCount();

function getTotal(id) {
    let basket = JSON.parse(localStorage.getItem("data"));      
        let match;
        if(basket !== null) {
            match = basket.find(x => x.ind == id);
        }
        if(match !== undefined) {
        totals = match.total
        } else {
            totals = 0;
        }
        return totals;
        
}

function deleteFromCart(id) {
    let index = basket.findIndex(x => x.ind == id);
    basket.splice(index, 1);
    localStorage.setItem(('data'), JSON.stringify(basket));
    generateCartItems();
    cartCount();
}

generateCartItems();

function increment(id) {
    addToCart(id);   
    cartCount();
}

function decrement(id) {
    removeFromCart(id);
    cartCount();
}

function addToCart(id) {
    let alreadyInBasket = basket.some(item => item.ind == id);
    if(alreadyInBasket) {
        let obj = basket.find(prod => prod.ind == id)
        obj.total++;
    } else {
    let basketItem = {
        'total': 1,
        'ind': id
    }
    basket.push(basketItem);
    }
    localStorage.setItem(('data'), JSON.stringify(basket));
    generateCartItems();
}

function removeFromCart(id) {
    let alreadyInBasket = basket.some(item => item.ind == id);
    if(alreadyInBasket) {
       let index = basket.findIndex(prod => prod.ind == id)
        basket[index].total--;
        if(basket[index].total == 0) {
            basket.splice(index, 1)
        }
    }  
    localStorage.setItem(('data'), JSON.stringify(basket));
    generateCartItems();
}

function cartCount() {
    basket = JSON.parse(localStorage.getItem("data")) || [];
    const totalItems = basket.reduce((sum, current) => {
       return sum + current.total;
    }, 0)
    cartAmountEl.textContent = totalItems;
}