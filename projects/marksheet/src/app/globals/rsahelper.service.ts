import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root',
})
export class RSAHelper {

  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvDwxqI09gZ+4Oyk0+SWr
fyE1ScS/lP6sYqJJ5MDeFBKH2jHgNte5Co5f0TcQCp5ZC55jz4DqgtWD7oDnC03G
mCrjxZlTTW/rjhb6EhVT6d/3VK2oCGelWaxLJ3vtMDrBlqQ8Z+JrUk8+/gY4fZLs
BTDaQO47P4oNinvrpJqEdGw8upa+8EHHtae4mSPEXg9ZujzsBHtOl6RdX5Ie0Daf
EGDTm3Eubt64Y7RV76r8M85Cj6P3sZmNl/TduJc5V18SK4VZE4igHDaXzCWQfYw4
9aJit9YPU4tTNnzZEOC6njP5faRnJ5caEkeKfEWWbRCXUnEpV9kDZP9H/3j4yjDo
owIDAQAB
-----END PUBLIC KEY-----`;

  constructor() {}

  // encryptWithPublicKey(valueToEncrypt: string): string {
  //   const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
  //   return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  // }

  /*
  var encrypted = publicKey.encrypt(secretMessage, "RSA-OAEP", {
            md: forge.md.sha256.create(),
            mgf1: forge.mgf1.create()
        });
   */

  encryptWithPublicKey(valueToEncrypt: string): string {
    //let hashObject = Forge.md.sha512.create();
    const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString(),"RSA-OAEP",{
      md: Forge.md.sha256.create()
    }));
  }

}
