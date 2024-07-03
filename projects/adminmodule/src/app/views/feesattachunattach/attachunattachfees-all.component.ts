import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttachFeesAllService} from './attachfees-all.service';
import {Router} from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import Swal from "sweetalert2";
import {CommanService} from "../../globals/common.services";
import {
  FeesTerm,
  GetAllBatchs,
  GetStudentFeesStructure,
  GetUnAttachedStudents,
  IU_AttachFeesToall
} from "../../globals/global-api";
import {GridOptions} from "ag-grid-community";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-attachfees-all',
  templateUrl: './attachunattachfees-all.component.html',
  styleUrls: ['./attachunattachfees-all.component.scss'],
  providers: [AttachFeesAllService],
})
export class AttachunattachfeesAllComponent implements OnInit {
  private gridApi: any;
  submitted = false;
  feesAttachmentForm!: FormGroup;
  feesForm!: FormGroup;
  feesAttachmentstudentForm!: FormGroup;

  res: any;
  showfee: any;
  attachfee: any;
  category = [];
  Terms = [];
  sex = [];
  Batchs = [];
  StudentAadhaar: any;
  SelectedBatch: any;
  SelectedTerm!: any;
  gridOptions: any;
  searchValue: any;

  oSession!: Sessiondata;

  private gridColumnApi: any;
  @ViewChild('infoModal') infoModal: any;

  attachloader =false;

  constructor(private router: Router,private commonService: CommanService,
              private attachfeesallService: AttachFeesAllService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }

  

  ngOnInit(): void {
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.globalmessage.Show_message("Please login");
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetBatchApi();
      this.GetTermSApi();


    this.feesAttachmentForm = new FormGroup({
      // 'Batch_Code': new FormControl(null, Validators.required),
      'Term_Name': new FormControl(null, Validators.required),
    });

    this.feesAttachmentstudentForm = new FormGroup({
      // 'Batch_Code': new FormControl(null, Validators.required),
      'Term_Name': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'sex': new FormControl(null, Validators.required),
    });
  }


  modal() {
    this.infoModal.show();
  }


  AttachAllFees() {
    this.attachloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'termcode': this.SelectedTerm.Term_Code,
    };
    this.commonService.Post_json(IU_AttachFeesToall,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.globalmessage.Show_successmessage('File attached successfully')
      this.attachloader = false;
      // console.log("Response ", this.res);
    });

  }

  GetBatchApi() { //select tag list displaying

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }


  GetTermSApi() { //select tag list displaying
    this.commonService.Post_json(FeesTerm,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Terms = response['data'];
      }
    });
  }

  onChangeTermSelect() {
  }

  onChangeBatchSelect() {
  }

  AllAttachDialog() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Are You Sure!... You Want To Attached All Students??",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.AttachAllFees();

      }
    })

  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';
  batch_code: any;
  Category: any;
  selectedRows: any;

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

  rowss: any = [];

  public rowSelection: 'single' | 'multiple' = 'multiple';


  columnDefs= [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },
    // {headerName: 'Attach', field: 'Action', maxWidth: 80, cellRenderer: CellCustomComponent},
    {headerName: 'Aadhaar No', field: 'aadhaar', sortable: true, filter: true, resizable: true},
    {headerName: 'Full Name', field: 'fullname', sortable: true, filter: true, resizable: true},
    {
      headerName: 'Subject Code',
      field: 'Subject_group_code',
      maxWidth: 120,
      sortable: true,
      filter: true,
      resizable: true
    },
    {headerName: 'Attached (Term)', field: 'term_name', maxWidth: 120, sortable: true, filter: true, resizable: true},
    {headerName: 'Category', field: 'category', sortable: true, filter: true, resizable: true},
    {headerName: 'Gender', field: 'gender', maxWidth: 100, sortable: true, filter: true, resizable: true},
    {headerName: 'Student Type', field: 'Student_type', maxWidth: 130, sortable: true, filter: true, resizable: true},

  ];

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {//on checkbox selection
    this.StudentAadhaar = -99;
    if (event.data.aadhaar > 0) {
      this.StudentAadhaar = event.data.aadhaar;
      // console.log("adhar:",event.data.aadhaar);
    }
    this.batch_code = event.data.batch_code;
    this.Category = event.data.category;
  }

  onSelectionChanged(event:any) {
    // console.log("Selection data:", event);
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log("Selection change data:", this.selectedRows);
  }

  ShowFees() {
    //let jsonin = this.feesAttachmentForm.value;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'college_code': this.oSession.collegecode,
      'batch_code': this.BatchCode,
      'Category': this.feesAttachmentForm.controls['category'].value,
      'gender': this.feesAttachmentForm.controls['sex'].value,
      'Term_Name': this.SelectedTerm.Term_Name,
    };

    this.commonService.Post_json(GetStudentFeesStructure,jsonin).subscribe((response) => {
      if (response == null){
        return ;
      }
      this.res = response;
      // console.log("Response ", this.res);
      this.gridOptions.api.setRowData(this.res.data);
      this.rowss = this.res.data;
    });
  }

  Unattachedstudents() {

    let jsonin = {
      'finyear': this.oSession.finyear,
      'CollegeCode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
    };
    this.commonService.Post_json(GetUnAttachedStudents,jsonin).subscribe((response) => {
      let res = response;
      if (res == null){
        return ;
      }
      // if (res.exception !=""){
      //   return ;
      // }
      this.gridOptions.api.setRowData(res.data);
      this.rowss = res.data;
    });
  }


}
