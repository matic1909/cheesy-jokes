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
  }

  async componentDidMount() {
    // load jokes
    let jokes = [];
    while (jokes.length < this.props.numberOfJokes) {
      const response = await axios({
        url: API_URL,
        headers: { Accept: 'application/json' },
      });
      const joke = { id: response.data.id, joke: response.data.joke };
      jokes.push(joke);
    }
    this.setState({ jokes: jokes });
  }

  render() {
    const jokes = this.state.jokes.map((j) => <Joke joke={j.joke} />);
    return <div className="Jokes">{jokes}</div>;
  }
}
