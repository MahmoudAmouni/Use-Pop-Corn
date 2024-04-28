/* eslint-disable react/prop-types */

export function MoviesNumber({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
