import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import DupObjArrRemover from '../../utils/DupObjArrRemover';
import './style.css';

import RepoItem from '../RepoItem';
import Loading from '../Loading';

function RepoList({ selectedLanguage, repositories, setRepositories }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [response, setResponse] = useState({ items: [] });

  const observer = useRef();

  const lastRepoRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => setPageNumber(1), [selectedLanguage]); //volta à pagina 1 caso uma nova linguagem seja selecionada

  useEffect(() => {
    let language = selectedLanguage.replace('JavaScript', 'JS');

    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?q=language:${language}&sort=stars&page=${pageNumber}`
    })
      .then(resp => {
        setResponse(resp.data);
        setHasMore(resp.data.items.length > 0);
        setLoading(false);
        setError(false);
      })
      .catch(er => {
        console.log(er);
        setError(true);
        setLoading(false);
      });
  }, [selectedLanguage, pageNumber]);

  useEffect(() => {
    response.total_count === 0
      ? setRepositories([])
      : setRepositories(() => {
          const temp = [...repositories, ...response.items];
          return DupObjArrRemover(temp);
        });
    /*eslint-disable */
  }, [response]);

  useEffect(() => {
    setRepositories([]);
  }, [selectedLanguage]);

  if (loading) {
    return <Loading />;
  } else {
    if (Array.isArray(repositories) && repositories.length) {
      return (
        <ul>
          {repositories.map((repo, index) => {
            if (repositories.length === index + 1) {
              return (
                <div ref={lastRepoRef} key={repo.id}>
                  <RepoItem repo={repo} />
                </div>
              );
            } else {
              return (
                <div key={repo.id}>
                  <RepoItem repo={repo} />
                </div>
              );
            }
          })}
        </ul>
      );
    } else {
      if (error) {
        return <h1>Erro ao carregar. Por favor, tente novamente.</h1>;
      } else return <h1>Não existem repositórios na linguagem selecionada.</h1>;
    }
  }
}

export default RepoList;
