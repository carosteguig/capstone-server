const express = require('express');
const router = express.Router();
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid'); PROBABLY NOT NNEDED AS THE RECIPES COME WITH IDs.

// Adding a new recipe card to array in favesRecipes.json
// router.post('/', (req, res) => {
//     fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
//         const recipesData = JSON.parse(data);
//         //create new recipe object
//         const newRecipe = {
//             id: req.body.id,
//             title: req.body.title,
//             image: req.body.image,
//             timestamp: new Date(),
//         };
//         // push new recipe into recipeData array
//         recipesData.push(newRecipe);
//         // Write new recipe object data into favesRecipes.json file
//         fs.writeFile('./data/favesRecipes.json', JSON.stringify(recipesData), () => {
//             if (err) {
//                 res.send("error saving your fave recipe")
//             } else {
//                 res.json({ message: 'data added to file', data: recipesData });
//             }
//         });
//     });
// });


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
        /////////////////////////////// NEW CODE
        const foundRecipe = recipesData.find(
            (recipeId) => recipeId.id === newRecipe.id);
        console.log(foundRecipe);
        if (foundRecipe) {
           
            res.status(304).send("This recipes already exists")
        } else {
        ///////////////////////////////
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

// Delete fave recipe
router.delete('/:id/delete', (req, res) => {
    fs.readFile('./data/favesRecipes.json', 'utf8', (err, data) => {
        const recipesData = JSON.parse(data);
        const recipeToDelete = req.params.id;
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