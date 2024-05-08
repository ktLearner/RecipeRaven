const router = require("express").Router();
const recipes = require("../models/recipes.js");

router.get("/recipes", async (req, res) => {
    try {
        // Extract search, sort, and filter parameters from the request query
        const search = req.query.search || "";
        let sort = req.query.sort || "calories";
        const filters = req.query;

        // Remove known parameters (search and sort) from filters
        delete filters.search;
        delete filters.sort;

        // Split the sort parameter into field and direction
        const [sortByField, sortByDirection] = sort.split(",");
        const sortBy = {};

        // Construct the sortBy object based on the sort parameter
        sortBy[sortByField] = sortByDirection === "desc" ? -1 : 1;

        // Find recipes matching the search term, apply sorting and filtering
        const foundRecipes = await recipes
            .find({
                name: { $regex: search, $options: "i" }, // Search by name (case-insensitive)
                ...filters // Apply additional filters
            })
            .sort(sortBy); // Apply sorting

        // Construct the response object
        const response = {

            foundRecipes
        };

        // Send the response
        res.status(200).json(response);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

module.exports = router;
