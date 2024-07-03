import {SessionService} from "../globals/sessionstorage";
import {Decryptdata} from "../globals/encryptdata";

export interface Singlebatch {
    batch_code: number;
}

export interface Validatelogin {
    Aadhaar: number
    User_pwd: string
    Valuesdata: string
    Application: string
    Id: string
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
    Name: string,
}

export interface Iresp_College {
    Name: string,
    CollegeCode: number,
    Add1: string,
    Add2: string,
    Add3: string,
    Website: string,
    Logopath: null
}

export interface Iresp_ABC {
    Format: string,
    Data :Iresp_College
}

export type Req_IAtktsubects_inhouse ={
    Atkt_formid: number,
    Receipt_id: number,
    Batchexam_id: number,
    Batch_code: number,
    Semester: number,
    Subject_order: number,
    Subject_name: string,
    Papercode: string,
    Finyear: number,
    Subject_finyear: string,
    College_code: number,
    Aadhaar: number,
    Boardlevel: string,
    Marksheet: number,
    Specialisation: string,
    Scale: string,
}

export type Req_IAtktsubects ={
    Atkt_formid: number,
    Receipt_id: number,
    Batchexam_id: number,
    Batch_code: number,
    Batch_name: string,
    Semester: number,
    Subject_order: number,
    Subject_name: string,
    Papercode: string,
    Finyear: number,
    Registerfinyear: string,
    College_code: number,
    Aadhaar: number,
    Boardlevel: string,
    Marksheetno: string,
    Specialisation: string,
    Scale: string,
}

export type aReq_IAtktsubects =Req_IAtktsubects[]

export interface IAtktform {
    College_code: number,
    Finyear: number,
    Aadhaar: number,
    Receiptamount: number,
    Selectedsubject: Req_IAtktsubects[],
    Formtype: string
}

export class Sessiondata {

    aadhaar?: number = 0;
    collegecode?: number = 0;
    finyear?: number = 0;
    token?: string;

    constructor(private sessionservice: SessionService) {
    }

    Getdatafromstroage() {

        this.finyear = 0;
        this.aadhaar = 0;
        this.collegecode = 0;

        let decrypted = ""
        decrypted = Decryptdata(this.sessionservice.GetData('aadhaar')!);
        if (decrypted != "") {
            this.aadhaar = parseInt(decrypted);
        }

        console.log('finyee',this.sessionservice.GetData('finyear'))
        decrypted = Decryptdata(this.sessionservice.GetData('finyear')!);
        if (decrypted != "") {
            this.finyear = parseInt(decrypted);
        }

        decrypted = Decryptdata(this.sessionservice.GetData('collegecode'))
        if (decrypted != "") {
            this.collegecode = parseInt(decrypted);
        }

    }
}
