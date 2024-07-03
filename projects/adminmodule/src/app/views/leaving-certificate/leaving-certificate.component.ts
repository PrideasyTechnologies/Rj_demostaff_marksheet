import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {base64StringToBlob} from 'blob-util';
import {DeleteCellCustomComponent} from '../delete-cellcustom/delete-cellcustom.component';
import {LeavingCertificateService} from './leaving-certificate.service';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {
  downloadLC, downloadstudentlcdata, deleteLC,
   uploadLC, GetAllBatchs
} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { encryptUsingAES256 } from '../../globals/encryptdata';

@Component({
  selector: 'app-leaving-certificate',
  templateUrl: './leaving-certificate.component.html',
  styleUrls: ['./leaving-certificate.component.scss'],

})
export class LeavingCertificateComponent implements OnInit {
  private gridApi: any
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  Batch_Code: any;
  LeavingCertificateForm!: FormGroup;
  AadhaarForDeleteEligibleList: any;
  EditForm!: FormGroup;
  DownloadUploadForm!: FormGroup;
  Batchs: any;
  pdfFiles: any;
  StudentAadhaar: any;
  SelectedBatch: any;
  updatedata: any;
  ViewDataResponse: any;
  Downloadloader = false;
  viewfile: any;
  downloadclicked = false;
  loader: any;
  formData = new FormData();
  viewloader = false;
  printloader = false;
  viewfiles: any;
  edit: any;

  batTemplate: any;
  notFoundTemplate: any;

  currentactive: boolean = false;

  oSession!: Sessiondata;

  constructor(private router: Router,private commonService: CommanService,
              private LeavingCertificateService: LeavingCertificateService,
              private globalmessage:GlobalMessage,
              private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }




  ngOnInit(): void {
    // if (!this.Token) {
    //   // this.dialogService.open({ message: 'Please Login', positive: 'Ok', })//alert
    //   Swal.fire({title: 'Error!', text: 'Please Login!', icon: 'error', confirmButtonText: 'OK'});//alert
    //
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.GetBatchApi();


    this.DownloadUploadForm = new FormGroup({
      'upload': new FormControl('', Validators.required),
    });
    this.LeavingCertificateForm = new FormGroup({
      'stream': new FormControl(''),
    });

    this.currentactive = true;

    // console.log("CollegeCode",this.oSession.collegecode);
    // console.log("Finyear",this.oSession.finyear);
    // console.log("Aadhaar",this.oSession.aadhaar);


  }

  //Upload File
  xlsxFile!: Array<File>;

  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    console.log('xlsxfille:',this.xlsxFile)
    if (this.xlsxFile[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && this.xlsxFile[0].size < 2400000) {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({title: 'Error!', text: 'Only .xlsx File allowed!', icon: 'error', confirmButtonText: 'OK'});//alert
      //  this.resetAll();
    }
  }


  uploadfile() {

    if (this.xlsxFile == null) {
      this.globalmessage.Show_error("File not selected ");
      return;
    }

    this.loader = true;
    let jsonin = {
      college_code : this.oSession.collegecode,
      finyear : this.oSession.finyear,
      batch_code :  this.BatchCode,
    }

    let formData = new FormData();
   
    formData.append("input_form",encryptUsingAES256(jsonin));
    formData.append('file', this.xlsxFile[0]);


    this.commonService.Post_formdata(uploadLC,formData).subscribe((response: {}) => {
      this.res = response;
      console.log('My Xlsxs Response ', this.res);
      if (this.res.data == true) {
        // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })

        Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert
        this.DownloadUploadForm.controls['upload'].reset();
        this.loader = false;

      } else {
        // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
        //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        this.loader = false;
        this.DownloadUploadForm.controls['upload'].reset();
      }
    });
  }

  //Grid column
  columnDefs = [
    {
      field: '',
      maxWidth: 50, checkboxSelection: true
    },

    {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true},

    {headerName: 'DELETE', field: 'Action', maxWidth: 80, cellRenderer: DeleteCellCustomComponent},
  ];

  //Grid Rows
  rowss: any = [];

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {

    this.AadhaarForDeleteEligibleList = event.data.Aadhaar;

  }

  onSelectionChanged(event: any) {
    console.log(event);
  }

