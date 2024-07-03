// export interface StoreProcedure {
//     Flag int
//     Msg  : string
// }

import {SessionService} from "../globals/sessionstorage";

export interface Fin_year {
    Finyear: number
    FinyearName: string
    Fromdate: string
    Todate: string
    Lockfinyear: number
}

export interface Fin_year_new {
    Finyear: number
    Finyear_name: string
    Fromdate: string
    Todate: string
    Lockfinyear: number
}

export interface Batchs {
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

export interface Allbatchs {
    Batch_code: number
    Batch_name: string
    Batch_short: string
    Course_code: number
    Course_name: string
    Batch_level: number
    Batch_level_group: string
    Old_batch_code: number
    Formamount: number
    Merchant: string
    Merchant_accountid: string
    Next_batch: number
    Active: number
    Stream: string
    Udise_no: string
    Boardlevel: string
    Webportal: string
    Admissionstarted: number
    Outside_admission: number
    Atkt_admission: number
    Outside_message: string
    Atkt_message: string
    Previous_exambatchs: string
    Semesters: string
    Documents: string
    Educationdetails: string
    Meritlist: string
}

export interface PhdBatchs {
    Batch_Code: number
    Batch_Name: string
    Batch_Short: string
    Course_Code: number
    Course_Name: string
    Batch_Level: number
    Batch_Level_Group: string
    FormAmount: number
    Merchant: string
    Merchant_AccountID: string
    Next_Batch: number
    Active: boolean
    Admissionstarted: boolean
    Outside_admission: boolean
    Atkt_admission: boolean
}


//Shivam

// export interface Emp {
//     Myid     : number
//     Empno    : float
//     Ename    : string
//     Job      : string
//     Mgr      : number
//     Hiredate : string
//     Sal      : float
//     Comm     : float
//     Deptno   : float
// }

export interface Subjects {
    SubjectCode: number
    SubjectName: string
    SubjectShort: string
    Createddate: string
    Createdby: string
    Ipaddr: string
    Editedby: string
    Editdate: string
    Hide: number
    LinkCode: number
    Language: string
}

export interface Sucess {
    Sucess: boolean
}

export interface College {
    //CollegeCode : number
    CollegeCode: number
    Name: string
    Add1: string
    Add2: string
    Add3: string
    Website: string
    Logopath: string
}

export interface Subjects_group_h {
    Subject_group_id: number
    Batch_code: number
    Subject_group_code: string
    Subject_group_name: string
    Quota_status: string
    Admission_quota: string
    Feespaid_quota: string
    Term_code: number
}

export interface StudentRegistration {
    Errormessage: string
    Flag: number
    Msg: string
    Existingstudent: number
    Existingsubjectgroupcode: string
    ExistingBatch: string
}

export interface BatchSubjects {
    Batch_code: number
    Subject_group_code: string
    Subject_group_name: string
}

// sp.fullname,sp.aadhaar,s.rollno,sr.emailid,sr.mobilenumber ,s.batch_division,s.subject_group_code
export interface RP_RollCalllist {
    FullName: string
    Aadhaar: string
    Rollno: number
    Batch_division: string
    RegMobile: string
    Regemail: string
    Subject_Group_Code: string
    Subject_group_name: string
    Dob: string
    Gender: string
    Grnno: number
    Prnno: number
    Emailid: string
    Mobile: string
    Whatsapp: string
    Billdeskdate: string
    Minor: string
    Oe: string
    Vsc: string
    Sec: string
    Aec: string
    Vec: string
    Iks: string
    Cc: string
}

export interface Surveylist {
    Batch_name: string
    FullName: string
    Aadhaar: string
    Rollno: string
    Batch_division: string
    Mobile: string
    Emailid: string
    Whatsapp: string
    Dob: string
    Gender: string
    Grnno: string
    Prnno: string
    Billdeskdate: string
}

export interface RollCalllist {
    FullName: string
    Aadhaar: string
    Rollno: string
    Batch_division: string
    MobileNumber: number
    EmailID: string
    Subject_Group_Code: string
    Billdeskdate: string
    Prnno: string
    Emailid: string
}

export interface Ires_Webportal {
    Batch_code: number
    Batch_name: string
    Startdatetime: string
    Enddatetime: string
    Createdby: number
    Editedby: number
}

export interface IDCards {
    Batch_name: string
    Aadhaar: string
    Mobilenumber: string
    Emailid: string
    Fullname: string
    Rollno: string
    Gender: string
    Batch_division: string
    Correpondence_flatno: string
    Correpondence_colonyname: string
    Correpondence_villagename: string
    Correpondence_landmark: string
    Correpondence_location_area: string
    Correpondence_country: string
    Correpondence_state: string
    Correpondence_district: string
    Correpondence_taluka: string
    Correpondence_city: string
    Correpondence_pincode: string
    Dob: string
    Subject_group_code: string
    Subject_group_name: string
    Specially_abled: string
    Parallel_reservation: string
    Category: string
    Subcategory: string
    Grnno: string
    Prnno: string
}

export interface Employee {
    Empid: number
    Full_name: string
    Department: string
    Designation: string
    Address: string
    Dob: string
    Doj: string
    Blood_group: string
    Email: string
    Mobile: string
    Alternate_mobile: string
    Created_date: string
    Modified_date: string
}

export interface Adm_graduation {
    Graduation_id: number
    Graduation_stream: string
}

export interface Queryapi {
    Requesttype: string
    Merchantid: string
    Customerid: string
    Txnreferenceno: string
    Bankreferenceno: string
    Txnamount: string
    Bankid: string
    Filler1: string
    Txntype: string
    Currencytype: string
    Itemcode: string
    Filler2: string
    Filler3: string
    Filler4: string
    Txndate: string
    Authstatus: string
    Filler5: string
    Additionalinfo1: string
    Additionalinfo2: string
    Additionalinfo3: string
    Additionalinfo4: string
    Additionalinfo5: string
    Additionalinfo6: string
    Additionalinfo7: string
    Errorstatus: string
    Errordescription: string
    Filler6: string
    Refundstatus: string
    Totalrefundamount: string
    Lastrefunddate: string
    Lastrefundrefno: string
    Querystatus: string
    Checksum: string
}

export interface Queryapi_refund {
    College_code: number
    Finyear: number
    Receiptid: number
    Requesttype: string
    Merchantid: string
    Customerid: string
    Txnreferenceno: string
    Bankreferenceno: string
    Txnamount: string
    Bankid: string
    Filler1: string
    Txntype: string
    Currencytype: string
    Itemcode: string
    Filler2: string
    Filler3: string
    Filler4: string
    Txndate: string
    Authstatus: string
    Filler5: string
    Additionalinfo1: string
    Additionalinfo2: string
    Additionalinfo3: string
    Additionalinfo4: string
    Additionalinfo5: string
    Additionalinfo6: string
    Additionalinfo7: string
    Errorstatus: string
    Errordescription: string
    Filler6: string
    Refundstatus: string
    Totalrefundamount: string
    Lastrefunddate: string
    Lastrefundrefno: string
    Querystatus: string
    Checksum: string
    Transaction_status: string
}

export interface Childlevel_menu {
    Arrayindex: number
    Parent_order: number
    Parent_name: string
    Childlevel1_order: number
    Childlevel2_order: number
    Childlevel2_name: string
    Childlevel2_url: string
    Childlevel2_icon: string
    Childlevel2_badge: string
    Menukeys: string
}

export interface Child_menu {
    Arrayindex: number
    Parent_order: number
    Parent_name: string
    Childlevel1_order: number
    Childlevel1_name: string
    Childlevel1_url: string
    Childlevel1_icon: string
    Childlevel1_badge: string
    Menukeys: string
    Children: Childlevel_menu[]
}

export interface System_menu {
    Arrayindex: number
    Parent_order: number
    Parent_name: string
    Parent_icon: string
    Parent_url: string
    Parent_badge: string
    Children: Child_menu[]
}

export interface Iicons {
    Name: string
}

export interface Allmenus {
    Menuid: number
    Parent_order: number
    Parent_name: string
    Parent_icon: string
    Parent_url: string
    Parent_badge: string
    Childlevel1_order: number
    Childlevel1_name: string
    Childlevel1_url: string
    Childlevel1_icon: string
    Childlevel1_badge: string
    Childlevel2_order: number
    Childlevel2_name: string
    Childlevel2_url: string
    Childlevel2_icon: string
    Childlevel2_badge: string
}

//Shivam

// export interface IMaster  {
//     Name          : string
//     Url           : string
//     Href          : string
//     Icon          : string
//     IconComponent Iicons
//     Title        : boolean
//     Variant       : string
//     Divider       : boolean
//     Class         : string
// }

// export interface INavData  {
//     IMaster
//     Children []INavData
// }

export interface System_educationdetails {
    Education_details: string
}

export interface Dev_menus {
    Myid: number
    Parentid: number
    Menu_name: string
    Menu_icon: string
    Menu_url: string
    Menu_badge: string
    Menu_disabled: number
    Menu_order: number
    Myarrayindex: number
    Parentarrayindex: number
    Level: number
    Arrayindex: number
    Items: Dev_menus[]
}


///2

export interface Systemusers {
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
    Token: string
    Imei: string
    Approved: boolean
}


export interface ReceiptNumber {
    ReceiptNo: string
}

export interface FeesHead {
    ProjectId: number
    Name: string
    TableName: string
}

export interface Fees_terms {
    Term_Code: number
    Term_Name: string
}

export interface Fees_terms_new {
    Term_code: number
    Term_name: string
}

export interface Fees_head {
    Fees_Code: number
    Fees_Short: string
    Fees_Name: string
    Fees_uuid: string
}

export interface Fees_head_new {
    Fees_code: number
    Fees_short: string
    Fees_name: string
    Fees_uuid: string
}

export interface Fees_installment_d {
    Lineitem: number
    InstallmentID: number
    Finyear: number
    CollegeCode: number
    BatchCode: number
    TermCode: number
    FeesCode: number
    Installmentid: number
    Installment: string
    Amount: number
    Fees_Name: string
    Term_Name: string
}

export interface Fees_installment_h {
    Installment_ID: number
    Installment: string
    Installmentid: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Amount: number
    Activedeactive: number
}


//Shivam
// export interface Fees_installment_h_term  {
//   Fees_installment_h
//   Term_name : string
// }

export interface Fees_batchterms {
    Term_code: number
    Term_name: string
}

export interface Installmentsdetails {
    Batch_name: string
    Term_name: string
    Installmentid: number
    Installment: string
    Amount: string
    Activedeactive: string
}

export interface Billdesk {
    BillerId: string
    BankId: string
    BankRefNo: string
    PGIRefNo: string
    Ref1: string
    SiD: number
    Ref2: string
    Ref3: number
    Ref4: number
    Ref5: number
    Ref6: string
    Ref7: string
    Ref8: string
    Filler: string
    DateOfTxn: string
    SettlementDate: string
    GrossAmountRsPs: string
    ChargesRsPs: string
    GSTRsPs: string
    NetAmountRsPs: string
}

export interface DocumentApproval {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
    Admission_Status: string
    Subject_group_code: string
    Subject_group_name: string
    Batch_name: string
    Batch_short: string
    MobileNumber: string
    EmailID: string
    Inhouse: string
    Hindilinguistic: string
    Studenttype: string
    Formfees: string
    Batchstream: string
    Percentage: number
}

export interface Marksheetapproval {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
    Admission_Status: string
    Subject_group_code: string
    Subject_group_name: string
    Batch_name: string
    Batch_short: string
    MobileNumber: string
    EmailID: string
    Inhouse: string
    Hindilinguistic: string
    Studenttype: string
    Formfees: number
}

export interface StudentsFeeure {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
}

export interface CastDocumentPDF {
    Aadhaar: number
    Cast: string
}

export interface StudentEducationDocumentsPDF {
    Aadhaar: number
    Document_Name: string
    Document_Code: number
    Document_Filename: string
}

export interface NewRegistrations {
    Aadhaar: number
    EmailID: string
    MobileNumber: number
}

export interface StudentSubjectGroup {
    CurrentSubjectGoroup: Subjects_group_h
    SubjectGrouplist: Subjects_group_h[]
}

export interface UpdateSubjectGroupCode {
    CollegeCode: number
    Finyear: number
    BatchCode: number
    Aadhaar: number
    SubjectGroupCode: number
}

export interface OTP {
    Errormessage: string
    Flag: number
    Message: string
    Aadhaar: number
    Emailid: string
    Mobile: string
    OTP: string
    StartTime: string
    EndTime: string
}

export interface Fees_Receipt {
    ReceiptID: number
    ReceiptNo: string
    Msg: string
}

export interface Fees_Receipt_new {
    Receipt_id: number
    Receiptno: number
    Transactionguid: string
    Fullname: string
    Billdeskaccountid: string
}

export interface Cash_Receipt {
    Flag: number
    ReceiptID: number
    ReceiptNo: string
    Msg: string
}

export interface BilldeskStatus {
    ReceiptID: number
    MerchantID: string
    Accountid: string
    CustomerID: string
    TxnReferenceNo: string
    BankReferenceNo: string
    TxnAmount: string
    BankID: string
    Filler1: string
    TxnType: string
    CurrencyType: string
    ItemCode: string
    Filler2: string
    Filler3: string
    Filler4: string
    TxnDate: string
    AuthStatus: string
    Filler5: string
    AdditionalInfo1: string
    AdditionalInfo2: string
    AdditionalInfo3: string
    AdditionalInfo4: string
    AdditionalInfo5: string
    AdditionalInfo6: string
    AdditionalInfo7: string
    ErrorStatus: string
    ErrorDescription: string
    TransactionStatus: string
    Createddate: string
}

export interface AdmissionQuotasubjectGroups {
    Batch_code: number
    Subject_group_id: number
    Subject_group_code: string
    Subject_group_name: string
    Quota_status: string
}

export interface DailyRecipts {
    Receipt_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    BilldeskTranID: string
    Payment_Mode: string
    CreatedDate: string
    Receiptamount: number
    FullName: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
    Billdeskdate: string
}

export interface DailyRecipts_new {
    Receipt_id: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    Receiptamount: number
    Billdesktranid: string
    Payment_mode: string
    Createddate: string
    Fullname: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
    Billdeskdate: string
}

export interface NewStudents {
    Aadhaar: number
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    Gender: string
    Mobilenumber: number
    Batch_name: string
}

export interface Student_Documents {
    Document_ID: number
    Aadhaar: number
    Finyear: number
    College_code: number
    Batch_code: number
    Document_code: number
    Document_Name: string
    Document_status: string
    Reason: string
    ApprovedBy: number
    Document_Filename: string
    Upload_Status: string
}

export interface Students_outstanding {
    Lastyear_id: number
    Batch_name: string
    Aadhaar: number
    MobileNo: number
    FullName: string
    Outstanding: number
    Subject_group_code: string
}

export interface System_Users {
    Aadhaar: number
    User_pwd: string
    User_Name: string
    Userrole: string
    Approved: string
}

export interface Courseapplied {
    Batch_code: string
    Batch_name: string
    Subject_group_id: string
    Subject_group_code: string
    Subject_group_name: string
    Receiptamount: number
}

export interface Applied_nepcourse {
    Batch_code: string
    Batch_name: string
    Subject_group_id: string
    Subject_group_code: string
    Subject_group_name: string
    Receiptamount: number
}

export interface Ires_ApprovedCourse {
    Batch_code: string
    Batch_name: string
    Subject_group_id: string
    Subject_group_code: string
    Subject_group_name: string
}

export interface Dashboard {
    Batch_code: number
    Batch_short: string
    Batch_name: string
    Subject_group_code: string
    Subject_group_name: string
    FormFeesPaid: number
    ProfileCompleted: number
    DocumentApproved: number
    FeesAttached: number
    FeesPaid: number
}

export interface AdmissionStatusreport {
    Batch_code: number
    Batch_short: string
    Batch_name: string
    TotalFormFeesPaid: number
    TotalProfileCompleted: number
    TotalDocumentApproved: number
    TotalFeesAttached: number
    TotalFeesPaid: number
    TotalCancelled: number
    TotalAdmission: number
    Subjects: SubjectwiseStatus[]
}

export interface SubjectwiseStatus {
    Batch_code: number
    Batch_short: string
    Batch_name: string
    Subject_group_code: string
    Subject_group_name: string
    FormFeesPaid: number
    ProfileCompleted: number
    DocumentApproved: number
    FeesAttached: number
    FeesPaid: number
    Cancelled: number
    TotalAdmission: number


}

export interface Fees_Prefix {
    Prefix_code: number
    Prefix_name: string
    Prefix_desc: string
    AccountNo: string
}

export interface Banks {
    Bank: string
}

export interface Admissioncancellist {
    Finyear: number
    College_code: number
    Cancel_id: number
    Batch_code: number
    Batch_name: string
    Aadhaar: number
    Reason: string
    Bankname: string
    Accountholdername: string
    Bankbranch: string
    Accountno: string
    Ifsccode: string
    Createddate: string
    Approvedby: number
    Approveddate: string
}

export interface FeesPaid {
    Batch_code: string
    Batch_name: string
    Aadhaar: string
    MobileNumber: string
    EmailID: string
    FullName: string
    Batch_Division: string
    Rollno: string
    Admission_Status: string
    Term_Name: string
    Amount: number
    Billdesk: string
    CancelledBy: string
    CancelDate: string
    Subject_group_code: string
    Minor: string
    Prnno: string
}

export interface Ires_FeesSum {
    Batch_name: string
    Fees_name: string
    Term_name: string
    Installment: string
    Fees_code: number
    Amount: number
    Adjustmentamount: number
}

export interface AccountCollection {
    Batch_name: string
    Aadhaar: string
    MobileNumber: string
    EmailID: string
    FullName: string
    Term_Name: string
    Prefix_name: string
    Installment: string
    Payment_mode: string
    Receiptno: string
    Billdesktranid: string
    Receiptamount: number
    BilldeskDate: string
    Subject_group_code: string
    Narration: string
}

export interface StudentProfileList {
    Aadhaar: number
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    Gender: string
    Dob: string
    CorrepondenceFlatNo: string
    CorrepondenceColonyName: string
    CorrepondenceVillageName: string
    CorrepondenceLandmark: string
    CorrepondenceLocationArea: string
    CorrepondenceCountry: string
    CorrepondenceState: string
    CorrepondenceDistrict: string
    CorrepondenceTaluka: string
    CorrepondenceCity: string
    CorrepondencePincode: number
    Finyear: number
    PhotoFileName: string
    AadhaarFilename: string
    SignatureFileName: string
}

export interface Tallyreceipt {
    Fees_name: string
    Amount: string
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
}

export interface Feesdetails {
    Fees_code: number
    Fees_name: string
    Amount: number
}

export interface Tally_yearwise {
    BilldeskDate: string
    Fin_year: number
    Total: number
}

export interface Online_receipt {
    Finyear: number
    Fees_code: number
    Fees_name: string
    Fees_short: string
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
    Amount: number
    Narration: string
}

export interface Tally_Feesdetails {
    BilldeskDate: string
    Fees_code: number
    Fees_name: string
    Fees_short: string
    Amount: number
}

export interface Tally_Header {
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
    Narration: string
    Totalamount: number
    Fees: Tally_Feesdetails[]
    Year: Tally_yearwise[]
}

export interface Receipts_tally {
    Receipt_id: number
    Finyear: string
    Aadhaar: string
    Batch_code: number
    Batch_division: string
    Rollno: string
    Fullname: string
    Term_name: string
    Admission_status: string
    Installment: number
    Cancelledby: string
    Payment_mode: string
    Receiptno: string
    Fees_code: number
    Fees_name: string
    Receiptamount: number
    Feesamount: number
    Fees_short: string
    Billdeskdate: string
    Prefix_code: number
    Transcationmode: string
}

export interface Receipts {
    Receipt_id: number
    Batch_name: string
    Aadhaar: string
    Fullname: string
    Batch_Division: string
    Rollno: string
    Prefix_name: string
    Term_name: string
    Cancelledby: string
    Admission_status: string
    Receiptno: number
    Receiptdate: string
    Payment_mode: string
    Transcationmode: string
    Prefix_code: number
    Term_code: number
    College_code: number
    Finyear: number
    Batch_code: number
    Receiptamount: number
    Installment: number
    Billdesktranid: string
    Billdeskdate: string
    Billdeskid: string
    Transactionguid: string
    Createddate: string
    Bank: string
    Chequeno: string
    Chequedate: string
    Createdby: string
    Narration: string
    Feesure: Feesdetails[]
}

export interface Websitelist {
    Batch_code: number
    Batch_name: string
    Sitename: string
    Studenttype: string
    Startwebsite: number
    Remarks: string
}

export interface Admissionrelesedate {
    Batch_code: number
    Batch_name: string
    Admissionstarted: number
    Outside_admission: number
    Outside_message: string
    Atkt_admission: number
    Atkt_message: string
}

export interface Website {
    Remarks: string
    Startwebsite: number
    Status: string
}

export interface Rollcallconfig {
    Batch_code: number
    Batch_name: string
    Subject_group_code: string
    Subject_names: string
    Batch_division: string
    Rollno_from: string
    Rollno_to: string
}

export interface Admissioncanceldata {
    Cancel_id: number
    Finyear: number
    Tofinyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Reason: string
    Bankname: string
    Accountholdername: string
    Bankbranch: string
    Accountno: string
    Ifsccode: string
    Createddate: string
    Approvedby: number
    Approveddate: string
    Batch_name: string
    Fullname: string
    Signature_img: string
}

export interface FeesHeadNames {
    Fees_code: number
    Fees_name: string
    Amount: number
}

export interface Unpaidstudents {
    Aadhaar: number
    Fullname: string
    Mobilenumber: number
    Emailid: string
    Admission_status: string
}

export interface Feesterm {
    Student_Installment_ID: number
    CollegeCode: number
    FinYear: number
    Batch_code: number
    Term_code: number
    Aadhaar: number
}

export interface Fees_Receiptmaster {
    Receipt_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    BilldeskID: number
    BilldeskTranID: string
    BilldeskDate: string
    Payment_Mode: string
    TransactionGUID: string
    ReceiptAmount: number
    CreatedDate: string
    Bank: string
    Chequeno: string
    Chequedate: string
    CreatedBy: number
    Narration: string
    Transcationmode: string
    Printreceiptno: string
}


//Shivam
// export interface Fees_Receiptmaster_new  {
//   Receipt_id      : number
//   Finyear         : number
//   College_code    : number
//   Batch_code      : number
//   Aadhaar         : number
//   Term_code       : number
//   Installment     : number
//   Receiptno       : number
//   Prefix_code     : number
//   Billdeskid      : number
//   Billdesktranid  : string
//   Billdeskdate    : string
//   Payment_mode    : string
//   Transactionguid : string
//   Receiptamount   : float
//   Createddate     : string
//   Bank            : string
//   Chequeno        : string
//   Chequedate      : string
//   Createdby       : number
//   Narration       : string
//   Transcationmode : string
// }

//Shivam
// export interface Fees_receipt  {
//   Fees_:Receiptmaster_new
//   Fullname  : string
//   Email     : string
//   Mobile    : number
//   Batch_name :string
//
// }


//Shivam
// export interface Admission_date  {
//   Fees_Receiptmaster
//   Admission_date : string
// }


//Shivam
// export interface Printreceipt  {
//   Fullname        :string
//   Mobile          :string
//   Emailid         :string
//   Batchname       :string
//   Totalbillamount : number
//   Header          :Fees_Receiptmaster
//   Lineitem        :Fees_Installment_detail
// }

//Shivam
// export interface APrintreceipt  {
//   Data :Printreceipt[]
// }

//Shivam
// export interface Printprofile  {
//   Signature_path :string
//   Photo_path     :string
//   Aadhaar_path   :string
//   Signature_img  :string
//   Photo_img      :string
//   Aadhaar_img    :string
//   Batchname     : string
//   Aadhaar        :string
//   Printedon      :string
//   Registration  : Student_registration_new
//   Students       :Students_new
//   Profile       : Student_profile_new
//   Reservations  : Student_reservations_new
//   Batch         : Batchs_new
//   Education     : Student_educations_new
//   Receipt       : Fees_Receiptmaster
//   Subjectgroup  : BatchSubjectGroup
//   Nepsubjects    :string[]
// }

export interface Ires_PaidBatchs {
    Finyear: number
    Batch_code: number
    Batch_name: string
    Installment: number
}

export interface Paidfinyear {
    Finyear: number
}

export interface FeesReceipt {
    Receipt_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    BilldeskTranID: string
    Payment_Mode: string
    CreatedDate: string
    Receiptamount: number
    FullName: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
}

export interface Cancelemail {
    Fullname: string
    Emailid: string
    Batchname: string
    Canceldate: string
}

export interface Meritlist {
    Batch_code: string
    Batch_name: string
    Subject_group_code: string
    Fullname: string
    Aadhaar: string
    Mobilenumber: string
    Emailid: string
    Gender: string
    Category: string
    Subcategory: string
    Specially_abled: string
    Document_type: string
    Inhouse: string
    Hindilinguistic: string
    Batchstream: string
    Marksobtained: string
    Outoff: string
    Percentage: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    Billdate: string
    Paidamount: string
    Term_code: string
    Term_name: string
    Admission_status: string
    Minor: string
    Oe: string
    Vsc: string
    Sec: string
    Aec: string
    Vec: string
    Iks: string
    Cc: string
}

export interface Batch_educationdocuments {
    Batch_code: string
    Education_details: string
    Education_code: string
}

export interface Paidfees {
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Receiptamount: number
}


//Shivam
// export interface Outstanding_students  {
//   Students_new
//   Fullname : string
//   TotalFees: number
//   Paid     : number
// }

export interface Studentreceipts {
    Batch_name: string
    Aadhaar: string
    Fullname: string
    Batch_Division: string
    Rollno: string
    MobileNumber: string
    EmailID: string
    Freeship: string
    Billdesktranscation: string
    Billdeskdate: string
    Amount: string
}

export interface Downloadbilldesk {
    BillerId: string
    Bdrefno: string
    Ref1: string
    Ref2: string
    Ref3: string
    Ref4: string
    Ref5: string
    Ref6: string
    Ref7: string
    Ref8: string
    Settlementdate: string
    Gross: string
    Charges: string
    Servicetax: string
    Surcharge: string
    Tds: string
    Netamount: string
    Sheettype: string
    Settlementdate_d: string
}

export interface Donwloadbilldeskrefund {
    Billername: string
    Debittype: string
    Paymode: string
    Productcode: string
    Bdrefno: string
    Ourid: string
    Ref1: string
    Ref2: string
    Ref3: string
    Ref4: string
    Createdon: string
    Transactionamount: string
    Refundid: string
    Refunddate: string
    Refundamount: string
}


//Shivam
// export interface Batchcollection  {
//   Prefix_code    : number
//   Batch_code     : number
//   Batch_name     : string
//   Term_code      : number
//   Term_name       :string
//   Totalstudents  : number
//   Totaltermfees  : number
//   Totalfees       :number
//   Totalcollection : float
//   Outstanding     :number
//   Accountno       : string
// }

export interface Fees_installment_h_new {
    Installment_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Installmentid: number
    Installment: string
    Amount: number
    Activedeactive: number
}

export interface Fees_prefix {
    Finyear: number
    College_code: number
    Prefix_code: number
    Prefix_name: string
    Prefix_desc: string
    ReceiptNo: number
    AccountNo: string
    BilldeskAccountid: string
}

export interface Fees_prefix_batchs {
    Finyear: number
    College_code: number
    Batch_code: number
    Prefix_code: number
    Createddate: string
    Createdby: string
    Ipaddr: string
    Editedby: string
    Editdate: string
}

export interface Fees_istallment_d {
    Lineitem: number
    Installment_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Fees_code: number
    Installmentid: number
    Installment: string
    Amount: number
}

//Shivam
// export interface Scholarship  {
//   Billdeskid      : number
//   Billdesktranid  :string
//   Transactionguid :string
//   Registration    :Student_registration_new[]
//   Studentdata     :Students_new[]
//   Studentprofile  :Student_profile_new[]
//   Paidfees        :DailyRecipts[]
//   Feesure   :Feesure[]
// }

export interface Fees_receiptscholarship {
    Receipt_id: number
    Fees_code: number
    Aadhaar: number
    Term_code: number
    Amount: number
    Finyear: number
    College_code: number
}

export interface Student_abcdid {
    Studentaadhaar: string
    Loginaadhaar: number
    Finyear: number
    Collegecode: number
    Aadhaarname: string
    Dob: string
    Gender: string
    Rollno: number
    Mobileno: string
    Abcdid: string
    Approved_status: string
    Useraadhaar: number
    Createddate: string
    Modifieddate: string
    Reason: string
    Blobdata: string
}

export interface BilldeskpaymentResponse {
    ReceiptNo: string
    Receiptdate: string
    Flag: number
}

export interface Course_print {
    Courseid: number
    College_code: number
    Finyear: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Father: string
    Mother: string
    College: string
    Class: string
    Division: string
    Rollno: number
    Mobileno: number
    Emailid: string
    Receiptamount: number
    Coursecode: number
    Transactionid: number
    Billdate: string
    Fullname: string
}

export interface Resp_document {
    Finyear: number
    Collegecode: number
    Documentid: number
    Moduletype: string
    Documenttype: string
    Orgid: number
    Orgname: string
    Empid: number
    Empname: string
    Documentsubject: string
    Documentno: string
    Documentdate: string
    Remarks: string
    Createddate: string
    Createdby: number
}

export interface Resp_pdf {
    Image: string
    Filename: string
}

export interface Resp_Orginization {
    Orgid: number
    Orgname: string
    Concatperson: string
    Contactmobile: string
    Contactemail: string
    Orgtype: string
    Createdby: number
    Createdon: string
    Modifiedby: number
    Modifiedon: string
}

//3
export interface Students_marks {
    Subject_order: number
    Aadhaar: number
    Marks: number
    Examcode: number
    Grade: string
    Showgrade: number
    Manual_grace: number
    Atktfailpass: string
    Totalmarks: number
}

export interface Student_subject {
    Aadhaar: number
    Subject_short: string
    Subject_name: string
    Subject_order: number
    Papercode: string
    Marks: Students_marks[]
}

export interface Junior_students {
    Aadhaar: number
    Fullname: string
    Batch_divison: string
    Rollno: string
    Gender: string
    Batch_name: string
    Prn: string
    Grnno: string
    Subjects: Student_subject[]
}

export interface Junior_exams {
    Examcode: number
}

export interface Student_subject_new {
    Studentsubject_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_order: number
    Aadhaar: number
    Createddate: string
    Editeddate: string
    Passfail: string
}

export interface Marksheet_config_jr {
    Subject_order: string
    Subject_name: string
    Papercode: string
    Showgrade: string
    Showdash: string
}

//Shivam
// export interface Junior_marksheet  {
//   Printdate       :string
//   Printmonth     :string
//   Batchname       :string
//   Profile         :SStudents[]
//   Studentsubjects :Student_subject_new[]
//   Marks           :SMarks[]
//   Allexams        :Junior_exams[]
//   Config          :Marksheet_config_jr[]
// }

//4

export interface BatchSemester {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
}

export interface BatchSemesterExam {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
}

export interface Semester {
    Semester: number
}

export interface Ires_Studentmarklist {
    Finyear: number
    Batch_code: number
    Semester: number
    Batchexam_id: number
    Userexamname: string
    Batch_name: string
    Template: string
    Aadhaar: number
}

export interface BatchSubjectGroup {
    Batch_code: number
    Subject_group_code: string
    Subject_group_name: string
}

export interface BatchSemesterexamsubjects {
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface SemesterDescription {
    Batchexam_id: number
    Userexamid: number
    Examdescription: string
}

export interface BatchSemesterSubjectGroup {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
}

export interface BatchSemesterSubjects {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface Batchtemplatesubjects {
    College_code: number
    Finyear: number
    Batch_code: number
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface BatchSemesterSubjectPaper {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
}

export interface BatchSemesterSubjectPaperType {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
    PaperType: string
    Aaadhaar: number
    BatchDivision: string
    Rollno: number
    Marks: number
    Present_Absent: string
}

export interface Exams {
    Examcode: number
    Examname: string
}

export interface BatchSemesterSubjectPaperExamStudent {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
    Examcode: number
    Aadhaar: number
    BatchDivision: string
    Rollno: number
    Marks: number
    Present_Absent: string
}

export interface Students {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_Status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_Code: number
    Term_Name: string
    CreatedDate: string
    Batch_Division: string
    CancelledBy: number
    CancelDate: string
}

export interface Marksheet_Subjects {
    Subject_order: number
    Subject_short: string
    Subject_name: string
}

export interface Marksheet_subjectsmarks {
    Aadhaar: number
    Subject_group_code: string
    RollNo: number
    FullName: string
    Batch_Division: string
    Subject_order: number

