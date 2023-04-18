import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPost, updatePost } from '../../actions/post';

const PostEdit = ({ getPost, updatePost, history, match, post: { post, loading } }) => {

  useEffect(() => {
    const data = getPost(match.params.id).then( (res) => {
      setFormData({
        title: res.title,
        text: res.text,
      });
      console.log(res)
    })
    .catch( e => {
      console.log(e);
    });
    // eslint-disable-next-line
   
  }, []);
  

  const [formData, setFormData] = useState({ title: '', text: '' });
  const { title, text } = formData;


  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Helmet>
        <title>Health Community | Edit Post</title>
      </Helmet>
      <section className="container">
        <div className="post-form bg-light">
          <h3 className="text-primary m-1 mr-2">Edit post </h3>
          <form
            className="form my-1"
            onSubmit={e => {
              e.preventDefault();
              updatePost(post._id,formData,history);
              setFormData({
                title: '',
                text: '',
              });
            }}
          >
            <input
              style={{ width: '93%' }}
              type="text"
              className="m-1 mr-2"
              name="title"
              placeholder="Post title ..."
              value={title}
              onChange={onChange}
              required
            />

            <textarea
              style={{ width: '93%', height: '170px' }}
              className="m-1 mr-2"
              name="text"
              cols={30}
              rows={5}
              required
              placeholder="Post content"
              value={text}
              onChange={onChange}
            />
            <input
              type="submit"
              className="btn btn-primary m-1 mr-2"
              value="Sand"
            />
            <Link className="btn btn-white mr-n" to="/posts">
              Previous
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

PostEdit.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {getPost, updatePost})(withRouter(PostEdit));
