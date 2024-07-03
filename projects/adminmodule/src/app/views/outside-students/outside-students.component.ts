import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OutsideStudentsService, ITableData } from './outside-students.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {GetAllBatchs, OutsideStudents} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';


@Component({
  selector: 'app-outside-students',
  templateUrl: './outside-students.component.html',
  styleUrls: ['./outside-students.component.scss'],
  providers: [OutsideStudentsService],
})


export class OutsideStudentsComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;

  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  OutsideStudentsForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch: any;

  oSession!: Sessiondata;

  constructor(private router: Router,private commonService: CommanService,
              private outsidestudentsService: OutsideStudentsService,
              private globalmessage: GlobalMessage, private formBuilder: FormBuilder,private sessionService : SessionService
            ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }
  

  ngOnInit(): void {
    this.OutsideStudents();
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   // this.openYesNoDialog();
    //   this.router.navigate(['login']);
    // }
    // else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetBatchApi();

    this.OutsideStudentsForm = new FormGroup({
      // 'batchcode': new FormControl('', Validators.required),
      'fromdate': new FormControl('', Validators.required),
    })
  }

  OutsideStudents() {
    let jsonin = {
      "batchcode": -99,
      "finyear": this.oSession.finyear,
      "collegecode": this.oSession.collegecode
      // "fromdate": this.OutsideStudentsForm.controls['fromdate'].value
    }
    // console.log(this.students);
    this.commonService.Post_json(OutsideStudents,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.res = this.res.data;
      this.gridApi.setRowData(this.res.data);
      this.rowss = this.res;
      // console.log(this.res);
      // console.log(this.students);
    })
  }

  showloader = false;
  ShowStudents() {
    this.showloader = true;
    let jsonin = {
      // "batchcode": this.SelectedBatch.Batch_Code,
      "batchcode": this.BatchCode,
      "finyear": this.oSession.finyear,
      "collegecode": this.oSession.collegecode,
      "fromdate": this.OutsideStudentsForm.controls['fromdate'].value,
    }
    // console.log(this.students);
    this.commonService.Post_json(OutsideStudents,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.res = this.res.data;
      this.rowss = this.res;
      this.showloader = false;
      // console.log(this.res);
      // console.log(this.students);
    })
  }
  //Grid column

  columnDefs = [
    // {
    //   field: '',
    //   maxWidth: 50, checkboxSelection: true
    // },

    { headerName: "Aadhaar No.", field: "Aadhaar", resizable: true },
    { headerName: "First Name", field: "FirstName", resizable: true },
    { headerName: "Last Name", field: "LastName", resizable: true },
    { headerName: "Father's Name", field: "FatherName", resizable: true },
    { headerName: "Mother's Name", field: "MotherName", resizable: true },
    { headerName: "Mobile Number", field: "Mobilenumber", resizable: true },
    { headerName: "Gender", field: "Gender", resizable: true },
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
  onRowSelectedEvent(event: any) {

  }
  onSelectionChanged(event: any) { }

  public rowSelection: 'single' | 'multiple' = 'single';

  GetBatchApi() {

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert("No data found");
      }
      else {
        this.Batchs = response['data'];

      }
    })
  }

  onChangeBatchSelect() {
    // console.log(this.SelectedBatch.Batch_Code);

  }



  // openYesNoDialog() {
  //
  //   this.dialogService.open(
  //     {
  //       title: 'Delete',
  //       message: 'Please Login',
  //       positive: 'Ok',
  //       // negative: 'Cancel',
  //       // neutral: 'Not sure'
  //     })
  //     .then(result => {
  //     }, () => { });
  // }


  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code
    // do something with selected item
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
