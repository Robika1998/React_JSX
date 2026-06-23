import Logo from '../common/Logo'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo className="footer__logo" asLink={false} />
          <p className="footer__copyright">
            © {year} Shopio. All rights reserved.
          </p>
          <p className="footer__tagline">
            The best shopping experience around the world.
          </p>
        </div>

        <div className="footer__social">
          <p className="footer__social-title">Follow Us</p>
          <div className="footer__social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Twitter"
            >
              𝕏
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
