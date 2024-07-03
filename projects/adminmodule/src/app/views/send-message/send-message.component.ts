import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SendMessageService, ITableData } from './send-message.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { Router } from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {showallwebsitenames, updatewebsiteremarks} from "../../globals/global-api";
import {Istudentdetails} from "../../models/response";
import {Atkt_studentbatch} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
@Component({
  selector: 'app-bill-desk',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  providers: [SendMessageService],
})

export class SendMessageComponent {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  date: any;
  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  SendMessageForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch: any;
  csvRecords: any[] = [];
  header: boolean = false;
  csvFile!: Array<File>;
  formData = new FormData();
  uploadFile: any;
  loader = false;
  clicked = false;

  Websites: any;
  websitesdata: any;
  SelectedWebsites: any;

  selected_batchstudent_batch: any;
  selected_batchstudent!: Istudentdetails;
  atkt_student_batch!: Istudentdetails[];

  oSession!: Sessiondata;

  @ViewChild('fileImportInput') fileImportInput: any;

  constructor(private router: Router,private commonService: CommanService,
              private sendmessageservice: SendMessageService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }

  // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  // CollegeCode = parseInt(sessionStorage.getItem('College')!);
  // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
  // Token = sessionStorage.getItem('Token');


  ngOnInit(): void {
  
    this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

      this.GetWebsitesApi();
      this.Atkt_studentbatch();

    this.SendMessageForm = new FormGroup({
      'websites': new FormControl('', Validators.required),
      'opendate': new FormControl('', Validators.required),
      'message': new FormControl('', Validators.required),
      'studenttype': new FormControl('', Validators.required),
    })
  }

  onCancel() {
    this.SendMessageForm.reset();
  }

  csvUpload(element: any) {
    this.csvFile = element.target.files;
    // application/vnd.ms-excel
    console.log(this.csvFile[0].type);
    console.log(this.csvFile[0].size);
    if (this.csvFile[0].type == "text/csv" && this.csvFile[0].size < 2400000) {
    }
    else {
      this.globalmessage.Show_message('Only .csv file allowed!')//alert
      this.SendMessageForm.reset();
    }
  }



  Atkt_studentbatch() {
    let jsonin = {
      // 'Boardlevel' : this.atkt_subject_papers.Boardlevel,
      'Aadhaar': 234138901457,
      'Atktformtype': 'ATKT',
    }
    this.commonService.Post_json(Atkt_studentbatch, jsonin).subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('No data found')
        }
        this.atkt_student_batch = response
        // this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
      }
    );

  }
  onSelect_batch() {
    console.log('selec',this.selected_batchstudent)
  }

  GetWebsitesApi() { //Batch select list displaying
    let jsonin = {
      "finyear": this.oSession.finyear,
      "collegecode": this.oSession.collegecode,
      "useraadhaar": this.oSession.aadhaar
    }
    this.commonService.Post_json(showallwebsitenames,jsonin).subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert("No data found");
      }
      else {
        this.Websites = response['data'];

      }
    })
  }

  onChangeWebsitesSelect() {
      console.log('website',this.SelectedWebsites)
  }

  Updatedata: any;
  SubmitMessage() {
    let jsonin = {
      "website_id": this.SelectedWebsites.Website_id,
      "opendate": this.SendMessageForm.controls['opendate'].value,
      "remarks": this.SendMessageForm.controls['message'].value,
    }
    this.commonService.Post_json(updatewebsiteremarks,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        this.globalmessage.Show_message("Data Updated Successfully")//alert
      }
      else {
        this.globalmessage.Show_message( "Failed to Update!")//alert
        this.globalmessage.Show_error( this.res.exception )//alert
      }

    })
}
}
