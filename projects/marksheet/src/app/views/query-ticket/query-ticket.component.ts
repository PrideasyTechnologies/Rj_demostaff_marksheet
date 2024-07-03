import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {ticketaction, ticketlist} from "../../globals/global-api";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

@Component({
    selector: 'app-query-ticket',
    templateUrl: './query-ticket.component.html',
    styleUrls: ['./query-ticket.component.scss'],
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
    out_rowselected: any;
    Reply = false;
    QueryF = true;
    AssignQuer = false;


    FormReply!: FormGroup;
    AssignQuery!: FormGroup;

    oSession!: Sessiondata;

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);
    // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);

    constructor(private router: Router, private commonService: CommonService,
                private globalmessage: GlobalMessage,private sessionservice : SessionService,
                private formBuilder: FormBuilder) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.QueryForm = new FormGroup({
            'status': new FormControl('', Validators.required),
        })

        this.FormReply = new FormGroup({})

        this.AssignQuery = new FormGroup({})
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
            this.commonService.Post_json(ticketlist, jsonin).subscribe(response => {
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

        this.commonService.Post_json(ticketaction, jsonin).subscribe(response => {
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
        // {
        //     field: '',
        //     maxWidth: 70, checkboxSelection: true
        // },
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

        const out_rowselected = this.gridApi.getSelectedRows();
        console.log("Selection change data:", out_rowselected);

        this.BatchCode = out_rowselected.length === 1 ? out_rowselected[0].Batchcode : '';
        this.StudentAadhaar = out_rowselected.length === 1 ? out_rowselected[0].Aadhaar : '';
        this.Category = out_rowselected.length === 1 ? out_rowselected[0].Category : '';
        this.Description = out_rowselected.length === 1 ? out_rowselected[0].Description : '';
        this.Subject = out_rowselected.length === 1 ? out_rowselected[0].Subject : '';
        this.Ticketid = out_rowselected.length === 1 ? out_rowselected[0].Ticketid : '';
        this.Ticketstatus = out_rowselected.length === 1 ? out_rowselected[0].Ticketstatus : '';
        this.Userdescription = out_rowselected.length === 1 ? out_rowselected[0].Userdescription : '';

        console.log("Selected data:", this.Ticketid);

        console.log('xxxxx', event);
        let selected_outnode = this.gridApi.getSelectedNodes();
        this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
        console.log('Selection updated', this.out_rowselected);
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message(msg);
    }

    //Update

    public rowSelection: 'single' | 'multiple' = 'single';

    ReplyQuery() {

        console.log("ggg", this.out_rowselected)

        if (this.out_rowselected == null) {
            Swal.fire({
                title: 'Error!',
                text: 'Please Select Row!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        } else {
            this.Reply = true;
            this.AssignQuer = false;
        }

    }

    onresetform() {
        this.FormReply.reset();
    }

    Assign() {
        console.log("ggg", this.out_rowselected)

        if (this.out_rowselected == null) {
            Swal.fire({
                title: 'Error!',
                text: 'Please Select Row!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        } else {
            this.Reply = false;
            this.AssignQuer = true;
        }
    }

    RaiseQuery() {
        if (this.out_rowselected.FormReply == null) {
            this.globalmessage.Show_message('Please enter query')
        } else {
            this.gridOptions.out_rout_rowselected;
        }
    }

}

