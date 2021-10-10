import axios from 'axios';
import React, { Component } from 'react';
const API_URL = 'https://icanhazdadjoke.com/';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    const response = await axios({
      url: API_URL,
      headers: { Accept: 'application/json' },
    });
    const joke = { id: response.data.id, joke: response.data.joke };
    this.setState((state) => ({
      jokes: [...state.jokes, joke],
    }));
  }

  render() {
    const jokes = this.state.jokes.map((j) => <p>{j.joke}</p>);
    return <div>{jokes}</div>;
  }
}
