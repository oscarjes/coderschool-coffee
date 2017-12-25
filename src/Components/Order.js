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

    if (!food || food.status === "unavailable") {
      return (
        <li key={key}>{food ? food.name : "food"} is no longer available!</li>
      );
    }
    return (
        <li key={key}>
            <span>{count}{food.name}</span>
            <span>{(count * food.price)}</span>
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
      <div>
        <h2>Your Order</h2>
        <ul>
          {orderIds.map(this.renderOrder)}
          <li>
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
