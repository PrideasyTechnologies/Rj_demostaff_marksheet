import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EditProfileService, ITableData} from './edit-profile.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {base64StringToBlob} from 'blob-util';
import {
    Download_marksheet,
    Downloadaadhaar,
    EditProfile,
    GetAllBatchs,
    ProfileList, ProfileResources,
    Serverlink
} from '../../globals/global-api';
import {GlobalMessage} from "../../globals/global.message";
import {UDownloadfiles} from "../../globals/global_downloadfiles";
import {CommanService} from "../../globals/common.services";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';
import {StudentProfileList} from "../../models/responsemodel";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
    providers: [EditProfileService],
})

export class EditProfileComponent implements OnInit {
    private gridApi: any;
    private gridColumnApi: any;
    gridOptions: any;
    error: any;
    date: any;
    editCellData: any;
    searchValue: any;
    savealert: boolean = false;
    public data!: ITableData;
    public filterQuery = '';
    submitted = false;
    editprofileForm!: FormGroup;
    updateprofileForm!: FormGroup;
    res: any;
    Batchs = [];
    SelectedBatch: any;
    Deletecell: any;
    showlist: any;
    studentaadhaar: any;
    firstname: any;
    lastname: any;
    fathername: any;
    mothername: any;
    gender: any;
    update: any;

    perLocation: any = '';
    corCountry: any = '';
    perCountry: any = '';
    corState: any = '';
    perState: any = '';
    corDistrict: any = '';
    perDistrict: any = '';
    Birth_date: any;
    flatno: any;
    streetno: any;
    additional_address: any;
    landmark: any;
    taluka: any;
    city: any;
    pincode: any;

    showprofileImg: any;
    showaadharImg: any;
    showsignImg: any;

  selectresponse: any;
  country: any;
  district: any;
  location_area: any;
  state: any;

  Downloadloader = false;
  downloadphoto: any;

  oSession!: Sessiondata;
   res_profile!: StudentProfileList;

