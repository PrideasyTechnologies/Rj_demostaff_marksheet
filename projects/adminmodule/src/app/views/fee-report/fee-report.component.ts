import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FeeReportService} from "../fee-report/fee-report.service";
import {GlobalDownloadfiles} from "../../globals/download_global";
import {GlobalMessage} from "../../globals/global.message";
import {GridOptions} from "ag-grid-community";
import {base64StringToBlob} from "blob-util";
import {CellCustomComponent} from "../cell-custom/cell-custom.component";
import Swal from "sweetalert2";
import {CommanService} from "../../globals/common.services";
import {
    Aadhaarreceiptlist,
    Accountinfo,
    batchoutstanding, download_receipt,
    ExcelAccountCollection,
    ExcelAccountoutstanding,
    ExcelAccountStudent,
    Excelbatchcollout, ExcelDetailRegister,
    Exceldetailregister_tally,
    ExcelFeesStructure,
    ExcelOutstanding,
    ExcelPaid_UnPaidList,
    formfees, GetAllBatchs, Printreceipt, ReceiptReport, report_atktbatchsemesterstudents,
    Tally
} from "../../globals/global-api";
import {UDownloadfiles} from "../../globals/global_downloadfiles";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-fee-report',
  templateUrl: './fee-report.component.html',
  styleUrls: ['./fee-report.component.scss']
})
export class FeeReportComponent {

    Batchs: any;

    AccountCollectionForm!: FormGroup;
    PaymentForm!: FormGroup;
    ReceiptForm!: FormGroup;
    AadhaarReceiptForm!: FormGroup;
    TallyForm!: FormGroup;

    gridOptions: any;

    accountcollect: any;
    res: any;
    outstanding: any;
    Prefix: any;
    account: any;

    searchValue: any;

    Accountloader = false;
    onAccountclicked = false;

    AccountOutloader = false;
    accoutstanding: any;
    AccountOutclicked = false;

    Studentloader = false;
    Studentclicked = false;

    outstandingloader = false;
    Outstandingclicked = false;

    Paidunloader = false;
    Createfile: any;
    Paidunclicked = false;

    Feesloader = false;
    feestructure: any;
    Feesclicked = false;

    formfeesloader = false;
    formfees: any;
    formfeesclicked = false;

    overallloader = false;
    overalldata: any;
    overallclicked = false;

    rollcalltrueloader = false;
    onlyoutstanding: any;
    rollcallfalseloader = false;

    Prefix_code: any;
    AccountNo: any;


    Prefixkeyword = 'Prefix_desc';
    Accountkeyword = 'AccountNo';

  RefundDetailRegloader = false;
  DetailRegloader = false;



  submitted = false;

  rowssbyaadhaar: any = [];
  aadhaarreceiptloader = false;

  private gridApi: any;
  private gridColumnApi: any;
  showreceiptloader = false;

  tallyloader = false;
  register: any;

  tallydata: any;
  tallysumloader = false;

  Downloadtabloader = false;
  Downloadtabsummaryloader = false;

  download_recieptreport: any

  oSession!: Sessiondata;

    constructor(private router: Router,private commonService: CommanService,
                private downloadfileService: FeeReportService,
                private formBuilder: FormBuilder,
                private globaldownloadfiles: GlobalDownloadfiles,
                private globalmessage: GlobalMessage,private sessionService : SessionService) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    get f() {
        return this.AadhaarReceiptForm.controls;
    }

