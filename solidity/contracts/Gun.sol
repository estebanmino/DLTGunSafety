pragma solidity 0.4.23;

import './Safety.sol';

contract Gun {
    
    string make;
    string model;
    string serialNumber;
    
    address[] ownersHistory;
    
    constructor(string _make, string _model, string _serialNumber, address _manufacturer) public {
        make = _make;
        model = _model;
        serialNumber = _serialNumber;
        ownersHistory.push(_manufacturer);
    }
    
    function addOwnerHistory(address _msgSender, address _address) public returns (bool) {
        require(_msgSender == ownersHistory[ownersHistory.length - 1]);
        ownersHistory.push(_address);
        return true;
    }
    
    function getOwnersHistory() constant public returns (address[]) {
        return ownersHistory;
    }
    
}