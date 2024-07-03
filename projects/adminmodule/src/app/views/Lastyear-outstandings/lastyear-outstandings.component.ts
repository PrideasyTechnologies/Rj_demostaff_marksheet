import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ITableData, LastYearOutstandingsService} from './lastyear-outstandings.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {GetAllBatchs, UpdateLastyearOutstanding, UpdateLastYearStudents} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-lastyear-outstandings',
  templateUrl: './lastyear-outstandings.component.html',
  styleUrls: ['./lastyear-outstandings.component.scss'],
  providers: [LastYearOutstandingsService],
})


export class LastYearOutstandingsComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  date: any;
  students: any;
  editCellData: any;
  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  OutsideStandingForm!: FormGroup;
  res: any;
  Outstanding: any;
  Lastyear_id: any;
  StudentAadhaar: any;
  ID: any;
  Batchs = [];
  SelectedBatch: any;
  update: any;
  Deletecell: any;

  oSession!: Sessiondata;

  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(private router: Router, private commonService: CommanService,
              private outstandingService: LastYearOutstandingsService,
              private globalmessage: GlobalMessage, private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.RefreshOutstanding();
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }


  ngOnInit(): void {
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.openYesNoDialog();
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetBatchApi();


    // this.OutsideStandingForm = new FormGroup({

    //   'batchcode': new FormControl('', Validators.required),
    // })

  }

  RefreshOutstanding() {
    let jsonin = {
      'batchcode': -99,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
    };
    // console.log(this.students);
    this.commonService.Post_json(UpdateLastyearOutstanding,jsonin).subscribe((response) => {
      if (response != null) {
        //this.res = models;
        //this.res = this.res.data;
        this.gridOptions.api.setRowData(response.data);
        //this.gridApi.setRowData(this.res.data);
        this.rowss = this.res;
      }
    });
  }

  showloader = false;
  ShowOutstanding() {
    // this.students = this.OutsideStandingForm.value;
    let jsonin = {
      // "batchcode": this.SelectedBatch.Batch_Code
      'batchcode': this.BatchCode,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
    };
    // console.log(this.students);
    this.showloader = true;
    this.commonService.Post_json(UpdateLastyearOutstanding,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.res = this.res.data;
      this.rowss = this.res;
      this.showloader = false;
      // console.log(this.res);
      // console.log(this.students);
    });


  }

  //Grid column

  columnDefs = [

    // { headerName: "Lastyear ID", field: 'Lastyear_id', resizable: true, editable: true },
    {headerName: 'Batch Name', field: 'Batch_name', resizable: true},
    {headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true, editable: true},
    // { headerName: "Aadhaar", field: 'UAadhaar', resizable: true, editable: true },
    {headerName: 'MobileNo', field: 'MobileNo', maxWidth: 120, resizable: true, editable: true},
    {headerName: 'FullName', field: 'FullName', resizable: true, editable: true},
    {headerName: 'Subject GroupCode', field: 'Subject_group_code', maxWidth: 120, resizable: true, editable: true},
    {
      headerName: 'Outstanding',
      field: 'Outstanding',
      maxWidth: 120,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      editable: true
    },
    {
      field: 'Select',
      maxWidth: 50, checkboxSelection: true
    },
    {headerName: 'Action', field: 'Action', cellRenderer: EditCellCustomComponent},
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

  Subject_group_code: any;

  onRowSelectedEvent(event: any) {
    // console.log("event",event.data)
    this.editCellData = event.data;
    this.Outstanding = event.data.Outstanding,
      this.Lastyear_id = event.data.Lastyear_id,
      this.StudentAadhaar = event.data.Aadhaar,
      this.ID = event.data.ID,
      this.Subject_group_code = event.data.Subject_group_code;

  }

  onSelectionChanged(event: any) {
  }


  EditCell() {
    // this.update = this.editCellData;
    // // console.log("edit", this.OutsideStandingForm.value);
    // console.log("editcell", this.update);
    // // if (this.ID == null) {
    // //   alert("please select row to edit");
    // // }
    // // else {

    let jsonin = {
      'collegecode': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      // "batchCode": this.SelectedBatch.Batch_Code,
      'batchCode': this.BatchCode,
      'outstanding': parseInt(this.Outstanding),
      'lastyear_id': this.Lastyear_id,
      'aadhaar': parseInt(this.StudentAadhaar),
      'subject_group_code': this.Subject_group_code
    };
    // console.log("update", this.update);
    this.commonService.Post_json(UpdateLastYearStudents,jsonin).subscribe((response: {}) => {
      this.res = response;
      // console.log("updated models", this.res);

      if (this.res.data == true) {
        this.ShowOutstanding;
        this.UpdatedDialog();
        // this.CurrentUrlNavigation();
      } else {
        this.FailedResponseDialog();
      }
    });
  }

  // CurrentUrlNavigation() {
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl]);
  //   });
  // }

  GetBatchApi() {

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];

      }
    });
  }

  onChangeBatchSelect() {
    // console.log(this.SelectedBatch.Batch_Code);

  }


  openYesNoDialog() {

    // this.dialogService.open(
    //   {
    //     title: 'Delete',
    //     message: 'Please Login',
    //     positive: 'Ok',
    //     // negative: 'Cancel',
    //     // neutral: 'Not sure'
    //   })
    //   .then(result => {
    //     // console.log(result);
    //   }, () => {
    //   });
  }

  UpdatedDialog() {

    // this.dialogService.open(
    //   {
    //     title: 'updated',
    //     message: '1 row Updated Successfully!...',
    //     positive: 'Ok',
    //     // negative: 'Cancel',
    //     // neutral: 'Not sure'
    //   })
    //   .then(result => {
    //     console.log(result);
    //   }, () => {
    //   });
   }

  FailedResponseDialog() {

    // this.dialogService.open(
    //   {
    //     title: '',
    //     message: 'Failed to Update! ',
    //     positive: 'Ok',
    //     // negative: 'Cancel',
    //     // neutral: 'Not sure'
    //   })
    //   .then(result => {
    //     console.log(result);
    //   }, () => {
    //   });
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
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
