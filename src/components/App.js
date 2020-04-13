import React, { Component } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fruit from './Fruit';
import base from '../base';

import sampleFruits from '../sample-fruits';

export default class App extends Component {
  state = {
    fruits: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    //reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fruits`, {
      context: this,
      state: 'fruits'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFruit = fruit => {
    // take a copy of the existing state
    const fruits = { ...this.state.fruits };
    // add our new fruit
    fruits[`fruit${Date.now()}`] = fruit;
    // set the new fruit object to state
    this.setState({ fruits });
  };

  updateFruit = (key, updatedFruit) => {
    const fruits = { ...this.state.fruits };
    fruits[key] = updatedFruit;
    this.setState({ fruits });
  };

  deleteFruit = key => {
    const fruits = { ...this.state.fruits };
    fruits[key] = null;
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

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
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
        <Order
          fruits={this.state.fruits}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          loadSampleFruit={this.loadSampleFruit}
          addFruit={this.addFruit}
          updateFruit={this.updateFruit}
          deleteFruit={this.deleteFruit}
          fruits={this.state.fruits}
        />
      </div>
    );
  }
}
