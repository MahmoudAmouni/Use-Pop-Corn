import { useEffect, useRef, useState } from "react";
import { useKey } from "./useKey";
import StarRating from "./StarRating";
import { Loading } from "./components/Loading";
import { KEY } from "./App";

export function MovieDetails({ selectedId, back, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((watch) => watch.imdbID).includes(selectedId);
  const rating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title, Poster: poster, Runtime: runtime, imdbRating, Released: released, Genre: genre, Plot: plot, Actors: actors, Director: director, Year: year,
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
                    setMovieRating={setUserRating} />
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
