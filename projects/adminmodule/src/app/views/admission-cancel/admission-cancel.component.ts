import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdmissionCancelService, ITableData} from './admission-cancel.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {DeleteCellCustomComponent} from '../delete-cellcustom/delete-cellcustom.component';
import {CheckCellCustomComponent} from '../checkcell-custom/checkcell-custom.component';
import {CheckDocsUploadCustomComponent} from '../checkdocsupload-custom/checkdocsupload-custom.component';
import {base64StringToBlob} from 'blob-util';
import Swal from 'sweetalert2';
import {CancelToApproveCustomComponent} from '../canceltoapprove-custom/canceltoapprove-custom.component';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {
  AdmissionCancel,
  CancelAdmissionList,
  canceltoapproval,
  downloadcanceldocument, GetAllBatchs,
  viewchequeimage
} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-admission-cancel',
  templateUrl: './admission-cancel.component.html',
  styleUrls: ['./admission-cancel.component.scss'],
  providers: [AdmissionCancelService],
})
export class AdmissionCancelComponent implements OnInit {
  private gridApi: any;
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
  canceltoapprove_data: any;
  Batchs = [];
  SelectedBatch: any;
  Admissioncancel: any;
  isChecked!: boolean;
  downloadloader = false;
  downloaddata: any;
  allloader = false;
  BatchCode: any;
  Batchkeyword = 'Batch_Name';
  StudentAadhaar: any;
  showloader = false;

  oSession!: Sessiondata;


  @ViewChild('infoModal') infoModal: any;

  constructor(private router: Router,private commonService: CommanService,
              private admissioncancelService: AdmissionCancelService,
             private globalmessage: GlobalMessage, private formBuilder: FormBuilder, private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }



