import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {QueryTicketService} from './query-ticket.service';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ITicketdetails} from "../../models/response";
import {CommonService} from "../../../../../marksheet/src/app/globals/common.service";
import {ticketaction, ticketdetails, ticketlist, ticketreplay} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
    selector: 'app-query-ticket',
    templateUrl: './query-ticket.component.html',
    styleUrls: ['./query-ticket.component.scss'],
    providers: [QueryTicketService],
})


export class QueryTicketComponent implements OnInit {
    private gridApi: any;
    private gridColumnApi: any;
    gridOptions: any;
    QueryForm!: FormGroup;
    searchValue: any;

    res: any;

    StudentAadhaar: any;
    BatchCode: any;
    Category: any;
    Description: any;
    Subject: any;
    Ticketid: any;
    Ticketstatus: any;
    Userdescription!: ""
    selectedRows : any ;
  visible = false;
  detailticket! : ITicketdetails[];

  oSession!: Sessiondata;



  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(private router: Router,private commonService: CommonService,
                private Queryticketservice: QueryTicketService,
                private globalmessage:GlobalMessage,
                private formBuilder: FormBuilder,private sessionService : SessionService) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    ngOnInit(): void {
        // if (!this.Token) {
        //     Swal.fire({title: 'Message!', text: "Please Login!", icon: 'info', confirmButtonText: 'OK'})//alert
        //     this.router.navigate(['login']);
        // } else {
        // }

        this.oSession = new Sessiondata(this.sessionService)
		  this.oSession.Getdatafromstroage();

        this.QueryForm = new FormGroup({
            'status': new FormControl('', Validators.required),
            'texteditorone': new FormControl('', Validators.required),
        })
    }

    onChangeStatusSelect() {
        this.QueryData();
    }

    QueryData() {
        let jsonin = {
            "finyear": this.oSession.finyear,
            "collegecode": this.oSession.collegecode,
            "useraadhaar": this.oSession.aadhaar,
            "ticketstatus": this.QueryForm.controls['status'].value
        }
        if (this.QueryForm.controls['status'].value == "") {
            Swal.fire({title: 'Message!', text: "Please Select Status!", icon: 'info', confirmButtonText: 'OK'})//alert
        } else {
            this.commonService.Post_json(ticketlist,jsonin).subscribe(response => {
                console.log(response);
                this.res = response;
                this.gridOptions.api.setRowData(this.res.data);
                this.rowss = this.res.data;

            })
        }
    }

    OnActionClick() {

        let jsonin = {
            "finyear": this.oSession.finyear,
            "collegecode": this.oSession.collegecode,
            "batchcode": this.BatchCode,
            "aadhaar": this.StudentAadhaar,
            "category": this.Category,
            "subject": this.Subject,
            "description": this.Description,
            "ticketid": this.Ticketid,
            "ticketstatus": this.Ticketstatus,
            "userdescription": this.Userdescription
        }

        this.commonService.Post_json(ticketaction,jsonin).subscribe(response => {
            this.res = response;
            console.log(this.res);
            // if (models.data == true) {
            //   this.openYesNoDialog("Your Ticket is Submitted Successfully!")
            // Swal.fire({ title: 'Success!', text: "", icon: 'success', confirmButtonText: 'OK' })//alert

            // }
            // else {
            // Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

            // }
        })
    }

    //Grid column
    columnDefs = [
        {
            field: '',
            maxWidth: 70, checkboxSelection: true
        },
        {headerName: "Aadhaar", field: "Aadhaar", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Batch Code", field: "Batchcode", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Finyear", field: "Finyear", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Ticked ID", field: "Ticketid", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Category", field: "Category", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Subject", field: "Subject", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Assigned To", field: "Assigneduser", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Description", field: "Description", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Ticket Status", field: "Ticketstatus", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "User Description", field: "Userdescription", resizable: true, sortable: true, filter: true, floatingFilter: true},
        {headerName: "Ticket Date", field: "Ticketdate", resizable: true, sortable: true, filter: true, floatingFilter: true},
    ];

    //Grid Rows
    rowss: any = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    // height: '15rem',
    minHeight: '15rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

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

    onSelectionChanged(event: any) {

        const selectedRows = this.gridApi.getSelectedRows();
        console.log("Selection change data:", selectedRows);

        this.BatchCode = selectedRows.length === 1 ? selectedRows[0].Batchcode : '';
        this.StudentAadhaar = selectedRows.length === 1 ? selectedRows[0].Aadhaar : '';
        this.Category = selectedRows.length === 1 ? selectedRows[0].Category : '';
        this.Description = selectedRows.length === 1 ? selectedRows[0].Description : '';
        this.Subject = selectedRows.length === 1 ? selectedRows[0].Subject : '';
        this.Ticketid = selectedRows.length === 1 ? selectedRows[0].Ticketid : '';
        this.Ticketstatus = selectedRows.length === 1 ? selectedRows[0].Ticketstatus : '';
        this.Userdescription = selectedRows.length === 1 ? selectedRows[0].Userdescription : '';

        console.log("Selected data:", this.Ticketid);

    }

    openYesNoDialog(msg:any) {
    this.globalmessage.Show_message(msg);
    }



  ShowTicket(){

    this.visible = !this.visible;

    // let xyz = JSON.stringify(this.selectedRows)
    // let jsonObj = JSON.parse(xyz);

    let jsonin = {
      Ticketid: parseInt(this.Ticketid),
    }
    {
      this.commonService.Post_json(ticketdetails,jsonin).subscribe((response) => {
          if (response == null) {
            return;
          }
          this.detailticket = response
        }
      );
    }
  }

  ReplyQuery(){

    // let xyz = JSON.stringify(this.selectedRows)
    // let jsonObj = JSON.parse(xyz);

    let rquery = {
      Ticketid: parseInt(this.Ticketid),
      Aadhaar: this.oSession.aadhaar,
      Ticketdescription: this.QueryForm.controls['texteditorone'].value.replace(/<[^>]*>/g, ''),
      Useraadhaar: this.oSession.aadhaar,
    }

    {
      this.commonService.Post_json(ticketreplay,rquery).subscribe((response) => {

          if (response == null) {
            return;
          }
          if (response == rquery)
            this.detailticket = response
          this.globalmessage.Show_message('Ticket updated successfully')

        }
      );
    }

  }
  Closeticket() {
    alert('Are you sure you want to close the ticket?');
    // let xyz = JSON.stringify(this.selectedRows)
    // let jsonObj = JSON.parse(xyz);

    let closeticket = {
      Ticketid: parseInt(this.Ticketid),
      'Aadhaar': this.oSession.aadhaar,
      'Ticketaction': "CLOSE",
    }
    {
      this.commonService.Post_json(ticketaction,closeticket).subscribe((response) => {
        if (response == null) {
          return;
        }
        if (response == true) {
          this.globalmessage.Show_message('Ticket closed successfully');
        }
      });
    }
  }

}
