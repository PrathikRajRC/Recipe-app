import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();


    const handleChange= (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    };

    const handleIngredientChange= (event,idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe,ingredients});
        
    };

    const addIngredient = () => {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({ ...recipe, ingredients 
        });
        
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Recipe Created!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    return ( 
        <div className="create-recipe"> 
            <h2> Create Recipe </h2>  
            <form onSubmit={onSubmit}>

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

                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl"className="Field" onChange={handleChange}/>

                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime"className="Field" onChange={handleChange}/>
                <br/>
                <button type="submit" className="Submit" > Create Recipe </button>
            </form>
        </div>
    );
};