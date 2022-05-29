import React, { useState, useEffect } from 'react';
import './styles/main.scss';

import { UserCards } from './components/UserCards.tsx';
import { About } from './components/About.tsx';
import { Header } from './components/Header.tsx';
import { getUsers } from './components/api/api.ts';
import { NewUserForm } from './components/NewUserForm.tsx';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    getUsers(page).then(usersFromServer => {
      setUsers(prev => [...prev, ...usersFromServer.users]);
      setMaxPage(usersFromServer.total_pages);
    });
  }, []);

  const onMoreClick = () => {
    if (page < maxPage) {
      getUsers(page + 1).then(usersFromServer => {
        setUsers(prev => [...prev, ...usersFromServer.users]);
        setMaxPage(usersFromServer.total_pages);
        setPage(page + 1);
      });
    }
  };

  console.log('users', users.length);

  return (
    <div className="App">
      <header className="page__section header">
        <Header />
      </header>

      <main>
        <About />

        <UserCards
          users={users}
          setPage={setPage}
          page={page}
          maxPage={maxPage}
          onMoreClick={onMoreClick}
        />
      </main>

      <footer>
        <NewUserForm
          page={page}
          setPage={setPage}
          setUsers={setUsers}
        />
      </footer>
    </div>
  );
};

export default App;
