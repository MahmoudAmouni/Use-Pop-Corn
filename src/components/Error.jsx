/* eslint-disable react/prop-types */
export function Error({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
