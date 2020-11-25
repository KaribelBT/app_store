import React, { Component } from 'react';

class Appdetail extends Component {
    render() {
        return (
            <div className="card form-box">
                <h3 className="card-title text-center">{this.props.appDetail.app_name}</h3>   
                <img className="card-img-top text-center" src={this.props.appDetail.app_img_url} alt={this.props.appDetail.app_name} />
                    <div className="card-body text-center">
                        <p className="card-text text-center">Category: {this.props.appDetail.category_name}</p>
                        <p className="card-text text-center">Price: {this.props.appDetail.app_price}</p>
                        <a href="#" className="btn btn-primary text-center">Add to Cart</a>
                        <a href="#" className="btn btn-primary ml-1 text-center">Add to Wish List</a>
                    </div>
            </div>
        )
    }
}
export default Appdetail;