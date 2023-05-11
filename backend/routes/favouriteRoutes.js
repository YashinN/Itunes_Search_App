const express = require("express");

// imports controller functions.
const {
  getSearchResults,
  getAllFavourites,
  addFavourite,
  deleteFavourite,
} = require("../controllers/favouriteController");

const router = express.Router();
// search request to get search results.
router.post("/", getSearchResults);
// get request to get fav items.
router.get("/fav", getAllFavourites);
// post request to add fav item.
router.post("/fav", addFavourite);
// delete request to remove fav item
router.delete("/fav", deleteFavourite);

module.exports = router;
