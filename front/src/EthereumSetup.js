import Web3 from 'web3';

let web3;

if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    console.log('current provider');
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    console.log('new provider');
}

var safetyABI = 
[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"make","type":"string"},{"name":"model","type":"string"},{"name":"serialNumber","type":"string"}],"name":"createGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"make","type":"string"},{"name":"model","type":"string"},{"name":"serialNumber","type":"string"}],"name":"checkGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

var gunABI = 
[{"constant": false,"inputs": [{"name": "_address","type": "address"}],"name": "addOwnerHistory","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [{"name": "_make","type": "string"},{"name": "_model","type": "string"},{"name": "_serialNumber","type": "string"},{"name": "_manufacturer","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "getOwnersHistory","outputs": [{"name": "","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"}]

var safetyAddress = "0xdb203c3c5ef8e6fd72f5ad07cbdea8a8eef3bd4d";

var safetyContract = web3.eth.contract(safetyABI).at(safetyAddress);

export { gunABI, safetyContract, web3 }