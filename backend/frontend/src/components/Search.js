import React, { useState } from "react";

import "./Search.css";

const Search = (props) => {
  // sets the search paramters for http request to api.
  const [entity, setEntity] = useState("all");
  // sets and stores users search parameter.
  const [enteredSearch, setEnteredSearch] = useState("");

  // stores filter ids and labels.
  const filters = [
    { id: "all", label: "all" },
    { id: "movie", label: "movie" },
    { id: "podcast", label: "podcast" },
    { id: "music", label: "music" },
    { id: "audiobook", label: "audio book" },
    { id: "shortFilm", label: "short film" },
    { id: "tvShow", label: "tv show" },
    { id: "ebook", label: "ebook" },
  ];

  // clears search input.
  const clearSearch = () => {
    setEnteredSearch("");
  };

  // checks if user search input is empty.
  const checkEmpty = (val) => {
    // checks if user input length is equal to 0.
    if (val.trim().length === 0) {
      // alerts error if empty.
      alert("Enter a serch value!");
      return false;
    } else {
      return true;
    }
  };

  // Post request sends search paramters server to perform api request to get search data.
  const searchPostRequest = async () => {
    // Post request to server.
    const response = await fetch(
      "https://itunessearchapp-production.up.railway.app/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // sends media type and search parameter to server.
        body: JSON.stringify({ media: entity, searchField: enteredSearch }),
      }
    );
    // receives search results from server.
    const data = await response.json();
    // stores the search results in prop from App.js.
    props.searchData(data);
  };

  // function formats entered search removing space and adding +. Needs to be fromatted to be used in api call.
  const formatSearch = (searhParam) => {
    // removes white space and adds + between words.
    let removeWhiteSpace = searhParam.replace(/\s+/g, "+").trim();
    // removes white space from ends.
    let trimEnds = removeWhiteSpace;
    // removes + from begining of string.
    if (removeWhiteSpace[0] === "+") {
      trimEnds = trimEnds.slice(1, removeWhiteSpace.length);
    }
    // removes plus from end of string.
    if (removeWhiteSpace[removeWhiteSpace.length - 1] === "+") {
      trimEnds = trimEnds.slice(0, trimEnds.length - 1);
    }
    // returns formatted string.
    return trimEnds;
  };

  // runs when search button clicked.
  const searchHandler = () => {
    // checks if empty string.
    if (checkEmpty(enteredSearch)) {
      // if not empty formats user entry.
      let formatedSearch = formatSearch(enteredSearch);
      // sends request to server using formatted entry to get results.
      searchPostRequest(entity, formatedSearch);
      // clears input fields.
      clearSearch();
    }
  };

  // sets entity or type of media when radio fields are selected.
  const entityHandler = (e) => {
    // sets entity type eg. movie, ebook ect to be searched.
    setEntity(e.target.id);
  };

  // Stores entered searched entry.
  const enteredSearchHandler = (e) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <div className="container search-wrapper">
      <form className="search-form my-5">
        <div className="form-group mt-4 search-container">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search...."
            onChange={enteredSearchHandler}
            value={enteredSearch}
          />
          <button
            type="button"
            className="btn btn-light"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </form>

      <div
        className="btn-group container-fluid"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <div className="row filter-row">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="col-auto col-sm-auto col-md-auto px-0 filter-container"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id={filter.id}
                autoComplete="off"
                onClick={entityHandler}
                defaultChecked={entity === filter.id}
                data-testid={filter.id}
              />
              <label
                className="btn btn-outline-primary btn-sm filter-label"
                htmlFor={filter.id}
              >
                {filter.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
