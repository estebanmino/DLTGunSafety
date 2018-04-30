
pragma solidity 0.4.23;

import './Map.sol';

contract Safety {
    
    // privileges to check a gun with the hash make|model|serialNumber
    mapping(address=>bool) privilegedToCheckGun;
    // privileges to create a gun
    mapping(address=>bool) privilegedToCreateGun;
    // privileges to create an entity 
    mapping(address=>bool) privilegedToCreateEntity;
    
    Map map;
    
    // federal agents
    modifier onlyPrivilegedToCheckGun {
        require(privilegedToCheckGun[msg.sender] == true);
        _;
    }
    
    // gun manufacturers ? 
    modifier onlyPrivilegedToCreateGun {
        require(privilegedToCreateGun[msg.sender] == true);
        _;
    }
    
    constructor() public {
        map = new Map();
        privilegedToCheckGun[msg.sender] = true;
        privilegedToCreateGun[msg.sender] = true;
        privilegedToCheckGun[msg.sender] = true;
    }
    
    function createGun(string make, string model, string serialNumber) public onlyPrivilegedToCreateGun() returns (address) {
        // check permission
        // get gun information
        // create new Gun contract
        // associate Gun contract to Map contract mapping
        return map.createGun(make, model, serialNumber, msg.sender);
    }
    
    function checkGun(string make, string model, string serialNumber) public 
            onlyPrivilegedToCheckGun() returns (address) {
        // check permission
        // get make|model|serialNumber
        // go to map to retrieve address
        // return cgun contract address 
        return map.checkGun(make, model, serialNumber);
    }

}