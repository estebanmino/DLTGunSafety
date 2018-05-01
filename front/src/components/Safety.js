import React, { Component } from 'react';
import { gunABI, safetyContract, web3 } from '../EthereumSetup';
import './Gun'
import Gun from './Gun';


class Safety extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createMake: null,
      createModel: null,
      createSerialNumber: null,
      checkMake: null,
      checkModel: null,
      checkSerialNumber: null,
      gunContract: null,
    }

    this.handleCreateGun = this.handleCreateGun.bind(this)
    this.handleCheckGun = this.handleCheckGun.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleCreateGun(event) {
    event.preventDefault();
    this.props.createGun(
      this.state.createMake,
      this.state.createModel,
      this.state.createSerialNumber
    )
  }

  handleCheckGun(event) {
    event.preventDefault();
    this.props.checkGun(
      this.state.checkMake,
      this.state.checkModel,
      this.state.checkSerialNumber
    )
  }

  handleChangeForm(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  render() {
    return (
      <div>
        <div className="container">
          <div className="create-gun">
            <form onSubmit={this.handleCreateGun}>
              <input type="text" placeholder="Make" 
                name="createMake" value={this.state.createMake || ''} 
                onChange={this.handleChangeForm} />

              <input type="text" placeholder="Model" 
                name="createModel" value={this.state.createModel || ''} 
                onChange={this.handleChangeForm} />

              <input type="text" 
                placeholder="Serial Number" 
                name="createSerialNumber" value={this.state.createSerialNumber || ''} 
                onChange={this.handleChangeForm} />
              
              <input type="submit"  value="Create gun" />
            </form>
          </div>
          <div className="check-gun">
            <form onSubmit={this.handleCheckGun}>
              <input type="text" placeholder="Make" 
                name="checkMake" value={this.state.checkMake || ''} 
                onChange={this.handleChangeForm} />

              <input type="text" placeholder="Model" 
                name="checkModel" value={this.state.checkModel || ''} 
                onChange={this.handleChangeForm} />

              <input type="text" 
                placeholder="Serial Number" 
                name="checkSerialNumber" value={this.state.checkSerialNumber || ''} 
                onChange={this.handleChangeForm} />
              
              <input type="submit"  value="Check gun" />
            </form>
            <p>Gun address: {this.props.checkedGunAddress}</p>
            {this.props.checkedGunAddress === null ? 
              this.state.gunContract + 'ppp'
              :
              <button onClick={this.props.retrievegunOwnersHistory}>Get gun history</button>
            }
            <p>{this.props.gunOwnersHistory}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Safety