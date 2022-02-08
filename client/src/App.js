import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CONSTANTS from './constant'
import Nav from './components/Nav';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import TaskList from './components/TaskList';
import SignInFrom from './components/forms/SignInForm'
import SignUpFrom from './components/forms/SignUpForm'
import TaskForm from './components/forms/TaskForm'
import { authRefresh } from './actions/authCreators'
import NotFound from './components/NotFound'
import CustomRoute from './components/CustomRoute';
import './App.css';

function App(props) {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
    if (refreshToken) {
      dispatch(authRefresh(refreshToken))
    }
  }, [])



  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <PrivateRoute exact path="/" component={TaskList} />
          <PrivateRoute exact path="/add-task" component={TaskForm} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <CustomRoute exact path="/sign-in" component={SignInFrom} />
          <CustomRoute exact path="/sign-up" component={SignUpFrom} />
          <Route path="*" component={NotFound}>
          </Route>
        </Switch>
      </Router>
    </>
  );
}



export default App

