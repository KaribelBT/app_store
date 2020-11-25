import React, { Component } from 'react';

class Createapp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories:[],
            name: null,
            price: null,
            img_url: null,
            category:null
        }
    }
    async componentDidMount(){
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
    handleCategories = (event) => {
        this.setState({
            category: event.target.value
        })
    }
    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handlePrice = (event) => {
        this.setState({
            price: event.target.value
        })
    }
    handleImgUrl = (event) => {
        this.setState({
            img_url: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        let result = await fetch(`http://localhost:3001/api/apps`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
            },
            body: JSON.stringify({
                "id_category": JSON.parse(this.state.category) ? JSON.parse(this.state.category) : null,
                "name": this.state.name ? this.state.name : null,
                "price": JSON.parse(this.state.price) ? JSON.parse(this.state.price) : null,
                "img_url": this.state.img_url ? this.state.img_url : null
            })
        });
        let resp = await result.json();
        if(resp.app){
            this.props.modalDisplay('block')
            this.props.modalText('App created succesfully')
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
                                <h3 className="text-center">Create your app</h3>   
                                <div className="form-group">
                                    <select onChange={this.handleCategories}  name="categories" className="form-control">
                                        <option value="">Select an app category</option>
                                        {this.state.categories.map(c=>{
                                            return (<option key={c.id}  value={c.id}>{c.name}</option>); 
                                            
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleName} type="text" name="name" tabIndex="1" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handlePrice} type="number" name="price" tabIndex="2" className="form-control" placeholder="Price" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleImgUrl} type="text" name="img_url" tabIndex="1" className="form-control" placeholder="Image Url" />
                                </div>                                
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="submit" name="createApp-submit" tabIndex="4" className="form-control btn btn-login" value="Create App" />
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

export default Createapp;