import React from "react";
import { injectStripe } from "react-stripe-elements";
import CardSection from "./CardSection";

class Cardform extends React.Component {
  constructor(props) {
    super(props);

    this.buttonSubmit = this.buttonSubmit.bind(this);

    this.state = {
        submitted: false,
    };
  }

  buttonSubmit() {
    this.setState({
      submitted: true
    })
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: "Elon Musk" })
      .then(({ token }) => {
        console.log("Received Stripe token:", token);
        this.props.handleLoading();
        return fetch("https://api.stripe.com/v1/charges", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `amount=${this.props.amount}&currency=usd&description=CoderSchoolCoffee&source=${token.id}`
        });
      })
      .then(charge => {
        this.props.handleReceipt();
        console.log(charge);
      });
  };

  render() {
    let button = null;
    if (this.state.submitted) {
      button = <button className="button is-primary is-loading pay-button">Pay</button>
    } else {
      button = <button className="button is-primary pay-button" onClick={this.buttonSubmit}>Pay</button>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        {button}
      </form>
    );
  }
}

export default injectStripe(Cardform);
