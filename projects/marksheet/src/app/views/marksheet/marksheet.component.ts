import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {CellCustomComponent} from '../cell-custom/cell-custom.component';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {UDownloadfiles} from "../../globals/global_downloadfiles";
import {CommonService} from "../../globals/common.service";
import {ISemester, ISubjectName_json} from "../../models/response";
import {base64StringToBlob} from "blob-util";
import {
    delete_cancelstudents,
    deleteallmarks,
    downloadinternalmarks,
    excludecurrentfinyear,
    excelmarksentrydownload,
    uploadinternalmarks,
    releaseinternalmarks,
    internalexams,
    batchsubjects,
    excelmarksentryupload, downloadfailstudents, batchsemesterexamsubjects, exams, batchuserexam, updatesinglemarks
} from "../../globals/global-api";
import {Iexams, Iinternalexam, Isubjects} from "./marksheet.model";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

@Component({
    selector: 'app-marksheet',
    templateUrl: './marksheet.component.html',
    styleUrls: ['./marksheet.component.scss'],
})
export class MarksheetComponent implements OnInit {
    private marks_gridApi: any;
    private marks_gridColumnApi: any;
    public marks_gridOptions: any;

    private internal_gridApi: any;
    private internal_gridColumnApi: any;
    public internal_gridOptions: any;

    searchValue: any;
    savealert: boolean = false;
    downloadloader = false;
    uploadloader = false;
    studentdownloadloader = false;
    marksheetForm!: FormGroup;
    previousatktmarksheetForm!: FormGroup;
    currentatktmarksheetForm!: FormGroup;
    marksForm!: FormGroup;
    MergeInternalmarksForm!: FormGroup;
    marksDownloadUploadForm!: FormGroup;
    DownloadUploadForm!: FormGroup;
    DeletemarksheetForm!: FormGroup;
    DeleteCancelForm!: FormGroup;
    DeleteaadhaarForm!: FormGroup;
    xlsxFile!: Array<File>;
    error: any;
    res: any;
    deletestudents: any;
    Batch_Code: any;
    filename: any;
    downloadfile: any;
    DownloadUrl: any;
    viewfile: any;
    loader: any;
    SubjectName!: Isubjects[];
    SelectedSemSubjects!: Isubjects;
    SelectedBatSubjects!: Isubjects;
    exam: any;
    updatedata: any;
    StudentAadhaar: any;
    StudentMarks: any;
    StudentPresentAbsent: any;
    Batchs: any;
    currentYear: any;
    SelectedSubject: any;
    viewsubject: any;
    Subject_group_code: any;
    SelectedBatch: any;

    SelectedPaperCode: any;


    SelectedPaperType: any;
    papercode: any;
    papertype: any;
    semester: any;
    Semesters: any;

    deletemarks: any;
    marksuploadloader = false;

    atktdownloadloader = false;
    selectedfinyear: any;
    finyeardata: any;

    marksdownloadloader = false;
    marksviewfile: any;


    InternalExam!: Iinternalexam[];
    SelectedInternalExam!: Iinternalexam;
    SelectedSecondInternalExam!: Iinternalexam;

    examdata: any;
    GetFinyear: any;
    namesubject!: ISemester[];
    SelectedSemester!: ISemester;

    Exam!: Iexams[];
    SelectedSemExam!: Iexams;

    BatchCode: any;
    Batchkeyword = 'Batch_Name';

    out_rowselected: any

    oSession!: Sessiondata;

    //Grid column
    public columnDefs_marks = [
        {
            field: '',
            maxWidth: 50,
            checkboxSelection: true,
        },
        {headerName: 'Full Name', field: 'FullName', resizable: true, filter: true},
        {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true, filter: true},
        {headerName: 'Division', field: 'Batch_Division', resizable: true, filter: true},
        {headerName: 'RollNo', field: 'RollNo', resizable: true, filter: true},
        {headerName: 'Marks', field: 'Marks', resizable: true, editable: true, filter: true},
        {headerName: 'Present Absent', field: 'Present_absent', resizable: true, editable: true, filter: true},

        {
            headerName: 'Update',
            field: 'Action',
            maxWidth: 80,
            cellRenderer: CellCustomComponent,
        },
    ];

    //Grid Rows
    public rowss: any = [];
    private gridApi: any;

    constructor(
        private router: Router, private sessionservice: SessionService,
        private formBuilder: FormBuilder,
        private globalmessage: GlobalMessage,
        private commonService: CommonService
    ) {
        this.marks_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.internal_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
    }


    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        console.log('tssad', this.oSession)

        this.currentYear = new Date().getFullYear();
        this.GetBatchApi();
        this.GetFinyearApi();

