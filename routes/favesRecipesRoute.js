const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
    fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
        const recipesData = JSON.parse(data);
        //create new recipe object
        const newRecipe = {
            id: req.body.id,
            title: req.body.title,
            image: req.body.image,
            timestamp: new Date(),
        };
        // Setting functionality to not save an existing fave recipe
        const foundRecipe = recipesData.find(
            (recipeId) => recipeId.id === newRecipe.id);
        console.log(foundRecipe);
        if (foundRecipe) {
           
            res.status(304).send("This recipes already exists")
        } else {

        // push new recipe into recipeData array
        recipesData.push(newRecipe);
        // Write new recipe object data into favesRecipes.json file
        fs.writeFile('./data/favesRecipes.json', JSON.stringify(recipesData), () => {
            if (err) {
                res.send("error saving your fave recipe")
            } else {
                res.json({ message: 'data added to file', data: recipesData });
            }
        });
    }
    });
});

// Get collection of faves recipes as array of objects
router.get('/', (req, res) => {
    fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('error getting recipe');
        } else { }
        const recipesData = JSON.parse(data);
        res.json(recipesData);
        
    });
});

// Delete fave recipe Review this
router.delete('/:id/delete', (req, res) => {
    fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
        const recipesData = JSON.parse(data);
        const recipeToDelete = Number(req.params.id);
        console.log(recipeToDelete);
        const newRecipeData = recipesData.filter(item => item.id !== recipeToDelete)
        fs.writeFile('./data/favesRecipes.json', JSON.stringify(newRecipeData), (err) => {
            if (err) {
                console.error(err)
                return
            }
            res.send("deleted")
        })

    })
})

module.exports = router;