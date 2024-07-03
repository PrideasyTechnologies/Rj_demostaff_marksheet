import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadSgpaService,} from './upload-sgpa.service';
import {GridApi, GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {base64StringToBlob} from 'blob-util';
import {GlobalMessage} from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {
  batchsubjectgroup,
  batchuserexam, delete_sgpa,
  deletestudentsgpa,
  download_examsgpa, download_sgpa,
  editstudentsgpa,
  exceldownloadsgpa,
  exceluploadsgpa,
  iu_sgpa,
  sgpa,
  showoverallgrade,
  updateaadhaargrade,
  upload_examsgpa, upload_sgpa,
  viewstudentsgpa
} from "../../globals/global-api";
import {CellCustomComponent} from "../cell-custom/cell-custom.component";
import {Ires_overallgrade} from "./upload-sgpa-response.model";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-upload-Sgpa',
  templateUrl: './upload-Sgpa.component.html',
  styleUrls: ['./upload-Sgpa.component.scss'],
  providers: [UploadSgpaService],
})
export class UploadSgpaComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  gridOptions: any;
  gridOptions_add: any;

  gridOptions_out: any;
  gridOptions_manual: any;

  private gridApi_manual: any;
  private gridColumnApi_manual: any;

  private gridApi_out: any;
  private gridColumnApi_out: any;

  out_rowselected: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  res_overallgrade!: Ires_overallgrade[];
  Batch_Code: any;
  UploadSgpaForm!: FormGroup;
  EditForm!: FormGroup;
  DownloadSgpaForm!: FormGroup;

  ManualUpdateForm!: FormGroup;
  uploadExamwiseSgpaForm!: FormGroup;
  Batchs: any;
  SelectedSubject: any;
  StudentAadhaar: any;
  Sgpa_id: any;
  FullName: any;
  Sgpa: any;
  Creditpoints: any;
  viewsubject: any;
  Subject_group_code: any;
  SelectedBatch: any;
  SelectedSemester: any;
  SelectedBatSemester: any;
  SelectedregularAtkt: any;
  sem: any;
  semester: any;
  SelectAadhar: any;
  SelectAadharS: any;
  Semesters: any;
  updatedata: any;
  boardlevel: any;
  boardlevels: any;
  batsem: any;
  BatchSemesters: any;
  Downloadloader = false;
  DownloadloaderU = false;
  DownloadloaderD = false;

  selectedobjectManualgrid!:Ires_overallgrade;

  manualloader = false;
  viewfile: any;
  downloadclicked = false;
  loader: any;
  formData = new FormData();
  viewloader = false;
  examwiseloader = false;
  view: any;
  edit: any;
  delete: any;
  @ViewChild('infoModal') infoModal: any;
  private outside_sgpa: any;
  private gridApi_add: any;
  private gridColumnApi_add: any;

  //Add student details
  private SGPAadd: any;
  private Creditpointsadd: any;

  //Outside vIew
  private adhaaro: any;
  SelectedBoardlevel: any;
  SelectedBoardlevelS: any;

  data: any;

  public rowSelection: 'single' | 'multiple' = 'single';

  SelectedTemplate: any;
  outsideStudent!: FormGroup;
  addStudentdetails!: FormGroup;
  SelectedSemExam: any;
  Exam: any;
  creditpoints: any;
  exam: any;
  addrowss: any = [];
  outrowss: any = [];

  BatchCode: any;
  BatchCode2: any;
  Batchkeyword = 'Batch_Name';
  Batchkeyword2 = 'Batch_Name';

  uploadloader = false;

  xlsxFile!: Array<File>;

  oSession!: Sessiondata;

  constructor(private router: Router,
              private uploadSgpaservice: UploadSgpaService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,
              private commonService: CommonService,private sessionService : SessionService) {


    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };


    this.gridOptions_manual = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.gridOptions_out = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }


  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();
    this.UploadSgpaForm = new FormGroup({
      'Semester_Name': new FormControl('', Validators.required),
      'upload': new FormControl('', Validators.required),
      // 'regularatkt': new FormControl('', Validators.required),
    })
    this.uploadExamwiseSgpaForm = new FormGroup({
      'semname': new FormControl('', Validators.required),
      'uploadfile': new FormControl('', Validators.required),

      // 'regularatkt': new FormControl('', Validators.required),
    })
    this.DownloadSgpaForm = new FormGroup({
      'regularatkt': new FormControl('', Validators.required),
    })
    this.EditForm = new FormGroup({
      'Aadhaar': new FormControl('', Validators.required),
      'Name': new FormControl('', Validators.required),
      'SGPA': new FormControl('', Validators.required),
      'creditpoints': new FormControl('', Validators.required),
    })
    this.ManualUpdateForm = new FormGroup({
      'aadhaar': new FormControl('', Validators.required),
      'boardlevel': new FormControl('', Validators.required),
    })
    // this.DownloadUploadForm = new FormGroup({
    //   'upload': new FormControl('', Validators.required),
    // })
    this.outsideStudent = new FormGroup({
      'aadhaar': new FormControl('', Validators.required),
      'boardlevels': new FormControl('', Validators.required),
      'creditpointso': new FormControl('', Validators.required),
      'creditpointsadd': new FormControl('', Validators.required),

    })


    this.addStudentdetails = new FormGroup({
      // 'aadhaar': new FormControl(parseInt('')),
      // 'boardleveli': new FormControl('', Validators.required),
      'creditpointsadd': new FormControl('', Validators.required),
      'SGPA': new FormControl(''),
      'Semester': new FormControl(parseInt(''))

    })


    let dummydata: Ires_overallgrade[] = [{
      Aadhaar: 0,
      Sgpa: 0,
      Creditearned: 0,
      Semester: 1,
      Nep_sgpa: 0,
      Nep_creditearned: 0,
    }]

    this.res_overallgrade = dummydata;

    this.gridOptions_manual.api.setRowData(this.res_overallgrade);

  }

  // aadhaar = parseInt(sessionStorage.getItem('aadhaar')!);
  // boardleveli = parseInt(sessionStorage.getItem('boardleveli')!);
  // creditpointsadd = parseInt(sessionStorage.getItem('creditpointsadd')!);
  // SGPA = parseInt(sessionStorage.getItem('SGPA')!);
  // Semester = parseInt(sessionStorage.getItem('SGPA')!);


  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    // { headerName: "Sgpa Id", field: "Sgpa_id", resizable: true, },
    {headerName: "Aadhaar", field: "Aadhaar", resizable: true},
    {headerName: "Full Name", field: 'FullName', resizable: true},
    {headerName: "Sgpa", field: "Sgpa", resizable: true},
    {headerName: "Credit Points", field: "Creditpoints", resizable: true},
  ];

  //Grid Rows
  rowss: any = [];

  //pagination page size
  public paginationPageSize = 10;

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onPageSizeChangedupload() {
    var value = (document.getElementById('page-sizeupload') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onGridReady_manual(params: any) {
    this.gridApi_manual = params.api;
    this.gridColumnApi_manual = params.ColumnApi;

  }

  onRowSelectedEvent(event: any) {
    this.StudentAadhaar = event.data.Aadhaar;
    this.Sgpa_id = event.data.Sgpa_id;
    this.FullName = event.data.FullName;
    this.Sgpa = event.data.Sgpa;
    this.Creditpoints = event.data.Creditpoints
  }

  onSelectionChanged(event: any) {
  }

  //edit popup
  EditCell() {
    if (this.Sgpa == null) {
      // this.dialogService.open({ message: 'Please Select Row to edit!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Row to edit!', icon: 'error', confirmButtonText: 'OK'})//alert

    } else {
      this.infoModal.show();
    }
  }

  // refreshupdate() {
  //   this.viewfiles = {
  //     "college_code": this.oSession.collegecode,
  //     "finyear": this.oSession.finyear,
  //     "batch_code": this.BatchCode2,
  //     "semester": this.SelectedBatSemester.Semester,
  //     "batchexam_id":this.SelectedBatSemester.Batchexam_id,
  //     "useraadhaar": this.oSession.aadhaar
  //   }
  //   this.uploadSgpaservice.viewstudentsgpa(this.viewfiles).subscribe(response => {
  //     this.res = response;
  //     this.rowss = this.res.data;
  //   })
  // }
  //update Button
  OnUpdate() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "sgpa_id": this.Sgpa_id,
      "Sgpa": this.EditForm.controls['SGPA'].value,
      "creditpoints": parseFloat(this.EditForm.controls['creditpoints'].value),
      "useraadhaar": this.oSession.aadhaar
    }
    if (this.Sgpa == null) {
      // this.dialogService.open({ message: 'Please Select Row to edit!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Row to edit!', icon: 'error', confirmButtonText: 'OK'})//alert

    } else {
      this.commonService.Post_json(editstudentsgpa, jsonin).subscribe(response => {
        this.res = response;
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Updated Successfully!', positive: 'Ok', })//alert
          Swal.fire({title: 'Success!', text: 'Updated Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert

          this.infoModal.hide();
          this.viewFile();
        } else {
          // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
          Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert

        }
      })
    }
  }

  DeleteSuccessDialog() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "sgpa_id": this.Sgpa_id,
      "useraadhaar": this.oSession.aadhaar
    }
    if (this.Sgpa_id == null) {
      // this.dialogService.open({ message: 'Please Select Row to delete!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Row to delete!', icon: 'error', confirmButtonText: 'OK'})//alert

    } else {
      this.commonService.Post_json(deletestudentsgpa, jsonin).subscribe(response => {
        this.res = response;

        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', })//alert
          Swal.fire({title: 'Success!', text: 'Deleted Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert

          this.viewFile();
        } else {
          // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
          Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert

        }
      })
    }
  }

  //Batch
  GetBatchApi() { //Batch select list displaying
    this.commonService.getBatches().subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  //Subject'
  GetSubjectApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "semester": this.SelectedSemester.Semester
    }
    this.commonService.Post_json(batchsubjectgroup, jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Subject_group_code = response['data'];
      }
    });
  }

  //user exam api
  GetSemesterApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(batchuserexam, jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({
          title: 'Error!',
          text: 'No data found! Please Configure UploadSgpa..',
          icon: 'error',
          confirmButtonText: 'OK'
        })//alert
        this.resetAll();
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  //user exam api
  GetBatchSemesterApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode2,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(batchuserexam, jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({
          title: 'Error!',
          text: 'No data found! Please Configure UploadSgpa..',
          icon: 'error',
          confirmButtonText: 'OK'
        })//alert
        this.resetAll();
      } else {
        this.BatchSemesters = response['data'];
      }
    });
  }


  onChangeregularAtktSelect() {
  }

  //when Batch is Selected
  onChangeBatchSelect() {
    this.GetSemesterApi();
  }

  //when subject is Selected
  onChangeSubjectSelect() {
  }

  //when semester is Selected
  onChangeSemesterSelect() {
    this.GetSubjectApi();
  }

  onChangeBatSemesterSelect() {
  }

  //atkt/regular select list
  AtktRegular: Array<Object> = [
    {value: "REGULAR", name: "REGULAR"},
    {value: "ATKT", name: "ATKT"},

  ];

  //download File
  OnDownloadFile() {
    // this.downloadclicked = true;
    this.Downloadloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "examtype": this.DownloadSgpaForm.controls['regularatkt'].value
    }
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Selct Batch', icon: 'error', confirmButtonText: 'OK'})//alert

      // this.downloadclicked = false;
      this.Downloadloader = false;
    }
    this.commonService.Post_json(exceldownloadsgpa, jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "DownloadSgpa.xlsx";
      link.click();
      this.Downloadloader = false;
      // this.downloadclicked = false;
    })
  }

  //Upload File


  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (this.xlsxFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.xlsxFile[0].size < 2400000) {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({title: 'Error!', text: 'Only .xlsx file allowed!', icon: 'error', confirmButtonText: 'OK'})//alert

      this.resetAll();
    }
  }

  uploadfile() {

    if (this.xlsxFile == null) {
      this.globalmessage.Show_error("File not selected ");
      return;
    }

    this.loader = true;

    let jsonin = {
      College_code : this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar,
      Batch_code : this.BatchCode2,
      Semester : this.SelectedBatSemester.Semester,
    }

    let formData = new FormData();

    formData.append("input_json",encryptUsingAES256(jsonin));
    formData.append("file", this.xlsxFile[0]);

    this.commonService.Post_formdata(exceluploadsgpa, formData).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
        Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert

        // this.loader = false;
        this.viewFile();
        this.UploadSgpaForm.reset();
      } else {
        // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
        //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert

        this.loader = false;
      }
    })
    this.UploadSgpaForm.reset();
  }

  viewFile() {
    this.viewloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode2,
      "semester": this.SelectedBatSemester.Semester,
      "batchexam_id": this.SelectedBatSemester.Batchexam_id,
      "useraadhaar": this.oSession.aadhaar,
    }
    this.commonService.Post_json(viewstudentsgpa, jsonin).subscribe(response => {
      this.gridOptions.api.setRowData(this.res.data);
      this.res = response;
      this.rowss = this.res.data;
      this.viewloader = false;
    })
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/upload-sgpa"]);
    });
  }

  //Exam wise upload

  //download File
  OnDownloadExamwiseFile() {
    this.examwiseloader = true;
    this.Downloadloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "batchexam_id": this.SelectedSemester.Batchexam_id,
      "reporttype": "XL"
    }
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Selct Batch', icon: 'error', confirmButtonText: 'OK'})//alert

      // this.downloadclicked = false;
      this.examwiseloader = false;
    }
    this.commonService.Post_json(download_examsgpa, jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.examwiseloader = false;
    })
  }

  //Upload File

  uploadExamwiseFile() {
    this.uploadloader = true;


    let jsonin = {
      college_code : this.oSession.collegecode,
      finyear :this.oSession.finyear,
      useraadhaar : this.oSession.aadhaar,
      batch_code : this.BatchCode,
      batchexam_id : this.SelectedSemester.Batchexam_id,
      reporttype : "XL",
    }


    let formData = new FormData();

    formData.append("input_form",encryptUsingAES256(jsonin));


    formData.append("excel", this.xlsxFile[0]);

    this.commonService.Post_formdata(upload_examsgpa, formData).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert

        // this.loader = false;
        this.viewFile();
      } else {
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert

        this.uploadloader = false;
      }
    })
  }

  ///AutoComplete

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
    this.GetSemesterApi();
    // do something with selected item
  }

  selectBatch2(bat2: any) {
    this.BatchCode2 = bat2.Batch_Code
    this.GetBatchSemesterApi();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
  }

  onChangeSearch2(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused2(e: any) {
    // do something
  }

  //Manual update credit points


  ShowManual() {
    this.manualloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "useraadhaar": this.oSession.aadhaar,
      "aadhaar": this.ManualUpdateForm.controls['aadhaar'].value,
      "Boardlevel": this.ManualUpdateForm.controls['boardlevel'].value,
    }


    this.commonService.Post_json(showoverallgrade, jsonin).subscribe(response => {
      this.res_overallgrade = response.data;
      //this.manualrowss = this.res_overallgrade;

      this.manualloader = false;

    })
  }

  //Grid column
  manualcolumnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },

    {headerName: "Semester", field: "Semester", editable: true, resizable: true,flex: 1},
    {headerName: "Aadhaar", field: "Aadhaar", editable: true, resizable: true, flex: 1},
    {headerName: "SGPA", field: "Sgpa", editable: true, resizable: true, flex: 1},
    {headerName: "Credit Earned", field: 'Creditearned', editable: true, resizable: true, flex: 1},
    {headerName: "NEP SGPA", field: 'Nep_sgpa', editable: true, resizable: true, flex: 1},
    {headerName: "NEP Credit Earned", field: 'Nep_creditearned', editable: true, resizable: true, flex: 1},
    {headerName: 'Update', field: 'Action', cellRenderer: CellCustomComponent}
  ];

  //Grid Rows
  //manualrowss: any = [];

  onmanualRowSelectedEvent(event: any) {
    this.StudentAadhaar = event.data.Aadhaar;
    this.Sgpa_id = event.data.Sgpa_id;
    this.FullName = event.data.FullName;
    this.Sgpa = event.data.Sgpa;
    this.Creditpoints = event.data.Creditpoints
  }

  onmanualSelectionChanged(event: any) {
    let selected_outnode = this.gridApi_manual.getSelectedRows();
    this.selectedobjectManualgrid = selected_outnode[0];
    console.log('slelected',this.selectedobjectManualgrid)
  }

  //Outside Students


  onChangeSemExamSelect() {
    this.sem = this.SelectedSemExam;
  }

  onChangeBoardlevel() {
    this.boardlevel = this.SelectedBoardlevel;
  }

  onChangeTemplateSelect(e: any) {
    this.SelectedTemplate = e;
  }

  onChangeBoardlevelS() {
    this.boardlevels = this.SelectedBoardlevelS;
  }

  modal(selectedData: any) {
    let jsonin = {
      College_code: this.oSession.collegecode,
      Aadhaar: this.selectedobjectManualgrid.Aadhaar,
      Semester: this.selectedobjectManualgrid.Semester,
      Sgpa: this.selectedobjectManualgrid.Sgpa,
      Creditearned: this.selectedobjectManualgrid.Creditearned,
      nep_sgpa: this.selectedobjectManualgrid.Nep_sgpa,
      nep_creditearned: this.selectedobjectManualgrid.Nep_creditearned,
      Boardlevel: this.ManualUpdateForm.controls['boardlevel'].value
    }

    console.log('jsonn',jsonin)
    this.commonService.Post_json(updateaadhaargrade, jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        Swal.fire({title: 'Success!', text: 'File Updated Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert
      } else {
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
      }
    })
  }

  show_outsidesgpa() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      Useraadhaar: this.oSession.aadhaar,
      Boardlevel: this.boardlevels,
      Studentaadhaar: parseInt(this.SelectAadharS),
    };
    {
      this.Downloadloader = true;
      this.commonService.Post_json(sgpa, jsonin).subscribe(
        (response) => {
          if (response == null) {
            return;
          }
          this.gridOptions_out.api.setRowData(response);
          this.downloadclicked = false;
          this.Downloadloader = false;
        }
      );
    }
  }

  onGridReady_out(params: any) {
    this.gridApi_out = params.api;
    this.gridColumnApi_out = params.ColumnApi;
  }

