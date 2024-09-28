import React from "react";
import Movie from "./Movie";

function MovieList({movies , onSelectedMovie}) {
  

  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectedMovie={onSelectedMovie}/>
        ))}
      </ul>
    </>
  );
}

export default MovieList;
