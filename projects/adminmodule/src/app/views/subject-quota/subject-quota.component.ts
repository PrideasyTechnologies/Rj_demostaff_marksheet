import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITableData, SubjectQuotaService } from './subject-quota.service';
import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import {
  AdmissionQuotaList,
  AdmissionQuotaList_minor,
  IU_minorstatus,
  GetAllBatchs,
  IU_QuotaStatusUpdate,
} from '../../globals/global-api';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import {AdmissionQuotasubjectGroups, Subject_group_nep} from "../../models/responsemodel";

@Component({
  selector: 'app-subject-quota',
  templateUrl: './subject-quota.component.html',
  styleUrls: ['./subject-quota.component.scss'],
  providers: [SubjectQuotaService],
})
export class SubjectQuotaComponent implements OnInit {
  private normal_gridApi: any;
  private normal_gridColumnApi: any;
  public normal_gridOptions: any;

  private nep_gridApi: any;
  private nep_gridColumnApi: any;
  public nep_gridOptions: any;

  searchValue: any;
  error: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  Normal_quotaSubForm!: FormGroup;

  Nep_quotasubform!: FormGroup;

  res: any;
  Batchs = [];
  SelectedBatch!: any;
  Subject_group_code: any;
  Subjectgroupid: any;
  subjectgroupcode: any;

  normal_rowselectd: any;
  nep_rowselected: any;
  //Grid Rows
  rowss: any = [];

  public paginationPageSize_installment = 10;

  loader = false;
  viewloader = false;

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  nep_selectedrow!: any;

  currentactive: boolean = false;

  visible = false;

  visible_nep = false;

  selected_normalrow! : AdmissionQuotasubjectGroups;

  selected_neprow! : Subject_group_nep;

  oSession!: Sessiondata;

  @ViewChild('infoModal_normal') infoModal: any;
  @ViewChild('nep_modal') nepmodal: any;

  constructor(
    private router: Router,
    private commonService: CommanService,
    private subjectquotaServiceService: SubjectQuotaService,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private sessionService : SessionService
  ) {
    this.normal_gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };

