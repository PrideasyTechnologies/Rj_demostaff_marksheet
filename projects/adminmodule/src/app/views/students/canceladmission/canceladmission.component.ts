import {PlatformLocation} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {CanceladmissionService} from './canceladmission.service';
import * as myGlobals from '../../../globals/global-variable';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../../globals/global.message";
import {CommanService} from "../../../globals/common.services";
import {
  CheckAdmission_URL,
  Cancelledadmission,
  Bankmasters,
  AdmissionCancel_Request, Cancelbatch
} from "../../../globals/global-api";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/request";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Ires_PaidBatchs} from "../../../models/response";

@Component({
    selector: 'app-canceladmission',
    templateUrl: './canceladmission.component.html',
    styleUrls: ['./canceladmission.component.scss'],
})
export class CanceladmissionComponent implements OnInit {
    banks: any;
    SelectedBatch: any;
    BatchName!: Ires_PaidBatchs[];

    cancelAdmissionForm!: UntypedFormGroup;
    submitted = false;

    data: any;
    formData = new FormData();
    chequebook_img!: Array<File>;

    oSession!: Sessiondata;

    constructor(
        private router: Router, private commonService: CommanService,
        private platformLocation: PlatformLocation,
        private http: HttpClient, private sessionservice: SessionService,
        private formBuilder: UntypedFormBuilder,
        private globalmessage: GlobalMessage,
        private canceladmissionService: CanceladmissionService
    ) {

    }

    @ViewChild('content') content: any;
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    get f() {
        return this.cancelAdmissionForm.controls;
    }



    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.Createform();
        // this.Check_feespaid();
        this.Bankmasters();
    }

    Createform() {

        this.cancelAdmissionForm = this.formBuilder.group({
            studentbatch: ['', Validators.required],
            reason: ['', Validators.required],
            bankname: ['', Validators.required],
            accountholdername: ['', Validators.required],
            accountnumber: ['', Validators.required],
            bankbranch: ['', Validators.required],
            ifsc: ['', Validators.required],
            enrollment: ['', Validators.required],
            Aadhaar: ['', Validators.required],
        });

    }

    Check_feespaid() {

        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            Aadhaar: this.cancelAdmissionForm.controls['Aadhaar'].value,
        };

        // let input_jsonin = {
        //     Input: encryptUsingAES256(jsonin)
        // };

        this.commonService.Post_json(Cancelbatch, jsonin).subscribe((response) => {
            if (response.data != null) {
                this.BatchName = response.data;
            }
        });

        if (this.canceladmissionService.Exception != "") {
            Swal.fire({
                title: 'Error!',
                text: this.canceladmissionService.Exception,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            this.router.navigate(['/dashboard']);
        }

    }

    onBatchSelected(event: any) {
        this.Cancelledadmission();
    }

    Cancelledadmission() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            Aadhaar: this.cancelAdmissionForm.controls['Aadhaar'].value,
            batch_code: this.SelectedBatch.Batch_code,
        };

        // let input_jsonin = {
        //     Input: encryptUsingAES256(jsonin)
        // };

        this.commonService.Post_json(Cancelledadmission, jsonin)
            .subscribe((response) => {
                if (response != null) {
                    console.log('adm:', response);
                    if (response.data !== true) {
                        this.openYesNoDialog('Already Cancelled Admission!');
                        this.router.navigate(['/dashboard']);

                    }
                }
            });
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete');
    }

    Bankmasters() {
        //subject api
        // let jsonin = {
        //     Aadhaar: this.oSession.aadhaar,
        //     Finyear: this.oSession.finyear,
        //     CollegeCode: this.oSession.collegecode,
        // };
        //
        // console.log('innini',jsonin)
        //
        // let input_jsonin = {
        //     Input: encryptUsingAES256(jsonin)
        // };
        //
        // this.commonService.Post_json(Bankmasters, input_jsonin).subscribe((response) => {
        //     // console.log(response)
        //     if (response != null) {
        //         this.banks = response.data;
        //     }
        //
        // });
    }

    ChequeBook_Filechange(element: any) {
        // console.log(element.target.files)
        this.chequebook_img = element.target.files;
        // console.log(this.chequebook_img)
        // if (this.chequebook_img[0].type == "application/pdf" && this.chequebook_img[0].size < 2400000) {
        //   this.chequebook_img = element.target.files;
        // }
        // else {
        //   this.openYesNoDialog("Only application/pdf files allowed! Max Size 2MB!")
        // }
    }

    onCancelAdmission() {
        this.submitted = false;


        if (!this.chequebook_img) {
            // console.log('Selected file format is not supported');
            this.openYesNoDialog('Select ChequeBook/PassBook Image!');
            // alert("Select Profile/Aadhaar/Sign Images")
            // return false;
        } else {
            if (this.cancelAdmissionForm.invalid) {
                return;
            } else {
                if (
                    this.chequebook_img[0].type == 'image/jpeg' ||
                    this.chequebook_img[0].type == 'image/png'
                ) {
                    if (this.chequebook_img[0].size < 2400000) {
                        this.formData.append('finyear', sessionStorage.getItem('Finyear')!);
                        this.formData.append('collegecode', '1');
                        this.formData.append('aadhaar', sessionStorage.getItem('Aadhaar')!);
                        this.formData.append('batchcode', this.SelectedBatch.Batch_code);
                        this.formData.append(
                            'reason',
                            this.cancelAdmissionForm.controls['reason'].value
                        );
                        this.formData.append(
                            'bankname',
                            this.cancelAdmissionForm.controls['bankname'].value
                        );
                        this.formData.append(
                            'accountholdername',
                            this.cancelAdmissionForm.controls['accountholdername'].value
                        );
                        this.formData.append(
                            'accountno',
                            this.cancelAdmissionForm.controls['accountnumber'].value
                        );
                        this.formData.append(
                            'bankbranch',
                            this.cancelAdmissionForm.controls['bankbranch'].value
                        );
                        this.formData.append(
                            'ifsccode',
                            this.cancelAdmissionForm.controls['ifsc'].value
                        );
                        this.formData.append(
                            'enrollment',
                            this.cancelAdmissionForm.controls['enrollment'].value
                        );
                        this.formData.append('cheque_img', this.chequebook_img[0]);


                        let input_jsonin = {
                            Input: encryptUsingAES256(this.formData)
                        };

                        this.commonService
                            .Post_formdata(AdmissionCancel_Request,input_jsonin)
                            .subscribe((response) => {
                                console.log(response);
                                if (response.data == true) {
                                    this.globalmessage.Show_message('Admission Cancellation Request Sent!');
                                    this.submitted = true;
                                } else {
                                    this.globalmessage.Show_message(response.message);
                                    // this.personalDetailsForm.reset();
                                    // alert("Error!")
                                }
                            });
                    } else {
                        this.globalmessage.Show_error('Max Size 2MB!');
                    }
                } else {
                    this.globalmessage.Show_error('Only png/jgp files allowed!');
                }
            }
        }
    }
}
