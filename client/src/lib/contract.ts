import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";

// Initialize Sui Client
const client = new SuiClient({ url: getFullnodeUrl("testnet") });

// Helper Functions
export class NFTService {
  private packageId =
    "0x61fd25749addae3a1e0bb4ad19724db3c4944f8c8a1c4ac96e46c59f8b90a662"; // Replace with your deployed package ID
  private moduleId = "test_nft";
  private keypair: Ed25519Keypair;

  constructor(privateKey: string) {
    this.keypair = Ed25519Keypair.fromSecretKey(
      decodeSuiPrivateKey(privateKey).secretKey
    );
  }

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
      const tx = new Transaction();

      // tx.moveCall({
      //   target: `${this.packageId}::${this.moduleId}::mint_professional_nft`,
      //   arguments: [
      //     tx.pure.string(title),
      //     tx.pure.string(description),
      //     tx.pure.string(stats),
      //     tx.pure.string(githubUrl),
      //     tx.pure.string(twitterUrl),
      //     tx.pure.address("0xd397d962e04eab3619611645a622acd9ac08d49684ec1b056ac9b8060cdadfdb"),
      //     tx.pure.u8(techScore),
      //     tx.pure.u8(socialScore),
      //     tx.pure.address("0xd397d962e04eab3619611645a622acd9ac08d49684ec1b056ac9b8060cdadfdb"),
      //   ],
      // });

      tx.moveCall({
        target: `${this.packageId}::${this.moduleId}::mint_professional_nft`,
        arguments: [
            tx.pure.string("Sample Title"),
            tx.pure.string("Sample Description"),
            tx.pure.string("Sample Stats"),
            tx.pure.string("https://github.com/sample"),
            tx.pure.string("https://twitter.com/sample"),
            tx.pure.address("0x2a212de6a9dfa3a69e22387acfbafbb1a9e591bd9d636e7895dcfc8de05f331"),
            tx.pure.u8(85),  // Example tech score
            tx.pure.u8(90),  // Example social score
            tx.pure.address("0x3b212de6a9dfa3a69e22387acfbafbb1a9e591bd9d636e7895dcfc8de05f332"),
        ],
    });

      // Set a budget manually
      tx.setGasBudget(1000000);

      const result = await client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });

      return result;
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    }
  }

  // Update NFT attributes
  async updateNFTDescription(nftId: string, newDescription: string) {
    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${this.packageId}::${this.moduleId}::update_description`,
        arguments: [tx.object(nftId), tx.pure.string(newDescription)],
      });

      return await client.signAndExecuteTransaction({
        transaction: tx,
        signer: this.keypair,
      });
    } catch (error) {
      console.error("Error updating NFT:", error);
      throw error;
    }
  }
}
