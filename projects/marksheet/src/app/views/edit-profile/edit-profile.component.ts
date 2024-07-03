import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {base64StringToBlob} from 'blob-util';
import {GlobalMessage} from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {Downloadaadhaar, EditProfile, ProfileList, ProfileResources} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
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

  selectresponse: any;
  country: any;
  district: any;
  location_area: any;
  state: any;

  showloader = false;

  oSession!: Sessiondata;

  constructor(
    private router: Router,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private sessionService : SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }



  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.Createform();
    this.GetBatchApi();
    this.selectData();
  }

  Createform() {
    this.editprofileForm = new FormGroup({
      aadhaar: new FormControl('', Validators.required),
    });

    this.updateprofileForm = new FormGroup({
      studentaadhaar: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      fathername: new FormControl('', Validators.required),
      mothername: new FormControl('', Validators.required),
      gender: new FormControl(''),
      Birth_date: new FormControl(''),
      flatno: new FormControl(''),
      streetno: new FormControl(''),
      convocationno: new FormControl(''),
      additional_address: new FormControl(''),
      landmark: new FormControl(''),
      perLocation: new FormControl(''),
      perCountry: new FormControl(''),
      perState: new FormControl(''),
      perDistrict: new FormControl(''),
      taluka: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      upload: new FormControl(''),
      whatsappno: new FormControl(''),
    });
  }

  get markscale_fld() {
    return this.updateprofileForm.get('marksclae');
  }

  imgFile!: Array<File>;

  ImageUpload(element: any) {
    this.imgFile = element.target.files;
    console.log(this.imgFile[0].type);
    console.log(this.imgFile[0].size);
    // application/vnd.ms-excel
    if (this.imgFile[0].type == 'image/png') {
    } else {
      this.globalmessage.Show_message('Only image file allowed!'); //alert
    }
  }

  Downloadloader = false;
  downloadphoto: any;

  DownloadAadhaar() {
    this.Downloadloader = true;
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
      studentaadhaar: parseInt(this.editprofileForm.controls['aadhaar'].value),
    };
    this.commonService.Post_json(Downloadaadhaar,jsonin).subscribe((response) => {

      if (response == null) {
        return;
      }
      this.res = response;

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
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
      studentaadhaar: parseInt(this.editprofileForm.controls['aadhaar'].value),
    };
    this.commonService.Post_json(Downloadaadhaar,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      this.res = response;

      const contentType = '';
      const blobb = base64StringToBlob(this.res.signature, contentType);

      let blob = new Blob([blobb], {type: 'application/blob'});

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.signaturefile;
      // console.log(link.download);
      link.click();
    });
  }


  ShowProfile() {
    this.showloader = true;
    let jsonin = {
      useraadhaar: this.oSession.aadhaar,
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      studentaadhaar: parseInt(this.editprofileForm.controls['aadhaar'].value),
    };

    this.commonService.Post_json(ProfileList,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      this.res = response;

      // if (this.res.data == true) {
      this.studentaadhaar = this.res.data.Aadhaar;
      this.firstname = this.res.data.FirstName;
      this.lastname = this.res.data.LastName;
      this.fathername = this.res.data.FatherName;
      this.mothername = this.res.data.MotherName;
      this.gender = this.res.data.Gender;

      this.Birth_date = this.res.data.Dob;
      this.flatno = this.res.data.CorrepondenceFlatNo;
      this.streetno = this.res.data.CorrepondenceColonyName;
      this.additional_address = this.res.data.CorrepondenceVillageName;
      this.landmark = this.res.data.CorrepondenceLandmark;
      this.perLocation = this.res.data.CorrepondenceLocationArea;
      this.perCountry = this.res.data.CorrepondenceCountry;
      this.perState = this.res.data.CorrepondenceState;
      this.perDistrict = this.res.data.CorrepondenceDistrict;
      this.taluka = this.res.data.CorrepondenceTaluka;
      this.city = this.res.data.CorrepondenceCity;
      this.pincode = this.res.data.CorrepondencePincode;
      this.showloader = false;
    });
  }


  //UpdateProfile

  UpdateProfile() {
    if (this.studentaadhaar == 0) {
      this.globalmessage.Show_message('Please Enter Student Aadhaar'); //alert
      return;
    }

    let jsonin = {
      aadhaar: this.updateprofileForm.controls['studentaadhaar'].value,
      firstname: this.updateprofileForm.controls['firstname'].value,
      lastName: this.updateprofileForm.controls['lastname'].value,
      fathername: this.updateprofileForm.controls['fathername'].value,
      mothername: this.updateprofileForm.controls['mothername'].value,
      Gender: this.updateprofileForm.controls['gender'].value,
      Dob: this.updateprofileForm.controls['Birth_date'].value,
      correpondence_flatno: this.updateprofileForm.controls['flatno'].value,

      correpondence_colonyname: this.updateprofileForm.controls['streetno']
        .value,
      correpondence_villagename: this.updateprofileForm.controls[
        'additional_address'
        ].value,
      correpondence_landmark: this.updateprofileForm.controls['landmark'].value,
      correpondence_location_area: this.updateprofileForm.controls[
        'perLocation'
        ].value,
      correpondence_country: this.updateprofileForm.controls['perCountry']
        .value,
      correpondence_state: this.updateprofileForm.controls['perState'].value,
      correpondence_district: this.updateprofileForm.controls['perDistrict']
        .value,
      correpondence_taluka: this.updateprofileForm.controls['taluka'].value,
      correpondence_city: this.updateprofileForm.controls['city'].value,
      correpondence_pincode: parseInt(
        this.updateprofileForm.controls['pincode'].value
      ),
      Convocationno: this.updateprofileForm.controls['convocationno'].value,
      Whatsapp:parseInt(this.updateprofileForm.controls['whatsappno'].value),
    };

    console.log('Value',jsonin)

    this.commonService.Post_json(EditProfile,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      this.res = response;
    
      if (this.res.data == true) {
        this.globalmessage.Show_message('Data Updated Successfully');
         //alert
        this.updateprofileForm.reset();
      } else {
        this.globalmessage.Show_message('Failed to Update!');
        //alert
        this.globalmessage.Show_error( this.res.exception);
       //alert
      }
    });
  }

  selectData() {
    this.commonService.Post_json(ProfileResources,"").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.selectresponse = response;
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
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'FirstName',
      field: 'FirstName',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'LastName',
      field: 'LastName',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'FatherName',
      field: 'FatherName',
      resizable: true,
      editable: true,
    },
    {headerName: 'Gender', field: 'Gender', resizable: true, editable: true},

    {
      headerName: 'Submit',
      field: 'Action',
      cellRendererFramework: EditCellCustomComponent,
    },
    // { headerName: 'Action', field: 'Action', cellRendererFramework: DeleteCellCustomComponent }
  ];

  //Grid Rows
  rowss: any = [
    {
      Aadhaar: 2345,
      FirstName: 'FirstName',
      LastName: 'LastName',
      FatherName: 'FatherName',
      Gender: 'Gender',
    },
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

  GetBatchApi() {
    //Batch select list displaying

    this.commonService.getBatches().subscribe((response: any) => {
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
}
