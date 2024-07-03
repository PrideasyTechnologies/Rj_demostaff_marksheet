import * as CryptoJS from 'crypto-js';
import {encrypt_key, iv_key} from "./global-variable";

import {cipher, hmac, pkcs5, random, util} from "node-forge";

export function EncryptData(data: any): string {
  if (data == "") {
    return ""
  }
  return CryptoJS.AES.encrypt(data, encrypt_key).toString();
}

export function Decryptdata(ciphertext: any): string {
  if (ciphertext == "") {
    return ""
  }
  let bytes = CryptoJS.AES.decrypt(ciphertext, encrypt_key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
    iv: CryptoJS.enc.Utf8.parse(encrypt_key),
    keySize: 16
  });
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function Encrypt_object(data: any): string {
  if (data == "") {
    return ""
  }
  return CryptoJS.AES.encrypt(data, encrypt_key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(iv_key),
    keySize: 32
  }).toString();
}

export function Decrypt_object(cipherdata: any): any {
  if (cipherdata == "") {
    return ""
  }
  let bytes = CryptoJS.AES.decrypt(cipherdata, encrypt_key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function encryptUsingAES256(request: any): string {
  //CryptoJS.enc.Utf8.parse(encrypt_key);
  //let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);
  // let encrypted : any = "";

  let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
  let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);

  console.log("praaksh : xxxxx",request);
  let encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(request), _iv, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}

export function decryptUsingAES256(data: any): string {
  //let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
  // let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);

  let decrypted = CryptoJS.AES.decrypt(
    data, encrypt_key, {
      //keySize: 16,
      //iv: _iv,
      mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8);

  return decrypted
}


export function GCM_encryptData(plainText: string): string {
  debugger;
  //let associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
  let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";
  let iv = random.getBytesSync(12);

  let hmacSha1 = hmac.create();
  hmacSha1.start("sha1", secretKey);
  hmacSha1.update(plainText);

  let salt = random.getBytesSync(16);
  let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);

  const cipherGCM = cipher.createCipher("AES-GCM", derivedKey);
  cipherGCM.start({
    iv: iv, // should be a 12-byte binary-encoded string or byte buffer
    //additionalData: associatedData, // optional
    tagLength: 128 // optional, defaults to 128 bits
  });
  let myrandom = random.getBytesSync(16)
  cipherGCM.update(util.createBuffer(myrandom));
  cipherGCM.finish();

  console.log(cipherGCM.output);
  return cipherGCM.output.data;
}

// export function GCM_decryptData(encryptedText: string): string {
//   let decodedData = util.decode64(encryptedText);
//   //let associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
//   let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";
//   console.log("Decryption: decodedData: " + decodedData);
//
//   let iv = random.getBytesSync(12);
//   console.log("Decryption: Initialization Vector: " + iv);
//
//   let hmacSha1 = hmac.create();
//   hmacSha1.start("sha1", secretKey);
//   hmacSha1.update(decodedData);
//   console.log(
//     "Decryption: DERIVE key (from secret and salt): " + hmacSha1.digest().toHex()
//   );
//
//   let salt = random.getBytesSync(16);
//   console.log("Decryption: salt: " + salt);
//   let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);
//   console.log(
//     "Decryption: derivedKey by PBKDF2WithHmacSHA1; 16 byte key; with 65536 iterations: " +
//     derivedKey
//   );
//
//   let decipher = cipher.createDecipher("AES-GCM", derivedKey);
//   decipher.start({
//     iv: iv,
//     //additionalData: associatedData, // optional
//     tagLength: 128, // optional, defaults to 128 bits
//     tag: this.authenticatedTag // authentication tag from encryption
//   });
//   let myrandom = random.getBytesSync(16)
//   decipher.update(util.createBuffer(myrandom));
//   decipher.finish();
//
//   //let pass = decipher.finish();
//   //console.log("Decryption: " + pass);
//
//   //if(pass){
//   //   console.log("Decryption: decrypted HEX: " + decipher.output.toHex());
//   //}
//
//   return decipher.output.data
// }

export function encrypt(txt: string): string {
  return CryptoJS.AES.encrypt(txt, encrypt_key).toString();
}

export function decrypt(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, encrypt_key).toString(CryptoJS.enc.Utf8);
}


