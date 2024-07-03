import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {
    batchsemesterexamsubjects,
    batchuserexam, deletecoursemarks,
    downloadcoursemarks,
    DownloadExcel, editcoursemarks,
    exams, uploadcoursemarks
} from '../../globals/global-api'
import { base64StringToBlob } from 'blob-util';
import { DeleteCellCustomComponent } from '../delete-cellcustom/delete-cellcustom.component';
import { EditCellCustomComponent } from '../editcell-custom/editcell-custom.component';
import {CommonService} from "../../globals/common.service";
import {Ires_downloadcoursemarks, ISemester} from "../../models/response";
import {GlobalMessage} from "../../globals/global.message";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

@Component({
  selector: 'app-course-marks',
  templateUrl: './course-marks.component.html',
  styleUrls: ['./course-marks.component.scss'],
})
export class CourseMarksComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  savealert: boolean = false;
  downloadloader = false;
  uploadloader = false;
  viewloader = false;
  formData = new FormData();
  CourseMarksForm!: FormGroup;
  xlsxFile!: Array<File>;
  DownloadUploadForm!: FormGroup;
  DeleteCourseMarksForm!: FormGroup;
  DeleteaadhaarForm!: FormGroup;
  error: any;
  res: any;
  Batch_Code: any;
  filename: any;
  downloadfile: any;
  DownloadUrl: any;
  viewfile: any;
  loader: any;
  SubjectName: any;
  exam: any;
  updatedata: any;
  StudentAadhaar: any;
  StudentMarks: any;
  StudentPresentAbsent: any;
  Batchs: any;
  SelectedSubject: any;
  viewsubject: any;
  Subject_group_code: any;
  SelectedBatch: any;

  SelectedPaperCode: any;
  SelectedSemExam: any;
  SelectedSemSubjects: any;
  SelectedPaperType: any;
  papercode: any;
  papertype: any;
  semester: any;
  Semesters: any;
  PaperCodes: any;
  PaperTypes: any;
  Exam: any;
  deletemarks: any;
  Other_Id: any;
  CourseName: any;

    BatchCode: any;
    Batchkeyword = 'Batch_Name';

  CreditPoints: any;
  namesubject!: ISemester[];
  SelectedSemester!: ISemester;

  selectedobject!:Ires_downloadcoursemarks;

    oSession!: Sessiondata;

  constructor(private router: Router,private sessionservice : SessionService,
              private formBuilder: FormBuilder,private globalmessage: GlobalMessage,
              private commonService: CommonService
              ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }

  // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  // CollegeCode = parseInt(sessionStorage.getItem('College')!);
  // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);

  ngOnInit(): void {

      this.oSession = new Sessiondata(this.sessionservice)
      this.oSession.Getdatafromstroage();

    this.GetBatchApi();

    this.CourseMarksForm = new FormGroup({
      // 'Batch_Name': new FormControl('', Validators.required),
      'Semester_Name': new FormControl('', Validators.required),
    })

    this.DownloadUploadForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    })
  }

  //Grid column
 columnDefs = [
    { headerName: "Aadhaar", field: "Aadhaar", resizable: true, filter:true },
    { headerName: "Course Name", field: 'Coursename', resizable: true,editable: true  },
    { headerName: "Credit Earned", field: "Creditearned", resizable: true,editable: true  },
    { headerName: "Semester", field: "Semester", resizable: true, editable: true },
    // { headerName: "Other Id", field: "Other_Id", resizable: true, editable: true },
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    { headerName: 'Update', field: 'Action', maxWidth: 80, cellRenderer: EditCellCustomComponent },
    { headerName: 'Delete', field: 'Action', maxWidth: 80, cellRenderer: DeleteCellCustomComponent },
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
    console.log("row event:", event.data);
    this.Other_Id = event.data.Other_id;
    this.CourseName = event.data.Coursename;
    this.CreditPoints = event.data.Creditearned;
  }

  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedRows();
    this.selectedobject = selected_outnode[0];

  }


  //Delete
  DeleteSuccessDialog() {

    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batchexam_id": this.SelectedSemester.Batchexam_id,
      "useraadhaar": this.oSession.aadhaar,
      "other_id": this.selectedobject.Other_id
    }

    console.log('deletejson',jsonin)

    this.commonService.Post_json(deletecoursemarks,jsonin).subscribe(response => {
      this.res = response;
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'Data Deleted Successfully!', positive: 'Ok', });
        Swal.fire({ title: 'Success!', text: "Data Deleted Successfully!", icon: 'success', confirmButtonText: 'OK' })//alert
        this.GridData();
      }
      else {
        console.log("response:", this.res)
        Swal.fire({ title: 'Server Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert
        this.GridData();
      }
    })
  }

  //update Button
  EditCell() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "useraadhaar": this.oSession.aadhaar,
      "Other_id": this.selectedobject.Other_id,
      "coursename": this.selectedobject.Coursename,
      "creditpoints": this.selectedobject.Creditearned
    }

    console.log("data",jsonin);

    this.commonService.Post_json(editcoursemarks,jsonin).subscribe((response: {}) => {
      this.res = response;
      // console.log("updated",this.updatedata);
      if (this.res.data == true) {
        Swal.fire({ title: 'Success!', text: "Data Updated Successfully!", icon: 'success', confirmButtonText: 'OK' })//alert
        this.GridData();
      }
      else {
        Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert
        this.GridData();
      }
    })
  }

  //Batch
  GetBatchApi() { //Batch select list displaying
    this.commonService.getBatches().subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found! Please Configure CourseMarks..', icon: 'error', confirmButtonText: 'OK' })//alert

      }
      else {
        this.Batchs = response['data'];
      }
    })
  }

  //batchuserexam
  GetSemesterApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar
    }


    this.commonService.Post_json(batchuserexam,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found! Please Configure CourseMarks..', icon: 'error', confirmButtonText: 'OK' })//alert

      }
      else {
        this.namesubject = response['data'];
      }
    })
  }

  //Exam
  GetSemExamApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "semester": this.SelectedSemester.Semester,
    }

      // let input_json = {
      //     Input: encryptUsingAES256(jsonin)
      // };

    this.commonService.Post_json(exams,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found! Please Configure CourseMarks..', icon: 'error', confirmButtonText: 'OK' })//alert

      }
      else {
        this.Exam = response['data'];
      }
    })
  }

  //ExamSubjectName
  GetExamSubjectApi() {
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "semester": this.SelectedSemester.Semester,
      "batchexam_id": this.SelectedSemester.Batchexam_id,
      "examcode": this.SelectedSemExam.Examcode
    }



    this.commonService.Post_json(batchsemesterexamsubjects,jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({ title: 'Error!', text: 'No data found! Please Configure CourseMarks..', icon: 'error', confirmButtonText: 'OK' })//alert

      }
      else {
        this.SubjectName = response['data'];
      }
    })
  }

  //when Batch is Selected
  onChangeBatchSelect() {
    this.GetSemesterApi();
  }
  //semester select
  onChangeSemesterSelect() {
    this.GetSemExamApi();
  }

  //when exam is Selected
  onChangeSemExamSelect() {
    this.GetExamSubjectApi();
  }

  //download File
  OnDownloadFile() {
    this.downloadloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      "useraadhaar": this.oSession.aadhaar,
      "batchexam_id": this.SelectedSemester.Batchexam_id,
    }

      

    console.log("data", jsonin);
    this.commonService.Post_json(downloadcoursemarks,jsonin).subscribe(response => {
      this.res = response;
      this.gridOptions.api.setRowData(this.res.data);
      console.log("response", this.res);
      this.rowss = this.res.data;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], { type: 'application/blob' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.downloadloader = false;
      console.log("downloadURL", downloadURL);
    })
  }

  //Upload File
  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (this.xlsxFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.xlsxFile[0].size < 2400000) {
    }
    else {
      Swal.fire({ title: 'Error!', text: 'Only .xlsx file allowed!', icon: 'error', confirmButtonText: 'OK' })//alert

      this.resetAll();
    }
  }

  uploadfile() {
    
    if (this.xlsxFile[0] == null){
      this.globalmessage.Show_error("File not selected ");
      return;
    }


    this.uploadloader = true;

    let jsonin = {
    "college_code": this.oSession.collegecode,
    "finyear": this.oSession.finyear,
    "useraadhaar":this.oSession.aadhaar,
    // this.formData.append("batch_code", this.BatchCode);
    // this.formData.append("semester", this.SelectedSemester.Semester);
    "batchexam_id":this.SelectedSemester.Batchexam_id
  };

  
      let formdata = new FormData();
      formdata.append('input_form', encryptUsingAES256(jsonin))
      formdata.append('file', this.xlsxFile[0])


    this.commonService.Post_formdata(uploadcoursemarks,formdata).subscribe((response: {}) => {
      this.res = response;
      console.log("My Response ", this.res);
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
        Swal.fire({ title: 'Success!', text: "File Uploaded Successfully!", icon: 'success', confirmButtonText: 'OK' })//alert

        this.GridData();
        this.uploadloader = false;
        this.DownloadUploadForm.reset();
        // this.CourseMarksForm.controls["SubjectName"].reset()
      }
      else {
        console.log("response:", this.res)
        Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'success', confirmButtonText: 'OK' })//alert

        this.uploadloader = false;
      }
    })
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/course-marks"]);
    });

  }

  GridData() {
    this.viewloader = true;
    let jsonin = {
      "college_code": this.oSession.collegecode,
      "finyear": this.oSession.finyear,
      // "batch_code": this.BatchCode,
      "useraadhaar": this.oSession.aadhaar,
      "batchexam_id": this.SelectedSemester.Batchexam_id,
      // "examtype": ""
    }


    this.commonService.Post_json(downloadcoursemarks,jsonin).subscribe(response => {
      this.res = response;
        this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
      this.viewloader = false;
    },
      (error) => {
        if (error.error !== null) {
          Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
        }
        else {
          Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

        }
        // this.resetAll();
        console.log("error")
      })
  }

  resetDelete() {
    this.DeleteCourseMarksForm.reset();
  }


  ///AutoComplete


  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code
    // do something with selected item
    this.GetSemesterApi();
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
