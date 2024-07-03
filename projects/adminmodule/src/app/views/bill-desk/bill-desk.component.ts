import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BillDeskService, ITableData } from './bill-desk.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent} from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {BilldeskStatusReport, GetAllBatchs} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-bill-desk',
  templateUrl: './bill-desk.component.html',
  styleUrls: ['./bill-desk.component.scss'],
  providers: [BillDeskService],
})


export class BillDeskComponent implements OnInit{
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions : any;
  error: any;
  date:any;
  searchValue:any;
  savealert: boolean=false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  BilldeskForm!: FormGroup;
  res:any;
  Batchs = [];
  SelectedBatch!: any;

  oSession!: Sessiondata;


  constructor(private router: Router,private commonService: CommanService,
              private billdeskService: BillDeskService,
              private globalmessage:GlobalMessage,
              private formBuilder: FormBuilder,private sessionService : SessionService) {

    this.gridOptions = <GridOptions>{context : {
      componentParent : this
    }};

  }

  ngOnInit(): void {


      this.GetBatchApi();

    this.BilldeskForm= new FormGroup({

      'fromdate': new FormControl('',Validators.required),
       })

  }

  ShowBill(date: any){
    this.date=this.BilldeskForm.value;
    let jsonin ={
      "fromdate":this.BilldeskForm.controls['fromdate'].value,
    }
    // console.log(this.date);
    this.commonService.Post_json(BilldeskStatusReport,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.res = this.res.data;
      this.gridApi.setRowData(this.res.data);
      this.rowss = this.res;
      // console.log(this.res);
    })
  }
  //Grid column

  columnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    { headerName: "TransactionStatus", field: 'TransactionStatus',maxWidth: 120,  resizable: true },
    { headerName: "ErrorDescription", field: 'ErrorDescription',  resizable: true },
    { headerName: "ErrorStatus", field: 'ErrorStatus',  resizable: true },
    { headerName: "Transaction Date", field: "TxnDate",  resizable: true },
    { headerName: "Receipt ID", field: "ReceiptID", resizable: true },
    { headerName: "Account ID", field: "Accountid",  resizable: true },
    { headerName: "Customer ID", field: "CustomerID",  resizable: true },
    { headerName: "Transaction Reference No", field: "TxnReferenceNo",  resizable: true },
    { headerName: "Bank Reference No", field: "BankReferenceNo",  resizable: true },
    { headerName: "Txn Amount", field: "TxnAmount",  resizable: true },
    { headerName: "CurrencyType", field: 'CurrencyType',  resizable: true },
    { headerName: "TxnType", field: 'TxnType',  resizable: true },
    { headerName: "ItemCode", field: 'ItemCode',  resizable: true },
    { headerName: "Filler1", field: "Filler1",  resizable: true },
    { headerName: "Filler2", field: 'Filler2',  resizable: true },
    { headerName: "Filler3", field: 'Filler3',  resizable: true },
    { headerName: "Filler4", field: 'Filler4',  resizable: true },
    { headerName: "Filler5", field: 'Filler5',  resizable: true },
    { headerName: "AuthStatus", field: 'AuthStatus',  resizable: true },
    { headerName: "AdditionalInfo1", field: 'AdditionalInfo1',  resizable: true },
    { headerName: "AdditionalInfo2", field: 'AdditionalInfo2',  resizable: true },
    { headerName: "AdditionalInfo3", field: 'AdditionalInfo3',  resizable: true },
    { headerName: "AdditionalInfo4", field: 'AdditionalInfo4',  resizable: true },
    { headerName: "AdditionalInfo5", field: 'AdditionalInfo5',  resizable: true },
    { headerName: "AdditionalInfo6", field: 'AdditionalInfo6',  resizable: true },
    { headerName: "AdditionalInfo7", field: 'AdditionalInfo7',  resizable: true },
    { headerName: "Createddate", field: 'Createddate',  resizable: true },
  ];

  //Grid Rows
  rowss: any = [];

    //grid- search
  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue);
  }

   onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.ColumnApi;
    }
    onRowSelectedEvent(event: any) {

    }
    onSelectionChanged(event: any) { }

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


  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }


}
