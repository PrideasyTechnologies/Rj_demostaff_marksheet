import {base64StringToBlob} from 'blob-util';
import * as CryptoJS from "crypto-js";


export function UDownloadfiles(blobdata: string, filename: string) {
  const contentType = '';
  const blobb = base64StringToBlob(blobdata, contentType);
  let blob = new Blob([blobb], {type: 'application/blob'});
  var downloadURL = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = downloadURL;
  link.download = filename;
  link.click();
}

export function systemdatav1(jsonstring: string) {
  const key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  const iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');

  const encrypted = CryptoJS.AES.encrypt(jsonstring, key, {iv: iv});

  const encryptedData = encrypted.toString();

  return encryptedData;
}

export function systemdata (jsonstring: string) :string{
  let _key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  let _iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');
  let encrypted = CryptoJS.AES.encrypt(
    jsonstring, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}

export function systemdata_dec(jsonstring: string) {
  let _key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  let _iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');
  /*
  this.decrypted = CryptoJS.AES.decrypt(
    this.encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

   */
}



