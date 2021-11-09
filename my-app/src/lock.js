import React, { useState } from "react"
import Web3 from "web3"

import LockEth from "./artifacts/contracts/lock.sol/LockEth.json"

export function Lock() {
  const [state, setState] = useState({
    inValue: 0,
    inBlockCount: 1
  })
  const [account, setAccount] = useState(null);

  async function loadWeb3() {
    console.log("loadWeb3");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadAccount() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleConnect = async (e) => {
    e.preventDefault();

    await loadWeb3();
    await loadAccount();
  }

  const handleLock = (e) => {
    e.preventDefault();

    if (!account) {
      alert("You must install MetaMask.");
      return;
    }

    const web3 = window.web3;
    // const lockEth = new web3.eth.Contract(LockEth.abi, "0x2cF2E7d860e7ccA454bC55C5A21fb16b808f8DD3");
    const lockEth = new web3.eth.Contract(LockEth.abi, process.env.REACT_APP_LOCKETH_CONTRACT_ADDRESS);
    const value = web3.utils.toWei(state.inValue, "ether");

    lockEth.methods.deposit(state.inBlockCount).send({from: account,   value: value}).on("receipt", console.log);
  }

  const handleWithdraw = (e) => {
    e.preventDefault();

    if (!account) {
      alert("You must install MetaMask.");
      return;
    }

    const web3 = window.web3;
    const lockEth = new web3.eth.Contract(LockEth.abi, process.env.REACT_APP_LOCKETH_CONTRACT_ADDRESS);

    lockEth.methods.withdraw(account).send({from: account}).on("receipt", console.log);
  }

  return (
    <div className="App">
      { !account
        ? <button onClick={handleConnect}>Connect</button>
        : account
      }
      <br /><br />
      <label htmlFor="inValue">Eth: </label>
      <input name="inValue" id="inValue" value={state.inValue} onChange={handleChange} />eth
      <br />
      <label htmlFor="inBlockCount">Block Count: </label>
      <input name="inBlockCount" id="inBlockCount" value={state.inBlockCount} onChange={handleChange} />
      <br />
      <button onClick={handleLock}>Lock Ether</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  )
}

export default Lock;