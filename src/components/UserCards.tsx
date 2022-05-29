import React from 'react';

type Props = {
  users: User[];
  page: number;
  setPage: (p: number) => void;
  maxPage: number;
  onMoreClick: () => void;
};

export const UserCards: React.FC<Props> = ({
  users, page, setPage, maxPage, onMoreClick,
}) => {
  return (
    <section className="users" id="users">
      <h1 className="users__title">
        Working with GET request
      </h1>
      <div className="users__item">
        {users.map(user => (
          <div
            className="user"
            key={user.id}
          >
            <div className="user__photo-container">
              <img
                src={user.photo}
                alt={user.name}
                className="user__photo"
              />
            </div>
            <h3
              className="user__name"
              title={user.name}
            >
              {user.name}
            </h3>
            <div className="user__about-container">
              <p
                className="user__role"
                title={user.position}
              >
                {user.position}
              </p>

              <p
                className="user__email"
                title={user.email}
              >
                {user.email}
              </p>

              <p
                className="user__number"
                title={user.phone}
              >
                {user.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`users__button button ${page === maxPage && 'disabled'}`}
        disabled={page === maxPage}
        onClick={onMoreClick}
      >
        Show more
      </button>
    </section>
  );
};