    MarksId: number
    Marks: number
    Present_absent: string
    Manualgrace: number
    Exempted: string
}

export interface Marksheet_template {
    Config_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
    Credit_points: number
    Min_marks: number
    Max_marks: number
    Convert_marks: number
    Sys_min: number
    Sys_max: number
    Slabid: number
    Showgrade: boolean
    Showdash: boolean
    Subject_finyear: string
    Useraadhaar: number
    Paperexamdate: string
    Paperexamtime: string
    Createddate: string
    Modifydate: string
}

export interface Marksheet_examlist {
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Userexamid: number
    Examdate: string
    Semester: string
    Exam_date: string
    Userexamname: string
    Createddate: string
    Modifydate: string
    Createdby: string
    Modifyby: string
    Template: string
    Nss_grace: string
    Nss_symbol: string
    Condonation_grace: string
    Condonation_symbol: string
    Subject_Grace: string
    Subject_symbol: string
    Gradejump: number
    Gradejumpsymbol: string
    Slabid: number
    Slabname: string
    Releaseddate: string
    Certificatename: string
    Printdate: string
    Numberofsemester: number
    Overallcreditpoints: string
    Examtype: string
}

export interface Marksheet_slab {
    Slabid: number
    Slabname: string
}

export interface Marksheet_batchexams {
    Batchexam_id: number
    Userexamname: number
    Semester: string
    Userexamid: number
}

export interface Marksheet_subjects {
    Config_Id: number
    College_Code: number
    Finyear: number
    Batch_Code: number
    Semester: number
    Examcode: number
    Subject_group_code: string
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
}

export interface StudentSubjects {
    Studentsubject_id: number
    FullName: string
    Aadhaar: string
    Rollno: string
    Batch_division: string
    Subject_order: number
    Passfail: string
}

export interface Atktstduents {
    Student_id: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Fathername: string
    Mothername: string
    Gender: string
    Rollno: string
    Prnno: string
    Specialisation: string
    Markscale: string
}


//Shivam
// export interface SelectedSemster {
// 	Batchexam Marksheet_batchexam
// 	Userexam  Marksheet_userexams
// 	Batchs    Batchs_new
// 	//Batch_name  string
// 	//Batch_short string
// }

export interface Marksheet_batchexam {
    Batchexam_id: number
    Userexam: number
    College_code: number
    Finyear: number
    Batch_code: number
    Examdate: string
    Template: string
    Nss_symbol: string
    Nss_grace: string
    Condonation_symbol: string
    Condonation_grace: string
    Subject_symbol: string
    Subject_grace: string
    Gradejump: string
    Gradejumpsymbol: string
    Createddate: string
    Modifydate: string
    Createdby: string
    Modifyby: string
    Printdate: string
    Slabid: string
    Blanklines: number
    Releaseddate: string
    Certificatename: string
    Numberofsemester: string
    Examtype: string
    Overallcreditpoints: number
    Exammonthyear: string
    Eventdate: string
    Onlyprintdate: string
    Rledate: string
}

export interface Marksheet_userexams {
    Userexamid: number
    Userexamname: string
    Semester: number
    Semestertype: string
    Marksheetdisplay: string
}

export interface Marksheet_internalexams {
    Userexamid: number
    Userexamname: string
}

export interface Othercourse {
    Other_id: number
    Aadhaar: string
    Semester: number
    Lineitem: number
    Coursename: string
    Creditearned: number
    Specialisation: string
}

export interface Eligiblity {
    Aadhaar: number
    Eligiblestatus: number
}

export interface LCstudents {
    College_code: number
    Finyear: number
    Batch_code: number
    Aadhaar: string
    Reg_no: string
    Udise_no: string
    Stream: string
    Gr_no: string
    Division: string
    Rollno: string
    Ay: string
    Lc_serial_no: string
    Student_id_no: string
    Uid: string
    Student_name: string
    Mother_name: string
    Religion_cast_subcast: string
    Nationality: string
    Mother_tongue: string
    Place_of_birth: string
    Dob: string
    Dob_words: string
    Last_school_attednded: string
    Elevth_date_of_admission: string
    Progress: string
    Conduct: string
    Date_of_leaving_college: string
    Twelth_when: string
    Reason: string
    Remarks: string
    Admission_status: string
    Twelth_when_word: string
    Twelth_adm_date: string
    Twelth_words1: string
    Twelth_words2: string
    Subject_group_id: string
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: string
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: string
    Canceldate: string
    Prnno: string
    Sportstaken: string
    Grnno: string
    Freeship: string
    Specialisation: string
}

export interface Certificate {
    Aadhaar: number
    Fullname: string
    Batch_divison: string
    Rollno: number
    Gender: string
    Batch_name: string
    Prnno: string
    Grnno: string
    Overall_cgps: number
    Overall_grade: string
    Certificatename: string
    Semester: number
    Printdate: string
    Exammonthyear: string
}

export interface Marksheet_convert {
    Marks_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Aadhaar: number
    Marks: number
    Manual_grace: number
    Manual_symbol: string
    Subjectgrace: number
    Nss_grace: number
    Nss_symbol: string
    Subject_grace: number
    Subject_symbol: string
    Condonation_grace: number
    Condonation_symbol: string
    Totalmarks: number
    Pass_fail: number
    Present_absent: string
    Presentabsent: number
    Subject_group_code: string
    Useraadhaar: number
    Grade: string
    Gradepoint: number
    Credit_points: number
    Cg: number
    Sgpa: number
    Finalgrade: string
    Createdon: string
    Subject_short: string
    Subject_name: string
    Credit_Points: number
    Min_Marks: number
    Max_Marks: number
    Papercode: string
    Totalorders: number
    Batchexam_id: number
    Rowtotal: number
    Marks_required: number
    Marks_requredcount: number
    Data_id: number
    Gracerule: string
    Exempted: string
    Atktfailpass: string
    Creditearned: number
    Converted_marks: number
    PrintMax: string
    PrintMin: string
    APECM: string
    Totalgracemarks: number
    Showdash: boolean
    Showgrade: boolean
    Convocation: string
    Createddate: string
    Modifydate: string
    Percentage: number
}

export interface Marksheet_convert_new {
    Marks_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Aadhaar: number
    Marks: number
    Manual_grace: number
    Manual_symbol: string
    Subjectgrace: number
    Nss_grace: number
    Nss_symbol: string
    Subject_grace: number
    Subject_symbol: string
    Condonation_grace: number
    Condonation_symbol: string
    Totalmarks: number
    Pass_fail: number
    Present_absent: string
    Presentabsent: number
    Subject_group_code: string
    Useraadhaar: number
    Grade: string
    Gradepoint: number
    Credit_points: number
    Cg: number
    Sgpa: number
    Finalgrade: string
    Createdon: string
    Subject_short: string
    Subject_name: string
    Credit_Points: number
    Min_Marks: number
    Max_Marks: number
    Papercode: string
    Totalorders: number
    Batchexam_id: number
    Rowtotal: number
    Marks_required: number
    Marks_requredcount: number
    Data_id: number
    Gracerule: string
    Exempted: string
    Atktfailpass: string
    Creditearned: number
    Converted_marks: number
    PrintMax: string
    PrintMin: string
    APECM: string
    Totalgracemarks: number
    Showdash: boolean
    Showgrade: boolean
    Convocation: string
    Createddate: string
    Modifydate: string
    Percentage: number
}

export interface Marksheet_config {
    Config_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
    Credit_points: number
    Min_marks: number
    Max_marks: number
    Convert_marks: number
    Sys_min: number
    Sys_max: number
    Slabid: number
    Showgrade: number
    Showdash: boolean
    Createddate: string
    Modifydate: string
    Subject_finyear: string
    Paperexamdate: string
    Paperexamtime: string
    Useraadhaar: number
}

export interface Marksshet_semester {
    Aadhaar: number
    Semester: number
    Semestername: string
    Sgpa: number
    Creditearned: number
}

export interface Marksheet_sgpaaadhaar {
    Sgpa_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Aadhaar: number
    Sgpa: number
    Creditearned: number
    Overall_creditmulsgpa: number
    Overall_cgpa: number
    Overall_grade: string
    Data_id: number
    Batchexam_id: number
    Fullname: string
    Creditpoints: number
}

export interface Marksheet_studentsubjects {
    Studentsubject_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_order: number
    Aadhaar: number
    Createddate: string
    Editeddate: string
    Passfail: string
}


//Shivam
// export interface Hallticket_subjects {
// 	Marksheet_studentsubjects
// 	Paperexamdate :string
// 	Paperexamtime :string
// 	Papercode     :string
// 	Subject_name  :string
// 	Subject_short :string
// }

export interface Ires_Marksheet_marksinternal {
    Marks_id: number
    Data_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Userexamid: number
    Subject_order: number
    Aadhaar: number
    Marks: number
    Present_absent: string
    Presentabsent: number
}

//Shivam
// export interface Displaymarks {
// 	Marksheet_marksinternal
// 	Subject_name string
// 	Examname     string
// 	Batchexam_id : number
// }


//Shivam
// export interface Downloadinternalmarks {
// 	Marksheet_marksinternal
// 	Subject_name   :string
// 	Examname       :string
// 	Batch_division :string
// 	Rollno        : number
// 	Fullname       :string
// }

export interface Internalexamnames {
    Userexamid: number
    Userexamname: string
}

export interface Aadhaar_grade {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Overall_cgpa: number
    Overall_grade: string
}

export interface SemsterSubjects {
    Subject_Group: string
    Subject_order: string
    Subject_name: string
    Subject_short: string
}

export interface Studentsubjects {
    Aadhaar: number
    Subject_short: string
    Subject_name: string
    Subject_order: number
    Papercode: string
}

export interface Value_earned {
    Aadhaar: number
    Totalearned: number
}


//Shivam
// export interface Marksheet {
// 	Marksheet_convert :Marksheet_convert[]
// 	Profile           :Student_profile_new[]
// 	Students          :Students_new[]
// 	Sgpa              :Marksheet_sgpaaadhaar[]
// 	Config            :Marksheet_config[]
// 	Valueadded        :Value_earned[]
// }

export interface Marksheet_new {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: number
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: number
    Canceldate: string
    Prnno: number
    Sportstaken: number
    Grnno: number
    Freeship: string
    Specialisation: string

