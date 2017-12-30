import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Food extends Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === "available";
    const buttonText = isAvailable ? "Add to Order" : "Sold Out";
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-143x143">
            <img src={details.image} alt={details.name} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{details.name}</strong><br />
              <span> {formatPrice(details.price)}</span><br/><br/>
              <span>{details.desc}</span>
            </p>
          </div>
        </div>
        <div className="media-right">
          <button
            onClick={() => this.props.addToOrder(index)}
            disabled={!isAvailable}
            className='button is-dark'
          >
            {buttonText}
          </button>
        </div>
      </article>
    );
  }
}
export default Food;
