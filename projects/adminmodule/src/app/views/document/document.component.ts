import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DocumentService } from './document.service';
import { GlobalMessage } from '../../globals/global.message';
import { base64StringToBlob } from 'blob-util';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  allbatchs,
  Batchs,
  documents,
  educationdetails,
  feedbackname_add,
  feedbackname_list,
  GetStudentFeesStructure,
  iu_updatedocus,
  question_add,
  question_list,
  question_type,
} from '../../globals/global-api';
import { CommanService } from '../../globals/common.services';
import { Ilistfeedback_detail } from '../../models/response';
import {
  IBatch,
  IDocument,
  IEducationDetails,
  IReq_Batch_doc_merit_edu,
} from './document-model';
import { forEachChild } from 'typescript/lib/tsserverlibrary';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-questionpaperupload',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  educationdocumentForm!: FormGroup;

  selectedTeam: string = '';
  xlsxFile!: Array<File>;

  documentloader = false;
  educationdocumentloader = false;

  res: any;
  searchValue: any;
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  loader: any;
  gridOptions: any;
  gridOptions_education: any;

  Batchs!: IBatch[];
  Batch!: IBatch;

  documentlist!: IDocument[];
  selected_docs!: IDocument[];

  EducationDetaillist!: IEducationDetails[];
  selected_edu!: IEducationDetails[];

  aSeelctededu!: string[];

  selectedmerit!: string;

  // selected_merit!: IEducationDetails;

  //selected_merit : string ="";

  selected_batch!: IBatch;

  SelectedAtktProfile!: boolean;

  SelectedOutsideProfile!: boolean;

  SelectedNormalProfile!: boolean;


  Selected_Admission_started!: boolean;

  Selected_Atkt_Admission!: boolean;

  Selected_Outside_Admission!: boolean;

  Selected_RationCard!:boolean;

  private gridApi: any;
  private gridColumnApi: any;

  private gridApi_education: any;
  private gridColumnApi_education: any;

  rowSelection: any;
  rowSelection_education: any;

  oSession!: Sessiondata;

  constructor(
    private router: Router,
    private commonService: CommanService,
    private documentservice: DocumentService,
    private globalmessage: GlobalMessage,
    private sessionService: SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
    this.gridOptions_education = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }



  ngOnInit(): void {
    // if (!this.Token) {
    //   // this.dialogService.open({ message: 'Please Login', positive: 'Ok', })//alert
    //   Swal.fire({
    //     title: 'Success!',
    //     text: 'Please Login!',
    //     icon: 'success',
    //     confirmButtonText: 'OK',
    //   }); //alert
    //
    //   this.router.navigate(['login']);
    // } else {
    //   this.currentYear = new Date().getFullYear();
    // }

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

      this.Createform();
      this.GetAllBatchs();
      // this.GetDocumentApi();
      this.GetEducationDeatilsApi();

  }

  Createform() {
    this.educationdocumentForm = new FormGroup({
      // Documents: new FormControl('', Validators.required),
      Educationdetails: new FormControl('', Validators.required),
      Meritlist: new FormControl('', Validators.required),
      Admissionyear: new FormControl('', Validators.required),
      Atkt_admission: new FormControl('', Validators.required),
      Atkt_message: new FormControl('', Validators.required),
      Atkt_profilereq: new FormControl('', Validators.required),
      Outside_admission: new FormControl('', Validators.required),
      Outside_message: new FormControl('', Validators.required),
      Outside_profilereq: new FormControl('', Validators.required),
      Admissionstarted: new FormControl('', Validators.required),
      Rationcard: new FormControl('', Validators.required),
    });
  }

  GetAllBatchs() {
    this.commonService.Post_json(allbatchs, '').subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        this.globalmessage.Show_message('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  // GetDocumentApi() {
  //   this.commonService.Post_json(documents, '').subscribe((response: any) => {
  //     if (response['data'] == '' || response['data'] == null) {
  //       this.globalmessage.Show_message('No data found');
  //     } else {
  //       this.documentlist = response['data'];
  //     }
  //   });
  // }

  GetEducationDeatilsApi() {
    this.commonService
      .Post_json(educationdetails, '')
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.EducationDetaillist = response['data'];
        }
      });
  }

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
  }

  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
      filter: true,
    },

    {
      headerName: 'Batch name',
      field: 'Batch_name',
      filter: true,
      editable: true,
      resizable: true,
    },
    // {
    //   headerName: 'Documents',
    //   field: 'Documents',
    //   filter: true,
    //   editable: true,
    //   resizable: true,
    // },
    
    {
      headerName: 'Education Details',
      field: 'Educationdetails',
      filter: true,
      editable: true,
      resizable: true,
    },

    {
      headerName: 'Merit List',
      field: 'Meritlist',
      filter: true,
      editable: true,
      resizable: true,
    },

    {
      headerName: 'Ration Card',
      field: 'Rationcard',
      filter: true,
      editable: true,
      resizable: true,
    },

    {
      headerName: 'Fin Year',
      field: 'Admissionyear',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Atkt Students',
      field: 'Atkt_admission',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Atkt Message',
      field: 'Atkt_message',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Outside Students',
      field: 'Outside_admission',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Outside Message',
      field: 'Outside_message',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Normal Students',
      field: 'Admissionstarted',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'User Aadhar',
      field: 'Useraadhaar',
      filter: true,
      editable: true,
      resizable: true,
    },
    {
      headerName: 'Modified Date',
      field: 'Modifydate',
      filter: true,
      editable: true,
      resizable: true,
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  onGridReadydocument(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    params.columnApi.autoSizeAllColumns();
  }

  onRowSelectedEvent(event: any) {}

  onRowSelectededucationEvent(event: any) {}
  // Selected_docsArray:any
  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedNodes();
    let zeroindex = selected_outnode.map((node: { data: any }) => node.data);
    // console.log('zeroindex::',zeroindex)

    this.selected_batch = zeroindex[0];
    console.log('selected json::', this.selected_batch);

    // zeroindex[0].Documents = this.selected_batch?.Documents.split(',');

    zeroindex[0].Educationdetails = this.selected_batch?.Educationdetails.split(',');

    this.educationdocumentForm.patchValue(this.selected_batch);
    // console.log(zeroindex[0].Documents);
  }

  onSelectioneducationChanged(event: any) {}

  Showeducationdocument() {}

  quickSearch(e: any) {
    // console.log('keyy',e)
    console.log('key::', this.gridApi.setQuickFilter(this.searchValue));
  }

  Submit() {
    // console.log('prakash',this.selected_docs)

    // // debugger
    // let nLoop = 0
    // for (const key of this.selected_docs) {
    //   let afound = this.documentlist.find(
    //     (i) => i.Document_name === key
    //   );
    //   if (afound != undefined) {

    //   // this.selected_docs[nLoop].Document_name = key
    //    console.log("Yes ",afound.Document_code)

    //    // console.log('prakash',this.selected_docs[nLoop].Document_code)

    //    //this.selected_docs[nLoop] = this.selected_docs[nLoop]  +','+afound.Document_code

    //   }
    //   nLoop++
    // }


    let jsonin =  this.educationdocumentForm.value;

    jsonin.Batch_code = this.selected_batch.Batch_code;
    // jsonin.Documents = jsonin.Documents?.toString();
    // jsonin.Educationdetails = jsonin.Educationdetails.toString();
    jsonin.Useraadhaar = this.oSession.aadhaar;
    this.SelectedAtktProfile
    ? (jsonin.Atkt_profilereq = 1)
    : (jsonin.Atkt_profilereq = 0);

    this.SelectedOutsideProfile
    ? (jsonin.Outside_profilereq = 1)
    : (jsonin.Outside_profilereq = 0);


    this.Selected_Admission_started
    ? (jsonin.Admissionstarted = 1)
    : (jsonin.Admissionstarted = 0);

    this.Selected_Atkt_Admission
    ? (jsonin.Atkt_admission = 1)
    : (jsonin.Atkt_admission = 0);

    this.Selected_Outside_Admission
    ? (jsonin.Outside_admission = 1)
    : (jsonin.Outside_admission = 0);

    this.Selected_RationCard
    ? (jsonin.Rationcard = 1)
    : (jsonin.Rationcard = 0);


    console.log('jsonnn::',jsonin)

    this.commonService
      .Post_json(iu_updatedocus, jsonin)
      .subscribe((response) => {
        this.res = response?.data;
        // console.log('response::', this.res);

        if (this.res == true) {

          this.globalmessage.Show_message('Data Updated Successfully');

          this.GetAllBatchs();
          this.educationdocumentForm.reset();

        } else {
          this.globalmessage.Show_message('Failed to Update!');
        }

      });
  }

  Changeselected_mert() {
    //console.log('selectedmerit:::s',this.selectedmerit)
    //this.selected_merit_new = data
    // console.log('ssss',this.selected_edu[index-1])
  }

  ChangeDocument(event: any) {
    //this.selectedmerit = event
    //console.log('ssssmultiple hcange',this.selectedmerit)
  }

  Cancel() {
    this.educationdocumentForm.reset();
  }

  xyz($event: any) {
    this.aSeelctededu = $event;
    // console.log($event);
  }

  valueChange(event: any) {
    // console.log('sss', event);
  }
}
