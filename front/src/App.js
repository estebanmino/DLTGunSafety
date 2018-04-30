import React, { Component } from 'react';
import './App.css';
import { safetyContract, web3 } from './EthereumSetup';
import Safety from './components/Safety';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinbase: null,
      checkedGunAddress: null,
    }

    this.getCoinbase = this.getCoinbase.bind(this);
    this.createGun = this.createGun.bind(this);
    this.checkGun = this.checkGun.bind(this)
  }


  componentWillMount() {
    this.getCoinbase()
  }
  

  getCoinbase() {
    web3.eth.getCoinbase(function(error, result) {
      this.setState({ coinbase: result });
    }.bind(this))
  }

  checkGun(_make, _model, _serialNumber) {
    safetyContract.checkGun(
      _make, _model, _serialNumber,
      {from: this.state.coinbase},
      function(error, result) {
        this.setState({
          checkedGunAddress: result
        })
        console.log("checkGun", result)        
      }.bind(this)
    ) 
  }

  createGun(_make, _model, _serialNumber) {
    safetyContract.createGun(
      _make, _model, _serialNumber,
      {from: this.state.coinbase},
      function(error, result) {
        console.log("createGun", result)        
      }.bind(this)
    ) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DLT Gun Safety</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Safety 
          checkGun={this.checkGun}
          createGun={this.createGun}
          checkedGunAddress={this.state.checkedGunAddress}
          />
      </div>
    );
  }
}

export default App;
