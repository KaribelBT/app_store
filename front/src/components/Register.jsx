import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            isDev: false
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
    handleIsDev = (event) => {
        this.setState({
            isDev: event.target.checked
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        let result = await fetch(`http://localhost:3001/api/users/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
        });
        let resp = await result.json();
        if (resp.id) {
            let resultLogin = await fetch(`http://localhost:3001/api/users/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            });
            let respLogin = await resultLogin.json();
            if (respLogin.token) {
                this.props.logUser(respLogin.token)
            } 
        }else {
            this.props.modalDisplay('block')
            this.props.modalText(resp.error)
        }
    }
    showRegisterForm = () => {
        this.props.showRegisterForm(false)
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit} id="register-form">
                                <div className="form-group">
                                    <input onChange={this.handleEmail} type="text" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handlePassword} type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group text-center">
                                    <input onChange={this.handleIsDev} type="checkbox" tabIndex="3" className="" name="isDev" id="isDev" />
                                    <label htmlFor="isDev"> Click here if you are a developer</label>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="text-center">
                                                <a onClick={this.showRegisterForm} href="#" tabIndex="5" className="forgot-password">Already have an account? Sign in here</a>
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

export default Register;