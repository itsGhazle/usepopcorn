import React, { useEffect, useRef, useState } from "react";
import { KEY } from "./App";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./useKey";

function SelectedMovie({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const handelAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };
  useKey("Escape", onCloseMovie);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetail();
  }, [selectedId]);
  useEffect(() => {
    if (!title) return;
    document.title = `movie | ${title}`;
    return () => {
      document.title = "usepopcorn";
    };
  }, [title]);
  return (
    <>
      <div className="detail">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <img src={poster} alt={`poster of the ${movie}`} />
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre} </p>
                <p>
                  <span>🎇</span>
                  {imdbRating}
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating size={24} onSetRating={setUserRating} />
                    {userRating > 0 && (
                      <button className="btn- add" onClick={handelAdd}>
                        Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>you have rated this movie{watchedUserRating}🎇</p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default SelectedMovie;
