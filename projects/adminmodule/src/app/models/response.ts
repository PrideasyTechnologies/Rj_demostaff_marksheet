export class Fees_Receiptmaster {
  Receipt_ID!: number;
  Finyear!: number;
  College_code!: number;
  Batch_code!: number;
  Aadhaar!: number;
  Term_code!: number;
  Installment!: number;
  Receiptno!: number;
  Prefix_code!: number;
  BilldeskID!: number;
  BilldeskTranID!: string;
  BilldeskDate!: string;
  Payment_Mode!: string;
  TransactionGUID!: string;
  ReceiptAmount!: number;
  CreatedDate!: string;
  Bank!: string;
  Chequeno!: string;
  Chequedate!: string;
  CreatedBy!: number;
  Narration!: string;
  Transcationmode!: string;
  Printreceiptno!: string;
}

export class Batchs_model {
  Batch_Code!: number;
  Batch_Name!: string;
  Batch_Short!: string;
  Course_Code!: number;
  Course_Name!: string;
  BatchLevel!: number;
  BatchLevelGroup!: string;
  FormAmount!: number;
  Merchant!: string;
  Merchant_AccountID!: string;
  Next_Batch!: number;
  Active!: boolean;
}

export class Subjects_group_h_model {
  Subject_group_id!: number;
  Batch_code!: number;
  Subject_group_code!: string;
  Subject_group_name!: string;
  Quota_status!: string;
  Admission_quota!: string;
  Feespaid_quota!: string;
  Term_code!: number;
}

export class IU_Admission_model {
  ReceiptID!: number;
  ReceiptNo!: string;
  Msg!: string;
}

export class ApprovedCourse_model {
  Batch_code!: number;
  Batch_name!: string;
  Subject_group_id!: number;
  Subject_group_code!: string;
  Subject_group_name!: string;
}


export class Fees_Installment_h_model {
  BatchName!: string;
  FullName!: string;
  Emailid!: string;
  Mobile!: string;
  Installment_ID!: number;
  Finyear!: number;
  College_code!: number;
  Batch_code!: number;
  Term_code!: number;
  Term_Name!: string;
  Installmentid!: number;
  Installment!: string;
  Amount!: number;
}

export class Fees_Installment_d_model {
  Installment_ID!: number
  Lineitem!: number
  Finyear!: number
  College_code!: number
  Batch_code!: number
  Term_code!: number
  Term_Name!: string
  Fees_code!: number
  Fees_Name!: string
  Installment!: string
  Amount!: number
}

export interface ITicketdetails {
  Ticketid: number,
  Collegecode: number,
  Finyear: number,
  Category: string,
  Ticketsubject: string,
  Ticketstatus: string,
  Detailid: number,
  Aadhaar: number,
  Ticketdescription: string,
  Replayuser: string,
  Ticketdate: string,
}

export interface Iinwardoutward {

  "Documentid": number
  "Moduletype": string
  "Documenttype": string
  "Orgid": number,
  "Orgname": string
  "Empid": number,
  "Empname": string
  "Documentsubject": string
  "Documentno": string
  "Documentdate": string
  "Remarks": string
  "Createddate": string
  "Createdby": number
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

export interface IEmployee_detail {
  Empid: number,
  Full_name: string,
  Department: string,
  Designation: string,
  College: string,
  Biometric_id_no: string,
  Address: string,
  Dob: string,
  Doj: string,
  Blood_group: string,
  Email: string,
  Mobile: string,
  Alternate_mobile: string,
  Created_date: string
}

export interface Ilistfeedback_detail {
  Feedbackid: number
  Feedbackname: string
  Createdby: number
  Createdon: string
  Modifiedby: number
  Modifiedon: string
  Collegecode: number
  Finyear: number
  Useraadhaar: number
}

export interface Istudentdetails {

