import React from "react";
// Import common function
import { replaceImageSize } from "./ImageStringConvert";
import "./Display.css";

const Display = (props) => {
  // Post request to server to add fav item. Takes fav item as arg.
  const addFavourite = async (item) => {
    // fetch request to server.
    const response = await fetch(
      "https://itunessearchapp-production.up.railway.app/fav",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item[0]),
      }
    );
    // gets list of fav items from server.
    const data = await response.json();
    // sets and stores fav items from server.
    props.setFavItems(data);
  };

  // checks if fav item already exists by using id.
  const checkFav = (id) => {
    // filters through items and returns items with matching ids.
    let itemExists = props.favItems.filter(
      // uses trackId or artist id to check.
      (item) => item.trackId === id || item.artistId === id
    );
    // returns the length of array.
    return itemExists.length;
  };

  // gets fav item by id.
  const getFav = (id) => {
    // filters searched results to get fav item data.
    let favData = props.results.filter((item) => {
      // if item cant be identified by tack id ,use artist id.
      if (!item.trackId) {
        // returns found item.
        return !item.trackId && item.artistId === id;
      }
      // returns item by track id.
      return item.trackId === id;
    });
    // returns found item.
    return favData;
  };

  // Runs when selecting favourite button , adds fav item to list.
  const favHandler = (e) => {
    // checks if fav item exists.
    if (checkFav(Number(e.target.id)) === 0) {
      // gets fav item
      let newFav = getFav(Number(e.target.id));
      // makes request to add fav item to server.
      addFavourite(newFav);
      alert("Item added to favourites");
    } else {
      alert("Item already exists in favourites");
    }
  };

  return (
    <div className="container-fluid my-5">
      <div className="row gy-4 " datatest-id="displayFav">
        {props.results.map((result, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-4 col-xl-3 result-wrapper"
          >
            <div className="result-container p-3">
              <img
                src={replaceImageSize(result.artworkUrl100)}
                alt=""
                className="result-img mb-1"
              />
              <div className="description-container mt-1">
                <p className="text-success mb-0">
                  Title:{" "}
                  <span className="text-secondary">
                    {!result.trackName
                      ? result.collectionName
                      : result.trackName}
                  </span>
                </p>
                <p className="text-success mb-0">
                  Type:{" "}
                  <span className="text-secondary">
                    {!result.kind ? result.wrapperType : result.kind}
                  </span>
                </p>
                <p className="mb-0 text-success">
                  Creator:{" "}
                  <span className="text-secondary">{result.artistName}</span>
                </p>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="btn btn-outline-info btn-fav"
                  onClick={favHandler}
                  id={!result.trackId ? result.artistId : result.trackId}
                >
                  <div className="btn-label">
                    <span>F</span>
                    <span>A</span>
                    <span>V</span>
                    <span>O</span>
                    <span>U</span>
                    <span>R</span>
                    <span>I</span>
                    <span>T</span>
                    <span>E</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
