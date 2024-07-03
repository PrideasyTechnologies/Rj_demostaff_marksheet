import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {base64StringToBlob} from 'blob-util';
import {CommonService} from "../../globals/common.service";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {DeleteCellCustomComponent} from "../delete-cellcustom/delete-cellcustom.component";
import {
    deletestudenteligiblelist,
    downloadstudenteligiblelist,
    iu_eligible,
    showalleligiblelist,
    updateeligible, uploadstudenteligiblelist
} from "../../globals/global-api";
import {GlobalMessage} from "../../globals/global.message";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

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
    EligibleListForm!: FormGroup;

    StudentsListForm!: FormGroup;


    AadhaarForDeleteEligibleList: any;
    EditForm!: FormGroup;
    DownloadUploadForm!: FormGroup;
    Batchs: any;
    SelectedSubject: any;
    StudentAadhaar: any;
    Sgpa_id: any;
    FullName: any;
    Sgpa: any;
    Creditpoints: any;
    viewsubject: any;
    Subject_group_code: any;
    SelectedBatch: any;
    SelectedSemester: any;
    SelectedBatSemester: any;
    SelectedUserExam: any;
    userexam: any;
    UserExam: any;
    semester: any;
    Semesters: any;
    updatedata: any;
    batsem: any;
    BatchSemesters: any;
    Downloadloader = false;
    viewfile: any;
    downloadclicked = false;
    loader: any;
    formData = new FormData();
    viewloader = false;
    viewfiles: any;
    edit: any;
    delete: any;

    batch_code: any;
    updateeligiblity: any;
    Eligiblestatus: any;
    Studentaadhaar: any;

    BatchCode: any;

    BatchCode_students:any
    Batchkeyword = 'Batch_Name';

    oSession!: Sessiondata;

    constructor(private router: Router, private globalmessage: GlobalMessage,
                private commonService: CommonService, private sessionservice: SessionService,
                private formBuilder: FormBuilder) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);
    // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);


    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.GetBatchApi();

        this.DownloadUploadForm = new FormGroup({
            'upload': new FormControl('', Validators.required),
        })

        this.EligibleListForm = new FormGroup({
            // 'userexam': new FormControl('', Validators.required),
        })

        this.StudentsListForm = new FormGroup({
           'students_aadhaar': new FormControl('', Validators.required),
        })
    }

    //Upload File
    xlsxFile!: Array<File>;

    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        if (this.xlsxFile[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && this.xlsxFile[0].size < 2400000) {
        } else {
            // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
            Swal.fire({title: 'Error!', text: 'Only .xlsx File allowed!', icon: 'error', confirmButtonText: 'OK'})//alert
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
            "college_code": this.oSession.collegecode,
            "finyear": this.oSession.finyear,
            "batch_code": this.BatchCode
        };

        console.log('okok', jsonin)
        let formdata = new FormData();

        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', this.xlsxFile[0])

        this.commonService.Post_formdata(uploadstudenteligiblelist, formdata).subscribe((response: {}) => {
            this.res = response;
            console.log("My Xlsxs Response ", this.res);
            if (this.res.data == true) {
                // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
                Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert
                this.viewFile();
                this.loader = false;
                this.DownloadUploadForm.reset();
            } else {
                // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
                //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
                Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
                this.loader = false;
            }
        })
    }

    //update button


    EditCell(selectedRow: any) {
        console.log("selectedRow:", selectedRow);
        this.Studentaadhaar = selectedRow.Aadhaar
        this.Eligiblestatus = parseInt(selectedRow.Eligiblestatus)

        let jsonin = {
            "college_code": this.oSession.collegecode,
            "finyear": this.oSession.finyear,
            "batch_code": this.BatchCode,
            "aadhaar": this.Studentaadhaar,
            "eligiblestatus": this.Eligiblestatus,
        }

        console.log('innn',jsonin)

        // console.log(this.updateRelease);
        this.commonService.Post_json(updateeligible, jsonin).subscribe((response: {}) => {
            this.res = response;

            if (this.res.data == true) {
                Swal.fire({title: 'Success!', text: 'Updated Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert
                this.viewFile();
            } else {
                Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
            }
            // console.log(this.res);
        })
    }

    //Grid column
    columnDefs = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },

        {headerName: "Aadhaar", field: "Aadhaar", resizable: true},
        {headerName: "Eligible Status", field: 'Eligiblestatus', editable: true, resizable: true},
        {headerName: 'EDIT', field: 'Action', cellRenderer: EditCellCustomComponent},
        {headerName: 'DELETE', field: 'Action', cellRenderer: DeleteCellCustomComponent},
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
        this.StudentAadhaar = event.data.Aadhaar;
        this.Sgpa_id = event.data.Sgpa_id;
        this.FullName = event.data.FullName;
        this.Sgpa = event.data.Sgpa;
        this.Creditpoints = event.data.Creditpoints
    }

    onSelectionChanged(event: any) {
        console.log(event);
    }

    DeleteSuccessDialog() {
        let jsonin = {
            "College_code": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.BatchCode,
            "Aadhaar": this.AadhaarForDeleteEligibleList
        }

        if (this.AadhaarForDeleteEligibleList == null) {
            // this.dialogService.open({ message: 'Please Select Row to delete!', positive: 'Ok', })//alert
            Swal.fire({title: 'Error!', text: 'Please select Row!', icon: 'error', confirmButtonText: 'OK'})//alert

        } else {
            this.commonService.Post_json(deletestudenteligiblelist, jsonin).subscribe(response => {
                this.res = response;

                console.log("res AadhaarForDeleteEligibleList", this.res);
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', })//alert
                    Swal.fire({title: 'Success!', text: 'Deleted Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert

                    this.viewFile();
                } else {
                    // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
                    Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
                }
            })
        }
    }

    //Batch
    GetBatchApi() { //Batch select list displaying
        this.commonService.getBatches().subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure ValueAdded..', positive: 'Ok', })//alert
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found! Please Configure ValueAdded..',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })//alert
            } else {
                this.Batchs = response['data'];
            }
        })
    }


    onChangeBatSemesterSelect() {
    }

    onChangeUserExamSelect() {
    }

    //download File
    OnDownloadFile() {
        this.downloadclicked = true;
        this.Downloadloader = true;
        let jsonin = {
            "CollegeCode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "BatchCode": this.BatchCode,
            "Aadhaar": this.oSession.aadhaar
        }

        if (this.BatchCode == null) {
            // this.dialogService.open({ message: 'Please Select Batch!', positive: 'Ok', })//alert
            Swal.fire({title: 'Error!', text: 'Please Select Batch!', icon: 'error', confirmButtonText: 'OK'})//alert
            this.downloadclicked = false;
            this.Downloadloader = false;
        }
        this.commonService.Post_json(downloadstudenteligiblelist, jsonin).subscribe(response => {
            this.res = response;
            const contentType = '';
            const blobb = base64StringToBlob(this.res.blobdata, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.res.excelfile;
            link.click();
            this.Downloadloader = false;
            this.downloadclicked = false;
            // console.log("file created",byteArray);
            console.log("downloadURL", downloadURL);
        })
    }

    viewFile() {
        this.viewloader = true;
        let jsonin = {
            "college_code": this.oSession.collegecode,
            "finyear": this.oSession.finyear,
            "batch_code": this.BatchCode,
            "useraadhaar": this.oSession.aadhaar
        }

        console.log("data", jsonin);
        this.commonService.Post_json(showalleligiblelist, jsonin).subscribe(response => {
            this.res = response;
            this.gridOptions.api.setRowData(this.res.data);
            this.rowss = this.res.data;
            this.AadhaarForDeleteEligibleList = this.rowss[0].Aadhaar;
            console.log("data asd", this.rowss[0].Aadhaar);

            // const contentType = '';
            // const blobb = base64StringToBlob(this.res.blobdata, contentType);
            // let blob = new Blob([blobb], { type: 'application/blob' });
            // var downloadURL = window.URL.createObjectURL(blob);
            // var link = document.createElement('a');
            // link.href = downloadURL;
            // link.download = this.res.excelfile;
            // link.click();
            this.viewloader = false;
            // console.log("file created",byteArray);
            // console.log("downloadURL", downloadURL);
        })
    }


    resetAll() {
        this.EligibleListForm.reset();
    }

    resetstudentsform() {
        this.StudentsListForm.reset();
    }

    ///AutoComplete


    selectBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
    }

    selectBatch_students(bat1: any){
        this.BatchCode_students = bat1.Batch_Code;
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e: any) {
        // console.log("focused", e)
        // do something
    }

    AddStudents(){

        let jsonin = {
            "college_code": this.oSession.collegecode,
            "finyear": this.oSession.finyear,
            "batch_code": this.BatchCode_students,
            "aadhaar": this.StudentsListForm.controls['students_aadhaar'].value,
            "useraadhaar": this.oSession.aadhaar,
        }

        console.log('studentsjsonn::',jsonin)
       
            this.commonService.Post_json(iu_eligible, jsonin).subscribe(response => {
                this.res = response;

                
                if (this.res.data == true) {
                    // this.dialogService.open({ message: 'Deleted Successfully!', positive: 'Ok', })//alert
                    this.globalmessage.Show_succesmessage('Student Added Succesfully')

                    
                } else {
                    // this.dialogService.open({ message: this.res.message, positive: 'Ok', })//alert
                    Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
                }
            })
        

    }
}




