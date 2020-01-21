import React, { useState } from 'react';

import './style.css';
import RepoList from '../RepoList';

function Main({ selectedLanguage }) {
  const [repositories, setRepositories] = useState([]);

  return (
    <main>
      <RepoList
        key={selectedLanguage}
        selectedLanguage={selectedLanguage}
        repositories={repositories}
        setRepositories={setRepositories}
      />
    </main>
  );
}

export default Main;
