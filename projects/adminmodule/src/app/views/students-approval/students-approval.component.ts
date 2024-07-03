import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ITableData,
  StudentsApprovalService,
} from './students-approval.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { Router } from '@angular/router';
import { PdfCellCustomComponent } from '../pdfcell-custom/pdfcell-custom.component';
import { DownloadCellCustomComponent } from '../downloadcell-custom/downloadcell-custom.component';

import {
  downurl,
  ViewDocument,
  UpdateDocumentApproval,
  EducationDetails,
  AdmissionApproval,
  Batchs,
  AdmissionApprovallist,
  Reservationdetails,
  Educationapproval,
  Documentapproval,
  Finalapproval,
  AdmissionApprovallist_aadhaar,
} from '../../globals/global-api';
import Swal from 'sweetalert2';
import { base64StringToBlob } from 'blob-util';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import {
  Ires_AdmissionApprovallist,
  Ires_DocumentAprroval,
  Ires_EducationDetails,
  Ires_ViewDocument,
  Ires_reservationdetail,
  Ires_aadhaarapprovallist,
} from '../../models/response';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreService } from '../../globals/store.service';

@Component({
  selector: 'app-students-approval',
  templateUrl: './students-approval.component.html',
  styleUrls: ['./students-approval.component.scss'],
  providers: [StudentsApprovalService],
})
export class StudentsApprovalComponent implements OnInit {
  public infoModalvisible = false;
  public infoModal_aadhaar = false;
  private gridApi: any;

  private gridApi_edu: any;
  private gridColumnApi: any;

  activePane = 0;

  private gridApi_edu_aadhaar: any;
  private gridColumnApi_aadhaar_modal: any;

  private gridApi_aadhaar: any;
  private gridColumnApi_aadhaar: any;

  gridOptions: any;
  gridOptions_edu: any;
  gridOptions_aadhaar: any;

  gridOptions_edu_modalaadhaar: any;

  error: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  showpdfbox = false;
  showpdfbox_aadhar = false;

  closeloader: boolean = false;

  ShowReservationdetails: boolean = false;

  ShowReservationdetails_aadhar: boolean = false;

  ShowDiasability: boolean = false;
  ShowDiasability_aadhar: boolean = false;

  ShowOtherDetails: boolean = false;
  ShowOtherDetails_aadhar: boolean = false;

  ShowDYDEPART1: boolean = false;
  ShowDYDEPART1_aadhar: boolean = false;

  ShowDYDEPART2: boolean = false;
  ShowDYDEPART2_aadhar: boolean = false;


  ApprovalForm!: FormGroup;
  DocumentsectionForm!: FormGroup;
  Documentsection_aadhaar_Form!: FormGroup;
  ApproveForm!: FormGroup;

  aadhaarApprovalForm!: FormGroup;
  res: any;
  StudentAadhaar: any;
  StudentFullName: any;
  searchValue: any;
  Batchs = [];
  AdmissionStatus: any;
  checked: any;
  ShowData: any;
  pdfData: any;
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
  DocumentPath: any; //DocumentPath
  ApprovedBy: any;
  ShowPdf: any;
  res_aadhaarapprovallist!: Ires_aadhaarapprovallist[];

  selected_data_aadhar!:Ires_aadhaarapprovallist;

  showloader = false;
  showloader_aadhaar = false;

  zoom: number = 1.0;

  downloadfiles: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  res_admissionapprovalist: Ires_AdmissionApprovallist[] = []; //grid 1
  rowData: Ires_DocumentAprroval[] = []; //grid 2

  res_educationdetails: Ires_EducationDetails[] = []; //grid 3

  res_educationdetails_aadhar: Ires_EducationDetails[] = []; //grid 4

  oSession!: Sessiondata;

  selected_data!: Ires_AdmissionApprovallist;

  selected_Education!: Ires_EducationDetails;

  selected_Education_aadhaar!: Ires_EducationDetails;

  resp_viewdocument!: Ires_ViewDocument;

  resp_aadhaar_viewdocument!: Ires_ViewDocument;

  res_reservationdetails!: Ires_reservationdetail[];

  res_aadhaar_reservationdetails!: Ires_reservationdetail[];

  res_educationapproval: any;

  MyImage: any;

  MyImage_aadhar: any;

  selectedmodaldata!: Ires_AdmissionApprovallist;

  selectedmodaldata_aadhaar!: Ires_AdmissionApprovallist;


  //loader

  finalsubmitloader_aadhar = false;

  viewmarksheet_aadharloader = false;

  marksheetviewrejectloader = false;
  marksheetviewapproveloader = false;

  reservationviewloader = false;
  disabilityviewloader = false;
  otherreservationviewloader = false;

  reservationrejectloader = false;
  reservationapproveloader = false;

  disabilityrejectloader = false;
  disabilityapproveloader = false;

  otherreservationrejectloader = false;
  otherreservationapproveloader = false;

  finalsubmitloader = false;


  @ViewChild('infoModal') infoModal: any;
  @ViewChild('primaryModal') primaryModal: any;
  // @ViewChild('approveModal') approveModal: any;

  public approveModal = false;

