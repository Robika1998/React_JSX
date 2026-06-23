import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Logo from "../common/Logo";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length,
  );

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__inner container">
        <Logo className="header__logo" onClick={closeMenu} />

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
            onClick={closeMenu}
          >
            Favorites
            {favoritesCount > 0 && (
              <span className="header__badge">{favoritesCount}</span>
            )}
          </NavLink>
          <a href="#about" className="header__link" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" className="header__link" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="header__actions">
          <Link
            to="/favorites"
            className="header__fav-btn"
            aria-label="Favorites"
          >
            ♥
            {favoritesCount > 0 && (
              <span className="header__fav-badge">{favoritesCount}</span>
            )}
          </Link>
          <div className="header__avatar" aria-hidden="true">
            <img src="https://i.pravatar.cc/40?img=12" alt="User profile" />
          </div>
          <button
            type="button"
            className={`header__burger ${menuOpen ? "header__burger--open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
