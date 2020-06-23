import React, { useState, useEffect } from "react";

// import { uuid } from 'uuidv4';
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
      api.get('repositories')
      .then(response => {
        setRepos(response.data);
      });   
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: 'https://api.github.com/users/rafa-so',
      title: `Desafio ReactJS ${Date.now()}`,
      techs: [ 'React' ]
    })

    setRepos([ ...repos, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filtred = repos.filter(repo => repo.id !== id);

    setRepos(filtred);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos &&
          repos.map((repos) => {
            return (
              <li key={ repos.id }>
                { repos.title }
      
                <button onClick={() => handleRemoveRepository(repos.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
