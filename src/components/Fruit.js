import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

export default class Fruit extends Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func,
    index: PropTypes.string
  };
  render() {
    const { name, image, desc, price, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <div className='menu-fruit'>
        <img src={image} alt={name} />
        <h3 className='fruit-name'>
          {name}
          <span className='price'>{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          onClick={() => this.props.addToOrder(this.props.index)}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </div>
    );
  }
}