  refreshupdate() {
    this.viewfiles = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'batch_code': this.BatchCode,
      'useraadhaar': this.oSession.aadhaar
    };
    console.log('data', this.viewfiles);
    // this.LeavingCertificateService.viewstudentsgpa(this.viewfiles).subscribe(models => {
    //   this.res = models;
    //   this.rowss = this.res.data;
    // })
  }

  //update Button
  OnUpdate() {
    this.edit = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'useraadhaar': this.oSession.aadhaar
    };
    if (this.oSession.aadhaar == null) {
      // this.dialogService.open({ message: 'Please Select Row to edit!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please select Row!', icon: 'error', confirmButtonText: 'OK'});//alert

    } else {
      // this.LeavingCertificateService.editstudentsgpa(this.edit).subscribe(models => {
      //   this.res = models;
      //   console.log("res", this.res);
      //   if (this.res.data == true) {
      //     // this.dialogService.open({ message: 'Updated Successfully!', positive: 'Ok', })//alert
      //     Swal.fire({ title: 'Success!', text: 'Updated Successfully!', icon: 'success', confirmButtonText: 'OK' })//alert

      //     // this.infoModal.hide();
      //     this.refreshupdate();
      //   }
      //   else {
      //     // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
      //     Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert

      //   }
      // })
    }
  }

  DeleteSuccessDialog() {
    let jsonin = {
      'college_code': this.oSession.collegecode,
      'finyear': this.oSession.finyear,
      'batch_code': this.BatchCode,
      'aadhaar': parseInt(this.AadhaarForDeleteEligibleList)
    };

    if (this.AadhaarForDeleteEligibleList == null) {
      // this.dialogService.open({ message: 'Please Select Row to delete!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please select Row!', icon: 'error', confirmButtonText: 'OK'});//alert

    } else {
      this.commonService.Post_json(deleteLC,jsonin).subscribe(response => {
        this.res = response;

        console.log('res AadhaarForDeleteEligibleList', this.res);
        console.log('AadhaarForDeleteEligibleList addhaar no', this.AadhaarForDeleteEligibleList);

        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', })//alert
          Swal.fire({title: 'Success!', text: 'Deleted Successfully!', icon: 'success', confirmButtonText: 'OK'});//alert

          this.viewFile();
        } else {
          // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
          Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
        }
      });
    }
  }

  //Batch
  GetBatchApi() { //Batch select list displaying
    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        Swal.fire({
          title: 'Error!',
          text: 'No data found! Please Configure ValueAdded..',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  //download File
  OnDownloadFile() {
    this.downloadclicked = true;
    this.Downloadloader = true;
    let jsonin = {
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'BatchCode': this.BatchCode,
      'reporttype': 'XL'
      // "Aadhaar": this.oSession.aadhaar
    };
    console.log('Downloadfile', jsonin);
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Batch!', icon: 'error', confirmButtonText: 'OK'});//alert
      this.downloadclicked = false;
      this.Downloadloader = false;
    } else {
      this.commonService.Post_json(downloadLC,jsonin).subscribe(response => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.Downloadloader = false;
        this.downloadclicked = false;
        // console.log("file created",byteArray);
        console.log('downloadURL', downloadURL);
      });
    }
  }

  PdfileView() {
   let jsonin = {
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'BatchCode': this.BatchCode,
      'reporttype': 'PDF',
      stream: this.LeavingCertificateForm.controls['stream'].value
    };
    console.log('Downloadfile', jsonin);
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({title: 'Error!', text: 'Please Select Batch!', icon: 'error', confirmButtonText: 'OK'});//alert
      this.downloadclicked = false;
      this.printloader = false;
    } else {
      this.commonService.Post_json(downloadLC,jsonin).subscribe(response => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.filename;
        link.click();
        this.printloader = false;
        this.downloadclicked = false;
        // console.log("file created",byteArray);
        console.log('downloadURL', downloadURL);
      });
    }
  }


  viewFile() {

    if (this.BatchCode == null) {
      Swal.fire({title: 'Error!', text: 'Please Select Batch!', icon: 'error', confirmButtonText: 'OK'});//alert
      this.viewloader = false;
    }

    this.viewloader = true;
    let jsonin = {
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'BatchCode': this.BatchCode,
      'Reporttype': 'VIEW'
    };

    this.commonService.Post_json(downloadLC,jsonin).subscribe(response => {
      this.res = response;
      this.gridOptions.api.setRowData(this.res.data);
      this.viewloader = false;
      this.ViewDataResponse = this.res.data;
    });
  }


  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  LCDownloadloader = false;

  public rowSelection: 'single' | 'multiple' = 'single';

  OnDownloadExistingLC() {
    if (this.BatchCode == null) {
      Swal.fire({title: 'Error!', text: 'Please Select Batch!', icon: 'error', confirmButtonText: 'OK'});//alert
      this.LCDownloadloader = false;
      return;
    }

    this.LCDownloadloader = true;
    let jsonin = {
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'BatchCode': this.BatchCode,
      'reporttype': 'XL'
    };

    this.commonService.Post_json(downloadstudentlcdata,jsonin).subscribe(response => {
      if(response == null){
        return;
      }
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.filename;
      link.click();
      this.LCDownloadloader = false;
    });
  }



  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
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
