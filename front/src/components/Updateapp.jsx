import React, { Component } from 'react';

class Updateapp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedApp:{},
            categories:[]
        }
    }
    async componentDidMount(){
       this.setState({
           selectedApp:this.props.selectedApp
       })
       let result = await fetch(`http://localhost:3001/api/categories`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
            },
        });
        let resp = await result.json();
        if(resp.length>0){
            this.setState({
                categories:resp
            })
        }
    }
    handlePrice = (event) => {
        let newState = Object.assign({}, this.state)
        newState.selectedApp.price = event.target.value
        this.setState(newState)
    }
    handleImgUrl = (event) => {
        let newState = Object.assign({}, this.state)
        newState.selectedApp.img_url = event.target.value
        this.setState(newState)
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        let result = await fetch(`http://localhost:3001/api/apps/${this.state.selectedApp.id}`, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
            },
            body: JSON.stringify({
                "price": JSON.parse(this.state.selectedApp.price) ? JSON.parse(this.state.selectedApp.price) : null,
                "img_url": this.state.selectedApp.img_url ? this.state.selectedApp.img_url : null
            })
        });
        let resp = await result.json();
        if(resp.appUpdated){
            this.props.modalDisplay('block')
            this.props.modalText('App updated succesfully')
            this.props.listApp()
        }else{
            this.props.modalDisplay('block')
            this.props.modalText(resp.error)
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit}>
                                <h3 className="text-center">Modify your app</h3>   
                                <div className="form-group">
                                    <select disabled="disabled"  name="categories" className="form-control" value={this.state.selectedApp.id_category}>
                                        {this.state.categories.map(c=>{
                                            return (<option  key={c.id}  defaultValue={c.id}>{c.name}</option>); 
                                            
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input disabled="disabled" type="text" name="name" tabIndex="1" className="form-control" placeholder="Name" defaultValue={this.state.selectedApp.name} />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handlePrice} type="number" name="price" tabIndex="2" className="form-control" placeholder="Price" defaultValue={this.state.selectedApp.price} />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleImgUrl} type="text" name="img_url" tabIndex="1" className="form-control" placeholder="Image Url" defaultValue={this.state.selectedApp.img_url} />
                                </div>                                
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" name="updateApp-submit" tabIndex="4" className="form-control btn btn-login" value="Update App" />
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

export default Updateapp;