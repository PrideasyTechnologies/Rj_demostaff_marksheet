import { HttpHeaders } from "@angular/common/http";
import {ServerIP} from "./global-api";

export var g_studentID: number = -99;
export var Aadhaar: number = -99;
export var EmailID: string = '-99';
export var MobileNumber: number = -99;
export const Golbal_CollegeCode: number = 1;
export const Global_LastFinYear: number = 2022;
export const Global_CurrentFinYear: number = 2023;
export const Admissionyear: string = '2023-2024';
export const Global_Webportname: string = 'STUDENTS';

export const Global_OUTSIDE = 'OUTSIDE';
export const Global_ATKT = 'ATKT';
export const Global_NONE = 'NONE';

export const Domainname = location.origin + location.pathname;

//export const Domainname = location.origin + location.pathname;

export const Global_FORMFEESTERMNAME = 9999;

export const BILLDESKJS = 'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js';

// interface Global {
//     g_studentID: number;
//     Aadhaar: number ;
//     EmailID: string ;
//     MobileNumber: number;
// }
export const InwardUrl = '/v1/Inward/';
export const CommonUrl = '/v1/Common/';
export const inwardoutward = ServerIP + InwardUrl + 'inwardoutward';
export const inwardoutwar_images = ServerIP + InwardUrl + 'inwardoutwar_images';
export const moduletype = ServerIP + InwardUrl + 'moduletype';
export const documenttype = ServerIP + InwardUrl + 'documenttype';
export const iu_employee = ServerIP + CommonUrl + 'iu_employee';
export const getemployee = ServerIP + CommonUrl + 'getemployee';
export const getorginazation = ServerIP + InwardUrl + 'getorginazation';
export const iu_orgnization = ServerIP + InwardUrl + 'iu_orgnization';
export const iu_inwardoutward = ServerIP + InwardUrl + 'iu_inwardoutward';
export const inwardoutward_20 = ServerIP + InwardUrl + 'inwardoutward_20';

export const encrypt_key: string = '467bd06c266d46bf';

export const iv_key: string = '467bd06c266d46bf';
export const orgtype = ServerIP + CommonUrl + 'orgtype';
export const HTTP_json = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + sessionStorage.getItem("Token")
    })
}

export const HTTP_form = {
    headers: new HttpHeaders({
        Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
};

