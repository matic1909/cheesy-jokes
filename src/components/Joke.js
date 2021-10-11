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

  getColor() {
    const { score } = this.props;
    if (score >= 15) return '#4caf50';
    if (score >= 12) return '#8bc34a';
    if (score >= 9) return '#cddc39';
    if (score >= 6) return '#ffeb3b';
    if (score >= 3) return '#ffc107';
    if (score >= 0) return '#ff9800';
    return '#f44336';
  }

  getEmoji() {
    const { score } = this.props;
    if (score >= 15) return 'em em-rolling_on_the_floor_laughing';
    if (score >= 12) return 'em em-laughing';
    if (score >= 9) return 'em em-smiley';
    if (score >= 6) return 'em em-slightly_smiling_face';
    if (score >= 3) return 'em em-neutral_face';
    if (score >= 0) return 'em em-confused';
    return 'em em-poop';
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.handleVote}></i>
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.score}
          </span>
          <i className="fas fa-arrow-down" onClick={this.handleVote}></i>
        </div>
        <div className="Joke-text">{this.props.joke}</div>
        <div className="Joke-emoji">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}
