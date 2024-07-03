import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EditProfileService} from './table.service';
import {Router} from '@angular/router';
import {ColDef} from "ag-grid-community";
import {CommanService} from "../../globals/common.services";
import {Admissionstatusnep, AdmissionStatusreport, firstyear_statusreport, GetAllBatchs} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';
import { Ires_firstyear_statusreport } from '../../models/responsemodel';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [EditProfileService],
})

export class EditProfileComponent implements OnInit {



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
    // res_firstyear_statusreport : Ires_firstyear_statusreport[] = []
    Showallclicked = false;
    textloader = false;
    showloader = false;
    loader = false;

    oSession!: Sessiondata;

    constructor(private router: Router,private commonService: CommanService,
                private editprofileService: EditProfileService,
                private formBuilder: FormBuilder,private sessionService : SessionService) {

    }

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);

    pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        console.log('session::',this.oSession.aadhaar)

            this.GetBatchApi();


        this.editprofileForm = new FormGroup({
            'Batch_Name': new FormControl('', Validators.required),
        });
    }

    ShowReport() {//show All Report table
        this.showloader = true;
        this.textloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'batchcode': -99
        };
        this.commonService.Post_json(Admissionstatusnep,jsonin).subscribe((response) => {
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
            this.showloader = false;
            this.textloader = false;
            this.Showallclicked = false;
        });
    }

    Admissionstausnep() {
        this.showloader = true;
        this.textloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'batchcode': this.BatchCode
        };
        console.log('pass data', jsonin);
        this.commonService.Post_json(Admissionstatusnep,jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.res = response;
            this.Data = this.res.data;
            this.showloader = false;
            this.textloader = false;
            this.Showallclicked = false;
        });

    }

    FirstYearReport() {
        this.showloader = true;
        this.textloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'college_code': this.oSession.collegecode,
            'batch_code': this.BatchCode
        };
        console.log('pass data', jsonin);
        this.commonService.Post_json(firstyear_statusreport,jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.res = response;
            this.Data = this.res.data;
            this.showloader = false;
            this.textloader = false;
            this.Showallclicked = false;
        });

    }

    ShowBatchReport() {//show Report table on batch Select
        this.showloader = true;
        this.textloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'batchcode': this.BatchCode
        };
        // debugger;
        console.log('pass data', this.report);
        this.commonService.Post_json(AdmissionStatusreport,jsonin).subscribe((response: {}) => {
            this.res = response;
            console.log(this.res);
            this.Data = this.res.data;
            console.log('data', this.Data);
            console.log('subjects', this.Subjects);
            this.Showclicked = false;
            this.showloader = false;
            this.textloader = false;
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

    GetBatchApi() { //Batch select list displaying

        this.commonService.Post_json(GetAllBatchs,"").subscribe((response:any) => {

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
}
