import Web3 from 'web3';
// TODO: Make keys env variables
const infura_key = process.env.INFURA_KEY;
const arbiscan_key = process.env.ARBISCAN_KEY
const b_url = 'https://api.arbiscan.io/api?module=contract&action=getabi&apikey=' + arbiscan_key + '&address='

export const getProvider = function () {
  const infura_url = 'https://arbitrum-mainnet.infura.io/v3/' + infura_key;
  return new Web3(new Web3.providers.HttpProvider(infura_url));
}

export const getABI = async function (address) {
  const url = b_url + address;
  return fetch(url)
    .then((resp) => { return resp.json(); })
    .then((json) => { return JSON.parse(json.result); });
}

export const getContract = async function (provider, address) {
  return getABI(address).then(abi => {
    return new provider.eth.Contract(abi, address);
  });
}