  ngOnInit(): void {
    // if (!this.Token) {
    //   // alert("Please Login!")
    //
    //   this.globalmessage.Show_message('Please Login');
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

      this.GetBatchApi();

    // this.AdmissionCancelForm = new FormGroup({

    //   'Batch_Code': new FormControl('', Validators.required),
    //   // 'Aadhaar': new FormControl('', Validators.required),
    // })

  }

  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },

    {headerName: 'Cancel id', field: 'Cancel_id', resizable: true},
    {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true},
    {headerName: 'Reason', field: 'Reason', resizable: true},
    {headerName: 'Bankname', field: 'Bankname', resizable: true},
    {headerName: 'Account holder name', field: 'Accountholdername', resizable: true},
    {headerName: 'Bankbranch', field: 'Bankbranch', resizable: true},
    {headerName: 'Account no', field: 'Accountno', resizable: true},
    {headerName: 'IFSC Code', field: 'Ifsccode', resizable: true},
    {headerName: 'Created Date', field: 'Createddate', resizable: true},
    {headerName: 'Approvedby', field: 'Approvedby', resizable: true},
    {headerName: 'Approved Date', field: 'Approveddate', resizable: true},
    {headerName: 'Batch Name', field: 'Batch_name', resizable: true},

    // { headerName: 'View', field: 'Action',maxWidth: 80, cellRendererFramework: CellCustomComponent },
    {headerName: 'Cancel', field: 'Action', maxWidth: 80, cellRenderer: DeleteCellCustomComponent},
    {headerName: 'Cheque', field: 'Action', maxWidth: 80, cellRenderer: CheckCellCustomComponent},
    {headerName: 'Docs Upload', field: 'Action', maxWidth: 80, cellRenderer: CheckDocsUploadCustomComponent},
    {headerName: 'Approved', field: 'Action', maxWidth: 100, cellRenderer: CancelToApproveCustomComponent},

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


  onRowSelectedEvent(event: any) {
    // console.log("row event:", event.data);
    this.StudentAadhaar = event.data.Aadhaar;
    // this.DeleteData(event);

  }

  onSelectionChanged(event: any) {
    // console.log(event);
  }

  //show button
  ShowGrid() {

  }

  //view button grid
  modal() {
    this.infoModal.show();
  }

  //submit button grid
  EditCell() {
  }

  changeCheckbox(event: any) {
    this.isChecked = event;
    console.log(event);
  }

  //cancel buttob grid
  DeleteSuccessDialog(data: any) {

    

    Swal.fire({
      title: 'Are you sure you want cancel?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.CancelAdmission(data);

      }
    });

  }

  Approve_Dialog(data: any) {

    Swal.fire({
      title: 'Cancel',
      text: "Are you sure you want to approve ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.CancelToApprove(data);
      }
    });
  }

  //View Cheque Image
  downloadfiles: any;
  viewchequedata: any;
  imgSrc: any;

  ViewChequeImage(data: any) {
    let jsonin = {
      'finyear': data.Finyear,
      'college_code': data.College_code,
      'cancel_id': data.Cancel_id,
      'aadhaar': data.Aadhaar,
      'reportype': 'VIEW'
    };
    // console.log("viewchequeimage FFFFFFFF",this.viewchequedata);
    this.commonService.Post_json(viewchequeimage,jsonin).subscribe(response => {
        this.res = response;
        // console.log("sabkajsdcjksd",models);
        // var blob = new Blob( { type: 'image/png' });
        // var url= window.URL.createObjectURL(blob);
        //  window.open(url);
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'image/png'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.file;
        link.click();

      },
      (error) => {
        // this.downloadloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
          Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        } else {
          Swal.fire({title: 'Error!', text: error.status + 'Server Error!', icon: 'error', confirmButtonText: 'OK'});//alert
        }
        // this.resetAll();
      });
  }

  //pdf Viewer
  _base64ToArrayBuffer(base64: any) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  viewdocsdata: any;

  ViewDocsImage(data: any) {
    let jsonin = {
      'finyear': data.Finyear,
      'college_code': data.College_code,
      'cancel_id': data.Cancel_id,
      'aadhaar': data.Aadhaar,
      'reporttype': 'PDF'
    };

    this.commonService.Post_json(downloadcanceldocument,jsonin).subscribe(response => {
        this.res = response;
        // console.log("sabkajsdcjksd",models);
        // var blob = new Blob( { type: 'image/png' });
        // var url= window.URL.createObjectURL(blob);
        //  window.open(url);
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/pdf'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();

      },
      (error) => {
        // this.downloadloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
          Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        } else {
          Swal.fire({title: 'Error!', text: error.status + 'Server Error!', icon: 'error', confirmButtonText: 'OK'});//alert
        }
        // this.resetAll();
      });


  }

  Cancelleddata: any;

  CancelToApprove(data: any) {
    let jsonin = {
      'finyear': data.Finyear,
      'college_code': data.College_code,
      'cancel_id': data.Cancel_id,
      'aadhaar': data.Aadhaar,
      'reporttype': 'XL'
    };

    this.commonService.Post_json(canceltoapproval,jsonin).subscribe(response => {
        this.res = response;
        // this.rowss = this.res.data;
        if (this.res.data == true) {
          Swal.fire({title: 'Approved', text: 'Attached Fees to this student ', icon: 'error', confirmButtonText: 'OK'});//alert
        }
        console.log('cancellist to approve', this.res);
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

  //past api
  CancelAdmission(data: any) {
    console.log(this.isChecked, 'Value of checkbox');
    console.log('Cancel Admission', data);

    // this.Admissioncancel = this.AdmissionCancelForm.value;
    let jsonin = {
      // "aadhaar": this.AdmissionCancelForm.controls['Aadhaar'].value,
      'aadhaar': parseInt(this.StudentAadhaar),
      'useraadhaar': this.oSession.aadhaar,
      'finyear': data.Finyear,
      'collegecode': data.College_code,
      'batchcode': data.Batch_code,
      // "Cancelled": "CANCELLED"
    };

    // console.log("Cancel Admission send body", this.Admissioncancel);
    this.commonService.Post_json(AdmissionCancel,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        this.globalmessage.Show_message('Admission Cancelled Successfully!!');
        // console.log("BATCHHHHHHHHHHHHHHHHHHHHHHHH",this.BatchCode);

        if (this.BatchCode === undefined) {
          this.AllCancelAdmissionLists();
        } else {
          this.CancelAdmissionLists();
        }

        // console.log("Successfully Cancelled ", this.res);
      } else {
        this.globalmessage.Show_error( this.res.message );
      }
      // this.infoModal.hide();
    });

  }


  Alladmissioncancellist: any;
  AllCancelAdmissionLists() {
    this.allloader = true;
    let jsonin = {
      'useraadhaar': this.oSession.aadhaar,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': -99,
      'Showcancelonly': this.isChecked,
    };
    // console.log("all cancel send body",this.Alladmissioncancellist);

    this.commonService.Post_json(CancelAdmissionList,jsonin).subscribe((response: {}) => {
      this.res = response;

      this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
      this.allloader = false;
      // console.log("cancellist", this.res);
    });
  }

  admissioncancellist: any;

  CancelAdmissionLists() {
    this.showloader = true;
    let jsonin = {
      'useraadhaar': this.oSession.aadhaar,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': this.BatchCode,
      'Showcancelonly': this.isChecked,
    };
    // console.log("CancelAdmissionLists",this.admissioncancellist);
    if (this.BatchCode === undefined) {
      Swal.fire({title: 'Error!', text: 'Please Select Batch ', icon: 'error', confirmButtonText: 'OK'});//alert
    } else {
      this.commonService.Post_json(CancelAdmissionList,jsonin).subscribe((response: {}) => {
        this.res = response;
        this.rowss = this.res.data;
        this.showloader = false;
        // console.log("cancellist", this.res);
      });
    }
  }


  DownloadCancelAdmissionList() {
    this.downloadloader = true;
    let jsonin = {
      'useraadhaar': this.oSession.aadhaar,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': this.BatchCode,
      'Showcancelonly': this.isChecked,
      'Reporttype': 'XL'
    };
    console.log('this.downloaddata', jsonin);

    if (this.BatchCode === undefined) {
      this.downloaddata.batchcode = -99;
    }

    console.log('this.downloaddata', jsonin);
    this.commonService.Post_json(CancelAdmissionList,jsonin).subscribe(response => {
        this.res = response;
        // this.rowss = this.res.data;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        //console.log("downloadURL", downloadURL);
        this.downloadloader = false;
      },
      (error) => {
        if (error.error !== null) {
          console.error('error caught in component', error);
          Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'});//alert
          this.downloadloader = false;
        } else {
          Swal.fire({title: 'Error!', text: error.status + 'Server Error!', icon: 'error', confirmButtonText: 'OK'});//alert
          this.downloadloader = false;
        }
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

  onChangeBatchSelect() {
    // console.log(this.SelectedBatch.Batch_Code);
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

  ///AutoComplete


  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
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
