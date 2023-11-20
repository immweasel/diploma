import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.css';

const Header = ({ isLoggedIn }) => {

  const { pathname } = useLocation();

  return (
    <>
      {
        pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile'
          ?
          <header className={`header ${pathname === '/' ? 'header_place_hero' : ''} ${pathname === '/movies' ? 'header_place_movies' : ''}`}>
            <Link to='/' className='header__logo links-hover'></Link>
            <Navigation
              isLoggedIn={isLoggedIn}
            />
            <BurgerMenu
              isLoggedIn={isLoggedIn}
            />
          </header>
          : <header className={`header ${pathname === '/signin' || pathname === '/signup' ? 'header_place_auth' : 'header_type_disable'}`}>
            <Link to='/' className='header__logo links-hover'></Link>
          </header>
      }
    </>
  );
}

export default Header;