import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionReleaseService} from './admission-release.service';
import {GridOptions, GridReadyEvent} from 'ag-grid-community';
import {GlobalMessage} from "../../globals/global.message";
import {NavigationEnd, Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import Swal from 'sweetalert2';
import {CommanService} from "../../globals/common.services";
import {allbatchs, showbatchadmissiondate, updatebatchadmissiondate} from "../../globals/global-api";
import {Iresp_showbatch} from "./admission-release.responsemodel";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';
// import Any from 'jasmine';

@Component({
  selector: 'app-admission-release',
  templateUrl: './admission-release.component.html',
  styleUrls: ['./admission-release.component.scss'],

})
export class AdmissionReleaseComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;

  searchValue: any;
  error: any;
  savealert: boolean = false;
  public filterQuery = '';
  submitted = false;
  res: any;
  Batchs = [];
  SelectedBatch: any;
  Subject_group_code: any;
  someSubscription: any;

  batch_code: any;
  admissionstarted: any;

  showbatchlist!: Iresp_showbatch[];

  oSession!: Sessiondata;

  //Grid column
  public rowSelection: 'single' | 'multiple' = 'single';


  @ViewChild('infoModal') infoModal: any;

  constructor(private router: Router,private commonService: CommanService,
              private AdmissionReleaseServiceService: AdmissionReleaseService,
              private globalmessage: GlobalMessage, private sessionService : SessionService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.someSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = true;
      }
    });

    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      alwaysShowHorizontalScroll: true
    };
  }

  // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  // CollegeCode = parseInt(sessionStorage.getItem('College')!);
  // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
  Token = sessionStorage.getItem('Token');

  ngOnInit(): void {
    // if (!this.Token) {
    //   this.openYesNoDialog();
    //   this.router.navigate(['login']);
    // }

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.GridListApi();
  }

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  gridlist: any;

  GridListApi() {
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar
    };
    this.commonService.Post_json(allbatchs,jsonin).subscribe((response) => {
      if (response == null){
        return;
      }
      this.showbatchlist = response.data

    });
  }

  //update button


  EditCell(selectedRow: any) {
    this.batch_code = selectedRow.Batch_code;
    this.admissionstarted = parseInt(selectedRow.Admissionstarted);

    let jsonin = {
      'batch_code': this.batch_code,
      'admissionstarted': parseInt(selectedRow.Admissionstarted),
      'outside_admission': parseInt(selectedRow.Outside_admission),
      'atkt_admission': parseInt(selectedRow.Atkt_admission),
      'outside_message': selectedRow.Outside_message,
      'atkt_message': selectedRow.Atkt_message,
    };
    // console.log(this.updateRelease);
    this.commonService.Post_json(updatebatchadmissiondate,jsonin).subscribe((response: any) => {

      if (response == null){
        return
      }
      this.res = response;
      if (this.res.data == true) {
        Swal.fire({title: 'Success!', text: 'Updated Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert
      } else {
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
      }
      // console.log(this.res);
      this.GridListApi();
    });
  }

  onChangeBatchSelect() {
    // console.log(this.SelectedBatch.Batch_Code);
  }

  onChangeSubjectSelect() {
    // console.log(this.SelectedChangeSub.Subject_group_code);
  }

  public columnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    {headerName: 'Batch Name', minWidth: 500, field: 'Batch_name', resizable: true},
    {headerName: 'Admission Year', field: 'Finyear', editable: true, resizable: true},
    {headerName: 'Admission Status', field: 'Admissionstarted', editable: true, resizable: true},
    {headerName: 'Atkt Admission', field: 'Atkt_admission', editable: true, resizable: true},
    {headerName: 'Outside Admission', field: 'Outside_admission', editable: true, resizable: true},
    {headerName: 'Atkt message', field: 'Atkt_message', editable: true, resizable: true},
    {headerName: 'Outside message', field: 'Outside_message', editable: true, resizable: true},
    {headerName: 'Update', field: 'Action', cellRenderer: EditCellCustomComponent},
  ];

  //grid- search
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    //this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {
  }

  onSelectionChanged(event: any) {
    // console.log(event);
  }

  openYesNoDialog() {

    // this.dialogService.open(
    //   {
    //     title: 'Delete',
    //     message: 'Please Login',
    //     positive: 'Ok',
    //   });
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

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


  quickSearch() {
    if (this.searchValue.length <= 0) {
      return
    }
    console.log("xxx");
    this.gridApi.setQuickFilter(this.searchValue);
  }
}