    ngOnInit(): void {
        // if (!this.Token) {
        //     // alert("Please Login!")
        //     this.globalmessage.Show_message('Please Login');
        //     this.router.navigate(['login']);
        // } else {

        this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

            this.GetBatchApi();
            this.GetAccountinfo();//prefix

        this.AccountCollectionForm = this.formBuilder.group({
            fromdate: ['', Validators.required],
            todate: ['', Validators.required],
        });
        this.PaymentForm = this.formBuilder.group({
            fromdate: ['', Validators.required],
            todate: ['', Validators.required],
        });
        this.ReceiptForm = new FormGroup({
            //  'batchcode': new FormControl('',Validators.required),
            'fromdate': new FormControl('', Validators.required),
            'todate': new FormControl('', Validators.required),
        });
        this.AadhaarReceiptForm = new FormGroup({
            'aadhaar': new FormControl('', Validators.required)
        });
        this.TallyForm = this.formBuilder.group({
            // account: ['', Validators.required],
            paymode: ['', Validators.required],
            fromdate: ['', Validators.required],
            todate: ['', Validators.required],
        });
    }



    onAccountcollection() {
        this.Accountloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'fromdate': this.AccountCollectionForm.controls['fromdate'].value,
            'todate': this.AccountCollectionForm.controls['todate'].value,
        };
        if (jsonin.fromdate > jsonin.todate) {
            this.globalmessage.Show_message('from date should be less than to date');
        } else {
            this.commonService.Post_json(ExcelAccountCollection,jsonin).subscribe(response => {
                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);
                let blob = new Blob([blobb], {type: 'application/blob'});
                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                // this.filename = this.res.excelfile;
                // console.log("file created");
                // this.AccountUrl = DownloadExcel + this.res.excelfile;

                // this.downloadfileService
                //   .download(this.AccountUrl)
                //   .subscribe(blob => saveAs(blob, this.res.excelfile))
                this.Accountloader = false;
                this.onAccountclicked = false;
            });
        }
    }

    AccountOutstanding() {
        this.AccountOutloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar
        };
        this.commonService.Post_json(ExcelAccountoutstanding,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            this.AccountOutloader = false;
            this.AccountOutclicked = false;
        });
    }

    GetBatchApi() {
        this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Batchs = response['data'];
            }
        });
    }

    GetAccountinfo() {
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode
        };
        this.commonService.Post_json(Accountinfo,jsonin).subscribe((response: any) => {
            // this.Prefix = this.res.data.Prefix_desc;

            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Prefix = response['data'];
            }
            // console.log("Prefix_desc", this.res.data.Prefix_desc);
        });

    }

    StudentAccount() {
        this.Studentloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar
        };
        this.commonService.Post_json(ExcelAccountStudent,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            this.Studentloader = false;
            this.Studentclicked = false;
        });
    }

    BatchOutstandingDownload() {
        this.outstandingloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'reporttype': 'XL',
          'Fromdate': this.AccountCollectionForm.controls['fromdate'].value,
          'Todate': this.AccountCollectionForm.controls['todate'].value
        };
        this.commonService.Post_json(batchoutstanding,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.filename;
            link.click();
            this.outstandingloader = false;
            this.Outstandingclicked = false;
        });
    }

    PaidUnpaidFile() {
        this.Paidunloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
        };
        this.commonService.Post_json(ExcelPaid_UnPaidList,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            this.Paidunloader = false;
            this.Paidunclicked = false;
        });

    }

    FeesStructureFile() {
        this.Feesloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
        };

        this.commonService.Post_json(ExcelFeesStructure,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            // this.filename = this.res.excelfile;
            // console.log("file created");
            // this.FeesUrl = DownloadExcel + this.res.excelfile;

            // this.downloadfileService
            //   .download(this.FeesUrl)
            //   .subscribe(blob => saveAs(blob, this.res.excelfile))
            this.Feesloader = false;
            this.Feesclicked = false;
        });
    }

    FormFeesDownload() {
        this.formfeesloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'reporttype': 'XL'
        };
        this.commonService.Post_json(formfees,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.filename;
            link.click();
            this.formfeesloader = false;
            this.formfeesclicked = false;
        });
    }

    OverallCollectionDownload() {
        this.overallloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'college_code': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'reporttype': 'XL'
        };
        this.commonService.Post_json(Excelbatchcollout,jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            this.overallloader = false;
            this.overallclicked = false;
        });
    }

    Outstanding(loutstanding: boolean) {
        if (loutstanding == true) {
            this.rollcalltrueloader = true;
        }
        if (loutstanding == false) {
            this.rollcallfalseloader = true;
        }
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'onlyoutstanding': loutstanding,
            'fromdate': this.PaymentForm.controls['fromdate'].value,
            'todate': this.PaymentForm.controls['todate'].value
        };
        if (jsonin.fromdate > jsonin.todate) {
            this.globalmessage.Show_message('from date should be less than to date');
        } else {
            this.commonService.Post_json(ExcelOutstanding,jsonin).subscribe(response => {
                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);

                let blob = new Blob([blobb], {type: 'application/blob'});

                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                if (loutstanding == true) {
                    this.rollcalltrueloader = false;
                }
                if (loutstanding == false) {
                    this.rollcallfalseloader = false;
                }
            });
        }
    }

    rowss: any = [];


    RecieptDownload(){
        this.showreceiptloader = true;
      let jsonin = {
        'prefix_code': this.Prefix_code,
        'finyear': this.oSession.finyear,
        'college_code': this.oSession.collegecode,
        'fromdate': this.ReceiptForm.controls['fromdate'].value,
        'todate': this.ReceiptForm.controls['todate'].value,
        'useraadhaar': this.oSession.aadhaar,
      };

      console.log("inputs",jsonin)
      this.commonService.Post_json(download_receipt,jsonin).subscribe((response: any) => {

        this.download_recieptreport = response['data']
        console.log('responsedownload:::',response.data)
        UDownloadfiles(this.download_recieptreport.Image,this.download_recieptreport.Filename)
        this.showreceiptloader = false;
        // if(response == null){
        //   this.globalmessage.Show_error('No data found')
        // }
        // U
      });
    }

    ShowReceipt() {
        this.showreceiptloader = true;
        let jsonin = {
            // "prefix_code":this.SelectedBatch.Prefix_code
            'prefix_code': this.Prefix_code,
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'fromdate': this.ReceiptForm.controls['fromdate'].value,
            'todate': this.ReceiptForm.controls['todate'].value,
        };
        if (jsonin.fromdate > jsonin.todate) {
            this.globalmessage.Show_message('From date should be less than to date');
        } else {
            this.commonService.Post_json(ReceiptReport,jsonin).subscribe((response: {}) => {
                this.res = response;
                this.res = this.res.data;
                this.gridApi.setRowData(this.res.data);
                this.rowss = this.res;
                this.showreceiptloader = false;
                // console.log(this.Receipt);
            });
        }
    }

    public rowSelection: 'single' | 'multiple' = 'single';

    ShowbyAadhaarReceipt() {
        this.aadhaarreceiptloader = true;
        let jsonin = {

            'Finyear': this.oSession.finyear,
            'Collegecode': this.oSession.collegecode,
            'aadhaar': this.AadhaarReceiptForm.controls['aadhaar'].value,
        };
        // console.log("ADHHHHH", this.AadhaarReceipt);
        this.commonService.Post_json(Aadhaarreceiptlist,jsonin).subscribe(response => {
            // console.log("ADHHHHH RESSSS", models);
            this.res = response;
            this.res = this.res.data;
            this.rowssbyaadhaar = this.res;
            this.aadhaarreceiptloader = false;
            // console.log("ADHHHHH RESSSS", this.res);
            // console.log(this.Receipt);
        });
    }

    columnDefs = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Batch Name', field: 'Batch_name', resizable: true},
        {headerName: 'Full Name', field: 'FullName', resizable: true},
        {headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true},
        {headerName: 'Subject group code', field: 'Subject_group_code', maxWidth: 100, resizable: true},
        {headerName: 'Term Name', field: 'Term_name', resizable: true},
        {headerName: 'BilldeskTran ID', field: 'BilldeskTranID', resizable: true},
        {headerName: 'Receipt No', field: 'Receiptno', maxWidth: 90, resizable: true},
        {headerName: 'Transaction Date', field: 'CreatedDate', resizable: true},
        {headerName: 'Receipt Amount', field: 'Receiptamount', maxWidth: 120, resizable: true},
        {headerName: 'Installment', field: 'Installment', maxWidth: 80, resizable: true},
        {headerName: 'Payment_Mode', field: 'Payment_Mode', maxWidth: 120, resizable: true},
        // { headerName: "Receipt_ID", field: "Receipt_ID",  resizable: true },
        // { headerName: "Batch_code", field: "Batch_code", resizable: true },
        // { headerName: "Term_code", field: "Term_code",  resizable: true },
        // { headerName: "Finyear", field: "Finyear",  resizable: true },
        // { headerName: "Installment", field: "Installment",  resizable: true },
        // { headerName: "Receiptno", field: "Receiptno",  resizable: true },
        // { headerName: "Prefix_code", field: "Prefix_code",  resizable: true },
        // { headerName: "BilldeskTranID", field: "BilldeskTranID",  resizable: true },
    ];

    columnByAadhaar = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Receipt ID', field: 'Receipt_ID', resizable: true},
        {headerName: 'Full Name', field: 'FullName', resizable: true},
        {headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true},
        {headerName: 'Subject group code', field: 'Subject_group_code', maxWidth: 100, resizable: true},
        {headerName: 'Term Name', field: 'Term_name', resizable: true},
        {headerName: 'BilldeskTran ID', field: 'BilldeskTranID', resizable: true},
        {headerName: 'Receipt No', field: 'Receiptno', maxWidth: 90, resizable: true},
        {headerName: 'Transaction Date', field: 'CreatedDate', resizable: true},
        {headerName: 'Receipt Amount', field: 'Receiptamount', maxWidth: 120, resizable: true},
        {headerName: 'Installment', field: 'Installment', maxWidth: 80, resizable: true},
        {headerName: 'Payment_Mode', field: 'Payment_Mode', maxWidth: 120, resizable: true},
        {headerName: 'Print Receipt', field: 'Action', maxWidth: 80, cellRenderer: CellCustomComponent},

    ];

    modal(data: any) {

        let jsonin = {
            'college_code': data.College_code,
            'finyear': data.Finyear,
            'batch_code': data.Batch_code,
            'aadhaar': data.Aadhaar,
            'receipt_id': data.Receipt_ID,
            'reporttype': 'PDF'
        };

        this.commonService.Post_json(Printreceipt,jsonin).subscribe(response => {

                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);
                let blob = new Blob([blobb], {type: 'application/pdf'});
                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.filename;
                link.click();
                // this.res = this.res.data;
                // this.rowssbyaadhaar = this.res;
                console.log('models RESSSS', response);
                // console.log(this.Receipt);
            },
            (error) => {
                // this.downloadloader = false;

                if (error.error !== null) {
                    console.error('error caught in component', error);
                    Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'});//alert
                } else {
                    Swal.fire({title: 'Error!', text: error.status + 'Server Error!', icon: 'error', confirmButtonText: 'OK'});//alert
                }
            });
    }

    onAadhaarSelectionChanged(event: any) {

    }

    onAadhaarRowSelectedEvent(event: any) {

    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    onRowSelectedEvent(event: any) {
    }

    onSelectionChanged(event: any) {
    }

    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }
    selectPrefix(bat: any) {
        //  console.log(bat);
        //  console.log(bat.Batch_Code);
        // this.BatchCode = bat.Batch_Code
        this.Prefix_code = bat.Prefix_code;
        this.AccountNo = bat.AccountNo;
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

    selectaccount(bat: any) {
        //  console.log(bat);
        //  console.log(bat.Batch_Code);
        // this.BatchCode = bat.Batch_Code
        this.AccountNo = bat.AccountNo;
        // do something with selected item
    }

    TallyPost() {
        this.tallysumloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'fromdate': this.TallyForm.controls['fromdate'].value,
            'todate': this.TallyForm.controls['todate'].value,
            'accountno': this.AccountNo,
            'paymentmode': this.TallyForm.controls['paymode'].value,
            'reporttype': 'XL'
        };
        if (jsonin.fromdate > jsonin.todate) {
            this.globalmessage.Show_message('from date should be less than to date');
            this.tallysumloader = false;
        } else {
            console.log('datamyy', jsonin);
            this.commonService.Post_json(Tally,jsonin).subscribe(response => {
                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);

                let blob = new Blob([blobb], {type: 'application/blob'});

                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                this.tallysumloader = false;
            });
        }
    }



    TallyDetail() {
        this.tallyloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'Reporttype': 'XL',
            'Summarytype': '',
            'fromdate': this.TallyForm.controls['fromdate'].value,
            'todate': this.TallyForm.controls['todate'].value,
        };
        if (this.TallyForm.controls['fromdate'].value == '' || this.TallyForm.controls['todate'].value == '') {
            Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
            this.tallyloader = false;
        } else if (this.TallyForm.controls['fromdate'].value == null || this.TallyForm.controls['todate'].value == null) {
            Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
            this.tallyloader = false;
        } else {
            this.commonService.Post_json(Exceldetailregister_tally,jsonin).subscribe(response => {
                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);

                let blob = new Blob([blobb], {type: 'application/blob'});

                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                this.tallyloader = false;
            });
        }
    }



    DetailRegister() {
        this.RefundDetailRegloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'useraadhaar': this.oSession.aadhaar,
            'Reporttype': 'XL',
            'Summarytype': '',
            'fromdate': this.TallyForm.controls['fromdate'].value,
            'todate': this.TallyForm.controls['todate'].value,
        };
        if (this.TallyForm.controls['fromdate'].value == '' || this.TallyForm.controls['todate'].value == '') {
            Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
            this.RefundDetailRegloader = false;
        } else if (this.TallyForm.controls['fromdate'].value == null || this.TallyForm.controls['todate'].value == null) {
            Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
            this.RefundDetailRegloader = false;
        } else {
            this.commonService.Post_json(ExcelDetailRegister,jsonin).subscribe(response => {
                this.res = response;
                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);

                let blob = new Blob([blobb], {type: 'application/blob'});

                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                this.RefundDetailRegloader = false;
            });
        }
    }


  RefundDetailRegister(){
    this.RefundDetailRegloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      'Reporttype': 'XL',
      'Summarytype': '',
      'fromdate': this.TallyForm.controls['fromdate'].value,
      'todate': this.TallyForm.controls['todate'].value,
    };
    if (this.TallyForm.controls['fromdate'].value == '' || this.TallyForm.controls['todate'].value == '') {
      Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
      this.RefundDetailRegloader = false;
    } else if (this.TallyForm.controls['fromdate'].value == null || this.TallyForm.controls['todate'].value == null) {
      Swal.fire({text: 'Please select from date or to date!', icon: 'info', confirmButtonText: 'OK'});//alert
      this.RefundDetailRegloader = false;
    } else {
      this.commonService.Post_json(ExcelDetailRegister,jsonin).subscribe(response => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], {type: 'application/blob'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.RefundDetailRegloader = false;
      });
    }
  }

  DownloadReport(Reporttype: string) {

    if(Reporttype == 'SUMMARY'){
      this.Downloadtabsummaryloader = true
    }else {
      this.Downloadtabloader = true;
    }

    let jsonin = {
      Collegecode:this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Useraadhaar: this.oSession.aadhaar,
      Reportstype: Reporttype,
    };
    this.commonService.Post_json(report_atktbatchsemesterstudents,jsonin).subscribe((response)=>{
      if (!response) return;
      UDownloadfiles(response.blobdata, response.excelfile)
      this.Downloadtabloader = false;
      this.Downloadtabsummaryloader = false;
    })
  }
}
