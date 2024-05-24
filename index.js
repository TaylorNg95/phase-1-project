const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let drinksArray = []
let ingredientsArray = []

document.addEventListener('DOMContentLoaded', function(){
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

/* Line 21  becomes relevant at the last array - we want to increment NewLetter so that we can make
a recursive function call, but when we are in the 'Z' drinks, we want to add them to the drinksArray
(i.e. implement the first if) but NOT call the fetch again (i.e. implement the second if), so we only
increment the counter which then results in the else statement. REVIEW THIS LATER */

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

    calcIngredientsArray(drinksArray)    
}

function calcIngredientsArray(drinksArray){
    drinksArray.forEach(drink => {

    })
}


