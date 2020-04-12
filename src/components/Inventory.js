import React, { Component } from 'react';
import AddFruitForm from './AddFruitForm';
import EditFruitForm from './EditFruitForm';

export default class Inventory extends Component {
  render() {
    return (
      <div className='inventory'>
        <h2>Invetory</h2>
        {Object.keys(this.props.fruits).map(key => (
          <EditFruitForm
            key={key}
            index={key}
            updateFruit={this.props.updateFruit}
            deleteFruit={this.props.deleteFruit}
            fruit={this.props.fruits[key]}
          />
        ))}
        <AddFruitForm addFruit={this.props.addFruit} />
        <button onClick={this.props.loadSampleFruit}>Load Sample Fruit</button>
      </div>
    );
  }
}
