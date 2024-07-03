import * as myGlobals from "../../../globals/global-variable";


export interface IReq_batchs{
    Boardlevel: string
}

export interface Ireq_register{
    Aadhaar?: number
    EmailID?:string
    MobileNumber?: number
    Inhouse?:string
    Hindilinguistic?:string
    StudentPassword?:string
    studenttype? :string
    finyear?: number
    college_code?: number
    Coursetype?:string
    Batch_code?:number
}

export interface Ireqget_otp{
    aadhaar: number
    emailid: string
    mobile: number
}

export interface Ipg_batchs{
    "Batch_code": number
    "Batch_name": string
    "Batch_short": string
    "Course_code": number
    "Course_name":string
    "Batch_level": number
    "Batch_level_group": string
    "Old_batch_code": number
    "Formamount": number
    "Merchant": string
    "Merchant_accountid": string
    "Next_batch":number
    "Active": number
    "Stream": string
    "Udise_no":string
    "Boardlevel": string
    "Webportal": string,
    "Admissionstarted": number
    "Outside_admission": number
    "Atkt_admission": number
    "Outside_message": string
    "Atkt_message": string
    "Previous_exambatchs": string
    "Semesters": string
    "Documents": string
    "Educationdetails":string
    "Meritlist": string
    "Admissionyear": number
}
