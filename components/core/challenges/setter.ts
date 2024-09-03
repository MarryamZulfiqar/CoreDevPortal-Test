import {ethers} from 'ethers';
import HelloWorldJson from './HelloWorld.json';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const setValue = async (contractAddress: string, value: string) => {
  try {
    // Check if window.ethereum is available
    if (!window.ethereum) {
      throw new Error('Ethereum provider not found. Please install MetaMask.');
    }

    // Create a provider and get the signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    // Instantiate the contract
    const contract = new ethers.Contract(
      contractAddress,
      HelloWorldJson.abi,
      signer,
    );

    // Call the setGreeting method
    const transactionResult = await contract.setGreeting(value, {
      gasLimit: 500000, // Adjust as needed
    });

    // Wait for the transaction to be mined
    const receipt = await transactionResult.wait();
    return {hash: receipt.transactionHash};
  } catch (error) {
    return {error: error.message};
  }
};

export default setValue;
