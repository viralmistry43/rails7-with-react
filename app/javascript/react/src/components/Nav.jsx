import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from "react-router-dom"

const Nav = (props) => {
  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <ul className="navbar-nav">
                <Link to="/">
                  <li className="nav-item nav-link">
                    Home
                  </li>
                </Link>
                <Link to="/event">
                  <li className="nav-item nav-link">
                    Event
                  </li>
                </Link>
                <Link to="/question-list">
                  <li className="nav-item nav-link">
                    Question List
                  </li>
                </Link>
              </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Nav;
