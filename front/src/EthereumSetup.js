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
[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"make","type":"string"},{"name":"model","type":"string"},{"name":"serialNumber","type":"string"}],"name":"createGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"make","type":"string"},{"name":"model","type":"string"},{"name":"serialNumber","type":"string"}],"name":"checkGun","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

var safetyAddress = "0xcfda511d361d88e69f920f569a845b7e974007fa";

var safetyContract = web3.eth.contract(safetyABI).at(safetyAddress);

export { safetyContract, web3 }