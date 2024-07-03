import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {
  batchsemester,
  batchuserexam,
  deletesinglerowtemplate,
  deletetemplate,
  exceldownloadtemplate, exceluploadtemplate,
  updatesinglerowtemplate
} from '../../globals/global-api'
import { base64StringToBlob } from 'blob-util';
import { DeleteCellCustomComponent } from '../delete-cellcustom/delete-cellcustom.component';
import {GlobalMessage} from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {ISemester, ISubjectName_json} from "../../models/response";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.scss'],
})
export class UploadTemplateComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  Downloadloader = false;
  uploadclicked = false;
  xlsxFile!: Array<File>;
  formData = new FormData();
  UploadTemplateForm!: FormGroup;
  DownloadUploadForm!: FormGroup;
  DeleteTemplateForm!: FormGroup;
  res: any;
  Batch_Code: any;
  Batchs: any;
  delete: any;
  updatedata: any;
  viewfile: any;
  loader: any;
  SelectedSubject: any;
  viewsubject: any;
  Subject_group_code: any;
  SelectedBatch: any;
  SelectedSemester: any;
  SelectedPaperCode: any;
  SelectedExam: any;
  papercode: any;
  papertype: any;
  semester: any;
  Semesters: any;

  UserExam: any;
  userexam: any;
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
  config_id: any;
  slabid: any;
  deletetemp: any;
  namesubject!: ISemester[];
  SelectedUserExam!: ISemester;

  oSession!: Sessiondata;

  constructor(private router: Router,
              private globalmessage:GlobalMessage,
              private formBuilder: FormBuilder,
              private commonService: CommonService, private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }



  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();



    this.GetBatchApi();

    this.DeleteTemplateForm = new FormGroup({
      'userexam': new FormControl('', Validators.required),
      'batchname': new FormControl('', Validators.required),
    })

    this.UploadTemplateForm = new FormGroup({
      'userexam': new FormControl('', Validators.required),
    })

    this.DownloadUploadForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    })
  }

  //Grid column
  columnDefs = [
    { headerName: "Config_id", field: "Config_id", resizable: true, },
    { headerName: "Subject Name", field: "Subject_name", resizable: true, },
    { headerName: "Subject Short", field: "Subject_short", resizable: true, },
    { headerName: "Subject Order", field: "Subject_order", resizable: true, },
    { headerName: "Paper code", field: "Papercode", resizable: true },
    { headerName: "Exam code", field: "Examcode", resizable: true },
    { headerName: "Credit Points", field: "Credit_points", resizable: true, editable: true, },
    { headerName: "Min Marks", field: "Min_marks", resizable: true, editable: true, },
    { headerName: "Max Marks", field: "Max_marks", resizable: true, editable: true, },
    { headerName: "Exam Name", field: "Examname", resizable: true, editable: true, },
    { headerName: "Slabid", field: "Slabid", resizable: true, editable: true, },
    { headerName: "Batchexamid", field: "Batchexamid", resizable: true, editable: true, },
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    { headerName: 'Update', field: 'Action', cellRendererFramework: CellCustomComponent },
    { headerName: 'Delete', field: 'Action', cellRendererFramework: DeleteCellCustomComponent },
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

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event:any) {
    this.config_id = event.data.Config_id;
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
    this.slabid = event.data.Slabid;
    // this.DeleteData(event);

  }
  onSelectionChanged(event:any) {
  }



  //Batch
  GetBatchApi() { //Batch select list displaying
    this.commonService.getBatches().subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found!', icon: 'error', confirmButtonText: 'OK' })//alert
      } else {
        this.Batchs = response['data'];
      }
    })
  }

  //semester
  GetSemesterApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(batchsemester,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found!', icon: 'error', confirmButtonText: 'OK' })//alert
      } else {
        this.Semesters = response['data'];
      }
    })
  }

  GetUserExamApi() { //semester select list displaying
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(batchuserexam,jsonin).subscribe((response: any) => {
      if (response == null) {
        Swal.fire({ title: 'Error!', text: 'No data found!', icon: 'error', confirmButtonText: 'OK' })//alert
      }
        this.namesubject = response['data'];
    })
  }

  //when Batch is Selected
  onChangeBatchSelect() {
    this.GetSemesterApi();
  }

  //when subject is Selected
  onChangeSubjectSelect() {
    // this.GetPaperCodeApi();
  }

  //when semester is Selected
  onChangeSemesterSelect() {
  }

  onChangeExamSelect() {
  }

  onChangeUserExamSelect() {
  }

  //download File
  OnDownloadFile() {
    this.Downloadloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      // "subject_group_code": this.SelectedSubject.Subject_group_code,
      "semester": this.SelectedUserExam.Semester,
      "batchexam_id": this.SelectedUserExam.Batchexam_id,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(exceldownloadtemplate,jsonin).subscribe(response => {
      this.res = response;
      this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
      //const byteArray = atob( this.res.blobdata);
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);

      let blob = new Blob([blobb], { type: 'application/blob' });

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.Downloadloader = false;

    })
  }


  //Upload File
  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    if (this.xlsxFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.xlsxFile[0].size < 2400000) {
    }
    else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({ title: 'Error!', text: 'Only .xlsx file allowed!', icon: 'error', confirmButtonText: 'OK' })//alert
    }
  }

  Uploadfile() {

    if (this.xlsxFile == null){
      this.globalmessage.Show_error("File not selected ");
      return;
    }

    this.loader = true;



    let jsonin = {
      College_code : this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar,
      Batch_code : this.BatchCode,
      Semester : this.SelectedUserExam.Semester,
      Batchexam_id : this.SelectedUserExam.Batchexam_id
    }

    
     let formData = new FormData();

     formData.append("input_form",encryptUsingAES256(jsonin));
      formData.append("file", this.xlsxFile[0]);

    this.commonService.Post_formdata(exceluploadtemplate,formData).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
        Swal.fire({ title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK' })//alert
        this.loader = false;
        this.GridData();
        this.DownloadUploadForm.reset();
        // this.UploadTemplateForm.controls["Subject_Name"].reset();
        // this.uploadclicked = false;
      }
      else {
        // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
        //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
        Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

        this.loader = false;
        // this.uploadclicked = false;
        //  this.reset();
      }
      //  this.onSubmit();
    })
  }



  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/upload-template"]);
    });
  }

  //Delete button
  DeleteSuccessDialog() {
    let jsonin = {
      "config_id": this.config_id,
      "useraadhaar": this.oSession.aadhaar,
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
    }
    if (this.config_id == null) {
      // this.dialogService.open({ message: 'Please select Row!', positive: 'Ok', });
      Swal.fire({ title: 'Error!', text: 'Please select Row!', icon: 'error', confirmButtonText: 'OK' })//alert

    }
    else {
      this.commonService.Post_json(deletesinglerowtemplate,jsonin).subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', });
          Swal.fire({ title: 'Success!', text: 'Deleted Successfully!', icon: 'success', confirmButtonText: 'OK' })//alert

          // this.OnDownloadFile();
        }
        else {
          // this.dialogService.open({ message: 'Failed to Delete!', positive: 'Ok', }),
          //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
          Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

        }
      })
    }
  }

  //update Button
  modal() {
    let jsonin = {
      "config_id": parseInt(this.config_id),
      "credit_points": parseInt(this.CreditPoints),
      "min_marks": parseInt(this.MinMarks),
      "max_marks": parseInt(this.MaxMarks),
      "slabid": parseInt(this.slabid),
      "useraadhaar": this.oSession.aadhaar
    }
    if (this.CreditPoints == null) {
      // this.dialogService.open({ message: 'Please select Row!', positive: 'Ok', });
      Swal.fire({ title: 'Error!', text: 'Please select Row!', icon: 'error', confirmButtonText: 'OK' })//alert

    }
    else {
      this.commonService.Post_json(updatesinglerowtemplate,jsonin).subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Data Updated Successfully!', positive: 'Ok', });
          Swal.fire({ title: 'Success!', text: 'Data updated Successfully!', icon: 'success', confirmButtonText: 'OK' })//alert
          // this.OnDownloadFile();
        }
        else {
          // this.dialogService.open({ message: 'Failed to Update!', positive: 'Ok', }),
          //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
          Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

        }
      })
    }
  }

  GridData() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "semester": this.SelectedUserExam.Semester,
      "batchexam_id": this.SelectedUserExam.Batchexam_id,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(exceldownloadtemplate,jsonin).subscribe(response => {
      this.res = response;
      this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
    })
  }

  resetdelete() {
    this.DeleteTemplateForm.reset();
  }

  OnDelete() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batchexam_id": this.SelectedUserExam.Batchexam_id,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(deletetemplate,jsonin).subscribe(response => {
      this.res = response;
      if (this.res.data == true) {
        Swal.fire({ title: 'Success!', text: 'Data Deleted Successfully!', icon: 'success', confirmButtonText: 'OK' })//alert

      }
      else {
        Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

      }
    })
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code
    this.GetUserExamApi();
  }

  onChangeSearch(search: string) {
  }

  onFocused(e: any) {
    // do something
  }


}
