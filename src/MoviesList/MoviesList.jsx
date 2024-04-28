/* eslint-disable react/prop-types */

import { Movie } from "./Movie";
import { MoreThanTreeLetters } from "../components/MoreThanTreeLetters";
import { WaitingForSearch } from "../components/WaitingForSearch";

export function MoviesList({ movies, onSelect, query }) {
  if (query == "") {
    return <WaitingForSearch />;
  }
  else if (query.length < 3) {
    return (
      <MoreThanTreeLetters />
    );
  }
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelect={onSelect} />
      ))}
    </ul>
  );
}