        this.Createform();
    }

    Createform() {
        this.marksheetForm = new FormGroup({
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        });
        this.previousatktmarksheetForm = new FormGroup({
            finyear: new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        });
        this.currentatktmarksheetForm = new FormGroup({
            // 'finyear': new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        });

        this.DownloadUploadForm = new FormGroup({
            upload: new FormControl('', Validators.required),
        });

        this.DeletemarksheetForm = new FormGroup({
            batchname: new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
            markdelete_aadhaar: new FormControl(''),
        });

        this.marksForm = new FormGroup({
            // 'Batch_Name': new FormControl('', Validators.required),
            Internal_Name: new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        });
        this.MergeInternalmarksForm = new FormGroup({
            Second_Internal_Name: new FormControl('', Validators.required),
            Internal_Name: new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        });

        this.marksDownloadUploadForm = new FormGroup({
            upload: new FormControl('', Validators.required),
        });
        this.DeleteCancelForm = new FormGroup({
            aadhaar: new FormControl('', [
                Validators.required,
                Validators.minLength(12),
                Validators.maxLength(12),
            ]),
        });
    }

    //pagination page size
    public paginationPageSize = 10;

    onPageSizeChanged() {
        var value = (document.getElementById('page-size') as HTMLInputElement)
            .value;
        this.marks_gridApi.paginationSetPageSize(Number(value));
    }

    //grid- search
    quickSearch_marks() {
        this.marks_gridApi.setQuickFilter(this.searchValue);
    }

    onGridReady_marks(params: any) {
        this.marks_gridApi = params.api;
        this.marks_gridColumnApi = params.ColumnApi;
    }

    onRowSelectedEvent_marks(event: any) {
        this.StudentAadhaar = event.data.Aadhaar;
        this.StudentMarks = event.data.Marks;
        this.StudentPresentAbsent = event.data.Present_absent;
    }


    onSelectionChanged_marks(event: any) {
        let selected_outnode = this.marks_gridApi.getSelectedNodes();
        this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    }

    //update Button
    modal() {

        let jsonin = {

            Marksid: parseInt(this.out_rowselected[0].MarksId),
            Marks: this.out_rowselected[0].Marks,
            Present_Absent: String(this.out_rowselected[0].Present_absent),
            Batchexam_id: this.SelectedSemester.Batchexam_id,

        }



        console.log('inputs', jsonin)
        this.commonService.Post_json(updatesinglemarks, jsonin)
            .subscribe((response: {}) => {
                this.res = response;
                // console.log("updated",this.updatedata);
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'Data Updated Successfully!', positive: 'Ok', });
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Uploaded Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert

                    this.OnDownloadFile();
                } else {
                    // this.dialogService.open({ message: 'Failed to Update!', positive: 'Ok', }),
                    //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            });
    }

    //Batch
    GetBatchApi() {
        //Batch select list displaying
        this.commonService.getBatches().subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found! Please Configure Marksheet..',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
            } else {
                this.Batchs = response['data'];
            }
        });
    }

    //batchuserexam
    GetSemesterApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // "batch_code": this.SelectedBatch.Batch_Code,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
        };



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
                }
            });
    }

    //Exam
    GetSemExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedSemester.Semester,
        };


        console.log('seminput', jsonin)
        this.commonService.Post_json(exams, jsonin).subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found! Please Configure Marksheet..',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
            } else {
                this.Exam = response['data'];
            }
        });
    }

    //ExamSubjectName
    GetExamSubjectApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedSemester.Semester,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            examcode: this.SelectedSemExam.Examcode,
        };

        this.commonService.Post_json(batchsemesterexamsubjects, jsonin)
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
                    this.SubjectName = response['data'];
                }
            });
    }


    //when Batch is Selected
    onChangeBatchSelect() {
        this.GetSemesterApi();
    }

    //semester select
    onChangeSemesterSelect() {
        this.GetSemExamApi();
    }

    onChangeInternalSemesterSelect() {
        this.GetBatSubjectApi();
    }

    //when exam is Selected
    onChangeSemExamSelect() {
        this.GetExamSubjectApi();
    }

    //when exam subject is Selected
    onChangeSemSubjectsSelect() {
    }

    //when subject name is Selected
    onChangeSubjectNameSelect() {
    }

    //Marksheet download File
    OnDownloadFile() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedSemester.Semester,
            examcode: this.SelectedSemExam.Examcode,
            Subject_order: this.SelectedSemSubjects.Subject_order,
        };



        this.downloadloader = true;

        this.commonService.Post_json(excelmarksentrydownload, jsonin)
            .subscribe((response: any) => {
                this.downloadloader = false;
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }

                this.res = response;
                this.marks_gridOptions.api.setRowData(this.res.data);
                this.rowss = this.res.data;
                // UDownloadfiles(response.data, response.filename);

                const contentType = '';
                const blobb = base64StringToBlob(this.res.blobdata, contentType);
                let blob = new Blob([blobb], {type: 'application/blob'});
                var downloadURL = window.URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = this.res.excelfile;
                link.click();
                // this.examwiseloader = false;
                console.log("downloadURL", downloadURL);
            });
    }

    FailedStudentDownload() {
        this.studentdownloadloader = true;
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            useraadhaar: this.oSession.aadhaar,
            reporttype: 'Xl',
        };



        this.commonService.Post_json(downloadfailstudents, jsonin).subscribe((response) => {
            this.studentdownloadloader = false;
            if (response == null) {
                return;
            }
            if (!response.hasOwnProperty('data')) {
                return;
            }
            this.res = response;
            this.marks_gridOptions.api.setRowData(this.res.data);
            this.rowss = this.res.data;
            UDownloadfiles(response.data, response.filename);
        });
    }

    //Upload File
    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        // console.log("this.xlsxFile", this.xlsxFile)
        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
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

    uploadfile() {

        if (this.xlsxFile == null) {
            this.globalmessage.Show_error("File not selected");
            return;
        }

        this.uploadloader = true;

        let jsonin = {
            'College_code': this.oSession.collegecode,
            'Finyear': this.oSession.finyear,
            'Useraadhaar': this.oSession.aadhaar,
            'Batchexam_id': this.SelectedSemester.Batchexam_id,
            'Batch_code': this.BatchCode,
            'Semester': this.SelectedSemester.Semester,
            'Subject_order': this.SelectedSemSubjects.Subject_order,
            'Examcode': this.SelectedSemExam.Examcode
        }

        let formdata = new FormData();

        formdata.append('input_json', encryptUsingAES256(jsonin))
        formdata.append('file', this.xlsxFile[0])

        this.commonService.Post_formdata(excelmarksentryupload, formdata)
            .subscribe((response: {}) => {
                this.res = response;
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })

                  this.globalmessage.Show_succesmessage('File Uploaded Successfully!')

                    this.GridData();
                    this.uploadloader = false;
                    this.DownloadUploadForm.reset();
                    // this.marksheetForm.controls["SubjectName"].reset()
                } else {
                    // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
                    //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.uploadloader = false;
                }
            });
    }

    //20 Marks download File
    GetBatSubjectApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            semester: this.SelectedSemester.Semester,
        };


        this.commonService.Post_json(batchsubjects, jsonin).subscribe((response: any) => {
            if (response == null) {
                return;
            }
            if (!response.hasOwnProperty('data')) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found! Please Configure Marksheet..',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
            } else {
                this.SubjectName = response['data'];
            }
        });
    }

    //ExamName
    GetInternalExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
        };



        this.commonService.Post_json(internalexams, jsonin)
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
                    this.InternalExam = response['data'];
                }
            });
    }

    //when batch subject is Selected
    onChangeBatSubjectsSelect() {
        this.GetInternalExamApi();
    }

    //when exam is Selected
    onChangeInternalExamSelect() {
    }

    ////when exam 2 is Selected
    onChangeSecondInternalExamSelect() {
    }


    Donwload_internalmarks() {

        this.marksdownloadloader = true;
        let jsonin = {
            userexamid: this.SelectedInternalExam.Userexamid,
            subject_order: this.SelectedBatSubjects.Subject_order,
            reporttype: 'XL',
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            semester: this.SelectedSemester.Semester,
        };



        this.commonService.Post_json(downloadinternalmarks, jsonin).subscribe(
            (response) => {

                this.marksdownloadloader = false;
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('blobdata')) {
                    return;
                }
                //this.res = response;
                //this.internal_gridOptions.api.setRowData(this.res.data);
                //this.rowss = this.res.data;
                UDownloadfiles(response.data, response.filename);
            },
            (error) => {
                this.marksdownloadloader = false;

                if (error.error !== null) {
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
                this.marksForm.reset();
                // this.resetAll();
            }
        );
    }

    //marks Upload File
    marksxlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        // console.log("this.xlsxFile", this.xlsxFile)
        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
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

    Releasedata: any;

    OnRelease(data: boolean) {
        let jsonin = {
            userexamid: this.SelectedInternalExam.Userexamid,
            release: data,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
        };



        // console.log("My data ", this.Releasedata);
        this.commonService.Post_json(releaseinternalmarks, jsonin).subscribe(
            (response) => {

                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                // console.log("My Response ", this.res);
                if (this.res.data == true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Updated Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    // console.log("response:", this.res)
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            },
            (error) => {
                if (error.error !== null) {
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

    marksuploadfile() {
        this.marksuploadloader = true;

        let jsonin = {
            'college_code': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            'useraadhaar': this.oSession.aadhaar,
            'userexamid': this.SelectedInternalExam.Userexamid,
            'batch_code': this.BatchCode,
            'batchexam_id': this.SelectedSemester.Batchexam_id,
            'subject_order': this.SelectedBatSubjects.Subject_order,
            'semester': this.SelectedSemester.Semester,
        }

        let formdata = new FormData();
        formdata.append('input_json', encryptUsingAES256(jsonin))
        formdata.append('file', this.xlsxFile[0])

        this.commonService.Post_formdata(uploadinternalmarks, formdata).subscribe(
            (response) => {
                this.marksuploadloader = false;
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                if (this.res.data == true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'File Uploaded Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.marksuploadloader = false;
                    this.marksDownloadUploadForm.controls['upload'].reset();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.marksDownloadUploadForm.reset();
                    this.marksuploadloader = false;
                }
            },
            (error) => {
                this.marksuploadloader = false;

                if (error.error !== null) {
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
            this.router.navigate(['/marksheet']);
        });
    }

    GridData() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // "batch_code": this.SelectedBatch.Batch_Code,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedSemester.Semester,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            examcode: this.SelectedSemExam.Examcode,
            Subject_order: this.SelectedSemSubjects.Subject_order,
        };



        this.commonService.Post_json(excelmarksentrydownload, jsonin)
            .subscribe((response: any) => {

                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }

                this.res = response;
                this.marks_gridOptions.api.setRowData(this.res.data);
                this.rowss = this.res.data;
            });
    }

    resetDelete() {
        this.DeletemarksheetForm.reset();
    }

    OnDelete() {
        let student_aadhaar: number = 0;
        if (this.DeletemarksheetForm.controls['markdelete_aadhaar'].value == '') {
            student_aadhaar = 0;
        } else {
            student_aadhaar = this.DeletemarksheetForm.controls['markdelete_aadhaar']
                .value;
        }

        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            useraadhaar: this.oSession.aadhaar,
            aadhaar: student_aadhaar, //this.DeletemarksheetForm.controls['markdelete_aadhaar'].value,
            semester: this.SelectedSemester.Semester,
            subject_order: this.SelectedSemSubjects.Subject_order,
        };


        this.commonService.Post_json(deleteallmarks, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'Data Deleted Successfully!', positive: 'Ok', });
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Deleted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    // this.dialogService.open({ message: 'Failed to Delete!', positive: 'Ok', }),
                    //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            });
    }

    DeleteCancelStudent() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            aadhaar: this.DeleteCancelForm.controls['aadhaar'].value,
        };


        this.commonService.Post_json(delete_cancelstudents, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'Data Deleted Successfully!', positive: 'Ok', });
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Deleted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    // this.dialogService.open({ message: 'Failed to Delete!', positive: 'Ok', }),
                    //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            });
    }

    //merge Internal marks tab
    DownloadInternal() {
        this.marksdownloadloader = true;
        let jsonin = {
            userexamid: this.SelectedInternalExam.Userexamid,
            subject_order: this.SelectedBatSubjects.Subject_order,
            reporttype: 'XL',
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchexam_id: this.SelectedSemester.Batchexam_id,
            semester: this.SelectedSemester.Semester,
            Seconduserexamid: this.SelectedSecondInternalExam.Userexamid,
        };


        this.commonService.Post_json(downloadinternalmarks, jsonin).subscribe(
            (response) => {

                this.marksdownloadloader = false;

                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                this.internal_gridApi.api.setRowData(this.res.data);
                this.rowss = this.res.data;

                UDownloadfiles(response.data, response.filename);

            },
            (error) => {
                this.marksdownloadloader = false;

                if (error.error !== null) {
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
                this.marksForm.reset();
                // this.resetAll();
            }
        );
    }

    ///AutoComplete


    selectBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
        console.log('batchselected', this.BatchCode)
        this.GetSemesterApi();
    }

    selectInternalBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
        this.GetSemesterApi();
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e: any) {
        // console.log("focused", e)
        // do something
    }

    //Atkt Marks Entry


    GetFinyearApi() {
        //select list displaying
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            useraadhaar: this.oSession.aadhaar,
            currentfinyear: this.currentYear,
        };




        this.commonService.Post_json(excludecurrentfinyear, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                if (response['data'] == '' || response['data'] == null) {
                    // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                    Swal.fire({
                        title: 'Error!',
                        text: 'No data found! Please Configure Marksheet..',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    this.GetFinyear = response['data'];
                }
            });
    }

    onChangeFinyearSelect() {
    }

    OnatktDownloadFile() {
        this.atktdownloadloader = true;
        this.atktdownloadloader = false;
    }

    onGridReady_internal(params: any) {
        this.internal_gridApi = params.api;
        this.internal_gridColumnApi = params.ColumnApi;
    }

    quickSearch_internal() {
        this.internal_gridApi.setQuickFilter(this.searchValue);
    }

    onSelectionChanged_internal($event: any) {

    }

    onRowSelectedEvent_internal($event: any) {

    }

    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }
}
