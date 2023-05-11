import React from "react";
// imports common function.
import { replaceImageSize } from "./ImageStringConvert";
import "./Favourites.css";

const Favourites = (props) => {
  // checks the type of fav items.
  const checkType = (item) => {
    if (
      item.kind === "podcast" ||
      item.kind === "song" ||
      item.kind === "tv-episode" ||
      item.wrapperType === "audiobook"
    ) {
      return true;
    }
    return false;
  };

  // removes fav item from list makes delete req to server.
  const deleteFav = async (id) => {
    // delete req using id arg.
    const response = await fetch(
      "https://itunessearchapp-production.up.railway.app/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );
    // recevies new fav items from server after delete.
    const data = await response.json();
    // sets and stores new data received
    props.setFavItems(data);
  };

  // removes fav item from list , delete button clicked.
  const deleteHandler = (e) => {
    // calls to make request and delete item, using id.
    deleteFav(Number(e.target.id));
  };

  return (
    <div className="view-fav">
      <div
        className="btn btn-danger view-fav-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
      >
        <button className="btn btn-outline-light">View Favourites</button>
      </div>

      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h1 id="offcanvasTopLabel" className="text-light">
            FAVOURTIES
          </h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <div className="row gy-5">
              {props.favItems.length === 0 && (
                <h1 className="px-0">Your List is Empty...</h1>
              )}
              {props.favItems.map((item, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                >
                  <div>
                    <div className="favImg-container">
                      <img
                        className={
                          checkType(item) ? "fav-img-short" : "fav-img"
                        }
                        src={replaceImageSize(item.artworkUrl100)}
                        alt=""
                      />
                      <button
                        type="button"
                        className="btn btn-danger delete-btn "
                        id={!item.trackId ? item.artistId : item.trackId}
                        onClick={deleteHandler}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className=" fav-desc-container mt-1">
                    <p className="text-light mb-0">
                      Title:{" "}
                      <span className="text-secondary">
                        {!item.trackName ? item.collectionName : item.trackName}
                      </span>
                    </p>
                    <p className="text-light mb-0">
                      Type:{" "}
                      <span className="text-secondary">
                        {!item.kind ? item.wrapperType : item.kind}
                      </span>
                    </p>
                    <p className="mb-0 text-light">
                      Creator:{" "}
                      <span className="text-secondary">{item.artistName}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
