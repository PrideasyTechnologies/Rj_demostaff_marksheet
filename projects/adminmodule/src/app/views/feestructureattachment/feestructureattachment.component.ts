import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FeestructureattachmentService,
  ITableData,
} from './feestructureattachment.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { Router } from '@angular/router';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import {
  CastDocument,
  FeesTerm,
  GetAllBatchs,
  GetProfile,
  GetStudentFeesStructure,
  GetUnAttachedStudents,
  IU_AttachFeesStructure,
  IU_UnTagFees,
  ViewDocument,
} from '../../globals/global-api';
import { consolidateMessages } from '@angular/localize/tools/src/extract/translation_files/utils';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { Ires_ViewDocument, Ires_Viewattachfees } from '../../models/response';
import { encryptUsingAES256 } from '../../../../../marksheet/src/app/globals/encryptdata';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-feestructureattachment',
  templateUrl: './feestructureattachment.component.html',
  styleUrls: ['./feestructureattachment.component.scss'],
  providers: [FeestructureattachmentService],
})
export class FeestructureattachmentComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  feesAttachmentForm!: FormGroup;
  DocumentsectionForm!: FormGroup;
  feesForm!: FormGroup;
  res: any;
  showfee: any;
  ShowPdf: any;
  attachfee: any;
  unattached: any;
  category = [];
  Terms = [];
  sex = [];
  Batchs = [];
  StudentAadhaar: any;
  SelectedBatch!: any;
  SelectedTerm!: any;
  SelectedTermView!: any;
  SelectedSex!: any;
  visible = false;
  feesAttachmentViewForm!: FormGroup;

  selectedRows: any;

  batch_code: any;
  Category: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';
  pageVariable: any;

  url = 'https://www.eazyinstitute.com';
  viewdetail!: any;
  pdfform = false;

  unattachfee: any;

  MyImage: any;

  obj: any;

  Res_voewattachfees!: Ires_Viewattachfees[];

  out_rowselected!: Ires_Viewattachfees;

  resp_viewdocument!: Ires_ViewDocument;

  oSession!: Sessiondata;

  reservationviewloader = false;

  showpdfbox = false;

  @ViewChild('infoModal') infoModal: any;

  constructor(
    private router: Router,
    private commonService: CommanService,
    private feestructureattachmentService: FeestructureattachmentService,
    private globalMessage: GlobalMessage,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
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
    //   this.globalMessage.Show_message('Please Login');
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService);
    this.oSession.Getdatafromstroage();

    console.log('fnjnjfn', this.oSession);
    this.GetBatchApi();
    this.GetSexApi();
    this.GetCategoryApi();
    this.GetTermSApi();

    // this.feesForm = new FormGroup({
    //   'Term_Name': new FormControl(null, Validators.required),
    // });

    this.feesAttachmentForm = new FormGroup({
      // 'Batch_Code': new FormControl(null, Validators.required),
      Term_Name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
    });
    this.feesAttachmentViewForm = new FormGroup({
      Term_Name_View: new FormControl(null, Validators.required),
    });
    this.DocumentsectionForm = new FormGroup({
      reservation_reasons: new FormControl('', Validators.required),
    });
  }

  //zoom
  zoom: number = 1.0;
  originalSize: boolean = true;

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  public rowSelection: 'single' | 'multiple' = 'multiple';

  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    // {headerName: 'Attach', field: 'Action', maxWidth: 80, cellRenderer: CellCustomComponent},
    {
      headerName: 'Aadhaar No',
      field: 'aadhaar',
      sortable: true,
      filter: true,
      resizable: true,
    },

    {
      headerName: 'Full Name',
      field: 'fullname',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Subject Code',
      field: 'Subject_group_code',
      maxWidth: 120,
      sortable: true,
      filter: true,
      resizable: true,
    },

    {
      headerName: 'Attached (Term)',
      field: 'term_name',
      maxWidth: 150,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Category',
      field: 'category',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      maxWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Student Type',
      field: 'Student_type',
      maxWidth: 130,
      sortable: true,
      filter: true,
      resizable: true,
    },

    {
      headerName: 'Fees attached by',
      field: 'Feesattachedby',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Modified date',
      field: 'Feesattacheddate',
      sortable: true,
      filter: true,
      resizable: true,
    },

    {
      headerName: 'Approved by',
      field: 'Useraadhaar',
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Approved date',
      field: 'Modifydate',
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];

  //Grid Rows
  rowss: any = [];

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onRowSelectedEvent(event: any) {
    //on checkbox selection
    this.StudentAadhaar = -99;
    if (event.data.aadhaar > 0) {
      this.StudentAadhaar = event.data.aadhaar;
      // console.log("adhar:",event.data.aadhaar);
    }
    this.batch_code = event.data.batch_code;
    this.Category = event.data.category;
  }

  onSelectionChanged(event: any) {
    console.log("Selection data:", event);

    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    this.selectedRows = this.gridApi.getSelectedRows();

    // let selected_outnode = this.gridApi.getSelectedRows();
    // this.selectedRows = selected_outnode[0];

    // console.log('selected_Education', this.selectedRows);

    console.log("Selection change data:", this.selectedRows);
  }

  modal() {
    if (this.StudentAadhaar == null) {
      alert('please select row');
    } else {
      console.log('new');
      this.infoModal.show();
      // this.GetPdfApi();
    }
  }

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  closeAlert() {
    this.savealert = false;
  }

  ShowFees() {
    //let jsonin = this.feesAttachmentForm.value;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      batch_code: this.BatchCode,
      Category: this.feesAttachmentForm.controls['category'].value,
      gender: this.feesAttachmentForm.controls['sex'].value,
      Term_Name: this.SelectedTerm.Term_Name,
    };

    this.commonService
      .Post_json(GetStudentFeesStructure, jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }

        this.Res_voewattachfees = response.data;

        // this.res = response;
        // // console.log("Response ", this.res);
        // this.gridOptions.api.setRowData(this.res.data);
        // this.rowss = this.res.data;
      });
  }

  UnAttachFees() {
    // if(this.selectedRows == null){
    //   this.globalMessage.Show_message('Please select row');
    //   return;
    // }
    //
    // if(this.SelectedTerm.Term_Code <= 0){
    //   this.globalMessage.Show_message('Please select term');
    //   return;
    // }
    if (this.SelectedTermView == null) {
      this.globalMessage.Show_error('Please select term');
      return;
    }

    let xyz = JSON.stringify(this.selectedRows);
    let jsonObj = JSON.parse(xyz);

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Batchcode: this.batch_code,
      Aadhaar: parseInt(jsonObj[0].aadhaar),
      feesattachedby: this.oSession.aadhaar,
    };

    console.log('unattachfees', jsonin);
    this.commonService
      .Post_json(IU_UnTagFees, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          this.globalMessage.Show_message('Fees UnAttached Successfully');
        } else {
          this.globalMessage.Show_message('Failed to UnAttach!');
        }
        // this.rowss=this.res.data;
        this.GridApi();
        this.infoModal.hide(); //Modal close
      });
  }

  AttachFees() {
    let multiaadhaar: Array<number> = [];
    console.log('singleselect', this.selectedRows[0].aadhaar);

    if (this.SelectedTermView == null) {
      this.globalMessage.Show_error('Please select term');
      return;
    }

    if (this.selectedRows.length > 0) {
      for (const obj of this.selectedRows) {
        multiaadhaar.push(obj.aadhaar);
        console.log(obj.aadhaar);
      }
    }

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      // "BatchCode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
      termcode: this.SelectedTermView.Term_Code,
      multipleaadhaar: multiaadhaar,
      feesattachedby: this.oSession.aadhaar,
    };

    console.log('attachinput', jsonin);
    this.commonService
      .Post_json(IU_AttachFeesStructure, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        if (this.res.data == true) {
          this.globalMessage.Show_message('Fees Attached Successfully');
        } else {
          this.globalMessage.Show_message('Failed to Attach!');
        }
        // console.log("Response ", this.res);
        // this.rowss=this.res.data;
        this.ShowFees();
        this.GridApi();
        this.infoModal.hide(); //Modal close
        // this.onAttachDialog();
        this.ShowFees();
      });
  }

  GridApi() {
    //grid api on show button
  }

  GetPdfApi() {
    if (this.selectedRows == null) {
      alert('Please select row');
    } else {
      this.visible = !this.visible;
      this.pdfform = true;
      let xyz = JSON.stringify(this.selectedRows);
      let jsonObj = JSON.parse(xyz);

      let jsonin = {
        // "BatchCode": this.SelectedBatch.Batch_Code,
        BatchCode: this.BatchCode,
        Aadhaar: parseInt(jsonObj[0].aadhaar),
        CollegeCode: this.oSession.collegecode,
        Finyear: this.oSession.finyear,
      };
      console.log('ShowPdf:', jsonin);
      this.commonService
        .Post_json(CastDocument, jsonin)
        .subscribe((response: {}) => {
          this.res = response;
          // // debugger;
          // // console.log("Response ", this.res);
          //
          // for (var key in this.res.data) {
          //   if (this.res.data.hasOwnProperty(key)) {
          //     this.pdfSrc = this.url + this.res.data[key];
          //   }
          // }
          if (this.res == null) {
            this.globalMessage.Show_message('Please select row');
          }
          for (var key in this.res.data) {
            if (this.res.data.hasOwnProperty(key)) {
              // this.pdfSrc = this.url + this.res.data[key];
              // this.infoModal.show();
            }
          }
        });
    }
  }

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

  ViewDocument(dType: string, documentcode: number) {
    this.reservationviewloader = true;

    // if (dType == "EDUCATION") {
    //   if (this.selected_Education == null) {
    //     this.globalmessage.Show_message('please Select the row');
    //     return;
    //   }
    //   this.GetPdfApi(this.selected_Education.Document_code);

    // } else {
    this.viewReservation(documentcode);
    // }
  }

  viewReservation(documentcode: number) {
    // this.pdfSrc = BASEURL + this.DocumentPath;
    // console.log("PDF Console:",selectedNodeData);

    if (this.selectedRows == null) {
      this.globalMessage.Show_message('please Select the row');
      return;
    }

    let jsonin = {
      Aadhaar: this.selectedRows[0].aadhaar,
      Finyear: this.selectedRows[0].finyear,
      College_code: this.oSession.collegecode,
      Document_code: documentcode,
    };

    console.log('inpjsonn', jsonin);

    this.commonService.Post_json(ViewDocument, jsonin).subscribe(
      (response) => {
        this.reservationviewloader = false;

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

  //unattached Students
  Unattachedstudents() {
    let jsonin = {
      finyear: this.oSession.finyear,
      CollegeCode: this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      batchcode: this.BatchCode,
    };

    console.log('unatajson', jsonin);
    this.commonService
      .Post_json(GetUnAttachedStudents, jsonin)
      .subscribe((response) => {
        let res = response;
        if (res == null) {
          return;
        }
        // if (res.exception !=""){
        //   return ;
        // }
        this.gridOptions.api.setRowData(res.data);
        this.rowss = res.data;
      });
  }

  GetCategoryApi() {
    //select tag list displaying

    this.commonService.Post_json(GetProfile, '').subscribe((response: {}) => {
      this.res = response;
      this.category = this.res.data.category;
    });
  }

  GetBatchApi() {
    //select tag list displaying

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

  GetTermSApi() {
    //select tag list displaying
    this.commonService.Post_json(FeesTerm, '').subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Terms = response['data'];
      }
    });
  }

  onChangeTermSelect(){
    // console.log('TERM NAME :',this.Terms)
  }

  onChangeBatchSelect() {}

  onChangeSexSelect() {}

  GetSexApi() {
    //select tag list displaying

    this.commonService.Post_json(GetProfile, '').subscribe((response: {}) => {
      this.res = response;
      this.sex = this.res.data.sex;
      // console.log(this.sex);
    });
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

  toggleCollapse(): void {
    this.visible = !this.visible;
    // this.myloop = 8;
  }

  protected readonly toString = toString;
}
