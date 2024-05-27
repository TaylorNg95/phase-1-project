// Global variables

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let drinksArray = []
let ingredientsArray = []
let userIngredients = []

const btnContainer = document.querySelector('#btn-container')
const cardsContainer = document.querySelector('.row')

// Get all drink objects loaded into global variable drinksArray

document.addEventListener('DOMContentLoaded', function(){
    fetchAllDrinks('a')
})

function fetchAllDrinks(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            populateDrinksArray(data)
        }
    )
}

function populateDrinksArray(data){
    if(data.drinks !== null){
        drinksArray = drinksArray.concat(data.drinks) // Contactenate drinksArray with drinks for each letter
    }
    if(counter < 25){
        const newLetter = alphabet[counter + 1]
        if(newLetter !== undefined){
            fetchAllDrinks(newLetter) // Utilize recursion to continue fetching data A-Z
        }
        counter++
    } else {
        drinksArray.forEach(drink => {
            extractIngredients(drink) // Once drinksArray fully loaded, extract ingredients from each drink object
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

// There are a maximum of 15 ingredients per drink. Extract these are variables and create an ingredients Obj
// for each drink.

function extractIngredients(drink){
    const {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15} = drink
    const ingredientsObj = {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15}
    Object.keys(ingredientsObj).forEach(ingredient => {
        if(!ingredientsObj[ingredient]){
            delete ingredientsObj[ingredient]
        }
    }) // TBD: CHANGE TO FILTER FN - FILTER OUT WHERE THERE ARE NULL VALUES SINCE MOST DON'T HAVE 15 INGREDIENTS
    const drinkIngredientsArray = Object.values(ingredientsObj)
    drinkIngredientsArray.forEach(ingredient => {
        const foundValue = ingredientsArray.find(item => item.toLowerCase() === ingredient.toLowerCase())
        if (!foundValue) {
            ingredientsArray.push(ingredient)
        }
    })
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
    document.querySelector('#drinks-container').classList.remove('hidden')
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
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const img = document.createElement('img')
    const div3 = document.createElement('div')
    const p1 = document.createElement('p')
    const btn = document.createElement('btn')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')

    div1.className = 'col-4'
    div2.className = 'card'
    div2.style.width = '18rem'
    img.className = 'card-img-top'
    img.src = drink.strDrinkThumb
    div3.className = 'card-body'
    p1.className = 'card-text'
    p1.textContent = drink.strDrink
    btn.className = 'more-info-btn'
    btn.textContent = 'More Info'
    p2.className = 'card-text hidden'
    p2.textContent = `Ingredients:${ingArray}`
    p3.className = 'card-text hidden'
    p3.textContent = `Instructions: ${drink.strInstructions}`
    btn.addEventListener('click', () => {
      p2.classList.remove('hidden')
      p3.classList.remove('hidden')  
    })

    p1.append(btn)
    div3.append(p1, p2, p3)
    div2.append(img, div3)
    div1.append(div2)
    cardsContainer.appendChild(div1)
}