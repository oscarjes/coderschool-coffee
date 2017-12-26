import React, { Component } from "react";
import AddFoodForm from "./AddFoodForm";

class Inventory extends Component {
    render() {
    return (
      <div>
        <button onClick={this.props.loadSamples}>Load Sample Foods</button>
      </div>
    );
  }
}
export default Inventory;
