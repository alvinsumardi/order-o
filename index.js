import { menuArray } from "./data.js";

let orderArray = []

let orderTotal = 0

document.addEventListener ('click', function(e) {
    console.log(e)
    if(e.target.dataset.menuId){
        handleAddClick(e.target.dataset.menuId)
    }
    
    else if(e.target.dataset.orderItemId){
        handleRemoveClick(e.target.dataset.orderItemId)
    }

    else if(e.target.id == 'complete-order'){
        handleCompleteOrder()
    }
    else if(e.target.id == 'field-card-pay'){
        preventDefaultFunction(e)
        handleFieldCardPay()

    }
})

function handleAddClick(menuId) {
    const targetAddObj = menuArray.filter(function(menuItem){
        return menuItem.id == menuId
    })[0]

        orderArray.unshift({
            name: targetAddObj.name,
            price: targetAddObj.price,
            id: randomNumber()
        })
    renderOrder()

    orderTotal += targetAddObj.price

    document.getElementById('total-price').textContent = `$${orderTotal}`

    
}

function handleRemoveClick(orderItemId){
    console.log(orderItemId)
    orderArray.filter(function(targetRemoveOrder, index){
        if(targetRemoveOrder.id == orderItemId){
            orderArray.splice(index, 1)
        }
    })

    renderOrder()

}

function handleCompleteOrder(){
    document.getElementById('payment-popup').classList.toggle('setting-hide')
}

function handleFieldCardPay(){
    document.getElementById('payment-popup').classList.toggle('setting-hide')
    document.getElementById('order-section').innerHTML = `<div class="success-message">
            Thanks, James! Your order is on its way!
        </div>`
}

function randomNumber(){
    return Math.floor(Math.random()*999999999999)
}

function preventDefaultFunction(e){
    e.preventDefault()
}


function renderMenu() {
    let menuHtml = ''

    menuArray.forEach(function(menu) {
        let ingredientList = ''

        menu.ingredients.forEach(function(ingredient) {
            if (!ingredientList){
                ingredientList += ingredient
            } else {
                ingredientList += `, ${ingredient}`
                
            }
            

        })


        menuHtml += `<article class="item">
            <div>${menu.emoji}</div>
            <div>
                <h3>${menu.name}</h3>
                <p class="subtitle">${ingredientList}</p>
                <p class="price">$${menu.price}</p>
            </div>
            <div><a href="#" data-menu-id="${menu.id}">+</a></div>

        </article>`

    })


    document.getElementById('item-list').innerHTML = menuHtml
}

function renderOrder() {
    let orderHtml = ''

    orderArray.forEach(function(orderItem) {
        orderHtml += `<div class="order-item">
            <h3 data-order-item-id="${orderItem.id}">${orderItem.name}</h3>
            <p class="price">$${orderItem.price}</p>
        </div>
        `
    })

    document.getElementById('order-list').innerHTML = orderHtml


    if(orderArray.length){
        document.getElementById('order-section').classList.remove('setting-hide')
    } else {
        document.getElementById('order-section').classList.add('setting-hide')

    }
    

}


renderMenu()
renderOrder()