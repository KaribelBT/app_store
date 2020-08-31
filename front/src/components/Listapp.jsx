import React, { Component } from 'react';

class Listapp extends Component {
    deleteApp = async (id) => {
        let result = await fetch(`http://localhost:3001/api/apps/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        let resp = await result.json();
        if (resp.error) {
            this.props.modalDisplay('block')
            this.props.modalText(resp.error)
        } else {
            this.props.modalDisplay('block')
            this.props.modalText(resp.message)
            this.props.listApp()
        }
    }
    updateApp = (id) => {
        this.props.getApp(id)
    }
    render() {
        return (
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.apps.map(a => {
                            return (<tr key={a.id} >
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.img_url}</td>
                                <td>{a.price}</td>
                                <td> 
                                    <button type="button" onClick={() => { this.updateApp(a.id) }} className="btn btn-success"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => { this.deleteApp(a.id) }} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Listapp;