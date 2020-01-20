import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import DupObjArrRemover from '../../utils/DupObjArrRemover';
import './style.css';

import RepoItem from '../RepoItem';

function RepoList({ selectedLanguage }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    let language = selectedLanguage.replace('JavaScript', 'JS');

    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?q=language:${language}&sort=stars&page=1`
    })
      .then(response => {
        response.data.total_count === 0
          ? setRepositories([])
          : setRepositories(response.data.items);

        setLoading(false);
        setError(false);
      })
      .catch(er => {
        setError(true);
        setLoading(false);
      });
  }, [selectedLanguage]);

  if (loading) {
    return (
      <div className='overlay'>
        <div className='loading'>
          <div className='loadingbar'>
            <CircularProgress disableShrink />
          </div>
        </div>
      </div>
    );
  } else {
    if (Array.isArray(repositories) && repositories.length) {
      return (
        <ul>
          {repositories.map(repo => (
            <RepoItem key={repo.name} repo={repo} />
          ))}
        </ul>
      );
    } else {
      if (error) {
        return <h1>Erro ao carregar, por favor, tente novamente.</h1>;
      } else return <h1>Não existem repositórios na linguagem selecionada.</h1>;
    }
  }
}

export default RepoList;