    Profile: Student_profile_new
    Marks: Marksheet_convert[]
    Sgpa: Marksheet_sgpaaadhaar[]
    Valueadded: number
}

export interface Convercation {
    Aadhaar: string
    Convocation: string
}

export interface Marksheet_dse {
    Batchcode: number
    Semester: string
    Subjectname: string
}

export interface Marksheet_dsesemester {
    Semester: string
}

export interface Marksheet_dsesubjects {
    Subjectname: string
}

export interface Marksheet_student_dse {
    Studentdse_id: number
    Finyear: number
    Collegecode: number
    Batchcode: number
    Aadhaar: number
    Semester: string
    Subjectname: string
    Finalsubmited: number
}

export interface Atkt_student {
    Batchexam_id: number
    Finyear: number
    Batch_code: number
    Aadhaar: number
    Semester: number
    Failcount: number
    Batch_name: string
    Fullname: string
    Userexamname: string
    Fail: number
    Amount: number
    Subjects: string
}

export interface Atkt_subjects {
    Subject_name: string
}

export interface Atkt_aadhaar {
    Aadhaar: string
}

export interface Atkt_failsubjects {
    Finyear: number
    Batch_code: number
    Aadhaar: number
    Semester: number
    Subject_order: number
    Subject_name: string
    Batchexam_id: number
    Userexamname: string
    Fullname: string
}

export interface Resp_Atktoutside {
    Student_id: number
    College_code: number
    Finyear: number
    Batchexam_id: number
    Batch_code: number
    Semester: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Fathername: string
    Mothername: string
    Gender: string
    Rollno: number
    Fullname: string
    Prnno: string
    Specialisation: string
    Markscale: number
    Formtype: string
    Lastexamyear: number
}

export interface Resp_Atktsubjects {
    Finyear: number
    Studentsubject_id: number
    Studentdetail_id: number
    Batch_name: string
    Semester: string
    Subject_order: number
    Subject_name: string
}

export interface Resp_marksheet_outsidesgpa {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Createddate: string
    Modifydate: string
    Useraadhaar: number
    Finyear: number
}

export interface Marksheet_batch_sem_subjects {
    Batch_code: number
    Semester: number
    Subject_code: number
    Subject_name: string
}

export interface Outside_students_subjects {
    Batch_code: number
    Semester: number
    Subject_code: number
    Papercode: string
    Subject_name: string
    Subject_order: number
    Subject_finyear: string
    Finyear: number
    Displayname: string
}

export interface All_marks {
    Batch_name: string
    Semester: string
    Subject_order: string
    Papercode: string
    Subject_name: string
    Marks: number
}

export interface Fail_subjects {
    Batchexam_id: number
    Batch_code: number
    Batch_name: string
    Aadhaar: number
    Subject_order: number
    Subject_name: string
    Semester: number
    Papercode: string
    Boardlevel: string
    Finyear: number
}

export interface Atkt_formfees {
    Formid: number
    Formamount: number
    Formcount: number
}

export interface Resp_Atkt_subjects {
    Atkt_formid: number
    Receipt_id: number
    Batchexam_id: number
    Batch_code: number
    Semester: number
    Subject_order: number
    Subject_name: string
    Papercode: string
    Finyear: number
    Subject_finyear: string
    College_code: number
    Aadhaar: number
    Boardlevel: string
    Batch_name: string
}

export interface Fees_receiptatkt {
    Receipt_id: number
    Finyear: number
    College_code: number
    Aadhaar: number
    Prefix_code: number
    Receiptno: number
    Transactionguid: string
    Accountno: string
    Billdeskid: number
    Billdesktranid: string
    Billdeskdate: string
    Payment_mode: string
    Receiptamount: number
    Bank: string
    Chequeno: string
    Chequedate: string
    Narration: string
    Transcationmode: string
    Errcode: string
    Errorname: string
    Batchexamid: string
    Billdeskstatus: string
    Billdeskerror: string
    Createddate: string
    Createdby: number
    Formtype: string
    Firstname: string
    Lastname: string
    Fathername: string
    Mothername: string
    Gender: string
    Rollno: string
    Prnno: string
    Prefix_month: string
    Batch_code: number
    Semester: number
    Mobileno: string
    Fullname: string
    Batch_name: string
    Billdeskresponse: string
    Penaltyamt: number
    Refund: number
    Subjects: Resp_Atkt_subjects[]
}

export interface Atkt_prefix {
    Prefix_code: number
    Prefix_month: string
    Startdate: string
    Enddate: string
    Active: number
    Perdaypenalty: number
    Examtype: string
    Penaltyamount: number
}

export interface Marksheet_atktstudents_formd {
    Atkt_formid: number
    Receipt_id: number
    College_code: number
    Finyear: number
    Aadhaar: string
    Batch_code: number
    Batchexam_id: number
    Semester: number
    Subject_order: number
    Papercode: string
    Subject_name: string
    Subject_finyear: string
    Boardlevel: string
    Registerfinyear: string
    Marksheetno: string
}

//55

export interface Mobileloggedin {
    Registered: number
    Token: string
}

export interface CreateUser {
    CollegeCode: number
    Aadhaar: number
    UserPwd: string
    UserRole: string
}

export interface Tickets {
    Ticketid: number
    Collegecode: number
    Finyear: number
    Aadhaar: number
    Ticketdate: string
    Category: string
    Ticketsubject: string
    Ticketdescription: string
    Replayuser: number
    Ticketstatus: string
    Assigneduser: number
}

export interface Ticketdetails {
    Ticketid: number
    Detailid: number
    Aadhaar: number
    Ticketdate: string
    Ticketdescription: string
    Replayuser: string
    Studentname: string
    Adminname: string
}

export interface Student_registration {
    Aadhaar: number
    EmailID: string
    MobileNumber: number
    StudentPassword: string
    CreatedDate: string
    StudentGuid: string
    Finyear: number
    College_code: number
    Forgottoken: string
    Otp: string
    OTP_starttime: string
    OTP_endtime: string
    ExistingStudent: number
    ExistingSubjectGroupCode: string
    Existingbatchcode: number
    Inhouse: string
    Hindilinguistic: string
}

export interface StudentRegistrationFees {
    Paid: number
}

export interface MyProfile {
    FullName: string
    Aadhaar: string
    Email: string
    Mobile: string
    Batch: string
    DOB: string
    PRN: string
    Gender: string
    MotherTongue: string
    Marital_Status: string
    Createdate: string
}

export interface Myprofile_new {
    FullName: string
    Aadhaar: string
    Email: string
    Mobile: string
    Batch: string
    DOB: string
    PRN: string
    Gender: string
    MotherTongue: string
    Marital_Status: string
    Createdate: string
}

export interface Admissionbatchs {
    Batch_name: string
    Aadhaar: number
    Subject_group_code: string
    Subject_group_name: string
    Rollno: number
    Batch_division: string
    Totalpaid: number
    Boardlevel: string
}

// export interface  DashboardProfile {
//
// }

export interface Education_Document {
    Batch_Code: number
    Education_Details: string
}

export interface Education_Document_new {
    Batch_code: number
    Education_details: string
    Education_code: string
}

export interface Ires_Upload_Document {
    Batch_Code: number
    Document_Code: number
    Document_Name: string
    Document_Filename: string
    Upload_Status: string
}


//Shivam

//
// export interface  Student_ProfileStatus {
//     Profile         Student_Profile
//     Education       bool db:"Education"
//     Reservation     Student_Reservations
//     ProfileCount    int
//     ProfileSubmited bool
// }

// Fees Installments
export interface Installments_M {
    BatchName: string
    FullName: string
    Emailid: string
    Mobile: string
    Installment_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Installmentid: number
    Installment: string
    Amount: number
}

export interface Fees_Installment {
    Installment_ID: number
    Lineitem: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Fees_code: number
    Fees_Name: string
    Installment: string
    Amount: number
}


//Shivam
// export interface  Ins_MasterDetails {
//     Header   Installments_M
//     Lineitem []Fees_Installment
// }
//
// export interface  Installments {
//     Freeship           :    string
//     InstallmentAlreadyPaid bool
//     Installments           []Ins_MasterDetails
// }

///

// / Student Paid Receipt
export interface PaidInstallments_M {
    BilldeskTranID: string
    Receipt_ID: number
    Installment_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Installmentid: number
    Installment: string
    Amount: number
    Prefix_name: string
    Receiptno: string
    Receiptdate: string
    FullName: string
    BatchName: string
    Mobile: string
    Email: string
    Totalfees: number
    Lineitem: Fees_Installment[]
}


//Shivam
// export interface  Ins_PaidMasterDetails {
//     Header   PaidInstallments_M
//     Lineitem []Fees_Installment
// }
//
// export interface  PaidInstallments {
//     ErrorMessage string
//     Installments []Ins_PaidMasterDetails
// }

export interface Student_Profile {
    ErrorMessage: string
    Batch_Name: string
    Batch_code: number
    Nextbatchcode: number
    Finyear: number
    College_Code: number
    Aadhaar: number
    Student_Guid: string
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    RelationType: string
    Applicant_Name_On_Marksheet: string
    Name_Change_after_passing: string
    Gender: string
    DOB: string
    PlaceOfBirth: string
    Religion: string
    MotherTongue: string
    Marital_Status: string
    NomineeName: string
    NomineeDOB: string
    NomineeRelation: string
    VoterID: string
    PAN: string
    EducationGap: number
    MaxQualification_Family: string
    BloodGroup: string
    Organ_Donation: string
    Correpondence_FlatNo: string
    Correpondence_ColonyName: string
    Correpondence_VillageName: string
    Correpondence_Landmark: string
    Correpondence_Location_Area: string
    Correpondence_Country: string
    Correpondence_State: string
    Correpondence_District: string
    Correpondence_Taluka: string
    Correpondence_City: string
    Correpondence_Pincode: number
    Permanent_FlatNo: string
    Permanent_ColonyName: string
    Permanent_VillageName: string
    Permanent_Landmark: string
    Permanent_Location_Area: string
    Permanent_Country: string
    Permanent_State: string
    Permanent_District: string
    Permanent_Taluka: string
    Permanent_City: string
    Permanent_Pincode: number
    Photo_path: string
    Sign_path: string
    ParentsEmailID: string
    Upload_Aadhaar: string
    ParentsMobile: number
    Same_As_Permenant: string
    Country: string
    State: string
    FullName: string
    Createddate: string
    Editeddate: string
    Occupation_Guardian: string
    Annual_Income: string
    EBC: string
    Abcid_aadhaar: number
    Abcid_aadhaar_name: string
    AadhaarFilename: string
    SignatureFileName: string
    PhotoFileName: string
    ProfileSubmited: boolean
    ProfileSubmitedDate: string
}

export interface Student_Educations {
    Aadhaar: number
    Document_Type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Finyear: number
    College_code: number
    CreatedDate: string
    BatchStream: string
}

export interface Student_Educations_new {
    Aadhaar: number
    Document_type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Finyear: number
    College_code: number
    CreatedDate: string
    BatchStream: string
    Inhouse: string
    Hindilinguistic: string
}

export interface Student_Reservations {
    ErrorMessage: string
    Aadhaar: number
    Parallel_Reservation: string
    Category: string
    SubCategory: string
    Specially_Abled: string
    Percentage: number
    UDID_No: string
    Occupation_Guardian: string
    Annual_Income: string
    EBC: string
    Activity: string
    ActivityName: string
    ParticipationLevels: string
    SecuredRank: string
    Finyear: number
    College_code: number
}

export interface Students_FeesPaid {
    ErrorMessage: string
    Finyear: number
    CollegeCode: number
    Aadhaar: number
    BatchCode: number
    BatchName: string
    Subject_group_ID: number
    Subject_group_Code: string
    FormFeesPaid: number
    FeesPaid: number
    TermCode: number
}

export interface Students_FeesPaid_junior {
    ErrorMessage: string
    Finyear: number
    CollegeCode: number
    Aadhaar: number
    BatchCode: number
    BatchName: string
    Subject_group_ID: number
    Subject_group_Code: string
    FormFeesPaid: number
    FeesPaid: number
    TermCode: number
}

export interface BilldeskCallbackResponse {
    ErrorMessage: string
    Flag: number
    Msg: string
    Transactionid: number
    ReceiptNo: string
    Prefix: string
    Receiptdate: string
    Amount: string
    Mobile: string
    Email: string
    Fullname: string
    Aadhaar: string
}

export interface CancelAdmission {
    Cancel_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Reason: string
    BankName: string
    Accountholdername: string
    Bankbranch: string
    Ifsccode: string
    Accountno: number
    CreatedDate: string
    ApprovedBy: number
    ApprovedDate: string
}

export interface Ires_validateEligiblestudents {
  College_code: number;
  Finyear: number;
  Batch_code: number;
  Aadhaar: number;
  Eligiblestatus: number;
  Eligible: string;
  Incremental_batch: number;
}



export interface Outstanding {
    Lastyearbatchcode: number
    Batch_code: number
    Finyear: number
    Outstanding: boolean
    Amount: number
    Aadhaar: number
}

export interface Login {
    Aadhaar: string
    UserRole: string
    User_Name: string
    Studenttype: string
    Coursetype: string
    Registerbatch: string
    Token: string
}


//Shivam
// swagger:response Login_new
// export interface  Login_new {
//     Systemusers
//     Studenttype   :string
//     Coursetype    :string
//     Registerbatch :string
//     Token         :string
// }

export interface Studenteducationdetails {
    Finyear: number
    College_code: number
    Aadhaar: number
    Document_Type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Createddate: string
    BatchStream: string
    Inhouse: string
    Hindilinguistic: string
}

export interface Fees_Installment_d {
    Installment_ID: number
    Lineitem: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Fees_code: number
    Installment: string
    Amount: number
}

export interface Fees_Installment_d_new {
    Installment_id: number
    Lineitem: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_name: string
    Fees_code: number
    Installmentid: number
    Installment: string
    Amount: number
}


//Shivam
// export interface  Fees_installment_d_feescode {
//     Fees_Installment_d_new
//     Fees_name : string
// }

export interface Student_profile_new {
    Picture_blob: string
    Aadhaar: number
    Finyear: number
    College_code: number
    Student_guid: string
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    RelationType: string
    Applicant_Name_On_Marksheet: string
    Name_Change_after_passing: string
    Gender: string
    DOB: string
    PlaceOfBirth: string
    Religion: string
    MotherTongue: string
    Marital_Status: string
    NomineeName: string
    NomineeDOB: string
    NomineeRelation: string
    VoterID: string
    PAN: string
    EducationGap: number
    MaxQualification_Family: string
    BloodGroup: string
    Organ_Donation: string
    Correpondence_FlatNo: string
    Correpondence_ColonyName: string
    Correpondence_VillageName: string
    Correpondence_Landmark: string
    Correpondence_Location_Area: string
    Correpondence_Country: string
    Correpondence_State: string
    Correpondence_District: string
    Correpondence_Taluka: string
    Correpondence_City: string
    Correpondence_Pincode: number
    Permanent_FlatNo: string
    Permanent_ColonyName: string
    Permanent_VillageName: string
    Permanent_Landmark: string
    Permanent_Location_Area: string
    Permanent_Country: string
    Permanent_State: string
    Permanent_District: string
    Permanent_Taluka: string
    Permanent_City: string
    Permanent_Pincode: number
    Photo_path: string
    Sign_path: string
    ParentsEmailID: string
    Upload_Aadhaar: string
    ParentsMobile: number
    Same_As_Permenant: string
    Country: string
    State: string
    FullName: string
    Occupation_Guardian: string
    Annual_Income: string
    EBC: string
    Createddate: string
    Editeddate: string
    ProfileSubmited: number
    ProfileSubmitedDate: string
    Admissionbatchs: Admissionbatchs[]
}

export interface Student_registration_new {
    College_code: number
    Finyear: number
    Aadhaar: number
    EmailID: string
    MobileNumber: number
    Student_Password: string
    Student_Guid: string
    Forgottoken: string
    OTP: string
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

export interface Student_educations_new {
    Aadhaar: number
    Document_Type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Finyear: number
    College_code: number
    CreatedDate: string
    BatchStream: string
    Inhouse: string
    Hindilinguistic: string
}

export interface Batchs_new {
    Batch_code: number
    Batch_name: string
    Batch_short: string
    Course_code: number
    Course_name: string
    Batch_level: number
    Batch_level_group: string
    Old_batch_code: number
    Formamount: number
    Merchant: string
    Merchant_accountid: string
    Next_batch: number
    Active: number
    Admissionstarted: number
    Stream: string
    Udise_no: string
    Outside_admission: boolean
    Atkt_admission: boolean
    Outside_message: string
    Atkt_message: string
    Previous_exambatchs: string
    Boardlevel: string
}

export interface Fees_Installment_head {
    Installment_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Installmentid: number
    Installment: string
    Amount: number
    Activedeactive: number
}

export interface Fees_Installment_detail {
    Installment_ID: number
    Lineitem: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Fees_code: number
    Fees_Name: string
    Installment: string
    Amount: number
}

export interface Students_new {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: number
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: number
    Canceldate: string
    Prnno: number
    Sportstaken: number
    Grnno: number
    Freeship: string
    Specialisation: string
    Minor: number
    Oe: number
    Vsc: number
    Sec: number
    Aec: number
    Vec: number
    Iks: number
    Cc: number
}

export interface Student_reservations_new {
    Finyear: number
    College_code: number
    Aadhaar: number
    Parallel_reservation: string
    Category: string
    Subcategory: string
    Specially_abled: string
    Percentage: number
    Udid_no: string
    Occupation_guardian: string
    Annual_income: string
    Ebc: string
    Activity: string
    Activityname: string
    Participationlevels: string
    Securedrank: string
}

export interface Inrernalexamrelease {
    Released_id: number
    Data_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Userexamid: number
}

export interface Admissionformfees {
    Receipt_id: number
    Batch_code: number
    Admissionformfesspaid: boolean
}


//Shivam
// export interface  Student_ProfileStatus_phd {
//     Profile               Student_Profile
//     Education             []Student_Educations_new
//     Reservation           Student_Reservations
//     Educationdocument_new []Education_Document
//     Certificates          []Upload_Document
//     Educationfound        bool
// }


//Shivam
// export interface  Student_data {
//     Students_new
//     Student_profile_new
//     Student_photo string
//     Photo_path    string
//     Batch         string
// }

export interface Abcid {
    Aadhaar: number
    Abcid: number
    Abcid_aadhaar: string
}

export interface Subject_group_nep {
    Batch_code: number
    Batch_name: string
    Subject_group_code: string
    Major: string
    Otherlevel: string
    Otherlevelcode: number
    Levelno: number
    Levelnomenclature: string
    Message: string
    Quota_status: string
}

export interface Profilesubmited {
    Profilesubmited: boolean
    Submitedyear: number
}

export interface Enrollment {
    Enrollmentno: number
    Abcid_aadhaar: number
    Abcid_aadhaar_name: string
}

export interface Ssgpa {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Overall_creditmulsgpa: number
    Overall_cgpa: number
    Overall_grade: string
    Examdate: string
    Userexamname: string
    Fullname: string
    Mul_sgpa_ce: number
    Key_as: string
}

export interface SMarks {
    Batchexam_id: number
    Aadhaar: number
    Examcode: number
    Subject_order: number
    Marks: number
    Present_absent: string
    Grade: string
    Gradepoint: number
    Credit_points: number
    Cg: number
    Sgpa: number
    Finalgrade: string
    Atktfailpass: string
    Creditearned: number
    Totalmarks: number
    Semester: number
    Condonation_grace: number
    Converted_marks: number
    Printmarks: string
    Manual_grace: string
    Juniormarks: string
    Fullname: string
    RollNo: number
    Batchdivision: string
}

export interface SStudents {
    Aadhaar: number
    Batch_division: string
    Rollno: number
    Fullname: string
    Semester: number
    Examcode: number
    Subject_order: number
    Sportstaken: boolean
    Nss_ncc: boolean
    Markscale: string
    Prnno: string
    Grnno: string
    Convocation: string
}


//Shivam
// export interface  Halltikcet_student {
//     SStudents
//     Photo        :string
//     Finyear      : number
//     Semestername :string
//     Batch_name   :string
//     Userexamname :string
//     Examrollno   :string
// }

export interface SStudentsubjects {
    Subject_order: number
    Aadhaar: number
}

export interface SGroupsubjects {
    Subjectorder: string
    Subjectname: string
    Subjectcomma: string
    Maxmarks: string
    Minmarks: string
    Rollno: number
    Maxtotal: number
    Mintotal: number
}

export interface SMarksheetconfig {
    Subject_order: string
    Subject_name: string
    Papercode: string
    Examcode: number
    Max_marks: number
    Min_marks: number
}

export interface Marksheet_overallslab {
    Slab_id: number
    Min_gpa: number
    Max_gpa: number
    Grade: string
    Seven_min_cgpa: number
    Seven_max_cgpa: number
    Seven_grade: string
}


//Shivam
// export interface  Statement {
//     Subjectgroup        []SGroupsubjects
//     Students            []SStudents
//     Marks               []SMarks
//     Sgpadata            []Ssgpa
//     Config              []SMarksheetconfig
//     Convocationdata     []Convercation
//     Outsidesgpa         []Ssgpa
//     Slab                []Marksheet_overallslab
//     Examtype            string
//     Batchtype           string
//     Examsemester        int
//     Overallcreditpoints : number
// }

//Shivam

// export interface  Statement_v3 {
//     Marksheet_convert :Marksheet_convert_new[]
//     Profile           :SStudents[]
//     Config            :SMarksheetconfig
//     Outsidesgpa       :Ssgpa
// }

export interface StatementMarks {
    Aadhaar: string
    Minmarks: number
    Maxmarks: number
    Marks: string
}

export interface TStatementmarks {
    Aadhaar: string
    Subject_order: string
    Examcode: string
    Marks: string
    Min_marks: string
    Max_marks: string
    Converted_marks: string
    Condonation_grace: string
    Credit_points: string
    Gradepoint: string
    Grade: string
    Sgpa: string
}

export interface Verify_students {
    Rollno: string
    Batch_division: string
    Fullname: string
}

export interface System_userroles_menus {
    Rolenames: string
    Menus: string
}

export interface System_documents {
    Document_code: number
    Document_name: string
}

export interface ProfileResources {
    BloodGroup: string[];
    College_University: string[];
    College_code: number;
    Finyear: number;
    FreeShip: string[];
    Grade_Marks: string[];
    List_of_Boards: string[];
    Location_Area: string[];
    Marital_Status: string[];
    Nominee_Relation: string[];
    Relation_Type: string[];
    Religion: string[];
    State: string[];
    activity: string[];
    annual_income: string[];
    category: string[];
    country: string[];
    district: string[];
    mother_tongue: string[];
    occupation_guardian: string[];
    parallel_horizontal_reservation: string[];
    participation_level: string[];
    secured_rank: string[];
    sex: string[];
    specially_abled: string[];
}

export interface Iresp_Formfees {
    Message: string;
    Fees_Receiptmaster: Fees_Receiptmaster
    Student_registration_new: Student_registration_new
}

export interface Student_Documents_Education {
    Education      : Education_Document[]
    UploadDocuments:  Ires_Upload_Document[]
}

export interface Ires_modalbatch {
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

export interface Ires_personalinfo {
  aadhaar: number;
  finyear: number;
  college_code: number;
  firstname: string;
  lastname: string;
  fathername: string;
  mothername: string;
  relationtype: string;
  applicant_name_on_marksheet: string;
  name_change_after_passing: string;
  gender: string;
  dob: string;
  placeofbirth: string;
  religion: string;
  mothertongue: string;
  marital_status: string;
  address: Ires_getAddress
  nationality: Ires_Nationality
  parents:Ires_parents
  other : Ires_others
  reservation: Ires_reservation
}

export interface Ires_getAddress {
  finyear: number;
  college_code: number;
  aadhaar: number;
  correpondence_flatno: string;
  correpondence_colonyname: string;
  correpondence_villagename: string;
  correpondence_landmark: string;
  correpondence_location_area: string;
  correpondence_country: string;
  correpondence_state: string;
  correpondence_district: string;
  correpondence_taluka: string;
  correpondence_city: string;
  correpondence_pincode: number;
  permanent_flatno: string;
  permanent_colonyname: string;
  permanent_villagename: string;
  permanent_landmark: string;
  permanent_location_area: string;
  permanent_country: string;
  permanent_state: string;
  permanent_district: string;
  permanent_taluka: string;
  permanent_city: string;
  permanent_pincode: number;
  same_as_permenant: string;
}

export interface Ires_others {
  finyear: number;
  college_code: number;
  aadhaar: number;
  voterid: string;
  Pan: string;
  educationgap: string;
  bloodgroup: string;
  maxqualification_family: string;
  organ_donation: string;
}

export interface Ires_parents {
  finyear: number;
  college_code: number;
  aadhaar: number;
  parentsemailid: string;
  parentsmobile: number;
  occupation_guardian: string;
  annual_income: string;
  relationtype: string;
  ebc: string;
}

export interface Ires_Nationality {
  finyear: number;
  college_code: number;
  aadhaar: number;
  nomineename: string;
  nomineedob: string;
  nomineerelation: string;
  country: string;
  state: string;
}

export interface Ires_reservation {
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
  reservation_submited: string;
}

export interface Ires_education {
  finyear: number;
  college_code: number;
  aadhaar: number;
  document_type: string;
  board: string;
  state: string;
  education_board: string;
  college_name: string;
  datepass: string;
  document_code:number;
  rollno: string;
  marksheetno: string;
  gradesormarks: string;
  marksobtained: number;
  outoff: number;
  percentage: number;
  createddate: string;
  batchstream: string;
  inhouse: string;
  hindilinguistic: string;
  uploadedfilename:string
}

export interface Ires_installment{

