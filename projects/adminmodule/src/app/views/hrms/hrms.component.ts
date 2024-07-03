import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {HrmsService} from "./hrms.service";
import {GlobalMessage} from "../../globals/global.message";
import {base64StringToBlob} from "blob-util";
import {GridOptions} from "ag-grid-community";
import {IEmployee_detail} from "../../models/response";
import {IEmp} from "../inwardoutward/inwardoutward.model";
import {getemployee, iu_employee} from "../../globals/global-variable";
import {CommonService} from "../../../../../marksheet/src/app/globals/common.service";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-questionpaperupload',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss']
})
export class HrmsComponent implements OnInit {

  createHrmsForm!: FormGroup;
  data: any;
  currentYear: any;
  res: any;
  xlsxFile!: Array<File>;
  downloadloader = false;
  BatchCode: any;
  loader: any;
  gridOptions: any;
  gridOptionsemployee: any;
  employee_Ajson!: IEmployee_detail[];
  public Selected_empname_json!: IEmployee_detail | undefined;

  rowSelection: any;
  rowss: any;


  public rowSelectionfeedback: 'single' | 'multiple' = 'single';
  private gridApi: any;
  private gridColumnApi: any;

  AddForm!: FormGroup;
  ShowAdd= false;
  ShowMain= true;
  out_rowselected : any;
  addemployee: any;

  Addloader= false;

  mode = '';
  Birth_date : any;
  date: any;

  oSession!: Sessiondata;

  constructor(private router: Router,private commonService: CommonService,
              private hrmsformservice: HrmsService,
              private globalmessage: GlobalMessage,private sessionService : SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.gridOptionsemployee = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }

 

  ngOnInit(): void {
    // if (!this.Token) {
    //   // this.dialogService.open({ message: 'Please Login', positive: 'Ok', })//alert
    //   Swal.fire({
    //     title: 'Success!',
    //     text: 'Please Login!',
    //     icon: 'success',
    //     confirmButtonText: 'OK',
    //   }); //alert
    //
    //   this.router.navigate(['login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.currentYear = new Date().getFullYear();

    this.empTypeAPI();
    this.Createform();
  }

  Createform(){
    this.createHrmsForm = new FormGroup({
      empname: new FormControl('', Validators.required),
    })
    this.AddForm = new FormGroup({
      fullname: new FormControl(''),
      department: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      Birth_date: new FormControl(''),
      doj: new FormControl(''),
      mobile: new FormControl('', Validators.required),
      alternatemobile: new FormControl('', Validators.required),
      createddate: new FormControl('', Validators.required),
      bloodgroup: new FormControl('', Validators.required),
    })
  }



  OnAdd() {
    this.mode = 'ADD';
      this.onresetform();
      this.ShowMain = false;
      this.ShowAdd = true;

    this.AddForm.controls['fullname'].setValue(this.out_rowselected[0].Full_name);
    this.AddForm.controls['department'].setValue(this.out_rowselected[0].Department);
    this.AddForm.controls['designation'].setValue(this.out_rowselected[0].Designation);
    this.AddForm.controls['address'].setValue(this.out_rowselected[0].Address);
    this.AddForm.controls['email'].setValue(this.out_rowselected[0].Email);
    this.AddForm.controls['mobile'].setValue(this.out_rowselected[0].Mobile);
    this.AddForm.controls['Birth_date'].setValue(this.out_rowselected[0].Dob);
    this.AddForm.controls['doj'].setValue(this.out_rowselected[0].Doj);
    this.AddForm.controls['alternatemobile'].setValue(this.out_rowselected[0].Alternate_mobile);
    this.AddForm.controls['bloodgroup'].setValue(this.out_rowselected[0].Blood_group);
    this.AddForm.controls['createddate'].setValue(this.out_rowselected[0].Created_date);
  }
  onresetform() {
    this.AddForm.reset();
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/employee']);
    });
  }

  public empTypeAPI() {
    this.commonService.Post_json(getemployee,"").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.employee_Ajson = response.data;
    });
  }

  columnDefsemployee: any = [
    {headerName: 'Full Name', field: 'Full_name', resizable: true, editable: true, filter: true},
    {headerName: 'Department', field: 'Department', resizable: true, editable: true, filter: true},
    {headerName: 'Designation', field: 'Designation', resizable: true, editable: true,  filter: true},
    // {headerName: 'College', field: 'College', resizable: true, editable: true,},
    // {headerName: 'Biometric_id_no', field: 'Biometric_id_no', resizable: true, editable: true,  filter: true},
    {headerName: 'Address', field: 'Address', resizable: true, editable: true, filter: true},
    {headerName: 'Dob', field: 'Dob', resizable: true, editable: true, filter: true},
    {headerName: 'Doj', field: 'Doj', resizable: true, editable: true, filter: true},
    {headerName: 'Blood Group', field: 'Blood_group', resizable: true, editable: true, filter: true},
    {headerName: 'Email', field: 'Email', resizable: true, editable: true, filter: true},
    {headerName: 'Mobile', field: 'Mobile', resizable: true, editable: true, filter: true},
    {headerName: 'Alternate number', field: 'Alternate_mobile', resizable: true, editable: true, filter: true},
];
  Addemployee(){
    this.Addloader = true;
    let jsonin = {};
    if(this.out_rowselected == null){
      jsonin = {
        Full_name : this.AddForm.controls['fullname'].value,
        Department : this.AddForm.controls['department'].value,
        Designation : this.AddForm.controls['designation'].value,
        Address : this.AddForm.controls['address'].value,
        Email : this.AddForm.controls['email'].value,
        Dob : this.AddForm.controls['Birth_date'].value,
        Doj : this.AddForm.controls['doj'].value,
        Blood_group : this.AddForm.controls['bloodgroup'].value,
        Mobile : this.AddForm.controls['mobile'].value,
        Alternate_mobile : this.AddForm.controls['alternatemobile'].value,
        Created_date : this.AddForm.controls['createddate'].value,
        Entrymode : "A",
      };
      console.log('data-add',jsonin)
    }
    if(this.out_rowselected){
      jsonin = {
        Empid : this.out_rowselected[0].Empid,
        Full_name: this.AddForm.controls['fullname'].value,
        Department: this.AddForm.controls['department'].value,
        Designation: this.AddForm.controls['designation'].value,
        Address: this.AddForm.controls['address'].value,
        Email: this.AddForm.controls['email'].value,
        Dob: this.AddForm.controls['Birth_date'].value,
        Doj: this.AddForm.controls['doj'].value,
        Blood_group: this.AddForm.controls['bloodgroup'].value,
        Mobile: this.AddForm.controls['mobile'].value,
        Alternate_mobile: this.AddForm.controls['alternatemobile'].value,
        Created_date: this.AddForm.controls['createddate'].value,
        Entrymode: "U",
      };
      console.log('data',jsonin)
    }
    this.commonService.Post_json(iu_employee,jsonin).subscribe((response) => {
      if(response == null){
        this.globalmessage.Show_message('No data found')
      }
      this.addemployee = response
      console.log('uuuu',this.addemployee)
      this.globalmessage.Show_successmessage('Data submitted succesffully')
      this.gridOptionsemployee.api.setRowData(this.addemployee);
      this.Addloader = false;
    });
  }

  selectBatch(bat: any) {
      this.BatchCode = bat.Batch_Code;
      // this.GetSemesterApi();
    }

  onGridReadyemployee(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }
  onRowSelectedEventemployee($event: any) {
  }
  onSelectionChangedemployee(event: any) {
    console.log('xxxxx', event);
    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
  }
}
