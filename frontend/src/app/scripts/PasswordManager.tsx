import React, { useEffect, useState } from "react";
import Web3 from "web3";

const contractAddress = "0x3Fa47A2dFC430eef29Cc3c0722fC8c09FBfa0a1B";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "website",
        type: "string",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    name: "addCredentials",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "masterPassword",
        type: "string",
      },
    ],
    name: "setEncryptionKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEncryptionKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVault",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "website",
            type: "string",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
        ],
        internalType: "struct PasswordManager.Credentials[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "masterPassword",
        type: "string",
      },
    ],
    name: "login",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const PasswordManager: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contractInstance, setContractInstance] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const w3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          w3.eth.defaultAccount = (await w3.eth.getAccounts())[0];
          setWeb3(w3);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const w3 = new Web3(window.web3.currentProvider);
        w3.eth.defaultAccount = (await w3.eth.getAccounts())[0];
        setWeb3(w3);
      } else {
        console.error("No Ethereum provider detected");
        return;
      }

      const contractInst = new web3.eth.Contract(contractABI, contractAddress);
      setContractInstance(contractInst);
    };

    init();
  }, []);

  const setEncryptionKey = async () => {
    const masterPasswordInput = document.getElementById("masterPasswordInput")! as HTMLInputElement;
    const masterPassword = masterPasswordInput.value;

    try {
      const result = await contractInstance.methods.setEncryptionKey(masterPassword).send({
        from: web3.eth.defaultAccount,
      });

      document.getElementById("result")!.innerHTML = "Encryption Key Set Successfully!";
      console.log(result);
    } catch (error) {
      console.error("Error setting encryption key:", error);
    }
  };

  const getEncryptionKey = async () => {
    try {
      const result = await contractInstance.methods.getEncryptionKey().call({
        from: web3.eth.defaultAccount,
      });

      document.getElementById("result")!.innerHTML = `Encryption Key: ${result}`;
      console.log(result);
    } catch (error) {
      console.error("Error getting encryption key:", error);
    }
  };

  const login = async () => {
    const masterPasswordInput = document.getElementById("masterPasswordInput")! as HTMLInputElement;
    const masterPassword = masterPasswordInput.value;

    try {
      const result = await contractInstance.methods.login(masterPassword).call({
        from: web3.eth.defaultAccount,
      });

      if (result) {
        document.getElementById("result")!.innerHTML = "Login Successful!";
        // Redirect to the next HTML page (replace 'next_page.html' with your actual HTML file)
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("result")!.innerHTML = "Login Failed!";
      }

      console.log(result);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <input type="text" id="masterPasswordInput" />
      <button onClick={setEncryptionKey}>Set Encryption Key</button>
      <button onClick={getEncryptionKey}>Get Encryption Key</button>
      <button onClick={login}>Login</button>
      <div id="result"></div>
    </div>
  );
};

export default PasswordManager;
