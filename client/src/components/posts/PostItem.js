import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  post,
  auth: { isAuthenticated, loading, user: authUser },
  isShowPost,
}) => {
  return (
    post !== null && (
      <div
        className={`post bg-light p-1 my-1 mr ${
          !loading &&
          authUser !== null &&
          post.user === authUser._id &&
          isAuthenticated &&
          'my-post'
        }`}
      >
        <div>
          <Link to={`/post/${post._id}`}>
            <h2>
              <strong>{post.title}</strong>
            </h2>
          </Link>
          <p className="my-1">
            {post.text && post.text.length > 200 && !isShowPost
              ? `${post.text.slice(0, 200)}...`
              : post.text}
          </p>
          <p className="post-date">
          Publish at <Moment format="DD/MM/YYYY">{post.date}</Moment>
          </p>
          {!isShowPost && (
            <Link to={`/post/${post._id}`} className="btn btn-success mr">
              <i className="fas fa-comment"></i>{' '}
              <span className="comment-count">{post.comments.length}</span>
            </Link>
          )}
          {isAuthenticated && !isShowPost && (
            <>
              <button
                type="button"
                className="btn btn-white"
                onClick={() => addLike(post._id)}
              >
                <span key={post.likes.length}>{post.likes.length}</span>{' '}
                <i className="fas fa-thumbs-up" />
              </button>
              <button
                type="button"
                className="btn btn-white mr"
                onClick={() => removeLike(post._id)}
              >
                <i className="fas fa-thumbs-down" />
              </button>
            </>
          )}
        
          {!loading &&
            authUser !== null &&
            post.user === authUser._id &&
            isAuthenticated && (
              <>
              <div className="my-2">
                <Link to={`/post-edit/${post._id}`} className="btn btn-success mr" state={{ post: post }}>
                  Edit Post
              </Link>
                <button
                  type="button"
                  className="btn btn-danger mr"
                  onClick={() => deletePost(post._id)}
                >
                  Delete Post <i className="fas fa-times" />
                </button>
              </div>
           
              </>
            )}
        </div>
        <div className="horizontal-center">
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt={post.name} />
            <h4>{post.name}</h4>
          </Link>
        </div>
      </div>
       
    )
  );
};

PostItem.defaultProps = {
  isShowPost: false,
};

PostItem.propTypes = {
  // post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  isShowPost: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
