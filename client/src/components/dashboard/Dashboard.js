import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {user ? `Health Community | ${user.name}` : 'Health Community | main text'}
        </title>
      </Helmet>
      <section className="container">
        <Alert />
       
          <>
            <h1 className="large text-primary"></h1>
            <div style={{ width: '15%' }}>
              {user !== null && (
                <img className="round-img" src={user.avatar} alt={user.name} />
              )}
            </div>
            <p className="lead">
              <i className="fas fa-user"></i>{' '}
              {(user && user.gender === 'male' && `Welcome ${user.name}`) ||
                (user &&
                  user.gender === 'female' &&
                  `Welcome ${user.name}`) ||
                (user === null && 'Welcome')}
            </p>

            <div>
              Add your text here
            </div>
      
          
            <div className="my-2 float-right">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> Delete Account
              </button>
            </div>
          </>
        
      </section>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
