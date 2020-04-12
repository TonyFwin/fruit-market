import React, { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Fruit extends Component {
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
