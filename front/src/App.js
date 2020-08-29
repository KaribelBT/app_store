import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
class App extends Component{
  constructor(props){
      super(props)
      this.state={
          showRegister:false
      }
  }
  showRegisterForm = (value) => {
    this.setState({
      showRegister:value
    })
  }
  render () {
    return (
      <div className="container">
        {this.state.showRegister ?<Register showRegisterForm={this.showRegisterForm}/> : <Login showRegisterForm={this.showRegisterForm}/>}  
      </div>
    );
  }
}


export default App;
