import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import PostItem from './PostItem';
import { getPosts, getPost} from '../../actions/post';

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth: { loading: authLoading, isAuthenticated },
}) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Helmet>
        <title>Health Community | Posts</title>
      </Helmet>
      <section className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome to the Health community
            </p>
            <Alert />
            {!authLoading && isAuthenticated && (
              <Link to="/post-form" className="btn btn-primary">
              Create a new post
              </Link>
            )}
            <div className="posts">
              {posts.length > 0 &&
                posts.map(post => <PostItem key={post._id} post={post} />)}
            </div>
          </>
        )}
      </section>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts,getPost })(Posts);
