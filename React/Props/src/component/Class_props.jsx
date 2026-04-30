
/*
Props
Another way of handling component properties is by using props.

Props are like function arguments, and you send them into the component as attribut

class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.color} Car!</h2>;
  }
}
  
*/

import React, { Component } from 'react'
export class Class_props extends Component {
  render() {
    return (
      <div className='col-md-3'>
            <div className="card" style={{ width: "100%" }}>
                <img className="card-img-top" src={this.props.img} alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">{this.props.desc}</p>
                    <a href="#" className="btn btn-primary">See Profile</a>
                </div>
            </div>
        </div>
    )
  }
}

export default Class_props