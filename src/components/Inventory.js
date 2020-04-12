import React, { Component } from 'react';
import AddFruitForm from './AddFruitForm';

export default class Inventory extends Component {
  render() {
    return (
      <div className='inventory'>
        <h2>Invetory</h2>
        <AddFruitForm addFruit={this.props.addFruit} />
        <button onClick={this.props.loadSampleFruit}>Load Sample Fruit</button>
      </div>
    );
  }
}
