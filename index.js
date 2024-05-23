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
            if(counter < 26){
                if(data.drinks !== null){
                    drinksArray = drinksArray.concat(data.drinks)
                }
                /* debugger */
                const newLetter = alphabet[counter + 1]
                if(newLetter !== undefined){
                    fetchData(newLetter)
                }
                counter++
            } else {
                /* renderDrinks(drinksArray) */
            }
        })
}
/* Line 21  becomes relevant at the last array - we want to increment NewLetter so that we can make
a recursive function call, but when we are in the 'Z' drinks, we want to add them to the drinksArray
(i.e. implement the first if) but NOT call the fetch again (i.e. implement the second if), so we only
increment the counter which then results in the else statement. */

/* function renderDrinks(drinksArray){
    console.log(drinksArray)
} */


