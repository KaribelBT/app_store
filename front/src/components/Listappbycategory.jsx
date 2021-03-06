import React, { Component } from 'react';

class Listappbycategory extends Component {
    idApp = (id) => {
        this.props.getAppSelectedByCategory(id)
    }
    render() {
        return (
            <div className="row">
                <h3 className="text-center">Apps List:</h3>   
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">App Name</th>
                            <th scope="col">App Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.appsByCategory.map(ac => {
                            return (<tr key={ac.id_app} >
                                <td>{ac.id_app}</td>
                                <td>{ac.app_name}</td>
                                <td>{ac.category_name}</td>
                                <td> 
                                    <button onClick={() => { this.idApp(ac.id_app) }} type="button" className="btn btn-primary"><i className="far fa-eye"></i></button>                                    
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Listappbycategory;