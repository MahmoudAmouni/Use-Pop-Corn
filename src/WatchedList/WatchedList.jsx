/* eslint-disable react/prop-types */
import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onRemove={onRemove} />
      ))}
    </ul>
  );
}
