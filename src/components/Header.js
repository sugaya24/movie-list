import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav4"
              aria-controls="navbarNav4"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">
              Movie List
            </a>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link mr-2" href="#">
                    <span className="text-white fas fa-bell"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <div className="btn btn-outline-light">Login</div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
