//https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {UpdateprofileService} from './updateprofile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageCroppedEvent, ImageTransform, LoadedImage} from 'ngx-image-cropper';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalDownloadfiles} from '../../../globals/download_global';
import {take} from 'rxjs/operators';
import {CompressImageService} from '../../../globals/global_compressimage';
import {CommanService} from "../../../globals/common.services";
import {
    sendotpemailv2,
    sendotpsmsv2,
    studentpictureupload,
    verifyemailotpv2,
    verifymobileotpv2
} from "../../../globals/global-api";
import {Ireq_sendmobileotp, Ireq_sendotp, Ireq_verifymobileotp, Ireq_verifyotp} from "./updateprofile.requestmodel";
import {Sessiondata} from "../../../models/request";
import {SessionService} from "../../../globals/sessionstorage";

@Component({
    selector: 'app-updateprofile',
    templateUrl: './updateprofile.component.html',
    styleUrls: ['./updateprofile.component.scss'],
})
export class UpdateprofileComponent implements OnInit {

    imageChangedEvent: any = '';
    croppedImage: any = '';
    private cropped_blob: any;
    public cropped_base64: any;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    visibleEmail: boolean = false;
    visibleMobile: boolean = false;
    public imageURL!: string;
    public imageDestination!: string;
    private emailotp: string = '';
    private mobileotp: string = '';
    private mobileno: string = '';
    private whatsapp: string = '';

    public Emailform: FormGroup;
    public Mobileform: FormGroup;
    public Profilepictform: FormGroup;

    private pngfilename: string = '';

    private Imagefile!: File;

    private Uploadfile!: File;
    public pictureloader: boolean = false;

  oSession!: Sessiondata;

    @ViewChild('ngx_mobile', {static: false}) ng_ref_mobile: any;
    @ViewChild('ngx_whatsapp', {static: false}) ng_ref_whatsapp: any;
    @ViewChild('ngx_mobile_otp', {static: false}) ng_ref_mobileotp: any;
    @ViewChild('ngx_email_otp', {static: false}) ng_ref_emailotp: any;

    config = {
        allowNumbersOnly: true,
        length: 10,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputStyles: {
            width: '30px',
            height: '30px',
        },
        containerStyles:{
            'display':'flex',
            'padding': '0px 0px 0px 0px',
        },
        inputClass:'each_input',
        containerClass:'all_inputs'
    };


