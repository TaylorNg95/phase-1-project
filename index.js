const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let drinksArray = []
let ingredientsArray = []
let userIngredients = []

const btnContainer = document.querySelector('#btn-container')
const drinksContainer = document.querySelector('#drinks-container')

document.addEventListener('DOMContentLoaded', function(){
    fetchAllDrinks('a')
})

function fetchAllDrinks(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            populateDrinksArray(data)
            /* console.log(ingredientsArray) */ // WHY DOES THIS GET LOGGED EVERY TIME??
        }
    )
}

function populateDrinksArray(data){
    if(data.drinks !== null){
        drinksArray = drinksArray.concat(data.drinks)
    }
    if(counter < 25){
        const newLetter = alphabet[counter + 1]
        if(newLetter !== undefined){
            fetchAllDrinks(newLetter)
        }
        counter++
    } else {
        drinksArray.forEach(drink => {
            keepIngredients(drink)
        })
    }
    ingredientsArray.sort()
    ingredientsArray.forEach(ingredient => {
        renderIngredient(ingredient)
    })
}

/* The data.drinks !== null has to come first so that the Z drinks are loaded into the array. But then when
counter < 25 condition is tested, it does not pass, which means that there are no more fetches made. This
avoids a fetch call to undefined. REVIEW THIS  */

function keepIngredients(drink){
    const {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15} = drink
    const ingredientsObj = {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15}
    Object.keys(ingredientsObj).forEach(ingredient => {
        if(!ingredientsObj[ingredient]){
            delete ingredientsObj[ingredient]
        }
    })
    const ingredientsArray = Object.values(ingredientsObj)
    ingredientsArray.forEach(ingredient => {
        udpateIngredientsArray(ingredient)
    })
}

function udpateIngredientsArray(ingredient){
    const foundValue = ingredientsArray.find(item => item.toLowerCase() === ingredient.toLowerCase())
    if (!foundValue) {
        ingredientsArray.push(ingredient)
    }
}

function renderIngredient(ingredient){
    const btn = document.createElement('button')
    btn.dataset.name = ingredient
    btn.textContent = ingredient
    addEvents(btn)
    btnContainer.appendChild(btn)
}

function addEvents(btn){
    btn.addEventListener('mouseover', function(){
        this.style.color = '#ffffff';
        this.style.backgroundColor = '#0d6efd';
    })
    btn.addEventListener('mouseout', function(){
        if(!this.classList.contains('selected')){
            this.style.color = '#0d6efd';
            this.style.backgroundColor = '#ffffff';
        }
    })
    btn.addEventListener('click', function(event){
        this.classList.toggle('selected')
        if(this.classList.contains('selected')){
            userIngredients.push(this.dataset.name)
        } else {
            const savedIngredient = userIngredients.indexOf(this.dataset.name)
            delete userIngredients[savedIngredient] // probably revise this so it doesn't return empty
        }

    })
}

document.querySelector('#make-me-drinks').addEventListener('click', function(){
    this.classList.add('hidden')
    btnContainer.classList.add('hidden')
    drinksContainer.classList.remove('hidden')
    generateDrinkMatches()
})

function generateDrinkMatches(){
    userIngredients = userIngredients.filter(element => element !== null)
    drinksArray.forEach(drink => {
        let status = true
        let counter = 1
        let drinkKey = 'strIngredient1'
        let ingArray = []
        while(counter <= 15 && drink[drinkKey] !== null){
            ingArray.push(drink[drinkKey])
            counter++
            drinkKey = `strIngredient${counter}`
        }
        debugger
        ingArray.forEach(ing => {
            const search = userIngredients.find(userIng => userIng.toLowerCase() === ing.toLowerCase())
            if(search === undefined){
                status = false
            }
        })
        if(status === true){
            ingArray = ingArray.map(ing => ' ' + ing)
            renderDrink(drink, ingArray)
        }
    })
}

function renderDrink(drink, ingArray){
    console.log(drink.strDrink)
    const div = document.createElement('div')
    div.className = 'col-4'
    const cardHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${drink.strDrinkThumb}>
            <div class="card-body">
                <p class="card-text">${drink.strDrink}<button class='more-info-btn'>More Info</button></p>
                <p class="card-text">Ingredients:${ingArray}</p>
                <p class="card-text">Instructions: ${drink.strInstructions}</p>
            </div>
        </div>
    `
    div.innerHTML = cardHTML
    document.querySelector('.row').appendChild(div)
}