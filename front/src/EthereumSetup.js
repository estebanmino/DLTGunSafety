import Web3 from 'web3';

let web3;

if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    console.log('current provider');
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    console.log('new provider');
}

var safetyABI = 
[{"inputs":[{"name":"_manufacturerAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_make","type":"string"},{"name":"_model","type":"string"},{"name":"_serialNumber","type":"string"}],"name":"createGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_make","type":"string"},{"name":"_model","type":"string"},{"name":"_serialNumber","type":"string"}],"name":"checkGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_make","type":"string"},{"name":"_model","type":"string"},{"name":"_serialNumber","type":"string"},{"name":"_newOwnerAddress","type":"address"}],"name":"modifyGunOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gunAddress","type":"address"},{"name":"_newOwnerAddress","type":"address"}],"name":"modifyGunOwnerFromAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
var gunABI = 
[{"constant":true,"inputs":[],"name":"getOwnersHistory","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_msgSender","type":"address"},{"name":"_address","type":"address"}],"name":"addOwnerHistory","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_make","type":"string"},{"name":"_model","type":"string"},{"name":"_serialNumber","type":"string"},{"name":"_manufacturer","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

var safetyAddress = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";

var safetyContract = web3.eth.contract(safetyABI).at(safetyAddress);

export { gunABI, safetyContract, web3 }