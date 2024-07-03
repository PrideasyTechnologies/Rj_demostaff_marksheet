import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BillDeskService, ITableData} from './upload-Billdesk.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {base64StringToBlob} from 'blob-util';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {
  billdeskDataDelete,
  billdeskdatadownload,
  billdeskdataupload,
  billdeskrefunddownload,
  billdeskrefundupload, BilldeskUpload, get_atkterrorforms, queryapi_billdesk
} from "../../globals/global-api";
import {Ibilldeskatktquery} from "./uploadbilldesk.model";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {DatePipe} from "@angular/common";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';
import {UDownloadfiles} from "../../globals/global_downloadfiles";


@Component({
  selector: 'app-bill-desk',
  templateUrl: './upload-Billdesk.component.html',
  styleUrls: ['./upload-Billdesk.component.scss'],
  providers: [BillDeskService],
})


export class BillDeskComponent {

  private gridApi_billdesk: any;
  private gridColumnApi_billdesk: any;

  private gridApi_billdesk_atktquery: any;
  private gridColumnApi_billdesk_atktquery: any;

  private gridApi_refund: any;
  private gridColumnApi_refund: any;

  billdesk_gridOptions: any;
  refund_gridOptions: any;

  public gridOptions_atktquery: any;

  error: any;
  date: any;
  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  BilldeskForm!: FormGroup;
  UploadBilldeskForm!: FormGroup;
  UploadBilldeskRefundForm!: FormGroup;
  DownloadBilldeskForm!: FormGroup;
  DownloadBilldeskRefundForm!: FormGroup;

  res: any;
  res_billdeskdatadownload: any;

  downloadloader = false;
  viewloader = false;
  viewrefundloader = false;
  downloadrefundloader = false;
  uploadloader = false;
  uploadrefundloader = false;
  Batchs = [];
  SelectedBatch!: any;
  viewfile: any;
  csvRecords: any[] = [];
  header: boolean = false;
  csvFile!: Array<File>;
  formData = new FormData();
  uploadFile: any;
  customColumn: any;
  loader = false;
  clicked = false;

  xlsxFile!: Array<File>;

  atktquery!: Ibilldeskatktquery[];
  out_rowselected!: any;

  atktqueryapi_submit: any;

  activePane = 0;
  public rowSelection_query: 'single' | 'multiple' = 'single';

  //idle

  public childModal = false;

  //idle
  idleState = 'Not started.';
  timedOut = false;
  lastPing!: Date;
  title = 'angular-idle-timeout';

  // lastPing = new DatePipe('en-US');

  oSession!: Sessiondata;


  @ViewChild('fileImportInput') fileImportInput: any;

  constructor(private router: Router,
              private billdeskService: BillDeskService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef,
              private idle: Idle, private keepalive: Keepalive,
              private commonService: CommanService,private sessionService : SessionService) {
    this.billdesk_gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };

