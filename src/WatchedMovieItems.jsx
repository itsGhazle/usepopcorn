import React from "react";

function WatchedMovieItems({movie, onDeleteWatched}) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.Title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>&times;</button>
        </div>
      </li>
    </>
  );
}

export default WatchedMovieItems;
