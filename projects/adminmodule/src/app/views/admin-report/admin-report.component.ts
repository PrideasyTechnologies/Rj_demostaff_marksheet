import { Component } from '@angular/core';
import {base64StringToBlob} from "blob-util";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {GlobalDownloadfiles} from "../../globals/download_global";
import {GlobalMessage} from "../../globals/global.message";
import {GridOptions} from "ag-grid-community";
import {AdminReportService} from "./admin-report.service";
import {CommanService} from "../../globals/common.services";
import {
  excelfreeship,
  ExcelIDCard,
  ExcelRollCall,
  ExcelStatistics,
  Excelsurveydata, GetAllBatchs,
  merilistbatchdocument
} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent {

  Batchs: any;
  res: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  Rollcallloader = false;
  rollcallfile: any;
  Rollcallclicked = false;

  Surveydataloader = false;
  Surveydataclicked = false;

  Freeshiploader = false;
  Freeshipclicked = false;
  Freeshipapproveloader = false;

  IDcardloader = false;
  idcard: any;
  IDcardclicked = false;

  Statsloader = false;
  stastistics: any;
  Statsclicked = false;

  docType: any;
  gridOptions: any;

  oSession!: Sessiondata;

  public ALLDATA = 'ALL';
  public APPROVED = 'APPROVED';

  constructor(private router: Router,
              private downloadfileService: AdminReportService,
              private formBuilder: FormBuilder,
              private globaldownloadfiles: GlobalDownloadfiles,
              private globalmessage: GlobalMessage,
              private commonService: CommanService, private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();


      this.GetBatchApi();
      // this.GetAccountinfo();//prefix

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

  meritlist_data: any;

  MeritListDocType() {
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': this.BatchCode,

    };
    // console.log("datamyy meritlist_data", this.meritlist_data)
    this.commonService.Post_json(merilistbatchdocument,jsonin).subscribe(response => {
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

  OnRollcalltypeForm() {
    this.Rollcallloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'reporttype': 'XL'
    };
    this.commonService.Post_json(ExcelRollCall,jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
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
  Surveydata(){
    this.Surveydataloader = true;

    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      'batchcode': this.BatchCode,
      'reporttype': 'XL'
    };
    this.commonService.Post_json(Excelsurveydata,jsonin).subscribe(response => {
      if (response == null){
        return ;
      }
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.filename;
      link.click();
      this.Surveydataloader = false;
      this.Surveydataclicked = false;
    });

  }
  IdCardDownload() {
    this.IDcardloader = true;
    let jsonin= {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
    };
    this.commonService.Post_json(ExcelIDCard,jsonin).subscribe(response => {
      this.res = response;
      // this.filename = this.res.excelfile;
      // console.log("file created");
      // this.IDUrl = DownloadExcel + this.res.excelfile;
      // this.downloadfileService
      //   .download(this.IDUrl)
      //   .subscribe(blob => saveAs(blob, this.res.excelfile))
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.filename;
      link.click();
      this.IDcardloader = false;
      this.IDcardclicked = false;
    });
  }


  StatisticsDownload() {
    this.Statsloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar
      // "batchcode": this.SelectedBatch.Batch_Code
    };
    // console.log("Data :", this.stastistics);
    this.commonService.Post_json(ExcelStatistics,jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);

      let blob = new Blob([blobb], {type: 'application/blob'});

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.Statsloader = false;
      this.Statsclicked = false;
    });
  }
  FreeshipDownload(approved: string ) {

    let onlyapproved : boolean = false ;
    if (approved == this.APPROVED) {
      onlyapproved = true ;
    }
    this.Freeshiploader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      'batchcode': 99,
      'Onlyappreoved':onlyapproved
    };

    this.commonService.Post_json(excelfreeship,jsonin).subscribe(response => {
      this.Freeshiploader = false;
      this.Freeshipclicked = false;

      if(response == null){
        return ;
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

}
