import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAuth } from "./authContext";
const BCContext = React.createContext();
export function useBlockChainContext() {
  return useContext(BCContext);
}
function BlockchainContext({ children }) {
  const { currentUser, userMainWallet } = useAuth();
  const LatamRPC = "https://rpc.latam-blockchain.com";
  const [balance, setBalance] = useState();

  const checkBalance = async () => {
    if (!userMainWallet) return setBalance("No Wallet");
    setBalance("Cargando");
    const provider = new ethers.providers.JsonRpcProvider(LatamRPC);
    const userBalance = await provider.getBalance(userMainWallet.wallet);
    setBalance(
      `${parseFloat(ethers.utils.formatEther(userBalance)).toFixed(2)}$`
    );
  };

  const confirmPrivKey = (privKey) => {
    const wallet = new ethers.Wallet(privKey);
    return wallet.address === userMainWallet.wallet;
  };

  const retiro = async (privKey, ammount) => {
    const wallet = await new ethers.Wallet(privKey);
    const provider = await new ethers.providers.JsonRpcProvider(LatamRPC);
    const gasPrice = await provider.getGasPrice();
    const walletSigner = await wallet.connect(provider);
    const tx = {
      from: wallet.address,
      to: "0x7cE214bA6fFC5c17E80125282644A2337bDca1a0",
      value: ethers.utils.parseEther(ammount),
      gasLimit: 100000,
      gasPrice: 500000000000,
    };
    const transaction = await walletSigner.sendTransaction(tx);
    checkBalance();
    return transaction;
  };

  const createRandomWallet = () => {
    return ethers.Wallet.createRandom();
  };
  useEffect(() => {
    checkBalance();
  }, [userMainWallet]);
  return (
    <BCContext.Provider
      value={{ createRandomWallet, balance, confirmPrivKey, retiro }}
    >
      {children}
    </BCContext.Provider>
  );
}

export default BlockchainContext;
