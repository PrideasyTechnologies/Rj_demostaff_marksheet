import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SessionService {


  constructor() {}


  public SaveData(key: string, value: string) {
    if (key.length <= 0) {
      return
    }
    if (value.length <= 0) {
      return
    }
    sessionStorage.setItem(key, value);
  }

  public GetData(key: string) {
    if (key.length <= 0) {
      return ""
    }
    let sValue = ""
    sValue = sessionStorage.getItem(key)!;
    if (sValue == null) {
      sValue = ""
    }
    return sValue
  }

  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }
}
