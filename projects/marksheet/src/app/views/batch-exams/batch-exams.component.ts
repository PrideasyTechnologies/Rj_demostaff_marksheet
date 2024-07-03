import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {formatDate} from '@angular/common';
import {GlobalMessage} from "../../globals/global.message";
import {CommonService} from "../../globals/common.service";
import {batchexamslist, Insertbatchexams, marksheetslab, templatelist, userexams} from "../../globals/global-api";
import {ISlab, Iuserexam} from "./batch-exams.model";
import { encryptUsingAES256 } from '../../globals/encryptdata';
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-batch-exams',
  templateUrl: './batch-exams.component.html',
  styleUrls: ['./batch-exams.component.scss'],
})
export class BatchExamsComponent implements OnInit {
  ShowMain = true;
  ShowAdd = false;
  ShowEdit = false;
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  searchValue: any;
  error: any;
  savealert: boolean = false;
  res: any;
  Batch_Code: any;
  BatchName: any;
  AddForm!: FormGroup;
  EditForm!: FormGroup;
  Batchs: any;
  SelectedBatch: any;

  SelectedTemplate: any;
  SelectedExamType: any;

  StudentAadhaar: any;
  Downloadloader = false;
  Addloader = false;
  Editloader = false;
  viewfile: any;
  downloadclicked = false;
  BatchCode: any;
  Userexamname: any;
  Userexamid: any;
  Batchexam_id: any;
  Examdate: any;
  Template: any;
  Nssgrace: any;
  Nsssymbol: any;
  Condonation: any;
  Condonationsymbol: any;
  SubjectGrace: any;
  Subjectsymbol: any;
  Gradejump: any;
  Overallcreditpoints: any;
  Printdate: any;
  Releaseddate: any;
  Certificatename: any;
  Eventdate: any;
  Outcheck: any;
  // Slabname: [];
  today!: string;
  Gradejumpsymbol: any;
  Batchkeyword = 'Batch_Name';

  UserExam!: Iuserexam[];
  SelectedUserExam!: Iuserexam;
  userexam: any;

  template: any;

  TemplateName: any;

  isChecked: any
  isChecked_edit: any

  SlabName!: ISlab[];
  SelectedSlab!: ISlab;
  slab: any;

  oSession!: Sessiondata;

  @ViewChild('infoModal') infoModal: any;

  constructor(
    private router: Router,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private sessionService : SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  ExamTypeList = [
    {id: 1, name: 'UG'},
    {id: 2, name: 'PG'},
    {id: 3, name: 'JUNIORS'},
  ];



  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        console.log('sesssion::',this.oSession.collegecode)

    this.GetBatchApi();

    this.AddForm = new FormGroup({
      userexam: new FormControl('', Validators.required),
      userexamedit: new FormControl('', Validators.required),
      examdate: new FormControl('', Validators.required),
      slab: new FormControl('', Validators.required),
      template: new FormControl('', Validators.required),
      printdate: new FormControl('', Validators.required),
      certificatename: new FormControl(''),
      releasedate: new FormControl(''),
      noofsemesters: new FormControl(''),
      overallcreditpoints: new FormControl(''),
      examType: new FormControl(''),
      subjectgracing: new FormControl(''),
      subjectsymbol: new FormControl(''),
      nssmarks: new FormControl(''),
      nssmarkssymbol: new FormControl(''),
      condonation: new FormControl(''),
      // 'maxmarks': new FormControl('', Validators.required),
      condonationsymbol: new FormControl(''),
      gradejumpmarks: new FormControl(''),
      gradesymbol: new FormControl(''),
      eventdateadd: new FormControl(''),
      checkoutstanding: new FormControl(''),
      // checkeligibility: new FormControl(''),
    });

    this.EditForm = new FormGroup({
      userexam: new FormControl('', Validators.required),
      userexamedit: new FormControl('', Validators.required),
      examdate: new FormControl('', Validators.required),
      slab: new FormControl('', Validators.required),
      template: new FormControl('', Validators.required),
      printdate: new FormControl('', Validators.required),
      certificatename: new FormControl(''),
      releasedate: new FormControl(''),
      noofsemesters: new FormControl(''),
      overallcreditpoints: new FormControl(''),
      examType: new FormControl(''),
      subjectgracing: new FormControl('', Validators.required),
      subjectsymbol: new FormControl('', Validators.required),
      nssmarks: new FormControl('', Validators.required),
      nssmarkssymbol: new FormControl('', Validators.required),
      condonation: new FormControl('', Validators.required),
      // 'maxmarks': new FormControl('', Validators.required),
      condonationsymbol: new FormControl('', Validators.required),
      gradejumpmarks: new FormControl('', Validators.required),
      gradesymbol: new FormControl('', Validators.required),
      eventdate: new FormControl(''),
      checkoutstanding_edit: new FormControl(''),
      // checkeligibility_edit: new FormControl(''),
    });
  }

