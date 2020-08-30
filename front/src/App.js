import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegister: false,
      logUser: null,
      user:{}
    }
  }
  showRegisterForm = (value) => {
    this.setState({
      showRegister: value
    })
  }
  logUser = (value) => {
    this.setState({
      logUser: value,
      user:this.parseJwt(value)
    })
  }

  parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
  render() {
    return (
      <div className="container">
        {!this.state.logUser ?
          <div>
            {this.state.showRegister ?
              <Register
                showRegisterForm={this.showRegisterForm}
                logUser={this.logUser}
              /> :
              <Login
                showRegisterForm={this.showRegisterForm}
                logUser={this.logUser}
              />}
          </div> :
          <div>
            <Home user={this.state.user} />
          </div>
        }
      </div>
    );
  }
}


export default App;
