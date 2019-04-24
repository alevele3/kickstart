import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser! AND METAMASK IS RUNNING.
  web3 = new Web3(window.web3.currentProvider);
}else {
  // We are on the SERVER OR the user is not RUNNING METAMASK.
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
      );
      web3 = new Web3(provider);
}

export default web3;
