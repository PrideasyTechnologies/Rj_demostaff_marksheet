import {Global_LastFinYear, Golbal_CollegeCode,} from '../../../globals/global-variable';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OtpService} from './otp.service';
import {GlobalMessage} from "../../../globals/global.message";
import {CommanService} from "../../../globals/common.services";
import {studentsforgotmobile, ValidateOTP} from "../../../globals/global-api";
import {encryptUsingAES256} from "../../../globals/encryptdata";

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
    CollegeCodeConst = Golbal_CollegeCode;
    FinYearConst = Global_LastFinYear;
    value!:any
    otpVerifyForm!: UntypedFormGroup;
    submitted = false;
    data: any;

    Aadhaar: any;
    EmailID: any;
    MobileNumber: any;
    registerresponse: any;
    flag: any;
    otp: any;

    validateres: any;

    // @Input() public OTPGetValue;
    // public OTPSendValue;
    get f() {
        return this.otpVerifyForm.controls;
    }

    constructor(
        private router: Router,private commonService: CommanService,
        private formBuilder: UntypedFormBuilder,
        private otpService: OtpService,
        private activatedRoute: ActivatedRoute,
        private globalmessage: GlobalMessage
    ) {
    }

    ngOnInit(): void {

        this.otpVerifyForm = this.formBuilder.group({
            mobileNo: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            otp: ['', Validators.required],
        });

        this.RegisterResponse();

    }

    RegisterResponse() {
        this.otpVerifyForm.controls['mobileNo'].setValue(this.otpService.mobileNo);
    }

    GetOTP() {
        this.submitted = true;
        let jsonin = {
            aadhaar: this.otpService.Aadhaar,
            emailid: this.EmailID,
            mobile: parseInt(this.otpVerifyForm.controls['mobileNo'].value),
        };

        if (this.otpService.Aadhaar > 0) {
            this.commonService.Post_json(studentsforgotmobile,jsonin).subscribe((response:any) => {
                // console.log(response);
                if (response.data.OTP != '') {
                    this.otp = response.data.OTP;
                }
                // alert("OTP has been sent to registered Mobile Number!")
                this.globalmessage.Show_message('OTP has been sent to registered Mobile Number!');
            });
        } else {
            this.globalmessage.Show_error('Aadhaar Not Found!');
        }
    }

    ValidateOTP() {
        this.submitted = true;
        let jsonin = {
            Finyear: this.CollegeCodeConst,
            CollegeCode: this.CollegeCodeConst,
            // OTP: parseInt(this.otp),
            Aadhaar: this.otpService.Aadhaar,
            OTP: parseInt(this.otpVerifyForm.controls['otp'].value)
        };
        // if (this.otpVerifyForm.invalid) {
        //     return;
        // } else {

      let jsoninput = {
        Input: encryptUsingAES256(jsonin)
      };

            this.commonService.Post_json_withouttoken(ValidateOTP,jsoninput).subscribe((response: any) => {
                // console.log(response);

                const hasKey = 'data' in response;
                if (hasKey) {
                    this.validateres = response.data
                } else {
                    this.validateres = response
                }

                if (this.validateres == true) {
                    this.globalmessage.Show_message('Registration Complete!');
                    this.router.navigate(['login']);
                } else {
                    this.globalmessage.Show_error('Invalid OTP!');
                }
            });
    }
}
