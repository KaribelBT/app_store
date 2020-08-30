import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null
        }
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        let result = await fetch(`http://localhost:3001/api/users/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
        });
        let resp = await result.json();
        if (resp.token) {
            this.props.logUser(resp.token)
        } else {
            this.props.modalDisplay('block')
            this.props.modalText(resp.error)
        }
    }
    showRegisterForm = () => {
        this.props.showRegisterForm(true)
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit} id="login-form">
                                <div className="form-group">
                                    <input onChange={this.handleEmail} type="text" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handlePassword} type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="text-center">
                                                <a onClick={this.showRegisterForm} href="#" tabIndex="5" className="forgot-password">Don't have an account? Sign up here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;