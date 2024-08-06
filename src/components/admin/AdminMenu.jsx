import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signoutUser } from '../../redux/users/usersReducer';

const AdminMenu = (
  {
    isModalMenuOpen,
    menuToggle,
  },
) => {
  const dispatch = useDispatch();
  const [navbarModal, setNavbarModal] = useState('');

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
    if (isModalMenuOpen) {
      const navbar = document.getElementById('app-navbar');
      const menuList = document.getElementById('menu__list');
      setNavbarModal('navbar__modal-open');
      navbar.style.animation = 'fadeIn 250ms ease-in-out 0ms forwards';
      menuList.style.animation = 'fadeIn 500ms ease-in-out 250ms forwards';
    } else if (navbarModal !== '') navbarModalClose();
  }, [isModalMenuOpen]);

  const menuToggleHandler = () => menuToggle();

  const signoutHandler = () => dispatch(signoutUser());

  return (
    <nav className={'app-navbar '.concat(navbarModal)} id="app-navbar">
      <ul className="menu__list" id="menu__list">
        <li className="list__item">
          <NavLink
            className="list__item-link"
            to="/portfolio-admin/projects"
            onClick={menuToggleHandler}
          >
            PROJECTS
          </NavLink>
        </li>
        <li className="list__item">
          <NavLink
            className="list__item-link"
            to="/portfolio-admin/tools"
            onClick={menuToggleHandler}
          >
            TOOLS
          </NavLink>
        </li>
        <li className="list__item">
          <NavLink
            className="list__item-link"
            to="/portfolio-admin/profile"
            onClick={menuToggleHandler}
          >
            PROFILE
          </NavLink>
        </li>
        <li className="list__item">
          <Link
            className="list__item-link"
            to="/portfolio-admin/signin"
            onClick={signoutHandler}
          >
            SIGN OUT
          </Link>
        </li>
      </ul>
    </nav>
  );
};

AdminMenu.propTypes = {
  isModalMenuOpen: PropTypes.bool.isRequired,
  menuToggle: PropTypes.func.isRequired,
};

export default AdminMenu;
