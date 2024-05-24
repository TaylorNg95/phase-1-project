const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let drinksArray = []
let ingredientsArray = []

/* document.addEventListener('DOMContentLoaded', function(){
    fetchAllDrinks('a')
})

function fetchAllDrinks(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
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
                renderAllDrinks(drinksArray)
            }
        }
    )
}

Line 21  becomes relevant at the last array - we want to increment NewLetter so that we can make
a recursive function call, but when we are in the 'Z' drinks, we want to add them to the drinksArray
(i.e. implement the first if) but NOT call the fetch again (i.e. implement the second if), so we only
increment the counter which then results in the else statement. REVIEW THIS LATER

function renderAllDrinks(drinksArray){
    drinksArray.forEach(drink => {
        renderOneDrink(drink)
        console.log(drink)
    })
}

function renderOneDrink(drink){
    const img = document.createElement('img')
    const h3 = document.createElement('h3')

    h3.textContent = drink.strDrink
    img.src = drink.strDrinkThumb

    const drinkCard = document.createElement('div')
    drinkCard.className = 'drink-card'
    drinkCard.append(img, h3)

    const drinksContainer = document.querySelector('#data')
    drinksContainer.appendChild(drinkCard)
    console.log('finished')
} */

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
    document.querySelector('#btn-container').appendChild(btn)
}

function addEvents(btn){
    btn.addEventListener('mouseover', function(event){
        event.target.style.color = '#ffffff';
        event.target.style.backgroundColor = '#0d6efd';
    })
    btn.addEventListener('mouseout', function(event){
        if(!event.target.classList.contains('selected')){
            event.target.style.color = '#0d6efd';
            event.target.style.backgroundColor = '#ffffff';
        }
    })
    btn.addEventListener('click', function(event){
        event.target.classList.toggle('selected')

    })
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => button.toggleAttribute('class', 'hover'))
})
