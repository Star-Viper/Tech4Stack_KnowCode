// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceSmartContract {

    struct UserInfo {
        string name;
    }

    // Mapping to store user information using their wallet address
    mapping(address => UserInfo) public users;

    // event UserRegistered(address indexed walletAddress, string name);

    function registerUser(
        string memory _name
    ) external {
        address _walletAddress = msg.sender; // Use the sender's address as the wallet address

        // require(users[_walletAddress].walletAddress == address(0), "User already registered");

        UserInfo memory newUser = UserInfo({
            name: _name
        });

        // Store user information in the mapping
        users[_walletAddress] = newUser;

        // Emit an event to log the registration
        // emit UserRegistered(_walletAddress, _name);
    }

    // Additional functions to retrieve specific user information
    function getUserName(address _walletAddress) external view returns (string memory) {
        return users[_walletAddress].name;
    }

    // Add more functions as needed to retrieve other user information
}
