import React, { Component } from "react";
import Cardform from "./Cardform";
import { StripeProvider, Elements } from "react-stripe-elements";

export default class Payment extends Component {
  render() {
    return (
      <div className="payment">
        <h3 className="title is-3">Ready to Pay?</h3>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC}>
          <Elements>
            <Cardform
              handleLoading={this.props.handleLoading}
              processingPayment={this.props.processingPayment}
              handleReceipt={this.props.handleReceipt}
              amount={this.props.amount}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
