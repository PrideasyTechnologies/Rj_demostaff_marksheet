import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DownloadFileService } from './download-file.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { base64StringToBlob } from 'blob-util';
import Swal from 'sweetalert2';
import { GlobalDownloadfiles } from '../../globals/download_global';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import {
  Aadhaarreceiptlist,
  ExcelPaid_UnPaidList,
  Accountinfo,
  batchoutstanding,
  DownloadReceiptsblob,
  ExcelAccountCollection,
  ExcelAccountoutstanding,
  ExcelAccountStudent,
  Excelbatchcollout,
  ExcelDetailRegister,
  Exceldetailregister_tally,
  ExcelFeesStructure,
  excelfreeship,
  ExcelIDCard,
  ExcelOutstanding,
  ExcelRollCall,
  ExcelStatistics,
  Excelsurveydata,
  formfees,
  generalregister,
  merilistbatchdocument,
  meritlist,
  Printprofile,
  Printreceipt,
  ReceiptReport,
  Tally,
  GetAllBatchs,
  meritlist_pg,
} from '../../globals/global-api';
import { IDoctype } from './download-file.model';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-bill-desk',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss'],
  providers: [DownloadFileService],
})
export class DownloadFileComponent {
  gridOptions: any;
  searchValue: any;
  savealert: boolean = false;
  submitted = false;
  ReceiptForm!: FormGroup;
  AadhaarReceiptForm!: FormGroup;
  RollcalltypeForm!: FormGroup;
  ProfileListForm!: FormGroup;
  FeeReceiptForm!: FormGroup;
  ViewReceiptForm!: FormGroup;
  OutstandingForm!: FormGroup;
  StatisticsForm!: FormGroup;
  AccountCollectionForm!: FormGroup;
  MeritListForm!: FormGroup;
  PaymentForm!: FormGroup;
  TallyForm!: FormGroup;
  // DetailRegisterForm: FormGroup;
  SelectedBatch: any;
  loader = false;
  clicked = false;
  feereceipt: any;
  ReceiptUrl: any;

  Prefix_desc: any = [];
  account: any;
  Prefix: any;

  Prefixkeyword = 'Prefix_desc';
  Accountkeyword = 'AccountNo';
  Prefix_code: any;
  AccountNo: any;
  tabContent: any;

  newuuidValue: any;
  uuidValue!: string;
  newuid: any;

  tallydata: any;
  tallysumloader = false;

  rowss: any = [];
  private gridApi: any;
  private gridColumnApi: any;

  SettlementDate: any;
  ReceiptDate: any;
  FeeReceipt = true;
  FeeModal = true;
  http: any;
  docType!: IDoctype[];
  SelectedDocType!: IDoctype;
  Batchs!: [];

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  public ALLDATA = 'ALL';
  public APPROVED = 'APPROVED';

  aurl: any;
  rollcallfile: any;
  RollCallUrl: any;
  Rollcallloader = false;
  Rollcallclicked = false;

  StudentProfileloader = false;
  StudentProfileclicked = false;
  studentprofile: any;

  Createfile: any;
  res: any;
  filename: any;
  Paidunloader = false;
  Paidunclicked = false;

  AccountUrl: any;
  Accountloader = false;
  onAccountclicked = false;

  rowssbyaadhaar: any = [];
  public rowSelection: 'single' | 'multiple' = 'single';

  feestructure: any;
  FeesUrl: any;
  Feesloader = false;
  Feesclicked = false;

  DetailRegloader = false;
  tallyloader = false;
  register: any;
  DetailRegclicked = false;

  generaldownloaddata: any;
  downloaddata: any;
  generalregisterloader = false;

  Surveydataloader = false;
  Surveydataclicked = false;

  idcard: any;
  IDUrl: any;
  IDcardloader = false;
  IDcardclicked = false;

  dateerror = false;

  stastistics: any;
  outstanding: any;
  Statsloader = false;
  Statsclicked = false;

  Studentloader = false;
  Studentclicked = false;

  download_data: any;
  meritlistloader = false;

  Freeship: any;
  Freeshiploader = false;
  Freeshipclicked = false;

  outstandingloader = false;
  Outstandingclicked = false;

  onlyoutstanding: any;
  rollcalltrueloader = false;
  rollcallfalseloader = false;

  oSession!: Sessiondata;

  get f() {
    return this.AadhaarReceiptForm.controls;
  }

