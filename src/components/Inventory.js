import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFruitForm from './AddFruitForm';
import EditFruitForm from './EditFruitForm';

export default class Inventory extends Component {
  static propTypes = {
    fruits: PropTypes.object,
    updateFruit: PropTypes.func,
    deleteFruit: PropTypes.func,
    loadSampleFruit: PropTypes.func,
    addFruit: PropTypes.func
  };

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
