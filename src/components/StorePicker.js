import React, { Component } from 'react';
import { getFunName } from '../helpers';

export default class StorePicker extends Component {
  myInput = React.createRef();

  goToStore = e => {
    e.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <>
        <p>Fish</p>
        <form onSubmit={this.goToStore} className='store-selector'>
          <h2>Please enter a store</h2>
          <input
            type='text'
            ref={this.myInput}
            required
            placeholder='Store Name'
            defaultValue={getFunName()}
          />
          <button type='submit'>Visit Store arrow -> </button>
        </form>
      </>
    );
  }
}
