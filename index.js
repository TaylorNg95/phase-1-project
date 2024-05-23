const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let drinksArray = []

document.addEventListener('DOMContentLoaded', function(){
    Array.from(alphabet).forEach(letter => fetchData(letter))
})

function fetchData(letter){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            if(data.drinks !== null){
                drinksArray = drinksArray.concat(data.drinks)
            }
        })
}