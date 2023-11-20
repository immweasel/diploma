import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__item'>
          <HashLink
            className='navtab__link links-hover'
            to='#about'
            smooth>
            О проекте
          </HashLink>
        </li>
        <li className='navtab__item'>
          <HashLink
            className='navtab__link links-hover'
            to='#techs'
            smooth>
            Технологии
          </HashLink>
        </li>
        <li className='navtab__item'>
          <HashLink
            className='navtab__link links-hover'
            to='#student'
            smooth>
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;