    Freeship: string
    InstallmentAlreadyPaid: boolean
    Installments : string
    Message: string
}

export interface Ires_Batchs {
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
  
  export interface Ires_personalinfo {
    aadhaar: number;
    finyear: number;
    college_code: number;
    firstname: string;
    lastname: string;
    fathername: string;
    mothername: string;
    relationtype: string;
    applicant_name_on_marksheet: string;
    name_change_after_passing: string;
    gender: string;
    dob: string;
    placeofbirth: string;
    religion: string;
    mothertongue: string;
    marital_status: string;
    address: Ires_getAddress
    nationality: Ires_Nationality
    parents: Ires_parents
    other: Ires_others
    reservation: Ires_reservation
  }
  
  export interface Ires_getAddress {
    finyear: number;
    college_code: number;
    aadhaar: number;
    correpondence_flatno: string;
    correpondence_colonyname: string;
    correpondence_villagename: string;
    correpondence_landmark: string;
    correpondence_location_area: string;
    correpondence_country: string;
    correpondence_state: string;
    correpondence_district: string;
    correpondence_taluka: string;
    correpondence_city: string;
    correpondence_pincode: number;
    permanent_flatno: string;
    permanent_colonyname: string;
    permanent_villagename: string;
    permanent_landmark: string;
    permanent_location_area: string;
    permanent_country: string;
    permanent_state: string;
    permanent_district: string;
    permanent_taluka: string;
    permanent_city: string;
    permanent_pincode: number;
    same_as_permenant: string;
  }
  
