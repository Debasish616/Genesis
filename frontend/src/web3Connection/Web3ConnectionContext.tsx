
"use client";


// import React, { createContext } from 'react';
// import {
//     useAddress, useSigner, useStorage
// } from '@thirdweb-dev/react';
// import { Contract, Signer, ethers } from 'ethers';
// import { DataVaultContractAddress } from './networkDetails';

// import DataVaultJson from './DataVault.json'
// import { DataStructInterface } from '@/interfaces/DataInterface';
// import { useDataStore } from '@/store/dataStore';

// interface ContextProps {
//     address: string | undefined,
//     signer: any,
//     uploadFileOnIPFS: (file: File | Blob | {}) => Promise<string>,
//     getJsonFromIpfsHash: (ipfsHash: string) => Promise<{}>,
//     getFileUrlFromIpfsHash: (ipfsHash: string) => Promise<string>,
//     addDataOfUser: (data: DataStructInterface) => Promise<boolean>,
//     getAllDataOfUser: () => Promise<DataStructInterface[]>,
// }

// export const Web3ConnectionContext = createContext<ContextProps>({
//     address: '',
//     signer: "",
//     uploadFileOnIPFS: async () => "",
//     getJsonFromIpfsHash: async () => "",
//     getFileUrlFromIpfsHash: async () => "",
//     addDataOfUser: async () => false,
//     getAllDataOfUser: async () => [],
// });

// const Web3ConnectionWrapper = ({ children }: any) => {
//     const address = useAddress();
//     const storage = useStorage();
//     const signer = useSigner();

//     const [setData, addData] = useDataStore((store) => [store.setData, store.addData])

//     function getContract(): Contract {
//         const DataVaultContract = new ethers.Contract(DataVaultContractAddress, DataVaultJson.abi, signer);
//         return DataVaultContract;
//     }


// export default Web3ConnectionWrapper;

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { DataVaultContractAddress } from "./networkDetails";
import DataVaultJson from './DataVault.json'

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
  
        const contractInst = new web3.eth.Contract(DataVaultJson.abi, DataVaultContractAddress);
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
  