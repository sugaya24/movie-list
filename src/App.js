import React, { Component } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

console.log(process.env.REACT_APP_API_KEY);

export default class App extends Component {
  state = {
    data: [],
    like: false,
    likedList: []
  };

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.map((movie) => (movie.like = this.state.like));
        this.setState({
          data: data.results
        });
      })
      .catch((err) => console.log(err, 'catch something error'));
  };

  handleClick = (movie) => {
    this.state.data.map((item) => {
      if (item.id === movie.id) {
        if (movie.like) {
          movie.like = false;
        } else {
          movie.like = true;
          movie.likedAt = new Date();
        }
      }
    });
    this.state.likedList = this.state.data.filter((item) => {
      if (item.like) return item;
    });
    this.state.likedList.sort(
      (a, b) => b.likedAt.getTime() - a.likedAt.getTime()
    );
    this.setState({
      data: this.state.data,
      likedList: this.state.likedList
    });
  };

  render() {
    return (
      <div>
        <Header />
        <MovieList
          data={this.state.data}
          like={this.state.like}
          likedList={this.state.likedList}
          handleClick={this.handleClick}
        />
        <Footer />
      </div>
    );
  }
}
