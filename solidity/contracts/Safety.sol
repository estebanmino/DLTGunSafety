
pragma solidity 0.4.23;

import './Map.sol';
import './Gun.sol';


contract Safety {
    
    // privileges to check a gun with the hash make|model|serialNumber
    mapping(address=>bool) privilegedToCheckGun;
    // privileges to create a gun
    mapping(address=>bool) privilegedToCreateGun;
    
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
    
    constructor(address _manufacturerAddress) public {
        map = new Map();
        // law enforcement
        privilegedToCheckGun[msg.sender] = true;
        // manufacturer
        privilegedToCreateGun[_manufacturerAddress] = true;
        
    }
    
    function createGun(string _make, string _model, string _serialNumber) public onlyPrivilegedToCreateGun() returns (address) {
        // check permission
        // get gun information
        // create new Gun contract
        // associate Gun contract to Map contract mapping
        return map.createGun(_make, _model, _serialNumber, msg.sender);
    }
    
    function checkGun(string _make, string _model, string _serialNumber) constant public 
            onlyPrivilegedToCheckGun() returns (address) {
        // check permission
        // get make|model|serialNumber
        // go to map to retrieve address
        // return cgun contract address 
        return map.checkGun(_make, _model, _serialNumber);
    }
    
    function modifyGunOwner(string _make, string _model, string _serialNumber, address _newOwnerAddress) public returns (bool){
        address gunAddress = map.checkGun(_make, _model, _serialNumber);
        Gun gun = Gun(gunAddress);   
        gun.addOwnerHistory(msg.sender, _newOwnerAddress);
        return true;
    }
    
    function modifyGunOwnerFromAddress(address _gunAddress, address _newOwnerAddress) public returns (bool){
        Gun gun = Gun(_gunAddress);   
        gun.addOwnerHistory(msg.sender, _newOwnerAddress);
        return true;
    }

}