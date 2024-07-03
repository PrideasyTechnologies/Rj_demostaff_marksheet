export interface IOrg {
  Orgid: number,
  Orgname: string,
  Concatperson: string,
  Contactmobile: string,
  Contactemail: string,
  Orgtype: string
}

export interface IEmp {
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

export interface IGridinward {

  Documentid: number ,
  Moduletype: string,
  Documenttype: string,
  Orgid: number,
  Orgname: string,
  Empid: number,
  Empname: string,
  Documentsubject: string,
  Documentno: string,
  Documentdate: string,
  Remarks: string,
  Createddate: string,
  Createdby: number,
}

export interface Employee {
  Full_name: string,
  Department: string,
  Designation: string,
  Biometric_id_no: string,
  Address: string,
  Dob: string,
  Doj: string,
  Blood_group: string,
  Email: string,
  Mobile: string,
  Alternate_mobile: string,
  Created_date: string,
}

export interface IresponseImage {
  Image: string,
  Filename: string,
}





