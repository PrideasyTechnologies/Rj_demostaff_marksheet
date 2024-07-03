import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttachFeesAllService} from './attachfees-all.service';
import {Router} from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import Swal from "sweetalert2";
import {CommanService} from "../../globals/common.services";
import {FeesTerm, GetAllBatchs, IU_AttachFeesToall} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-attachfees-all',
  templateUrl: './attachfees-all.component.html',
  styleUrls: ['./attachfees-all.component.scss'],
  providers: [AttachFeesAllService],
})
export class AttachFeesAllComponent implements OnInit {
  submitted = false;
  feesAttachmentForm!: FormGroup;
  feesForm!: FormGroup;
  res: any;
  showfee: any;
  attachfee: any;
  category = [];
  Terms = [];
  sex = [];
  Batchs = [];
  StudentAadhaar: any;
  SelectedBatch: any;
  SelectedTerm!: any;

  oSession!: Sessiondata;


  @ViewChild('infoModal') infoModal: any;

  constructor(private router: Router,private commonService: CommanService,
              private attachfeesallService: AttachFeesAllService,
              private globalmessage: GlobalMessage,
              private formBuilder: FormBuilder,private sessionService : SessionService) {
  }

  

  ngOnInit(): void {
    
    this.oSession = new Sessiondata(this.sessionService)
    this.oSession.Getdatafromstroage();

      this.GetBatchApi();
      this.GetTermSApi();


    this.feesAttachmentForm = new FormGroup({
      // 'Batch_Code': new FormControl(null, Validators.required),
      'Term_Name': new FormControl(null, Validators.required),
    });
  }


  modal() {
    this.infoModal.show();
  }

  attachloader =false;
  AttachAllFees() {
    this.attachloader = true;
    let jsonin = {
      'finyear': this.oSession.collegecode,
      'collegecode': this.oSession.collegecode,
      // "batchcode": this.SelectedBatch.Batch_Code,
      'batchcode': this.BatchCode,
      'termcode': this.SelectedTerm.Term_Code,
    };
    this.commonService.Post_json(IU_AttachFeesToall,jsonin).subscribe((response: {}) => {
      this.res = response;
      this.globalmessage.Show_successmessage('File attached successfully')
      this.attachloader = false;
      // console.log("Response ", this.res);
    });

  }


  GetBatchApi() { //select tag list displaying

    this.commonService.Post_json(GetAllBatchs,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Batchs = response['data'];
      }
    });
  }


  GetTermSApi() { //select tag list displaying
    this.commonService.Post_json(FeesTerm,"").subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Terms = response['data'];
      }
    });
  }

  onChangeTermSelect() {
  }

  onChangeBatchSelect() {
  }

  AllAttachDialog() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Are You Sure!... You Want To Attached All Students??",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        this.AttachAllFees();

      }
    })

  }

  ///AutoComplete
  BatchCode: any;
  Batchkeyword = 'Batch_Name';


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


}
