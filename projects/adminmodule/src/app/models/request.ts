import { Decryptdata, decrypt } from "../globals/encryptdata";
import { SessionService } from "../globals/sessionstorage";

export interface Singlebatch {
    batch_code: number;
}

export interface Validatelogin {
    aadhaar: number
    user_pwd: string
}

export interface IBatchs {
    Batch_Code: number
    Batch_Name: string
    Batch_Short: string
    Course_Code: number
    Course_Name: string
    BatchLevel: number
    BatchLevelGroup: string
    FormAmount: number
    Merchant: string
    Merchant_AccountID: string
    Next_Batch: number
    Active: boolean
}

export interface iBatchemail {
    Batch_code: number
    Cc_email: string
    Bcc_email: string
    Replay_email: string
    Email_body: string
    Email_subjects: string
}

export interface IYear {
    "Finyear": number,
    "FinyearName": string,
    "Fromdate": string,
    "Todate": string,
    "Lockfinyear": null
}
export interface ICode{
    CollegeCode: number,
    Name: string,
    Add1: string,
    Add2: string,
    Add3: string,
    Website: string,
    Logopath: null
}
export class Batchs_model {
  Batch_Code!: number
  Batch_Name!: string
  Batch_Short!: string
  Course_Code!: number
  Course_Name!: string
  BatchLevel!: number
  BatchLevelGroup!: string
  FormAmount!: number
  Merchant!: string
  Merchant_AccountID!: string
  Next_Batch!: number
  Active!: boolean
}

export interface Ireq_input {
  Input : string
}


export class Sessiondata {
    aadhaar?: number;
    finyear?: number;
    collegecode?: number;

    lastyearoutstanding?: string;
    formfeesrecieved?: string;
    isprofilesubmited?: string;

    batchcode?: number;
    register_batchcode?: number;
    registerbatchname?: string;
    demo?: string;

    lastfinyear?: number = 0;
    lastbatchcode?: number = 0;

    studenttype?: string;
    maxbatchlevel?: number = 0;

    maxadmissionboard?: string;


    submittedyear?: number = 0;

    currentformfeesbatchcode?: number = 0;

    
    maxbatchcode?: number = 0;

    registerfinyear?: number = 0;
    
  
    constructor(private sessionservice : SessionService) {
    }
  
    Getdatafromstroage(){
  
      this.aadhaar = 0 ;
      this.lastbatchcode = 0;
    this.lastfinyear = 0;

    this.studenttype = "";
      this.formfeesrecieved = "";
    this.isprofilesubmited = "";
    
    this.maxbatchlevel = 0;
    this.register_batchcode = 0;
    this.batchcode = 0;

    this.registerfinyear = 0;

    this.maxbatchcode = 0;

    this.submittedyear = 0;

    this.maxadmissionboard = "";

    this.currentformfeesbatchcode = 0;
  
      let decrypted = ""
      decrypted= Decryptdata(this.sessionservice.GetData('aadhaar')!);
      if ( decrypted!= ""){
        this.aadhaar = parseInt(decrypted);
      }

      decrypted= Decryptdata(this.sessionservice.GetData('collegecode')!);
      if ( decrypted!= ""){
        this.collegecode = parseInt(decrypted);
      }

      decrypted = decrypt(this.sessionservice.GetData('maxadmissionboard'))
      if (decrypted != "") {
        this.maxadmissionboard = decrypted.trim();
      }

      decrypted = Decryptdata(this.sessionservice.GetData('maxbatchcode'))
      if (decrypted != "") {
        this.maxbatchcode = parseInt(decrypted);
      }

      decrypted = Decryptdata(this.sessionservice.GetData('submittedyear'))
    if (decrypted != "") {
      this.submittedyear = parseInt(decrypted);
    }

      decrypted = Decryptdata(this.sessionservice.GetData('maxbatchlevel'))
    if (decrypted != "") {
      this.maxbatchlevel = parseInt(decrypted);
    }

    decrypted = Decryptdata(this.sessionservice.GetData('registerfinyear'))
    if (decrypted != "") {
      this.registerfinyear = parseInt(decrypted);
    }

      decrypted= Decryptdata(this.sessionservice.GetData('finyear')!);
      if ( decrypted!= ""){
        this.finyear = parseInt(decrypted);
      }

      decrypted = Decryptdata(this.sessionservice.GetData('studenttype'))
      if (decrypted != "") {
          this.studenttype = decrypted.trim();
      }

      decrypted = Decryptdata(this.sessionservice.GetData('registerbatchcode'))
      if (decrypted != "") {
          this.register_batchcode = parseInt(decrypted);
      }

      decrypted = Decryptdata(this.sessionservice.GetData('registerbatchname'))
      if (decrypted != "") {
          this.registerbatchname = decrypted.trim();
          console.log('getbatchhname:::',this.registerbatchname.trim())

      }

      decrypted = Decryptdata(this.sessionservice.GetData('lastbatchcode'))
      if (decrypted != "") {
          this.lastbatchcode = parseInt(decrypted);
      }

      decrypted = Decryptdata(this.sessionservice.GetData('lastfinyear'))
      if (decrypted != "") {
          this.lastfinyear = parseInt(decrypted);
      }

      decrypted = Decryptdata(this.sessionservice.GetData('formfeesnotpaid'))
        if (decrypted != "") {
            this.formfeesrecieved = decrypted.trim();
        }


        decrypted = Decryptdata(this.sessionservice.GetData('isprofilesubmitted'))
        if (decrypted != "") {
            this.isprofilesubmited = decrypted.trim();
        }

        decrypted = decrypt(this.sessionservice.GetData('currentformfeesbatchcode'))
    if (decrypted != "") {
      this.currentformfeesbatchcode = parseInt(decrypted);
    }
  
    }
  }


