import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CommonService} from "../../globals/common.service";
import {Router} from "@angular/router";
import {GlobalMessage} from "../../globals/global.message";
import {base64StringToBlob} from "blob-util";
import {ISubjectName_json} from "../../models/response";
import {
    batchsemestersubject,
    download_batchsemestersubject,
    excludecurrentfinyear,
    semester, upload_batchsemestersubject, uploadquestionpaper
} from "../../globals/global-api";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

@Component({
    selector: 'app-questionpaperupload',
    templateUrl: './questionpaperupload.component.html',
    styleUrls: ['./questionpaperupload.component.scss']
})
export class QuestionpaperuploadComponent implements OnInit {

    QuestionpaperForm!: FormGroup;
    DownloadUploadForm!: FormGroup;
    Finfrom!: FormGroup;
    UploadpaperForm!: FormGroup;
    PaperUploadForm!: FormGroup;

    Batchs: any;
    Batchkeyword = 'Batch_Name';
    SelectedSemester: any;
    Semesters: any;


    data: any;
    SelectedSemExam: any;

    currentYear: any;
    GetFinyear: any;

    res: any;
    xlsxFile!: Array<File>;

    SelectedSemSubjects: any;
    SubjectName_json: any;

    downloadloader = false;
    BatchCode: any;
    loader: any;
    SelectedFinyear: any;
    BatchNames: any;
    SubjectName: any;
    Exam: any;

    oSession!: Sessiondata;

    //models
    namesubject!: ISubjectName_json[];

    constructor(private router: Router, private sessionservice: SessionService,
                private commonService: CommonService,
                private globalmessage: GlobalMessage
    ) {

    }

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);
    // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.currentYear = new Date().getFullYear();
        this.GetBatchAPI();
        this.GetFinyearApi();
        this.Createform();

    }

    Createform() {

        this.QuestionpaperForm = new FormGroup({
            // 'Batch_Name': new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        })
        this.DownloadUploadForm = new FormGroup({
            upload: new FormControl('', Validators.required),
        });
        this.UploadpaperForm = new FormGroup({
            // 'Batch_Name': new FormControl('', Validators.required),
            Semester_Name: new FormControl('', Validators.required),
            Exam_Name: new FormControl('', Validators.required),
            SubjectName: new FormControl('', Validators.required),
        })
        this.PaperUploadForm = new FormGroup({
            upload: new FormControl('', Validators.required),
        });
    }

    GetFinyearApi() {
        //select list displaying
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            useraadhaar: this.oSession.aadhaar,
            currentfinyear: this.currentYear,
        };

        this.commonService
            .Post_json(excludecurrentfinyear, jsonin)
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

    GetBatchAPI() {
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

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e: any) {
        // console.log("focused", e)
        // do something
    }

    // onChangeSemesterSelect() {
    //   this.GetSemExamApi();
    // }
    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        // console.log("this.xlsxFile", this.xlsxFile)
        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // if (
        this.xlsxFile[0].type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        this.xlsxFile[0].size < 2400000
        // ) {
        // }
        // else {
        //   // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
        //   Swal.fire({
        //     title: 'Error!',
        //     text: 'Only .xlsx file allowed!',
        //     icon: 'error',
        //     confirmButtonText: 'OK',
        //   }); //alert
        //
        // }
    }

    Uploadfile() {

        if (this.xlsxFile == null) {
            this.globalmessage.Show_error("File not selected ");
            return;
        }

        let formData = new FormData();

        let jsonin = {
            'Collegecode': this.oSession.collegecode,
            'Finyear': this.oSession.finyear,
            'useraadhaar': this.oSession.aadhaar,
            // formData.append('Batchexam_id', this.SelectedSemester.Batchexam_id);
            'Batch_code': this.BatchCode,
            'Semester': this.SelectedSemExam.Semester,
        };
        // formData.append('subject_order', this.SelectedSemSubjects.Subject_order);
        // formData.append('examcode', this.SelectedSemExam.Examcode);

        let formdata = new FormData();
        formdata.append('input_json', encryptUsingAES256(jsonin))
        formdata.append('file', this.xlsxFile[0])

        this.commonService
            .Post_formdata(upload_batchsemestersubject, formData)
            .subscribe((response: {}) => {
                this.res = response;
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
                    Swal.fire({
                        title: 'Success!',
                        text: 'File Uploaded Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert

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

                }
            });
    }

    onChangeSemSubjectsSelect() {
    }

    GetExamSubjectApi() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedSemExam.Semester,
            batchexam_id: this.SelectedSemExam.Semester,
            examcode: this.SelectedSemExam.Semester,
        };


        this.commonService
            .Post_json(batchsemestersubject, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    this.globalmessage.Show_message('No data found! Please Configure Marksheet..')//alert
                    return;
                }
                this.namesubject = response
            });
    }

    onChangeSemExamSelect() {
        this.GetExamSubjectApi();
    }

    onFinyearSelected($event: Event) {
        this.GetBatchAPI();
    }

    OnDownloadExamwiseFile() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.BatchCode,
            "Semester": this.SelectedSemExam.Semester,
        }


        if (this.SelectedSemExam.Semester == null) {
            // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
            Swal.fire({title: 'Error!', text: 'Please Selct Batch', icon: 'error', confirmButtonText: 'OK'})//alert
            // this.downloadclicked = false;
        }
        this.commonService.Post_json(download_batchsemestersubject, jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            console.log("downloadURL", downloadURL);
        })
    }

    GetSemesterApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // "batch_code": this.SelectedBatch.Batch_Code,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
        };


        this.commonService
            .Post_json(download_batchsemestersubject, jsonin)
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
                    this.Semesters = response['data'];
                }
            });
    }

    GetSemExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.BatchCode,
            useraadhaar: this.oSession.aadhaar,
            // semester: this.SelectedSemester.Semester,
        };


        this.commonService.Post_json(semester, jsonin).subscribe((response: any) => {
            if (response == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                this.globalmessage.Show_error('No data found')
                return;
            }
            this.Exam = response;

        });
    }

    selectBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
        // this.GetSemesterApi();
        this.GetSemExamApi();
    }

    Uploadfilesubject() {

        if (this.xlsxFile == null) {
            this.globalmessage.Show_error("File not selected ");
            return;
        }


        let jsonin = {
            'College_code': this.oSession.collegecode,
            'Finyear': this.oSession.finyear,
            'useraadhaar': this.oSession.aadhaar,
            'Batch_code': this.BatchCode,
            'Semester': this.SelectedSemExam.Semester,
            'Subjectcode': this.SelectedSemSubjects.Subject_code,
        }

        let formData = new FormData();

        formData.append('input_json', encryptUsingAES256(jsonin))
        formData.append('Files', this.xlsxFile[0]);

        this.commonService.Post_formdata(uploadquestionpaper, formData)
            .subscribe((response: {}) => {
                if (response == null) {
                    this.globalmessage.Show_message('Failed to upload')
                } else {
                    this.globalmessage.Show_succesmessage('File Uploaded Successfully!')
                }
            });
    }

}
