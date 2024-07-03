import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITableData, MarksheetApprovalService} from './marksheet-approval.service';
import {ColDef, GridOptions} from 'ag-grid-community';
import {CellCustomComponent} from '../cell-custom/cell-custom.component';
import {Router} from '@angular/router';
import {PdfCellCustomComponent} from '../pdfcell-custom/pdfcell-custom.component';
import {
  AdmissionApproval,
  Batchs,
  Documentapproval,
  downurl, FormFeesPaid,
  Marksheetapprovallist,
  printmarksheet, studentsmarksheetlist,
  UpdateDocumentApproval
} from '../../globals/global-api';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-marksheet-approval',
  templateUrl: './marksheet-approval.component.html',
  styleUrls: ['./marksheet-approval.component.scss'],
  providers: [MarksheetApprovalService],
})
export class MarksheetApprovalComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  showpdfbox = false;
  ApprovalForm!: FormGroup;
  DocumentsectionForm!: FormGroup;
  res: any;
  StudentAadhaar: any;
  StudentFullName: any;
  searchValue: any;
  Batchs = [];
  AdmissionStatus: any = '';
  SelectedBatch: any;
  checked: any;
  ShowData: any;
  ShowDataApprove_Reject: any;
  ShowDetails: any;
  page: number = 1;
  Document_ID: any;
  StudentDocument_ID: any;
  Document_Name: any;
  Document_code: any;
  Document_status: any;
  Batch_code: any;
  RefreshGrid: any;
  Reason: any;
  DocumentPath: any;//DocumentPath
  ApprovedBy: any;
  ShowPdf: any;
  downloaddata: any;
  downloadfiles: any;

  Semester: any;
  GridAadhaar: any;
  Template: any;
  Batchexam_id: any;

  zoom: number = 1.0;
  originalSize: boolean = true;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';
  pageVariable: any;

  oSession!: Sessiondata;

  public infoModalvisible = false;

  @ViewChild('infoModal') infoModal: any;
  @ViewChild('primaryModal') primaryModal: any;

  constructor(private router: Router, private commonService: CommanService,
              private MarksheetApprovalService: MarksheetApprovalService,
              private globalmessage: GlobalMessage, private formBuilder: FormBuilder,private sessionService : SessionService) {

    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }



  ngOnInit(): void {

    // if (!this.Token) {
    //   // alert("Please Login!")
    //   // this.openYesNoDialog();
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

    console.log('finn',this.oSession)

      this.GetBatchApi();


    this.ApprovalForm = new FormGroup({
      // 'Batch_Code': new FormControl('', Validators.required),
      Batchs : new FormControl('', Validators.required),
      'Admission_Status': new FormControl('', Validators.required),
    });
    this.DocumentsectionForm = new FormGroup({
      'reasons': new FormControl('', Validators.required),
    });
  }

  //zoom


  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  formFees: any;

  FormFeesPaid() {
    let jsonin = {
      'Finyear': this.oSession.finyear,
      'Collegecode': this.oSession.collegecode,
      'BatchCode': this.BatchCode,
      'Aadhaar': this.StudentAadhaar
    };
    // console.log("prakash", this.formFees);
    this.commonService.Post_json(FormFeesPaid,jsonin).subscribe(response => {
      this.res = response;
      if (this.res.data == true) {
        this.GetPdfApi();
      }
      if (this.res.data == false) {
        Swal.fire({title: 'Message!', text: 'Ask Student to pay form fees!', icon: 'error', confirmButtonText: 'OK'});//alert
      }
      // console.log("fees:", this.res);
    });
  }


  //download button


  DownloadFile() {

    //   this.MarksheetApprovalService
    //     .download(this.downloadfiles)
    //     .subscribe(blob => saveAs(blob, this.StudentAadhaar + '.jpeg'));
    //
  }

  // downurl = "http://www.admission.rjcollege.edu.in:7001/cancellcheque/";
  DownloadCell() {
    // alert("hello");
    this.DownloadFile();
    // this.downloadfiles = this.downurl + this.StudentAadhaar+"_CHQ"+".jpeg";
    this.downloadfiles = downurl + this.StudentAadhaar + '_CHQ' + '.jpg';
    this.DownloadCell1();

  }

  DownloadCell1() {
    // alert("hello");
    this.DownloadFile();
    this.downloadfiles = downurl + this.StudentAadhaar + '_CHQ' + '.jpeg';
    // this.downloadfiles = this.downurl + this.StudentAadhaar+"_CHQ"+".jpg";
    // this.url;

  }

  public rowSelection: 'single' | 'multiple' = 'single';


  columnDefs = [//grid1
    {
      field: 'Select',
      maxWidth: 50, checkboxSelection: true
    },
    // {headerName: 'View', field: 'Documents', maxWidth: 80, cellRenderer: CellCustomComponent},
    // { headerName: 'View', field: 'Documents', maxWidth: 100, cellRendererFramework: DownloadCellCustomComponent },
    {headerName: 'Aadhaar', field: 'Aadhaar',editable: true, sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Login aadhaar', field: 'Useraadhaar',Useraadhaar: true, sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Modified date', field: 'Modifydate',Modifydate: true, sortable: true, filter: true, floatingFilter: true, resizable: true},

    {headerName: 'Fees attached by', field: 'Useraadhaar',Useraadhaar: true, sortable: true, filter: true, floatingFilter: true, resizable: true},

    {
      headerName: 'Studenttype',
      field: 'Studenttype',
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },
    {
      headerName: 'Admission Status',
      field: 'Admission_Status',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 100,
      resizable: true
    },
    {headerName: 'Formfees', field: 'Formfees', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Fullname', field: 'Fullname', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {
      headerName: 'MobileNumber',
      field: 'MobileNumber',
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },
    {headerName: 'EmailID', field: 'EmailID', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {
      headerName: 'SubjectCode',
      field: 'Subject_group_code',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 120,
      resizable: true
    },
    {
      headerName: 'SubjectName',
      field: 'Subject_group_name',
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },
    {
      headerName: 'Batch Name',
      field: 'Batch_name',
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },
    {
      headerName: 'Batch Short',
      field: 'Batch_short',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 100,
      resizable: true
    },
    {
      headerName: 'Gender',
      field: 'Gender',
      maxWidth: 100,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },

    {
      headerName: 'Inhouse',
      field: 'Inhouse',
      maxWidth: 100,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true
    },
    {
      headerName: 'Hindi linguistic',
      field: 'Hindilinguistic',
      sortable: true,
      filter: true,
      floatingFilter: true,
      maxWidth: 100,
      resizable: true
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  // columnData = [//grid2
  //   {
  //     field: '',
  //     maxWidth: 50, checkboxSelection: true
  //   },
  //   { headerName: "Aadhaar", field: "Aadhaar", maxWidth: 120, resizable: true },
  //   { headerName: "Document_Name", field: "Document_Name", resizable: true },
  //   { headerName: "Document_status", field: "Document_status", resizable: true },
  //   { headerName: "Reason", field: "Reason", resizable: true },
  //   { headerName: 'ApprovedBy', field: 'ApprovedBy', resizable: true },
  //   { headerName: 'Upload Status', field: 'Upload_Status', maxWidth: 120, resizable: true },
  columnData = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    {headerName: 'Batch_name', minWidth: 500, field: 'Batch_name', resizable: true},
    {headerName: 'Exam Name', minWidth: 200, field: 'Userexamname', resizable: true},
    // { headerName: "Semester", field: "Semester", resizable: true },

    {headerName: 'Documents', field: 'Document_Filename ', cellRendererFramework: PdfCellCustomComponent}
  ];

  column = [//grid3
    {headerName: 'Aadhaar', field: 'Aadhaar', maxWidth: 120, resizable: true},
    {headerName: 'Marksheet No', field: 'MarksheetNo', resizable: true},
    {headerName: 'Grades Or Marks', field: 'GradesOrMarks', resizable: true},
    {headerName: 'Marks Obtained', field: 'MarksObtained', resizable: true},
    {headerName: 'OutOff', field: 'OutOff', maxWidth: 120, resizable: true},
    {headerName: 'Percentage', field: 'Percentage', maxWidth: 120, resizable: true},
    {headerName: 'RollNo', field: 'RollNo', resizable: true},
    {headerName: 'Document_Type', field: 'Document_Type', resizable: true},
    {headerName: 'Board', field: 'Board', resizable: true},
    {headerName: 'State', field: 'State', resizable: true},
    {headerName: 'Education_board', field: 'Education_board', resizable: true},
    {headerName: 'College_name', field: 'College_name', resizable: true},
    {headerName: 'Datepass', field: 'Datepass', maxWidth: 120, resizable: true},
    {headerName: 'CreatedDate', field: 'CreatedDate', resizable: true},
    {headerName: 'BatchStream', field: 'BatchStream', resizable: true},
  ];


  // { headerName: 'Documents', field: 'marksheet ', cellRendererFramework: CellCustomComponent },


  rowss: any = [];//grid 1
  rowData: any = [];//grid 2

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    params.columnApi.autoSizeAllColumns();
  }

  onRowSelectedEvent(event: any) {//on checkbox selection
    this.StudentAadhaar = -99;
    this.StudentFullName = '';
    if (event.data.Aadhaar > 0) {
      this.StudentAadhaar = event.data.Aadhaar;
    }
    if (event.data.Fullname == !null) {
      this.StudentFullName = event.data.Fullname;
    }
  }

  out_rowselected: any

  onSelectionChanged(event: any) {
    // console.log("Selection data:", event);
    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
  }

  onRowSelectedEvent1(event: any) {
    this.StudentDocument_ID = event.data.Document_ID;
    this.StudentAadhaar = event.data.Aadhaar;
    this.Document_code = event.data.Document_code;
    this.Document_status = event.data.Document_status;
    this.Document_Name = event.data.Document_Name;
    this.DocumentPath = event.data.Document_Filename;
    this.Reason = event.data.Reason;

    // console.log("row select", event.data)
  }

  Viewmarksheet(){
    this.infoModalvisible = true;

  }
  onSelectionChanged1(event: any) {
    // console.log("Selection data:", event);
  }

  onRowSelectedEvent3(event: any) {
    // console.log("row select", event.data)
  }

  onSelectionChanged3(event: any) {
    // console.log("Selection data:", event);
  }


  ClosePdf() {
    this.showpdfbox = false;
  }

  showGrid: any;

  MarksheetDetails() {//to show modal on button click (grid list 2)

    // this.ShowData = {
    //   // "BatchCode": this.SelectedBatch.Batch_Code,
    //   "BatchCode": this.BatchCode,
    //   "Aadhaar": this.StudentAadhaar,
    //   "Collegecode": this.oSession.collegecode,
    //   "Finyear": this.oSession.finyear
    // }
    // console.log("ShowPdf:", this.ShowPdf);
    // this.MarksheetApprovalService.EducationDetails(this.ShowData).subscribe(models => {
    //   this.res = models;
    //   // debugger;
    //   this.rowData1 = this.res.data;
    //   console.log("Student Details ", this.res);
    // })
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'aadhaar': this.StudentAadhaar
    };
    this.commonService.Post_json(studentsmarksheetlist,jsonin).subscribe((response: {}) => {
      this.res = response;
      // console.log("Data :", this.res);

      this.rowData = this.res.data;
    });
  }


  Marksheetpdf() {//to show modal on button click (grid list of Documents)

    let jsonin = {
      // "BatchCode": this.SelectedBatch.Batch_Code,
      'BatchCode': this.BatchCode,
      'Aadhaar': this.StudentAadhaar,
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear
    };
    // console.log("ShowPdf:",this.ShowPdf);
    this.commonService.Post_json(Documentapproval,jsonin).subscribe((response: {}) => {
      this.res = response;
      // debugger;
      this.rowData = this.res.data;
    });
  }

  UpdateDocumentApproval() {//grid AFTER approve/reject refresh
    let jsonin = {
      'Document_ID': this.StudentDocument_ID,
      'Aadhaar': this.StudentAadhaar,
      'Finyear': this.oSession.finyear,
      'College_code': this.oSession.collegecode,
      // "Batch_code": this.SelectedBatch.Batch_Code,
      'Batch_code': this.BatchCode,
      'Document_code': this.Document_code,
      'Document_Name': this.Document_Name,
      'Document_status': this.AdmissionStatus,
      'Reason': this.DocumentsectionForm.controls['reasons'].value,
      'ApprovedBy': this.oSession.aadhaar
    };

    this.commonService.Post_json(UpdateDocumentApproval,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.rowData = this.res.data;
      // this.Marksheetpdf();
      this.showpdfbox = false;
      this.DocumentsectionForm.reset();
      this.infoModalvisible = false;
    });

  }

  //cell component button click


  OpenPdfDoc(selectedrow: any) {//cell component button click
    this.Batch_code = selectedrow.Batch_code;
    this.Semester = selectedrow.Semester;
    this.Batchexam_id = selectedrow.Batchexam_id;
    this.GridAadhaar = selectedrow.Aadhaar;
    this.Template = selectedrow.Template;
    // this.primaryModal.show();
    this.showpdfbox = true;
    // this.GetPdfApi();
    this.FormFeesPaid();
  }

  modal() {
    // if (this.StudentAadhaar == null) {
    //   alert("please select row");
    // }
    // else {
    this.showpdfbox = false;
    this.infoModal.show();

    // this.Marksheetpdf();
    this.MarksheetDetails();
    // this.showpdfbox=true;
    // }
  }

  Admission_Status: Array<Object> = [
    {status: 'PENDING'},
    {status: 'APPROVED'},
    {status: 'REJECTED'},
    {status: 'CANCELLED'},
    {status: 'FEES UNTAGED'}
  ];


  ShowApprove() { //Show Button

    this.ShowData = this.ApprovalForm.value;
    this.ShowData = {
      'admission_status': this.ApprovalForm.controls['Admission_Status'].value,
      'finyear': this.oSession.finyear,
      'collegeCode': this.oSession.collegecode,
      // "batchCode": this.SelectedBatch.Batch_Code,
      'batchCode': this.BatchCode,
      'aadhaar': -99
    };
    this.GridApi();
  }

  GridApi() {//grid api on show button
    let jsonin = {
      'admission_status': this.ApprovalForm.controls['Admission_Status'].value,
      'finyear': this.oSession.finyear,
      'collegeCode': this.oSession.collegecode,
      // "batchCode": this.SelectedBatch.Batch_Code,
      'batchCode': this.BatchCode,
      'aadhaar': -99
    };
    this.commonService.Post_json(Marksheetapprovallist,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.gridApi.setRowData(this.res.data);
      this.rowss = this.res.data;
      // this.infoModal.hide();//Modal close

    });

  }

  ApproveData() { //Approve button

    this.AdmissionStatus = 'APPROVED';
    // console.log(this.ApprovalForm.value);
    this.checked = {
      'admission_status': this.AdmissionStatus,
      'finyear': this.oSession.finyear,
      'collegeCode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'aadhaar': this.StudentAadhaar,
      'fullName': this.StudentFullName,
    };
    this.ApiApprove();
    this.UpdateDocumentApproval();
   this.infoModalvisible = false//Modal close
    this.showpdfbox = false;
    this.GridApi();
    this.ShowApprove();
    // console.log("My Data:", this.onRowSelectedEvent);

  }


  onReject() { //Reject Button
    this.AdmissionStatus = 'REJECTED';
    // console.log(this.ApprovalForm.value);
    this.checked = {
      'admission_status': this.AdmissionStatus,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'aadhaar': this.StudentAadhaar
    };

    // console.log("My Data:", this.onRowSelectedEvent);
    this.ApiApprove_Reject();
    this.UpdateDocumentApproval();
    this.showpdfbox = false;
    // this.primaryModal.hide();
    this.infoModal.hide();//Modal close
    this.GridApi();
  }

  ApiApprove() {
    let jsonin = {
      'admission_status': this.AdmissionStatus,
      'finyear': this.oSession.finyear,
      'collegeCode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'aadhaar': this.StudentAadhaar,
      'Useraadhaar': this.oSession.aadhaar,
      'fullName': this.StudentFullName
    };//Approve/Rejpect Ai
    this.commonService.Post_json(AdmissionApproval,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        console.log("Response ", this.res);
        this.globalmessage.Show_successmessage("Data approved.")
        this.infoModalvisible = false//Modal close
        this.GridApi();//Refresh grid
      } else {
        // this.Failed();
        this.infoModalvisible = false
        // this.infoModal.hide();
      }
    });
  }

  ApiApprove_Reject() {
    let jsonin = {
      'admission_status': this.AdmissionStatus,
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'aadhaar': this.StudentAadhaar
    };//Approve/Rejpect Ai
    this.commonService.Post_json(AdmissionApproval,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        // console.log("Response ", this.res);
        this.infoModal.hide();//Modal close
        this.GridApi();//Refresh grid
      } else {
        // this.Failed();
        this.infoModal.hide();
      }
    });

  }


  GetBatchApi() {

    this.commonService.Post_json(Batchs,"").subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      console.log('Batchdata',this.Batchs)
      }
    });
  }

  onChangeBatchSelect() {
    // console.log(this.SelectedBatch.Batch_Code);
  }


  // openYesNoDialog() {
  //
  //   this.dialogService.open(
  //     {
  //       title: '',
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

  ApprovedDialog() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Are You Sure!...You Want To  Approve?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.ApproveData();
        // this.infoModal.hide();
        this.infoModalvisible = false;

      }
    })
  }


  // Failed() {
  //
  //   this.dialogService.open(
  //     {
  //       title: '',
  //       message: this.res.message,
  //       positive: 'Ok',
  //       // negative: 'Cancel',
  //       // neutral: 'Not sure'
  //     })
  //     .then(result => {
  //       // console.log(result);
  //     }, () => {
  //     });
  // }


  RejectedDialog() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Are You Sure!...You Want To Reject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
          this.onReject();{
  }
  })
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

//print marksheet api
  pdfSrc = this._base64ToArrayBuffer('');
  downloadData: any;

  GetPdfApi() {
    // this.pdfSrc = BASEURL + this.DocumentPath;
    // console.log(this.pdfSrc);
    let jsonin = {
      'finyear': this.oSession.finyear,
      'college_code': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      'template': this.Template,
      'batch_code': this.Batch_code,
      'semester': this.Semester,
      'batchexam_id': this.Batchexam_id,
      'aadhaar': this.GridAadhaar
    };
    if (this.Batch_code == null) {
      alert('Please Select row to view Marksheet!');
    } else {
      this.commonService.Post_json(printmarksheet,jsonin).subscribe(response => {
        this.res = response;
        const contentType = '';
        this.pdfSrc = this._base64ToArrayBuffer(this.res.blobdata);
      });
    }
  }

  ///AutoComplete


  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
    // do something with selected item
    console.log('batchcode',this.BatchCode)
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }


  // public visible = false;

  toggleLiveDemo() {
    this.infoModalvisible = false;
  }

  // handleLiveDemoChange(event: any) {
  //   this.visible = event;
  // }

  ResetMarksheetapproval(){
    this.ApprovalForm.reset()
  }


}
