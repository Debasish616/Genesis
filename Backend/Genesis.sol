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

    function getVault() public view returns (Credentials[] memory) {
        require(encryptionKeys[msg.sender] != bytes32(0), "Encryption key not set");
        return vaults[msg.sender];
    }
}
