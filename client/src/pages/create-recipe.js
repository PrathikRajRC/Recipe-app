import React, { useState } from "react";
// import axios from "axios";
// import { useGetUserID } from "../hooks/useGetUserID";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageURL: "",
        cookingTime: 0,
        userOwner: 0,
    });

    const handleChange= (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    };

    const handleIngredientChange= (event,idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe,ingredients});
        console.log(recipe.ingredients);
    };

    const addIngredient = () => {
        setRecipe({
           ...recipe,
            ingredients: [...recipe.ingredients, ""],
        });
    }
    return ( 
        <div className="create-recipe"> 
            <h2> Create Recipe </h2>  
            <form>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="Field" onChange={handleChange}/>

                <label htmlFor="ingredients">Ingredients</label>
                {
                    recipe.ingredients.map((ingredient, idx) => (
                        <div key={idx}>
                            <input 
                                className="Field"
                                key={idx} 
                                type="text" 
                                name="ingredients" 
                                value={ingredient} 
                                onChange={(event) => handleIngredientChange(event,idx)}
                            />
                        </div>
                    ))
                }
                <br/>
                <button onClick={addIngredient}className="Submit" type="button">Add</button>


                <label htmlFor="instructions">instructions</label>
                <textarea id="instructions" name="instructions"className="Field" onChange={handleChange} ></textarea>

                <label htmlFor="imageURL">Image URL</label>
                <input type="text" id="imageURL" name="imageURL"className="Field" onChange={handleChange}/>

                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime"className="Field" onChange={handleChange}/>
                <br/>
                <button type="submit" className="Submit" > Submit </button>
            </form>
        </div>
    );
};