import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class Order extends Component {
  static propTypes = {
    fruits: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  renderOrder = key => {
    const fruit = this.props.fruits[key];
    const count = this.props.order[key];
    const isAvailable = fruit && fruit.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if (!fruit) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fruit ? fruit.name : 'Fruit'} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component='span' className='count'>
              <CSSTransition
                classNames='count'
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count} </span>
              </CSSTransition>
            </TransitionGroup>
            {fruit.name}
            {count > 1 ? 's' : ''} {formatPrice(count * fruit.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>X</button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component='ul' className='order'>
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className='total'>
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
