import React, { Component } from "react";
import AddFoodForm from "./AddFoodForm";

class Inventory extends Component {
    render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFoodForm addFood={this.props.addFood} />
        <button onClick={this.props.loadSamples}>Load Sample Foods</button>
      </div>
    );
  }
}
export default Inventory;
