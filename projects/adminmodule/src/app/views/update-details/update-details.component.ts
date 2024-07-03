import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UpdateDetailsService, ITableData } from './update-details.service';
import { GridOptions } from 'ag-grid-community';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { Router } from '@angular/router';
import { EditCellCustomComponent } from '../editcell-custom/editcell-custom.component';
import { DeleteCellCustomComponent } from '../delete-cellcustom/delete-cellcustom.component';
import { base64StringToBlob } from 'blob-util';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import { Downloadaadhaar, updatemobileemail } from '../../globals/global-api';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss'],
  providers: [UpdateDetailsService],
})
export class UpdateDetailsComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  error: any;
  date: any;
  editCellData: any;
  searchValue: any;
  savealert: boolean = false;
  public data!: ITableData;
  public filterQuery = '';
  submitted = false;
  updatedetailsForm!: FormGroup;
  updateprofileForm!: FormGroup;
  res: any;
  Batchs = [];
  SelectedBatch: any;
  Deletecell: any;
  showlist: any;
  studentaadhaar: any;
  firstname: any;
  lastname: any;
  fathername: any;
  mothername: any;
  gender: any;
  update: any;
  loader = false;

  perLocation: any = '';
  corCountry: any = '';
  perCountry: any = '';
  corState: any = '';
  perState: any = '';
  corDistrict: any = '';
  perDistrict: any = '';
  Birth_date: any;
  flatno: any;
  streetno: any;
  additional_address: any;
  landmark: any;
  taluka: any;
  city: any;
  pincode: any;
  Email: any;
  Mobile:any;

  oSession!: Sessiondata;

  constructor(
    private router: Router,
    private updatedetailsService: UpdateDetailsService,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    private commonService: CommanService,
    private sessionService: SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  ngOnInit(): void {
    // if (!this.Token) {
    //   // alert("Please Login!")
    //   this.globalmessage.Show_message("Please Login!")
    //   this.router.navigate(['login']);
    // }
    // else {
    //
    // }

    this.oSession = new Sessiondata(this.sessionService);
    this.oSession.Getdatafromstroage();

    this.updatedetailsForm = new FormGroup({
      aadhaar: new FormControl('', Validators.required),
      mobile: new FormControl(0),
      email: new FormControl(''),
      // "updatewhat": new FormControl('', Validators.required),
    });
  }

  UpdateDetails() {
    this.loader = true;
    this.Email = this.updatedetailsForm.controls['email'].value;
    this.Mobile = this.updatedetailsForm.controls['mobile'].value;
    let jsonin = {
      mobile: this.updatedetailsForm.controls['mobile'].value,
      email: this.updatedetailsForm.controls['email'].value,
      aadhaar: this.updatedetailsForm.controls['aadhaar'].value,
      updatewhat: '',
    };

    if (this.Email && !this.Mobile) {
      jsonin.updatewhat = 'E';
    }
     else if (this.Mobile && !this.Email) {
      jsonin.updatewhat = 'M';
    }
     else if (this.Mobile && this.Email) {
      jsonin.updatewhat = 'B';
    }

    console.log('jsjson',jsonin)

    this.commonService.Post_json(updatemobileemail,jsonin).subscribe((response: {}) => {
      this.res = response;
      if (this.res.data == true) {
        this.globalmessage.Show_message("Data Updated Successfully")//alert
        this.loader = false;
        this.updatedetailsForm.reset();
      }
      else {
        this.globalmessage.Show_message(this.res.exception)//alert
      }
      
    })
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  Downloadloader = false;
  downloadphoto: any;
  DownloadAadhaar() {
    this.Downloadloader = true;
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      useraadhaar: this.oSession.aadhaar,
      studentaadhaar: parseInt(
        this.updatedetailsForm.controls['aadhaar'].value
      ),
    };
    this.commonService
      .Post_json(Downloadaadhaar, jsonin)
      .subscribe((response) => {
        this.res = response;

        //const byteArray = atob( this.res.blobdata);

        const contentType = '';
        const blobb = base64StringToBlob(this.res.photo, contentType);

        let blob = new Blob([blobb], { type: 'application/blob' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.res.photofile;
        // console.log(link.download);
        link.click();
        // console.log("file created",byteArray);
        // console.log("downloadURL",downloadURL);
        this.Downloadloader = false;
      });
  }
}
