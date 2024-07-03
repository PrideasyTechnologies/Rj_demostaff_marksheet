export interface IlistQuestion {
  Questionid: number,
  Feedbackid: number,
  Questiontype: string,
  Questionname: string,
  Labelname: string,
  Optionvalues: string,
  Errormessage: string,
  Validationreq: boolean,
  Createdby: number,
  Createdon: string,
  Modifiedby: number,
  Modifiedon: string,
  Collegecode: number,
  Finyear: number
}

export interface IFeedbacklist {
  Feedbackid: number,
  Feedbackname: string,
  Createdby: number,
  Createdon: string,
  Modifiedby: number,
  Modifiedon: string,
  Collegecode: number,
  Finyear: number,
  Useraadhaar: number
}

