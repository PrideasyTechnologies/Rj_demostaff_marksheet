export interface IDocument{
    Document_code?: number,
    Document_name?: string
}

export interface IEducationDetails{
    Education_details: string
}

export interface IBatch{
    Batch_code: number,
    Batch_name: string,
    Batch_short: string,
    Course_code: number,
    Course_name: string,
    Batch_level: number,
    Batch_level_group: string,
    Old_batch_code: number,
    Formamount: number,
    Merchant: string,
    Merchant_accountid: string,
    Next_batch: number,
    Active: number,
    Stream: string,
    Udise_no: string,
    Boardlevel: string,
    Webportal: string,
    Admissionstarted: number,
    Outside_admission: number,
    Atkt_admission: number,
    Outside_message: string,
    Atkt_message: string,
    Previous_exambatchs: string,
    Semesters: string,
    Documents: string,
    Educationdetails: string,
    Meritlist: string
}
 export interface IReq_Batch_doc_merit_edu{
	Batch_code  : number,    
	Documents    :    string , 
	Educationdetails: string ,
	Meritlist  :      string 
}