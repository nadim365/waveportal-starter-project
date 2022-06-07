import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the Ethereum Object", ethereum);
      }
      /*
      * Check if we're authorized to access the user's wallet so that 
      * user can login with their wallet.
      * Here we use a special method called: "eth_acounts" to see 
      * if we are authorized to access the user's wallet.
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an Authorized account:", account);
        setCurrentAccount(account)
      }
      else {
        console.log("No Authorized account found.")
      }
    }
    catch (error) {
      console.log(error);
    }
  }
/*
* Here we use the eth_requestAccounts method to get the users public wallet.
* And we only show the connectWallet button if we dont have a currentAccount.
* if we have a currentAccount, then we already have access to an 
* authorized account in the users waller. 
*/
  const connectWallet = async () => {

    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch (error) {
      console.log(error);
    }
  }
  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Welcome to the metaverse!
        </div>

        <div className="bio">
          I am Nadimul and this is my first Web3.0 project where I learn to create smart contracts. Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={null}>
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

export default App