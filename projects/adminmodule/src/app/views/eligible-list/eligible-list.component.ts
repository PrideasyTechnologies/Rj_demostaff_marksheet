import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {DeleteCellCustomComponent} from '../delete-cellcustom/delete-cellcustom.component';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {EligiblelistService} from './eligible-list.service';
import {CommanService} from '../../globals/common.services';
import {GlobalMessage} from '../../globals/global.message';
import {GlobalDownloadfiles} from '../../globals/download_global';
import {AuthService} from '../../globals/authservice';
import {
  deletestudenteligiblelist,
  downloadstudenteligiblelist, showalleligiblelist,
  updateeligible,
  uploadstudenteligiblelist
} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-eligible-list',
  templateUrl: './eligible-list.component.html',
  styleUrls: ['./eligible-list.component.scss'],

})
export class EligibleListComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  public gridOptions: any;

  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  Batch_Code: any;
  AadhaarForDeleteEligibleList: any;

  EligibleListForm!: FormGroup;
  DownloadUploadForm!: FormGroup;

  public Batches_json!: [];
  StudentAadhaar: any;
  Sgpa_id: any;
  FullName: any;
  Sgpa: any;
  Creditpoints: any;
  Subject_group_code: any;

  Downloadloader = false;
  downloadclicked = false;
  viewloader = false;

  loader: any;
  edit: any;
  delete: any;
  errors: any;
  ///AutoComplete
  private batchcode: number = 0;
  Batchkeyword = 'Batch_Name';

  oSession!: Sessiondata;

  //update button
  batch_code: any;
  private xlsxFile!: Array<File>;
  public rowss: any = [];
  public columnDefs = [
    {field: '', maxWidth: 50, checkboxSelection: true},
    {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true},
    {headerName: 'Eligible Status', field: 'Eligiblestatus', editable: true, resizable: true},
    // {headerName: 'EDIT', field: 'Action', cellRendererFramework: EditCellCustomComponent},
    // {headerName: 'DELETE', field: 'Action', cellRendererFramework: DeleteCellCustomComponent},
  ];

  constructor(private router: Router,
              private commanservice: CommanService,
              private eligiblelistservice: EligiblelistService,
              private globalmessage: GlobalMessage,
              private globaldownload: GlobalDownloadfiles,
              private authservice : AuthService,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }


  // Finyear = this.authservice.getFinyear();
  // CollegeCode = this.authservice.getCollege();
  // Aadhaar = this.authservice.getLoginaadhaar();

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.GetBatchApi();
    this.DownloadUploadForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    });
    this.EligibleListForm = new FormGroup({
      // 'userexam': new FormControl('', Validators.required),
    });

  }


  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (this.xlsxFile[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && this.xlsxFile[0].size < 2400000) {
    } else {
      this.globalmessage.Show_error('Only .xlsx File allowed!');
      //Swal.fire({title: 'Error!', text: 'Only .xlsx File allowed!', icon: 'error', confirmButtonText: 'OK'});//alert
    }
  }


  uploadfile() {
    if (this.batchcode <= 0) {
      this.globalmessage.Show_error('Select Batch');
      //Swal.fire({title: 'Error!', text: 'Select Batch', icon: 'error', confirmButtonText: 'OK'});//alert
      return;
    }
    this.loader = true;

    let jsonin = {
      college_code : this.oSession.collegecode,
      finyear : this.oSession.finyear,
      batch_code : this.batchcode.toString()
    }

    let formData = new FormData();


    formData.append("input_form",encryptUsingAES256(jsonin));
    formData.append('file', this.xlsxFile[0]);

    this.commanservice.Post_formdata(uploadstudenteligiblelist,formData).subscribe((response) => {
        if (response == null) {
          this.loader = false;
          return;
        }
        if (response.data == true) {
          this.globalmessage.Show_message('File Uploaded Successfully!');
          this.viewFile();
          this.loader = false;
          this.DownloadUploadForm.reset();
        } else {
          this.globalmessage.Show_error(this.res.exception);
          this.loader = false;
        }
      },
      error => {
        this.loader = false;
        this.errors = error;
      });
  }


  EditCell(selectedRow: any) {
    let Studentaadhaar = selectedRow.Aadhaar;
    let Eligiblestatus = parseInt(selectedRow.Eligiblestatus);

    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'batch_code': this.batchcode,
      'aadhaar': Studentaadhaar,
      'eligiblestatus': Eligiblestatus,
    };
    // console.log(this.updateRelease);
    this.commanservice.Post_json(updateeligible,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }
      if (response.data == true) {
        this.globalmessage.Show_message('Updated Successfully!');
        this.viewFile();
      } else {
        this.globalmessage.Show_error(response.exception);
      }
    });
  }

  Create_gridcolumn() {

  }


  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {
    this.StudentAadhaar = event.data.Aadhaar;
    this.Sgpa_id = event.data.Sgpa_id;
    this.FullName = event.data.FullName;
    this.Sgpa = event.data.Sgpa;
    this.Creditpoints = event.data.Creditpoints;
  }

  onSelectionChanged(event: any) {
  }

  DeleteSuccessDialog() {
    if (this.AadhaarForDeleteEligibleList == null) {
      this.globalmessage.Show_error('Please select Row!');
      return;
    }

    let jsonin = {
      'College_code': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'Batch_code': this.batchcode,
      'Aadhaar': this.AadhaarForDeleteEligibleList
    };
    this.commanservice.Post_json(deletestudenteligiblelist,jsonin).subscribe(response => {
      if (response == null) {
        return;
      }

      if (response.data == true) {
        this.globalmessage.Show_message('Deleted Successfully!');
        this.viewFile();
      } else {
        this.globalmessage.Show_error(response.exception);
      }
    });
  }

  //Batch
  GetBatchApi() { //Batch select list displaying
    this.commanservice.Batches().subscribe((response: any) => {
      if (response == null) {
        return;
      }
      if (response['data'] == '' || response['data'] == null) {
        this.globalmessage.Show_error('No data found!');
        return;
      }
      this.Batches_json = response['data'];
    });
  }


  onChangeBatSemesterSelect() {
  }

  onChangeUserExamSelect() {
  }

  public rowSelection: 'single' | 'multiple' = 'single';

  //download File
  OnDownloadFile() {

    if (this.batchcode <= 0) {
      this.globalmessage.Show_error('Please Select Batch!');
      this.downloadclicked = false;
      this.Downloadloader = false;
      return;
    }


    let jsonin = {
      'collegecode': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'batchcode': this.batchcode,
      'aadhaar': this.oSession.aadhaar
    };

    this.downloadclicked = true;
    this.Downloadloader = true;
    this.commanservice.Post_json(downloadstudenteligiblelist,jsonin).subscribe(response => {
      if (response == null) {
        return;
      }
      this.globaldownload.Downloadfiles(response);
      this.Downloadloader = false;
      this.downloadclicked = false;

    }, error => {
      this.errors = error;
      this.downloadclicked = false;
      this.Downloadloader = false;
    });
  }

  viewFile() {
    if (this.batchcode <= 0) {
      this.globalmessage.Show_error('Please Select Batch!');
      return;
    }

    this.viewloader = true;
    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'batch_code': this.batchcode,
      'useraadhaar': this.oSession.aadhaar
    };
    this.commanservice.Post_json(showalleligiblelist,jsonin).subscribe(response => {
        if (response == null) {
          this.viewloader = false;
          return;
        }

        if (response.exception != null) {
          Swal.fire({title: 'Error!', text: response.exception, icon: 'error', confirmButtonText: 'OK'});
          this.viewloader = false;
          return;
        }

        this.gridOptions.api.setRowData(response.data);
        this.AadhaarForDeleteEligibleList = response.data[0].Aadhaar;
        this.viewloader = false;
      },
      error => {
        this.viewloader = false;
        this.errors = error;
      },);
  }


  resetAll() {
    this.EligibleListForm.reset();
  }


  selectBatch(event: any) {
    this.batchcode = event.Batch_Code;
  }

  onChangeSearch(search: string) {
  }

  onFocused(e: any) {
  }
}
