import React, { Component } from 'react';

class Appdetail extends Component {
    render() {
        return (
            <div className="card form-box">
                <img className="card-img-top text-center" src={this.props.appDetail.app_img_url} alt={this.props.appDetail.app_name} />
                    <div className="card-body text-center">
                        <h5 className="card-title text-center">{this.props.appDetail.app_name}</h5>
                        <p className="card-text text-center">{this.props.appDetail.category_name}</p>
                        <p className="card-text text-center">{this.props.appDetail.app_price}</p>
                        <a href="#" className="btn btn-primary text-center">Buy</a>
                    </div>
            </div>
        )
    }
}
export default Appdetail;