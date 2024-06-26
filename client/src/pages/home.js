import { useState , useEffect} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => 
{
    const userID = useGetUserID();
    const [recipes, setRecipes] = useState  ([]);
    const [savedRecipes, setSavedRecipes] = useState ([]);
    useEffect(() => {
        const fetchRecipe = async() => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data)
                console.log(response.data)
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async() => {
            try {
            const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();
        fetchSavedRecipe();
    }, []);
    const saveRecipe = async (recipeID) => {
        try {
          const response = await axios.put("http://localhost:3001/recipes", {
            recipeID,
            userID,
          });
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
          <h1>Recipes</h1>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };

//     return(
//         <div> 
//             <h1>Recipes</h1>
//             <ul>
//                 {recipes.map(recipes) =>(
//                     <li key={recipes._id}>
//                         <div>
//                             <h2>{recipes.name}</h2>
//                             <button onClick={() => saveRecipe(recipes._id)} disabled={isRecipeSaved(recipes._id)}>
//                             {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
//                             </button>
//                         </div>
//                         <div className="instructions">
//                             <p>{recipes.instructions}</p>
//                         </div>
//                         <img src={recipes.imageUrl} alt= {recipes.name}></img>
//                         <p> Cooking Time:{recipes.cookingtime}</p>
//                     </li>
//                 )
//             )
//             </ul>
//         </div>
//     )
// };