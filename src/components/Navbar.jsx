import { useState, useEffect } from 'react';
import { Menu, X, Mic2, Phone } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About Us',    href: '#about' },
  { label: 'Courses',     href: '#courses' },
  { label: 'Why Khaki',   href: '#why' },
  { label: 'Faculty',     href: '#trainers' },
  { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
        >
          <span className="navbar__logo-icon"><Mic2 size={22} /></span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-khaki">Khaki</span>
            <span className="navbar__logo-academy"> Academy</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="navbar__cta">
          <a href="tel:7338308071" className="btn btn-outline navbar__call-btn">
            <Phone size={15} /> Call Now
          </a>
          <a
            href="#contact"
            className="btn btn-primary navbar__cta-btn"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__mobile-link ${activeSection === link.href.replace('#', '') ? 'navbar__mobile-link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-actions">
            <a href="tel:7338308071" className="btn btn-outline navbar__mobile-call">
              <Phone size={15} /> Call: 7338308071
            </a>
            <a
              href="#contact"
              className="btn btn-primary navbar__mobile-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Enquire Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
