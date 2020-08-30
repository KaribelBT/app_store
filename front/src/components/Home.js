import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Welcome  {this.props.user.email}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;