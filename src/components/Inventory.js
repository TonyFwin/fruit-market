import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import AddFruitForm from './AddFruitForm';
import EditFruitForm from './EditFruitForm';
import Login from './Login';
import base, { app } from '../base';

export default class Inventory extends Component {
  static propTypes = {
    fruits: PropTypes.object,
    updateFruit: PropTypes.func,
    deleteFruit: PropTypes.func,
    loadSampleFruit: PropTypes.func,
    addFruit: PropTypes.func
  };

  state = {
    uid: null,
    owner: null,
    loading: true
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
    this.setState({ loading: false });
  }

  authHandler = async authData => {
    // look up current store in fireabse
    const store = await base.fetch(this.props.storeId, { context: this });
    // claim it if no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //set the state of inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    app.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner</p>
          {logout}
        </div>
      );
    }

    return (
      <div className='inventory'>
        <h2>Invetory</h2>
        {logout}
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
