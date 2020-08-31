import React, { Component } from 'react';

class Listcategory extends Component {
    constructor(props) {
        super(props)
    }
    idCategory = (id) => {
        this.props.getCategory(id)
    }
    render() {
        return (
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.categories.map(c => {
                            return (<tr key={c.id} >
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td> 
                                    <button onClick={() => { this.idCategory(c.id) }} type="button" className="btn btn-primary"><i className="far fa-eye"></i></button>                                    
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Listcategory;