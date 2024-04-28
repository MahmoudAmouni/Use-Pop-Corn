//Note to use this code go to omdb and search for an API key get ur key and replace it i put and key variable just change it
//😊😊
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useMovie } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const KEY="e54562cb"

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

function Error({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function MoviesNumber({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MoviesList({ movies, onSelect, query }) {
  if (query == "") {
    return <WaitingForSearch />;
  }
  else if(query.length < 3){
    return(
      <MoreThanTreeLetters />
    )
  }
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelect={onSelect} />
      ))}
    </ul>
  );
}
function WaitingForSearch() {
  return (
    <div className="SearchWaiting">
      <p>Search For Any Movie You Want 😊</p>
    </div>
  );
}

function MoreThanTreeLetters(){
  return (
    <div className="SearchWaiting">
      <p>Write More To Find The Movie😞</p>
    </div>
  )
}

function Movie({ movie, onSelect }) {
  return (
    <li
      onClick={() => {
        onSelect(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onRemove={onRemove} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onRemove }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
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
        <button
          className="btn-delete"
          onClick={() => {
            onRemove(movie.imdbID);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, back, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((watch) => watch.imdbID).includes(selectedId);
  const rating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Genre: genre,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      imdbRating: Number(imdbRating),
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      userRatingCount: countRef.current,
    };
    onAddWatched(newMovie);
  }

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useKey("escape", back);

  //CHANGE TITLE USE EFFECT
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
      return function () {
        document.title = "popcorn";
      };
    },
    [title]
  );

  //fetching the movies details
  useEffect(
    function () {
      setIsLoading(true);
      async function MovieAllDetails() {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      MovieAllDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={back}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setMovieRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAdd();
                        back();
                      }}
                    >
                      + Add Movie To List
                    </button>
                  )}
                </>
              ) : (
                <p>U rated this movie {rating}🌟</p>
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
  );
}
