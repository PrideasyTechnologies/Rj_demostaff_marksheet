import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbcdFormService} from './abcd.service';
import {Router} from '@angular/router';
import {ColDef, GridOptions} from "ag-grid-community";
import {CommanService} from "../../globals/common.services";
import {
  Admissionstatusnep,
  AdmissionStatusreport, GetAllBatchs, studentabcdid_approval,
  studentabcdid_get,
  studentabcdid_list
} from "../../globals/global-api";
import {GlobalMessage} from "../../globals/global.message";
import {IlistModel} from "../../models/response";
import {DomSanitizer} from "@angular/platform-browser";
import {cilZoomIn} from "@coreui/icons";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';


@Component({
  selector: 'app-table',
  templateUrl: './abcd.component.html',
  styleUrls: ['./abcd.component.scss'],
  providers: [AbcdFormService],
})

export class AbcdFormComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;

  public gridOptions: any;

  error: any;
  date: any;
  loadershow = false;
  Showclicked = false;
  editCellData: any;
  searchValue: any;
  savealert: boolean = false;
  public filterQuery = '';
  submitted = false;
  editprofileForm!: FormGroup;
  AbcdAadhaarForm!: FormGroup;
  AbcdAadhaarModalForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch: any;
  formFeesPaid = 0;
  profileCompleted = 0;
  documentApproved = 0;
  feesAttached = 0;
  feesPaid = 0;
  private total = 0;
  private value: any;
  Deletecell: any;
  report: any;
  allreport: any;
  Subjects: any;
  Data: any = [];
  Freeshiploader= false;


  abcdlist: any = [];

  Myname: any;
  MyAadhaar: any;
  MyDob: any;

  Showallclicked = false;
  textloader = false;
  showloader = false;
  loader = false;
  croppedImage: any = '';
  out_rowselected: any;
  MyGender: any;
  MyImage: any;
  MyMobile: any;
  MyAbcId: any;

  oSession!: Sessiondata;



  constructor(private router: Router, private commonService: CommanService,
              private editprofileService: AbcdFormService, private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder, private globalmessage: GlobalMessage,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }



  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  ngOnInit(): void {

    // this.ShowReport();
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();


      this.GetBatchApi();
      this.ShowList();

    // this.AbcdAadhaarForm = new FormGroup({
    //   // 'abcdstatus': new FormControl('', Validators.required),
    // });
    this.AbcdAadhaarModalForm = new FormGroup({
      'abcdstatus': new FormControl('', Validators.required),
    });
  }

  // modal() {
  //   this.studentimagemodal.show();
  // }s

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }
  ShowReport() {//show All Report table
    this.loadershow = true;
    this.textloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': -99
    };
    this.commonService.Post_json(AdmissionStatusreport, jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      this.res = response;
      this.Data = this.res.data;

      for (var key in this.res.data) {
        if (this.res.data.hasOwnProperty(key)) {
          this.Subjects = this.res.data[key].Subjects;
        }
      }
      // this.findsum(this.Subjects);
      this.loadershow = false;
      this.textloader = false;
      this.Showallclicked = false;
    });
  }

  Admissionstausnep() {
    this.loader = true;
    this.textloader = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'collegecode': this.oSession.collegecode,
      'batchcode': -99
    };
    console.log('pass data', jsonin);
    this.commonService.Post_json(Admissionstatusnep, jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      this.res = response;
      this.Data = this.res.data;
      this.loader = false;
      this.textloader = false;
      this.Showallclicked = false;
    });

  }

  onRowSelectedEvent(event: any) {

  }


  // public abcdlist! : IlistModel[] ;



  onGetAbcid() {

    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);


    let jsonin = {
      "Aadhaar": parseInt(jsonObj[0].Loginaadhaar),
      "Collegecode": this.oSession.collegecode,
      "Finyear": this.oSession.finyear,
    };
    this.commonService.Post_json(studentabcdid_get,jsonin).subscribe((response: {}) => {
      if (response == null) {
        this.globalmessage.Show_error('No data found')
      }
      this.abcdlist = response

      this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.abcdlist.Blobdata}`);

      this.Myname = this.abcdlist.Aadhaarname;
      this.MyAadhaar = this.abcdlist.Loginaadhaar;
      this.MyDob = this.abcdlist.Dob;
      this.MyGender = this.abcdlist.Gender;
      this.MyMobile = this.abcdlist.Mobileno;
      this.MyAbcId = this.abcdlist.Abcdid;
      // this.Myname = this.abcdlist.Aadhaarname;
      // this.Myname = this.abcdlist.Aadhaarname;
      // this.Myname = this.abcdlist.Aadhaarname;
      console.log('lll', this.abcdlist.Aadhaarname)
    });
  }


  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
    this.onGetAbcid();
  }

  onCellDoubleClicked($event: any){
    // this.onGetAbcid();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  rowss: any = [];

  columnDefs = [
    // {
    //   field: '',
    //   maxWidth: 50, checkboxSelection: true
    // },

    {headerName: "Name", field: "Aadhaarname", sortable: true, resizable: true, filter: true},
    {headerName: "Dob", field: "Dob", sortable: true, resizable: true, filter: true},
    {headerName: "Gender", field: "Gender", sortable: true, resizable: true, filter: true},
    // { headerName: "Father's Name", field: "FatherName", resizable: true },
    // { headerName: "Mother's Name", field: "MotherName", resizable: true },
    {headerName: "Aadhaar", field: "Loginaadhaar", sortable: true, resizable: true, filter: true},
    {headerName: "Mobile Number", field: "Mobileno", sortable: true, resizable: true, filter: true},
    {headerName: "Roll No", field: "Rollno", sortable: true, resizable: true, filter: true},
    {headerName: "ABCD ID", field: "Abcdid", sortable: true, resizable: true, filter: true},
    // { headerName: "Gender", field: "Gender", resizable: true },
  ];


  // listresponse! : IlistModel[];
  listresponse: any;

  ShowList() {//show Report table on batch Select
    this.commonService.Post_json(studentabcdid_list,"").subscribe((response: {}) => {
      //

      if (response == null) {
        this.globalmessage.Show_error('No data found')
      }
      this.gridOptions.api.setRowData(response);
      this.rowss = response;
      this.listresponse = response;
      // this.onGetAbcid();

      // }
      // // this.showloader = true;
      // // this.textloader = true;
      // // let jsonin = {
      // //     'finyear': this.oSession.finyear,
      // //     'collegecode': this.oSession.collegecode,
      // //     'batchcode': this.BatchCode
      // // };
      // // // debugger;
      // // console.log('pass data', this.report);
      // // this.commonService.Post_json(AdmissionStatusreport,jsonin).subscribe((response: {}) => {
      // //     this.res = esponse;
      // //     console.log(this.res);
      // //     this.Data = this.res.data;
      // //     console.log('data', this.Data);
      // //     console.log('subjects', this.Subjects);
      // //     this.Showclicked = false;
      // //     this.showloader = false;
      // //     this.textloader = false;
      // // });
    });
  }

  resettotal() {
    this.formFeesPaid = 0;
    this.profileCompleted = 0;
    this.documentApproved = 0;
    this.feesAttached = 0;
    this.feesPaid = 0;
  }

  findsum(data: any) {
    // debugger;

    // debugger;
    this.value = data;
    console.log(this.value);
    for (let j = 0; j < data.length; j++) {
      this.formFeesPaid += this.value[j].FormFeesPaid;
      this.profileCompleted += this.value[j].ProfileCompleted;
      this.documentApproved += this.value[j].DocumentApproved;
      this.feesAttached += this.value[j].FeesAttached;
      this.feesPaid += this.value[j].FeesPaid;
      // console.log(this.total);
    }
  }

  public rowSelection: 'single' | 'multiple' = 'single';

  GetBatchApi() { //Batch select list displaying

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];

      }
    });
  }

  onChangeBatchSelect() {
  } //when Batch is Selected

  EditCell() {
    console.log('edit', this.editprofileForm.value)
    console.log('edit', this.editCellData);
  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';
  Abcid_aadhaar: any;

  selectBatch(bat: any) {
    if (bat.Batch_Code <= 0) {
      return;
    }
    this.BatchCode = bat.Batch_Code;
  }

  onChange_Batch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  UpdateAbcd() {
    // let jsonin = {
    //     'Collegecode': this.oSession.collegecode,
    //     'Finyear': this.oSession.finyear,
    //     'Useraadhaar': this.Aadhaar,
    //     'StudentAadhaar':this.Abcid_aadhaar,
    //     'Approval_status': this.
    // };

    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);

    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Useraadhaar: this.oSession.aadhaar,
      Studentaadhaar: parseInt(jsonObj[0].Studentaadhaar),
      Finyear: this.oSession.finyear,
      Approved_status: this.AbcdAadhaarModalForm.controls['abcdstatus'].value,
      Loginaadhaar: parseInt(jsonObj[0].Loginaadhaar),
      Mobileno : 9867110334,
    };
    console.log('oooo', jsonin)
    this.commonService.Post_json(studentabcdid_approval,jsonin).subscribe((response: any) => {
      if (response == null) {
        this.globalmessage.Show_error('Please select required data')
      }
      this.globalmessage.Show_message('Data submitted succesfully')
    });
  }

  showPreview($event: Event) {

  }
  
  protected readonly cilZoomIn = cilZoomIn;
  protected readonly IlistModel = IlistModel;
}