  export interface Ires_others {
    finyear: number;
    college_code: number;
    aadhaar: number;
    voterid: string;
    Pan: string;
    educationgap: string;
    bloodgroup: string;
    maxqualification_family: string;
    organ_donation: string;
  }
  
  export interface Ires_parents {
    finyear: number;
    college_code: number;
    aadhaar: number;
    parentsemailid: string;
    parentsmobile: number;
    occupation_guardian: string;
    annual_income: string;
    relationtype: string;
    ebc: string;
  }
  
  export interface Ires_Nationality {
    finyear: number;
    college_code: number;
    aadhaar: number;
    nomineename: string;
    nomineedob: string;
    nomineerelation: string;
    country: string;
    state: string;
  }
  
  export interface Ires_reservation {
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
    reservation_submited: string;
  }
  
  export interface Ires_education {
    finyear: number;
    college_code: number;
    aadhaar: number;
    document_type: string;
    document_code: number;
  
    board: string;
    state: string;
    education_board: string;
    college_name: string;
    datepass: string;
    rollno: string;
    marksheetno: string;
    gradesormarks: string;
    marksobtained: number;
    outoff: number;
    percentage: number;
    createddate: string;
    batchstream: string;
    inhouse: string;
    hindilinguistic: string;
  }
  
  export interface Ires_installment {
  