//   onRowSelectedEvent_out(params: any) {
//     this.gridApi_out = params.api;
//     this.gridColumnApi_out = params.ColumnApi;
// }
//
//   onSelectionChanged_out(params:any) {
//     this.gridApi_out = params.api;
//     this.gridColumnApi_out = params.ColumnApi;
//   }

  outcolumnDefs = [
    {
      field: '',
      maxWidth: 50,
    },
    {headerName: "Semester", field: "Semester", resizable: true,},
    {headerName: "Aadhaar", field: "Aadhaar", resizable: true},
    {headerName: "SGPA", field: "Sgpa", editable: true, resizable: true},
    {headerName: "Credit Earned", field: 'Creditearned', editable: true, resizable: true},
  ];

  addcolumnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    {headerName: "Semester", field: "Semesters", resizable: true,},
    {headerName: "Aadhaar", field: "aadhaar", resizable: true},
    {headerName: "SGPA", field: "sgpa", editable: true, resizable: true},
    {headerName: "Credit Earned", field: 'creditearned', editable: true, resizable: true},
    {headerName: "Boardlevel", field: "Boardlevel", resizable: true,},
    // { headerName: "Seven Scale SGPA", field: "Sevenscale_sgpa", editable: true, resizable: true },
    // {headerName: "Overall CGPA", field: "Overall_cgpa", editable: true, resizable: true},
    // {headerName: "Overall Grade", field: "Overall_grade", editable: true, resizable: true},
    // {headerName: 'Update', field: 'Action', cellRendererFramework: CellCustomComponent},
  ];

  addetails() {
    let jsonin = {
      // Boardlevel: this.boardlevel,
      // aadhaar: parseInt(this.SelectAadhar),
      Boardlevel: this.boardlevels,
      aadhaar: parseInt(this.SelectAadharS),
      Useraadhaar: this.oSession.aadhaar,
      semester: parseInt(this.sem),
      creditearned: parseInt(this.creditpoints),
      sgpa: parseInt(this.Sgpa),
      finyear: this.oSession.finyear
    };
    {
      this.Downloadloader = true;
      this.commonService.Post_json(iu_sgpa, jsonin).subscribe(
        (response) => {
          if (response == null) {
            return;
          }
          if (response == true) {
            this.globalmessage.Show_message('Entry saved');
            this.show_outsidesgpa();
          }
          this.downloadclicked = false;
          this.Downloadloader = false;
        }
      );
    }
  }

  onRowSelectedEvent_out(event: any) {

    this.StudentAadhaar = event.data.Aadhaar;
    this.Sgpa_id = event.data.Sgpa_id;
    this.FullName = event.data.FullName;
    this.Sgpa = event.data.Sgpa;
    this.Creditpoints = event.data.Creditpoints
  }

  onSelectionChanged_out(event: any) {
    let selected_outnode = this.gridApi_out.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
  }

  onfoucs_out(event: any) {
  }

  get_refesh() {
  }

  Updatedetails() {

    if (this.boardlevel == "") {
      this.globalmessage.Show_message('Select Board level');
      return;
    }
    if (this.SelectAadhar == "") {
      this.globalmessage.Show_message('Enter Aaadhaar');
      return;
    }

    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);

    let jsonin = {
      Boardlevel: this.boardlevels,
      aadhaar: parseInt(jsonObj[0].Aadhaar),
      Useraadhaar: this.oSession.aadhaar,
      semester: parseInt(jsonObj[0].Semester),
      creditearned: parseInt(jsonObj[0].Creditearned),
      sgpa: parseInt(jsonObj[0].Sgpa),
      finyear: this.oSession.finyear,
    };
    {
      this.DownloadloaderU = true;
      this.commonService.Post_json(iu_sgpa, jsonin).subscribe(
        (response) => {
          if (response == null) {
            return;
          }
          if (response == true) {
            this.globalmessage.Show_message('Entry updated');
            this.show_outsidesgpa()
          }
          this.downloadclicked = false;
          this.DownloadloaderU = false;
        }
      );
    }
  }

  deletedetails() {

    if (this.boardlevel == "") {
      this.globalmessage.Show_message('Select Board level');
      return;
    }

    if (this.SelectAadhar == "") {
      this.globalmessage.Show_message('Enter Aaadhaar');
      return;
    }

    if (this.out_rowselected == null) {
      return;
    }


    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);
    let jsonin = {
      Boardlevel: this.boardlevels,
      Aadhaar: parseInt(this.SelectAadharS),
      Semester: jsonObj[0].Semester,
    };
    {
      this.DownloadloaderD = true;
      this.commonService.Post_json(delete_sgpa, jsonin).subscribe(
        (response) => {
          if (response == null) {
            return;
          }
          if (response == true) {
            this.globalmessage.Show_message('Deleted successfull');
            this.show_outsidesgpa();
          }
          this.downloadclicked = false;
          this.DownloadloaderD = false;
        }
      );
    }
  }

  uploadOutside() {
    this.loader = true;

    let jsonin = {
      College_code : this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar :  this.oSession.aadhaar,
      Boardlevel : this.boardlevels
    }

    let formData = new FormData();

    formData.append("input_form",encryptUsingAES256(jsonin));
    formData.append("file", this.xlsxFile[0]);

    this.commonService.Post_formdata(upload_sgpa, formData).subscribe((response: {}) => {
      if (response == true) {
        this.globalmessage.Show_message('File Uploaded Successfully!');
        this.loader = false;
      } else {
        this.globalmessage.Show_message('Error in file upload');
        this.loader = false;
      }
    })
  }

  OnDownloadExamwiseFileD() {
    this.examwiseloader = true;
    this.Downloadloader = true;
    let jsonin = {
      "College_code": this.oSession.collegecode,
      "Finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "Useraadhaar": this.oSession.aadhaar,
      "Boardlevel": this.boardlevels,

      // "batchexam_id": this.SelectedSemester.Batchexam_id,
      "reporttype": "XL"
    }
    if (this.boardlevels == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Boardlevel', icon: 'error', confirmButtonText: 'OK'})//alert

      // this.downloadclicked = false;
      this.examwiseloader = false;
    }
    this.commonService.Post_json(download_sgpa, jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.examwiseloader = false;
    })
  }

  uploadfileselected($event: Event) {
  }
}

