import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Createapp from './Createapp.jsx'
import Updateapp from './Updateapp.jsx'
import Listapp from './Listapp.jsx'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayModal: 'none',
            text: null,
            apps: [],
            selectedApp:{}
        }
    }
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
    listApp = async ()  => {
        let result = await fetch(`http://localhost:3001/api/apps`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        let resp = await result.json();
        if (resp.appsList.length > 0) {
            this.setState({
                apps: resp.appsList
            })
            this.props.showCreate(false)
            this.setState({
                selectedApp: {}
            })
        }
    }
    getApp = (id) =>{
       let appSelected = this.state.apps.filter(a => a.id == id)
       this.setState({
        selectedApp:appSelected[0]
       })
    }
    componentDidMount() {
        if (this.props.user.isDev) {
            this.listApp()
        }
    }
    render() {
        return (
            <div className="row form-box">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Welcome  {this.props.user.email}</h1>
                            {this.props.displayCreate ?
                                <Createapp 
                                    modalDisplay={this.modalDisplay} 
                                    modalText={this.modalText}
                                    listApp={this.listApp} 
                                />
                                :
                                null
                            }
                            {Object.keys(this.state.selectedApp).length > 0 && !this.props.displayCreate ? 
                                <Updateapp 
                                    modalDisplay={this.modalDisplay} 
                                    modalText={this.modalText} 
                                    selectedApp={this.state.selectedApp}
                                    listApp={this.listApp} 
                                /> :
                                null
                            }
                            {this.state.apps.length > 0 && !this.props.displayCreate && Object.keys(this.state.selectedApp).length == 0 ?
                                <Listapp
                                    apps={this.state.apps}
                                    modalDisplay={this.modalDisplay}
                                    modalText={this.modalText}
                                    listApp={this.listApp}
                                    getApp={this.getApp}
                                /> :
                                null
                            }                            
                        </div>
                    </div>
                </div>
                <Modal text={this.state.text} display={this.state.displayModal} modalDisplay={this.modalDisplay} />
            </div>
        )
    }
}
export default Home;