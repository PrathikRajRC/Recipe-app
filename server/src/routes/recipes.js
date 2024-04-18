import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    }catch(err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel ( req.body );

    try {
        const response = await recipe.save();
        res.json(response);
    }catch(err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.SavedRecipes.push(recipe);
        await user.save();
        res.json({SavedRecipes: user.SavedRecipes});
    }   catch(err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({SavedRecipes: user?.SavedRecipes})
    }catch(err) {
        res.json(err);
    }
});

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const SavedRecipes = await RecipeModel.find({ _id: { $in: user.SavedRecipes}})
        res.json({SavedRecipes: user?.SavedRecipes})
    }catch(err) {
        res.json(err);
    }
});

export {router as recipesRouter};