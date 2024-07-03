import { HttpHeaders } from "@angular/common/http";

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
//export const Domainname = location.origin + location.pathname;
export const Global_FORMFEESTERMNAME = 9999;

export var Currentroute : string ;

export const encrypt_key: string = '467bd06c266d46bf';
export const iv_key: string = '467bd06c266d46bf';


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
