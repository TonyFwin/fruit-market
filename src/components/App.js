import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fruit from './Fruit';

import sampleFruits from '../sample-fruits';

export default class App extends Component {
  state = {
    fruits: {},
    order: {}
  };

  addFruit = fruit => {
    // take a copy of the existing state
    const fruits = { ...this.state.fruits };
    // add our new fruit
    fruits[`fruit${Date.now()}`] = fruit;
    // set the new fruit object to state
    this.setState({ fruits });
  };

  addToOrder = key => {
    // take a copy of state
    const order = { ...this.state.order };
    // add to order or update state
    order[key] = order[key] + 1 || 1;
    // call setstate
    this.setState({ order });
  };

  loadSampleFruit = () => {
    this.setState({ fruits: sampleFruits });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Fruit Daily' />
          <ul className='list-of-fruits'>
            {Object.keys(this.state.fruits).map(key => (
              <Fruit
                index={key}
                key={key}
                details={this.state.fruits[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fruits={this.state.fruits} order={this.state.order} />
        <Inventory
          loadSampleFruit={this.loadSampleFruit}
          addFruit={this.addFruit}
        />
      </div>
    );
  }
}
