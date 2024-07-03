import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbcdFormService} from './abcd.service';
import {Router} from '@angular/router';
import {GridOptions} from "ag-grid-community";
import {CommonService} from "../../../app/globals/common.service";
import {
  Admissionstatusnep,
  AdmissionStatusreport,
  studentabcdid_approval, studentabcdid_download, studentabcdid_get, studentabcdid_list,
  studentabcdid_rejectionlist
} from "../../globals/global-api";
import {GlobalMessage} from "../../globals/global.message";
import {IlistModel} from "../../models/response";
import {DomSanitizer} from "@angular/platform-browser";
import {cilZoomIn} from "@coreui/icons";
import {base64StringToBlob} from "blob-util";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

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

  studentimagemodal = false;

  error: any;
  date: any;
  Showclicked = false;
  editCellData: any;
  searchValue: any;
  savealert: boolean = false;
  public filterQuery = '';
  editprofileForm!: FormGroup;
  AbcdAadhaarModalForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch: any;
  Data: any = [];
  Freeshiploader = false;
  listresponse: any;

  ///AutoComplete
  BatchCode: number = 0;
  Batchkeyword = 'Batch_Name';

  abcdlist: any = [];

  Myname: any;
  MyAadhaar: any;
  MyDob: any;

  showloader = false;
  viewloader = false;
  loader = false;
  out_rowselected: any;
  MyGender: any;
  MyImage: any;
  MyMobile: any;
  MyAbcId: any;
  typeReason: any;

  oSession!: Sessiondata;

  constructor(private router: Router, private commonService: CommonService,
              private sessionservice: SessionService,
              private editprofileService: AbcdFormService, private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder, private globalmessage: GlobalMessage) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }


  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    console.log('kkk',this.oSession)

    this.AbcdAadhaarModalForm = new FormGroup({
      'abcdstatus': new FormControl('', Validators.required),
      'rejecttext': new FormControl('', Validators.required),
    });

    this.reasonType();
    this.GetBatchApi();
  }

  reasonType() {
    this.editprofileService.studentabcdid_rejectionlist().subscribe((response: any) => {
      if (response == null) {
        return;
      }
      this.typeReason = response;
    })
  }

  onFilterchange(event: any) {
    this.out_rowselected = null;
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

    // let Input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };


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
    });
  }


  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);

    this.onGetAbcid();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  rowss: any = [];

  columnDefs = [
    {headerName: "Approved Status", field: "Approved_status", sortable: true, resizable: true, filter: true},
    {headerName: "Name", field: "Aadhaarname", sortable: true, resizable: true, filter: true},
    {headerName: "Dob", field: "Dob", sortable: true, resizable: true, filter: true},
    {headerName: "Gender", field: "Gender", sortable: true, resizable: true, filter: true},
    {headerName: "Aadhaar", field: "Loginaadhaar", sortable: true, resizable: true, filter: true},
    {headerName: "Mobile Number", field: "Mobileno", sortable: true, resizable: true, filter: true},
    {headerName: "Roll No", field: "Rollno", sortable: true, resizable: true, filter: true},
    {headerName: "ABCD ID", field: "Abcdid", sortable: true, resizable: true, filter: true},
    {headerName: "Approved Status", field: "Approved_status", sortable: true, resizable: true, filter: true},

  ];

  ShowList() {//show Report table on batch Select
   this.Freeshiploader = true;
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Useraadhaar: this.oSession.aadhaar,
      Batch_code: this.BatchCode,
    };

    this.commonService.Post_json(studentabcdid_list,jsonin).subscribe((response) => {
      //
      if (response == null) {
        this.globalmessage.Show_error('No data found')
      }
      this.gridOptions.api.setRowData(response);
      this.rowss = response;
      this.listresponse = response;
      this.Freeshiploader = false;
    });
  }

  public rowSelection: 'single' | 'multiple' = 'single';

  GetBatchApi() { //Batch select list displaying

    this.editprofileService.Batches().subscribe((response: any) => {

      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];

      }
    });
  }

  selectBatch(bat: any) {
    if (bat.Batch_Code <= 0) {
      return;
    }
    this.BatchCode = bat.Batch_Code;
  }

  Downloadreports() {
    this.viewloader = true;
    if (this.BatchCode == null) {
      this.globalmessage.Show_error('Please select batch')
      return
    }
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Useraadhaar: this.oSession.aadhaar,
      Batch_code: this.BatchCode,
    };

    // let Input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(studentabcdid_download,jsonin).subscribe((response: any) => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
      this.viewloader = false;
    });
  }

  UpdateAbcd() {
    this.showloader = true;
    let pqr = this.AbcdAadhaarModalForm.controls['rejecttext'].value.toString();
    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);

    this.studentimagemodal = true;
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Useraadhaar: this.oSession.aadhaar,
      Studentaadhaar: parseInt(jsonObj[0].Studentaadhaar),
      Finyear: this.oSession.finyear,
      Approved_status: this.AbcdAadhaarModalForm.controls['abcdstatus'].value,
      Reason: pqr,
      Loginaadhaar: parseInt(jsonObj[0].Loginaadhaar),
      Mobileno: parseInt(jsonObj[0].Mobileno),
    };

    console.log('shshsjson',jsonin)

    this.commonService.Post_json(studentabcdid_approval,jsonin).subscribe((response: any) => {
      if (response == null) {
        this.globalmessage.Show_error('Please select required data')
      }
      this.globalmessage.Show_message('Data submitted succesfully')
      this.studentimagemodal = false;
      this.showloader = false;
    });
  }

  protected readonly cilZoomIn = cilZoomIn;
  protected readonly IlistModel = IlistModel;
}
