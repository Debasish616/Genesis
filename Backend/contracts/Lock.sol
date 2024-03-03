// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Arrays.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract PasswordManager {
    using Strings for uint256;
    using Arrays for bytes;

    struct Credentials {
        string website;
        string username;
        string password;
    }

    mapping(address => bytes32) private encryptionKeys;
    mapping(address => Credentials[]) private vaults;

    function setEncryptionKey(string memory masterPassword) public {
        bytes32 hashedMasterPassword = keccak256(abi.encodePacked(masterPassword));
        bytes32 privateKey = bytes32(uint256(keccak256(abi.encodePacked(msg.sender))));
        bytes32 derivedKey = keccak256(abi.encodePacked(hashedMasterPassword, privateKey));
        encryptionKeys[msg.sender] = derivedKey;
    }

    function getEncryptionKey() public view returns (bytes32) {
        return encryptionKeys[msg.sender];
    }

    function login(string memory masterPassword) public view returns (bool) {
        bytes32 hashedMasterPassword = keccak256(abi.encodePacked(masterPassword));
        bytes32 privateKey = bytes32(uint256(keccak256(abi.encodePacked(msg.sender))));
        bytes32 derivedKey = keccak256(abi.encodePacked(hashedMasterPassword, privateKey));
        return encryptionKeys[msg.sender] == derivedKey;
    }

    function addCredentials(string memory website, string memory username, string memory password) public {
        require(encryptionKeys[msg.sender] != bytes32(0), "Encryption key not set");
        vaults[msg.sender].push(Credentials(website, username, password));
    }

    function getVault() public view returns (uint256[] memory, string[] memory, string[] memory, string[] memory) {
    require(encryptionKeys[msg.sender] != bytes32(0), "Encryption key not set");
    
    Credentials[] memory credentials = vaults[msg.sender];
    
    uint256[] memory indices = new uint256[](credentials.length);
    string[] memory websites = new string[](credentials.length);
    string[] memory usernames = new string[](credentials.length);
    string[] memory passwords = new string[](credentials.length);

    for (uint256 i = 0; i < credentials.length; i++) {
        indices[i] = i + 1; // Start index from 1
        websites[i] = credentials[i].website;
        usernames[i] = credentials[i].username;
        passwords[i] = credentials[i].password;
    }

    return (indices, websites, usernames, passwords);
}
    function updateCredentials(uint256 index, string memory newWebsite, string memory newUsername, string memory newPassword) public {
        require(index < vaults[msg.sender].length, "Index out of bounds");
        vaults[msg.sender][index] = Credentials(newWebsite, newUsername, newPassword);
    }

   function deleteCredentials(uint256 index) public {
    require(index > 0 && index <= vaults[msg.sender].length, "Index out of bounds");
    if (vaults[msg.sender].length > 1) {
        uint256 arrayIndex = index - 1; // Convert to array index
        vaults[msg.sender][arrayIndex] = vaults[msg.sender][vaults[msg.sender].length - 1];
    }
    vaults[msg.sender].pop();
}

}
