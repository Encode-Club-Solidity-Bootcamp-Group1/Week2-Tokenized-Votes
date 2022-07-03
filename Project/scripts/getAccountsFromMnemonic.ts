import { ethers } from "ethers";
import "dotenv/config";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main(
  privateKey: string | undefined,
  mnemonic: string | undefined,
  accounts: string | undefined
) {
  const wallet =
    mnemonic && mnemonic.length > 0
      ? ethers.Wallet.fromMnemonic(mnemonic, accounts)
      : new ethers.Wallet(privateKey ?? EXPOSED_KEY);

  return wallet.address;
}

export default main;
