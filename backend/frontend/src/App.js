import React, { useState, useEffect } from "react";

// components
import Search from "./components/Search";
import Display from "./components/Display";
import Favourites from "./components/Favourites";
// Bootswatch theme
import "bootswatch/dist/solar/bootstrap.min.css";

function App() {
  // Stores/sets search results.
  const [searchResults, setSearchResults] = useState([]);
  // stores sets favourited items.
  const [favData, setFavData] = useState([]);

  // Fetches favourite items from server.
  const favOnload = async () => {
    try {
      // get request to fetch fav data.
      const response = await fetch(
        "https://itunessearchapp-production.up.railway.app/fav"
      );
      const data = await response.json();
      // stores fav data using state.
      setFavData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // effect gets fav data on load.
  useEffect(() => {
    // calls api to get fav data.
    favOnload();
  }, []);

  return (
    <>
      <Favourites favItems={favData} setFavItems={setFavData} />
      <Search searchData={setSearchResults} />
      <Display
        results={searchResults}
        favItems={favData}
        setFavItems={setFavData}
      />
    </>
  );
}

export default App;
