import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessage} from '../../globals/global.message';
import {CommonService} from "../../globals/common.service";
import {showdse, uploaddse} from "../../globals/global-api";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

@Component({
    selector: 'app-utility',
    templateUrl: './utility.component.html',
    styleUrls: ['./utility.component.scss'],
})
export class UtilityComponent implements OnInit {
    private gridApi: any;
    private gridColumnApi: any;

    public ShowForm!: FormGroup;
    public UploadForm!: FormGroup;
    public AtktForm!: FormGroup;
    public loader = false;
    public Batch_json = [];
    public Batchkeyword = 'Batch_Name';
    public searchValue!: string;
    public rowdata: any;

    public gridOptions: any;
    private Semester_json: any;
    Batchs: any;
    Batch_Code: any;
    public columnDefs = [
        {
            field: '',
            maxWidth: 50,
            checkboxSelection: true,
        },

        {headerName: 'Semester', field: 'Semester', resizable: true},
        {
            headerName: 'Subject', field: 'Subjectname', editable: true, resizable: true,
        },
    ];

    public Showuploadloader: boolean = false;
    public Showloader = false;
    private Selectedbatch: number = 0;
    private xlsxFile!: File;

    oSession!: Sessiondata;


    @ViewChild("aside1") nav: any; // Get a reference to the ngbNav

    constructor(
        private formBuilder: FormBuilder,
        private router: Router, private sessionservice: SessionService,
        private globalmessage: GlobalMessage,
        private commonService: CommonService,
    ) {
    }

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);
    // Loginaadhaar = sessionStorage.getItem('Aadhaar')!;

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        this.Createform();
        this.GetBatchApi();

    }

    Createform() {
        this.ShowForm = new FormGroup({
            batch: new FormControl('', Validators.required),
        });
        this.UploadForm = new FormGroup({
            upload_in: new FormControl('', Validators.required),
        });
    }

    get fld_batch() {
        return this.ShowForm.get('batch');
    }

    get fld_upload() {
        return this.UploadForm.get('upload_in');
    }

    imgUpload($event: Event) {
    }

    OnUpload() {

        if (this.xlsxFile == null) {
            this.globalmessage.Show_error("File not selected ");
            return;
        }

        this.Showuploadloader = true;

        let jsonin = {
                'collegecode': this.oSession.collegecode,
                'finyear': this.oSession.finyear,
                'batchcode': this.Selectedbatch,
                'useraadhaar': this.oSession.aadhaar
            };

            let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', this.xlsxFile)

        this.commonService.Post_formdata(uploaddse, formdata).subscribe(response => {
            this.Showuploadloader = false;
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalmessage.Show_succesmessage('File Uploaded Successfully!');
                this.Showuploadloader = false;
            } else {
                this.globalmessage.Show_error(response.exception);
                this.Showuploadloader = false;
            }
        }, error => {
            this.globalmessage.Show_error(error.toString());
            this.Showuploadloader = false;
        });
    }

    onFocused($event: void) {
    }

    onChangeSearch($event: any) {
    }

    selectBatch($event: any) {
        this.Selectedbatch = $event.Batch_Code;
    }

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

    Showexistingdata(sType: string) {
        if (this.Selectedbatch <= 0) {
            this.globalmessage.Show_message('Please Select Batch!');
            return;
        }

        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.Selectedbatch,
            useraadhaar: this.oSession.aadhaar,
            // batchname: this.fld_batch.value,
            batchname: this.ShowForm.controls['fld_batch'].value,
            show_download: sType,
        };


        this.Showloader = true;
        this.commonService.Post_json(showdse, jsonin).subscribe((response: any) => {
            this.Showloader = false;
            if (response == null) {
                return;
            }

            this.gridOptions.api.setRowData(response.data);
            this.rowdata = response.data;

        });
    }

    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    onRowSelectedEvent(event: any) {
    }

    onSelectionChanged(event: any) {
    }

    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files[0];
        if ((this.xlsxFile.type != "xls") && (this.xlsxFile.type != "xlsx")) {
        }
    }

}
