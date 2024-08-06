import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const Navbar = (
  {
    isNavbarOpen,
    activeItem,
    menuToggle,
  },
) => {
  const [navbarModal, setNavbarModal] = useState('');

  const sectionList = [
    { key: 1, path: 'home', description: 'HOME' },
    { key: 2, path: 'works', description: 'WORKS' },
    { key: 3, path: 'about', description: 'ABOUT' },
    { key: 4, path: 'contact', description: 'CONTACT' },
  ];

  const removeAnimationEnd = () => {
    const navbar = document.getElementById('app-navbar');
    const menuList = document.getElementById('menu__list');
    setNavbarModal('');
    navbar.removeEventListener('animationend', removeAnimationEnd);
    menuList.removeEventListener('animationend', removeAnimationEnd);
    // navbar.style.animation = '';
  };

  const navbarModalClose = () => {
    if (navbarModal !== '') {
      const navbar = document.getElementById('app-navbar');
      const menuList = document.getElementById('menu__list');
      menuList.style.animation = 'fadeOut 250ms ease-in-out 0ms forwards';
      navbar.style.animation = 'fadeOut 500ms ease-in-out 250ms forwards';
      setTimeout(() => {
        navbar.addEventListener('animationend', removeAnimationEnd);
        menuList.addEventListener('animationend', removeAnimationEnd);
      }, 750);
    }
  };

  useEffect(() => {
    if (isNavbarOpen) {
      const navbar = document.getElementById('app-navbar');
      const menuList = document.getElementById('menu__list');
      setNavbarModal('navbar__modal-open');
      navbar.style.animation = 'fadeIn 250ms ease-in-out 0ms forwards';
      menuList.style.animation = 'fadeIn 500ms ease-in-out 250ms forwards';
    } else if (navbarModal !== '') navbarModalClose();
  }, [isNavbarOpen]);

  const handleMenuToggle = () => menuToggle();

  return (
    <nav className={'app-navbar '.concat(navbarModal)} id="app-navbar">
      <ul className="menu__list" id="menu__list">
        {
          sectionList && sectionList.map((ele, index) => (
            <li key={ele.key} className="list__item">
              <a
                className={'list__item-link '.concat(activeItem === index + 1 ? 'active' : '')}
                href={`#${ele.path}`}
                data-index={index + 1}
                onClick={handleMenuToggle}
              >
                {ele.description}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isNavbarOpen: PropTypes.bool.isRequired,
  activeItem: PropTypes.number.isRequired,
  menuToggle: PropTypes.func.isRequired,
};

export default Navbar;
