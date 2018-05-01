import React, { Component } from 'react';

class Gun extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newOwnerAddress: null,
      make: null,
      model: null,
      serialNumber: null
    }

    this.handleChangeForm = this.handleChangeForm.bind(this)
    this.handleModifyGunOwnerFromAddress = this.handleModifyGunOwnerFromAddress.bind(this)
    this.handleModifyGunOwner = this.handleModifyGunOwner.bind(this)
  }

  handleModifyGunOwnerFromAddress(event) {
    event.preventDefault();
    this.props.modifyGunOwnerFromAddress(
      this.props.checkedGunAddress,
      this.state.newOwnerAddress
    )
  }

  handleModifyGunOwner(event) {
    event.preventDefault();
    this.props.modifyGunOwner(
      this.state.make,
      this.state.model,
      this.state.serialNumber,
      this.state.newOwnerAddress
    )
  }

  handleChangeForm(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  render() {
    return (
      <div>
        <p>Gun address: {this.props.checkedGunAddress}</p>
        {this.props.checkedGunAddress === null ? 
          this.state.gunContract
          :
          <div>
            <button onClick={this.props.retrievegunOwnersHistory}>Get gun history</button>
            <p>-</p>
              
          </div>
        }
        <form onSubmit={this.handleModifyGunOwner}>

          <input type="text" placeholder="Make" 
            name="make" value={this.state.make || ''} 
            onChange={this.handleChangeForm} />

          <input type="text" placeholder="Model" 
            name="model" value={this.state.model || ''} 
            onChange={this.handleChangeForm} />

          <input type="text" 
            placeholder="Serial Number" 
            name="serialNumber" value={this.state.serialNumber || ''} 
            onChange={this.handleChangeForm} />

          <input type="text" placeholder="New Owner Address" 
          name="newOwnerAddress" value={this.state.newOwnerAddress || ''} 
          onChange={this.handleChangeForm} />

          <input type="submit"  value="Change owner" />
          </form> 
        <p>{this.props.gunOwnersHistory}</p>
      </div>
    );
  }
}

export default Gun