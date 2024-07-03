export interface Atkt_failsubjects {
  finyear: number;
  batch_code: number;
  aadhaar: number;
  semester: number;
  subject_order: number;
  subject_name: string;
  batchexam_id: number;
  userexamname: string;
  fullname: string;
}

export interface Resp_Atkt_aadhaar {
  Aadhaar: string;
}

export interface Req_atkt_type {
  collegecode: number;
  finyear: number;
  useraadhaar: number;
  batchtype: string;
}

export interface Req_outside {
  College_code: number;
  Finyear: number;
  useraadhaar: number;
  batchexam_id: number;
  Semester: number;
  Batch_code: number;
  subject_order: number;
  aadhaar: string;
  firstname: string;
  lastname: string;
  fathername: string;
  mothername: string;
  gender: string;
  specialisation: string;
  markscale: number;
  lastexamyear : number ;
  rollno : number ;
  prnno : string ;
  Fromtype : string;
}

export interface Student_detail{
  College_code: number;
  Finyear: number;
  Aadhaar: number;
  Gender: number;
  Firstname: string;
  Lastname: string;
  Fathername: string;
  Mothername:string;
  Prnno : string;
  Receiptamount : number;
  Formtype :string;
}

export interface req_studentatktform {
  Collegecode: number;
  Finyear: number,
  Useraadhaar: number,
  Receipt_id: number,
  Aadhaar: string,
}

export interface Resp_outside {
  Student_id: number;
  Finyear: number;
  College_code: number;
  Useraadhaar: number;
  Aadhaar: number;
  Gender: string;
  Firstname: string;
  Lastname: string;
  Fathername: string;
  Mothername: string;
  Batchcode: number;
  Batchexam_id: number;
  Semester: number;
  Subjectorder: number;
}

export interface req_inhouseform {
  college_code: number;
  finyear: number;
  useraadhaar: number;
  batchexam_id: number;
  aadhaar: number;
  subject_order : number ;
}

export interface req_Atkt_inhouse_aadhharsubject {
  batchtype      :string ;
  studentaadhaar :number ;
  useraadhaar    :number ;

}

export type Idetailstudent = {
  Aadhaar : string
  Firstname: string
  Lastname:string
  Fathername: string
  Mothername: string
  Prnno: string
  Examyear :string
  Gender: string
  Batch_Name: string
  Subject_name: string
  Subject_order: string
  Papercode: string
  semester: string
  Marksheetno: string
  Specialisation: string
  Scale: string
}

export type arrayStudent = Idetailstudent[];

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





