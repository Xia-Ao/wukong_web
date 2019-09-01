import React, {PureComponent, Fragment} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
// import {Provider} from 'react-redux';

import HomeLayout from './view/layout';
import Login from './view/login';

// import Axios from 'axios'

import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        {/* <Provider> */}
          <BrowserRouter>
            <Switch>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/index' component={HomeLayout}></Route>
              <Redirect from='/' to='/index/home'/>
            </Switch>
          </BrowserRouter>
        {/* </Provider> */}
      </Fragment>
    );
  }
}

export default App;