  public rowSelection_aprroval: 'single' | 'multiple' = 'single';
  public rowSelection_edu: 'single' | 'multiple' = 'single';

  public rowSelection_edu_aadhaar: 'single' | 'multiple' = 'single';

  constructor(
    private router: Router,
    private commonService: CommanService,
    private studentsapprovalService: StudentsApprovalService,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    public store: StoreService,
    private sanitizer: DomSanitizer
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };

    this.gridOptions_edu = <GridOptions>{
      context: {
        componentParent: this,
      },
    };

    this.gridOptions_aadhaar = <GridOptions>{
      context: {
        componentParent: this,
      },
    };

    this.gridOptions_edu_modalaadhaar = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  ngOnInit(): void {
    this.oSession = new Sessiondata(this.sessionService);
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();

    // this.Get_Reservationdetails();

    this.ApprovalForm = new FormGroup({
      Batchs: new FormControl('', Validators.required),
      Admission_Status: new FormControl('', Validators.required),
    });
    this.DocumentsectionForm = new FormGroup({
      reasons: new FormControl('', Validators.required),
      reservation_reasons: new FormControl('', Validators.required),
      disability_reasons: new FormControl('', Validators.required),
      other_reasons: new FormControl('', Validators.required),
      dydepart1_reasons: new FormControl('', Validators.required),
      dydepart2_reasons: new FormControl('', Validators.required),
    });

    this.Documentsection_aadhaar_Form = new FormGroup({
      reasons_aadhaar: new FormControl('', Validators.required),
      reservation_reasons_aadhaar: new FormControl('', Validators.required),
      disability_reasons_aadhaar: new FormControl('', Validators.required),
      other_reasons_aadhaar: new FormControl('', Validators.required),
      dydepart1_reasons_aadhaar: new FormControl('', Validators.required),
      dydepart2_reasons_aadhaar: new FormControl('', Validators.required),
    });

    this.ApproveForm = new FormGroup({
      Admissiontype: new FormControl('', Validators.required),
      Approvaltype: new FormControl('', Validators.required),
    });
    this.aadhaarApprovalForm = new FormGroup({
      Aadhaar: new FormControl('', Validators.required),
    });

    // this.Get_Reservationdetails();
  }

  //zoom

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  //download button

  DownloadFile() {
    // shivam
    /*
    this.studentsapprovalService
      .download(this.downloadfiles)
      .subscribe(blob => saveAs(blob, this.StudentAadhaar + '.jpeg'));

     */
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

  columnDefs = [
    //grid1
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'View',
      field: 'Documents',
      maxWidth: 80,
      cellRenderer: CellCustomComponent,
    },
    // {
    //   headerName: 'Check',
    //   field: 'Documents',
    //   maxWidth: 100,
    //   cellRenderer: DownloadCellCustomComponent,
    // },
    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Studenttype',
      field: 'Studenttype',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Admission Status',
      field: 'Admission_Status',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Fullname',
      field: 'Fullname',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'MobileNumber',
      field: 'MobileNumber',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'EmailID',
      field: 'EmailID',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'SubjectCode',
      field: 'Subject_group_code',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,

      resizable: true,
    },

    {
      headerName: 'Batch Name',
      field: 'Batch_name',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Batch Short',
      field: 'Batch_short',
      sortable: true,
      filter: true,
      floatingFilter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Gender',
      field: 'Gender',
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
  ];

  columnDefs_aadhaar = [
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'View',
      field: 'Documents',
      maxWidth: 80,
      cellRenderer: CellCustomComponent,
    },
    // {
    //   headerName: 'Check',
    //   field: 'Documents',
    //   maxWidth: 100,
    //   cellRenderer: DownloadCellCustomComponent,
    // },
    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Studenttype',
      field: 'Studenttype',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Admission Status',
      field: 'Admission_status',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Fullname',
      field: 'Fullname',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'MobileNumber',
      field: 'Mobilenumber',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'EmailID',
      field: 'Emailid',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'SubjectCode',
      field: 'Subject_group_code',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,

