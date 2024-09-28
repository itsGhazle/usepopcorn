import React from "react";
import WatchedMovieItems from "./WatchedMovieItems"

function WatchedMovieList({ watched,onDeleteWatched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
           <WatchedMovieItems movie={movie} onDeleteWatched={onDeleteWatched}/>
        ))}
      </ul>
    </>
  );
}

export default WatchedMovieList;
