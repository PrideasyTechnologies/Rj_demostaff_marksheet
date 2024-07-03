import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FeeUnAttachmentService, ITableData } from './fee-unattachment.service';
import { GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {GetAllBatchs, Unattachfees, Unpaidstudentslist} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-fee-unattachment',
  templateUrl: './fee-unattachment.component.html',
  styleUrls: ['./fee-unattachment.component.scss'],
  providers: [FeeUnAttachmentService],
})
export class FeeUnAttachmentComponent implements OnInit {
  private gridApi : any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  AdmissionCancelForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch!: any;
  Admissioncancel: any;

  oSession!: Sessiondata;

  @ViewChild('infoModal') infoModal: any;
  constructor(private router: Router,private commonService: CommanService,
              private FeeUnAttachmentService: FeeUnAttachmentService,
             private globalmessage: GlobalMessage, private sessionService : SessionService,
              private formBuilder: FormBuilder) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }

 
  ngOnInit(): void {

    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.globalmessage.Show_message('Please Login')
    //   this.router.navigate(['login']);
    // }
    // else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetBatchApi();



    // this.AdmissionCancelForm = new FormGroup({

    //   'Batch_Code': new FormControl('', Validators.required),
    //   // 'Aadhaar': new FormControl('', Validators.required),
    // })

  }

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  //Grid column
  columnDefs = [
    {
      field: 'Select All',
      maxWidth: 110, checkboxSelection: true, headerCheckboxSelection: true
    },

    {
      headerName: "Aadhaar", field: "Aadhaar", resizable: true,
      headerCheckboxSelection: (params:any)=> {
        const displayedColumns = params.columnApi.getAllDisplayedColumns();
        // console.log("displayedColumns:", displayedColumns)
        return displayedColumns[0] === params.column;
      }
    },
    { headerName: "Full Name", field: "Fullname", resizable: true },
    { headerName: "Mobile Number", field: "Mobilenumber", resizable: true },
    { headerName: "Email Id", field: 'Emailid', resizable: true },
    { headerName: "Admission Status", field: "Admission_status", resizable: true },
    // { headerName: 'Cancel', field: 'Action', maxWidth: 80, cellRendererFramework: DeleteCellCustomComponent },


  ];

  //Grid Rows
  rowss: any = [
    // { Aadhaar: "111111111111" }
  ];

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  StudentAadhaar: any;
  onRowSelectedEvent(event: any) {
    // console.log("row event:", event.data);
    this.StudentAadhaar = event.data.Aadhaar;
    // this.DeleteData(event);

  }
  onSelectionChanged(event: any) {
    // console.log(event);
  }

  unattach: any;
  UnAttach() {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node: any) => node.data.Aadhaar);
    console.log(`Selected Nodes:\n${JSON.stringify(selectedData)}`);

    let jsonin = {
      "aadhaar": selectedData,
      "useraadhaar": this.oSession.aadhaar,
      "finyear": this.oSession.finyear,
      "collegecode": this.oSession.collegecode,
      "batchcode": this.BatchCode
    }
    if (this.BatchCode == null) {
      this.globalmessage.Show_message('Please select Batch and rows to unattach!')
    }
    else {
      console.log("data", jsonin)
      this.commonService.Post_json(Unattachfees,jsonin).subscribe(response=> {
        this.res = response;
        // this.rowss = this.res.data;
        if(this.res.data == true){
          Swal.fire({ title: 'Unattached', text: "UnAttached Fees to this student!", icon: 'success', confirmButtonText: 'OK' })//alert
        }
        else{
          Swal.fire({ title: 'Error', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

        }
      })
    }


  }
  //view button grid
  modal() {
    this.infoModal.show();
  }

  //submit button grid
  EditCell() { }

  unpaidlist: any;
  ShowList() {
    let jsonin = {
      // "useraadhaar": this.Aadhaar,
      "finyear": this.oSession.finyear,
      "collegecode": this.oSession.collegecode,
      "batchcode": this.BatchCode,
    }
    this.commonService.Post_json(Unpaidstudentslist,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.rowss = this.res.data;
      // console.log("Unpaidstudentslist", this.res);
      // if (this.rowss == null) {
      //   this.dialogService.open({ message: 'No Data Found!', positive: 'Ok', })
      // }
    })
  }

  GetBatchApi() {

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    })
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




  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat:any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code
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

}
