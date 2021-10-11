import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { Component } from 'react';
import Joke from './Joke';
import './Jokes.css';
const API_URL = 'https://icanhazdadjoke.com/';

export default class Jokes extends Component {
  static defaultProps = {
    numberOfJokes: 8,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.joke));
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      this.setState({ loading: true });
      let jokes = [];
      while (jokes.length < this.props.numberOfJokes) {
        const response = await axios({
          url: API_URL,
          headers: { Accept: 'application/json' },
        });
        const newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({
            id: uuidv4(),
            joke: newJoke,
            score: 0,
          });
        }
      }
      this.setState(
        (state) => ({
          jokes: [...state.jokes, ...jokes],
          loading: false,
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    const updatedJokes = this.state.jokes.map((joke) => {
      if (joke.id === id) {
        joke.score = joke.score + delta;
      }
      return joke;
    });
    this.setState({ jokes: updatedJokes }, () =>
      window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.getJokes();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="Jokes-spinner">
          <i className="far fa-8x fa-laugh fa-spin"></i>
          <h1 className="Jokes-title">Asking dad to tell me some jokes...</h1>
        </div>
      );
    }
    const jokes = this.state.jokes
      .sort((a, b) => (a.score > b.score ? -1 : a.score < b.score ? 1 : 0))
      .map((j) => (
        <Joke
          joke={j.joke}
          score={j.score}
          id={j.id}
          handleVote={this.handleVote}
          key={j.id}
        />
      ));
    return (
      <div className="Jokes">
        <div className="Jokes-sidebar">
          <h1 className="Jokes-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughing face"
          />
          <button className="Jokes-getmore" onClick={this.handleClick}>
            Ask Dad
          </button>
        </div>
        <div className="Jokes-jokelist">{jokes}</div>
      </div>
    );
  }
}