      resizable: true,
    },

    {
      headerName: 'Batch Name',
      field: 'Batch_name',
      sortable: true,
      filter: true,
      editable: true,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: 'Batch Short',
      field: 'Batch_short',
      sortable: true,
      filter: true,
      floatingFilter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Gender',
      field: 'Gender',
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
  ];

  columnData = [
    //grid2
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      maxWidth: 120,
      editable: true,
      resizable: true,
    },
    { headerName: 'Document_Name', field: 'Document_Name', resizable: true },
    {
      headerName: 'Document_status',
      field: 'Document_status',
      resizable: true,
    },
    { headerName: 'Reason', field: 'Reason', resizable: true },
    { headerName: 'ApprovedBy', field: 'ApprovedBy', resizable: true },
    {
      headerName: 'Upload Status',
      field: 'Upload_Status',
      maxWidth: 120,
      resizable: true,
    },
    {
      headerName: 'Documents',
      field: 'Document_Filename ',
      cellRenderer: PdfCellCustomComponent,
    },
  ];

  column_edu = [
    //grid3
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    { headerName: 'Document_Type', field: 'Document_type', resizable: true },
    {
      headerName: 'Document Status',
      field: 'Approved_rejected',
      resizable: true,
    },

    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      maxWidth: 120,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },

    { headerName: 'Reason', field: 'Rejectionreason', resizable: true },

    { headerName: 'Marksheet No', field: 'Marksheetno', resizable: true },
    { headerName: 'Marks Obtained', field: 'Marksobtained', resizable: true },
    { headerName: 'OutOff', field: 'Outoff', maxWidth: 120, resizable: true },
    {
      headerName: 'Percentage',
      field: 'Percentage',
      maxWidth: 120,
      resizable: true,
    },
    { headerName: 'SGPA', field: 'Sgpa', resizable: true },

    { headerName: 'RollNo', field: 'Rollno', resizable: true },
    { headerName: 'Board', field: 'Board', resizable: true },
    { headerName: 'State', field: 'State', resizable: true },
    {
      headerName: 'Education_board',
      field: 'Education_board',
      resizable: true,
    },
    { headerName: 'College_name', field: 'College_name', resizable: true },
    {
      headerName: 'Datepass',
      field: 'Datepass',
      maxWidth: 120,
      resizable: true,
    },
    { headerName: 'CreatedDate', field: 'Createddate', resizable: true },
    { headerName: 'BatchStream', field: 'Batchstream', resizable: true },
  ];

  column_edu_aadhaar = [
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    { headerName: 'Document_Type', field: 'Document_type', resizable: true },
    {
      headerName: 'Document Status',
      field: 'Approved_rejected',
      resizable: true,
    },

    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      maxWidth: 120,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },

    { headerName: 'Reason', field: 'Rejectionreason', resizable: true },

    { headerName: 'Marksheet No', field: 'Marksheetno', resizable: true },
    { headerName: 'Marks Obtained', field: 'Marksobtained', resizable: true },
    { headerName: 'OutOff', field: 'Outoff', maxWidth: 120, resizable: true },
    {
      headerName: 'Percentage',
      field: 'Percentage',
      maxWidth: 120,
      resizable: true,
    },
    { headerName: 'SGPA', field: 'Sgpa', resizable: true },

    { headerName: 'RollNo', field: 'Rollno', resizable: true },
    { headerName: 'Board', field: 'Board', resizable: true },
    { headerName: 'State', field: 'State', resizable: true },
    {
      headerName: 'Education_board',
      field: 'Education_board',
      resizable: true,
    },
    { headerName: 'College_name', field: 'College_name', resizable: true },
    {
      headerName: 'Datepass',
      field: 'Datepass',
      maxWidth: 120,
      resizable: true,
    },
    { headerName: 'CreatedDate', field: 'Createddate', resizable: true },
    { headerName: 'BatchStream', field: 'Batchstream', resizable: true },
  ];
  // { headerName: 'Documents', field: 'marksheet ', cellRendererFramework: CellCustomComponent },

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onGridReady_aadhaar(params: any) {
    this.gridApi_aadhaar = params.api;
    this.gridColumnApi_aadhaar = params.ColumnApi;
  }

  onGridReady_edu(params: any) {
    this.gridApi_edu = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onGridReady_edu_aadhaar(params: any) {
    this.gridApi_edu_aadhaar = params.api;
    this.gridColumnApi_aadhaar_modal = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {
    //on checkbox selection

    console.log('rowseected::', event);

    this.StudentAadhaar = -99;
    this.StudentFullName = '';
    if (event.data.Aadhaar > 0) {
      this.StudentAadhaar = event.data.Aadhaar;
    }
    if (event.data.Fullname == !null) {
      this.StudentFullName = event.data.Fullname;
    }
  }

  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedRows();
    this.selected_data = selected_outnode[0];
    // this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);

    // console.log('selectedddevee::',this.out_rowselected)

    // this.StudentAadhaar = -99;
    // this.StudentFullName = '';
    // if (event.data.Aadhaar > 0) {
    //   this.StudentAadhaar = event.data.Aadhaar;
    // }
    // if (event.data.Fullname == !null) {
    //   this.StudentFullName = event.data.Fullname;
    // }
  }

  onSelectionChanged_aadhaar(event: any) {

    let selected_outnode = this.gridApi_aadhaar.getSelectedRows();
    this.selected_data_aadhar = selected_outnode[0];
    console.log('kkkj',this.selected_data_aadhar)
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

  onSelectionChanged1(event: any) {
    // console.log("Selection data:", event);
  }

  onRowSelectedEvent3(event: any) {
    // console.log("row select", event.data)
  }

  onSelectionChanged3(event: any) {
    let selected_outnode = this.gridApi_edu.getSelectedRows();
    this.selected_Education = selected_outnode[0];

    console.log('selected_Education', this.selected_Education);
  }

  onSelectionChanged_modal_aadhaar(event: any) {
    let selected_outnode = this.gridApi_edu_aadhaar.getSelectedRows();
    this.selected_Education_aadhaar = selected_outnode[0];
    console.log('selected_Education_aadhaar',this.selected_Education_aadhaar)
  }

  ////pdfSrc = "https://103.138.188.178:8034/uploads/DocumentNotFound.pdf";
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // pdfSrc: any;
  ClosePdf() {
    this.showpdfbox = false;
  }

  ClosePdf_aadhar() {
    this.showpdfbox_aadhar = false;
  }

  

  EducationDetail() {
    //to show modal on button click (grid list 2)

    let jsonin = {
      // "BatchCode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      aadhaar: this.selected_data.Aadhaar,
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    };
    // console.log("ShowPdf:", this.ShowPdf);
    this.commonService
      .Post_json(EducationDetails, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // debugger;

        this.gridOptions_edu.api.setRowData(this.res.data);
        this.res_educationdetails = this.res.data;
        // console.log("Student Details ", this.res);
      });
  }

  EducationDetail_aadhar() {
    //to show modal on button click (grid list 2)

    let jsonin = {
      // "BatchCode": this.SelectedBatch.Batch_Code,
      batchcode: this.selected_data_aadhar.Batch_code,
      aadhaar: this.selected_data_aadhar.Aadhaar,
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    };
    console.log("ShowPdf:", jsonin);
    this.commonService
      .Post_json(EducationDetails, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // debugger;

        // this.gridOptions_edu.api.setRowData(this.res.data);
        this.res_educationdetails_aadhar = this.res.data;
        // console.log("Student Details ", this.res);
      });
  }

  Marksheetpdf() {
    //to show modal on button click (grid list of Documents)

    let jsonin = {
      // "BatchCode": this.SelectedBatch.Batch_Code,
      BatchCode: this.BatchCode,
      Aadhaar: this.selected_data.Aadhaar,
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
    };

    console.log('ShowPdf:', jsonin);
    this.commonService
      .Post_json(Documentapproval, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // debugger;
        this.gridApi.setRowData(this.res.data);
        this.rowData = this.res.data;
        // console.log("Marksheet Response ", this.res);
      });
  }

  UpdateDocumentApproval() {
    //grid AFTER approve/reject refresh
    let jsonin = {
      Document_ID: this.StudentDocument_ID,
      Aadhaar: this.StudentAadhaar,
      Finyear: this.oSession.finyear,
      College_code: this.oSession.collegecode,
      // "Batch_code": this.SelectedBatch.Batch_Code,
      Batch_code: this.BatchCode,
      Document_code: this.Document_code,
      Document_Name: this.Document_Name,
      Document_status: this.AdmissionStatus,
      Reason: this.DocumentsectionForm.controls['reasons'].value,
      ApprovedBy: this.oSession.aadhaar,
    };
    // console.log("RefreshGrid", this.RefreshGrid);
    this.commonService
      .Post_json(UpdateDocumentApproval, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // this.rowData = this.res.data;
        // console.log("Update models", this.res);
        this.Marksheetpdf();
        this.showpdfbox = false;
        this.DocumentsectionForm.reset();
      });
  }

  OpenPdfDoc(selectedNodeData: any) {
    //cell component button click
    // this.primaryModal.show();
    this.showpdfbox = true;
    // this.GetPdfApi();
  }

  modal(selectedmodaldata: any) {
    // this.selectedmodaldata = selectedmodaldata;

    // this.showpdfbox = false;
    if(this.activePane == 0){
      this.selectedmodaldata = selectedmodaldata;
      this.infoModalvisible = true;
      this.EducationDetail();
      this.Get_Reservationdetails();
    }else{
      this.selectedmodaldata_aadhaar = selectedmodaldata
      this.infoModal_aadhaar = true;
      this.EducationDetail_aadhar()
    }
    // this.Marksheetpdf();
    // this.showpdfbox=true;
    // }
  }

  Admission_Status: Array<Object> = [
    { status: 'PENDING' },
    { status: 'APPROVED' },
    { status: 'REJECTED' },
    { status: 'CANCELLED' },
    { status: 'FEES UNTAGED' },
  ];

  ShowDataApprove_Reject: any;

  ShowApprove() {
    //Show Button

    if (this.BatchCode == null) {
      this.globalmessage.Show_error('Please Select the batch');
      return;
    }

    this.showloader = true;
    this.ShowDataApprove_Reject = this.ApprovalForm.value;
    console.log('Approve data ', this.ShowDataApprove_Reject);
    let jsonin = {
      admission_status: this.ApprovalForm.controls['Admission_Status'].value,
      finyear: this.oSession.finyear,
      collegeCode: this.oSession.collegecode,
      batchCode: this.BatchCode,
      aadhaar: -99,
    };
    // console.log("my data:", this.ShowData);
    this.commonService
      .Post_json(AdmissionApprovallist, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // console.log("Response ", this.res);
        this.res_admissionapprovalist = this.res.data;
        this.gridOptions.api.setRowData(this.res_admissionapprovalist);
        // this.infoModal.hide();//Modal close
      });
    this.showloader = false;
  }

  GridApi() {
    //grid api on show button
    let jsonin = {
      admission_status: this.ApprovalForm.controls['Admission_Status'].value,
      finyear: this.oSession.finyear,
      collegeCode: this.oSession.collegecode,
      // "batchCode": this.SelectedBatch.Batch_Code,
      batchCode: this.BatchCode,
      aadhaar: -99,
    };
    // this.studentsapprovalService.AdmissionApprovallist(this.ShowDataApprove_Reject).subscribe((response: {}) => {
    this.commonService
      .Post_json(AdmissionApprovallist, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        // console.log("Response ", this.res);
        this.res_admissionapprovalist = this.res.data;
        this.gridOptions.api.setRowData(this.res_admissionapprovalist);
        // this.infoModal.hide();//Modal close
      });
  }

  ApproveData() {
    //Approve button

    this.AdmissionStatus = 'APPROVED';
    // console.log(this.ApprovalForm.value);
    this.checked = {
      admission_status: this.AdmissionStatus,
      finyear: this.oSession.finyear,
      collegeCode: this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      aadhaar: this.selectedmodaldata.Aadhaar,
      fullName: this.selectedmodaldata.Fullname,
      Admissiontype: this.ApproveForm.controls['Admissiontype'].value,
      Approvaltype: this.ApproveForm.controls['Approvaltype'].value,
    };

    this.ApiApprove_Grid();

    //1 grid refresh
    this.UpdateDocumentApproval();
    // this.infoModal.hide(); //Modal close
    this.showpdfbox = false;
    this.GridApi(); //2
    this.ShowApprove(); //3
    // console.log("My Data:", this.onRowSelectedEvent);
  }

  onReject() {
    //Reject Button
    this.AdmissionStatus = 'REJECTED';
    // console.log(this.ApprovalForm.value);
    this.checked = {
      admission_status: this.AdmissionStatus,
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      aadhaar: this.StudentAadhaar,
    };

    // console.log("My Data:", this.onRowSelectedEvent);
    this.ApiApprove_Reject();
    this.UpdateDocumentApproval(); //showpdfbox
    this.showpdfbox = false;
    // this.primaryModal.hide();
    // this.infoModal.hide(); //Modal close
    this.GridApi();
  }

  ApiApprove_Grid() {
    let jsonin = {
      admission_status: this.AdmissionStatus,
      finyear: this.oSession.finyear,
      collegeCode: this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      aadhaar: this.selectedmodaldata.Aadhaar,
      fullName: this.selectedmodaldata.Fullname,
      Admissiontype: this.ApproveForm.controls['Admissiontype'].value,
      Approvaltype: this.ApproveForm.controls['Approvaltype'].value,
    }; //Approve/Reject Api

    console.log('input', jsonin);
    this.commonService
      .Post_json(AdmissionApproval, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          // console.log("Response ", this.res);
          this.infoModal.hide(); //Modal close
          this.GridApi(); //Refresh grid
        } else {
          this.infoModal.hide();
        }
      });
  }

  ApiApprove_Reject() {
    let jsonin = {
      admission_status: this.AdmissionStatus,
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      aadhaar: this.selectedmodaldata.Aadhaar,
    }; //Approve/Reject Api
    this.commonService
      .Post_json(AdmissionApproval, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          // console.log("Response ", this.res);
          this.infoModal.hide(); //Modal close
          this.GridApi(); //Refresh grid
        } else {
          this.infoModal.hide();
        }
      });
  }

  GetBatchApi() {
    this.commonService.Post_json(Batchs, '').subscribe((response: any) => {
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

  ApproveDialog() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are You Sure!...You Want To  Approve?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApproveData();
        // this.approveModal.hide();
        this.approveModal = false;
      }
    });
  }

  ApprovedDialog() {
    this.approveModal = true;
  }

  Document_appr_reject(sType: string, nDocumentcode: number) {
    if (sType == 'APPROVED') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are You Sure!...You Want To Reject?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approved it',
      }).then((result) => {
        if (result.isConfirmed) {
          // this.onReject();
          this.DocumentApproval(sType, nDocumentcode);
        }
      });
    }
    if (sType == 'REJECTED') {
      console.log('llllllll');
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are You Sure!...You Want To Reject?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reject it',
      }).then((result) => {
        if (result.isConfirmed) {
          // this.onReject();
          this.DocumentApproval(sType, nDocumentcode);
        }
      });
    }
  }

  Document_appr_reject_aadhaar(sType: string, nDocumentcode: number) {
    if (sType == 'APPROVED') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are You Sure!...You Want To Reject?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approved it',
      }).then((result) => {
        if (result.isConfirmed) {
          // this.onReject();
          this.DocumentApproval_aadhar(sType, nDocumentcode);
        }
      });
    }
    if (sType == 'REJECTED') {
      console.log('llllllll');
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are You Sure!...You Want To Reject?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reject it',
      }).then((result) => {
        if (result.isConfirmed) {
          // this.onReject();
          this.DocumentApproval_aadhar(sType, nDocumentcode);
        }
      });
    }
  }

  DocumentApproval(sType: string, nDocumentcode: number) {
    this.reservationrejectloader = true;

    this.disabilityrejectloader = true;

    this.otherreservationrejectloader = true;

    let sReasons = '';
    if (sType == 'APPROVED') {
      this.reservationapproveloader = true;
      this.disabilityapproveloader = true;
      this.otherreservationapproveloader = true;

      sReasons = '';
    }
    if (sType == 'REJECTED') {
      if (nDocumentcode == 70) {
        sReasons =
          this.DocumentsectionForm.controls['reservation_reasons'].value;
      }
      if (nDocumentcode == 80) {
        sReasons =
          this.DocumentsectionForm.controls['disability_reasons'].value;
      }
      if (nDocumentcode == 888) {
        sReasons = this.DocumentsectionForm.controls['other_reasons'].value;
      }
    }

    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.selectedmodaldata.Aadhaar,
      document_code: nDocumentcode,
      approved_rejected: sType,
      rejectionreason: sReasons,
    };

    this.commonService
      .Post_json(Documentapproval, jsonin)
      .subscribe((response) => {
        this.reservationrejectloader = false;
        this.reservationapproveloader = false;

        this.disabilityrejectloader = false;
        this.disabilityapproveloader = false;

        this.otherreservationrejectloader = false;
        this.otherreservationapproveloader = false;

        let Res_DocumentApproval: any;

        const hasKey = 'data' in response;
        if (hasKey) {
          Res_DocumentApproval = response.data;
        } else {
          Res_DocumentApproval = response;
        }

        if (Res_DocumentApproval == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        if (Res_DocumentApproval == true) {
          this.globalmessage.Show_successmessage('Data Updated successfully');
        }
      });
  }

  DocumentApproval_aadhar(sType: string, nDocumentcode: number) {
    this.reservationrejectloader = true;

    this.disabilityrejectloader = true;

    this.otherreservationrejectloader = true;

    let sReasons = '';
    if (sType == 'APPROVED') {
      this.reservationapproveloader = true;
      this.disabilityapproveloader = true;
      this.otherreservationapproveloader = true;

      sReasons = '';
    }
    if (sType == 'REJECTED') {
      if (nDocumentcode == 70) {
        sReasons =
          this.Documentsection_aadhaar_Form.controls['reservation_reasons_aadhaar'].value;
      }
      if (nDocumentcode == 80) {
        sReasons =
          this.Documentsection_aadhaar_Form.controls['disability_reasons_aadhaar'].value;
      }
      if (nDocumentcode == 888) {
        sReasons = this.Documentsection_aadhaar_Form.controls['other_reasons_aadhaar'].value;
      }
    }

    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.selected_Education_aadhaar.Aadhaar,
      document_code: nDocumentcode,
      approved_rejected: sType,
      rejectionreason: sReasons,
    };

    this.commonService
      .Post_json(Documentapproval, jsonin)
      .subscribe((response) => {
        this.reservationrejectloader = false;
        this.reservationapproveloader = false;

        this.disabilityrejectloader = false;
        this.disabilityapproveloader = false;

        this.otherreservationrejectloader = false;
        this.otherreservationapproveloader = false;

        let Res_DocumentApproval_aadhar: any;

        const hasKey = 'data' in response;
        if (hasKey) {
          Res_DocumentApproval_aadhar = response.data;
        } else {
          Res_DocumentApproval_aadhar = response;
        }

        if (Res_DocumentApproval_aadhar == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        if (Res_DocumentApproval_aadhar == true) {
          this.globalmessage.Show_successmessage('Data Updated successfully');
        }
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

  pdfSrc = this._base64ToArrayBuffer('');
  pdfSrc_aadhar = this._base64ToArrayBuffer('');

  downloadProcess: any;

  GetPdfApi(documentcode: number) {
    // this.pdfSrc = BASEURL + this.DocumentPath;
    // console.log("PDF Console:",selectedNodeData);

    let jsonin = {
      Aadhaar: this.selectedmodaldata.Aadhaar,
      Finyear: this.selectedmodaldata.Finyear,
      College_code: this.oSession.collegecode,
      Document_code: documentcode,
    };

    // console.log("Downloadfile pdfData",this.pdfData);
    if (this.selectedmodaldata.Aadhaar == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Aadhaar!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
      // this.downloadclicked = false;
      // this.Downloadloader = false;
    }
    this.commonService.Post_json(ViewDocument, jsonin).subscribe(
      (response) => {
        this.reservationviewloader = false;
        this.disabilityviewloader = false;
        this.otherreservationviewloader = false;

        this.resp_viewdocument = response;
        const contentType = '';
        this.pdfSrc = this._base64ToArrayBuffer(
          this.resp_viewdocument.blobdata
        );

        this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64, ${this.resp_viewdocument.blobdata}`
        );

        if (!this.resp_viewdocument?.pdf_png) {
          this.showpdfbox = false;
        }

        if (this.resp_viewdocument?.pdf_png) {
          this.showpdfbox = true;
        }
      },
      (error) => {
        if (error.error !== null) {
          // console.error('error caught in component', error)
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

  GetPdfApi_aadhaar(documentcode: number) {
    // this.pdfSrc = BASEURL + this.DocumentPath;
    // console.log("PDF Console:",selectedNodeData);
    this.viewmarksheet_aadharloader = true
    let jsonin = {
      Aadhaar: this.selectedmodaldata_aadhaar.Aadhaar,
      Finyear: this.selectedmodaldata_aadhaar.Finyear,
      College_code: this.oSession.collegecode,
      Document_code: documentcode,
    };

    // console.log("Downloadfile pdfData",this.pdfData);
    if (this.selectedmodaldata_aadhaar.Aadhaar == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Aadhaar!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
      // this.downloadclicked = false;
      // this.Downloadloader = false;
    }
    this.commonService.Post_json(ViewDocument, jsonin).subscribe(
      (response) => {
        this.viewmarksheet_aadharloader = false
        this.reservationviewloader = false;
        this.disabilityviewloader = false;
        this.otherreservationviewloader = false;

        this.resp_aadhaar_viewdocument = response;
        const contentType = '';
        this.pdfSrc_aadhar = this._base64ToArrayBuffer(
          this.resp_aadhaar_viewdocument.blobdata
        );

        this.MyImage_aadhar = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64, ${this.resp_aadhaar_viewdocument.blobdata}`
        );

        if (!this.resp_aadhaar_viewdocument?.pdf_png) {
          this.showpdfbox_aadhar = false;
        }

        if (this.resp_aadhaar_viewdocument?.pdf_png) {
          this.showpdfbox_aadhar = true;
        }
      },
      (error) => {
        if (error.error !== null) {
          // console.error('error caught in component', error)
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

  public visible = false;

  public visible_aadhaar = false;

  toggleLiveDemo() {
    this.Submit_document();
  }

  toggleLiveDemo_aadhaar() {
    this.Submit_document_aadhaar();
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  handleLiveDemoChange_aadhaar(event: any) {
    this.visible_aadhaar = event;
  }

  Get_Reservationdetails() {
    let jsonin = {
      aadhaar: this.selected_data.Aadhaar,
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    };

    this.commonService
      .Post_json(Reservationdetails, jsonin)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_reservationdetails = response.data;
        } else {
          this.res_reservationdetails = response;
        }

        if (this.res_reservationdetails[0].opencategory == 'RESERVED') {
          this.ShowReservationdetails = true;
        }

        if (this.res_reservationdetails[0].checkspeciallyabled == 'YES') {
          this.ShowDiasability = true;
        }

        if (this.res_reservationdetails[0].checkotherreservation == 'YES') {
          this.ShowOtherDetails = true;
        }

        console.log('reservationdetailss', this.res_reservationdetails);
      });
  }

  Get__aadhaar_Reservationdetails() {
    let jsonin = {
      aadhaar: this.selected_data_aadhar.Aadhaar,
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    };

    this.commonService
      .Post_json(Reservationdetails, jsonin)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_aadhaar_reservationdetails = response.data;
        } else {
          this.res_aadhaar_reservationdetails = response;
        }

        if (this.res_aadhaar_reservationdetails[0].opencategory == 'RESERVED') {
          this.ShowReservationdetails_aadhar = true;
        }

        if (this.res_aadhaar_reservationdetails[0].checkspeciallyabled == 'YES') {
          this.ShowDiasability_aadhar = true;
        }

        if (this.res_aadhaar_reservationdetails[0].checkotherreservation == 'YES') {
          this.ShowOtherDetails_aadhar = true;
        }

        console.log('reservationdetailss', this.res_aadhaar_reservationdetails);
      });
  }

  ViewDocument(dType: string, documentcode: number) {
    if (dType == 'DOCUMENT' && documentcode == 70) {
      this.reservationviewloader = true;
    }

    if (dType == 'DOCUMENT' && documentcode == 80) {
      this.disabilityviewloader = true;
    }

    if (dType == 'DOCUMENT' && documentcode == 888) {
      this.otherreservationviewloader = true;
    }

    if (dType == 'EDUCATION') {
      if (this.selected_Education == null) {
        this.globalmessage.Show_message('please Select the row');
        return;
      }
      this.GetPdfApi(this.selected_Education.Document_code);
    } else {
      this.GetPdfApi(documentcode);
    }
  }

  ViewDocument_aadhaar(dType: string, documentcode: number) {
    if (dType == 'DOCUMENT' && documentcode == 70) {
      this.reservationviewloader = true;
    }

    if (dType == 'DOCUMENT' && documentcode == 80) {
      this.disabilityviewloader = true;
    }

    if (dType == 'DOCUMENT' && documentcode == 888) {
      this.otherreservationviewloader = true;
    }

    if (dType == 'EDUCATION') {
      if (this.selected_Education_aadhaar == null) {
        this.globalmessage.Show_message('please Select the row');
        return;
      }
      this.GetPdfApi_aadhaar(this.selected_Education_aadhaar.Document_code);
    } else {
      this.GetPdfApi_aadhaar(documentcode);
    }
  }

  EducationApproval(sType: string) {
    // if(sType == "APPROVED")

    if (this.selected_Education == null) {
      this.globalmessage.Show_message('Please Select the Row');
      return;
    }

    if (sType == 'REJECTED') {
      if (this.DocumentsectionForm.controls['reasons'].value == '') {
        this.globalmessage.Show_message(
          'Please Select the reason for rejection'
        );
        this.marksheetviewrejectloader = true;
        return;
      }
    }

    let jsonin = {};

    if (sType == 'APPROVED') {
      jsonin = {
        college_code: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.selected_Education.Aadhaar,
        document_code: this.selected_Education.Document_code,
        approved_rejected: sType,
        rejectionreason: '',
      };
      this.marksheetviewapproveloader = true;
    }

    if (sType == 'REJECTED') {
      jsonin = {
        college_code: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.selected_Education.Aadhaar,
        document_code: this.selected_Education.Document_code,
        approved_rejected: sType,
        rejectionreason: this.DocumentsectionForm.controls['reasons'].value,
      };
    }

    console.log('jsonnnAprroe', jsonin);

    this.commonService
      .Post_json(Educationapproval, jsonin)
      .subscribe((response) => {
        this.marksheetviewrejectloader = false;
        this.marksheetviewapproveloader = false;

        if (response == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        if (response.data == true) {
          this.globalmessage.Show_successmessage('Data Updated successfully');
          this.DocumentsectionForm.reset();
        }
        this.EducationDetail();
      });
  }

  EducationApproval_aadhaar(sType: string) {
    // if(sType == "APPROVED")

    if (this.selected_Education_aadhaar == null) {
      this.globalmessage.Show_message('Please Select the Row');
      return;
    }

    if (sType == 'REJECTED') {
      if (this.Documentsection_aadhaar_Form.controls['reasons_aadhaar'].value == '') {
        this.globalmessage.Show_message(
          'Please Select the reason for rejection'
        );
        this.marksheetviewrejectloader = true;
        return;
      }
    }

    let jsonin = {};

    if (sType == 'APPROVED') {
      jsonin = {
        college_code: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.selected_Education_aadhaar.Aadhaar,
        document_code: this.selected_Education_aadhaar.Document_code,
        approved_rejected: sType,
        rejectionreason: '',
      };
      this.marksheetviewapproveloader = true;
    }

    if (sType == 'REJECTED') {
      jsonin = {
        college_code: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.selected_Education_aadhaar.Aadhaar,
        document_code: this.selected_Education_aadhaar.Document_code,
        approved_rejected: sType,
        rejectionreason: this.Documentsection_aadhaar_Form.controls['reasons_aadhaar'].value,
      };
    }

    console.log('jsonnnAprroe', jsonin);

    this.commonService
      .Post_json(Educationapproval, jsonin)
      .subscribe((response) => {
        this.marksheetviewrejectloader = false;
        this.marksheetviewapproveloader = false;

        if (response == null) {
          this.globalmessage.Show_error('No Data Found');
        }

        if (response.data == true) {
          this.globalmessage.Show_successmessage('Data Updated successfully');
          this.Documentsection_aadhaar_Form.reset();
        }
        this.EducationDetail_aadhar();
      });
  }

  Submit_document() {
    this.finalsubmitloader = true;

    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.selectedmodaldata.Aadhaar,
      batchcode: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

    this.commonService
      .Post_json(Finalapproval, jsonin)
      .subscribe((response) => {
        let Res_EducationApproval: any;

        const hasKey = 'data' in response;
        if (hasKey) {
          Res_EducationApproval = response.data;
        } else {
          Res_EducationApproval = response;
        }

        if (Res_EducationApproval == true) {
          this.globalmessage.Show_message(
            'Data updated successfully.Please check your mail.'
          );
          this.infoModalvisible = !this.infoModalvisible;
          this.pdfSrc = this._base64ToArrayBuffer('');
          this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl('');
        }
      });
    this.finalsubmitloader = false;
  }

  Submit_document_aadhaar() {
    this.finalsubmitloader_aadhar = true;

    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.selected_Education_aadhaar.Aadhaar,
      batchcode: this.selected_data_aadhar.Batch_code,
      useraadhaar: this.oSession.aadhaar,
    };

    this.commonService
      .Post_json(Finalapproval, jsonin)
      .subscribe((response) => {
        let Res_EducationApproval: any;

        const hasKey = 'data' in response;
        if (hasKey) {
          Res_EducationApproval = response.data;
        } else {
          Res_EducationApproval = response;
        }

        if (Res_EducationApproval == true) {
          this.globalmessage.Show_message(
            'Data updated successfully.Please check your mail.'
          );
          this.infoModal_aadhaar = !this.infoModal_aadhaar;
          this.pdfSrc_aadhar = this._base64ToArrayBuffer('');
          this.MyImage_aadhar = this.sanitizer.bypassSecurityTrustResourceUrl('');
        }
      });
    this.finalsubmitloader_aadhar = false;
  }

  toggleLivecloseDemo() {
    this.closeloader = true;
    this.infoModalvisible = !this.infoModalvisible;
    this.closeloader = false;
    this.pdfSrc = this._base64ToArrayBuffer('');
    this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  toggleLivecloseDemo_aadhaar() {
    this.closeloader = true;
    this.infoModal_aadhaar = !this.infoModal_aadhaar;
    this.closeloader = false;
    this.pdfSrc_aadhar = this._base64ToArrayBuffer('');
    this.MyImage_aadhar = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  Reset() {
    this.ApprovalForm.reset();
  }

  //AadhaarapprovalList
  ShowApprove_aadhaar() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.aadhaarApprovalForm.controls['Aadhaar'].value,
      useraadhaar: this.oSession.aadhaar,
    };

    this.commonService
      .Post_json(AdmissionApprovallist_aadhaar, jsonin)

      .subscribe((response) => {
        this.res_aadhaarapprovallist = response.data;
        // this.EducationDetail();
      });
  }



  handleChange($event:any){
  this.activePane = $event
  }

}