  constructor(
    private router: Router,
    private commonService: CommanService,
    private downloadfileService: DownloadFileService,
    private formBuilder: FormBuilder,
    private globaldownloadfiles: GlobalDownloadfiles,
    private globalmessage: GlobalMessage,
    private sessionService: SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

 

  ngOnInit(): void {
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.globalmessage.Show_message('Please Login');
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();


    this.GetBatchApi();
    this.GetAccountinfo(); //prefix

    this.ReceiptForm = new FormGroup({
      //  'batchcode': new FormControl('',Validators.required),
      fromdate: new FormControl('', Validators.required),
      todate: new FormControl('', Validators.required),
    });

    this.AadhaarReceiptForm = new FormGroup({
      aadhaar: new FormControl('', Validators.required),
    });

    this.MeritListForm = new FormGroup({
      batchcode: new FormControl('', Validators.required),
      DocType: new FormControl('', Validators.required),
    });

    this.ProfileListForm = new FormGroup({
      batchcode: new FormControl('', Validators.required),
      fromdate: new FormControl('', Validators.required),
    });

    this.AccountCollectionForm = this.formBuilder.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });

    this.PaymentForm = this.formBuilder.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });

    this.TallyForm = this.formBuilder.group({
      // account: ['', Validators.required],
      paymode: ['', Validators.required],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });

    // this.DetailRegisterForm =  this.formBuilder.group({
    //   'summarytype': new FormControl('', Validators.required),
    //   fromdate: ['', Validators.required],
    //   todate: ['', Validators.required],
    // })
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (t.value < f.value) {
        // this.dialogService.open({ message: "from date should be less than to date", positive: 'Ok', })
        this.dateerror = true;
      }
      return {};
    };
  }

  generateUUID() {
    this.newuid = uuid.v4();
    this.uuidValue = this.newuid.replace(/-/g, '');
    return this.uuidValue;
  }

  GetBatchApi() {
    this.commonService
      .Post_json(GetAllBatchs, '')
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.Batchs = response['data'];
        }
      });
  }

  onChangeBatchSelect() {}

  onAccountcollection() {
    this.Accountloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      fromdate: this.AccountCollectionForm.controls['fromdate'].value,
      todate: this.AccountCollectionForm.controls['todate'].value,
    };
    if (jsonin.fromdate > jsonin.todate) {
      this.globalmessage.Show_message('from date should be less than to date');
    } else {
      this.commonService
        .Post_json(ExcelAccountCollection, jsonin)
        .subscribe((response) => {
          this.res = response;
          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);
          let blob = new Blob([blobb], { type: 'application/blob' });
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

  PaidUnpaidFile() {
    this.Paidunloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json(ExcelPaid_UnPaidList, jsonin)
      .subscribe((response) => {
        this.res = response;
        // console.log("file created",this.filename);
        // this.filename = this.res.excelfile;
        // console.log("file created");
        // this.aurl = DownloadExcel + this.res.excelfile;

        // this.downloadfileService
        //   .download(this.aurl)
        //   .subscribe(blob => saveAs(blob, this.res.excelfile))
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/blob' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.Paidunloader = false;
        this.Paidunclicked = false;
      });
  }

  OnRollcalltypeForm() {
    this.Rollcallloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      reporttype: 'XL',
    };
    this.commonService
      .Post_json(ExcelRollCall, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/blob' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        // console.log("file created");
        // this.filename = this.res.excelfile;
        // console.log("file created");
        // this.RollCallUrl = DownloadExcel + this.res.excelfile;

        // this.downloadfileService
        //   .download(this.RollCallUrl)
        //   .subscribe(blob => saveAs(blob, this.res.excelfile))
        this.Rollcallloader = false;
        this.Rollcallclicked = false;
      });
  }

  Surveydata() {
    this.Surveydataloader = true;

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batchcode: this.BatchCode,
      reporttype: 'XL',
    };
    this.commonService
      .Post_json(Excelsurveydata, jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/blob' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.Surveydataloader = false;
        this.Surveydataclicked = false;
      });
  }

  FeesStructureFile() {
    this.Feesloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json(ExcelFeesStructure, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/blob' });
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

  IdCardDownload() {
    this.IDcardloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService.Post_json(ExcelIDCard, jsonin).subscribe((response) => {
      this.res = response;
      // this.filename = this.res.excelfile;
      // console.log("file created");
      // this.IDUrl = DownloadExcel + this.res.excelfile;
      // this.downloadfileService
      //   .download(this.IDUrl)
      //   .subscribe(blob => saveAs(blob, this.res.excelfile))
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], { type: 'application/blob' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.filename;
      link.click();
      this.IDcardloader = false;
      this.IDcardclicked = false;
    });
  }

  FeeReceiptDownload(): void {
    this.loader = true;
    let jsonin = {
      Finyear: this.oSession.finyear,
      CollegeCode:this.oSession.collegecode,
      UserAadhaar: this.oSession.aadhaar,
      // "BatchCode": this.SelectedBatch.Batch_Code
      BatchCode: this.BatchCode,
    };

    this.commonService
      .Post_json(DownloadReceiptsblob, jsonin)
      .subscribe((data) => {
        let blob = new Blob([data.body], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Billing.pdf';
        link.click();
        this.loader = false;
        this.clicked = false;
      });
  }

  StatisticsDownload() {
    this.Statsloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      // "batchcode": this.SelectedBatch.Batch_Code
    };
    // console.log("Data :", this.stastistics);
    this.commonService
      .Post_json(ExcelStatistics, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.Statsloader = false;
        this.Statsclicked = false;
      });
  }

  FreeshipDownload(approved: string) {
    let onlyapproved: boolean = false;
    if (approved == this.APPROVED) {
      onlyapproved = true;
    }
    this.Freeshiploader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batchcode: 99,
      Onlyappreoved: onlyapproved,
    };

    this.commonService
      .Post_json(excelfreeship, jsonin)
      .subscribe((response) => {
        this.Freeshiploader = false;
        this.Freeshipclicked = false;

        if (response == null) {
          return;
        }
        this.globaldownloadfiles.Downloadfiles(response);

        /*
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);

      let blob = new Blob([blobb], {type: 'application/blob'});

      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.Freeshiploader = false;
      this.Freeshipclicked = false;
       */
      });
  }

  BatchOutstandingDownload() {
    this.outstandingloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      reporttype: 'XL',
    };
    this.commonService
      .Post_json(batchoutstanding, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.outstandingloader = false;
        this.Outstandingclicked = false;
      });
  }

  //formfees
  formfees: any;
  formfeesloader = false;
  formfeesclicked = false;

  FormFeesDownload() {
    this.formfeesloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      reporttype: 'XL',
    };
    this.commonService.Post_json(formfees, jsonin).subscribe((response) => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);

      let blob = new Blob([blobb], { type: 'application/blob' });

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.filename;
      link.click();
      this.formfeesloader = false;
      this.formfeesclicked = false;
    });
  }

  overallloader = false;
  overallclicked = false;
  overalldata: any;

  OverallCollectionDownload() {
    this.overallloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      reporttype: 'XL',
    };
    this.commonService
      .Post_json(Excelbatchcollout, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.overallloader = false;
        this.overallclicked = false;
      });
  }

  // Outstandingloader = false;
  // Outstandingclicked = false;
  // OutstandingDownload() {
  //   this.Outstandingloader = true;
  //   this.outstanding = {
  //     "finyear": this.oSession.finyear,
  //     "collegecode":this.oSession.collegecode,
  //     "useraadhaar": this.oSession.aadhaar
  //     // "batchcode": this.SelectedBatch.Batch_Code
  //   }

  //   this.downloadfileService.ExcelOutstanding(this.outstanding).subscribe(models => {
  //     this.res = models;
  //     //const byteArray = atob( this.res.blobdata);
  //     const contentType = '';
  //     const blobb = base64StringToBlob(this.res.blobdata, contentType);

  //     let blob = new Blob([blobb], { type: 'application/blob' });

  //     var downloadURL = window.URL.createObjectURL(blob);
  //     var link = document.createElement('a');
  //     link.href = downloadURL;
  //     link.download = this.res.excelfile;
  //     link.click();
  //     this.Outstandingloader = false;
  //     this.Outstandingclicked = false;
  //   })
  // }

  DetailRegister() {
    this.DetailRegloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      Reporttype: 'XL',
      Summarytype: '',
      fromdate: this.TallyForm.controls['fromdate'].value,
      todate: this.TallyForm.controls['todate'].value,
    };
    if (
      this.TallyForm.controls['fromdate'].value == '' ||
      this.TallyForm.controls['todate'].value == ''
    ) {
      Swal.fire({
        text: 'Please select from date or to date!',
        icon: 'info',
        confirmButtonText: 'OK',
      }); //alert
      this.DetailRegloader = false;
    } else if (
      this.TallyForm.controls['fromdate'].value == null ||
      this.TallyForm.controls['todate'].value == null
    ) {
      Swal.fire({
        text: 'Please select from date or to date!',
        icon: 'info',
        confirmButtonText: 'OK',
      }); //alert
      this.DetailRegloader = false;
    } else {
      this.commonService
        .Post_json(ExcelDetailRegister, jsonin)
        .subscribe((response) => {
          this.res = response;
          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);

          let blob = new Blob([blobb], { type: 'application/blob' });

          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.res.excelfile;
          link.click();
          this.DetailRegloader = false;
        });
    }
  }

  TallyDetail() {
    this.tallyloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      Reporttype: 'XL',
      Summarytype: '',
      fromdate: this.TallyForm.controls['fromdate'].value,
      todate: this.TallyForm.controls['todate'].value,
    };
    if (
      this.TallyForm.controls['fromdate'].value == '' ||
      this.TallyForm.controls['todate'].value == ''
    ) {
      Swal.fire({
        text: 'Please select from date or to date!',
        icon: 'info',
        confirmButtonText: 'OK',
      }); //alert
      this.tallyloader = false;
    } else if (
      this.TallyForm.controls['fromdate'].value == null ||
      this.TallyForm.controls['todate'].value == null
    ) {
      Swal.fire({
        text: 'Please select from date or to date!',
        icon: 'info',
        confirmButtonText: 'OK',
      }); //alert
      this.tallyloader = false;
    } else {
      this.commonService
        .Post_json(Exceldetailregister_tally, jsonin)
        .subscribe((response) => {
          this.res = response;
          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);

          let blob = new Blob([blobb], { type: 'application/blob' });

          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.res.excelfile;
          link.click();
          this.tallyloader = false;
        });
    }
  }

  StudentAccount() {
    this.Studentloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json(ExcelAccountStudent, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.Studentloader = false;
        this.Studentclicked = false;
      });
  }

  AccountOutloader = false;
  accoutstanding: any;
  AccountOutclicked = false;

  AccountOutstanding() {
    this.AccountOutloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json(ExcelAccountoutstanding, jsonin)
      .subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.AccountOutloader = false;
        this.AccountOutclicked = false;
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
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      onlyoutstanding: loutstanding,
      fromdate: this.PaymentForm.controls['fromdate'].value,
      todate: this.PaymentForm.controls['todate'].value,
    };
    if (jsonin.fromdate > jsonin.todate) {
      this.globalmessage.Show_message('from date should be less than to date');
    } else {
      this.commonService
        .Post_json(ExcelOutstanding, jsonin)
        .subscribe((response) => {
          this.res = response;
          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);

          let blob = new Blob([blobb], { type: 'application/blob' });

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

  meritlist_data: any;

  MeritListDocType() {
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      batchcode: this.BatchCode,
    };
    // console.log("datamyy meritlist_data", this.meritlist_data)
    this.commonService
      .Post_json(merilistbatchdocument, jsonin)
      .subscribe((response) => {
        this.res = response;
        this.docType = response.data;
        // console.log("MERITTTTTTTTTTTTTTTTT", models);

        // const contentType = '';
        // const blobb = base64StringToBlob(this.res.blobdata, contentType);

        // let blob = new Blob([blobb], { type: 'application/blob' });

        // var downloadURL = window.URL.createObjectURL(blob);
        // var link = document.createElement('a');
        // link.href = downloadURL;
        // link.download = this.res.excelfile;
        // link.click();
        // this.AccountOutloader = false;
        // this.AccountOutclicked = false;
      });
  }

  SingleMeritListDownload() {
    this.meritlistloader = true;

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      batchcode: this.BatchCode,
      reporttype: 'PDF',
      documenttype: this.SelectedDocType,
    };
    // console.log("datamyy meritlist_data download_data", this.download_data)
    this.commonService.Post_json(meritlist, jsonin).subscribe((response) => {
      if (response != null) {
        this.res = response;
        // console.log("download_data", models);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.meritlistloader = false;
      }(error: any) => {
        this.meritlistloader = false;
      }
    });
  }

  AllEducationMerit() {
    this.meritlistloader = true;

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      batchcode: this.BatchCode,
      reporttype: 'PDF',
      documenttype: this.SelectedDocType,
    };
    // console.log("datamyy meritlist_data download_data", this.download_data)
    this.commonService.Post_json(meritlist_pg, jsonin).subscribe((response) => {
      if (response != null) {
        this.res = response;
        // console.log("download_data", models);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.meritlistloader = false;
      }(error: any) => {
        this.meritlistloader = false;
      }
    });
  }

  //General Register

  GeneralRegisterDownload() {
    this.generalregisterloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      batchcode: this.BatchCode,
      reporttype: 'XL',
      documenttype: this.SelectedDocType,
    };
    // console.log("datamyy meritlist_data download_data", this.download_data)
    this.commonService.Post_json(generalregister, jsonin).subscribe(
      (response) => {
        this.res = response;
        // console.log("download_data", models);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.generalregisterloader = false;
      },
      (error) => {
        this.generalregisterloader = false;

        if (error.error !== null) {
          Swal.fire({
            title: 'Error!',
            text: error.error.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          Swal.fire({
            title: 'Error!',
            text: error.status + 'Server Error!',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        }
        // this.resetAll();
      }
    );
  }

  profileprint: any;

  Profile_print() {
    // this.profileprint = {
    //   "finyear": this.oSession.finyear,
    //   "collegecode":this.oSession.collegecode,
    //   "batchcode": this.BatchCode,
    //   "reporttype": "XL"
    // }
    // console.log("datamyy meritlist_data profileprint", this.profileprint)
    // this.downloadfileService.merilistbatchdocument(this.profileprint).subscribe(models => {
    //   this.res = models;
    //   console.log("MERITTTTTTTTTTTTTTTTT profileprint", models);
    //   const contentType = '';
    //   const blobb = base64StringToBlob(this.res.blobdata, contentType);
    //   let blob = new Blob([blobb], { type: 'application/blob' });
    //   var downloadURL = window.URL.createObjectURL(blob);
    //   var link = document.createElement('a');
    //   link.href = downloadURL;
    //   link.download = this.res.excelfile;
    //   link.click();
    //   this.AccountOutloader = false;
    //   this.AccountOutclicked = false;
    // })
  }

  ///AutoComplete

  onChangeDocType() {}

  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;

    this.MeritListDocType();

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

  //megha

  StudentProfileDownload() {
    this.StudentProfileloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code:this.oSession.collegecode,
      batch_code: this.BatchCode,
      reporttype: 'PDF',
      fromdate: this.ProfileListForm.controls['fromdate'].value,
      applied_rollcall: '',
    };
    console.log('datamyy', jsonin);
    this.commonService.Post_json(Printprofile, jsonin).subscribe((response) => {
      if (response != null) {
        this.res = response;
        console.log('datamyy', this.res);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.StudentProfileloader = false;
      }
    });
  }

  Printprofile_withoutrollno() {
    this.StudentProfileclicked = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code:this.oSession.collegecode,
      batch_code: this.BatchCode,
      reporttype: 'PDF',
      fromdate: this.ProfileListForm.controls['fromdate'].value,
      applied_rollcall: 'ALL',
    };
    console.log('datamyy', jsonin);
    this.commonService.Post_json(Printprofile, jsonin).subscribe((response) => {
      if (response != null) {
        this.res = response;
        console.log('datamyy', this.res);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.StudentProfileclicked = false;
      }
    });
  }

  //Receipt Report

  ShowReceipt() {
    let jsonin = {
      // "prefix_code":this.SelectedBatch.Prefix_code
      prefix_code: this.Prefix_code,
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      fromdate: this.ReceiptForm.controls['fromdate'].value,
      todate: this.ReceiptForm.controls['todate'].value,
    };
    if (jsonin.fromdate > jsonin.todate) {
      this.globalmessage.Show_message('from date should be less than to date');
    } else {
      this.commonService
        .Post_json(ReceiptReport, jsonin)
        .subscribe((response: {}) => {
          this.res = response;
          this.res = this.res.data;
          this.gridApi.setRowData(this.res.data);
          this.rowss = this.res;
          console.log(this.res);
          // console.log(this.Receipt);
        });
    }
  }

  ShowbyAadhaarReceipt() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode:this.oSession.collegecode,
      aadhaar: this.AadhaarReceiptForm.controls['aadhaar'].value,
    };
    // console.log("ADHHHHH", this.AadhaarReceipt);
    this.commonService
      .Post_json(Aadhaarreceiptlist, jsonin)
      .subscribe((response) => {
        // console.log("ADHHHHH RESSSS", models);
        this.res = response;
        this.res = this.res.data;
        this.rowssbyaadhaar = this.res;
        // console.log("ADHHHHH RESSSS", this.res);
        // console.log(this.Receipt);
      });
  }

  //Grid column

  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    { headerName: 'Batch Name', field: 'Batch_name', resizable: true },
    { headerName: 'Full Name', field: 'FullName', resizable: true },
    { headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true },
    {
      headerName: 'Subject group code',
      field: 'Subject_group_code',
      maxWidth: 100,
      resizable: true,
    },
    { headerName: 'Term Name', field: 'Term_name', resizable: true },
    { headerName: 'BilldeskTran ID', field: 'BilldeskTranID', resizable: true },
    {
      headerName: 'Receipt No',
      field: 'Receiptno',
      maxWidth: 90,
      resizable: true,
    },
    { headerName: 'Transaction Date', field: 'CreatedDate', resizable: true },
    {
      headerName: 'Receipt Amount',
      field: 'Receiptamount',
      maxWidth: 120,
      resizable: true,
    },
    {
      headerName: 'Installment',
      field: 'Installment',
      maxWidth: 80,
      resizable: true,
    },
    {
      headerName: 'Payment_Mode',
      field: 'Payment_Mode',
      maxWidth: 120,
      resizable: true,
    },
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
      maxWidth: 50,
      checkboxSelection: true,
    },
    { headerName: 'Receipt ID', field: 'Receipt_ID', resizable: true },
    { headerName: 'Full Name', field: 'FullName', resizable: true },
    { headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true },
    {
      headerName: 'Subject group code',
      field: 'Subject_group_code',
      maxWidth: 100,
      resizable: true,
    },
    { headerName: 'Term Name', field: 'Term_name', resizable: true },
    { headerName: 'BilldeskTran ID', field: 'BilldeskTranID', resizable: true },
    {
      headerName: 'Receipt No',
      field: 'Receiptno',
      maxWidth: 90,
      resizable: true,
    },
    { headerName: 'Transaction Date', field: 'CreatedDate', resizable: true },
    {
      headerName: 'Receipt Amount',
      field: 'Receiptamount',
      maxWidth: 120,
      resizable: true,
    },
    {
      headerName: 'Installment',
      field: 'Installment',
      maxWidth: 80,
      resizable: true,
    },
    {
      headerName: 'Payment_Mode',
      field: 'Payment_Mode',
      maxWidth: 120,
      resizable: true,
    },
    {
      headerName: 'Print Receipt',
      field: 'Action',
      maxWidth: 80,
      cellRenderer: CellCustomComponent,
    },
  ];

  modal(data: any) {
    let jsonin = {
      college_code: data.College_code,
      finyear: data.Finyear,
      batch_code: data.Batch_code,
      aadhaar: data.Aadhaar,
      receipt_id: data.Receipt_ID,
      reporttype: 'PDF',
    };
    this.commonService.Post_json(Printreceipt, jsonin).subscribe(
      (response) => {
        console.log('models RESSSS', response);
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], { type: 'application/pdf' });
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
          Swal.fire({
            title: 'Error!',
            text: error.error.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          Swal.fire({
            title: 'Error!',
            text: error.status + 'Server Error!',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        }
      }
    );
  }

  //Grid Rows

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {}

  onSelectionChanged(event: any) {}

  onAadhaarSelectionChanged(event: any) {}

  onAadhaarRowSelectedEvent(event: any) {}

  GetAccountinfo() {
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
    };
    this.commonService
      .Post_json(Accountinfo, jsonin)
      .subscribe((response: any) => {
        // this.Prefix = this.res.data.Prefix_desc;

        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.Prefix = response['data'];
        }
        // console.log("Prefix_desc", this.res.data.Prefix_desc);
      });
  }

  //Tally

  TallyPost() {
    this.tallysumloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode:this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      fromdate: this.TallyForm.controls['fromdate'].value,
      todate: this.TallyForm.controls['todate'].value,
      accountno: this.AccountNo,
      paymentmode: this.TallyForm.controls['paymode'].value,
      reporttype: 'XL',
    };
    if (jsonin.fromdate > jsonin.todate) {
      this.globalmessage.Show_message('from date should be less than to date');
      this.tallysumloader = false;
    } else {
      console.log('datamyy', jsonin);
      this.commonService.Post_json(Tally, jsonin).subscribe((response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.tallysumloader = false;
      });
    }
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  };

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
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
  //       // console.log(result);
  //     }, () => {
  //     });
  // }

  ///AutoComplete

  selectPrefix(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    // this.BatchCode = bat.Batch_Code
    this.Prefix_code = bat.Prefix_code;
    this.AccountNo = bat.AccountNo;
    // do something with selected item
  }

  selectaccount(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    // this.BatchCode = bat.Batch_Code
    this.AccountNo = bat.AccountNo;
    // do something with selected item
  }

  Freeshipapproved() {}
}
