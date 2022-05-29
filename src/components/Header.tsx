import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

export const Header: React.FC = () => {
  return (
    <div className="header__content">
      <div className="header__logo">
        <div className="header__logo-container">
        </div>
      </div>
      
      <div className="header__buttons">
        <AnchorLink href='#users'>
          <button
            type="submit"
            className="header__button button"
          >
            Users
          </button>
        </AnchorLink>

        <AnchorLink href='#signup'>
          <button
            type="submit"
            className="header__button button"
          >
            Sign up
          </button>
        </AnchorLink>
      </div>
    </div>
  );
};
