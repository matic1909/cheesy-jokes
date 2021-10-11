import React, { Component } from 'react';
import './Joke.css';

export default class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(e) {
    let delta = 1;
    if (e.target.classList.contains('fa-arrow-down')) {
      delta = -1;
    }
    this.props.handleVote(this.props.id, delta);
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.handleVote}></i>
          <span>{this.props.score}</span>
          <i className="fas fa-arrow-down" onClick={this.handleVote}></i>
        </div>
        <div className="Joke-text">{this.props.joke}</div>
      </div>
    );
  }
}
