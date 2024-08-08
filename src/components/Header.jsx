import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Logo from './icons/Logo';
import Navbar from './Navbar';

const Header = ({ activeItem, dimensions }) => {
  const [modalMenuOpen, setModalMenuOpen] = useState(false);
  const [modalMenuButton, setModalMenuButton] = useState('');

  const menuToggle = () => {
    if (dimensions.width < 1000) {
      if (!modalMenuOpen) setModalMenuButton('menu__button-modal');
      else setModalMenuButton('');
      setModalMenuOpen(!modalMenuOpen);
    }
  };

  return (
    <header className="app-header">
      <div className="header__top">
        <Logo />
        <button type="button" aria-label="Menu button" className={'menu__button '.concat(modalMenuButton)} onClick={menuToggle}>
          <span className="menu__button-bar" />
        </button>
      </div>
      <Navbar
        isNavbarOpen={modalMenuOpen}
        activeItem={activeItem}
        menuToggle={menuToggle}
      />
    </header>
  );
};

Header.propTypes = {
  activeItem: PropTypes.number.isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
};

export default Header;