    this.nep_gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }


  ngOnInit(): void {
    // if (!this.Token) {
    //  this.globalmessage.Show_message('Please Login')
    //   this.router.navigate(['login']);
    // }

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

    this.GetBatchApi();
    this.CreateForm();
  }

  CreateForm() {
    this.Normal_quotaSubForm = new FormGroup({
      quota_status: new FormControl('', [Validators.required]),
    });

    this.Nep_quotasubform = new FormGroup({
      nep_quota_status: new FormControl('', [Validators.required]),
    });
  }

  get Quotasubform_fn() {
    return this.Normal_quotaSubForm.controls;
  }

  get Nepsubform_fn() {
    return this.Nep_quotasubform.controls;
  }

  modal() {
    //grid button
    console.log('Yes nep value ', this.nep_rowselected);

    if (
      this.nep_rowselected != null &&
      this.nep_rowselected.source == 'checkboxSelected'
    ) {
      if (
        this.nep_rowselected.data.Batch_code > 0 &&
        this.nep_rowselected.data.Subject_group_code !== '' &&
        this.nep_rowselected.data.Otherlevelcode > 0
      ) {
        this.nep_rowselected = null;
        this.nepmodal.show();
        return;
      }
    }

    if (this.subjectgroupcode == null) {
      alert('please select row');
    } else {


      // this.infoModal.show();
    }
  }

  ViewQuota() {
    //Quota Button Click
    this.Normal_GridListApi();
  }


  Normal_GridListApi() {
    //table Api for ViewQuota
    this.loader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchCode,
    };
    this.commonService
      .Post_json(AdmissionQuotaList, jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.normal_gridOptions.api.setRowData(response.data);
        this.rowss = response.data;
        this.loader = false;
      });
  }

  Nep_GridListApi() {
    //table Api for ViewQuota

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchCode,
    };
    this.commonService
      .Post_json(AdmissionQuotaList_minor, jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.nep_gridOptions.api.setRowData(response.data);
        //this.rowss = models.data;
      });
  }

  onQuotaSubmit_normal() {


    let jsonin = {
      quota_status: this.Normal_quotaSubForm.controls['quota_status'].value,
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchCode,
      subjectgroupid: this.selected_normalrow.Subject_group_id,
      subject_group_code: this.selected_normalrow.Subject_group_code,
    };

    this.commonService
      .Post_json(IU_QuotaStatusUpdate, jsonin)
      .subscribe((response) => {
        if (response == null) {
          return;
        }
        this.Normal_GridListApi();
        this.infoModal.hide();
      });
  }

  onSubmit_Nep() {

    if (this.nep_selectedrow[0] == null) {

      this.globalmessage.Show_error('Record not selected')
      return;

    }

    let jsonin = {
      quota_status: this.Nep_quotasubform.controls['nep_quota_status'].value,
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      batch_code: this.selected_neprow.Batch_code,
      subject_group_code: this.selected_neprow.Subject_group_code,
      otherlevelcode: this.selected_neprow.Otherlevelcode,
      useraadhaar: this.oSession.aadhaar,
    };

    console.log('kkk',jsonin)
    // this.commonService
    //   .Post_json(IU_minorstatus, jsonin)
    //   .subscribe((response) => {
    //     if (response == null) {
    //       return;
    //     }
    //     this.Nep_GridListApi();
    //     this.nepmodal.hide();
    //   });
  }

  GetBatchApi() {
    this.commonService.Post_json(GetAllBatchs, '').subscribe((response) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  //Grid column
  normal_columnDefs = [
    {
      field: '',
      maxWidth: 70, checkboxSelection: true
    },

    {
      headerName: 'Subject Code',
      field: 'Subject_group_code',
      maxWidth: 120,
      resizable: true,
    },
    {
      headerName: 'Subject Group Name',
      field: 'Subject_group_name',
      width: 800,
      resizable: true,
    },
    {
      headerName: 'Quota Status',
      field: 'Quota_status',
      maxWidth: 120,
      resizable: true,
    },
  ];

  nep_columnDefs = [

    {
      field: '',
      maxWidth: 70, checkboxSelection: true
    },

    {
      headerName: 'Major subject code',
      field: 'Subject_group_code',
      width: 150,
      resizable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        // pass in additional parameters to the Text Filter
      },
    },
    {
      headerName: 'Major subject name',
      field: 'Major',
      width: 300,
      resizable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        // pass in additional parameters to the Text Filter
      },
    },
    {
      headerName: 'Minor subject name',
      field: 'Otherlevelcode',
      width: 100,
      resizable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        // pass in additional parameters to the Text Filter
      },
    },
    {
      headerName: 'Minor subject name',
      field: 'Otherlevel',
      width: 300,
      resizable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        // pass in additional parameters to the Text Filter
      },
    },
    {
      headerName: 'Quota Status',
      field: 'Quota_status',
      maxWidth: 120,
      resizable: true,
    },
  ];

  //grid- search
  quickSearch() {
    this.normal_gridApi.setQuickFilter(this.searchValue);
  }

  quicksearch_nep() {
    this.nep_gridApi.setQuickFilter(this.searchValue);
  }

  onnep_GridReady(params: any) {
    this.nep_gridApi = params.api;
    this.nep_gridColumnApi = params.ColumnApi;
  }

  onnormal_GridReady(params: any) {
    this.normal_gridApi = params.api;
    this.normal_gridColumnApi = params.ColumnApi;
  }

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
  }

  view_nepquota() {
    this.Nep_GridListApi();
  }

  onPageSizeChanged_nep() {
    var value = (document.getElementById('neppage-size') as HTMLInputElement)
      .value;
    this.nep_gridApi.paginationSetPageSize(Number(value));
  }

  onPageSizeChanged_normal() {
    var value = (document.getElementById('normalpage-size') as HTMLInputElement)
      .value;
    this.normal_gridApi.paginationSetPageSize(Number(value));
  }

  onNep_SelectionChanged($event: SelectionChangedEvent<any>) {
    //https://stackblitz.com/edit/angular-get-selected-rows-1wu1gn?file=src%2Fapp%2Fapp.component.ts
    this.nep_selectedrow = this.nep_gridApi.getSelectedRows();
    console.log('Selection Changed', this.nep_selectedrow);
    this.selected_neprow = this.nep_selectedrow[0]
    this.visible_nep = !this.visible_nep;

  }

  onNormal_SelectionChanged($event: SelectionChangedEvent<any>) {
    //https://stackblitz.com/edit/angular-get-selected-rows-1wu1gn?file=src%2Fapp%2Fapp.component.ts
    this.normal_rowselectd = this.normal_gridApi.getSelectedRows();

    this.selected_normalrow = this.normal_rowselectd[0]
    this.visible = !this.visible;

  }

  View_data(){
    this.visible = !this.visible;
  }
}
