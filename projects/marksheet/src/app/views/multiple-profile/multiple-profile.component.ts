import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {CellCustomComponent} from '../cell-custom/cell-custom.component';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {GlobalMessage} from '../../globals/global.message';
import {UDownloadfiles} from '../../globals/global_downloadfiles';
import {CommonService} from "../../globals/common.service";
import {
  batchsubjectgroup,
  exceldownloadstudents,
  exceluploadstudents,
  semester,
  updatesinglerowtemplate
} from "../../globals/global-api";
import {base64StringToBlob} from "blob-util";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-multiple-profile',
  templateUrl: './multiple-profile.component.html',
  styleUrls: ['./multiple-profile.component.scss'],
})
export class MultipleProfileComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  Batch_Code: any;
  MultipleProfileForm!: FormGroup;
  DownloadUploadForm!: FormGroup;
  Batchs: any;
  SelectedSubject: any;
  viewsubject: any;
  Subject_group_code: any;
  SelectedBatch: any;
  SelectedSemester: any;
  SelectedPaperCode: any;
  SelectedExam: any;
  StudentAadhaar: any;
  StudentMarks: any;
  StudentPresentAbsent: any;
  PaperType: any;
  PaperCode: any;
  PaperTypeCode: any;
  SubjectName: any;
  CreditPoints: any;
  MinMarks: any;
  MaxMarks: any;
  ExamDate: any;
  papercode: any;
  papertype: any;
  semester: any;
  Semesters: any;
  PaperCodes: any;
  PaperTypes: any;

  loader: any;
  uploadloader = false;

  viewfile: any;
  downloadloader = false;
  downloadclicked = false;

  oSession!: Sessiondata;

  //Grid column
  public columnDefs = [
    {headerName: 'Subject Short', field: 'Subject_short', resizable: true},
    {headerName: 'Subject Order', field: 'Subject_order', resizable: true},
    {headerName: 'Subject Name', field: 'Subject_name', resizable: true},
    {
      headerName: 'Credit Points',
      field: 'Credit_points',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'Min Marks',
      field: 'Min_marks',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'Max Marks',
      field: 'Max_marks',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'Exam Name',
      field: 'Examname',
      resizable: true,
      editable: true,
    },
    {
      headerName: 'Exam Date',
      field: 'Exam_date',
      resizable: true,
      editable: true,
    },
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Update',
      field: 'Action',
      maxWidth: 80,
      cellRendererFramework: CellCustomComponent,
    },
  ];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private globalmessage: GlobalMessage,
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


    this.Createform();
    this.GetBatchApi();

  }

  Createform() {
    this.MultipleProfileForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
    });
    this.DownloadUploadForm = new FormGroup({
      upload: new FormControl('', Validators.required),
    });
  }

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
    this.StudentMarks = event.data.Marks;
    this.StudentPresentAbsent = event.data.Present_absent;
    this.PaperType = event.data.Papertype;
    this.PaperCode = event.data.Papercode;
    this.PaperTypeCode = event.data.Papertypecode;
    this.SubjectName = event.data.Subject_name;
    this.CreditPoints = event.data.Credit_points;
    this.MinMarks = event.data.Min_marks;
    this.MaxMarks = event.data.Max_marks;
    this.ExamDate = event.data.Exam_date;
  }

  onSelectionChanged(event: any) {
    console.log(event);
  }

  //update Button
  updatedata: any;

  // modal() {
  //   let jsonin = {
  //     college_code: this.oSession.collegecode,
  //     finyear: this.oSession.finyear,
  //     batch_code: this.BatchCode,
  //     semester: this.SelectedSemester.Semester,
  //     subject_group_code: this.SelectedSubject.Subject_group_code,
  //     papercode: this.PaperCode,
  //     papertype: this.PaperType,
  //     papertypecode: this.PaperTypeCode,
  //     subject_name: this.SubjectName,
  //     credit_points: parseInt(this.CreditPoints),
  //     min_marks: parseInt(this.MinMarks),
  //     max_marks: parseInt(this.MaxMarks),
  //     exam_date: this.ExamDate,
  //     useraadhaar: this.oSession.aadhaar,
  //   };
  //   this.commonService.Post_json(updatesinglerowtemplate,jsonin)
  //     .subscribe((response) => {
  //       if (response == null) {
  //         return;
  //       }
  //       this.res = response;
  //       if (this.res.data == true) {
  //         this.globalmessage.Show_message('Data Updated Successfully!');
  //       } else {
  //         this.globalmessage.Show_message(this.res.exception);
  //       }
  //     });
  // }

  //Batch
  GetBatchApi() {
    this.commonService.getBatches().subscribe((response) => {
      if (response == null) {
        return;
      }
      if (response['data'] == '' || response['data'] == null) {
        this.globalmessage.Show_message('No data found!');
        return;
      }
      this.Batchs = response['data'];
    });
  }

  //Subject'
  GetSubjectApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      semester: this.SelectedSemester.Semester,
    };
    this.commonService.Post_json(batchsubjectgroup,jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        if (response['data'] == '' || response['data'] == null) {
          this.globalmessage.Show_message('No data found!');
          return;
        }
        this.Subject_group_code = response['data'];
      });
  }

  //semester
  GetSemesterApi() {

    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

    console.log('inputaajson::',jsonin)
    this.commonService.Post_json(semester,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      if (response['data'] == '' || response['data'] == null) {
        this.globalmessage.Show_message('No data found!');
        return;
      }
      this.Semesters = response['data'];
    });
  }

  //when Batch is Selected
  

  //when subject is Selected
  onChangeSubjectSelect() {
    // this.GetPaperCodeApi();
  }

  //when semester is Selected
  onChangeSemesterSelect() {
    this.GetSubjectApi();
  }

  onChangeExamSelect() {
  }

  //download File


  OnDownloadFile() {
    if (this.BatchCode == null) {
      this.globalmessage.Show_error('Please Select Batch!');
      return;
    }

    this.downloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

    this.commonService.Post_json(exceldownloadstudents,jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.res = response;
        this.gridOptions.api.setRowData(this.res.data);
        UDownloadfiles(response.blobdata, response.excelfile)
        this.downloadloader = false;
        this.downloadclicked = false;
        // this.rowss = this.res.data;
        // const contentType = '';
        // const blobb = base64StringToBlob(this.res.blobdata, contentType);
        //
        // let blob = new Blob([blobb], { type: 'application/blob' });
        //
        // let downloadURL = window.URL.createObjectURL(blob);
        // let link = document.createElement('a');
        // link.href = downloadURL;
        // link.download = this.res.excelfile;
        // link.click();
        // this.downloadloader = false;
        // this.downloadclicked = false;

      });
  }

  //Upload File
  xlsxFile!: Array<File>;

  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (
      this.xlsxFile[0].type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.xlsxFile[0].size < 2400000
    ) {
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Only .xlsx file allowed!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    }
  }



  uploadfile() {

    if (this.BatchCode == null) {
      this.globalmessage.Show_error('Please Select Batch!');
      return;
    }

    if (this.xlsxFile.length <= 0){
      this.globalmessage.Show_error("File not selected ");
      return;
    }

   

    let jsonin = {
      college_code : this.oSession.collegecode,
      finyear : this.oSession.finyear,
      useraadhaar : this.oSession.aadhaar,
      batch_code : this.BatchCode
    }

    let formData = new FormData();


    formData.append("input_json",encryptUsingAES256(jsonin));

    formData.append('file', this.xlsxFile[0]);

    this.uploadloader = true;

    this.commonService
      .Post_formdata(exceluploadstudents,formData)
      .subscribe((response: {}) => {
        this.uploadloader = false;
        if (response == null) {
          return;
        }
        this.res = response;
        if (this.res.data == true) {
          this.globalmessage.Show_succesmessage('File Updated Successfully!');
          this.GridData();
          this.DownloadUploadForm.reset();
          return;
        } else {
          this.globalmessage.Show_error(this.res.exception);
        }
      });
    this.DownloadUploadForm.reset();
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/multiple-edit']);
    });
  }

  GridData() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService.Post_json(exceldownloadstudents,jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.res = response;
        this.gridOptions.api.setRowData(this.res.data);
        this.rowss = this.res.data;
      });
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    console.log('selecti')
   
    this.BatchCode = bat.Batch_Code;

    // this.GetSemesterApi();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }
}
