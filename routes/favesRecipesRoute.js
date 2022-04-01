const express = require('express');
const router = express.Router();
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid'); PROBABLY NOT NNEDED AS THE RECIPES COME WITH IDs.

// Adding a new recipe card to array in favesRecipes.json
router.post('/', (req,res) => { 
    fs.readFile('./data/favesRecipes.json', 'utf8', (err,data) => {
        const recipesData = JSON.parse(data);
        //create new recipe object
        const newRecipe = {
            id: req.body.id,
            title: req.body.title,
            image: req.body.image,
            timestamp: new Date(),
        };
        // push new recipe into recipeData array
        recipesData.push(newRecipe);
        // Write new recipe object data into favesRecipes.json file
        fs.writeFile('./data/favesRecipes.json', JSON.stringify(recipesData), () => {
            res.json({message: 'data added to file', data: recipesData});
        });
    });
});

// Get collection of faves recipes as array of objects
router.get('/', (req, res) => {
    fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
        const recipesData = JSON.parse(data);
        res.json(recipesData)
    });
});

// Delete fave recipe
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     res.send
// })

module.exports = router;