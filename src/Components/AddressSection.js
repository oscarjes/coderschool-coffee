// AddressSection.js
import React from 'react';
import {PostalCodeElement} from 'react-stripe-elements';

class AddressSection extends React.Component {
  render() {
    return (
      <label>
        Address details
        <PostalCodeElement />
      </label>
    );
  }
};

export default AddressSection;