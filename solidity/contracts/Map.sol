pragma solidity 0.4.23;

import './Gun.sol';

contract Map {
    
    mapping(bytes32=>address) gunsMap;
        
    function createGun(string make, string model, string serialNumber, address _manufacturer) public returns (address) {
        bytes32 hashBytes = keccak256(make, model, serialNumber);
        Gun newGun = new Gun(make, model, serialNumber, _manufacturer);
        gunsMap[hashBytes] = newGun;
        return newGun;
    }
    
    function checkGun(string make, string model, string serialNumber) constant public returns (address) {
       bytes32 hashBytes = keccak256(make, model, serialNumber);
        return gunsMap[hashBytes];
    }
    
}