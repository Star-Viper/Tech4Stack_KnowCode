import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import abi from '../Fake.json';
import abi1 from '../Lock.json';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));

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

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    setUser(data.msg);


                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ address, state, connectWallet, isloggedin, setIsloggedIn, storeTokenInLS, user, token, address, }}>
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