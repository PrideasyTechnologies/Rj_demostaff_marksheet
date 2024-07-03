import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';
import * as myGlobals from '../../globals/global-variable';

import Swal from 'sweetalert2';
import {printmarksheet, studentsmarksheetlistall} from '../../globals/global-api'
import { base64StringToBlob } from 'blob-util';
import {CommonService} from "../../globals/common.service";
import {ISemester, ISubjectName_json} from "../../models/response";
import {GlobalMessage} from "../../globals/global.message";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";


type MyArrayType = Array<{ id: number, name: string }>;
@Component({
  selector: 'app-course-marks',
  templateUrl: './marksheetdownload.html',
  styleUrls: ['./marksheetdownload.scss'],
})
export class MarksheetdownloadComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  savealert: boolean = false;
  showloader = false;
  viewloader = false;
  formData = new FormData();
  MarksheetViewForm!: FormGroup;
  xlsxFile!: Array<File>;
  error: any;
  res: any;
  Batch_Code: any;
  downloadfile: any;
  exam: any;
  StudentAadhaar: any;
  Batchs: any;
  SelectedSubject: any;
  viewsubject: any;
  SelectedBatch: any;
  SelectedSemester: any;
  zoom: number = 1.0;
  pageVariable: number = 1;
  Semester: any;
  Batchexam_id: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  showGridbox = true;
  showpdfbox = true;

  selected_edit_batch_type: any;
  edit_batchtype_outside: any;

  out_rowselected: any;

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

  incrementZoom(amount: number) {
    this.zoom += amount;
  }
  //
  // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  // CollegeCode = parseInt(sessionStorage.getItem('College')!);
  // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
  // AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    this.MarksheetViewForm = new FormGroup({
      // 'Batch_Name': new FormControl('', Validators.required),
      'aadhaar':        new FormControl('', Validators.required),
      'edit_batchtype': new FormControl('', Validators.required),
    })
  }

  //Grid column
  columnData = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Batch_name',
      minWidth: 600,
      field: 'Batch_name',
      resizable: true,
    },
    {
      headerName: 'Exam Name',
      minWidth: 400,
      field: 'Userexamname',
      resizable: true,
    },
    // { headerName: "Semester", field: "Semester", resizable: true },
  ];

  //Grid Rows

  rowData: any;

  public rowSelection: 'single' | 'multiple' = 'single';


  //pagination page size

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  OpenPdfDoc(selectedrow: any) {
    //cell component button click
    console.log('cell', selectedrow);
    this.Batch_Code = selectedrow.Batch_code;
    this.Semester = selectedrow.Semester;
    this.Batchexam_id = selectedrow.Batchexam_id;

    this.showpdfbox = true;
    this.showGridbox = false;
    this.ShowPDF();
  }

  ClosePdf() {
    this.showpdfbox = false;
    this.showGridbox = true;
  }

  pdfSrc = this._base64ToArrayBuffer('');

  _base64ToArrayBuffer(base64:any) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }



  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  batchtype_edit_outside_detail: MyArrayType = [
    {id: 1, name: 'UG'},
    {id: 2, name: 'PG'},
    {id: 3, name: 'SF'},
  ]

  onRowSelectedEvent(event: any) {
    // console.log("row event:", event.data);
  }


  onSelectionChanged(event: any) {
    // const selectedRows = this.gridApi.getSelectedRows();
    // console.log('Selection change data:', selectedRows);

    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
  }

  ShowMarksheet() {
    this.showloader = true;

    let nBatchtype = this.selected_edit_batch_type.name;

    if(nBatchtype == 'UG' || 'SF' ){
      this.selected_edit_batch_type.name = 'UG'
    }

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      aadhaar: this.MarksheetViewForm.controls['aadhaar'].value,
      template: nBatchtype,
    };

    this.commonService.Post_json(studentsmarksheetlistall,jsonin)
      .subscribe((response) => {
        this.res = response;
        console.log('Data :', this.res);
        if (this.res != null) {
          console.log('Data :', this.res);
          //this.rowData = this.res.data;
          this.gridOptions.api.setRowData(this.res.data);
          this.showloader= false;
        }
      });
  }

  onChangeBatchtypeEdit_Select(index: any) {
    this.selected_edit_batch_type = this.batchtype_edit_outside_detail[index]
  }

  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message('Delete');
  }

  ShowPDF() {
    this.viewloader = true;
    this.showpdfbox = true ;
    let str_out_rowselected = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(str_out_rowselected);

    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.MarksheetViewForm.controls['aadhaar'].value,
      useraadhaar: this.oSession.aadhaar,
      template: this.selected_edit_batch_type.name,
      batch_code: parseInt(jsonObj[0].Batch_code),
      semester: parseInt(jsonObj[0].Semester),
      batchexam_id: parseInt(jsonObj[0].Batchexam_id),
      Singlepdf: false,
    };

      this.commonService.Post_json(printmarksheet,jsonin).subscribe(
        (response) => {
            const contentType = '';
            console.log('kkkkk', response)
            this.pdfSrc = this._base64ToArrayBuffer(response.blobdata);
          this.viewloader =false;

          },

          (error) => {
            if (error.error !== null) {
              // console.error('error caught in component', error)
              // Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
            } else {
              // Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
            }
        }

      );
  }

  ///AutoComplete


}
