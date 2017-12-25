import React, { Component } from "react";

class AddFoodForm extends Component {
  createFood(event) {
    const food = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    };
    this.props.addFood(food);
    this.foodForm.reset();
}

  render() {
    return (
      <div>
        <form ref={(input) => this.foodForm = input} onSubmit={e => this.createFood(e)}>
          <input
            ref={input => (this.name = input)}
            type="text"
            placeholder="Food Name"
          />
          <input
            ref={input => (this.price = input)}
            type="text"
            placeholder="Food Price"
          />
          <select ref={input => (this.status = input)}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <textarea
            ref={input => (this.desc = input)}
            placeholder="Food Desc"
          />
          <input
            ref={input => (this.image = input)}
            type="text"
            placeholder="Food Image"
          />
          <button type="submit"> + Add Item</button>
        </form>
      </div>
    );
  }
}
export default AddFoodForm;
