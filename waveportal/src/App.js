import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json'

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x1847D2f440B2778a3B9A5Fa58Cd5239ce4A7B797";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    try {
    if (!ethereum) {
      console.log("make sure you have metamask");
      return;
    } else {
      console.log("we have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('found authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('no authorized account found');
    }
    } catch (error) {
      console.log(error)
    }
  }
  
  const connectWallet = async () => {
    try{
      const {ethereum} = window;

      if(!ethereum) {
        alert('get metamask');
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

      console.log("connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;