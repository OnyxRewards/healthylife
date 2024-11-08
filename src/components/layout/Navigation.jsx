import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isOpen, onClose }) {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/resources', label: 'Patient Resources' },
    { path: '/blog', label: 'Blog' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navigation ${isOpen ? 'navigation--open' : ''}`}>
      <ul className="navigation__list">
        {navItems.map((item) => (
          <li key={item.path} className="navigation__item">
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `navigation__link ${isActive ? 'navigation__link--active' : ''}`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation; 