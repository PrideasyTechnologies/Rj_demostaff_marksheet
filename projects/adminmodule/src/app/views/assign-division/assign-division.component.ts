import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SubjectQuotaService } from './assign-division.service';
import { GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { EditCellCustomComponent } from '../editcell-custom/editcell-custom.component';
import {
  BatchSubjectsnone,
  Createrollno,
  downloadrollcallconfiguration,
  GetAllBatchs,
  iu_subject_group_rollno,
  IU_UpdateRollcall,
  RollCalllist,
  ServerIP,
  subject_group_rollno,
  UploadRollcall,
  uploadrollcallconfiguration,
} from '../../globals/global-api';
import Swal from 'sweetalert2';
import { base64StringToBlob } from 'blob-util';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import { ISubjectgroupCode } from './assign-divison-model';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

import { v4 as uuidv4 } from 'uuid';

import { saveAs } from 'file-saver';
import { Ires_RollCalllist } from '../../models/responsemodel';
import { IRes_subjectgroup_rollno } from '../../models/response';


@Component({
  selector: 'app-assign-division',
  templateUrl: './assign-division.component.html',
  styleUrls: ['./assign-division.component.scss'],
  providers: [SubjectQuotaService],
})
export class SubjectQuotaComponent implements OnInit {
  private gridApi: any;
  private gridApi_subjectgroup: any;
  private gridColumnApi: any;
  private gridColumnApisubjectgroup: any;
  gridOptions: any;
  gridOptions_subjectgroup: any;

  error: any;
  students: any;
  searchValue: any;

  DownloadUploadForm!: FormGroup;
  uuidValue!: string;
  PopUpForm: FormGroup;
  PopUpForm_Rollcall!: FormGroup;
  AssignDivisionForm!: FormGroup;
  AssignDivRollForm!: FormGroup;
  UploadFileForm!: FormGroup;

  Rollcall_configurationForm!: FormGroup;

  res: any;
  Batchs = [];
  SelectedBatch: any;
  SelectedSubject!: ISubjectgroupCode;
  SelectedDivision: any;
  Subject_group_code!: ISubjectgroupCode[];
  show: any;
  x: any;

  selectedobject!: Ires_RollCalllist;

  currentactive: boolean = true;
  oSession!: Sessiondata;

  Uploadloader: boolean = false;

  createRoll_data: any;
  //popup
  Rollno_popup_pwd: any;
  
  Rollno_popup_pwd_rollcall: any;

  Res_subject_group_rollno:IRes_subjectgroup_rollno[] =[];

  
  // selectedobject_subjectgroup!:IRes_subjectgroup_rollno;

  // primaryModal = false;
  // secondaryModal = false;

  out_rowselected:any
  @ViewChild('primaryModal') primaryModal: any;
  @ViewChild('secondaryModal') secondaryModal: any;

  // secondaryvisible!:false;
  public secondaryvisible = false;
  public primaryvisible = false;

  passwordVerified = false;
  // passwordVerified = null;

  // @ViewChild('infoModal') infoModal: any;
  // @ViewChild('primaryModal') primaryModal: any;

  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(
    private router: Router,
    private commonService: CommanService,
    private assigndivision: SubjectQuotaService,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
    this.gridOptions_subjectgroup = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
    this.PopUpForm = new FormGroup({
      Rollno_pwd: new FormControl('', Validators.required),
    });
    this.PopUpForm_Rollcall = new FormGroup({
      Rollno_pwd_rollcall: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.oSession = new Sessiondata(this.sessionService);
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();
    // this.generateUUID();
    // this.demo();

    this.AssignDivisionForm = new FormGroup({
      // 'Batch_Code': new FormControl('', Validators.required),
      SubCode: new FormControl('', Validators.required),

      //  'examType': new FormControl('', Validators.required),
    });

    this.UploadFileForm = new FormGroup({
      upload: new FormControl('', Validators.required),
    });

    this.Rollcall_configurationForm = new FormGroup({
      batch: new FormControl('', Validators.required),
    });
  }

  newuuidValue: any;
  newuid: any;
  private uuid: any = uuidv4;

  generateUUID() {
    this.newuid = this.uuid();
    this.uuidValue = this.newuid.replace(/-/g, '');
    return this.uuidValue;
  }

  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    { headerName: 'Aadhaar No.', field: 'Aadhaar', resizable: true },
    {
      headerName: 'Division',
      field: 'Batch_division',
      resizable: true,
      editable: true,
    },
    { headerName: 'Full Name', field: 'FullName', resizable: true },
    { headerName: 'Roll No', field: 'Rollno', resizable: true, editable: true },
    {
      headerName: 'Action',
      field: 'Action',
      cellRenderer: EditCellCustomComponent,
    },
  ];


  columnDefs_subjectgroup = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Division',
      field: 'Batch_division',
      resizable: true,
      editable: true,
    },
    { headerName: 'Roll No From', field: 'Rollno_from', resizable: true,editable: true, },
    { headerName: 'Roll No To', field: 'Rollno_to', resizable: true, editable: true },
    { headerName: 'Subject Name', field: 'Subject_names', resizable: true, editable: true },
    { headerName: 'Rules', field: 'Rules', resizable: true, editable: true },
    { headerName: 'Active Deactive ', field: 'Active_deactive', resizable: true, editable: true },
    // {
    //   headerName: 'Action',
    //   field: 'Action',
    //   cellRenderer: EditCellCustomComponent,
    // },
  ];

  //Grid Rows
  rowss: any = [];

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onGridReady_subjectgroup(params: any) {
    this.gridApi_subjectgroup = params.api;
    this.gridColumnApisubjectgroup = params.ColumnApi;
  }

  

  StudentAadhaar: any;
  batch_division: any;
  rollno: any;

  // onRowSelectedEvent(event: any) {
  //   (this.StudentAadhaar = event.data.Aadhaar),
  //     (this.batch_division = event.data.Batch_division),
  //     (this.rollno = event.data.Rollno);
  // }

  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedRows();
    this.selectedobject = selected_outnode[0];
  }

  onSeletionChange_subjectgroup(event: any) {
    // let selected_outnode = this.gridApi_subjectgroup.getSelectedRows();
    // this.selectedobject_subjectgroup = selected_outnode[0];

    let selected_outnode = this.gridApi_subjectgroup.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
  }

  
  GetBatchApi() {
    this.commonService
      .Post_json(GetAllBatchs, '')
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.Batchs = response['data'];
        }
      });
  }

  showPopup() {
    // this.primaryModal = true;
    this.primaryvisible = true;
  }

  showPopup_Rollcall_config() {
    // debugger
    if (!this.passwordVerified) {
      this.secondaryvisible = true;
    }else{
      // this.secondaryvisible = false;
      
      this.Show_subject_group_rollno();
    }

    
  }

  validateloader = false;

  OnValidateCreateRollno() {
    this.validateloader = true;
    this.Rollno_popup_pwd = this.PopUpForm.controls['Rollno_pwd'].value;

    if (
      this.Rollno_popup_pwd === 'Rjc123!@#' &&
      this.Rollno_popup_pwd !== null
    ) {
      alert('Validated Successfull');

      this.primaryvisible = false;
      this.Call_CreateRollno();
    } else {
      if (this.Rollno_popup_pwd === '') {
        // alert("Please enter password");
        Swal.fire({
          title: 'Error!',
          text: 'Please enter password',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert

        this.primaryvisible = false;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Password',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
        this.primaryvisible = false;
        // alert("Invalid Password");
      }
    }
    this.validateloader = false;
    //  console.log("POPUPPPPPPPPPPPPPPPPP",this.PopUpForm.controls['Rollno_pwd'].value);
  }

  OnValidate_RollCallConfiguration(){

    this.validateloader = true;
    this.Rollno_popup_pwd_rollcall = this.PopUpForm_Rollcall.controls['Rollno_pwd_rollcall'].value;

    if (
      this.Rollno_popup_pwd_rollcall === 'Devi1484!' &&
      this.Rollno_popup_pwd_rollcall !== null
    ) {
      alert('Validated Successfull');
      this.passwordVerified = true
      this.secondaryvisible = false;
      this.Show_subject_group_rollno();
    } else {
      if (this.Rollno_popup_pwd_rollcall === '') {
        // alert("Please enter password");
        Swal.fire({
          title: 'Error!',
          text: 'Please enter password',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert

        this.secondaryvisible = false;
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Password',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
        this.secondaryvisible = false;
      }
    }
    this.validateloader = false;
    
  }

  Call_CreateRollno() {
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      // "batchcode": this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };
    console.log('datamyy createRoll_data', this.createRoll_data);
    this.commonService.Post_json(Createrollno, jsonin).subscribe((response) => {
      this.res = response;
      this.primaryModal = false;
      // console.log(" Createrollno res", models);

      // const contentType = '';
      // const blobb = base64StringToBlob(this.res.blobdata, contentType);

      // let blob = new Blob([blobb], { type: 'application/blob' });

      // var downloadURL = window.URL.createObjectURL(blob);
      // var link = document.createElement('a');
      // link.href = downloadURL;
      // link.download = this.res.excelfile;
      // link.click();
      // this.AccountOutloader = false;
      // this.AccountOutclicked = false;
    });
  }

  showloader = false;
  onSubmit() {
    this.showloader = true;
    this.x = this.SelectedSubject.Subject_group_code;
    if (this.x == '') {
      this.x = 'NONE';
    } else {
      this.SelectedSubject.Subject_group_code;
    }
    // console.log(this.SelectedSubject.Subject_group_code, "Sub_Code")
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      // "batch_code": this.SelectedBatch.Batch_Code,
      batch_code: this.BatchCode,
      subjectgroupcode: this.x,
      useraadhaar: this.oSession.aadhaar,
      filename: 'xyz.xlsx',
    };
    this.commonService
      .Post_json(RollCalllist, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        this.gridApi.setRowData(this.res.data);
        this.rowss = this.res.data;
        this.globalmessage.Show_message('File Created SuccessFully');
        this.showloader = false;
      });
    this.demo();
  }

  update: any;

  EditCell() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchCode: this.BatchCode,
      aadhaar: parseInt(this.selectedobject.Aadhaar),
      batch_division: this.selectedobject.Batch_division,
      rollno: parseInt(this.selectedobject.Rollno),
    };

    this.commonService
      .Post_json(IU_UpdateRollcall, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          this.onSubmit();
          this.globalmessage.Show_message('Updated Successfully!');
        } else {
          this.globalmessage.Show_message('Failed to Update!');
        }
      });
  }

  // /Fees/iu_subject_group_rollno--->	Batch_code         int    binding:"required"
	// Batch_division     string binding:"required"
	// Rollno_from        int    binding:"required"
	// Rollno_to          int    binding:"required"
	// Subject_names      string binding:"required"
	// Subject_group_code string binding:"required"
	// Rules              string binding:"required"
	// Active_deactive    int    binding:"required"
	// Modifieddate       string

   // let jsonin = {
    //   Boardlevel: this.boardlevels,
    //   aadhaar: parseInt(jsonObj[0].Aadhaar),
    //   Useraadhaar: this.oSession.aadhaar,
    //   semester: parseInt(jsonObj[0].Semester),
    //   creditearned: parseInt(jsonObj[0].Creditearned),
    //   sgpa: parseInt(jsonObj[0].Sgpa),
    //   finyear: this.oSession.finyear,
    // };


  Edit_rollcall() {
    
    let xyz = JSON.stringify(this.out_rowselected)
    
    let jsonObj = JSON.parse(xyz);

   
    let jsonin = {
      Batch_code: jsonObj[0].Batch_code,
      Batch_division: jsonObj[0].Batch_division,
      Rollno_from: jsonObj[0].Rollno_from, 
      Rollno_to: jsonObj[0].Rollno_to,
      Subject_names: jsonObj[0].Subject_names,
      Subject_group_code: jsonObj[0].Subject_group_code,
      Rules: jsonObj[0].Rules,
      Active_deactive: jsonObj[0].Active_deactive
    };

    this.commonService
      .Post_json(iu_subject_group_rollno, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          this.globalmessage.Show_message('Updated Successfully!');
        } else {
          this.globalmessage.Show_message('Failed to Update!');
        }
      });
  }

  onChangeBatchSelect() {
    this.ShowBatch();
  }

  onChangeSubjectSelect() {
    console.log('kkk', this.SelectedSubject);
  }

  showbatch: any;

  ShowBatch() {
    let jsonin = {
      // "BatchCode": this.SelectedBatch.Batch_Code
      BatchCode: this.BatchCode,
    };
    this.commonService
      .Post_json(BatchSubjectsnone, jsonin)
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.Subject_group_code = response['data'];
        }
      });
  }

  //download File
  // url = "https://www.eazyinstitute.com:7001/exceldownload/"
  // url = "http://localhost:8075"
  ShowDetails: any;
  downloadfiles: any;
  Batch: any;

  demo() {
    // this.downloadfiles = this.url + this.SelectedBatch.Batch_Code + ".xlsx";
    this.downloadfiles =
      ServerIP + '/exceldownload/' + this.BatchCode + '.xlsx';
    // this.url;
    // this.assigndivision.RollCalllist(this.show).subscribe(models => {
    //   this.res = models;
    //   this.downloadfiles = this.url+;
    // console.log(this.downloadfiles);
    // })
  }

  // "excelfile": "/EXCEL/11.xlsx",

  downloaddata: any;

  DownloadFile() {
    // debugger
    this.generateUUID();
    this.assigndivision
      .download(this.downloadfiles)
      .subscribe((blob: any) => saveAs(blob, this.BatchCode + '.xlsx'));

    //Krunal
    console.log('filename', this.BatchCode + '.xlsx');
  }

  //Upload File
  csvFile!: Array<File>;

  csvUpload(element: any) {
    this.csvFile = element.target.files;
    console.log('this.csvFile', this.csvFile);
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    if (
      this.csvFile[0].type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.csvFile[0].size < 2400000
    ) {
    } else {
      this.globalmessage.Show_message('Only .xlsx file allowed!');
      this.UploadFileForm.reset();
    }
  }

  loader: any;

  uploadfile() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      filename: '',
    };

    let formData = new FormData();

    this.Uploadloader = true;

    formData.append('input_form', encryptUsingAES256(jsonin));

    // formData.append('input_form', jsonin);

    formData.append('file', this.csvFile[0]);

    this.commonService
      .Post_formdata(UploadRollcall, formData)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          this.globalmessage.Show_message('File Uploaded Successfully!');
          this.Uploadloader = false;
        } else {
          this.globalmessage.Show_message('Failed to Upload!');
          this.Uploadloader = false;
          this.reset();
        }
        this.onSubmit();
      });
  }

  reset() {
    // this.UploadFileForm.reset();
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  Downloadloader = false;
  downloadconfigure: any;

  Downloadrollconfiguration() {
    this.Downloadloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      // "batchcode": this.SelectedBatch.Batch_Code
    };
    this.commonService
      .Post_json(downloadrollcallconfiguration, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/blob' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.Downloadloader = false;
      });
  }

  //
  csvconfigFile!: Array<File>;

  Uploadconfig(element: any) {
    this.csvconfigFile = element.target.files;
    // console.log("this.csvFile", this.csvFile)
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    if (
      this.csvconfigFile[0].type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.csvconfigFile[0].size < 2400000
    ) {
    } else {
      this.globalmessage.Show_message('Only .xlsx file allowed!');
      this.UploadFileForm.reset();
    }
  }

  uploadloader = false;

  Uploadrollconfiguration() {
    this.uploadloader = true;

    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
    };

    let formData = new FormData();

    formData.append('input_form', encryptUsingAES256(jsonin));
    formData.append('file', this.csvconfigFile[0]);

    this.commonService
      .Post_formdata(uploadrollcallconfiguration, formData)
      .subscribe((response: {}) => {
        this.res = response;
        // console.log("My Response ", this.res);
        if (this.res.data == true) {
          this.globalmessage.Show_message('File Uploaded Successfully!');
          this.uploadloader = false;
        } else {
          this.globalmessage.Show_message('Failed to Upload!');
          this.uploadloader = false;
        }
      });
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
    // do something with selected item
    this.ShowBatch();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }

  Close() {
    this.primaryvisible = false;
  }

  Close_secondary() {
    this.secondaryvisible = false;
  }

  Show_subject_group_rollno() {
    this.showloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
    };

    this.commonService
      .Post_json(subject_group_rollno, jsonin)
      .subscribe((response) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.Res_subject_group_rollno = response.data;
        } else {
          this.Res_subject_group_rollno = response;
        }  
        if (this.Res_subject_group_rollno == null) {
          this.globalmessage.Show_error('No Data Found');
        }
        this.showloader = false;
      });
  }

  currentactivetab:number = 0;
  handleChange(event:any){
    this.currentactive = event;

    if(this.currentactivetab == 0 || this.currentactivetab == 1){
      this.passwordVerified = false
      this.PopUpForm_Rollcall.reset();
      this.Rollcall_configurationForm.reset();
      this.Res_subject_group_rollno = []
    }
  }
}

