import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

// here a and href have been replaced by Link and to respectively.
export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">{props.title}</Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div className="form-check form-switch">
            <input className="form-check-input my-3" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
            <label className={`form-check-label text-${props.mode=== 'light'?'dark':'light'}`} htmlFor="flexSwitchCheckDefault"></label>
          </div>        
      <ul className="navbar-nav me-auto mb-3 mb-lg-0">
      
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">Abous Us</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {props.aboutText}
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/">Action</Link></li>
            <li><Link className="dropdown-item" to="/">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/">Something else here</Link></li>
          </ul> 
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>   
  )
}
Navbar.propTypes = {title: PropTypes.string}

Navbar.defaultProps = 
{
    aboutText: 'Link'
}