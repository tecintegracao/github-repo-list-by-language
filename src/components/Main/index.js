import React from 'react';

import './style.css';
import RepoList from '../RepoList';

function Main({ selectedLanguage }) {
  return (
    <main>
      <RepoList key={selectedLanguage} selectedLanguage={selectedLanguage} />
    </main>
  );
}

export default Main;
