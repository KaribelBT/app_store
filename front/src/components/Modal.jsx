import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props)
    }
    closeModal = () =>{
        this.props.modalDisplay('none')
    }
    render() {
        return (
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{"display":this.props.display}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>{this.props.text}</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.closeModal} type="button" className="btn btn-primary">Ok</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default Modal;