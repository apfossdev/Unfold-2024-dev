import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock, Signer } from "@mysten/sui.js/transactions";

// Initialize Sui Client
const client = new SuiClient({ url: getFullnodeUrl("testnet") });

// Interface for NFT data

// Helper Functions
export class NFTService {
  private packageId =
    "0x61fd25749addae3a1e0bb4ad19724db3c4944f8c8a1c4ac96e46c59f8b90a662"; // Replace with your deployed package ID
  private moduleId = "test_nft";

  // Fetch NFTs by owner
  async getNFTsByOwner(ownerAddress: string) {
    try {
      const objects = await client.getOwnedObjects({
        owner: ownerAddress,
        filter: {
          StructType: `${this.packageId}::${this.moduleId}::ProfessionalNFT`,
        },
        options: {
          showContent: true,
        },
      });
      return objects.data;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      throw error;
    }
  }

  // Mint new NFT
  async mintNFT(
    signer: Signer,
    title: string,
    description: string,
    stats: string,
    githubUrl: string,
    twitterUrl: string,
    contractAddress: string,
    techScore: number,
    socialScore: number,
    recipient: string
  ) {
    try {
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${this.packageId}::${this.moduleId}::mint_professional_nft`,
        arguments: [
          tx.pure(title),
          tx.pure(description),
          tx.pure(stats),
          tx.pure(githubUrl),
          tx.pure(twitterUrl),
          tx.pure(contractAddress),
          tx.pure(techScore),
          tx.pure(socialScore),
          tx.pure(recipient),
        ],
      });

      const result = await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
      });

      return result;
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    }
  }

  // Update NFT attributes
  async updateNFTDescription(
    signer: Signer,
    nftId: string,
    newDescription: string
  ) {
    try {
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${this.packageId}::${this.moduleId}::update_description`,
        arguments: [tx.object(nftId), tx.pure(newDescription)],
      });

      return await client.signAndExecuteTransactionBlock({
        signer,
        transactionBlock: tx,
      });
    } catch (error) {
      console.error("Error updating NFT:", error);
      throw error;
    }
  }
}