import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    create = () => {
        this.props.showCreate(true)
    }
    logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.reload(false);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <div className="logo"></div>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {Object.keys(this.props.user).length > 0 ?
                    <div>
                        {this.props.user.isDev ?
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#" onClick={() => { this.create() }}>Create App <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#" onClick={() => { this.logout() }}>Logout <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                            </div>
                            :
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={() => { this.logout() }}>Logout <span className="sr-only">(current)</span></a>
                            </li>
                        }
                    </div>
                    :
                    null
                }
            </nav>
        )
    }
}

export default Navbar