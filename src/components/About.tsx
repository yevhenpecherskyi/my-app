import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

export const About: React.FC = () => {
  return (
    <section className="page__section about">
      <div className="about__image">
        <div className="about__container">
          <h1 className="about__title">
            Test assignment for front-end developer
          </h1>
          <p className="about__paragraph">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <AnchorLink href='#signup1'>
            <button
              type="submit"
              className="about__button button"
            >
              Sign up
            </button>
          </AnchorLink>
        </div>
      </div>
    </section>
  );
};
