import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import Web3 from 'web3';

import Address from './Address';
import '../styles/AccountInfo.css';

const AccountInfo = ({ myBitBalance, ethBalance, userName }) => {

  if(myBitBalance !== 0 || myBitBalance !== 'undefined') {
    let myBitBalanceBN = Web3.utils.toBN(myBitBalance);
    myBitBalance = Web3.utils.fromWei(myBitBalanceBN, 'ether');
  }
  return(
    <div className="AccountInfo">
    <div className="AccountInfo__balance">
      <b className="AccountInfo__balance-header">Balance</b>
      {!ethBalance || !myBitBalance ? (
        <Loading
          className="AccountInfo__balance--is-loading"
          small
          withOverlay={false}
        />
      ) : (
        <span className="AccountInfo__balance-info">
          {myBitBalance} <b className="AccountInfo__balance-myb">MYB</b>
          {Number(ethBalance).toFixed(4)} <b>ETH</b>
        </span>
      )}
    </div>
    <Address className="AccountInfo__address" userName={userName} />
  </div>
  )
}

AccountInfo.defaultProps = {
  myBitBalance: '',
  ethBalance: '',
  userName: '',
};

AccountInfo.propTypes = {
  myBitBalance: PropTypes.string,
  ethBalance: PropTypes.string,
  userName: PropTypes.string,
};

export default AccountInfo;