    Freeship: string
    InstallmentAlreadyPaid: boolean
    Installments: string
    Message: string
  }
  
  export interface Ires_registerbatch {
    Batch_code: number;
    Batch_name: string;
    Batch_short: string;
    Course_code: number;
    Course_name: string;
    Batch_level: number;
    Batch_level_group: string;
    Old_batch_code: number;
    Formamount: number;
    Merchant: string;
    Merchant_accountid: string;
    Next_batch: number;
    Active: number;
    Stream: string;
    Udise_no: string;
    Boardlevel: string;
    Webportal: string;
    Admissionstarted: number;
    Outside_admission: number;
    Atkt_admission: number;
    Outside_message: string;
    Atkt_message: string;
    Previous_exambatchs: string;
    Semesters: string;
    Documents: string;
    Educationdetails: string;
    Meritlist: string;
    Admissionyear: number;
    Profilereq: number;
    Atkt_profilereq: number;
    Outside_profilereq: number;
    Useraadhaar: number;
    Modifydate: string;
  }
  
  //PErsonal detail
  
  export interface Ires_education {
    finyear: number
    college_code: number
    aadhaar: number
    document_type: string
    board: string
    state: string
    document_code:number
    education_board: string
    college_name: string
    datepass: string
    rollno: string
    marksheetno: string
    gradesormarks: string
    marksobtained: number
    outoff: number
    percentage: number
    sgpa_percentage: number;
    createddate: string
    batchstream: string
    inhouse: string
    hindilinguistic: string
    rowsubmited: boolean;
  }
  