  //Grid column
  columnDefs = [
    {
      field: 'Select',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Edit',
      maxWidth: 80,
      field: 'Action',
      cellRenderer: EditCellCustomComponent,
    },
    {headerName: 'User Batch Name', field: 'Userbatchname', resizable: true},
    {headerName: 'Exam Name', field: 'Userexamname', resizable: true},
    {headerName: 'Exam Date', field: 'Examdate', resizable: true},
    {headerName: 'Template', field: 'Template', resizable: true},
    {headerName: 'Subject Grace', field: 'Subject_Grace', resizable: true},
    {headerName: 'Subject Symbol', field: 'Subject_symbol', resizable: true},
    {headerName: 'Nss grace', field: 'Nss_grace', resizable: true},
    {headerName: 'Nss Symbol', field: 'Nss_symbol', resizable: true},
    {headerName: 'Condonation', field: 'Condonation_grace', resizable: true},
    {
      headerName: 'Condonation Symbol',
      field: 'Condonation_symbol',
      resizable: true,
    },
    {headerName: 'Grade Jump', field: 'Gradejump', resizable: true},
    {
      headerName: 'Grade Jump Symbol',
      field: 'Gradejumpsymbol',
      resizable: true,
    },
    {headerName: 'Slab Id', field: 'Slabid', resizable: true},
    {headerName: 'Slab Name Symbol', field: 'Slabname', resizable: true},
    {headerName: 'Released Date', field: 'Releaseddate', resizable: true},
    {
      headerName: 'Certificate Name',
      field: 'Certificatename',
      resizable: true,
    },
    // { headerName: 'Delete', field: 'Action', cellRendererFramework: DeleteCellCustomComponent },
  ];

  //Grid Rows
  rowss: any = [];

  //pagination page size
  public paginationPageSize = 10;

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
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
    console.log('Row eventttttt', event);

    this.StudentAadhaar = event.data.Aadhaar;
    this.Userexamname = event.data.Userexamname;
    this.Userexamid = event.data.Userexamid;
    this.Batchexam_id = event.data.Batchexam_id;
    this.Examdate = this.parseDate(event.data.Examdate);
    this.SelectedTemplate = event.data.Template;
    this.SelectedExamType = event.data.examtype;
    this.Nssgrace = event.data.Nss_grace;
    this.Nsssymbol = event.data.Nss_symbol;
    this.Condonation = event.data.Condonation_grace;
    this.Condonationsymbol = event.data.Condonation_symbol;
    this.SubjectGrace = event.data.Subject_Grace;
    this.Subjectsymbol = event.data.Subject_symbol;
    this.Gradejump = event.data.Gradejump;
    this.Gradejumpsymbol = event.data.Gradejumpsymbol;
    this.SelectedSlab = event.data.Slabid;
    this.SelectedExamType = event.data.Examtype;
    this.Overallcreditpoints = event.data.Overallcreditpoints;
    this.Releaseddate = this.parseDate(event.data.Releaseddate);
    this.Eventdate = this.parseDate(event.data.Eventdate)
    this.Certificatename = event.data.Certificatename;
    this.Printdate = this.parseDate(event.data.Printdate);

    this.Outcheck =  event.data.Outstanding;

