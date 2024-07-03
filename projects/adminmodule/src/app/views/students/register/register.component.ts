import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OtpService} from '../otp/otp.service';

import Swal from 'sweetalert2';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {CommanService} from "../../../globals/common.services";
import {RegisterService} from "./register.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ipg_batchs, IReq_batchs, Ireq_register, Ireqget_otp} from "./register.requestmodel";
import {decrypt, encryptUsingAES256} from "../../../globals/encryptdata";
import {
    registertionbatchs,
    GetOTP,
    GetOTP_v1_url,
    Getselectedbatchs_url,
    StudentRegistration_URL
} from "../../../globals/global-api";
import {Sessiondata} from "../../../models/request";
import {SessionService} from "../../../globals/sessionstorage";


//Password validators

export class PasswordValidators {
    static confirmPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirm = control.get('confirmPassword');
        if (password?.valid && password?.value === confirm?.value) {
            confirm?.setErrors(null);
            return null;
        }
        confirm?.setErrors({passwordMismatch: true});
        return {passwordMismatch: true};
    }

}

// export class customValidationService {
//     static checkLimit(min: number, max: number): ValidatorFn {
//         return (c: AbstractControl): { [key: string]: boolean } | null => {
//             if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
//                 return { 'range': true };
//             }
//             return null;
//         };
//     }
// }
declare var Tesseract: any;
@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
    // @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';

    @Output() formValueEmitter = new EventEmitter<any>();
    Registrationlabel!: string;

    registerForm!: FormGroup;
    submitted = false;
    data: any;
    res: any;

    otpres: any;
    BatchNames!: Ipg_batchs[];
    Selected_batchname!: Ipg_batchs;

    selectedugpg = '';

    //register

    formErrors: any;

    // @Input() public OTPGetValue;
    // public OTPSendValue;

    Files!: Array<File>;

    result = 'Recognizing...';

    oSession!: Sessiondata;

    studentgettype!: any;

    get f() {
        return this.registerForm.controls;
    }

    constructor(
        private router: Router,private sessionservice: SessionService,
        private commonService: CommanService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private registerservice: RegisterService,
        private otpService: OtpService,
        private globalMessage: GlobalMessage
    ) {

        this.studentgettype = this.sessionservice.GetData('studenttype')!

        console.log('ssss',this.studentgettype)

        this.formErrors = this.registerservice.errorMessages;

        if (this.studentgettype == myGlobals.Global_OUTSIDE) {
            this.Registrationlabel = 'Outside';
        }
        if (this.studentgettype == myGlobals.Global_ATKT) {
            this.Registrationlabel = 'Atkt';
        }

    }

    ngOnInit(): void {

        //Shivam
        if (this.studentgettype) {
            this.router.navigate(['']);
            // this.openYesNoDialog("Please Click Register button!")
            Swal.fire({
                title: 'Message!',
                text: 'Please Click Register button!',
                icon: 'info',
                confirmButtonText: 'OK',
            }); //alert
        } else {

            this.registerForm = this.formBuilder.group({

                    ugpg: ['', [Validators.required]],
                    userbatch: ['', Validators.required],
                    aadharNo: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(12),
                            Validators.maxLength(12),
                        ],
                    ],
                    email: ['', [Validators.required, Validators.email]],
                    mobileNo: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(10),
                            Validators.maxLength(10),
                        ],
                    ],
                    linguistic: ['', Validators.required],
                    inhouse: ['', Validators.required],
                    password: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(this.registerservice.formRules.passwordMin),
                            Validators.pattern(this.registerservice.formRules.passwordPattern),

                        ],

                    ],

                    uploadaadhaar: ['', [Validators.required,]],


                    confirmPassword: [
                        '',
                        [
                            Validators.required,
                            Validators.minLength(this.registerservice.formRules.passwordMin),
                            Validators.pattern(this.registerservice.formRules.passwordPattern),

                        ],
                    ],
                },
                {validators: [PasswordValidators.confirmPassword]},
            );
        }

    }

    openYesNoDialog(msg: any) {
        this.globalMessage.Show_message('Delete');

    }


    //Show batchs
    Show_streambatchs() {

        let jsoninbatch: IReq_batchs = {
            Boardlevel: this.selectedugpg,
        };

        console.log('input', jsoninbatch)

        let jsonin = {
            Input: encryptUsingAES256(jsoninbatch)
        };

        this.commonService.Post_json_withouttoken(registertionbatchs, jsonin).subscribe((response) => {

            const hasKey = 'data' in response;
            if (hasKey) {
                this.BatchNames = response.data
            } else {
                this.BatchNames = response
            }

            // this.BatchNames = response.data;

        });
    }

    onUgPg_Selected(value: string): void {
        this.selectedugpg = value;

        if (this.selectedugpg != '') {
            this.Show_streambatchs();
        }
    }


    //On select batch
    on_Selectbtch() {

        if (this.Selected_batchname.Admissionyear == 0) {
            this.globalMessage.Show_error('Finyear not configured.Please contact admin.')
            this.router.navigate(['/login'])
        }

        if (this.studentgettype == "ATKT" && this.Selected_batchname.Admissionstarted == 0) {
            this.globalMessage.Show_error(this.Selected_batchname.Atkt_message)
            this.router.navigate(['/login'])
        }

        if (this.studentgettype == "OUTSIDE" && this.Selected_batchname.Outside_admission == 0) {
            this.globalMessage.Show_error(this.Selected_batchname.Outside_message)
            this.router.navigate(['/login'])
        }
        //https://www.angularjswiki.com/angular/how-to-bind-a-select-element-to-object-in-angular/

    }


    //Register form submit
    onRegister() {
        this.submitted = true;

        let nAadhaar = this.registerForm.controls['aadharNo'].value

        let jsonin: Ireq_register = {
            Aadhaar: parseInt(this.registerForm.controls['aadharNo'].value),
            EmailID: this.registerForm.controls['email'].value,
            MobileNumber: parseInt(this.registerForm.controls['mobileNo'].value),
            Inhouse: this.registerForm.controls['inhouse'].value,
            Hindilinguistic: this.registerForm.controls['linguistic'].value,
            StudentPassword: this.registerForm.controls['password'].value,
            // studenttype: this.studentgettype,
            studenttype: "OUTSIDE",
            finyear: this.Selected_batchname.Admissionyear,
            college_code: myGlobals.Golbal_CollegeCode,
            Coursetype: this.selectedugpg,
            Batch_code: this.Selected_batchname.Batch_code,
        };

        if (this.registerForm.invalid) {
            return;
        }

        console.log('Input register', jsonin)

        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', this.Files[0])


        if (nAadhaar > 99999999999) {
            this.commonService
                .Post_formdata_withouttoken(StudentRegistration_URL, formdata)
                .subscribe((response: any) => {

                    const hasKey = 'data' in response;
                    if (hasKey) {
                        this.res = response.data
                    } else {
                        this.res = response
                    }

                    // this.res = response.data;
                    if (this.res == true) {
                        this.GetOTP();
                    } else {
                        this.globalMessage.Show_error('Please check your form.')
                    }
                });
        } else {
            // this.submitted = false
            this.globalMessage.Show_error('Enter Valid Aadhaar!');
        }
    }

    GetOTP() {

        let jsonin_otp: Ireqget_otp = {
            aadhaar: parseInt(this.registerForm.controls['aadharNo'].value),
            emailid: this.registerForm.controls['email'].value,
            mobile: parseInt(this.registerForm.controls['mobileNo'].value),
        };

        let jsonin = {
            Input: encryptUsingAES256(jsonin_otp)
        };

        this.commonService.Post_json_withouttoken(GetOTP, jsonin).subscribe((response: any) => {

            const hasKey = 'data' in response;
            if (hasKey) {
                this.otpres = response.data
            } else {
                this.otpres = response
            }

            if (this.otpres == true) {
                this.otpService.mobileNo = parseInt(this.registerForm.controls['mobileNo'].value)
                this.otpService.Aadhaar = parseInt(this.registerForm.controls['aadharNo'].value)
                this.globalMessage.Show_message("OTP has been sent to registered Mobile Number")
                this.router.navigate(['/otp']);
            }

            // if (response.data.OTP != '') {
            //     this.otpService.setValue(response.data);
            //
            //     this.router.navigate(['otp']);
            //     this.openYesNoDialog('OTP has been sent to registered Mobile Number');
            // } else {
            //     this.openYesNoDialog('OTP not Sent!');
            // }
        });
    }

    GetOTP_v1() {
        let jsonin = {
            aadhaar: parseInt(this.registerForm.controls['aadharNo'].value),
            emailid: this.registerForm.controls['email'].value,
            mobile: parseInt(this.registerForm.controls['mobileNo'].value),
        };

        this.commonService.Post_json_withouttoken(GetOTP_v1_url, jsonin).subscribe((response) => {
            if (response.data.OTP != '') {
                this.otpService.setValue(response.data);

                this.router.navigate(['otp']);

                Swal.fire({
                    title: 'Message!',
                    text: 'OTP has been sent to registered Mobile Number',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

            } else {
                if (response.data.exception == '') {
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'OTP not Sent!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        });
    }

    Get_singlebatch() {
        let jsonin = {
            batch_code: this.Selected_batchname.Batch_code,
        };

        this.commonService.Post_json_withouttoken(Getselectedbatchs_url, jsonin).subscribe((response) => {
            if (response.data.Outside_admission == false) {
                this.submitted = false;

                Swal.fire({
                    title: 'Message!',
                    text: response.data.Atkt_message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });

                this.registerForm.controls['userbatch'].setValue('');
            }
        });
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    Uploadfiles(element: any) {
        this.Files = element.target.files;
        // this.onFileSelected(event);
        //this.Aadhaarimage_upload()
        this.test()
    }

    // onFileSelected(event: any) {
    //   const file = event.target.files[0];
    //   console.log('fIles', file)
    //   this.sendImage(file).subscribe(
    //     (response) => {
    //       this.result = 'Recognized!';
    //       console.log(response);
    //       this.test()
    //       // if (response.numberOfFacesDetected == 1) {
    //       //   this.test()
    //       // } else {
    //       //   this.globalMessage.Show_error('Please upload clear picture of aadhaar.')
    //       // }
    //     }, error => {
    //       this.result = 'Error: ' + error.message;
    //     }
    //   );
    // }

    test() {

        let nAadhaar = String(this.registerForm.controls['aadharNo'].value)

        Tesseract.recognize(this.Files[0]).then((result: any) => {
            const inputString = result.text.toString().replace(/\s/g, '');
            const targetNumber = nAadhaar;

            if (inputString.includes(targetNumber)) {
                console.log('is present in the string.', targetNumber);
            } else {
                this.globalMessage.Show_error('Please check your aadhaar number')
                this.registerForm.controls['uploadaadhaar'].setValue('')
            }
        });
    }

    sendImage(imageFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', imageFile);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post(
            'http://localhost:5000/api/ImageDetection',
            formData,
            {headers}
        );
    }

    Aadhaarimage_upload() {
        Tesseract.recognize(this.Files[0]).then(function (result: any) {
            console.log(result.text);

            const inputString = result.text.toString();
            const aadhaar = result.text.includes('Your Aadhaar No.')
            console.log('aadhaar', aadhaar)
            const maleIndex = inputString.indexOf('Your Aadhaar No. :');

            const mm3Index = inputString.indexOf('3113} 3mm,');

            const substring = inputString.substring(maleIndex, mm3Index);
            const numbers = substring.match(/\b\d{4}\b/g);

            const result1 = numbers.join('');
            // const numbersArray = substring.split(/\s+/);
            // const numbers = numbersArray.filter(word => !isNaN(word) && word !== '').join(' ');

            console.log('ressulttt', result1);
        });
    }
}
