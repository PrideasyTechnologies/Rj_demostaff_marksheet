import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WebPortalService} from './web-portal.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {AgGridAngular} from 'ag-grid-angular';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {GetAllBatchs, IU_Webportal, Portallist} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import {Ires_Webportal} from "../../models/responsemodel";

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
  providers: [WebPortalService],
})


export class WebPortalComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  showMainContent: Boolean = true;
  showadd: Boolean = false;
  showupdate: Boolean = false;
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  data: any;
  searchValue: any;
  savealert: boolean = false;
  public filterQuery = '';
  submitted = false;
  WebPortalForm!: FormGroup;
  res: any;
  Batchs! : Ires_Webportal[];
  SelectedPortal: any;
  userlist: any;
  password: any;
  aadhaar: any;
  Name: any;
  StudentAadhaar: any;
  ID: any;
  User_Name: any;
  User_pwd: any;
  Userrole: any;
  update: any;

  Batch_codes: any;
  Startdatetime: any;
  Enddatetime: any;
  Createdby: any;
  Editedby: any;

  list: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  oSession!: Sessiondata;

  constructor(private router: Router,
              private webportalService: WebPortalService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,
              private commonService: CommanService,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }


  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetPortalApi();
      this.GridTableApi();


    this.WebPortalForm = new FormGroup({
      // 'webportal': new FormControl('', Validators.required),
      'fromdate': new FormControl('', Validators.required),
      'todate': new FormControl('', Validators.required),
      //   'UserRole': new FormControl('', Validators.required),

    });
  }

  OnUpdate() {

    // if (this.ID == null) {
    //   alert("please select row to edit");
    // }
    // else {
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': this.BatchCode,
      'startdatetime': this.WebPortalForm.controls['fromdate'].value,
      'enddatetime': this.WebPortalForm.controls['todate'].value,
      'useraadhaar': this.oSession.aadhaar
    };

    this.commonService.Post_json(IU_Webportal,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data.flag == 1) {
        this.GridTableApi();
        this.globalmessage.Show_message('Row Updated Successfully!...');
      } else {
        this.globalmessage.Show_message('Failed To Update!...');
      }

    });
  }

  GridTableApi() {//grid list
    let jsonin = {
      'collegecode': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      // "aadhaar": this.oSession.aadhaar,
      // "usertype":""
    };
    this.commonService.Post_json(Portallist,jsonin).subscribe((response: {}) => {
      this.res = response;
      //this.rowss = this.res.data;
      //this.gridOptions.api.setRowData(this.res.data);
      this.gridApi.setRowData(this.res.data);
    });
  }

  EditCell() {

    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': this.Batch_codes,
      'startdatetime': this.Startdatetime,
      'enddatetime': this.Enddatetime,
      'useraadhaar': this.oSession.aadhaar
    };

    this.commonService.Post_json(IU_Webportal,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data.flag == 1) {
        this.GridTableApi();
        this.globalmessage.Show_message('Row Updated Successfully!...');
      } else {
        this.globalmessage.Show_message('Failed To Update!...');
      }

    });
  }

  //Grid column

  columnDefs = [
    {
      headerName: 'Batch_name',
      field: 'Batch_name',
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Batch code',
      field: 'Batch_code',
      resizable: true,
      maxWidth: 120,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Startdatetime',
      field: 'Startdatetime',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Enddatetime',
      field: 'Enddatetime',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Createdby',
      field: 'Createdby',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Editedby',
      field: 'Editedby',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true
    },
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    {headerName: 'Action', field: 'Action', maxWidth: 80, cellRenderer: EditCellCustomComponent}
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
    this.Batch_codes = event.data.Batch_code;
    this.Startdatetime = event.data.Startdatetime;
    this.Enddatetime = event.data.Enddatetime;
    this.Createdby = event.data.Createdby;
    this.Editedby = event.data.Editedby;
  }

  onSelectionChanged(event: any) {
  }



  GetPortalApi() {

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];

      }
    });
  }

  ///AutoComplete
  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
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
