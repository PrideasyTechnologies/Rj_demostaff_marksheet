import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITableData, ScholarshipService} from './scholarship.service';
import {GridOptions} from 'ag-grid-community';
import {Router} from '@angular/router';
import {EditCellCustomComponent} from '../editcell-custom/editcell-custom.component';
import {GlobalMessage} from "../../globals/global.message";
import {CommanService} from "../../globals/common.services";
import {ProfileList, ProfileResources, Updatefreeship} from "../../globals/global-api";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

@Component({
    selector: 'app-scholarship',
    templateUrl: './scholarship.component.html',
    styleUrls: ['./scholarship.component.scss'],
    providers: [ScholarshipService],
})

export class ScholarshipComponent implements OnInit {
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
    ScholarshipForm!: FormGroup;
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

    perLocation: any = "";
    corCountry: any = "";
    perCountry: any = "";
    corState: any = "";
    perState: any = "";
    corDistrict: any = "";
    perDistrict: any = "";
    Birth_date: any;
    flatno: any;
    streetno: any;
    additional_address: any;
    landmark: any;
    taluka: any;
    city: any;
    pincode: any;

  Scholarship: any;
  PerScholarship: any;

  selectresponse: any;
  country: any;
  district: any;
  location_area: any;
  state: any;
  submitloader = false;

  oSession!: Sessiondata;

    constructor(private router: Router, private scholarshipservice: ScholarshipService,
                private globalmessage: GlobalMessage,private commonService: CommanService,
                private formBuilder: FormBuilder,private sessionService : SessionService) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

   

    pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

            this.GetScholarShipApi();
            this.selectData();


        this.ScholarshipForm = new FormGroup({
            'aadhaar': new FormControl('', Validators.required),
        })

        this.updateprofileForm = new FormGroup({
            'studentaadhaar': new FormControl('', Validators.required),
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl,
            'fathername': new FormControl('', Validators.required),
            'mothername': new FormControl('', Validators.required),
            'gender': new FormControl('', Validators.required),
            'Birth_date': new FormControl('', Validators.required),
            'scholarship': new FormControl('', Validators.required),
        })

    }

    ShowProfile() {
        let jsonin = {
            "useraadhaar": this.oSession.aadhaar,
            "finyear": this.oSession.finyear,
            "collegecode": this.oSession.collegecode,
            "studentaadhaar": parseInt(this.ScholarshipForm.controls["aadhaar"].value)
        }

        this.commonService.Post_json(ProfileList,jsonin).subscribe((response: {}) => {
            this.res = response;

            this.studentaadhaar = this.res.data.Aadhaar;
            this.firstname = this.res.data.FirstName;
            this.lastname = this.res.data.LastName;
            this.fathername = this.res.data.FatherName;
            this.mothername = this.res.data.MotherName;
            this.gender = this.res.data.Gender;

            this.Birth_date = this.res.data.Dob;
            this.flatno = this.res.data.CorrepondenceFlatNo;
            this.streetno = this.res.data.CorrepondenceColonyName;
            this.additional_address = this.res.data.CorrepondenceVillageName;
            this.landmark = this.res.data.CorrepondenceLandmark;
            this.perLocation = this.res.data.CorrepondenceLocationArea;
            this.perCountry = this.res.data.CorrepondenceCountry;
            this.perState = this.res.data.CorrepondenceState;
            this.perDistrict = this.res.data.CorrepondenceDistrict;
            this.taluka = this.res.data.CorrepondenceTaluka;
            this.city = this.res.data.CorrepondenceCity;
            this.pincode = this.res.data.CorrepondencePincode;


            // this.rowss = this.res.data;
            // console.log("row", this.rowss);
            // console.log("res", this.studentaadhaar);

        })

    }



    OnSubmit() {
        this.submitloader = true;
        let jsonin = {
            "collegecode": this.oSession.collegecode,
            "finyear": this.oSession.finyear,
            "useraadhaar": this.oSession.aadhaar,
            "aadhaar": this.updateprofileForm.controls["studentaadhaar"].value,
            "Freeship": this.PerScholarship,
            "batchcode": 99
        }
        console.log("updated:", this.update);

        if (this.studentaadhaar == 0) {
            this.globalmessage.Show_message("Please Enter Student Aadhaar")//alert
        } else {
            this.commonService.Post_json(Updatefreeship,jsonin).subscribe((response: {}) => {
                this.res = response;
                console.log("updated:", this.update);

                if (this.res.data == true) {
                    this.globalmessage.Show_successmessage("Data Updated Successfully")
                    this.updateprofileForm.reset();
                } else {
                    this.globalmessage.Show_error(this.res.exception)//alert
                }
                this.submitloader = false;

            })
        }
    }



    selectData() {

        this.commonService.Post_json(ProfileResources,"").subscribe((response: {}) => {
            this.selectresponse = response;
            // console.log(this.selectresponse)
            if (this.selectresponse.data != null) {

                this.country = this.selectresponse.data.country;
                this.district = this.selectresponse.data.district;
                this.location_area = this.selectresponse.data.Location_Area;
                this.state = this.selectresponse.data.State;
            }

        })
    }

    //Grid column

    columnDefs = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: "Aadhaar", field: 'Aadhaar', resizable: true, editable: true},
        {headerName: "FirstName", field: 'FirstName', resizable: true, editable: true},
        {headerName: "LastName", field: 'LastName', resizable: true, editable: true},
        {headerName: "FatherName", field: 'FatherName', resizable: true, editable: true},
        {headerName: "Gender", field: 'Gender', resizable: true, editable: true},

        {headerName: 'Submit', field: 'Action', cellRendererFramework: EditCellCustomComponent},
        // { headerName: 'Action', field: 'Action', cellRendererFramework: DeleteCellCustomComponent }
    ];

    //Grid Rows
    rowss: any = [
        {"Aadhaar": 2345, "FirstName": "FirstName", "LastName": "LastName", "FatherName": "FatherName", "Gender": "Gender"}
    ];

    //grid- search
    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }


    onRowSelectedEvent(event: any) {
        this.editCellData = event.data;
        // console.log("editCellData", this.editCellData)

    }

    onSelectionChanged(event: any) {
    }




    SelectedScholarship: any;

    onChangeScholarshipSelect() {

    }

    GetScholarShipApi() { //Batch select list displaying

        this.commonService.Post_json(ProfileResources,"").subscribe((response: {}) => {
            this.res = response;
            this.Scholarship = this.res.data.FreeShip;
            // if (models['data'] == '' || models['data'] == null) {
            //         alert("No data found");
            //       }
            //       else {
            //         this.Scholarship = models['data']['FreeShip'];

            //       }


            // this.res = models;
            // for (var key in this.res.data) {
            //   if (this.res.data.hasOwnProperty(key)) {
            //     this.Scholarship = this.res.data[key].FreeShip;
            //     console.log(this.Scholarship);
            //   }
            // }
        })
    }


    resetAll() {
        this.updateprofileForm.reset();
    }
}
