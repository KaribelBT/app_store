import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Modal from './components/Modal.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegister: false,
      token: localStorage.getItem('token') ? localStorage.getItem('token') : false,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      displayModal: 'none',
      text: null
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
      user: this.parseJwt(value)
    })
  }
  parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  modalDisplay = (value) => {
    this.setState({
      displayModal: value
    })
  }
  modalText = (value) => {
    this.setState({
      text: value
    })
  }
  render() {
    return (
      <div className="container">
        {Object.keys(this.state.user).length == 0 ?
          <div>
            {this.state.showRegister ?
              <Register
                showRegisterForm={this.showRegisterForm}
                logUser={this.logUser}
                modalDisplay={this.modalDisplay} 
                modalText={this.modalText}
              /> :
              <Login
                showRegisterForm={this.showRegisterForm}
                logUser={this.logUser}
                modalDisplay={this.modalDisplay} 
                modalText={this.modalText}
              />}
          </div> :
          <div>
            <Home user={this.state.user} />
          </div>
        }
        <Modal text={this.state.text} display={this.state.displayModal} modalDisplay={this.modalDisplay}/>
      </div>
    );
  }
}
export default App;
