import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),// CONTRACT ABI
  // ADDRESS:
  '0xcbd1269bB26Aa03B94b5A139D1a2D2D24dc9E929'
);

export default instance;
