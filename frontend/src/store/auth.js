import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import abi from '../Fake.json';
import abi1 from '../Lock.json';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
        contract1: null
    });

    const [isloggedin, setIsloggedIn] = useState(false);
    const [address, setAddress] = useState(null);
    const connectWallet = async () => {
        // const contractAddress = "0x349807b7F2110d4b478A36428eA97789943E372c"; //Goerli
        const contractAddress = "0x62064443E13287Ae9D077Be407a38a009BE684D3";   //Ganache
        const contractAddress1 = "0xfC0deA8c101AeA08313664fffa25E6e676e2c301";   //Ganache

        const contractABI = abi.abi;
        const contractABI1 = abi1.abi;
        try {
            const { ethereum } = window;
            if (ethereum) {
                const account = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                });
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                const contract1 = new ethers.Contract(
                    contractAddress1,
                    contractABI1,
                    signer
                );
                setAddress(account[0]);
                setState({ provider, signer , contract , contract1 });
            } else {
                alert('Please install and log in to Metamask wallet to initiate the transaction.');
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting to the wallet. Please try again.");
        }
    }

    return (
        <AuthContext.Provider value={{ address, state, connectWallet, isloggedin, setIsloggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};