    this.refund_gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };

    this.gridOptions_atktquery = <GridOptions>{
      context: {
        componentParent: this
      }
    };

    // idle

    // this.reset();

  }

  ngOnInit(): void {
    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

    this.BilldeskForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    });
    this.UploadBilldeskForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    });
    this.DownloadBilldeskForm = new FormGroup({
      'fromdate': new FormControl('', Validators.required),
      'todate': new FormControl('', Validators.required),
    });
    this.UploadBilldeskRefundForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    });
    this.DownloadBilldeskRefundForm = new FormGroup({
      'fromdate': new FormControl('', Validators.required),
      'todate': new FormControl('', Validators.required),
    });

  }

  //Upload Existing Bill Desk
  onCancel() {
    this.BilldeskForm.reset();
  }

  csvUpload(element: any) {
    this.csvFile = element.target.files;
    console.log(this.csvFile[0].type);
    console.log(this.csvFile[0].size);
    // application/vnd.ms-excel
    if (this.csvFile[0].type == 'text/csv') {
    } else {
      this.globalmessage.Show_message('Only .csv file allowed!');//alert
      this.BilldeskForm.reset();
    }
  }

  SubmitBill() {
    this.loader = true;
    // this.formData.delete('collegecode');
    // this.formData.delete('finyear');
    // this.formData.delete('aadhaar');
    // this.formData.delete('billdesk_csv');

    let jsonin = {
      college_code : this.oSession.collegecode,
      finyear : this.oSession.finyear,
      aadhaar : this.oSession.aadhaar
    }

    let formData = new FormData();

    formData.append("input_form",encryptUsingAES256(jsonin));

    formData.append('file', this.csvFile[0]);

    this.commonService.Post_formdata(BilldeskUpload,formData).subscribe((response: {}) => {
      this.res = response;
      console.log('My Response ', this.res);
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })//alert
        // Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert
        this.globalmessage.Show_successmessage('File Uploaded Successfully!')
        this.loader = false;
        this.BilldeskForm.reset();
      }
        // this.dialogService.open({ message: 'Failed to Upload', positive: 'Ok', })//alert


    },error =>{

      this.globalmessage.Show_error(error.exception)
      // Swal.fire({title: 'Error!',
      //   text: this.res.exception, icon: 'error',
      //   confirmButtonText: 'OK'});//alert
      this.loader = false;
      this.BilldeskForm.reset();
    });
  }

  //Upload Bill Desk

  //Upload File


  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    // console.log("this.xlsxFile", this.xlsxFile)
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    if (this.xlsxFile[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({title: 'Error!', text: 'Only .xlsx file allowed!', icon: 'error', confirmButtonText: 'OK'});//alert
    }
  }

  UploadBillDesk() {
    this.uploadloader = true;

    let jsonin = {
      Collegecode : this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar
    }

    let formDatabill = new FormData();

    formDatabill.append("input_form",encryptUsingAES256(jsonin));

    formDatabill.append('file', this.xlsxFile[0]);


    this.commonService.Post_formdata(billdeskdataupload, formDatabill).subscribe((response: {}) => {
      this.res = response;
      console.log('My Response ', this.res);
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })//alert
        // Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert
        this.globalmessage.Show_successmessage('File uploaded Successfully')
        this.uploadloader = false;
        this.UploadBilldeskForm.reset();
      } else {
        // this.dialogService.open({ message: 'Failed to Upload', positive: 'Ok', })//alert
        // Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        this.globalmessage.Show_error('Failed to upload')
        this.uploadloader = false;
        this.UploadBilldeskForm.reset();
      }
    });
  }

  ViewBilldesk() {
    this.viewloader = true;

    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'useraadhaar': this.oSession.aadhaar,
      'fromdate': this.DownloadBilldeskForm.controls['fromdate'].value,
      'todate': this.DownloadBilldeskForm.controls['todate'].value,
      'reporttype': 'VIEW'
    };
    console.log('data', jsonin);
    this.commonService.Post_json(billdeskdatadownload, jsonin).subscribe(response => {
      this.res = response;
      console.log('response', this.res);

      this.billdesk_gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
      // // //dynamic columns
      // this.columnDefs.length = 0;
      // this.customColumn = { headerName: 'Play Audio', field: 'Audio_link', cellRendererFramework: CellCustomComponent },
      //   this.columnDefs.push(this.customColumn);
      // const keys = Object.keys(this.rowss[0])
      // keys.forEach(key => this.columnDefs.push({ field: key, editable: true, resizable: true }));
      // console.log("this.customColumn",keys)
      this.viewloader = false;

    });
  }


  DownloadBilldesk() {
    this.downloadloader = true;
    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'useraadhaar': this.oSession.aadhaar,
      'fromdate': this.DownloadBilldeskForm.controls['fromdate'].value,
      'todate': this.DownloadBilldeskForm.controls['todate'].value,
      'reporttype': 'XL'
    };
    console.log('data', jsonin);
    this.commonService.Post_json(billdeskdatadownload, jsonin).subscribe(response => {
      this.res_billdeskdatadownload = response;
      console.log('response', this.res);
      // this.rowss = this.res.data;
      //const byteArray = atob( this.res.blobdata);
      UDownloadfiles(this.res_billdeskdatadownload.blobdata,this.res_billdeskdatadownload.excelfile)
      // const contentType = '';
      // const blobb = base64StringToBlob(this.res.blobdata, contentType);
      // let blob = new Blob([blobb], {type: 'application/blob'});
      // var downloadURL = window.URL.createObjectURL(blob);
      // var link = document.createElement('a');
      // link.href = downloadURL;
      // link.download = this.res.excelfile;
      // link.click();
      this.downloadloader = false;
      // console.log("file created",byteArray);
      // console.log('downloadURL', downloadURL);
    });
  }


  //Billdesk Refund
  UploadRefundBillDesk() {
    this.uploadrefundloader = true;

    let jsonin = {
      collegecode : this.oSession.collegecode,
      finyear : this.oSession.finyear,
      useraadhaar : this.oSession.aadhaar
    }

    let formData = new FormData();

    formData.append("input_form",encryptUsingAES256(jsonin));

    formData.append('file', this.xlsxFile[0]);

    this.commonService.Post_formdata(billdeskrefundupload, formData).subscribe((response: {}) => {
      this.res = response;
      console.log('My Response ', this.res);
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })//alert
        Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert
        this.uploadrefundloader = false;
        this.UploadBilldeskRefundForm.reset();
      } else {
        // this.dialogService.open({ message: 'Failed to Upload', positive: 'Ok', })//alert
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        this.uploadrefundloader = false;
        this.UploadBilldeskRefundForm.reset();
      }
    });
  }

  ViewRefundBilldesk() {
    this.viewrefundloader = true;

    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'useraadhaar': this.oSession.aadhaar,
      'fromdate': this.DownloadBilldeskRefundForm.controls['fromdate'].value,
      'todate': this.DownloadBilldeskRefundForm.controls['todate'].value,
      'reporttype': 'VIEW'
    };
    console.log('data', jsonin);
    this.commonService.Post_json(billdeskrefunddownload, jsonin).subscribe(response => {
      this.res = response;
      console.log('response', this.res);
      this.refund_gridOptions.api.setRowData(this.res);
      this.rowss = this.res.data;
      // // //dynamic columns
      // this.columnDefs.length = 0;
      // this.customColumn = { headerName: 'Play Audio', field: 'Audio_link', cellRendererFramework: CellCustomComponent },
      //   this.columnDefs.push(this.customColumn);
      // const keys = Object.keys(this.rowss[0])
      // keys.forEach(key => this.columnDefs.push({ field: key, editable: true, resizable: true }));
      // console.log("this.customColumn",keys)
      this.viewrefundloader = false;

    });
  }

  DownloadRefundBilldesk() {
    this.downloadrefundloader = true;
    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'useraadhaar': this.oSession.aadhaar,
      'fromdate': this.DownloadBilldeskRefundForm.controls['fromdate'].value,
      'todate': this.DownloadBilldeskRefundForm.controls['todate'].value,
      'reporttype': 'XL'
    };
    console.log('data', jsonin);
    this.commonService.Post_json(billdeskrefunddownload, jsonin).subscribe(response => {
      this.res = response;
      console.log('response', this.res);
      // this.rowss = this.res.data;
      //const byteArray = atob( this.res.blobdata);
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.downloadrefundloader = false;
      // console.log("file created",byteArray);
      console.log('downloadURL', downloadURL);
    });
  }

  //Grid column

  columnDefs = [
    {headerName: 'Bd_ref_no', field: 'Bd_ref_no', resizable: true},
    {headerName: 'Biller_Id', field: 'Biller_Id', resizable: true},
    {headerName: 'Charge', field: 'Charge', resizable: true},
    {headerName: 'Gross', field: 'Gross', resizable: true},
    {headerName: 'Net', field: 'Net', resizable: true},
    {headerName: 'Ref1', field: 'Ref1', resizable: true},
    {headerName: 'Ref2', field: 'Ref2', resizable: true},
    {headerName: 'Ref3', field: 'Ref3', resizable: true},
    {headerName: 'Ref4', field: 'Ref4', resizable: true},
    {headerName: 'Ref5', field: 'Ref5', resizable: true},
    {headerName: 'Ref6', field: 'Ref6', resizable: true},
    {headerName: 'Ref7', field: 'Ref7', resizable: true},
    {headerName: 'Ref8', field: 'Ref8', resizable: true},
    {headerName: 'Service', field: 'Service', resizable: true},
    {headerName: 'Settlementdate', field: 'Settlementdate', esizable: true},
    {headerName: 'Settlementdate_d', field: 'Settlementdate_d', resizable: true},
    {headerName: 'Sheettype', field: 'Sheettype', resizable: true},
    {headerName: 'Surcharge', field: 'Surcharge', resizable: true},
    {headerName: 'Tds', field: 'Tds', resizable: true},
  ];

  columnDefs_atktquery = [
    {headerName: 'Receipt id', field: 'Receipt_id', resizable: true, filter: true, maxWidth: 130},
    {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true, filter: true},
    {headerName: 'Fitstname', field: 'Firstname', resizable: true, filter: true},
    {headerName: 'Lastname', field: 'Lastname', resizable: true, filter: true},
    {headerName: 'Fathername', field: 'Fathername', resizable: true, filter: true},
    {headerName: 'Mothername', field: 'Mothername', resizable: true, filter: true},
    {headerName: 'Transaction id', field: 'Transactionguid', resizable: true, filter: true},
    {headerName: 'Prefix month', field: 'Prefix_month', resizable: true, filter: true},
  ];

  //Grid Rows
  rowss: any = [];

  //grid- search
  quickSearch() {
    this.gridApi_billdesk.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi_billdesk = params.api;
    this.gridColumnApi_billdesk = params.ColumnApi;
  }

  onGridReady_atktquery(params: any) {
    this.gridApi_billdesk_atktquery = params.api;
    this.gridColumnApi_billdesk_atktquery = params.ColumnApi;
  }


  onRowSelectedEvent(event: any) {
  }

  onSelectionChanged(event: any) {
  }

  onRowSelectedEvent_atktquery(event: any) {

  }

  onSelectionChanged_atktquery(event: any) {
    let selected_outnode = this.gridApi_billdesk_atktquery.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    console.log('selec', this.out_rowselected)
  }

  getatktQuery() {
    let jsonin = {
      'College_code': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'Useraadhaar': this.oSession.aadhaar,
    };
    console.log('data', jsonin);
    this.commonService.Post_json(get_atkterrorforms, jsonin).subscribe(response => {
      if (response == null) {
        this.globalmessage.Show_error('No data found')
      }
      this.atktquery = response['data'];
    });
  }

  QueryApi() {
    let jsonin = {
      "Customerid": this.out_rowselected[0].Transactionguid,
      "Receiptid": this.out_rowselected[0].Receipt_id,
    };
    this.commonService.Post_json(queryapi_billdesk, jsonin).subscribe(response => {
      if (response == null) {
        this.globalmessage.Show_error('Please check your data')
      }
      this.atktqueryapi_submit = response;
      this.getatktQuery();
    });
  }

  /**
   * Function To delete ATKTQueryApi Tab in Upload BillDesk
   * This Feature Implimented By Sikandar
   * @constructor
   */
  DeleteQueryApi() {
    let jsonin = {
      "Customerid": this.out_rowselected[0].Transactionguid,
      "Receiptid": this.out_rowselected[0].Receipt_id,
    };
    this.commonService.Post_json(billdeskDataDelete, jsonin).subscribe(response => {
      if (response == null) {
        this.globalmessage.Show_error('Please check your data')
      }
      this.atktqueryapi_submit = response;
      this.globalmessage.Show_message('Deleted successfully')
      this.getatktQuery();
    });
  }

  outsidechange($event: number) {
    this.activePane = $event;
    if ($event == 3) {
      this.getatktQuery();
    }
  }


  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal = false;
  }

  stay() {
    this.childModal = false;
    this.reset();
  }

  logout() {
    this.childModal = false
    this.router.navigate(['/login']);
  }


}
