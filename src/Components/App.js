import React, { Component } from "react";
import "../App.css";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFoods from "../sampleFoods";
import Food from "./Food";

class App extends Component {
  constructor() {
    super();

    this.addFood = this.addFood.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    
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
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }
  
  render() {
    return (
      <div>
        <Header />
        <ul>
          {
            Object
              .keys(this.state.foods)
              .map(key => <Food key={key} index={key}
              details={this.state.foods[key]}
              addToOrder={this.addToOrder}
              />)
            
           }
        </ul>
        <Order foods={this.state.foods} order={this.state.order} />
        <Inventory addFood={this.addFood} 
        loadSamples={this.loadSamples} />
      </div>
    );
  }
}

export default App;
