import React, { Component } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      like: false,
      likedList: [],
      query: ''
    };
    this.getSearch = this.getSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.map((movie) => (movie.like = this.state.like));
        this.setState({
          data: data.results
        });
      })
      .catch((err) => console.log(err));
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

  updateSearch = (e) => {
    this.setState({
      query: e.target.value
    });
  };

  getSearch = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${this.state.query}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.map((movie) => (movie.like = this.state.like));
        this.setState({
          data: data.results
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container d-flex justify-content-center">
          <form
            className="search-form form-inline my-2"
            onSubmit={this.getSearch}
          >
            <input
              className="search-bar form-control"
              type="text"
              value={this.state.query}
              onChange={this.updateSearch}
            />
            <button
              className="search-button btn btn-outline-dark"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
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
