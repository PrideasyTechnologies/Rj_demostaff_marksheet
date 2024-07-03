import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BatchTransferService} from './batch-transfer.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {MustNotMatch} from "../helpers/must-match.validator";
import {CommanService} from "../../globals/common.services";
import {GetAllBatchs, iu_gapstudent, transferstudentbatchs} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';


@Component({
  selector: 'app-batch-transfer',
  templateUrl: './batch-transfer.component.html',
  styleUrls: ['./batch-transfer.component.scss'],
  providers: [BatchTransferService],
  
})


export class BatchTransferComponent {

  savealert: boolean = false;
  loader: boolean = false;
  Bat_submitted: boolean = false;
  Gap_submited : boolean = false ;

  BatchTransferForm!: FormGroup;
  Gapform!: FormGroup;

  res: any;
  Batchs = [];
  SelectedBatch!: any;

  BatchCode: any;
  Batchkeyword = 'Batch_Name';

  oSession!: Sessiondata;

  @ViewChild('fileImportInput') fileImportInput: any;

  get batchfrm_fn() {
    return this.BatchTransferForm.controls;
  }

  get gapfrm_fn() {
    return this.Gapform.controls;
  }

  constructor(private router: Router,
              private batchtransferservice: BatchTransferService,
              private globalmessage:GlobalMessage,
              private formBuilder: FormBuilder,
              private commonService: CommanService,private sessionService : SessionService) {
  }




  ngOnInit(): void {

    // if (!this.Token) {
    //   this.globalmessage.Show_message('Please Login');//alert
    //   this.router.navigate(['login']);
    // }

    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

    this.GetBatchApi();
    this.Createform();
  }

  Createform() {
    this.BatchTransferForm = this.formBuilder.group({
        bat_aadhaar: ['', [Validators.required, Validators.minLength(12)]],
        bat_frombatch: ['', Validators.required],
        bat_tobatch: ['', Validators.required],
      },
      {
        validator: MustNotMatch('tobatch', 'frombatch')
      }
    );

    this.Gapform = this.formBuilder.group({
        gap_aadhaar: ['', [Validators.required, Validators.minLength(12)]],
        gap_studenttype: ['', [Validators.required]]

      }
    );

  }


  onCancel_bat() {
    // this.BatchTransferForm.reset();
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  Transfer: any;

  OnTransfer_bat(event: any) {
    event.preventDefault();

    if (!this.BatchTransferForm.valid) {
      return;
    }
    this.Bat_submitted = true;
    // this.BatchTransferForm.value
    // console.log("value:", this.BatchTransferForm.value.Batch_Code)
    let jsonin = {
      'collegecode': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,
      'Finyear': this.oSession.finyear,
      'aadhaar': parseInt(this.BatchTransferForm.controls['bat_aadhaar'].value),
      'frombatchcode': this.BatchTransferForm.controls['bat_frombatch'].value.Batch_Code,
      'tobatchcode': this.BatchTransferForm.controls['bat_tobatch'].value.Batch_Code,
    };
    console.log('value:', jsonin);

    this.commonService.Post_json(transferstudentbatchs,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        Swal.fire({
          title: 'Success!',
          text: 'Batch Transferred Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });//alert
      } else {
        Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'});//alert
      }
    });
  }

  GetBatchApi() {
    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }

  ///AutoComplete


  selectBatch(bat: any) {
    //  console.log(bat);
    //  console.log(bat.Batch_Code);
    this.BatchCode = bat.Batch_Code;
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

  OnSubmitGap($event: Event) {
    $event.preventDefault();

    if (!this.Gapform.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Error in data entry screen!',
        icon: 'error',
        confirmButtonText: 'OK'
      });//alert
      return;
    }
    this.Gap_submited = true;
    let jsonin = {
      'finyear': this.oSession.finyear,
      'college_code': this.oSession.collegecode,
      'useraadhaar': this.oSession.aadhaar,//autocomplete
      'aadhaar': parseInt(this.Gapform.controls['gap_aadhaar'].value),
      'atkt': this.Gapform.controls['gap_studenttype'].value,
    };

    console.log('xxxx',jsonin);
    this.commonService.Post_json(iu_gapstudent,jsonin).subscribe((response) => {
      if (response == null){
        return ;
      }
      console.log("yyyy",response);
      if (response.data == true) {
        Swal.fire({
          title: 'Success!',
          text: 'Gap student transferred successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });//alert
        return;
      }
      if (response.data == false) {
        Swal.fire({
          title: 'error!',
          text: 'Alredy transferred',
          icon: 'error',
          confirmButtonText: 'OK'
        });//alert
        return;
      }

      if (response.exception) {
        Swal.fire({
          title: 'error!',
          text: response.exception,
          icon: 'error',
          confirmButtonText: 'OK'
        });//alert
        return;
      }

    });
  }

  onCancel_gap() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });

  }
}
