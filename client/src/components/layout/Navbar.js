import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">medical questions</Link>
      </li>
  
      <li>
        <Link onClick={logout} to="/">
          <span className="hide-sm">Log out</span>{' '}
          <i className="fas fa-sign-out-alt"></i>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
    
       <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">medical questions
</Link>
      </li>
      <li>
        <Link to="/login">Sign in</Link>
      </li>
      <li>
        <Link to="/register">Sign up</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
         {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      <h1>
        <Link to="/">
          <i className="fas fa-user-nurse" /> Health Community
        </Link>
      </h1>
   
    </nav>
  );
};

Navigator.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
