import React, { Component } from 'react';

export default class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote() {
    this.props.upvote(this.props.id);
  }

  handleDownvote() {
    this.props.downvote(this.props.id);
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-score">
          <span className="Joke-score-up" onClick={this.handleUpvote}>
            ↑
          </span>
          {this.props.score}
          <span className="Joke-score-down" onClick={this.handleDownvote}>
            ↓
          </span>
        </div>
        <p className="Joke-text">{this.props.joke}</p>
      </div>
    );
  }
}