  export interface Res_Document {
    college_code: number
    finyear: number
    aadhaar: number
    batch_code: number
    document_code: number
    document_name: string
    document_status: string;
  }
  
  export interface Ires_personaldata {
    finyear: number
    college_code: number
    aadhaar: number
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    relationtype: string
    applicant_name_on_marksheet: string
    name_change_after_passing: string
    gender: string
    dob: string
    mothertongue: string
    marital_status: string
    placeofbirth: string
    religion: string
    parentsubmited: boolean
    addresssubmited: boolean
    nationalitysubmited: boolean
    othersubmited: boolean
    photosubmited: boolean
    educationsubmited: boolean
    documentsubmited: boolean
    pagesubmited: boolean
    reservationsubmited: boolean
    Photo_image: string
    Signature_image: string
    address: Address
    parents: Parents
    nationality: Nationality
    other: Other
    reservation: Reservation
    education: Ires_education[]
    document: Res_Document[]
  }
  
  export interface Address {
    finyear: number
    college_code: number
    aadhaar: number
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: number
    permanent_flatno: string
    permanent_colonyname: string
    permanent_villagename: string
    permanent_landmark: string
    permanent_location_area: string
    permanent_country: string
    permanent_state: string
    permanent_district: string
    permanent_taluka: string
    permanent_city: string
    permanent_pincode: number
    same_as_permenant: string
  }
  
