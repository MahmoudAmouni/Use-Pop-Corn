//Note to use this code go to omdb and search for an API key get ur key and replace it i put and key variable just change it
//😊😊
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMovie } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { NavBar } from "./Header/NavBar";
import { MoviesNumber } from "./MoviesList/MoviesNumber";
import { Search } from "./Header/Search";
import { Main } from "./Main.1";
import { Box } from "./components/Box";
import { MoviesList } from "./MoviesList/MoviesList";
import { WatchedSummary } from "./WatchedList/WatchedSummary";
import { WatchedList } from "./WatchedList/WatchedList";
import { MovieDetails } from "./MovieDetails";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  export const KEY="e54562cb"

export default function App() {
  // const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState("");

  //   const [watched, setWatched] = useState(function(){
  //    const storedValue = localStorage.getItem('watched')
  //    return JSON.parse(storedValue);
  //   });
  const { movies, isloading, error } = useMovie(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleRemove(id) {
    setWatched((watch) => watch.filter((movie) => movie.imdbID !== id));
  }
  function handleAddWatched(watched) {
    setWatched((watch) => [...watch, watched]);
  }

  function handleClick(id) {
    setSelectedId((select) => (select === id ? null : id));
  }
  function back() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <MoviesNumber movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isloading && <Loading />}
          {error && <Error messages={error} />}
          {!isloading && !error && (
            <MoviesList movies={movies} onSelect={handleClick} query={query} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              back={back}
              watched={watched}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onRemove={handleRemove} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}


