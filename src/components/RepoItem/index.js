import React from 'react';
import './style.css';
/*
user photo
repo name
stars
forks
*/
function RepoItem({ repo }) {
  return (
    <li className='repo-item'>
      <header>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <div className='repo-info'>
          <strong>Nome do repositório: {repo.name}</strong>
          <span>Stars: {repo.stargazers_count}</span>
          <br />
          <span>Forks: {repo.forks_count}</span>
        </div>
      </header>
    </li>
  );
}

export default RepoItem;
