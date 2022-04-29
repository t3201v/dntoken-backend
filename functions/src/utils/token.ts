import { ec } from "elliptic";
import Web3 from "web3";

const web3 = new Web3();
const EC = new ec("secp256k1");

function trimFirst12Bytes(hexString: string) {
  return "0x".concat(hexString.substring(hexString.length - 40));
}

export default function pubKeyToAddress(
  compressedPubkey:
    | string
    | ec.KeyPair
    | Buffer
    | number[]
    | Uint8Array
    | { x: string; y: string }
) {
  let keyPair = EC.keyFromPublic(compressedPubkey, "hex");
  // remove '04' then add prefix '0x'
  let pubkey = "0x" + keyPair.getPublic(false, "hex").substring(2);
  let address = trimFirst12Bytes(web3.utils.keccak256(pubkey));
  return web3.utils.toChecksumAddress(address);
}
