// CardSection.js
import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <CardElement style={{base: {fontSize: '18px'}}} />
    );
  }
};

export default CardSection;