  export interface Parents {
    finyear: number
    college_code: number
    aadhaar: number
    parentsemailid: string
    parentsmobile: number
    occupation_guardian: string
    annual_income: string
    relationtype: string
    ebc: string
  }
  
  export interface Nationality {
    finyear: number
    college_code: number
    aadhaar: number
    nomineename: string
    nomineedob: string
    nomineerelation: string
    country: string
    state: string
  }
  
  export interface Other {
    finyear: number
    college_code: number
    aadhaar: number
    voterid: string
    Pan: string
    educationgap: string
    bloodgroup: string
    maxqualification_family: string
    organ_donation: string
  }
  
  export interface Reservation {
    finyear: number
    college_code: number
    aadhaar: number
    parallel_reservation: string
    category: string
    subcategory: string
    specially_abled: string
    percentage: number
    udid_no: string
    activity: string
    activityname: string
    participationlevels: string
    securedrank: string
    "opencategory": boolean,
    "checkotherreservation": boolean,
    "checkspeciallyabled": boolean
  
  }
  
  export interface IRes_myprofilemultiplebatchs {
    Picture_blob: string
    Aadhaar: number
    Finyear: number
    College_code: number
    Student_guid: string
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    RelationType: string
    Applicant_Name_On_Marksheet: string
    Name_Change_after_passing: string
    Gender: string
    DOB: string
    PlaceOfBirth: string
    Religion: string
    MotherTongue: string
    Marital_Status: string
    NomineeName: string
    NomineeDOB: string
    NomineeRelation: string
    VoterID: string
    PAN: string
    EducationGap: number
    MaxQualification_Family: string
    BloodGroup: string
    Organ_Donation: string
    Correpondence_FlatNo: string
    Correpondence_ColonyName: string
    Correpondence_VillageName: string
    Correpondence_Landmark: string
    Correpondence_Location_Area: string
    Correpondence_Country: string
    Correpondence_State: string
    Correpondence_District: string
    Correpondence_Taluka: string
    Correpondence_City: string
    Correpondence_Pincode: number
    Permanent_FlatNo: string
    Permanent_ColonyName: string
    Permanent_VillageName: string
    Permanent_Landmark: string
    Permanent_Location_Area: string
    Permanent_Country: string
    Permanent_State: string
    Permanent_District: string
    Permanent_Taluka: string
    Permanent_City: string
    Permanent_Pincode: number
    Photo_path: string
    Sign_path: string
    ParentsEmailID: string
    Upload_Aadhaar: string
    ParentsMobile: number
    Same_As_Permenant: string
    Country: string
    State: string
    FullName: string
    Occupation_Guardian: string
    Annual_Income: string
    EBC: string
    Createddate: string
    Editeddate: string
    ProfileSubmited: number
    ProfileSubmitedDate: string
    Admissionbatchs: any
  }

  export interface Ires_Profilesubmited {
    Profilesubmited: boolean
    Submitedyear: number
  }

  export interface Res_ProfileResources {
    BloodGroup: string[];
    College_University: string[];
    College_code: number;
    Finyear: number;
    FreeShip: string[];
    Grade_Marks: string[];
    List_of_Boards: string[];
    Location_Area: string[];
    Marital_Status: string[];
    Nominee_Relation: string[];
    Relation_Type: string[];
    Religion: string[];
    State: string[];
    activity: string[];
    annual_income: string[];
    category: string[];
    country: string[];
    district: string[];
    mother_tongue: string[];
    occupation_guardian: string[];
    parallel_horizontal_reservation: string[];
    participation_level: string[];
    secured_rank: string[];
    sex: string[];
    specially_abled: string[];
  }


  export interface res_singlebatch {
    Batch_code: number
    Batch_name: string
    Batch_short: string
    Course_code: number
    Course_name: string
    Batch_level: number
    Batch_level_group: string
    Old_batch_code: number
    Formamount: number
    Merchant: string
    Merchant_accountid: string
    Next_batch: number
    Active: number
    Stream: string
    Udise_no: string
    Boardlevel: string
    Webportal: string
    Admissionstarted: number
    Outside_admission: number
    Atkt_admission: number
    Outside_message: string
    Atkt_message: string
    Previous_exambatchs: string
    Semesters: string
    Documents: string
    Educationdetails: string
    Meritlist: string
    Admissionyear: number
    Profilereq: number
    Atkt_profilereq: number
    Outside_profilereq: number
    Useraadhaar: number
    Modifydate: string
    Rationcard: number
    Admissionboard: string
    Nep: number
  }

  export interface Ires_RollCalllist {
  FullName: string;
  Aadhaar: string;
  Rollno: string;
  Batch_division: string;
  MobileNumber: number;
  EmailID: string;
  Subject_Group_Code: string;
  Billdeskdate: string;
  Prnno: string;
  Emailid: string;
  Annual_income: string;
}

export interface Ires_firstyear_statusreport{
  Batch_code: string;
  Batch_name: string;
  Subject_group_code: string;
  Subject_group_name: string;
  Profilesubmited: number;
  Pending: number;
  Rejected: number;
  Approved: number;
  Feesattached: number;
  Formfeespaid: number;
  Feespaid: number;
  Cancelled: number;
  Totaladmission: number;
}

export interface Ires_Courseapplied {
    Batch_code: string
    Batch_name: string
    Subject_group_id: string
    Subject_group_code: string
    Subject_group_name: string
    Receiptamount: number
    Admission_status: string
  }


  export interface Ires_nepminorsubjects {
    Batch_code: number
    Batch_name: string
    Subject_group_code: string
    Major: string
    Otherlevel: string
    Otherlevelcode: number
    Levelno: number
    Levelnomenclature: string
    Message: string
    Quota_status: string
  }

  export interface Ires_PhdBatchs {
    Batch_Code: number
    Batch_Name: string
    Batch_Short: string
    Course_Code: number
    Course_Name: string
    Batch_Level: number
    Batch_Level_Group: string
    FormAmount: number
    Merchant: string
    Merchant_AccountID: string
    Next_Batch: number
    Active: boolean
    Admissionstarted: boolean
    Outside_admission: boolean
    Atkt_admission: boolean
  }

  