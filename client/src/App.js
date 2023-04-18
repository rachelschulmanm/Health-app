import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import NotFound from './components/layout/NotFound';
import Dashboard from './components/dashboard/Dashboard';


import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';
import PostForm from './components/posts/PostForm';
import PostEdit from './components/posts/PostEdit';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>{'Medical House'}</title>
        </Helmet>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/post-form" component={PostForm} />
          <PrivateRoute exact path="/post-edit/:id" component={PostEdit} />
        
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
