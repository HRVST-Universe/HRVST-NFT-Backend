import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const connection = new Connection(clusterApiUrl('devnet'));
export const sdk = ThirdwebSDK.fromPrivateKey("devnet", process.env.PRIVATE_KEY);

export const getNFTProgram = async () => {
  try {
    return await sdk.getNFTCollection(process.env.COLLECTION_ADDRESS);
  } catch (error) {
    throw new Error('Failed to initialize NFT program');
  }
};

export const getTokenProgram = async () => {
  try {
    return await sdk.getToken(process.env.TOKEN_PROGRAM_ADDRESS);
  } catch (error) {
    throw new Error('Failed to initialize token program');
  }
};