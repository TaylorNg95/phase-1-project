const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let counter = 0

let drinksArray = []

document.addEventListener('DOMContentLoaded', function(){
    fetchData('a')
})

function fetchData(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            /* debugger */
            if(counter < 25){
                counter++
                const newLetter = alphabet[counter]
                if(data.drinks !== null){
                    drinksArray = drinksArray.concat(data.drinks)
                }
                /* debugger */
                fetchData(newLetter) // Needs to get the Z ones but not call the fetch
            } else {
                /* renderDrinks(drinksArray) */
            }
           /*  if(data.drinks !== null){
                drinksArray = drinksArray.concat(data.drinks)
                data.drinks.forEach(drink => {
                    renderDrink(drink)
                })
            } */
        })
}


/* function renderDrinks(drinksArray){
    console.log(drinksArray)
} */


