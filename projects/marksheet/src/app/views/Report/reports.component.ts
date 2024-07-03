import {Component} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import {base64StringToBlob} from 'blob-util';
import Swal from 'sweetalert2';
import {GlobalMessage} from '../../globals/global.message';
import {UDownloadfiles} from "../../globals/global_downloadfiles";
import {SEVENSCLAE, TENSCALE} from '../../globals/global.constant';
import {CommonService} from "../../globals/common.service";
import {ISemester} from "../../models/response";
import {
  allsemesterpoints,
  batchuserexam,
  currentexampoint, download_hallticket,
  downloadconvocation,
  downloadsemestersubjects, examcgpacreditpoint_url, ExcelRollCall, failstduents, finderrorindataentry,
  junior_avgmarks,
  juniormarksheet,
  printcertificate, printmarksheet, printmarksheet_date,
  printmarksheetexamwise,
  printvalueaddcourse,
  processcreditmarks, processoverallcgpa, report_batchexamstudentcount, semesterwisemarks, templatename,
  uploadconvocation
} from "../../globals/global-api";
import {Itemplate} from "./reports.model";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";


type MyArrayType = Array<{ id: number, name: string }>;

@Component({
    selector: 'app-bill-desk',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class DownloadFileComponent {
  gridOptions: any;
  searchValue: any;
  savealert: boolean = false;
  submitted = false;
  xlsxFile: Array<File> = [];
  uploadloader = false;
  formData = new FormData();
  PrintMarksheet!: FormGroup;
  JuniorMarksheetForm!: FormGroup;
  CertificatePrintingForm!: FormGroup;
  CgpaForm!: FormGroup;
  SemSubjectForm!: FormGroup;
  ValueAddedForm!: FormGroup;
  ResultPrintForm!: FormGroup;

  Processmarksheet!: FormGroup;
  StudentsCountForm!: FormGroup;

  ExamWiseStudentCountForm!: FormGroup;

  SelectedBatch: any;

  SelectedBatSemester: any;
  SelectedReportType: any;
  loader = false;
  res: any;
  resmarksheetdate: any;
  filename: any;
  aurl: any;
  rollcallfile: any;
  RollCallUrl: any;
  OnRollcallloader = false;
  juniorloader = false;
  conloader = false;
  condownloadloader = false;
  OnRollcallclicked = false;
  semmarks: any;
  exampointloader = false;
  exampointclicked = false;
  examcgpaloader = false;


  processclicked = false;
  processloader = false;
  normalprocessloader = false;
  sevenscaleloader = false;

  downloadclicked = false;
  singledownloadclicked = false;
  singledownloadloader = false;
  downloadloader = false;
  certificateloader = false;
  download: any;
  downloadsemloader = false;
  SemSubjectclicked = false;
  valueaddedloader = false;
  newuuidValue: any;
  uuidValue!: string;
  newuid: any;
  Juniordata: any;
  valueaddeddata: any;
  http: any;

  Batchs: any;
  Semesters: any;
  sem: any;
  batsem: any;
  BatchSemesters: any;
  overallcgpaloader = false;
  overallcgpa: any;
  cgpaloader = false;
  cgpa: any;
  Resultprintloader = false;
  Resultprintdata: any;
  BatchCode: any;
  BatchCode_rollcall: any;
  Batchkeyword = 'Batch_Name';
  namesubject!: ISemester[];
  SelectedSemester!: ISemester;

  Templates!: Itemplate[];
  Selectedtemplate!: Itemplate;
  marksheetDownloadloader = false;

  // marksheetDownloadloader = false;
  // marksheetDownloadloader = false;

  public loadingadditional = new Array(0);
  public btn_diabled_additional = true;

  public printmarksheetdiabl = false;

  public semwisemarksentrydiabl = false;

  semwisemarksentryloader = false;

  edit_batchtype: any;
  examwisestudentcount: any;

  semwisecountloader = false;

  Batch_Name: any;

  printcertificate_rle: any;

  oSession!: Sessiondata;

  constructor(
    private router: Router,private sessionservice : SessionService,
    private formBuilder: FormBuilder,
    private globalmessage: GlobalMessage,
    private commonService: CommonService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  // CollegeCode = parseInt(sessionStorage.getItem('College')!);
  // Aadhaar = sessionStorage.getItem('Aadhaar')!;

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();
    this.GetTemplateApi();
    this.Createform();
  }

  Createform() {
    this.PrintMarksheet = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      template: new FormControl('', Validators.required),
      aadhaar: new FormControl(''),
      upload: new FormControl(''),
      rledate: new FormControl('', Validators.required),
    });

    this.Processmarksheet = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      template: new FormControl('', Validators.required),
      aadhaar: new FormControl(''),
    });

    this.JuniorMarksheetForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      report_type: new FormControl('', Validators.required),
    });
    this.ResultPrintForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
      report_type: new FormControl('', Validators.required),
    });

    this.SemSubjectForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
    });

    this.ValueAddedForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
    });

    this.CertificatePrintingForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required),
    });

    this.StudentsCountForm = new FormGroup({
      edit_batchtype: new FormControl('', Validators.required),
    });
    this.ExamWiseStudentCountForm = new FormGroup({
      Semester_Name: new FormControl('', Validators.required)
    })
    this.StudentsCountForm = new FormGroup({
      edit_batchtype: new FormControl('', Validators.required),
    });
  }

  generateUUID() {
    this.newuid = uuid.v4();
    this.uuidValue = this.newuid.replace(/-/g, '');
    return this.uuidValue;
  }

  //sELECT BATCH
  GetBatchApi() {
    this.commonService.getBatches().subscribe((response) => {
      if (response == null) {
        return;
      }
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  //semester
  GetSemesterApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

   /* let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.commonService.Post_json(batchuserexam, jsonin)
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure Marksheet..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.namesubject = response['data'];

          console.log('Response Exam-----', this.namesubject)
        }
      });
  }

  GetBatchSemesterApi() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
    };

    /*let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.commonService.Post_json(batchuserexam, jsonin)
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure Marksheet..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.BatchSemesters = response['data'];
        }
      });
  }

  GetTemplateApi() {
    this.commonService.Post_json(templatename,"").subscribe((response: any) => {
      console.log('template:', response);
      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found! Please Configure Marksheet..',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.Templates = response['data'];
      }
    });
  }

  onChangeBatchSelect() {
    this.GetSemesterApi();
    this.GetBatchSemesterApi();
  }

  onChangeSemesterSelect() {

  }

  onChangeBatSemesterSelect() {
  }

  onChangeTemplateSelect() {
  }

  onChangeReportTypeSelect() {
  }

  OnRollcalltypeForm() {
    this.OnRollcallloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      // "batchcode": this.SelectedBatch.Batch_Code
      batchcode: this.BatchCode_rollcall,
      reporttype: 'XL',
    };

    /*let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    if (this.BatchCode_rollcall == null) {
      // this.dialogService.open({ message: 'Please select batch!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: 'Please select batch!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert

      this.OnRollcallloader = false;
      this.OnRollcallclicked = false;
    } else {
      this.commonService.Post_json(ExcelRollCall, jsonin)
        .subscribe((response) => {
          this.res = response;
          // console.log("file created");
          // this.filename = this.res.excelfile;
          // console.log("file created");
          // this.RollCallUrl = DownloadExcel + this.res.excelfile;

          // this.downloadfileService
          //   .download(this.RollCallUrl)
          //   .subscribe(blob => saveAs(blob, this.res.excelfile))

          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);

          let blob = new Blob([blobb], {type: 'application/blob'});

          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.res.filename;
          link.click();
          this.OnRollcallloader = false;
          this.OnRollcallclicked = false;
        });
    }
  }

  SemwiseMarksheetDownload() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

    console.log('jsoninnn::',jsonin)

    /*let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.semwisemarksentrydiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(semesterwisemarks, jsonin).subscribe(
      (response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your data')
          this.semwisemarksentrydiabl = false;
        }
        this.semwisemarksentrydiabl = true;
        console.log('Data :', jsonin);
        this.commonService.Post_json(semesterwisemarks, jsonin).subscribe(
          (response: any) => {
            this.semwisemarksentrydiabl = false;
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);

            let blob = new Blob([blobb], {type: 'application/blob'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.downloadfile;
            link.click();
            this.semwisemarksentryloader = false;
            // this.Marksheetclicked = false;
          },
        );
      })
    // (error) => {
    //   this.Marksheetloader = false;
    //   this.Marksheetclicked = false;
    //   if (error.error !== null) {
    //     console.error('error caught in component', error);
    //     Swal.fire({
    //       title: 'Error!',
    //       text: error.error.exception,
    //       icon: 'error',
    //       confirmButtonText: 'OK',
    //     }); //alert
    //   } else {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: error.status + 'Server Error!',
    //       icon: 'error',
    //       confirmButtonText: 'OK',
    //     }); //alert
    //   }
    //   // this.resetAll();
    // }

  }

  semWisePointsDownload() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      Batchname: this.Batch_Name,
      Semestername: this.SelectedBatSemester.Userexamname,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

    /*let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.semwisemarksentrydiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(allsemesterpoints, jsonin).subscribe(
      (response) => {
        this.semwisemarksentrydiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], {type: 'application/blob'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.semwisemarksentryloader = false;
        // this.sempointsclicked = false;
      },
      (error) => {
        this.semwisemarksentryloader = false;
        // this.sempointsclicked = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  examWisePointsDownload() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      Batchname: this.Batch_Name,
      Semestername: this.SelectedBatSemester.Userexamname,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

   /* let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.semwisemarksentrydiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(currentexampoint, jsonin).subscribe(
      (response) => {
        this.semwisemarksentrydiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], {type: 'application/blob'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.semwisemarksentryloader = false;
        this.exampointclicked = false;
      },
      (error) => {
        this.semwisemarksentryloader = false;
        this.exampointclicked = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  DataEntryStatus() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

   /* let jsonin = {
      Input: encryptUsingAES256(jsonin)
    };*/

    this.semwisemarksentrydiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(finderrorindataentry, jsonin).subscribe(
      (response) => {
        this.semwisemarksentrydiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], {type: 'application/blob'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.semwisemarksentryloader = false;
        // this.dataentryclicked = false;
      },
      (error) => {
        this.semwisemarksentryloader = false;
        // this.dataentryclicked = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  ExamCgpacreditpoint() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

    this.semwisemarksentrydiabl = true;
    this.commonService.Post_json(examcgpacreditpoint_url, jsonin).subscribe(
      (response) => {
        this.semwisemarksentrydiabl = false;
        // this.res = response;

        UDownloadfiles(response.blobdata,response.excelfile)
        // const contentType = '';
        // const blobb = base64StringToBlob(this.res.blobdata, contentType);
        //
        // let blob = new Blob([blobb], {type: 'application/blob'});
        //
        // var downloadURL = window.URL.createObjectURL(blob);
        // var link = document.createElement('a');
        // link.href = downloadURL;
        // link.download = this.res.excelfile;
        // link.click();
        this.semwisemarksentryloader = false;
      },

    );
  }

  SemWiseFailed() {
    this.semwisemarksentryloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      semester: this.SelectedBatSemester.Semester,
      batchexam_id: this.SelectedBatSemester.Batchexam_id,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.semwisemarksentrydiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(failstduents, jsonin).subscribe(
      (response) => {
        this.semwisemarksentrydiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);

        let blob = new Blob([blobb], {type: 'application/blob'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.semwisemarksentryloader = false;
        // this.failedclicked = false;
      },
      // (error) => {
      //   this.failedloader = false;
      //   this.failedclicked = false;
      //   if (error.error !== null) {
      //     console.error('error caught in component', error);
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.error.exception,
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   } else {
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.status + 'Server Error!',
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   }
      //   // this.resetAll();
      // }
    );
  }

  //onProcess
  OnProcess(nProcesstype: string) {
    this.normalprocessloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: parseInt(this.Processmarksheet.controls['aadhaar'].value),
      Markscale: TENSCALE,
      Processtype: nProcesstype
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    if (jsonin.aadhaar <= 0) {
      jsonin.aadhaar = -99;
    }

    this.commonService.Post_json(processcreditmarks,jsonin).subscribe(
      (response) => {
        this.res = response;
        // console.log("Prakash :", response);
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'Processed Successfully!', positive: 'Ok', })
          Swal.fire({
            title: 'Success!',
            text: 'Processed Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }); //alert

          this.processclicked = false;
          this.normalprocessloader = false;
          // this.resetAll();
        } else {
          // this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
          Swal.fire({
            title: 'Error!',
            text: this.res.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert

          this.processclicked = false;
          this.normalprocessloader = false;
          // this.resetAll();
        }
      },
      // (error) => {
      //   this.processclicked = false;
      //   this.processloader = false;
      //   if (error.error !== null) {
      //     console.error('error caught in component', error);
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.error.exception,
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   } else {
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.status + 'Server Error!',
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   }
      //   // this.resetAll();
      // }
    );
  }

  OverallCGPA() {
    this.overallcgpaloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: this.BatchCode,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      semester: -99,
      aadhaar: parseInt(this.Processmarksheet.controls['aadhaar'].value),
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(processoverallcgpa, jsonin).subscribe(
      (response) => {
        this.res = response;
        console.log('check :', response);
        if (this.res.data == true) {
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }); //alert
          this.overallcgpaloader = false;
        } else {
          Swal.fire({
            title: 'Error!',
            text: this.res.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
          this.overallcgpaloader = false;
        }
      },
      (error) => {
        this.overallcgpaloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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
      }
    );
  }

  // OnUpdateCGPA() {
  //   this.cgpaloader = true;
  //   this.cgpa = {
  //     "finyear": this.oSession.finyear,
  //     "college_code": this.oSession.collegecode,
  //     "useraadhaar": parseInt(this.oSession.aadhaar),
  //     // "batch_code": this.BatchCode,
  //     "Seven_scale": parseInt(this.CgpaForm.controls['sevenscale'].value),
  //     "Aadhaar": parseInt(this.CgpaForm.controls['aadhaar'].value)
  //   }
  //   this.downloadfileService.update_sixsemestersgpa(this.cgpa).subscribe(response => {
  //     this.res = response;
  //     console.log("check :", response);
  //     if (this.res.data == true) {
  //       Swal.fire({ title: 'Success!', text: "Updated Successfully!", icon: 'success', confirmButtonText: 'OK' })//alert
  //       this.cgpaloader = false;
  //     }
  //     else {
  //       Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert
  //       this.cgpaloader = false;
  //     }
  //   },
  //     (error) => {
  //       this.cgpaloader = false;
  //       if (error.error !== null) {
  //         console.error('error caught in component', error)
  //         Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
  //       }
  //       else {
  //         Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
  //       }
  //     })
  // }

  //on print marksheet Download
  On_Printmarksheet(sParam: string) {
    let nAddhar = parseInt(this.PrintMarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhar)) {
      nAddhar = 0;
    }

    this.marksheetDownloadloader = true;
   let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      template: this.Selectedtemplate.Name,
      aadhaar: nAddhar,
      Abc_aadhaar: sParam,
      Application: "MARKSHEET",
      Rledate: String(this.PrintMarksheet.controls['rledate'].value)
    };

   console.log('inppr',jsonin)
    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    if (
      jsonin.aadhaar <= 0
    ) {
      jsonin.aadhaar = -99;
    }
    this.printmarksheetdiabl = true;

//Your JSON data
//     const jsonData = this.downloadProcess;
//     const jsonString = JSON.stringify(jsonData);
//
// // Encryption key and initialization vector (IV)
//     const key = CryptoJS.enc.Utf8.parse('03c1e3bc-a08d-4d61-909d-e12baa0af4a9');
//      const iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');
//
//     // const iv = CryptoJS.enc.Utf8.parse('');
// //
// // Encrypt the JSON data
//     const encrypted = CryptoJS.AES.encrypt(jsonString, key, {iv : iv});
//
// // The encrypted data (send this over the network)
//     const encryptedData = encrypted.toString();
//     console.log("encryptedData ::", encryptedData)

    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  onClickSaveNewManufacturer = () => {


    // this.commonService.Post_form(postManufacturerList, jsonin).subscribe((response) => {
    //   if(response == null){
    //     return;
    //   }
    //   this.iResponse = response;
    //   if (this.iResponse) {
    //     this.refresh()
    //     this.GetManufacturerList()
    //     this.globalMessage.Show_message(`New Manufacturer Created Successfully`)
    //   }
    //   // console.log("Post Manufactuere Status",this.iResponse)
    // })
  }

  On_Printmarksheet_aadharv2(sParam: string) {
    let nAddhar = parseInt(this.PrintMarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhar)) {
      nAddhar = 0;
    }

    this.marksheetDownloadloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      template: this.Selectedtemplate.Name,
      aadhaar: nAddhar,
      Abc_aadhaar: sParam,
      Application: "MARKSHEET",
      Rledate: String(this.PrintMarksheet.controls['rledate'].value),
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    if (
      jsonin.aadhaar <= 0
    ) {
      jsonin.aadhaar = -99;
    }
    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.resmarksheetdate = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.resmarksheetdate.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.resmarksheetdate.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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


  //convocation marksheet
  convocationMarksheet() {
    this.marksheetDownloadloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      template: this.Selectedtemplate.Name,
      aadhaar: parseInt(this.PrintMarksheet.controls['aadhaar'].value),
      Reporttype: 'PDF',
      Singlepdf: true,
    };
    //
    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    if (
      jsonin.aadhaar <= 0
    ) {
      jsonin.aadhaar = -99;
    }

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
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

  //on print marksheet Single Download
  OnSingleMarksheet() {
    this.singledownloadloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      template: this.Selectedtemplate.Name,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    // console.log("Data :", this.stastistics);
    this.commonService.Post_json(printmarksheet, jsonin).subscribe(
      (response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.singledownloadloader = false;
        this.singledownloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.singledownloadloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
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

  ResultDownload() {
    this.Resultprintloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      // "batch_code": this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: 0,
      reporttype: this.SelectedReportType.Id,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    console.log('Data :', jsonin);
    this.commonService.Post_json(printmarksheetexamwise, jsonin)
      .subscribe(
        (response) => {
          this.res = response;
          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);
          let blob = new Blob([blobb], {type: 'application/blob'});
          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.res.excelfile;
          link.click();
          this.Resultprintloader = false;
          // this.resetAll();
        },
        (error) => {
          this.Resultprintloader = false;

          if (error.error !== null) {
            console.error('error caught in component', error);
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

  //ReportTypes select list
  ReportTypes: Array<Object> = [
    {Id: 'S', Name: 'Subject Wise'},
    {Id: 'E', Name: 'Exam Wise'},
    {Id: 'A', Name: 'Topper'},
  ];

  //Junior Marksheet Download
  JuniorClick() {
    if (this.SelectedReportType.Id != "A") {
      this.junior_exam_subject();
    }
    if (this.SelectedReportType.Id == "A") {
      this.junior_avg();
    }
  }

  junior_avg() {
    this.juniorloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      reporttype: this.SelectedReportType.Id,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(junior_avgmarks, jsonin).subscribe(
      (response) => {
        this.juniorloader = false;
        UDownloadfiles(response.blobdata, response.excelfile);
      },
      (error) => {
        this.juniorloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
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

  junior_exam_subject() {
    this.juniorloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: 0,
      reporttype: this.SelectedReportType.Id,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    //

    this.commonService.Post_json(juniormarksheet, jsonin).subscribe(
      (response) => {
        this.juniorloader = false;
        UDownloadfiles(response.blobdata, response.excelfile);
      },
      (error) => {
        this.juniorloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
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


  ValueAddedClick() {
    this.marksheetDownloadloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: parseInt(this.PrintMarksheet.controls['aadhaar'].value),
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.printmarksheetdiabl = true;
    console.log('Data :', jsonin);
    this.commonService.Post_json(printvalueaddcourse, jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.marksheetDownloadloader = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;

        if (error.error !== null) {
          console.error('error caught in component', error);
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

  //print Certificate
  printCerticate() {
    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar!,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      reporttype: 'PDF',
      aadhaar: parseInt(this.PrintMarksheet.controls['aadhaar'].value),
    };
    //
    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.printmarksheetdiabl = true;
    // console.log("Data printCerticateData :", this.printCerticateData);
    this.commonService.Post_json(printcertificate, jsonin)
      .subscribe(
        (response) => {
          this.printmarksheetdiabl = false;
          this.res = response;

          const contentType = '';
          const blobb = base64StringToBlob(this.res.blobdata, contentType);
          let blob = new Blob([blobb], {type: 'application/pdf'});
          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.res.filename;
          link.click();
          this.marksheetDownloadloader = false;
          // this.resetAll();
        },
        (error) => {
          this.printmarksheetdiabl = false;
          this.marksheetDownloadloader = false;

          if (error.error !== null) {
            console.error('error caught in component', error);
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

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/reports']);
    });
  }

  //sem wise subject
  OnSemwiseSub() {
    this.semwisemarksentryloader = false;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      useraadhaar: this.oSession.aadhaar!,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(downloadsemestersubjects, jsonin).subscribe(
      (response: {}) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.semwisemarksentryloader = false;
        this.SemSubjectclicked = false;
        this.SemSubjectForm.reset();
        // this.resetAll();
      },
      (error) => {
        this.semwisemarksentryloader = false;
        this.SemSubjectclicked = false;
        this.SemSubjectForm.reset();
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  //upload convocation
  //Upload File

  /*
  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (
      this.xlsxFile[0].type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.xlsxFile[0].size < 2400000
    ) {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: 'Only .xlsx file allowed!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert

      this.resetAll();
    }
  }
  */

  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    if (this.xlsxFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.xlsxFile[0].size < 2400000) {
    } else {
      Swal.fire({title: 'Error!', text: 'Only .xlsx file allowed!', icon: 'error', confirmButtonText: 'OK'})//alert
    }
  }

  uploadfile() {

    if (this.xlsxFile.length <= 0) {
      this.globalmessage.Show_error("File not selected ");
      return;
    }
    let formData = new FormData();

    this.uploadloader = true;

    let jsonin = {
      'College_code': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
      'Useraadhaar': this.oSession.aadhaar,
      'Batchexam_id': this.SelectedSemester.Batchexam_id
    }

    let formdata = new FormData();
    formdata.append('input_json', encryptUsingAES256(jsonin))
    formdata.append('file', this.xlsxFile[0])

    console.log("My Req ", this.formData);

    this.commonService.Post_formdata(uploadconvocation, formData)
      .subscribe((response) => {
        this.res = response;
        // console.log("My Response ", this.res);
        if (this.res.data == true) {
          // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
          Swal.fire({
            title: 'Success!',
            text: 'File Uploaded Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }); //alert

          this.uploadloader = false;
        } else {
          // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
          //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
          Swal.fire({
            title: 'Error!',
            text: this.res.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert

          this.uploadloader = false;
        }
      });
  }

  downloadConvocation() {
    let nAddhaar = parseInt(this.Processmarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhaar)) {
      nAddhaar = 0;
    }

    this.conloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: nAddhaar,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(downloadconvocation, jsonin).subscribe(
      (response) => {
        this.res = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.res.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.excelfile;
        link.click();
        this.conloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      // (error) => {
      //   this.conloader = false;
      //
      //   if (error.error !== null) {
      //     console.error('error caught in component', error);
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.error.exception,
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   } else {
      //     Swal.fire({
      //       title: 'Error!',
      //       text: error.status + 'Server Error!',
      //       icon: 'error',
      //       confirmButtonText: 'OK',
      //     }); //alert
      //   }
      //   // this.resetAll();
      // }
    );
  }

  ///AutoComplete


  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
    console.log('code', this.BatchCode)
    this.Batch_Name = bat.Batch_Name;
    this.GetSemesterApi();
    this.GetBatchSemesterApi();
  }

  selectBatch_rollcall(bat: any) {
    this.BatchCode_rollcall = bat.Batch_Code;
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }

  Onsevenscale() {
    this.sevenscaleloader = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar!,
      batch_code: this.BatchCode,
      semester: this.SelectedSemester.Semester,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      aadhaar: parseInt(this.Processmarksheet.controls['aadhaar'].value),
      Markscale: SEVENSCLAE,
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    if (
      jsonin.aadhaar.toString() == '' ||
      jsonin.aadhaar == null ||
      jsonin.aadhaar <= 0
    ) {
      jsonin.aadhaar = -99;
    }

    this.commonService.Post_json(processcreditmarks, jsonin).subscribe(
      (response) => {
        this.sevenscaleloader = false;

        if (response == null) {
          return;
        }
        this.res = response;
        if (this.res.data == true) {
          this.globalmessage.Show_message('Processed Successfully!');
        } else {
          this.sevenscaleloader = false;
          this.globalmessage.Show_error(this.res.exception);
        }
      },
      (error) => {
        this.sevenscaleloader = false;
        if (error.error !== null) {
          this.globalmessage.Show_error(error.error.exception);
        } else {
          this.globalmessage.Show_error(error.status + 'Server Error!');
        }
      }
    );
  }

  onChangeBatchtypeEdit_Select() {
    console.log('selected board', this.edit_batchtype)
  }


  batchtype: MyArrayType = [
    {id: 1, name: 'UG'},
    {id: 2, name: 'PG'},
    {id: 3, name: 'SF'},
    {id: 4, name: 'JR'},
  ]


  DownloadStudentcount() {

    this.semwisecountloader = true;
    let jsonin = {
      College_code: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Useraadhaar: this.oSession.aadhaar,
      Boardlevel: this.edit_batchtype
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.commonService.Post_json(report_batchexamstudentcount, jsonin).subscribe(
      (response) => {
        if (response == null) {
          this.globalmessage.Show_message('No data found')
        }
        this.examwisestudentcount = response
        UDownloadfiles(response.blobdata, response.excelfile);
        this.semwisecountloader = false;
      });
  }

  hallTicketdownload() {
    this.semwisemarksentrydiabl = true;
    let jsonin = {
      "Useraadhaar": this.oSession.aadhaar,
      "College_code": this.oSession.collegecode,
      "Finyear": this.oSession.finyear,
      "Batch_code": this.BatchCode,
      "Batchexam_id": parseInt(this.SelectedBatSemester.Batchexam_id),
      "Semester": 3
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    this.commonService.Post_json(download_hallticket, jsonin).subscribe(
      (response) => {
        if (response == null) {
          this.globalmessage.Show_message('No data found')
        }
        UDownloadfiles(response.data.Image, response.data.Filename);
      })
  }

  Change_exam() {
    console.log('exam----', this.SelectedSemester)
  }

  printCerticate_rle() {
    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      reporttype: 'PDF',
      aadhaar: parseInt(this.PrintMarksheet.controls['aadhaar'].value),
      rledate: String(this.PrintMarksheet.controls['rledate'].value)
    };

    // let jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printcertificate, jsonin).subscribe((response) => {
      console.log('rle certifres',response)
      this.printmarksheetdiabl = false;
      this.marksheetDownloadloader = false;
      if(response == null){
          this.globalmessage.Show_error("No Data Found")
        return;
        }
        this.printcertificate_rle = response
      UDownloadfiles(response.blobdata,response.filename)
    },
      (error) => {
      this.printmarksheetdiabl = true;
        this.marksheetDownloadloader = false;
      })
  }

  Credit_132_points(){
    let nAddhar = parseInt(this.PrintMarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhar)) {
      nAddhar = 0;
    }

    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      Semester: this.SelectedSemester.Semester,
      Increasepoint:true,
      template: this.Selectedtemplate.Name,
      aadhaar:nAddhar,
    };

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.resmarksheetdate = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.resmarksheetdate.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.resmarksheetdate.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  Credit_132_points_Abc(){
    let nAddhar = parseInt(this.PrintMarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhar)) {
      nAddhar = 0;
    }

    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      Semester: this.SelectedSemester.Semester,
      Increasepoint:true,
      template: this.Selectedtemplate.Name,
      aadhaar:nAddhar,
      Abc_aadhaar:"ABC"
    };

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.resmarksheetdate = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.resmarksheetdate.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.resmarksheetdate.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  Credit_132_points_Rle(){
    let nAddhar = parseInt(this.PrintMarksheet.controls['aadhaar'].value);

    if (isNaN(nAddhar)) {
      nAddhar = 0;
    }

    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      Semester: this.SelectedSemester.Semester,
      Increasepoint:true,
      template: this.Selectedtemplate.Name,
      aadhaar:nAddhar,
      Rledate: String(this.PrintMarksheet.controls['rledate'].value),
    };

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.resmarksheetdate = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.resmarksheetdate.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.resmarksheetdate.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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

  Credit_system(){
    this.marksheetDownloadloader = true;
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.oSession.aadhaar,
      batchexam_id: this.SelectedSemester.Batchexam_id,
      Semester: this.SelectedSemester.Semester,
      template: this.Selectedtemplate.Name,
      Singlepdf: true
    };

    this.printmarksheetdiabl = true;
    this.commonService.Post_json(printmarksheet_date,jsonin).subscribe(
      (response) => {
        this.printmarksheetdiabl = false;
        this.resmarksheetdate = response;
        const contentType = '';
        const blobb = base64StringToBlob(this.resmarksheetdate.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.resmarksheetdate.excelfile;
        link.click();
        this.globalmessage.Show_succesmessage('File downloaded successfully')
        this.marksheetDownloadloader = false;
        // this.downloadclicked = false;
        // this.resetAll();
      },
      (error) => {
        this.printmarksheetdiabl = false;
        this.marksheetDownloadloader = false;
        if (error.error !== null) {
          console.error('error caught in component', error);
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
}
