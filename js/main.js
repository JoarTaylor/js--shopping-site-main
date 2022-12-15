const shop = document.getElementById('shop');
const cartAmountEl = document.querySelector('.cartAmount');
 
let basket = JSON.parse(localStorage.getItem("data")) || [];


// Produktdatat finns i variabeln shopData (se data.js)

console.log(shopData)

function generateShop() {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    
    let productList = shopData.map((product) => {
        const {id, title, price, description, image} = product;    
        let basket = JSON.parse(localStorage.getItem("data"));      
        let match;
        if(basket !== null) {
            match = basket.find(x => x.ind == id);
        }
        if(match !== undefined) {
        product.sumAdded = match.total
        } else {
            product.sumAdded = 0;
        }
        return `<div id=${id} class="item">
        <img width="220" src=${image} alt=""> 
       <div class="details">
           <h3>${title}</h3>
            <p>${description}</p>
           <div class="price-quantity">
           <h2>${price}</h2>
          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
             </div>
              <div id=${id} class="quantity">${product.sumAdded}</div>
             <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
         </div>
               </div>
           </div>
       </div>`
    })
    shop.innerHTML = productList.join('');
}

generateShop();
cartCount();

function cartCount() {
    basket = JSON.parse(localStorage.getItem("data")) || [];
    const totalItems = basket.reduce((sum, current) => {
       return sum + current.total;
    }, 0)
    cartAmountEl.textContent = totalItems;
}


// Om användaren klickar på + på produkten 
function increment(id) {
    addToCart(id);   
    cartCount();
}

 // Om användaren klickar på - på produkten 
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
    generateShop()
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
    generateShop()
}