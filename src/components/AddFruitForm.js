import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddFruitForm extends Component {
  static propTypes = {
    addFruit: PropTypes.func
  };

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFruit = event => {
    event.preventDefault();

    const fruit = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };

    this.props.addFruit(fruit);
    // refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className='fruit-edit' onSubmit={this.createFruit}>
        <input name='name' ref={this.nameRef} type='text' placeholder='Name' />
        <input
          name='price'
          ref={this.priceRef}
          type='text'
          placeholder='Price'
        />
        <select name='status' ref={this.statusRef}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea name='desc' ref={this.descRef} placeholder='Desc' />
        <input
          name='image'
          ref={this.imageRef}
          type='text'
          placeholder='Image'
        />
        <button type='submit'>Add Fruit</button>
      </form>
    );
  }
}
