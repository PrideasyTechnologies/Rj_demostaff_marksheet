import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FinyearService} from "./finyear.service";
import {Router} from "@angular/router";
import {IBatchs, ICode, IYear} from "../../../models/request";
import { CommonService } from 'projects/marksheet/src/app/globals/common.service';
import { College, Finyear } from '../../../globals/global-api';
import { EncryptData } from '../../../globals/encryptdata';


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
    SelectedCollege_json!: ICode |undefined;
    Finyear_json: IYear[] | undefined;
    CollegeCode_json: ICode[] |undefined;
  submitted: boolean | undefined

  
  constructor(
      private formBuilder: FormBuilder,
      private fineyearservice: FinyearService,
        private router: Router,
        private commonService: CommonService
    ) {
    }
    
    Token = sessionStorage.getItem('token');

    // UserRole = sessionStorage.getItem('UserRole');


    ngOnInit(): void {
        this.createForm();
        this.selectFinyearApi();
        this.selectCollegeCodeApi()
    }

    createForm() {
        this.Finfrom = this.formBuilder.group(
            {
                Finyear:new FormControl('', Validators.required),
                CollegeCode: new FormControl('', Validators.required),
            },
        );
        this.Fincontrol = Object.keys(this.Finfrom.controls);
    }

    selectFinyearApi() {
        console.log('checking');
        this.commonService.Post_json(Finyear,"").subscribe((response) => {

            if (response == null){
                return ;
            }
            this.Finyear_json = response.data;

        })
    }

  selectCollegeCodeApi() {
    console.log('checking');
    this.commonService.Post_json(College,"").subscribe((response) => {

      if (response == null){
        return ;
      }
      this.CollegeCode_json = response.data;
    })
  }

    OnsubmitButton() {
        if (this.Finfrom.controls == null) {
        } else {

            console.log('ttttt:',this.SelectedFinyear_json);

            sessionStorage.setItem('finyear',EncryptData(String(this.SelectedFinyear_json?.Finyear.toString())));
            sessionStorage.setItem('collegecode',EncryptData(String(this.SelectedCollege_json?.CollegeCode.toString())));

            this.router.navigate(['/dashboard']);
        }
    }

}
