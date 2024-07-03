import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FeedbackformService} from "./feedbackform.service";
import {GlobalMessage} from "../../globals/global.message";
import {GridOptions} from "ag-grid-community";
import {
  feedbackname_add,
  feedbackname_list,
  question_add,
  question_list,
  question_type
} from "../../globals/global-api";
import {CommanService} from "../../globals/common.services";
import {IFeedbacklist, IlistQuestion} from "./feedback.model";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';

@Component({
  selector: 'app-questionpaperupload',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.scss']
})
export class FeedbackformComponent implements OnInit {

  createFeedbackForm!: FormGroup;
  feedbackform!: FormGroup;

  data: any;
  currentYear: any;
  res: any;
  xlsxFile!: Array<File>;

  downloadloader = false;
  BatchCode: any;
  loader: any;
  gridOptions: any;
  gridOptionsfeedback: any;

  rowSelectionfeedback: any;
  rowssfeedback: any;

  private gridApifeedback: any;
  private gridColumnApi_feedback: any;

  private gridApi: any;
  private gridColumnApi: any;

  out_rowselected: any;
  questionlist!: IlistQuestion[];
  questionadd: any;


  eventadd: any;
  eventlist!: IFeedbacklist[];
  questiontype: any;
  public SelectedquestionType: any

  rowss: any;

  ShowAddnew = false;
  ShowMainnew = true;
  ShowAdd= false;
  mode = '';
  ShowMain = true;

  eventkeyword = 'Feedbackname';

  EventCode: any;
  Event_code: any;

  oSession!: Sessiondata;

  constructor(private router: Router, private commonService: CommanService,
              private feedbackformService: FeedbackformService,
              private globalmessage: GlobalMessage,private sessionService : SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.gridOptionsfeedback = <GridOptions>{
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
    //   this.currentYear = new Date().getFullYear();
    // }
    // if (!this.Token) {
    //   alert('Please Login!');
    //   this.router.navigate(['/login']);
    // } else {

    this.oSession = new Sessiondata(this.sessionService)
		this.oSession.Getdatafromstroage();

      this.Createform();
      // this.getfeedback();
      this.Questiontype();
      this.getfeedback();

  }

  Createform(){

    this.createFeedbackForm = new FormGroup({
      // 'Batch_Name': new FormControl('', Validators.required),
      eventname: new FormControl('', Validators.required),
    })
    this.feedbackform = new FormGroup({
      upload: new FormControl('', Validators.required),
      selecttype: new FormControl('', Validators.required),
      ename: new FormControl('', Validators.required),
      selectlabel: new FormControl('', Validators.required),
      selecterror: new FormControl('', Validators.required),
      selectmemo: new FormControl('', Validators.required),
    });
  }

  public rowSelection: 'single' | 'multiple' = 'single';


  columnDefs: any = [

    {headerName: 'Name', field: 'Questionname', resizable: true, editable: true,},
    {headerName: 'Type', field: 'Questiontype', resizable: true, editable: true,},
    {headerName: 'Options', field: 'Optionvalues', resizable: true, editable: true,},
    {headerName: 'Label', field: 'Labelname', resizable: true, editable: true,},
    {headerName: 'Error message', field: 'Errormessage', resizable: true, editable: true,},
    {headerName: 'Created By', field: 'Createdby', resizable: true, editable: true,},
];



  selectevent(bat:  any ){
    console.log('data',bat.Feedbackid)
    this.EventCode = bat.Feedbackid;
    console.log('eventcode',this.EventCode)
  }

  onChangeSearch(search: any) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.Event_code = search.Feedbackid;
  }

  onFocused(e: any) {
    // console.log("focused", e)
    // do something
  }

  Showquestionlist(){
    this.getQuestionlist();
  }

