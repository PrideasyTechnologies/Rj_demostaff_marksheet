import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CommonService} from "../../globals/common.service";
import {studentuploadimage} from "../../globals/global-api";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";

@Component({
    selector: 'app-bill-desk',
    templateUrl: './upload-picture.component.html',
    styleUrls: ['./upload-picture.component.scss'],
})
export class UploadPictureComponent {
    error: any;
    date: any;
    searchValue: any;
    savealert: boolean = false;
    submitted = false;
    UploadPictureForm!: FormGroup;
    res: any;
    Batchs = [];
    SelectedBatch: any;
    header: boolean = false;
    imgFile!: Array<File>;
    formData = new FormData();
    loader = false;
    @ViewChild('fileImportInput') fileImportInput: any;

    oSession!: Sessiondata;

    constructor(
        private sessionservice : SessionService,
        private formBuilder: FormBuilder,
        private commonService: CommonService,
    ) {
    }



    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.UploadPictureForm = new FormGroup({
            upload: new FormControl('', Validators.required),
        });
    }

    onCancel() {
        this.UploadPictureForm.reset();
    }

    imgUpload(element: any) {
        
        this.imgFile = element.target.files;
        if (this.imgFile[0].type == 'image/png') {
            
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Only .png file allowed!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert

            this.UploadPictureForm.reset();
        }
    }

    OnSubmit() {

        this.loader = true;

        let formData = new FormData();

        formData.append('picture', this.imgFile[0]);

        this.commonService.Post_formdata(studentuploadimage, formData)
            .subscribe((response: any) => {
                this.loader = false;
                if (response == null) {
                    return;
                }
                this.res = response;
                if (this.res.data == true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'File Uploaded Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.UploadPictureForm.reset();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to Upload!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.loader = false;
                    this.UploadPictureForm.reset();
                }
            });
    }
}
