import axios from 'axios';
import React, { Component } from 'react';
import Joke from './Joke';
const API_URL = 'https://icanhazdadjoke.com/';

export default class Jokes extends Component {
  static defaultProps = {
    numberOfJokes: 15,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
    this.incrementScore = this.incrementScore.bind(this);
    this.decreaseScore = this.decreaseScore.bind(this);
  }

  async componentDidMount() {
    // load jokes
    let jokes = [];
    while (jokes.length < this.props.numberOfJokes) {
      const response = await axios({
        url: API_URL,
        headers: { Accept: 'application/json' },
      });
      const joke = { id: response.data.id, joke: response.data.joke, score: 0 };
      jokes.push(joke);
    }
    this.setState({ jokes: jokes });
  }

  incrementScore(id) {
    const updatedJokes = this.state.jokes.map((joke) => {
      if (joke.id === id) {
        joke.score = joke.score + 1;
      }
      return joke;
    });
    updatedJokes.sort((a, b) =>
      a.score > b.score ? -1 : a.score < b.score ? 1 : 0
    );
    this.setState({ jokes: updatedJokes });
  }

  decreaseScore(id) {
    const updatedJokes = this.state.jokes.map((joke) => {
      if (joke.id === id) {
        joke.score = joke.score - 1;
      }
      return joke;
    });
    updatedJokes.sort((a, b) =>
      a.score > b.score ? -1 : a.score < b.score ? 1 : 0
    );
    this.setState({ jokes: updatedJokes });
  }

  render() {
    const jokes = this.state.jokes.map((j) => (
      <Joke
        joke={j.joke}
        score={j.score}
        id={j.id}
        upvote={this.incrementScore}
        downvote={this.decreaseScore}
      />
    ));
    return <div className="Jokes">{jokes}</div>;
  }
}
