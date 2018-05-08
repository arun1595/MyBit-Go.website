import { promisifyAll } from 'bluebird';
import * as FundingHub from './FundingHub.js';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

var totalContributorsPerAssetID;

export default class FundingHubUtil {
  async load(web3, assetID) {
    const abi = await web3.eth.contract(FundingHub.ABI);
    this.instance = instancePromisifier(abi.at(FundingHub.ADDRESS));
    this.web3 = web3;

    totalContributorsPerAssetID = {};

    this.LogNewFunder = this.instance.LogNewFunder(
      { _assetID: assetID },
      { fromBlock: 0, toBlock: 'latest' }
    );
    this.setEventListeners();
  }

  async setEventListeners() {
    /* Listen for the events */
    let _assetID;
    let _totalContributors = 0;
    this.LogNewFunder.watch(function(e, r) {
      if (!e) {
        _assetID = r['args']['_assetID'];
        _totalContributors += 1;
        totalContributorsPerAssetID[_assetID] = _totalContributors;
      }
    });
  }

  async returnContributers(_assetID) {
    return parseInt(totalContributorsPerAssetID[_assetID], 10);
  }

  async fund(_assetID, _value) {
    let iT = this.instance;
    let w3 = this.web3;

    this.instance.fund.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase, value: this.web3.toWei(_value, 'ether') },
      async function(error, result) {
        if (!error) {
          await iT.fundAsync(_assetID, {
            from: w3.eth.coinbase,
            value: w3.toWei(_value, 'ether'),
            gas: parseInt(result)
          });
        }
      }
    );
  }

  async payout(_assetID) {
    let iT = this.instance;
    let w3 = this.web3;
    this.instance.payout.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async function(error, result) {
        if (!error) {
          await iT.payoutAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10)
          });
        }
      }
    );
  }

  async initiateRefund(_assetID) {
    let iT = this.instance;
    let w3 = this.web3;
    this.instance.initiateRefund.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async function(error, result) {
        if (!error) {
          await iT.initiateRefundAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10)
          });
        }
      }
    );
  }

  async refund(_assetID) {
    let iT = this.instance;
    let w3 = this.web3;
    this.instance.refundAsync.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async function(error, result) {
        if (!error) {
          await iT.refundAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10)
          });
        }
      }
    );
  }
}
