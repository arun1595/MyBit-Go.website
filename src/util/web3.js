import Web3 from 'web3';
import { debug } from '../constants';

const getWeb3Async = () => {
  if (typeof window === 'undefined') return {}
  if (window.web3) {
    // Injected Web3 detected. Use Mist/MetaMask's provider.
    window.web3 = new Web3(window.web3.currentProvider);
    debug('Metamask Loaded');
  } else {
    // No web3 instance injected, using Local web3.
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    window.web3 = new Web3(provider);
  }
  return window.web3;
};

export default getWeb3Async;
