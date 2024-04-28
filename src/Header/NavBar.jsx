import { Logo } from "./Logo";
/* eslint-disable react/prop-types */

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
