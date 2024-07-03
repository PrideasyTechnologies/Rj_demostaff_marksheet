import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { base64StringToBlob } from 'blob-util';
import { DeleteCellCustomComponent } from '../delete-cellcustom/delete-cellcustom.component';
import { GlobalMessage } from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {
  batchsemstersubjects,
  batchuserexam, deleteallstudentsubjects, deletestudentsubjects,
  downloadstudentssubjects,
  uploadstudentsubjects, viewstudentsubjects
} from "../../globals/global-api";
import {ISemester} from "../../models/response";
import {Isemester, ISubject} from "./student-subject.model";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.component.html',
  styleUrls: ['./student-subject.component.scss'],
})
export class StudentSubjectComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  Batch_Code: any;
  StudentSubjectForm!: FormGroup;
  StudentDownloadForm!: FormGroup;
  DownloadSgpaForm!: FormGroup;
  DownloadUploadForm!: FormGroup;
  StudentDeleteForm!: FormGroup;
  Batchs: any;

  viewsubject: any;
  Subject_group_code!: ISubject[];
  SelectedSubject!: ISubject;
  SelectedBatch: any;
  SelectedSemester: any;

  SelectedPaperCode: any;
  SelectedPaperType: any;
  papercode: any;
  papertype: any;
  semester: any;

  Semesters!: Isemester[];
  SelectedBatSemester2! : Isemester;

  PaperCodes: any;
  PaperTypes: any;
  StudentAadhaar: any;
  Studentsubject_id: any;
  FullName: any;
  RollNo: any;
  Batch_division: any;
  Subject_order: any;

  viewloader = false;
  viewfiles: any;
  delete: any;
  Deleteloader = false;
  loader: any;
  formData = new FormData();
  xlsxFile!: Array<File>;
  Downloadloader = false;
  downloadfile: any;
  DownloadClicked = false;
  batsem: any;
  BatchSemesters!: Isemester[];
  SelectedBatSemester!: Isemester;
  Subject_name: any;
  Deletefile: any;

  oSession!: Sessiondata;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private globalmessage : GlobalMessage,
    private commonService: CommonService,
    private sessionService : SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

 

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();

    this.StudentSubjectForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      'upload' : new FormControl('', Validators.required),
    });

    this.StudentDownloadForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      // 'subject': new FormControl('', Validators.required),
    });

    this.DownloadUploadForm = new FormGroup({
      upload: new FormControl('', Validators.required),
    });

    this.StudentDeleteForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
    });
  }

  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    // { headerName: "Student subject id", field: "Studentsubject_id", resizable: true, },
    { headerName: 'Aadhaar', field: 'Aadhaar', resizable: true },
    {
      headerName: 'Full Name',
      field: 'FullName',
      resizable: true,
      editable: true,
    },
    { headerName: 'RollNo', field: 'Rollno', resizable: true, editable: true },
    {
      headerName: 'Batch Division',
      field: 'Batch_division',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'Subject order',
      field: 'Subject_order',
      resizable: true,
      editable: true,
    },

    {
      headerName: 'Delete',
      field: 'Action',
      cellRenderer: DeleteCellCustomComponent,
    },
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

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {
    this.StudentAadhaar = event.data.Aadhaar;
    this.Studentsubject_id = event.data.Studentsubject_id;
    this.FullName = event.data.FullName;
    this.RollNo = event.data.RollNo;
    this.Batch_division = event.data.Batch_division;
    this.Subject_order = event.data.Subject_order;
  }

  onSelectionChanged(event: any) {
    console.log(event);
  }

  //Batch
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

  //Subject'
  GetSubjectApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode2,
      useraadhaar: this.oSession.aadhaar,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };
    this.commonService.Post_json(batchsemstersubjects,jsonin).subscribe(
      (response) => {
        if (response == null){
          return ;
        }
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure StudentSubject..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure StudentSubject..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.Subject_group_code = response['data'];
        }
      }
    );
  }

  GetSemesterApiDownload() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService.Post_json(batchuserexam,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Semesters = response['data'];
      }
    });
  }

  //batchuserexam
  GetSemesterApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService.Post_json(batchuserexam,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Semesters = response['data'];
      }
    });
  }

  //subject
  GetBatchSemesterApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode2,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService.Post_json(batchuserexam,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.BatchSemesters = response['data'];
      }
    });
  }

  //when Batch is Selected
  onChangeBatchSelect() {
    this.GetSemesterApi();
    this.GetSemesterApiDownload();
  }

  //when subject is Selected
  onChangeSubjectSelect() {}

  //when semester is Selected
  onChangeSemesterSelect() {
    // this.GetSubjectApi();
  }

  onChangeBatSemesterSelect2() {}

  onChangeBatSemesterSelect() {
    this.GetSubjectApi();
  }

  //download File
  OnDownloadFile() {
    // this.DownloadClicked = true;
    this.Downloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      semester: this.SelectedBatSemester2.Semester,
      batchexam_id: this.SelectedBatSemester2.Batchexam_id,
    };
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: ' Please Select Batch!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert

      // this.DownloadClicked = false;
      this.Downloadloader = false;
    }
    this.commonService.Post_json(downloadstudentssubjects,
      jsonin
    ).subscribe((response) => {
      this.res = response;
      this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], { type: 'application/blob' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.Downloadloader = false;
      // console.log("file created",byteArray);
      console.log('downloadURL', downloadURL);
      // this.DownloadClicked = false;
    });
  }

  //Upload File
  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (
      this.xlsxFile[0].type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.xlsxFile[0].size < 2400000
    ) {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: 'Only .xlsx file allowed!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert

      this.resetAll();
    }
  }

  uploadfile() {

    if (this.xlsxFile[0] == null){
      this.globalmessage.Show_error("File not selected ");
      return;
    }

    this.loader = true;

    let jsonin = {
      College_code : this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar,
      Batch_code :  this.BatchCode2,
      Semester : this.SelectedBatSemester.Semester.toString(),
      Batchexam_id : this.SelectedBatSemester.Batchexam_id.toString(),
      Subject_Order : this.SelectedSubject.Subject_order.toString(),
    } 

    let formData = new FormData();

    formData.append("input_form",encryptUsingAES256(jsonin));

    formData.append('file', this.xlsxFile[0]);

    this.commonService.Post_formdata(uploadstudentsubjects,formData).subscribe(
      (response: {}) => {
        this.res = response;
        console.log(this.res)
        if (this.res.data == true) {
          this.globalmessage.Show_succesmessage('File Uploaded Successfully!');
          this.loader = false;
          this.viewFile();
          this.StudentSubjectForm.controls['upload'].reset();
        } else {
          this.globalmessage.Show_error(this.res.exception);
          this.loader = false;
          this.StudentSubjectForm.controls['upload'].reset();
        }
      }
    );
  }

  viewFile() {
    this.viewloader = true;
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.BatchCode2,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
      subjectorder: this.SelectedSubject.Subject_order,
      useraadhaar: this.oSession.aadhaar,
    };
    console.log('data', jsonin);
    this.commonService.Post_json(viewstudentsubjects,jsonin).subscribe(
      (response) => {
        this.res = response;
        this.gridOptions.api.setRowData(this.res.data);
        this.rowss = this.res.data;
        this.viewloader = false;
      }
    );
  }

  DeleteSuccessDialog() {
    this.Deleteloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
      studentsubject_id: this.Studentsubject_id,
    };
    if (this.Studentsubject_id == null) {
      // this.dialogService.open({ message: 'Please Select Row!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Row!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      console.log('data', jsonin);
      this.commonService.Post_json(deletestudentsubjects,jsonin).subscribe(
        (response) => {
          this.res = response;
          if (this.res.data == true) {
            // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', })
            Swal.fire({
              title: 'Success!',
              text: 'Deleted Successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }); //alert

            this.Deleteloader = false;
            this.refreshGrid();
          } else {
            // this.dialogService.open({ message: this.res.message, positive: 'Ok', })
            Swal.fire({
              title: 'Error!',
              text: this.res.exception,
              icon: 'error',
              confirmButtonText: 'OK',
            }); //alert

            this.Deleteloader = false;
          }
        }
      );
    }
  }

  refreshGrid() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.BatchCode2,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
      subjectorder: this.SelectedSubject.Subject_order,
      useraadhaar: this.oSession.aadhaar,
    };
    console.log('data', jsonin);
    this.commonService.Post_json(viewstudentsubjects,jsonin).subscribe(
      (response) => {
        this.res = response;
        this.gridOptions.api.setRowData(this.res.data);
        this.rowss = this.res.data;
      }
    );
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/student-subject']);
    });
  }

  DeleteStudentSubject() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
      useraadhaar: this.oSession.aadhaar,
      batchcode: this.BatchCode2,
      semester: this.SelectedBatSemester.Semester,
      subject_order: this.SelectedSubject.Subject_order,
    };
    console.log('data', jsonin);
    this.commonService.Post_json(deleteallstudentsubjects,
      jsonin
    ).subscribe((response) => {
      this.res = response;
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'Data Deleted Successfully!', positive: 'Ok', });
        Swal.fire({
          title: 'Success!',
          text: 'Data Deleted Successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        // this.dialogService.open({ message: 'Failed to Delete!', positive: 'Ok', }),
        //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
        Swal.fire({
          title: 'Error!',
          text: this.res.exception,
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      }
    });
  }

  ///AutoComplete
  BatchCode: any;
  BatchCode2: any;
  Batchkeyword = 'Batch_Name';
  Batchkeyword2 = 'Batch_Name';

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
    this.GetSemesterApiDownload();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }

  selectBatch2(bat2: any) {
    this.BatchCode2 = bat2.Batch_Code;
    this.GetBatchSemesterApi();
  }

  onChangeSearch2(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused2(e: any) {
    // console.log("focused", e)
    // do something
  }
}
