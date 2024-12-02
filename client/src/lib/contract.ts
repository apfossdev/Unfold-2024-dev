import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";

// Initialize Sui Client
const client = new SuiClient({ url: getFullnodeUrl("testnet") });

// Helper Functions
export class NFTService {
  private packageId =
    "0x3fe78fd9bc469061b80f744818cd1520235051fb9a60a3d609de3f90b3ccf6e5"; // Replace with your deployed package ID
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
      //     tx.pure(title),
      //     tx.pure(stats),
      //     tx.pure(githubUrl),
      //     tx.pure(twitterUrl),
      //     tx.pure(contractAddress),
      //     tx.pure(techScore),
      //     tx.pure(socialScore),
      //     tx.pure(recipient),
      //   ],
      // });

      tx.moveCall({
        target: `${this.packageId}::${this.moduleId}::mint_professional_nft`,
        arguments: [
          tx.pure.string("Sample Title"),
          tx.pure.string("Sample Stats"),
          tx.pure.string("https://github.com/sample"),
          tx.pure.string("https://twitter.com/sample"),
          tx.pure.address(
            "0x2a212de6a9dfa3a69e22387acfbafbb1a9e591bd9d636e7895dcfc8de05f331"
          ),
          tx.pure.u64(85), // Example tech score
          tx.pure.u64(90), // Example social score
          tx.pure.address(
            "0x3b212de6a9dfa3a69e22387acfbafbb1a9e591bd9d636e7895dcfc8de05f332"
          ),
        ],
      });

      // Set a minimal gas budget
       tx.setGasBudget(1000000); // Adjust the budget as needed

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
}
