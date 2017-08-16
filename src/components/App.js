import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router';
import { isUserSignedIn, loadUserData } from 'blockstack';
import '../stylesheets/sass/all.scss';

import Navbar from './navbar/navbar';
import Home from './home/home';
import SignInPage from './session/signin_page';
import BlogForm from './blogs/blog_form/blog_form_container';
import Blog from './blogs/blog';
import Blogs from './blogs/blogs';

import { requestBlogs } from '../actions/blog_actions';
import {
  createUser,
  receiveCurrentUser,
  requestUsers
} from '../actions/user_actions';

window.isUserSignedIn = isUserSignedIn;
window.loadUserData = loadUserData;

class App extends React.Component {
  componentDidMount() {
    this.props.requestBlogs();
  }

  render() {
    return (
      <div id='app'>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/signin' component={SignInPage}></Route>
          <Route exact path='/blogs/new'  component={BlogForm}></Route>
          <Route exact path='/blogs/edit/:id' component={BlogForm}></Route>
          <Route exact path='/blogs/show/:id' component={Blog}></Route>
          <Route exact path='/blogs/:username' component={Blogs}></Route>
          {/* <Route exact path='/users/:username' component={Profile}></Route> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  users: state.users.index,
  blogs: state.blogs.index,
  blogIndex: state.blogs.blogIndex,
});

const mapDispatchToProps = dispatch => ({
  requestBlogs: () => dispatch(requestBlogs()),
  requestUsers: () => dispatch(requestUsers()),
  receiveCurrentUser: currentUser => dispatch(receiveCurrentUser(currentUser)),
  createUser: (newUser, users) => dispatch(createUser(newUser, users)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
