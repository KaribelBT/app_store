import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Createapp from './Createapp.jsx'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayModal:'none',
            text:null
        }
    }
    modalDisplay = (value) => {
        this.setState({
            displayModal:value
        })
    }
    modalText = (value) => {
        this.setState({
            text:value
        })
    }        
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Welcome  {this.props.user.email}</h1>
                            <Createapp modalDisplay={this.modalDisplay} modalText={this.modalText} />
                        </div>
                    </div>
                </div>
                <Modal text={this.state.text} display={this.state.displayModal} modalDisplay={this.modalDisplay}/>
            </div>
        )
    }
}


export default Home;