    constructor(
        private router: Router,private commonService: CommanService,
        private formBuilder: FormBuilder,private sessionservice: SessionService,
        private globalmessage: GlobalMessage,
        private updateprofileservice: UpdateprofileService,
        private sanitizer: DomSanitizer,
        private globaldownloadfiles: GlobalDownloadfiles,
        private compressimageservice: CompressImageService
    ) {
        this.Emailform = this.formBuilder.group({
            emailid: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            emailotp: ['', Validators.required],

        });

        this.Mobileform = this.formBuilder.group({
            mobile: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(10), Validators.maxLength(10)]],
            whatsapp: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(10), Validators.maxLength(10)]],
            mobileotp: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(6), Validators.maxLength(6)]],
        });

        this.Profilepictform = this.formBuilder.group({
            picture: ['', Validators.required],
            croped: ['', Validators.required],
        });
    }

    ngOnInit(): void {

      this.oSession = new Sessiondata(this.sessionservice)
      this.oSession.Getdatafromstroage();

    }

    Createform() {
    }

    get frmEmail() {
        return this.Emailform.controls;
    }

    get email_fld() {
        return this.Emailform.get('emailid');
    }

    get emailotp_fld() {
        return this.Emailform.get('emailotp');
    }

    get frmMobile() {
        return this.Mobileform.controls;
    }

    get mobile_fld() {
        return this.Mobileform.get('mobile');
    }

    get whatsapp_fld() {
        return this.Mobileform.get('whatsapp');
    }

    get mobileotp_fld() {
        return this.Mobileform.get('mobileotp');
    }

    get frmProfile() {
        return this.Profilepictform.controls;
    }

    get picture_fld() {
        return this.Profilepictform.get('picture');
    }

    Submit_email() {
    }

    Submit_mobile() {
    }

    Upload_profilepicture() {
    }

    Tabchange(normal: string) {
    }

    onCancel_uploadpict() {
    }

    OnSubmit_uploadpicture_compress() {
        //this.Uploadfile = this.blobToFile(this.cropped_blob, this.pngfilename);

        //console.log('File object ', this.Uploadfile);
        //this.globalmessage.Show_message(this.Uploadfile.name);
        // if (this.Uploadfile.name == '') {
        //     this.globalmessage.Show_message('Image not cropped');
        //     return;
        // }

        //ShiVam

        // this.compressimageservice
        //     .compress(this.Uploadfile)
        //     .pipe(take(1))
        //     .subscribe((compressedImage: any) => {
        //         let compressfile = compressedImage;
        //
        //         let formData = new FormData();
        //         formData.append('collegecode', '1');
        //         formData.append('finyear', this.FinyearSession.toString());
        //         formData.append('aadhaar', this.AadharSession.toString());
        //         formData.append('picture', compressfile);
        //
        //         this.pictureloader = true;
        //         this.updateprofileservice
        //             .studentpictureupload(formData)
        //             .subscribe((response) => {
        //                 this.pictureloader = false;
        //                 if (response == null) {
        //                     return;
        //                 }
        //                 if (response.data == true) {
        //                     this.globalmessage.Show_message('File Uploaded Successfully!');
        //                 } else {
        //                     this.globalmessage.Show_message('Failed to Upload!');
        //                 }
        //                 this.Profilepictform.reset();
        //             });
        //     });
    }

    OnSubmit_uploadpicture() {
        //this.Uploadfile = this.blobToFile(this.cropped_blob, this.pngfilename);

        //console.log('File object ', this.Uploadfile);
        //this.globalmessage.Show_message(this.Uploadfile.name);
        if (this.Uploadfile.name == '') {
            this.globalmessage.Show_message('Image not cropped');
            return;
        }

        /*
        if (this.Uploadfile.size <= 0) {
          this.globalmessage.Show_message('Image not cropped');
          return;
        }
        */

        let formData = new FormData();
        formData.append('collegecode', myGlobals.Golbal_CollegeCode.toString());
        formData.append('finyear', this.oSession.finyear!.toString());
        formData.append('aadhaar', this.oSession.aadhaar!.toString());
        formData.append('picture', this.Uploadfile);

        this.pictureloader = true;
        this.commonService.Post_formdata(studentpictureupload,formData)
            .subscribe((response) => {
                this.pictureloader = false;
                if (response == null) {
                    return;
                }
                if (response.data == true) {
                    this.globalmessage.Show_message('File Uploaded Successfully!');
                } else {
                    this.globalmessage.Show_message('Failed to Upload!');
                }
                this.Profilepictform.reset();
            });
    }

    rotateLeft() {
    }

    showPreview(event: any) {
        this.pngfilename = (this.oSession.aadhaar! + Math.random()).toString();

        this.imageChangedEvent = event;

        const file = (event.target as HTMLInputElement).files![0];

        console.log('Selected file ', file);
        /*
        if (file.size > 50000) {
          this.globalmessage.Show_error('File size is more than 5 MB.');
          this.Profilepictform.reset();
          return;
        }
        */

        /*
        if (file.type != 'image/png') {
          this.globalmessage.Show_error('Only .png file allowed!');
          this.Profilepictform.reset();
          return;
        }
        */

        this.Profilepictform.patchValue({picture: file,});
        this.Profilepictform.get('picture')!.updateValueAndValidity();
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageURL = reader.result as string;
            this.croppedImage = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    //ShivAm Image Cropper

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
        const filebeforecorp = this.imageChangedEvent.target.files[0];
        this.Uploadfile = new File([event.blob!], filebeforecorp.name, {
            type: 'PNG',
        });
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        this.globalmessage.Show_message('Issue while loading image.');
        // show message
    }

    emailOtpChange(event: any) {
        this.emailotp = event;
    }

    mobileOtpChange(event: any) {
        this.mobileotp = event;
    }

    toggleCollapse(): void {
        this.visibleEmail = !this.visibleEmail;
    }

    emailtoggleCollapse(): void {
        //this.globalmessage.Show_message(this.email_fld.value);

        if (this.email_fld!.invalid) {
            this.globalmessage.Show_message('Enter email id');
            return;
        }
        if (this.email_fld!.value.length <= 0) {
            this.globalmessage.Show_message('Enter email id');
            return;
        }

        let jsonin = {
            aadhaar: this.oSession.aadhaar,
            Email: this.email_fld!.value,
        };
        this.visibleEmail = false;
        this.commonService.Post_json(sendotpemailv2,jsonin).subscribe((response) => {
            if (response == null) {
                this.visibleEmail = false;
                return;
            }
            if (response.data == true) {
                this.email_fld!.disable();
                this.visibleEmail = true;
                this.globalmessage.Show_message('OTP sent on new email id');
            }
        });

        //this.visibleEmail = !this.visibleEmail;
    }

    mobiletoggleCollapse(): void {

        //if (otp.length === 6) {
        if (this.mobileno.length < 10) {
            this.globalmessage.Show_message('Enter 10 digit number mobile number ');
            return;
        }
        if (this.whatsapp.length < 10) {
            this.globalmessage.Show_message('Enter 10 digit number whatsapp number');
            return;
        }
        if (this.mobileno == '') {
            this.globalmessage.Show_message('Enter Mobile no');
            return;
        }
        if (this.whatsapp == '') {
            this.globalmessage.Show_message('Enter Whatsapp no');
            return;
        }

        let jsonin = {
            aadhaar: this.oSession.aadhaar,
            mobile: parseInt(this.mobileno),

        };
      console.log(jsonin)
        this.visibleMobile = false;
        this.commonService.Post_json(sendotpsmsv2,jsonin).subscribe((response) => {
            if (response == null) {
                this.visibleMobile = false;
                return;
            }
            if (response.data == true) {
                this.ng_ref_mobile.otpForm.disable();
                this.ng_ref_whatsapp.otpForm.disable();
                this.visibleMobile = true;
                this.globalmessage.Show_message('Otp sent on new number');
            }
        });
        //this.visibleMobile = !this.visibleMobile;
    }

    verifymobileotp() {
        if (this.mobileotp == '') {
            this.globalmessage.Show_message('Enter mobile otp');
            return;
        }

        let jsonin = {
            aadhaar: this.oSession.aadhaar,
            mobile: parseInt(this.mobileno),
            whatsapp: parseInt(this.whatsapp),
            otp: parseInt(this.mobileotp),
        };
        this.commonService.Post_json(verifymobileotpv2,jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalmessage.Show_message('Mobile Number updated');
                this.resetmobilescreen();
            }
        });
    }

    resetmobilescreen() {
        this.Mobileform.reset();
        this.visibleMobile = false;

        this.ng_ref_mobileotp.setValue('');
        this.ng_ref_mobile.setValue('');
        this.ng_ref_whatsapp.setValue('');
        this.mobileno = '';
        this.whatsapp = '';

        this.ng_ref_mobile.otpForm.enable();
        this.ng_ref_whatsapp.otpForm.enable();
    }

    resetemailform() {
        this.visibleEmail = false;
        this.email_fld!.enable();
        this.email_fld!.setValue('');
        this.ng_ref_emailotp.setValue('');
        this.Emailform.reset();
    }

    Verifyemailotp() {
        if (this.emailotp == '') {
            this.globalmessage.Show_message('Enter email otp');
            return;
        }

        let jsonin = {
            aadhaar: this.oSession.aadhaar,
            email: this.email_fld!.value,
            otp: parseInt(this.Emailform.controls['emailotp'].value),
        };
        this.commonService.Post_json(verifyemailotpv2,jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response.data == true) {
                    this.globalmessage.Show_message('Email updated');
                    this.resetemailform();
                }
            },
            (error) => {
                this.globalmessage.Show_message(error.toString());
            }
        );
    }

    mobilenochange($event: string) {
        this.mobileno = $event;
    }

    whatsappChange($event: string) {
        this.whatsapp = $event;
    }

    // Download_previewfile() {
    //     if (this.cropped_blob == '') {
    //         return;
    //     }
    //
    //     this.globaldownloadfiles.Downloadfromblob(
    //         this.cropped_blob,
    //         this.pngfilename
    //     );
    // }

    Compress_file(event: any) {
        this.Uploadfile = (event.target as HTMLInputElement).files![0];
        if (this.Uploadfile.name != this.pngfilename + '.PNG') {
            this.globalmessage.Show_message(
                'Downloaded file not matching with preview file'
            );

            return;
        }
    }

    mybase64ToFile(data: any, filename: any) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }


    //ShivAm Cropper

    // zoomOut() {
    //     this.scale -= 0.1;
    //     this.transform = {
    //         ...this.transform,
    //         scale: this.scale,
    //     };
    // }
    //
    // zoomIn() {
    //     this.scale += 0.1;
    //     this.transform = {
    //         ...this.transform,
    //         scale: this.scale,
    //     };
    // }
    protected readonly event = event;
}
