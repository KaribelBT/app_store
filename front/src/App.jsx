import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegister: false,
      token:localStorage.getItem('token')? localStorage.getItem('token') : false,
      user:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {}
    }
  }
  showRegisterForm = (value) => {
    this.setState({
      showRegister: value
    })
  }
  logUser = (value) => {
    localStorage.setItem('token', JSON.stringify(value));
    localStorage.setItem('user', JSON.stringify(this.parseJwt(value)));
    this.setState({
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
        {Object.keys(this.state.user).length == 0 ?
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
