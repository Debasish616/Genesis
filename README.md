
# Genesis: Your Passwords, Your Privacy, Your Peace of Mind.

## Introduction

Genesis is a decentralized password manager application deployed on the Polygon Mumbai Testnet. It uses a unique encryption algorithm that combines the user's master password and their Metamask address to generate an encryption key. This key is used for encrypting and decrypting the user's passwords securely.

## Features

- **Decentralized:** Genesis is deployed on the Polygon Mumbai Testnet, ensuring decentralization and security.
- **Unique Encryption:** The encryption key is derived from the user's master password and Metamask address, ensuring secure storage and retrieval of passwords.
- **Password Storage:** The application uses a mapping structure to store user credentials securely.

## Usage

1. **Install Dependencies:** Ensure you have Hardhat, Solidity, Metamask and Polygon-Mumbai Testnet(with some matic on the testnet ) installed on your system.
2. **Clone the Repository:** Clone the Genesis repository to your local machine.
   ```bash
   git clone https://github.com/Debasish616/Genesis
   ```
3. **Install Dependencies:** Install "Live Server"(Open VSCode and type `ctrl+P`, type `ext install ritwickdey.liveserver`) OR "Live Preview"(`https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server`) VSCode :

4. **Access the Application:** Open your web browser and navigate to `http://localhost:5500` to access the Genesis application.



## Security

- **Encryption Key:** The encryption key is generated using a combination of the user's master password and Metamask address, ensuring secure storage and retrieval of passwords. This encryption key is deleted after the user logs out.
- **Decentralization:** Genesis is deployed on the Polygon Mumbai Testnet, ensuring decentralization and security.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


