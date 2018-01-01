import React, { Component } from "react";
import "../App.css";
import "font-awesome/css/font-awesome.min.css";
import "bulma/css/bulma.css";

import Order from "./Order";
import sampleFoods from "../sampleFoods";
import Food from "./Food";
import Payment from "./Payment";

class App extends Component {
  constructor() {
    super();

    this.addFood = this.addFood.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleReceipt = this.handleReceipt.bind(this);

    this.state = {
      foods: {},
      order: {},
      amount: 0,
      processingPayment: "no"
    };
  }

  componentWillMount() {
    this.setState({
      foods: sampleFoods
    });
  }

  addFood(food) {
    const foods = { ...this.state.foods };
    const timestamp = Date.now();
    foods[`food-${timestamp}`] = food;
    this.setState({ foods });
  }

  loadSamples() {
    this.setState({
      foods: sampleFoods
    });
  }

  addToOrder(key) {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    let amount = this.state.amount;
    amount += this.state.foods[key].priceUSD;
    this.setState({ order, amount });
  }

  removeFromOrder(key) {
    const order = { ...this.state.order };
    let amount = this.state.amount;
    amount -= order[key] * this.state.foods[key].priceUSD;
    delete order[key];
    this.setState({ order, amount });
  }

  handleLoading() {
    this.setState({
      processingPayment: "yes"
    });
  }

  handleReceipt(charge) {
    this.setState({
      processingPayment: "done"
    });
  }

  render() {
    let processingPayment = this.state.processingPayment;
    let renderMain = null;
    if (processingPayment === "no") {
      renderMain = (
        <div className="columns">
          <div className="column">
            <h3 className="title is-3">Menu</h3>
            {Object.keys(this.state.foods).map(key => (
              <Food
                key={key}
                index={key}
                details={this.state.foods[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </div>
          <div className="column">
            <Order
              foods={this.state.foods}
              order={this.state.order}
              removeFromOrder={this.removeFromOrder}
            />
            <Payment
              handleLoading={this.handleLoading}
              processingPayment={this.state.processingPayment}
              handleReceipt={this.handleReceipt}
              amount={this.state.amount}
            />
          </div>
        </div>
      );
    } else if (processingPayment === "yes") {
      renderMain = (
        <div className="processing-payment has-text-centered">
          <h1>Processing Payment...</h1>
          <a className="button is-white is-loading">Loading</a>
        </div>
      );
    } else {
      renderMain = (
        <div className="card receipt">
          <div className="card-header">
            <p className="card-header-title is-centered">Receipt</p>
          </div>
          <div className="card-content">
            <div className="content has-text-centered">
              <p>
                Your card was charged ${(this.state.amount / 100).toFixed(2)}.
              </p>
              <p>See you again soon!</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="content">
        <div className="hero is-light has-text-centered">
          <img
            className="logo"
            src="cs_logo.png"
            width={93}
            alt="CoderSchool Logo"
          />
          <h3 className="title is-2 cafe-name">CoderSchool Cafe</h3>
        </div>
        {renderMain}
      </div>
    );
  }
}

export default App;
