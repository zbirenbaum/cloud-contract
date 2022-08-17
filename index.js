import { getABI, getContract, getProvider } from './utils.js';
import { addEntry } from './firebase.js';
import functions from '@google-cloud/functions-framework'
import path from 'path';
import fs from 'fs';

const loadContractList = () => {
  const fpath = path.join(process.cwd(), "contracts.json");
  const data = fs.readFileSync(fpath, 'utf8'); return JSON.parse(data);
};

const getContractData = async (contract, fields) => {
  return Promise.all(fields.map(async (field) => {
    return [field, await contract.methods[field]().call()];
  }));
}

const mapCb = async (provider, contract_info) => {
  const contract = await getContract(provider, contract_info.address)
  var d = await getContractData(contract, contract_info.fields);
  const timestamp = new Date().getTime();
  return { address: contract_info.address, timestamp: timestamp, fields: Object.fromEntries(d) };
}

export const syncDatabase = async () => {
  const provider = getProvider();
  const contracts_list = await loadContractList();
  const data = await Promise.all(contracts_list.map(mapCb.bind(null, provider)));
  return data;
}

export const syncRun = () => {
  syncDatabase().then(data => {
    data.map(addEntry);
  });
}

functions.cloudEvent('syncRun', cloudEvent => {
  syncRun();
});

