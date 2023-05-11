const express = require("express");
const fs = require("fs");

// function removes fav item from stored data.Using id.
const reomveFav = (favItems, id) => {
  // filters fav item data and checks for mathing id.
  let itemsRemoved = favItems.filter((element) => {
    // returns items not matching trackId or artistId
    if (!element.trackId) {
      return element.artistId !== id;
    }
    return element.trackId !== id;
  });
  // returns array of new fav items.
  return itemsRemoved;
};

// gets all fav items from json file.
const getFavourites = () => {
  // reads json file.
  const data = fs.readFileSync("./favourites.json");
  //returns data as js object.
  return JSON.parse(data);
};

// api search request gets data from itunes api.
const search = async (searchParam, entity) => {
  try {
    // fetch request to api
    const res = await fetch(
      `https://itunes.apple.com/search?term=${searchParam}&media=${entity}&limit=25`
    );
    // stores data
    const data = await res.json();
    // stores required data.
    let results = data.results;
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

// sends search results.
const getSearchResults = async (req, res) => {
  // gets search results from api
  let results = await search(req.body.searchField, req.body.media);
  // sedns search results as json.
  res.send(JSON.stringify(results));
};

// gets all fav items and sends fav items.
const getAllFavourites = async (req, res) => {
  // gets fav data from file.
  let data = getFavourites();
  //sends data as json.
  res.send(JSON.stringify(data));
};

// adds fav item to json file.
const addFavourite = async (req, res) => {
  // gets all fav items.
  let data = getFavourites();
  // adds received body to fav data.
  data.push(req.body);
  // writes new data to file.
  fs.writeFileSync("./favourites.json", JSON.stringify(data));
  // sends updated data.
  res.send(JSON.stringify(data));
};

// deletes fav item from json file.
const deleteFavourite = async (req, res) => {
  let data = getFavourites();
  // removes item from data using recevied body.
  let newFav = reomveFav(data, req.body.id);
  // writes data to file.
  fs.writeFileSync("./favourites.json", JSON.stringify(newFav));
  //send updated fav data with requested item removed.
  res.send(JSON.stringify(newFav));
};

module.exports = {
  search,
  getSearchResults,
  getAllFavourites,
  addFavourite,
  deleteFavourite,
};
