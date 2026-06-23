import { Link } from "react-router-dom";

function Logo({ className = "", onClick, asLink = true }) {
  const content = (
    <>
      <img
        src="/favicon.svg"
        alt=""
        className="logo__icon"
        width="32"
        height="30"
      />
      <span className="logo__text">Shopio.</span>
    </>
  );

  if (asLink) {
    return (
      <Link to="/" className={`logo ${className}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div className={`logo ${className}`}>{content}</div>;
}

export default Logo;