    console.log('onRow change event:', this.SelectedTemplate);
  }

  onSelectionChanged(event: any) {
    console.log(event);
  }

  //Batch
  GetBatchApi() {
    //Batch select list displaying
    this.commonService.getBatches().subscribe((response) => {

      if (response == null) {
        return;
      }

      if (!response.hasOwnProperty('data')) {
        return;
      }

      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found!', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found!',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.Batchs = response['data'];
      }
    });
  }



  GetUserExamApi() {
    //Batch select list displaying
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };



    this.commonService.Post_json(userexams,jsonin).subscribe((response) => {

      if (response == null) {
        return;
      }

      if (!response.hasOwnProperty('data')) {
        return;
      }

      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found!', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found!',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.UserExam = response['data'];
      }
    });
  }



  GetTemplateApi() {

    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

    this.commonService.Post_json(templatelist,jsonin).subscribe((response) => {

      if (response == null) {
        return;
      }

      if (!response.hasOwnProperty('data')) {
        return;
      }

      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found!', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found!',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.TemplateName = response['data'];
      }
    });
  }



  GetSlabApi() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    };


    this.commonService.Post_json(marksheetslab,jsonin).subscribe((response) => {

      if (response == null) {
        return;
      }

      if (!response.hasOwnProperty('data')) {
        return;
      }

      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found!', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found!',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.SlabName = response['data'];
      }
    });
  }

  //when Batch is Selected
  onChangeBatchSelect(batch: any) {
    this.BatchCode = batch;
    console.log('batch', this.BatchCode);
  }

  onChangeUserExamSelect() {
    console.log('kkkk',this.SelectedUserExam)
  }

  onChangeTemplateSelect(e: any) {
    this.SelectedTemplate = e;
    console.log('TemplateSelected', this.SelectedTemplate);
  }

  onChangeExamTypeSelect(event: any) {
    this.SelectedExamType = event;
    console.log('Exam Type Selected', event);
  }

  onChangeSlabSelect() {

  }

  //show
  OnDownloadFile() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };



    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Batch!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      this.Downloadloader = true;
      this.commonService.Post_json(batchexamslist,jsonin).subscribe(
        (response) => {
          this.res = response;

          this.gridOptions.api.setRowData(this.res.data);
          this.rowss = this.res.data;
          this.downloadclicked = false;
          this.Downloadloader = false;
        }
      );
    }
  }

  //add button main screen
  mode = '';

  OnAdd() {
    this.mode = 'ADD';
    // console.log("add mode", this.mode);
    // this.infoModal.show();
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Batch!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      this.onresetform();
      // this.AddForm.controls['userexam'].disable()
      this.ShowMain = false;
      this.ShowAdd = true;
      // this.EditButton = false;
      // this.AddButton = true;
      this.ShowEdit = false;
    }
  }

  parseDate(dateString: string) {
    var parts = dateString.split('-');
    var dt = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );

    console.log('New Date:  ', dt);

    if (dt) {
      const format = 'YYYY-MM-dd';
      const formattedExamDate = formatDate(dt, format, 'en-US');
      console.log('formattedExamDate: ', formattedExamDate);

      return formattedExamDate;
    }
    return null;
  }

  //add button grid screen
  EditCell(data: any) {
    this.mode = 'EDIT';
    // Krunal
    // console.log('edit  moment(data.Releaseddate)', moment(data.Releaseddate));
    if (this.BatchCode == null) {
      // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select Batch!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    }
    if (this.Userexamname == null) {
      console.log('SelectedUserExam', this.Userexamname);
      // this.dialogService.open({ message: 'Please Select row to edit!', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Error!',
        text: 'Please Select row to edit!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      this.onresetform();
      this.AddForm.controls['userexamedit'].disable();
      this.ShowMain = false;
      this.ShowAdd = false;
      this.ShowEdit = true;
    }
  }

  onresetform() {
    this.AddForm.reset();
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/batch-exams']);
    });
  }

  insertbatch: any;


  //Add Batch exam
  Addbutton() {
    this.Addloader = true;

    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      examdate: this.AddForm.controls['examdate'].value,
      userexamid: this.SelectedUserExam.Userexamid,
      userbatchname: this.BatchName,
      template: this.SelectedTemplate,
      createdby: this.oSession.aadhaar,
      nssgrace: this.AddForm.controls['nssmarks'].value,
      nsssymbol: this.AddForm.controls['nssmarkssymbol'].value,
      condonationgrace: this.AddForm.controls['condonation'].value,
      printdate: this.AddForm.controls['printdate'].value,
      // "maxcondonationsubject": this.AddForm.controls['maxmarks'].value,
      condonationsymbol: this.AddForm.controls['condonationsymbol'].value,
      gradejump: this.AddForm.controls['gradejumpmarks'].value,
      gradejumpsymbol: this.AddForm.controls['gradesymbol'].value,
      subjectgrace: this.AddForm.controls['subjectgracing'].value,
      subjectsymbol: this.AddForm.controls['subjectsymbol'].value,
      slabid: this.AddForm.controls['slab'].value,
      releaseddate: this.AddForm.controls['releasedate'].value,
      certificatename: this.AddForm.controls['certificatename'].value,
      numberofsemester: 0,
      overallcreditpoints:
        parseInt(this.AddForm.controls['overallcreditpoints'].value),
      examtype: this.AddForm.controls['examType'].value,
      entrymode: this.mode,
      eventdate: this.AddForm.controls['eventdateadd'].value,
      outstanding: this.isChecked
    };

    console.log('insertbatchinsertbatch', jsonin);
    this.commonService.Post_json(Insertbatchexams,jsonin).subscribe(
      (response) => {
        this.res = response;
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Added Successfully!', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Success!',
            text: 'Added Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }); //alert

          this.AddForm.reset();
          this.ShowAdd = false;
          this.ShowMain = true;
          this.OnDownloadFile();
          this.Addloader = false;
        } else {
          // this.dialogService.open({ message: this.res.exception, positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: this.res.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        }
      }
    );
  }

  editbatch: any;


  //Edit Batch
  Editbutton() {
    // this.Editloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchexam_id: this.Batchexam_id,
      batch_code: this.BatchCode,
      examdate: this.EditForm.controls['examdate'].value,
      userexamid: this.Userexamid,
      userbatchname: this.BatchName,
      template: this.EditForm.controls['template'].value,
      createdby: this.oSession.aadhaar,
      nssgrace: this.EditForm.controls['nssmarks'].value,
      nsssymbol: this.EditForm.controls['nssmarkssymbol'].value,
      condonationgrace: this.EditForm.controls['condonation'].value,
      printdate: this.EditForm.controls['printdate'].value,
      // "maxcondonationsubject": this.AddForm.controls['maxmarks'].value,
      condonationsymbol: this.EditForm.controls['condonationsymbol'].value,
      gradejump: this.EditForm.controls['gradejumpmarks'].value,
      gradejumpsymbol: this.EditForm.controls['gradesymbol'].value,
      subjectgrace: this.EditForm.controls['subjectgracing'].value,
      subjectsymbol: this.EditForm.controls['subjectsymbol'].value,
      releaseddate: this.EditForm.controls['releasedate'].value,
      certificatename: this.EditForm.controls['certificatename'].value,
      numberofsemester: 0,
      overallcreditpoints: parseInt(
        this.EditForm.controls['overallcreditpoints'].value
      ),
      examtype: this.EditForm.controls['examType'].value,
      slabid: this.EditForm.controls['slab'].value,
      entrymode: this.mode,
      eventdate: this.EditForm.controls['eventdate'].value,
      outstanding: this.isChecked_edit
    };
    // console.log('inputsss',jsonin)




    this.commonService.Post_json(Insertbatchexams,jsonin).subscribe(
      (response) => {
        this.res = response;
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Updated Successfully!', positive: 'Ok', })//alert

          this.globalmessage.Show_succesmessage('Updated Successfully!')

          // Swal.fire({
          //   title: 'Success!',
          //   text: 'Updated Successfully!',
          //   icon: 'success',
          //   confirmButtonText: 'OK',
          // }); //alert

          // this.infoModal.hide();
          this.EditForm.reset();
          this.ShowEdit = false;
          this.ShowMain = true;
          this.OnDownloadFile();
          this.Editloader = false;

        } else {
          // this.dialogService.open({ message: this.res.exception, positive: 'Ok', })//alert
          // this.dialogService.open({ message: 'Failed to Update!', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: this.res.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert

          // this.infoModal.hide();
        }
      }
    );

  }



  ///AutoComplete
  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
    this.BatchName = bat.Batch_Name;
    this.GetUserExamApi();
    this.GetTemplateApi();
    this.GetSlabApi();
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


  changeCheckboxoutstanding(event: any){
    this.isChecked = event
    console.log('kkk',this.isChecked)
  }

  changeCheckboxoutstanding_edit(event: any){
    this.isChecked_edit = event
  }
}
