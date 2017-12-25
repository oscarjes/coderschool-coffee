import React, { Component } from "react";

class Food extends Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 
    'Sold Out';
    return (
      <li>
        <img src={details.image} alt={details.name} />
        <h3>
          {details.name}
          <span>{details.price}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => this.props.addToOrder(index)}
        disabled={!isAvailable}>{buttonText}</button>
      </li>
    );
  }
}
export default Food;
