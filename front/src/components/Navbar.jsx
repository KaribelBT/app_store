import React, { Component } from 'react';

class Navbar extends Component {
    create = () => {
        this.props.showCreate(true)
    }
    listApps = () => {
        this.props.showListApps(false)
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
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {this.props.user.isDev ?
                            <ul className="navbar-nav">
                                <li className="nav-item text-center active">
                                    <a className="nav-link" href="#" onClick={() => { this.listApps() }}>List my Apps <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item  text-center active">
                                    <a className="nav-link" href="#" onClick={() => { this.create() }}>Create App <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item  text-center active">
                                    <a className="nav-link" href="#" onClick={() => { this.logout() }}>Logout <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav">
                                <li className="nav-item text-center active">
                                    <a className="nav-link" href="#" onClick={() => { this.logout() }}>Logout <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
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