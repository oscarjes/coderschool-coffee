import React, { Component } from 'react';
import Cardform from './Cardform';
import {StripeProvider, Elements} from 'react-stripe-elements';

export default class Payment extends Component {
  render() {
    return (
      <div className='payment'>
        <h3 className='title is-3'>Ready to Pay?</h3>
        <StripeProvider apiKey="pk_test_12345">
          <Elements>
            <Cardform />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}
