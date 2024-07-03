export interface Ireq_login {
  Aadhaar: string
  User_pwd: string
  Valuesdata: string
  Application: string
  Id: string
}

export class Ires_logindata  {
  "Aadhaar": string
  "UserRole": string
  "User_Name": string
  "Studenttype": string
  "Coursetype": string
  "Registerbatch": string
  "Token": string
}

export interface Ireq_input {
  Input : string
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
