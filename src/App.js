import Navbar from "./Navbar";
import Main from "./Main";
import { useEffect, useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummery from "./WatchedSummery";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SelectedMovie from "./SelectedMovie";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = "3edce669";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([],"watched");
  const { movies, isLoading, error } = useMovies(query, handelCloseMovie);
  const [selectedId, setSelectedId] = useState(null);
  const handelSelectedMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };
  function handelCloseMovie() {
    setSelectedId(null);
  }
  function handelAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handelDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handelSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handelCloseMovie}
              onAddWatched={handelAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handelDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
