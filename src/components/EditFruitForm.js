import React, { Component } from 'react';

export default class EditFruitForm extends Component {
  handleChange = e => {
    const updatedFruit = {
      ...this.props.fruit,
      [e.currentTarget.name]: e.currentTarget.value
    };
    this.props.updateFruit(this.props.index, updatedFruit);
  };

  render() {
    const { name, image, desc, price, status } = this.props.fruit;
    return (
      <div className='fruit-edit'>
        <input
          type='text'
          name='name'
          onChange={this.handleChange}
          value={name}
        />
        <input
          type='text'
          name='price'
          onChange={this.handleChange}
          value={price}
        />
        <select name='status' onChange={this.handleChange} value={status}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea
          type='text'
          name='desc'
          onChange={this.handleChange}
          value={desc}
        />
        <input
          type='text'
          name='image'
          onChange={this.handleChange}
          value={image}
        />
        <button onClick={() => this.props.deleteFruit(this.props.index)}>
          Remove Fruit
        </button>
      </div>
    );
  }
}
