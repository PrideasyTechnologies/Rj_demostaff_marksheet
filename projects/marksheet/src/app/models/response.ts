export interface ITicketmaster{
    "Ticketid": number,
    "Detailid": number,
    "Aadhaar": number,
    "Ticketdate": string,
    "Ticketdescription": string,
    "Replayuser": string,
}
export interface ITicketdetails{
    "Ticketid": number,
    "Detailid": number,
    "Aadhaar": number,
    "Ticketdescription": string,
    "Replayuser": string,
    "Ticketdate": string,
    "Ticketaction": string,
    "Studentname": string,
    "Adminname": string,
}
export interface IYear {
  "Finyear": number,
  "FinyearName": string,
  "Fromdate": string,
  "Todate": string,
  "Lockfinyear": null
  Name: string,
}

export interface ILogindetail {
  "Aadhaar": string,
  "UserRole": string,
  "User_Name": string,
  "Studenttype": string,
  "Coursetype": string,
  "Registerbatch": string,
  "Token": string,
}
export interface ISubjectName_json {
  "Batch_code": number,
  "Semester": number,
  "Subject_code": number,
  "Subject_name": string,
}
export interface ISemester {
  "Batchexam_id": number,
  "Userexamname": string,
  "Semester": number,
  "Userexamid": number
}

export interface ISubjectnamesemester {
  "Examcode": number,
  "Examname": string,
}

export class IlistModel {
    Studentaadhaar!: string
    Loginaadhaar!: number
    Finyear!: number
    Collegecode!: number
    Aadhaarname!: string
    Dob!: string
    Gender!: string
    Rollno!: number
    Mobileno!: string
    Abcdid!: string
    Approved_status!: string
    Useraadhaar!: number
    Createddate!: string
    Modifieddate!: string
    Blobdata!: ""
}

export interface ICaptchaImage {
  id: string;
  image: string;
}

export class Formamount {
    "Formid": number
    "Formamount": number
    "Formcount": number
}

export class CSemester {
    Semester!  : number
    Totalcount! : number
    Semesteramount! : number
}

export class CSemester_outside {
    Semester!  : number
    Totalcount! : number
    Semesteramount! : number
}

export class cSemesterHeader {
    Totalatktformamount! : number
    Semester! : CSemester[]
}

export class IsubjectDetail {
    "Receipt_id": number
    "Batchexam_id": number
    "Batch_code": number
    "Semester": number
    "Subject_order": number
    "Subject_name": string
    "Pappercode": string
    "Finyear": number
    "Subject_finyear": string
    "College_code": number
    "Aadhaar": number
}

export class AtktSubject {
    "Batchexam_id": number
    "Batch_code": number
    "Batch_name": string
    "Aadhaar": string
    "Subject_order": string
    "Subject_name": string
    "Semester": string
    "Papercode": string
}

export class BatchwiseSubjects {
    "Batch_code": number
    "Semester": number
    "Subject_code": number
    "Papercode": string
    "Subject_name": string
    "Subject_order": number
    "Finyear": number
    "Displayname": string
}

export class IEditBatchwiseSubjects {
    "Batch_code": number
    "Semester": number
    "Subject_code": number
    "Papercode": string
    "Subject_name": string
    "Subject_order": number
    "Finyear": number
    "Displayname": string
    "Subject_finyear": string
}

export class Iprefix_month {
    "Prefix_code": number
    "Prefix_month": string
    "Startdate": string
    "Enddate": string
    "Active": number
}

export class Igridsubject_detail {

    "Atkt_formid" : number
    "Receipt_id": number
    "Batchexam_id": number
    "Batch_code": number
    "Semester": number
    "Subject_order": number
    "Subject_name": string
    "Pappercode": string
    "Finyear": number
    "Subject_finyear": string
    "College_code": number
    "Aadhaar": number
    "Boardlevel": string
    "Batch_name": string
}

export interface IOutsideIU {
        Receipt_id: number
        Receiptno: number
        Transactionguid: string
        Fullname: string
        Billdeskaccountid: string
}

export interface IunhouseIU {
    Receipt_id: number
    Receiptno: number
    Transactionguid: string
    Fullname: string
    Billdeskaccountid: string
}


export interface Iprefixmonth {
    Active: number
    Enddate: string
    Prefix_code: number
    Prefix_month: string
    Startdate: string
}

export interface ImarksheetImage {
    Image: string
    Filename: string
}



export interface IStudentdetres {
    "Receipt_id": number,
    "Finyear": number,
    "College_code": number,
    "Aadhaar": number,
    "Prefix_code": number,
    "Receiptno": number,
    "Transactionguid": string,
    "Accountno": string,
    "Billdeskid": number,
    "Billdesktranid": string,
    "Billdeskdate": string,
    "Payment_mode": string,
    "Receiptamount": number,
    "Bank": string,
    "Chequeno": string,
    "Chequedate":string,
    "Narration": string,
    "Transcationmode": string,
    "Errcode": string,
    "Errorname": string,
    "Batchexamid": string,
    "Billdeskstatus": string,
    "Billdeskerror": string,
    "Createddate": string,
    "Createdby": number,
    "Formtype": string,
    "Firstname": string,
    "Lastname": string,
    "Fathername": string,
    "Mothername": string,
    "Gender": string,
    "Rollno": string,
    "Prnno": string,
    "Prefix_month": string,
    "Subjects" : Igridsubject_detail
}

export class IgetBatch {

    "Batch_Code": number
    "Batch_Name": string
    "Batch_Short": string
    "Course_Code": number
    "Course_Name": string
    "BatchLevel": number
    "BatchLevelGroup": string
    "FormAmount": number
    "Merchant": string
    "Merchant_AccountID": string
    "Next_Batch": number
    "Active": boolean
}
export class IgetAllBatchs {
    "Batch_code": number
    "Batch_name": string
    "Batch_short": string
    "Course_code": number
    "Course_name": string
    "Batch_level": number
    "Batch_level_group": string
    "Old_batch_code": number
    "Formamount": number
    "Merchant":string
    "Merchant_accountid": string
    "Next_batch": number
    "Active": number
    "Stream": string
    "Udise_no": string
    "Boardlevel": string
    "Webportal": string
    "Admissionstarted": number
    "Outside_admission": number
    "Atkt_admission": number
    "Outside_message":string
    "Atkt_message": string
    "Previous_exambatchs": string
    "Semesters": string
    }

export interface Ires_downloadcoursemarks {
  Other_id: number;
  Aadhaar: string;
  Semester: number;
  Lineitem: number;
  Coursename: string;
  Creditearned: number;
  Specialisation: string;
}


