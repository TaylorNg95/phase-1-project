# Phase 1 Project

This project allows users to select cocktail ingredients that they have or plan to buy. Based on this information, the program renders all possible drinks that the user can make with those given ingredients. This relies on TheCocktailDB API (https://www.thecocktaildb.com/api.php), particularly their alphabetized cocktail data (https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a). Ingredients are housed within drink objects, so the program relies on the following steps:
    - Fetch the data with a recursive function (called 26 times) to get alphabetized drinks
    - Load the drink objects into a global drinks array
    - Load the ingredients within those drink objects into a global ingredients array (without repeat)
    - Render the ingredients as alphabetized, clickable buttons on the home page
    - Accept a user-based list of ingredients when the 'make me a drink' button is clicked
    - Compare the user ingredients to those required to make each drink in the global drinks array
    - Render the matching drinks and their details (image, name, ingredients, measurements, and instructions)