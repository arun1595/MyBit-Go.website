import React from 'react';
import { Modal } from 'carbon-components-react';
import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskNetwork = () => (
  <Modal className="MetamaskAudit" open passiveModal>
    <p className="MetamaskAudit__title">
      The MyBit platform is still in testing,<br />
      please use the Ropsten test network.
    </p>
    <img
      className="MetamaskAudit__metamaskfox-image"
      src={MetamaskLogo}
      alt="Metamask"
    />
    <br />
  </Modal>
);

export default MetamaskNetwork;
