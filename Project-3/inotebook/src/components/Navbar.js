import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>     //what basically this function does is it just removes the token present in local storage and redirects(via navigate function) the user to login page
  {
    localStorage.removeItem('token');
    navigate('/login')
  }
    let location = useLocation();
    // useEffect(() => {
    // console.log(location.pathname);
    // }, [location])
    
  return (
    <div>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=== "/"?"active":""}`} aria-current="page" to="/">Home</Link> {/* here active makes that content look highlighted.*/ }
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=== "/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className='d-flex'>     {/*once the user has logged in and the user is in the home page, then the only button which should appear is logout and not login/signup. so for the visibility of logout button this logic was implemented that if the token is not empty(that means the user is logged in) then show the logout button and on clicking the logout button handlelogout function was called.*/ }
      <Link className='btn btn-primary mx-2' role='button' to='/login'>Login</Link>
      <Link className='btn btn-primary mx-2' role='button' to='/signup'>Signup</Link>
      </form>: <button onClick={handleLogout} className='btn btn-primary'>Logout</button> }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
