import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [gender, setGender] = useState('');

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    } else {
      setAlert('Please enter a valid email', 'danger');
      return;
    }

    if (gender === '') {
      setAlert('Gender is required', 'danger');
      return;
    }

    if (password !== password2) {
      setAlert('The passwords do not match', 'danger');
    } else if (
      /^[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      )
    ) {
      register({ name, email, password, gender });
    } else {
      setAlert(
        'Password must include 6 charcaters',
        'danger',
        5
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>{'Health Community | Signup'}</title>
      </Helmet>
      <section className="container">
        <Alert />
        <div className="form-container">
          <h1 className="large text-primary">Signup</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create an account
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                name="email"
                required
              />
              <small className="form-text">
               This site using 
                <b>
                  <a
                    href="https://he.gravatar.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                     Gravatar
                  </a>{' '}
                </b>
                for profile image, so to allow profile image, use this site 
                <b>
                  <a
                    href="https://he.gravatar.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Gravatar
                  </a>
                </b>
              </small>
            </div>
            <div className="form-group">
              <span>
                <h4>Gender</h4>
              </span>
              <p>
                <span>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={'male'}
                      onClick={() => setGender('male')}
                    />
                  </label>
                  <span> Male &nbsp;&nbsp;&nbsp;</span>
                </span>
                <span>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={'female'}
                      onClick={() => setGender('female')}
                    />
                  </label>
                  <span> female  &nbsp;&nbsp;&nbsp;</span>
                </span>
              </p>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <small className="form-text tiny">
                  The password must be 6 chracaters or more
              </small>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="SIgnup" />
          </form>
          <p className="my-1">
            Already have account? <Link to="/login">Signin</Link>
          </p>
        </div>
      </section>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
