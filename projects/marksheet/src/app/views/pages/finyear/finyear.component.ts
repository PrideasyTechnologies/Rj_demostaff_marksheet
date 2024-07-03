import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FinyearService_enc} from "./finyear.service_enc";
import {Router} from "@angular/router";
import {IBatchs, Iresp_ABC, Iresp_College, IYear, Sessiondata} from "../../../models/request";
import {College, finyear} from "../../../globals/global-api";
import {CommonService} from "../../../globals/common.service";
import {EncryptData} from "../../../globals/encryptdata";


@Component({
    selector: 'app-finyear',
    templateUrl: './finyear.component.html',
    styleUrls: ['./finyear.component.scss']
})
export class FinyearComponent implements OnInit {

    Finfrom!: FormGroup;
    Fincontrol!: string[];
    res: any;
    SelectedFinyear_json!: IYear | undefined;
    SelectedCollege_json!: Iresp_College ;
    Finyear_json: IYear[] | undefined;

    CollegeCode_json!: Iresp_College[];
    submitted: boolean | undefined

    constructor(
        private formBuilder: FormBuilder,private commonService: CommonService,
        private fineyearservice: FinyearService_enc,
        private router: Router,
    ) {
    }

    Token = sessionStorage.getItem('token');

    ngOnInit(): void {

        this.createForm();
        this.selectFinyearApi();
        this.selectCollegeCodeApi()

    }

    createForm() {

        this.Finfrom = this.formBuilder.group(
            {
                Finyear: new FormControl('', Validators.required),
                CollegeCode: new FormControl('', Validators.required),
            },
        );
        this.Fincontrol = Object.keys(this.Finfrom.controls);
    }

    selectFinyearApi() {

        this.commonService.Post_json(finyear,"").subscribe((response) => {

            if (response == null) {
                return;
            }
            this.Finyear_json = response.data;

        })
    }

    selectCollegeCodeApi() {
        this.commonService.Post_json(College,"").subscribe((response) => {

            if (response == null) {
                return;
            }

            this.CollegeCode_json = response.data

            console.log('collegeg',this.CollegeCode_json)
            //this.CollegeCode_json.Format = response.Format;
            //this.CollegeCode_json.Data = response.data;

            //console.log("AAA",this.CollegeCode_json.Format)
///console.log("BBB",this.CollegeCode_json.Data)

        })
    }

    OnsubmitButton() {
        if (this.Finfrom.controls == null) {
        } else {


            sessionStorage.setItem('finyear',EncryptData(String(this.SelectedFinyear_json?.Finyear.toString())));
            sessionStorage.setItem('collegecode',EncryptData(String(this.SelectedCollege_json.CollegeCode.toString())));

            this.router.navigate(['/dashboard']);
        }
    }

}
