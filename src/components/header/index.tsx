import { useEffect, useRef, useState } from "react";
import "./index.scss";
import Dropdown from "../dropdown";
import { Link, useLocation, NavLink } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const serviceRoutes = ["/reader", "/dichvu", "/calendar"];
  const isServicePage = serviceRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
  const isHomePage = location.pathname === "/";
  const isZodiacPage =
    location.pathname === "/zodiacs" ||
    location.pathname.startsWith("/zodiacs/");
  const headerRef = useRef<HTMLDivElement | null>(null);

  // State to manage header visibility
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLogoClicked, setIsLogoClicked] = useState<boolean>(false);

  // Ref to track the last scroll position
  const lastScrollPosition = useRef<number>(0);
  const isHeaderHiddenRef = useRef<boolean>(false);
  const mobileMenuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      console.error("Header element not found");
      return;
    }

    header.classList.remove("header--hidden");
    isHeaderHiddenRef.current = false;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition === 0) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
        isHeaderHiddenRef.current = false;
      } else if (
        currentScrollPosition > lastScrollPosition.current &&
        !isHeaderHiddenRef.current
      ) {
        header.classList.add("header--hidden");
        setIsHeaderHidden(true);
        isHeaderHiddenRef.current = true;
      } else if (
        currentScrollPosition < lastScrollPosition.current &&
        isHeaderHiddenRef.current
      ) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
        isHeaderHiddenRef.current = false;
      }

      lastScrollPosition.current = currentScrollPosition;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 50 && isHeaderHiddenRef.current) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
        isHeaderHiddenRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when navigating to a new route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !headerRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = () => {
    // Toggle the visibility of the mobile menu on logo click
    if (window.innerWidth < 768) {
      setIsLogoClicked((prev) => !prev);
      setIsMobileMenuOpen(false); // Ensure mobile menu is closed
    }
  };

  return (
    <div
      className={`header ${isHeaderHidden ? "header--hidden" : ""}`}
      ref={headerRef}
    >
      <div className="header__left">
        <div
          className="header__left__logo"
          onClick={handleLogoClick}
          role="button"
          aria-label="Logo"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogoClick();
            }
          }}
        >
          <img src="https://i.imgur.com/tZ66IFQ.png" width={80} alt="Logo" />
        </div>
        <div className="header__left__name">
          <img src="https://i.imgur.com/Kx2IQRt.png" width={150} alt="Name" />
        </div>
      </div>
      <div className="header__right">
        {/* Desktop Navigation */}
        <ul className="header__right__navigation">
          <li>
            <Link to="/" className={isHomePage ? "active-link" : ""}>
              Trang chủ
            </Link>
          </li>
          <li>
            <NavLink
              to="/reader"
              className={() => (isServicePage ? "active-link" : "")}
            >
              Dịch vụ
            </NavLink>
          </li>
          <li>Tra cứu</li>
          <li>
            <Link
              to="/zodiacs"
              className={isZodiacPage ? "active-link" : ""}
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "inherit",
              }}
            >
              Zodiac
            </Link>
          </li>
          <li>Tài Khoản</li>
        </ul>

        {/* Dropdown - Desktop */}
        {!isLoginPage && (
          <div className="header__right__dropdown">
            <Dropdown />
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {isLogoClicked && window.innerWidth < 768 && (
          <ul className="header__right__navigation-mobile" ref={mobileMenuRef}>
            <li>
              <Link to="/" className={isHomePage ? "active-link" : ""}>
                Trang chủ
              </Link>
            </li>
            <li>
              <NavLink
                to="/reader"
                className={() => (isServicePage ? "active-link" : "")}
              >
                Dịch vụ
              </NavLink>
            </li>
            <li>Tra cứu</li>
            <li>
              <Link
                to="/zodiacs"
                className={isZodiacPage ? "active-link" : ""}
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  color: "inherit",
                }}
              >
                Zodiac
              </Link>
            </li>
            <li>Tài Khoản</li>
          </ul>
        )}

        {/* Dropdown - Mobile */}
        {!isLoginPage && isMobileMenuOpen && (
          <div className="header__right__dropdown-mobile">
            <Dropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