  "Batch_code": number,
  "Batch_name": string,
  "Batch_short": string,
  "Course_code": number,
  "Course_name": string,
  "Batch_level": number,
  "Batch_level_group": string,
  "Old_batch_code": number,
  "Formamount": number,
  "Merchant": string,
  "Merchant_accountid": string,
  "Next_batch": number,
  "Active": number,
  "Stream": string,
  "Udise_no": string,
  "Boardlevel": string,
  "Webportal": string,
  "Admissionstarted": number,
  "Outside_admission": number,
  "Atkt_admission": number,
  "Outside_message": string,
  "Atkt_message": string,
  "Previous_exambatchs": string,
  "Semesters": string
}

export interface IStudent_registration_new {
  College_code: number
  Finyear: number
  Aadhaar: number
  EmailID: string
  MobileNumber: number
  Student_Password: string
  Student_Guid: string
  Forgottoken: string
  OTP: number
  OTP_starttime: string
  OTP_endtime: string
  ExistingStudent: number
  ExistingSubjectGroupCode: string
  Existingbatchcode: number
  Created_Date: string
  Inhouse: string
  Hindilinguistic: string
  OTP_Validated: number
  Studenttype: string
  Coursetype: string
  Batch_code: number
}
export interface Ires_logindataeazy {
  Collegecode: number
  Aadhaar: number
  User_pwd: string
  Creationdate: string
  Createdby: string
  Ipaddr: string
  Editedby: string
  Userrole: string
  User_name: string
  Forgottoken: string
  Imei: string
  Approved: boolean
  Student_registration_new: IStudent_registration_new
  Register_batch_name: string
  Token: string
}

export interface Ires_PaidBatchs {
  Finyear: number
  Batch_code: number
  Batch_name: string
  Installment: number
}

export interface Ires_Viewattachfees {
  college_code: number;
  finyear: number;
  batch_code: number;
  category: string;
  gender: string;
  fullname: string;
  aadhaar: number;
  term_name: string;
  Subject_group_code: string;
  Student_type: string;
  Feesattachedby: number;
  Feesattacheddate: string;
  Useraadhaar: number;
  Modifydate: string;
}

export interface Ires_term {
  Installment_ID: number;
  Installment: string;
  Installmentid: number;
  College_code: number;
  Finyear: number;
  Batch_code: number;
  Term_code: number;
  Amount: number;
  Activedeactive: number;
  Term_name: string;
}

export interface Ires_AdmissionApprovallist {
  Finyear: number;
  College_Code: number;
  BatchCode: number;
  Aadhaar: number;
  Fullname: string;
  Gender: string;
  Admission_Status: string;
  Subject_group_code: string;
  Subject_group_name: string;
  Batch_name: string;
  Batch_short: string;
  MobileNumber: string;
  EmailID: string;
  Inhouse: string;
  Hindilinguistic: string;
  Studenttype: string;
  Formfees: string;
  Batchstream: string;
  Percentage: number;
}

export interface Ires_EducationDetails {
  Aadhaar: number;
  Document_type: string;
  Board: string;
  State: string;
  Education_board: string;
  College_name: string;
  Datepass: string;
  Rollno: string;
  Marksheetno: string;
  Gradesormarks: string;
  Marksobtained: number;
  Outoff: number;
  Percentage: number;
  Finyear: number;
  College_code: number;
  Createddate: string;
  Batchstream: string;
  Document_code:number;
  Rejectionreason: string,
  Approved_rejected: string
}

export interface Ires_DocumentAprroval{
  Document_ID: number;
  Aadhaar: number;
  Finyear: number;
  College_code: number;
  Batch_code: number;
  Document_code: number;
  Document_Name: string;
  Document_status: string;
  Reason: string;
  ApprovedBy: number;
  Document_Filename: string;
  Upload_Status: string;
}


export interface Ires_ViewDocument {
  blobdata: string;
  pdf_png: boolean;
  pdffile: string;
}

export interface User {
  firstname: string;
  lastname: string;
  age: number;
}

export interface Ires_getallbatchs {
  Batch_Code: number;
  Batch_Name: string;
  Batch_Short: string;
  Course_Code: number;
  Course_Name: string;
  BatchLevel: number;
  BatchLevelGroup: string;
  FormAmount: number;
  Merchant: string;
  Merchant_AccountID: string;
  Next_Batch: number;
  Active: boolean;
}


export interface Ires_reservationdetail{
  finyear: number;
  college_code: number;
  aadhaar: number;
  parallel_reservation: string;
  category: string;
  subcategory: string;
  specially_abled: string;
  percentage: number;
  udid_no: string;
  activity: string;
  activityname: string;
  participationlevels: string;
  securedrank: string;
  reservationsubmited: boolean;
  opencategory: string;
  checkotherreservation: string;
  checkspeciallyabled: string;
  creationdate: string;
  categoryreason: string;
  speciallyabledreason: string;
  reservationreason: string;
  useraadhaar: number;
  occupation_guardian: string;
  annual_income: string;
  ebc: string;
}

export interface Ires_aadhaarapprovallist {
  Finyear: number
  College_code: number
  Batch_code: number
  Aadhaar: number
  Fullname: string
  Gender: string
  Admission_status: string
  Subject_group_code: string
  Subject_group_name: string
  Batch_name: string
  Batch_short: string
  Mobilenumber: string
  Emailid: string
  Inhouse: string
  Hindilinguistic: string
  Studenttype: string
  Formfees: string
  Batchstream: string
  Percentage: number
}


export interface IRes_subjectgroup_rollno {
  Batch_code: number;
  Batch_division: string;
  Rollno_from: number;
  Rollno_to: number;
  Subject_names: string;
  Subject_group_code: string;
  Rules: string;
  Active_deactive: number;
  Createddate: string;
  Modifydate: string;
}


export interface IRes_BatchSubjects {
  Subject_group_id: number;
  Batch_code: number;
  Subject_group_code: string;
  Subject_group_name: string;
  Quota_status: string;
  Admission_quota: string;
  Feespaid_quota: string;
  Term_code: number;
}


export interface IRes_Userlist {
  Aadhaar: number;
  User_pwd: string;
  User_Name: string;
  Userrole: string;
  Approved: string;
}


