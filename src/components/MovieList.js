import React, { Component } from 'react';

export default class MovieList extends Component {
  render() {
    const { data, likedList, handleClick } = this.props;
    return (
      <div className="movie-list">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div className="row">
                {data.map((movie) => {
                  return (
                    <div className="col-md-4" key={movie.id}>
                      <div className="card my-4">
                        <img
                          className="card-img-top"
                          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                          alt="Card image cap"
                        />
                        <div className="card-body overflow-auto">
                          <h5 className="card-title">{movie.title}</h5>
                          <p className="card-text">{movie.overview}</p>
                        </div>
                        <span
                          className={
                            movie.like
                              ? 'btn btn-danger fas fa-heart like'
                              : 'btn btn-outline-dark fas fa-heart like'
                          }
                          onClick={() => handleClick(movie)}
                        ></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-3">
              <ul className="sidebar list-group list-group-flush my-4">
                <h2>Liked List</h2>
                {likedList.map((movie) => {
                  if (movie.like) {
                    return (
                      <li className="list-group-item" key={movie.id}>
                        {movie.title}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
