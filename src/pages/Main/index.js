import React from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container'

import { Form, SubmitButton, RepoList } from './styles';

export default class Main extends React.Component {
  state = {
    newRepo: '',
    repositories: [''],
    loading: false,
    search_error: false
  };

  // Recupera repositórios do localStorage
  componentDidMount = () => {
    this.setState({ repositories: JSON.parse(localStorage.getItem('repositories')) })
  }

  // Salva os repositórios no localStorage
  componentDidUpdate = (_, prevState) => {
    const { repositories } = this.state;

    if(prevState.repositories !== repositories)
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }


  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({loading: true, search_error: false});

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        url: response.data.html_url
      };

      this.setState({
        repositories: [...repositories, data],
      });

    } catch (err) {
      this.setState({
        search_error: true,
        newRepo: ''
      });

    } finally {
      this.setState({ loading: false, newRepo: ''});
    }
  }

  removeRepositorie = (name) => {
    const {repositories} = this.state;
    this.setState({
      repositories: repositories.filter( repo => repo.name !== name)
    })
  }

  render() {
    const { newRepo, loading, repositories, search_error} = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt id="gitHubIcon" />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input value={this.state.newRepo} type="text" placeholder="Adicionar repositório" onChange={this.handleInputChange} />
          <SubmitButton loading={loading}>
            { loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
          { search_error && <div style={{color: 'red'}}>* Repositório não encontrado.</div>}
          <RepoList>
            {repositories.map( repo => {
              return (
                <li key={repo.name}>
                  {repo.name}
                  <span>
                    <Link to={'repository/'+ encodeURIComponent(repo.name)}>Detalhes</Link>
                    <a href={repo.url}>Acessar</a>
                    <button onClick={() => this.removeRepositorie(repo.name, this)}>Remover</button>
                  </span>
                </li>
              );
            })}
          </RepoList>
      </Container>
    );
  }
}
