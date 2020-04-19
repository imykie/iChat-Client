import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { withAuthentication } from './components/Session';

import Navigation from './components/Navigation';
import Admin from './views/Admin';
import Chat from './views/Chat';
import Home from './views/Home';
import Landing from './views/Landing';
import Login from './views/Login';
import Settings from './views/Settings';
import Signup from './views/Signup';

import * as ROUTES from './constants/routes';

const { log } = console;

const routing = ({authState}) => (
    <Router>
      <div className="">
        <Navigation authUser={authState} />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ADMIN} component={Admin} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.CHAT} component={Chat} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
        </Switch>
      </div>
    </Router>
)

const isLoading = (
  <div className="loader">
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  </div>
  
)

const asynCall = () => {
  return new Promise(resolve => setTimeout(() => resolve(), 1500));
}


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount(){
    asynCall().then(() => this.setState({loading: false}))
  }


  render(){
    const {loading} = this.state
    // log(this.props)
    
    return (
      <div>
        <div> { loading? isLoading: routing(this.props) } </div>
      </div>
    )
  }
}

export default withAuthentication(App);
