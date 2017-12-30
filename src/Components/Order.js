import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }

  isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  renderOrder(key) {
    const food = this.props.foods[key];
    const count = this.props.order[key];
    const removeButton = (
      <span
        className="remove-item"
        onClick={() => this.props.removeFromOrder(key)}
      >
        &times;
      </span>
    );

    if (!food || food.status === "unavailable") {
      return (
        <li key={key}>{food ? food.name : "food"} is no longer available!</li>
      );
    }
    return (
      <li key={key}>
        <span>
          <strong>
            {count}x {food.name}
          </strong>
        </span>
        <span>
          {" "}
          {formatPrice(count * food.price)} {removeButton}
        </span>
      </li>
    );
  }

  render() {
    const orderProps = this.props.order;
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
      <div className="order">
        <h3 className="title is-3">Your Order</h3>
        <div className="card">
          <div className="card-content">
            <ul>
              {this.isEmpty(orderProps)
                ? "Nothing yet. Add something from the menu!"
                : orderIds.map(this.renderOrder)}
            </ul>
          </div>
          <footer className="card-footer">
            <span className="subtitle is-5 card-footer-item">
              <strong>Your Total: </strong>
              {formatPrice(total)}
            </span>
          </footer>
        </div>
      </div>
    );
  }
}

export default Order;
