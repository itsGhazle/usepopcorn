import { useEffect,useState } from "react";
export const KEY = "3edce669";

export function useMovies(query,callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.()
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("somthing went wrong");

        const data = await res.json();
        setMovies(data.Search);
        if (data.Response === "False") throw new Error("movie not found");
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  

  return {movies,isLoading,error}
}
