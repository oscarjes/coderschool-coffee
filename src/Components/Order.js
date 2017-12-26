import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
  
    renderOrder(key) {
      const food = this.props.foods[key];
      const count = this.props.order[key];
      const removeButton = (
        <span className="remove-item" onClick={() => this.props.removeFromOrder(key)}>&times;</span>
      );

      if (!food || food.status === "unavailable") {
        return (
          <li key={key}>{food ? food.name : "food"} is no longer available!</li>
        );
      }
      return (
          <li key={key}>
              <span><strong>{count}x {food.name}</strong></span>
              <span> ({formatPrice(count * food.price)}) {removeButton}</span>
          </li>
      )
}

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const food = this.props.foods[key];
      const count = this.props.order[key];
      const isAvailable = food && food.status === "available";
      if (isAvailable) {
        return prevTotal + (count * food.price || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className='order'>
        <h3 className='title is-3'>Your Order</h3>
        <div className='card'>
          <div className='card-content'>
            <ul>
              {orderIds.map(this.renderOrder)}
            </ul>
          </div>
          <footer class="card-footer">
            <span className='subtitle is-5 card-footer-item'><strong>Your Total:</strong> {formatPrice(total)}</span>
          </footer>
        </div>
      </div>
    );
  }
}

export default Order;
