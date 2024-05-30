// Global variables

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let allDrinksArray = []
let allIngredientsArray = []

const btnContainer = document.querySelector('#btn-container')
const cardsContainer = document.querySelector('#cards-container')

const makeDrinksBtn = document.querySelector('#make-drinks')
const editIngredientsBtn = document.querySelector('#edit-ingredients')
const selectAllBtn = document.querySelector('#select-all')

// Get all drink objects loaded into global variable allDrinksArray

fetchAllDrinks('a')

function fetchAllDrinks(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            populateAllDrinksArray(data)
        }
    )
}

function populateAllDrinksArray(data){
    if(data.drinks !== null){
        allDrinksArray = allDrinksArray.concat(data.drinks) // Contactenate allDrinksArray with drinks for each letter
    }
    if(counter < 25){
        const newLetter = alphabet[counter + 1]
        if(newLetter !== undefined){
            fetchAllDrinks(newLetter) // Utilize recursion to continue fetching data A-Z
        }
        counter++
    } else {
        allDrinksArray.forEach(drink => {
            extractIngredients(drink) // Once allDrinksArray fully loaded, extract ingredients from each drink object
        })
        renderIngredients()
    }
}

// Max of 15 ingredients per drink. Extract these as variables and create an ingredients Obj for each drink.

function extractIngredients(drink){
    const {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15} = drink
    const drinkIngredientsObj = {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15}
    const drinkIngredientsArray = Object.values(drinkIngredientsObj).filter(element => element !== null && element !== '')
    drinkIngredientsArray.forEach(ingredient => {
        const foundValue = allIngredientsArray.find(item => item.toLowerCase() === ingredient.toLowerCase())
        if (!foundValue) {
            allIngredientsArray.push(ingredient)
        } // Check if the each ingredient is already in global allIngredientsArray, and add if there's no match, push the ingredient
    })
}

function renderIngredients(){
    allIngredientsArray = allIngredientsArray.map(element => element[0].toUpperCase() + element.slice(1)) // Capitalize first letter to account for lowercase affecting alphabet sorting
    allIngredientsArray.sort() // Placed into alphabet order for easier user experience.
    allIngredientsArray.forEach(ingredient => {
        renderIngredient(ingredient)
    })
}

function renderIngredient(ingredient){
    const btn = document.createElement('button')
    btn.dataset.name = ingredient // These are unique names, so can be unique identifiers
    btn.textContent = ingredient
    addEvents(btn) // There are multiple events attached to the button, so easier to separate function
    btnContainer.appendChild(btn)
}

function addEvents(btn){
    btn.addEventListener('mouseover', function(){
        this.classList.add('hovered')
    })
    btn.addEventListener('mouseout', function(){
        if(!this.classList.contains('selected')){
            this.classList.remove('hovered')
        }
    })
    btn.addEventListener('click', function(){
        this.classList.toggle('selected')
    })
}

// Handle when a user submits the ingredients they have available, and find / render drink matches

makeDrinksBtn.addEventListener('click', function(e){
    document.documentElement.scrollTop = 0; // TBD: can adjust so user does not see scroll
    toggleClass(editIngredientsBtn)
    togglePageDisplay(e)
    clearCardsContainer() // Relevant if the user has edited ingredients - we need to clear the container and re-render
    generateDrinkMatches()
})

function clearCardsContainer(){
    cardsContainer.innerHTML = ''
}

editIngredientsBtn.addEventListener('click', function(e){
    toggleClass(makeDrinksBtn)
    togglePageDisplay(e)
})

function togglePageDisplay(e){
    toggleClass(e.target)
    const h1 = document.querySelector('h1')
    h1.textContent === 'Try Some of These Cocktails!' ? h1.textContent = 'Want A Cocktail, But Don\'t Know What To Make?\nLet Us Help You!' : h1.textContent = 'Try Some of These Cocktails!'
    toggleClass(document.querySelector('h2'))
    toggleClass(btnContainer)
    toggleClass(document.querySelector('#drinks-container'))
    toggleClass(selectAllBtn)
}

function toggleClass(element){
    element.classList.contains('hidden') ? element.classList.remove('hidden') : element.classList.add('hidden')
}

function generateDrinkMatches(){
    const userIngredients = Array.from(document.querySelectorAll('.selected')).map(element => element.dataset.name)
    allDrinksArray.forEach(drink => {
        let status = true
        let counter = 1
        let drinkIngKey = 'strIngredient1'
        let drinkMeasKey = 'strMeasure1'
        let drinkIngArray = []
        let drinkMeasArray = []
        // Extract the ingredients and measurements for a single drink
        while(counter <= 15 && drink[drinkIngKey] !== null){
            drinkIngArray.push(drink[drinkIngKey])
            drinkMeasArray.push(drink[drinkMeasKey])
            counter++
            drinkIngKey = `strIngredient${counter}`
            drinkMeasKey = `strMeasure${counter}`
        }
        // See if each ingredient can be found in userIngredients - if yes, render the drink
        drinkIngArray.forEach(ing => {
            const search = userIngredients.find(userIng => userIng === ing)
            if(search === undefined){
                status = false
            }
        })
        if(status === true){
            drinkIngArray = drinkIngArray.map(element => ' ' + element) // Adjust for spacing
            drinkMeasArray = drinkMeasArray.map(element => ' ' + element)
            renderDrink(drink, drinkIngArray, drinkMeasArray)
        }
    })
}

function renderDrink(drink, drinkIngArray, drinkMeasArray){
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const img = document.createElement('img')
    const div3 = document.createElement('div')
    const p1 = document.createElement('p')
    const btn = document.createElement('btn')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const p4 = document.createElement('p')

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
    p2.className = 'card-text'
    p2.textContent = `Ingredients:${drinkIngArray}`
    p3.className = 'card-text hidden'
    p3.textContent = `Measurements: ${drinkMeasArray}`
    p4.className = 'card-text hidden'
    p4.textContent = `Instructions: ${drink.strInstructions}`
    btn.addEventListener('click', () => {
      p3.classList.toggle('hidden')
      p4.classList.toggle('hidden')  
    })

    p1.append(btn)
    div3.append(p1, p2, p3, p4)
    div2.append(img, div3)
    div1.append(div2)
    cardsContainer.appendChild(div1)
}

selectAllBtn.addEventListener('click', function(e){
    const buttons = document.querySelectorAll('#btn-container button') 
    this.textContent = this.textContent === 'Select All' ? 'Unselect All' : 'Select All'
    buttons.forEach(btn => {
        this.textContent === 'Select All' ? btn.classList.remove('selected', 'hovered') : btn.classList.add('selected', 'hovered')
    })
})