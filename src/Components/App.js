import React, { Component } from "react";
import "../App.css";
import "font-awesome/css/font-awesome.min.css";
import "bulma/css/bulma.css";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
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

    this.state = {
      foods: {},
      order: {}
    };
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
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="content">
        <div className="hero is-light has-text-centered">
          <img className='logo' src="cs_logo.png" width={93}/>
          <h3 className="title is-2 cafe-name">CoderSchool Cafe</h3>
        </div>
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
            <Payment />
          </div>
        </div>
        <div style={{ marginTop: 100 }}>
          <button onClick={this.loadSamples}>Load Sample Foods</button>
        </div>
      </div>
    );
  }
}

export default App;
