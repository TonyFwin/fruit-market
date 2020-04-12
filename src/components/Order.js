import React, { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Order extends Component {
  renderOrder = key => {
    const fruit = this.props.fruits[key];
    const count = this.props.order[key];
    const isAvailable = fruit.status === 'available';

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fruit ? fruit.name : 'Fruit'} is no longer available
        </li>
      );
    }
    return (
      <li key={key}>
        {count} {fruit.name}
        {count > 1 ? 's' : ''} {formatPrice(count * fruit.price)}
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fruit = this.props.fruits[key];
      const count = this.props.order[key];
      const isAvailable = fruit && fruit.status === 'available';

      if (isAvailable) {
        return prevTotal + count * fruit.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className='order-wrap'>
        <h2>Order</h2>
        <ul>
          {orderIds.map(this.renderOrder)}
          <div className='total'>
            Total:
            <strong>{formatPrice(total)}</strong>
          </div>
        </ul>
      </div>
    );
  }
}
