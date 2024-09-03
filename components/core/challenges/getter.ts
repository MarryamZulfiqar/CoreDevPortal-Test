import {ethers} from 'ethers';
import HelloWorldJson from './HelloWorld.json';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const getValue = async (contractAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      HelloWorldJson.abi,
      signer,
    );
    const value = await contract.getGreeting();
    return {value};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default getValue;