  OnAdd() {
    this.mode = 'ADD';
    this.onresetform();
    this.ShowMain = false;
    this.ShowAdd = true;
  }
  onresetform() {
    this.createFeedbackForm.reset();
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/feedback']);
    });
  }

  OnAddNew(){
    if(this.EventCode == null){
      this.globalmessage.Show_error('Please select event')
      return
    }
    this.mode = 'ADD';
    this.onresetnewform();
    this.ShowMainnew = false;
    this.ShowAddnew = true;
  }

  onresetnewform() {
    this.feedbackform.reset();
  }

  resetAllnew() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/feedback']);
    });
  }

  columnDefsfeedback= [

    {headerName: 'Feedback ID', field: 'Feedbackid', resizable: true, editable: true,},
    {headerName: 'Feedback Name', field: 'Feedbackname', resizable: true, editable: true,},
    {headerName: 'Createdby', field: 'Createdby', resizable: true, editable: true,},
    {headerName: 'Createdon', field: 'Createdon', resizable: true, editable: true,},
    {headerName: 'Modifiedby', field: 'Modifiedby', resizable: true, editable: true,},
    {headerName: 'Modifiedon', field: 'Modifiedon', resizable: true, editable: true,},
    {headerName: 'Useraadhaar', field: 'Useraadhaar', resizable: true, editable: true,},
  ];

  OnSubmit() {
    let jsonin= {
      Feedbackname : this.createFeedbackForm.controls['eventname'].value,
      Useraadhaar: this.oSession.aadhaar,
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Feedbackid: 0,
    }
    console.log('name',jsonin)
    this.commonService.Post_json(feedbackname_add,jsonin).subscribe((response) => {
        if(response == null){
          this.globalmessage.Show_error('Invalid data')
        }
        if(response == true)
        this.eventadd = response['data']
      console.log('griddata',this.eventadd)
        this.globalmessage.Show_message('Event added successfully')
      this.gridOptionsfeedback.api.setRowData(this.eventadd)
    });
  }


  getQuestionlist() {
    console.log('kkkk')
    let jsonin={
      Useraadhaar : this.oSession.aadhaar,
      College_code: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Feedbackid: this.EventCode,
    }
    console.log('namequestion',jsonin)
    this.commonService.Post_json(question_list,jsonin).subscribe((response) => {
      if(response == null){
        this.globalmessage.Show_error('Invalid data')
      }
      this.questionlist = response
      this.gridOptions.api.setRowData(this.questionlist)

    });
  }

  Questiontype() {

    this.commonService.Post_json(question_type,"").subscribe((response: any) => {
      if(response == null){
        this.globalmessage.Show_error('Invalid data')
      }
      this.questiontype = response
    });
  }

  getfeedback() {
    let jsonin={
      Useraadhaar: this.oSession.aadhaar,
      College_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
    }
    console.log('listinput',jsonin)
    this.commonService.Post_json(feedbackname_list,jsonin).subscribe((response) => {
      if(response == null){
        this.globalmessage.Show_error('Invalid data')
      }
      this.eventlist = response
      console.log('listdata',this.eventlist)
    });
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onSelectionChanged($event: any) {
    console.log('xxxxx', event);
    let selected_outnode = this.gridApi.getSelectedNodes();
    this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
  }

  onRowSelectedEvent($event:any) {
  }

  onChangeTypeSelect() {
  }

  isChecked!: boolean;

  changeCheckbox(event: any) {
    this.isChecked = event;
    console.log(event);
  }


  OnSubmitevent() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar,
      Questionid : 0,
      Feedbackid : this.EventCode,
      Questionname: this.feedbackform.controls['ename'].value,
      Labelname: this.feedbackform.controls['selectlabel'].value,
      Questiontype : this.SelectedquestionType,
      Errormessage: this.feedbackform.controls['selecterror'].value,
      Optionvalues: this.feedbackform.controls['selectmemo'].value,
      Validationreq: this.isChecked,
    }
    console.log('question add',jsonin)
    this.commonService.Post_json(question_add,jsonin).subscribe((response) => {
        if(response == null){
          this.globalmessage.Show_message('No data found')
          return
        }
        this.questionadd = response
      this.globalmessage.Show_message('Data submitted successfully')
      this.gridOptions.api.setRowData(this.questionadd)

    });
    // Validationreq int binding:"required"
  }

  updateQuestion(){

    let xyz = JSON.stringify(this.out_rowselected)
    let jsonObj = JSON.parse(xyz);

    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear : this.oSession.finyear,
      Useraadhaar : this.oSession.aadhaar,
      Questionid : parseInt(jsonObj[0].Questionid),
      Feedbackid : parseInt(jsonObj[0].Feedbackid),
      Questionname: String(jsonObj[0].Questionname),
      Labelname: String(jsonObj[0].Labelname),
      Questiontype : String(jsonObj[0].Questiontype),
      Errormessage: String(jsonObj[0].Errormessage),
      Optionvalues: String(jsonObj[0].Optionvalues),
      Validationreq: Boolean(jsonObj[0].Validationreq),
      Createdon: String(jsonObj[0].Createdon)
    }
    console.log('question update',jsonin)
    this.commonService.Post_json(question_add,jsonin).subscribe((response) => {
      if(response == null){
        this.globalmessage.Show_message('No data found')
        return
      }
      this.questionadd = response
      this.globalmessage.Show_message('Data updated successfully')
      this.gridOptions.api.setRowData(this.questionadd)
    });
  }

  onGridReadyfeedback(params: any) {
    this.gridApifeedback = params.api;
    this.gridColumnApi_feedback = params.ColumnApi;
  }

  onRowSelectedEventfeedback($event: any) {

  }

  onSelectionChangedfeedback($event: any) {

  }
}