    constructor(private router: Router, private editprofileService: EditProfileService,
                private globalmessage: GlobalMessage,private commonService: CommanService,
                private formBuilder: FormBuilder,private sessionService : SessionService) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }




    pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

    ngOnInit(): void {
        // if (!this.Token) {
        //     // alert("Please Login!")
        //     this.globalmessage.Show_message('Please Login!');
        //     this.router.navigate(['login']);
        // } else {

        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();
            this.GetBatchApi();
            this.selectData();


        this.editprofileForm = new FormGroup({
            'aadhaarno': new FormControl('', Validators.required),
        });


        this.updateprofileForm = new FormGroup({
            'Aadhaar': new FormControl('', Validators.required),
            'FirstName': new FormControl('', Validators.required),
            'LastName': new FormControl(''),
            'FatherName': new FormControl('', Validators.required),
            'MotherName': new FormControl('', Validators.required),
            'Gender': new FormControl(''),
            'Dob': new FormControl(''),

          // 'gender': new FormControl(''),
            // 'Birth_date': new FormControl(''),
            'CorrepondenceFlatNo': new FormControl(''),
            'CorrepondenceColonyName': new FormControl(''),
            'convocationno': new FormControl(''),
            'CorrepondenceVillageName': new FormControl(''),
            'CorrepondenceLandmark': new FormControl(''),
            'CorrepondenceLocationArea': new FormControl(''),
            'CorrepondenceCountry': new FormControl(''),
            'CorrepondenceState': new FormControl(''),
            'CorrepondenceDistrict': new FormControl(''),
            'CorrepondenceTaluka': new FormControl(''),
            'CorrepondenceCity': new FormControl(''),
            'CorrepondencePincode': new FormControl(''),
            'upload': new FormControl(''),
            'whatsappno': new FormControl(''),


          // this.Birth_date = this.res.data.Dob;
          // this.flatno = this.res.data.CorrepondenceFlatNo;
          // this.streetno = this.res.data.CorrepondenceColonyName;
          // this.additional_address = this.res.data.CorrepondenceVillageName;
          // this.landmark = this.res.data.CorrepondenceLandmark;
          // this.perLocation = this.res.data.CorrepondenceLocationArea;
          // this.perCountry = this.res.data.CorrepondenceCountry;
          // this.perState = this.res.data.CorrepondenceState;
          // this.perDistrict = this.res.data.CorrepondenceDistrict;
          // this.taluka = this.res.data.CorrepondenceTaluka;
          // this.city = this.res.data.CorrepondenceCity;
          // this.pincode = this.res.data.CorrepondencePincode;
        });

    }

    imgFile!: Array<File>;

    ImageUpload(element: any) {
        this.imgFile = element.target.files;
        // application/vnd.ms-excel
        if (this.imgFile[0].type == 'image/png') {
        } else {
            this.globalmessage.Show_message('Only image file allowed!');//alert
        }
    }

    // formData:any;
    // OnSubmit() {
    //   this.formData.delete("picture");
    //   this.formData.append("picture", this.imgFile[0]);

    //   this.editprofileService.studentuploadimage(this.formData).subscribe((models: {}) => {
    //     this.res = models;
    //     console.log("My Response ", this.res);
    //     if (this.res.data == true) {
    //       this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })//alert
    //       }
    //     else {
    //       this.dialogService.open({ message: 'Failed to Upload', positive: 'Ok', })//alert
    //     }
    //   })
    // }



    DownloadAadhaar() {

        this.Downloadloader = true;
        let jsonin = {
            'collegecode': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            'useraadhaar': this.oSession.aadhaar,
            'studentaadhaar': parseInt(this.editprofileForm.controls['aadhaarno'].value)
        };
        this.commonService.Post_json(Downloadaadhaar,jsonin).subscribe(response => {
            if (response == null) {
                return;
            }
            // UDownloadfiles(response.photo, response.photofile);

          this.res = response;

            //const byteArray = atob( this.res.blobdata);

            const contentType = '';
            const blobb = base64StringToBlob(this.res.photo, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.photofile;
            link.click();

            this.DownloadSignature();
            this.Downloadloader = false;
        });

    }

    downloadSign: any;

    DownloadSignature() {
        let jsonin= {
            'collegecode': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            'useraadhaar': this.oSession.aadhaar,
            'studentaadhaar': parseInt(this.editprofileForm.controls['aadhaarno'].value)
        };
        this.commonService.Post_json(Downloadaadhaar,jsonin).subscribe(response => {
            this.res = response;

            //const byteArray = atob( this.res.blobdata);

            const contentType = '';
            const blobb = base64StringToBlob(this.res.signature, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.signaturefile;
            // console.log(link.download);
            link.click();


            // console.log("file created",byteArray);
            // console.log("downloadURL",downloadURL);
        });

    }

    ShowProfile() {
        let jsonin = {

            'useraadhaar': this.oSession.aadhaar,
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'studentaadhaar': parseInt(this.editprofileForm.controls['aadhaarno'].value)
        };

        this.commonService.Post_json(ProfileList,jsonin).subscribe((response: any) => {

           this.res_profile = response.data
            // this.res = response;
            // if (this.res.data == true) {
            this.showprofileImg =
                Serverlink + '/' + this.res_profile.PhotoFileName;
            this.showaadharImg =
                Serverlink + '/' + this.res_profile.AadhaarFilename;
            this.showsignImg =
                Serverlink + '/' + this.res_profile.SignatureFileName;

            this.updateprofileForm.patchValue(this.res_profile)
            // this.studentaadhaar = this.res.data.Aadhaar;
            // this.firstname = this.res.data.FirstName;
            // this.lastname = this.res.data.LastName;
            // this.fathername = this.res.data.FatherName;
            // this.mothername = this.res.data.MotherName;
            // this.gender = this.res.data.Gender;
            //
            // this.Birth_date = this.res.data.Dob;
            // this.flatno = this.res.data.CorrepondenceFlatNo;
            // this.streetno = this.res.data.CorrepondenceColonyName;
            // this.additional_address = this.res.data.CorrepondenceVillageName;
            // this.landmark = this.res.data.CorrepondenceLandmark;
            // this.perLocation = this.res.data.CorrepondenceLocationArea;
            // this.perCountry = this.res.data.CorrepondenceCountry;
            // this.perState = this.res.data.CorrepondenceState;
            // this.perDistrict = this.res.data.CorrepondenceDistrict;
            // this.taluka = this.res.data.CorrepondenceTaluka;
            // this.city = this.res.data.CorrepondenceCity;
            // this.pincode = this.res.data.CorrepondencePincode;

            // }
            // else {
            //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })//alert
            // }

            // this.rowss = this.res.data;
            // console.log("row", this.rowss);
            // console.log("res", this.studentaadhaar);

        });

    }

    UpdateProfile() {
       let jsonin = {
            'Aadhaar': this.updateprofileForm.controls['Aadhaar'].value,
            'FirstName': this.updateprofileForm.controls['FirstName'].value,
            'LastName': this.updateprofileForm.controls['LastName'].value,
            'FatherName': this.updateprofileForm.controls['FatherName'].value,
            'MotherName': this.updateprofileForm.controls['MotherName'].value,
            'Gender': this.updateprofileForm.controls['Gender'].value,
            'Dob': this.updateprofileForm.controls['Dob'].value,
            'CorrepondenceFlatNo': this.updateprofileForm.controls['CorrepondenceFlatNo'].value,
            'CorrepondenceColonyName': this.updateprofileForm.controls['CorrepondenceColonyName'].value,
            'CorrepondenceVillageName': this.updateprofileForm.controls['CorrepondenceVillageName'].value,
            'Correpondence_landmark': this.updateprofileForm.controls['CorrepondenceLandmark'].value,
            'Correpondence_location_area': this.updateprofileForm.controls['CorrepondenceLocationArea'].value,
            'Correpondence_country': this.updateprofileForm.controls['CorrepondenceCountry'].value,
            'Correpondence_state': this.updateprofileForm.controls['CorrepondenceState'].value,
            'Correpondence_district': this.updateprofileForm.controls['CorrepondenceDistrict'].value,
            'Correpondence_taluka': this.updateprofileForm.controls['CorrepondenceTaluka'].value,
            'Correpondence_city': this.updateprofileForm.controls['CorrepondenceCity'].value,
            'Correpondence_pincode': parseInt(this.updateprofileForm.controls['CorrepondencePincode'].value),
            'Convocationno': this.updateprofileForm.controls['convocationno'].value

         // 'gender': new FormControl(''),
         // 'Birth_date': new FormControl(''),
         // 'CorrepondenceFlatNo': new FormControl(''),
         // 'CorrepondenceColonyName': new FormControl(''),
         // 'convocationno': new FormControl(''),
         // 'CorrepondenceVillageName': new FormControl(''),
         // 'CorrepondenceLandmark': new FormControl(''),
         // 'CorrepondenceLocationArea': new FormControl(''),
         // 'CorrepondenceCountry': new FormControl(''),
         // 'CorrepondenceState': new FormControl(''),
         // 'CorrepondenceDistrict': new FormControl(''),
         // 'CorrepondenceTaluka': new FormControl(''),
         // 'CorrepondenceCity': new FormControl(''),
         // 'CorrepondencePincode': new FormControl(''),
            // flatno
            // streetno
            // additional_address
            // landmark
            // perLocation
            // perCountry
            // perState
            // perDistrict
            // taluka
            // city
            // pincode
        };

        if (this.studentaadhaar == 0) {
            this.globalmessage.Show_message('Please Enter Student Aadhaar');//alert
        } else {
            this.commonService.Post_json(EditProfile,jsonin).subscribe((response: {}) => {
                this.res = response;

                if (this.res.data == true) {
                    this.globalmessage.Show_message('Data Updated Successfully');//alert
                    this.updateprofileForm.reset();
                } else {
                    this.globalmessage.Show_message('Failed to Update!');//alert
                    this.globalmessage.Show_message('Ok');//alert
                }

            });
        }
    }



    selectData() {

        this.commonService.Post_json(ProfileResources,"").subscribe((response: {}) => {
            this.selectresponse = response;
            // console.log(this.selectresponse)
            if (this.selectresponse.data != null) {

                this.country = this.selectresponse.data.country;
                this.district = this.selectresponse.data.district;
                this.location_area = this.selectresponse.data.Location_Area;
                this.state = this.selectresponse.data.State;
            }

        });
    }

    //Grid column

    columnDefs = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true, editable: true},
        {headerName: 'FirstName', field: 'FirstName', resizable: true, editable: true},
        {headerName: 'LastName', field: 'LastName', resizable: true, editable: true},
        {headerName: 'FatherName', field: 'FatherName', resizable: true, editable: true},
        {headerName: 'Gender', field: 'Gender', resizable: true, editable: true},

        {headerName: 'Submit', field: 'Action', cellRendererFramework: EditCellCustomComponent},
        // { headerName: 'Action', field: 'Action', cellRendererFramework: DeleteCellCustomComponent }
    ];

    //Grid Rows
    rowss: any = [
        {'Aadhaar': 2345, 'FirstName': 'FirstName', 'LastName': 'LastName', 'FatherName': 'FatherName', 'Gender': 'Gender'}
    ];

    //grid- search
    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }


    onRowSelectedEvent(event: any) {
        this.editCellData = event.data;
        // console.log("editCellData", this.editCellData)

    }

    onSelectionChanged(event: any) {
    }

    GetBatchApi() { //Batch select list displaying

        this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {

            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Batchs = response['data'];

            }
        });
    }

    onChangeBatchSelect() {
    } //when Batch is Selected


    EditCell() {
        // console.log("edit", this.editprofileForm.value);
        // console.log("edit", this.editCellData);
    }


  MarksheetDownload() {

      this.Downloadloader = true;
      let jsonin = {
          'collegecode': this.oSession.collegecode,
          'finyear': this.oSession.finyear,
          'useraadhaar': this.oSession.aadhaar,
          'studentaadhaar': parseInt(this.editprofileForm.controls['aadhaarno'].value)
      };
      this.commonService.Post_json(Download_marksheet,jsonin).subscribe(response => {
          if (response == null) {
              return;
          }
          // UDownloadfiles(response.photo, response.marksheetfile);

        this.res = response;

        //const byteArray = atob( this.res.blobdata);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.photo, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.marksheetfile;
        link.click();

        this.Downloadloader = false;
      });

  }
}
