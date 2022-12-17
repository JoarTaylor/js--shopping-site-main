const shop = document.getElementById('shop');
const cartAmountEl = document.querySelector('.cartAmount');
const categorysEl = document.querySelector('.categories');
 
let basket = JSON.parse(localStorage.getItem("data")) || [];


console.log(shopData)

let activeShopArray = [];

function generateShop(argArr = shopData) {
    
    let productList = argArr.map((product) => {
        const {id, title, price, description, image} = product;    
        
        getTotal(id);
        return `<div id=${id} class="item">
        <img width="220" src=${image} alt=""> 
       <div class="details">
           <h3>${title}</h3>
            <p>${description}</p>
           <div class="price-quantity">
           <h2>${price} $</h2>
          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
             </div>
              <div id=${id} class="quantity">${totals}</div>
             <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
         </div>
               </div>
           </div>
       </div>`
    })
    activeShopArray = argArr;
    shop.innerHTML = productList.join('');
}

generateShop();
cartCount();

filterByCategory()

function filterByCategory() {
/*     let categorySet = shopData.reduce((startArr, current) => {
    if(!startArr.includes(current.category)) {
        startArr.push(current.category)
    }
    return startArr
}, []) */

////eller detta sett
let categorySet = new Set(shopData.map(item => (item.category)));
console.log(categorySet)



categorySet.forEach(category => {
    let categoryBtn = document.createElement('button');
    categoryBtn.textContent = category;
    categorysEl.appendChild(categoryBtn)
    
    categoryBtn.addEventListener('click', () => {
        let filteredArr = shopData.filter(prod => prod.category == category)
        generateShop(filteredArr);
    })
})


}


function getTotal(id) {
    let basket = JSON.parse(localStorage.getItem("data"));      
        let match;
        if(basket !== null) {
            match = basket.find(x => x.ind == id);
        }
        if(match !== undefined) {
        totals = match.total;
        } else {
            totals = 0;
        }
        return totals;
}

function cartCount() {
    basket = JSON.parse(localStorage.getItem("data")) || [];
    const totalItems = basket.reduce((sum, current) => {
       return sum + current.total;
    }, 0)
    cartAmountEl.textContent = totalItems;
}

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
    //check if filtering and stay on filtered page
    generateShop(activeShopArray)
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
    //check if filtering and stay on filtered page
    generateShop(activeShopArray)
}