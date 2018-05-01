pragma solidity 0.4.23;

import './Gun.sol';

contract Map {
    
    mapping(bytes32=>address) gunsMap;
        
    function createGun(string _make, string _model, string _serialNumber, address _manufacturer) public returns (address) {
        bytes32 hashBytes = keccak256(_make, _model, _serialNumber);
        Gun newGun = new Gun(_make, _model, _serialNumber, _manufacturer);
        gunsMap[hashBytes] = newGun;
        return newGun;
    }
    
    function checkGun(string _make, string _model, string _serialNumber) constant public returns (address) {
       bytes32 hashBytes = keccak256(_make, _model, _serialNumber);
        return gunsMap[hashBytes];
    }
    
}