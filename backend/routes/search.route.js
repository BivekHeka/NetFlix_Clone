import express from 'express';
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson } from "../controllers/search.controller.js";

const router = express.Router();

// Route to search for a person (actor/actress)
router.get("/person/:query", searchPerson);

// Route to search for a movie
router.get("/movie/:query", searchMovie);

// Route to get search history
router.get("/history", getSearchHistory);

// Route to delete an item from search history
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
