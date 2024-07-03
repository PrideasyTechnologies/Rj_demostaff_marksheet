import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeesCollectionService} from './fees-collection.service';
import {ColDef, GridOptions} from 'ag-grid-community';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMessage} from '../../globals/global.message';
import {CommanService} from '../../globals/common.services';
import {AuthService} from '../../globals/authservice';
import {BilldeskPay} from '../../../assets/javascript/billdesk';
import * as myGlobals from '../../globals/global-variable';


import {
    ApprovedCourse_model,
    Batchs_model,
    Fees_Installment_d_model,
    Fees_Installment_h_model, Ires_term,
    IU_Admission_model,
    Subjects_group_h_model
} from '../../models/response';
import {BILLDESKJS} from '../../globals/global-variable';
import {Ires_bank, ITermName, ItransferTermName} from "./fees-collection.model";
import {
    Bankmasters,
    batch,
    BillDeskcheckSum,
    CheckSubjectGroupQuota,
    FeesTerm,
    findstudentsubject,
    get_installmentdetails,
    get_installmentheader,
    get_scholarship,
    InstallmentValidation,
    IU_Admission,
    IU_Cashreceipt,
    IU_receipt,
    iu_refund,
    StudentAppliedCourses,
    iu_scholarship,
    iu_updateterm,
    Nepsubjects_url,
    StudentApprovedCourses,
    StudentFeesInstallment,
    studentsfeesterm,
    StudentSubjectGroup,
    single_subject,
    Additionalsubjectformfees_URL,
    IU_nepAdmission,
    registertionbatchs,
    PortalOpenv1,
    CurrentSubjectGroupCode
} from "../../globals/global-api";
import {Sessiondata} from '../../models/request';
import {SessionService} from '../../globals/sessionstorage';
import {
    Ires_Courseapplied,
    Ires_FeesSum,
    Ires_nepminorsubjects,
    Ires_PhdBatchs,
    res_singlebatch,
    Subjects_group_h
} from "../../models/responsemodel";
import Swal from "sweetalert2";
import {encryptUsingAES256} from "../../globals/encryptdata";
import {ISubjectetails} from "../change-subjects/change-subjects.model";


@Component({
    selector: 'app-fees-collection',
    templateUrl: './fees-collection.component.html',
    styleUrls: ['./fees-collection.component.scss'],
    providers: [FeesCollectionService],
})
export class FeesCollectionComponent implements OnInit {
    //@Input()
    public Batchs_json!: Batchs_model[];
    sumupdate: boolean = false
    sumupdaterefund: boolean = false

    ///@Input()
    public subject_json!: Subjects_group_h_model[];
    public approvedcourse_json!: ApprovedCourse_model[];
    public selected_approvedcourse!: ApprovedCourse_model;

    private iu_admission_json!: IU_Admission_model;

    private selected_batch!: Batchs_model;
    public selected_subject!: Subjects_group_h_model;

    public selected_installment_header!: Fees_Installment_h_model;
    public selected_installment_detail!: Fees_Installment_d_model[];

    isTermUpdated = false;

    private gridApi: any;
    private gridColumnApi: any;
    public gridOptions: any;
    selectedrefundterm: any;

    private gridApi_scholarship: any;
    private gridColumnApi_scholarship: any;

    selectedFeeshead!: Ires_term;
    selectedfeeshead_term: any;
    searchValue: any;
    error: any;
    savealert: boolean = false;
    data: any;
    public filterQuery = '';
    submitted = false;
    res: any;
    Subjects: any;

    SelectedBatch!: any;
    selectedFeesHead!: any;
    selectedrefundFeesHead!: any;
    FeeStructure!: any;
    Installments_json: any = [];
    index: any;
    IfChequeSelected = 'CASH';
    IfChequeSelectedNEFT = 'NEFT';

    Feesstructure_json!: Ires_FeesSum[];
    schlorshipResponse_json: any = [];

    refundschlorshipResponse_json: any = [];

    refundFeesstructure_json: any = [];


    actualTotal = 0;
    refundactualTotal = 0;

    adjustmentAmount = 0;
    refundadjustmentAmount = 0;
    adjustmentTotal = 0;
    refundadjustmentTotal = 0;

    currentactive: boolean = false;

    Feesamount_header = 0;


    updateterm: any;

    OldTerm: any;
    NewTerm: any;

    SelectedData: any;
    refundSelectedData: any;

  portal!: Ires_PhdBatchs;
  AppliedCourses!: Ires_Courseapplied[];
  minorsubjects!: Ires_nepminorsubjects[];


    oSession!: Sessiondata;


    @ViewChild('infoModal') infoModal: any;
    SubjectsName: any;
    banks_json!: Ires_bank[];
    InstallmentID: any;
    TermCode: any;
    SelectedBank: any = null;

    ///AutoComplete

    Batchkeyword = 'Batch_Name';

    public feeCollectionForm!: FormGroup;
    public scholarshipForm!: FormGroup;

    public feesubForm!: FormGroup;
    public ShowaadhaarForm!: FormGroup;
    public StudentTermsForm!: FormGroup;
    public normaladmissionform!: FormGroup;
    public feespaymentform!: FormGroup;
    public scholarshipSearchForm!: FormGroup;

    public adjustmentamountForm!: FormGroup;
    public adjustmentscholarshipForm!: FormGroup;


    public RefundCollectionForm!: FormGroup;
    public refundscholarshipForm!: FormGroup;

    SubmitFeesloader = false;
    narration: any;
    narrationrefund: any;
    Fromterms!: ITermName[];
    Toterms!: ItransferTermName[];


    Studentname!: string;

   billdeskmsg: any;

    Installmentamont!: any;

    Amount: string = "";
    Emailid: string = "";
    FullName: string = "";
    Mobile: string = "";
    public columnDefs = [
        {field: '', maxWidth: 50, checkboxSelection: true},
        {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true},
        {headerName: 'Full Name', field: 'FullName', resizable: true},
        {headerName: 'Sgpa', field: 'Sgpa', resizable: true},
        {headerName: 'Credit Points', field: 'Creditpoints', resizable: true},
    ];

    public rowss: any = [];
    submitScholarshiploader = false;
    refundScholarshiploader = false;
    feesDetails: any;
    feesDetailsrefund: any;


    //Upload File
    downloaddata: any;
    Downloadloader = false;
    xlsxFile!: Array<File>;
    formData = new FormData();
    uploadloader = false;
    feesHead_json!: Ires_term[];
    feesHead_json_refund: any;

    public selectedRowIds: Set<number> = new Set<number>();
    public refundselectedRowIds: Set<number> = new Set<number>();


    myScriptElement!: HTMLScriptElement;
    private Pagename!: string;
    private selected_aadhaar: number = 0;
    public Paidfees: any;
    public Paidfeesrefund: any;
    private selectedtab!: string;
    private selected_installment: any;
    private selected_paymentmode!: string;

    textValue = "Text!";

    //NEP Variables

  additionalSubjectsForm!: FormGroup;
  //jk
  NepAdditionalsubjectForm!: FormGroup;
  modalSubmit = false;
  selected_major!: Subjects_group_h;
  selected_minor!: Ires_nepminorsubjects;
  selected_oe!: Ires_nepminorsubjects;
  selected_vsc!: Ires_nepminorsubjects;
  selected_vec!: Ires_nepminorsubjects;
  selected_sec!: Ires_nepminorsubjects;
  selected_aec!: Ires_nepminorsubjects;
  selected_iks!: Ires_nepminorsubjects;
  selected_cc!: Ires_nepminorsubjects;
  selected_fp!: Ires_nepminorsubjects;
  major_subjectgroup: any;
  majorsubjects: Subjects_group_h[] = [];
  majorsubjects_nep = [];


  oesubjects: any = [];
  vscsubjects: any = [];
  vecsubjects: any = [];
  secsubjects: any = [];
  aecsubjects: any = [];
  ikssubjects: any = [];
  ccsubjects: any = [];
  fpsubjects: any = [];
  Tokenfound!: boolean;
/////

  SubjectGroups: any;
  SubjectGroupID: any;
  batchSubjects: any;
  BatchCode: any;
  formAmount: any;

  ReceiptID: any;
  ReceiptNo: any;
  billdeskRequestMsg: any;

  selectedObject: any;

  resp_singlebatch!: res_singlebatch;

  pageType: any;

  formtype!: string;

  //Nep

    SubjectGroupCode: any;
    modalBatch: res_singlebatch[] = [];
    BatchObject!: res_singlebatch;
    selected_groupcode: any = [];

    Subject_group_code!: ISubjectetails[];

    constructor(private router: Router, private commonService: CommanService,
                private feescollectionService: FeesCollectionService,
                private formBuilder: FormBuilder, private activerouter: ActivatedRoute,
                private globalmessage: GlobalMessage, private commanservice: CommanService,
                private authservice: AuthService, private sessionService: SessionService) {

        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };

        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };

        this.Load_paymentgateway();
    }

    Load_paymentgateway() {
        this.myScriptElement = document.createElement('script');
        this.myScriptElement.src = BILLDESKJS;
        document.body.appendChild(this.myScriptElement);
    }


    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        this.activerouter.queryParams
            .subscribe(params => {
                this.Pagename = params['page'];
            });

        if (this.Pagename == 'Admissionsucess') {
            this.globalmessage.Show_message('Payment received sucess fully');
            return;
        }
        if (this.Pagename == 'Admissionfail') {
            this.globalmessage.Show_message('Payment not received ');
            return;
        }

        this.Createformcontrols();
        this.GetBatchApi();
        this.sumupdaterefund = true;
    }


    Createformcontrols() {


        this.feeCollectionForm = this.formBuilder.group({
            'Aadhaar': new FormControl('', Validators.required),
        });

        this.scholarshipSearchForm = this.formBuilder.group({
            'Aadhaarfees': new FormControl('', Validators.required),
        });


        this.scholarshipForm = this.formBuilder.group({
            'studentname': new FormControl('', Validators.required),
            'mobileno': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            //'installmentamount': new FormControl('', Validators.required),
            'narrationscholarship': new FormControl('', Validators.required),
            'receiptdate': new FormControl('', Validators.required),
            'selectedFeesHead': new FormControl('', Validators.required),
        });


        this.RefundCollectionForm = this.formBuilder.group({
            'Aadhaarrefund': new FormControl('', Validators.required),
        });

        this.refundscholarshipForm = this.formBuilder.group({
            'studentnamerefund': new FormControl('', Validators.required),
            'mobilenorefund': new FormControl('', Validators.required),
            'emailrefund': new FormControl('', Validators.required),
            //'installmentamount': new FormControl('', Validators.required),
            'narrationrefund': new FormControl('', Validators.required),
            'receiptdaterefund': new FormControl('', Validators.required),
            //ngmodel
            'selected_refundterm': new FormControl('', Validators.required),
            // 'selected_refundterm': new FormControl('', Validators.required),

        });


        this.feesubForm = this.formBuilder.group({
            'Subjects': new FormControl('', Validators.required),
            'installment': new FormControl('', Validators.required),
            'payment': new FormControl('', Validators.required),
            'bankname': new FormControl(''),
            'chequeno': new FormControl(''),
            'chequedate': new FormControl(''),
            'narration': new FormControl(''),
        });

        this.ShowaadhaarForm = this.formBuilder.group({
            'ctr_aadhaar': new FormControl('', Validators.required),
        });

        this.StudentTermsForm = this.formBuilder.group({
            'ctr_fromterm': new FormControl('', Validators.required),
            'ctr_toterm': new FormControl('', Validators.required),
            'notes': new FormControl('', Validators.required),
        });

        this.normaladmissionform = this.formBuilder.group({
            ctr_batchname: new FormControl('', [Validators.required]),
            ctr_subjectname: new FormControl('', [Validators.required]),
            ctr_studentaadhaar: new FormControl('', [Validators.required]),
            ctr_type: new FormControl('', [Validators.required])
        });

        this.feespaymentform = this.formBuilder.group({
            ctr_paymentaadhaar: new FormControl('', [Validators.required]),
            ctr_paymentbatch: new FormControl('', [Validators.required]),
            ctr_paymentsubject: new FormControl('', [Validators.required]),
            ctr_paymentinstallment: new FormControl('', [Validators.required]),
            ctr_paymentmode: new FormControl('', [Validators.required]),
        });

        this.adjustmentamountForm = this.formBuilder.group({
            Adjustmentamount: new FormControl('', [Validators.required]),
        });

        this.adjustmentscholarshipForm = this.formBuilder.group({

            Inputamount: new FormControl('', [Validators.required]),
            Adjustmentamount: new FormControl('', [Validators.required]),
        });

      this.additionalSubjectsForm = this.formBuilder.group({
        batch: ['', Validators.required],
        batchSubjects: ['', Validators.required],
      });

      this.NepAdditionalsubjectForm = this.formBuilder.group({

        batch: ['', Validators.required],
        frm_majorsubjects: ['', Validators.required],
        frm_minorsubjects: ['', Validators.required],
        frm_oesubjects: ['', Validators.required],
        frm_vscsubjects: ['', Validators.required],
        frm_secsubjects: ['', Validators.required],
        frm_aecsubjects: ['', Validators.required],
        frm_vecsubjects: ['', Validators.required],
        frm_ikssubjects: ['', Validators.required],
        frm_ccsubjects: ['', Validators.required],
        frm_fpsubjects: ['', Validators.required],
          ctr_nepaadhaar: ['',Validators.required]

      });


        this.NEPSelectBatch();
      //for outside student
      // if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {
      //
      //   this.NEPSelectBatch();
      //   // // if (this.pageType == 'R') {
      //   // //     this.NEPSelectBatch();
      //   //     this.Register_Batch_api()
      //   // // } else {
      //   //     // this.Show_registrationbatchs('PG')
      //   // }
      // } else {
      //   //for inhouse student
      //
      //     //newShiv
      //   // this.single_batch();
      // }


        this.currentactive = true;
    }

    get normalform_fn() {
        return this.normaladmissionform.controls;
    }

    get normal_batch() {
        return this.normaladmissionform.get('ctr_batchname');
    }

    get normal_subject() {
        return this.normaladmissionform.get('ctr_subjectname');
    }

    get normal_aadhaar() {
        return this.normaladmissionform.get('ctr_studentaadhaar');
    }

    get normal_paymentmode() {
        return this.normaladmissionform.get('ctr_type');
    }

    get ctr_paymentbatch_fld() {
        return this.feespaymentform.get('ctr_paymentbatch');
    }

    get ctr_paymentinstallment_fld() {
        return this.feespaymentform.get('ctr_paymentinstallment');
    }

    get ctr_paymentsubject_fld() {
        return this.feespaymentform.get('ctr_paymentsubject');
    }

    get ctr_paymentmode_fld() {
        return this.feespaymentform.get('ctr_paymentmode');
    }

    get ctr_paymentaadhaar_fld() {
        return this.feespaymentform.get('ctr_paymentaadhaar');
    }

    PaymentMethod() {
        if (this.IfChequeSelected != 'CASH') {
            this.Bankmasters();
        } else {
            this.feesubForm.controls['bankname'].setValue('');
            this.feesubForm.controls['chequeno'].setValue('');
            this.feesubForm.controls['chequedate'].setValue('');
        }
    }

    onReset() {
        this.submitted = false;
        this.feeCollectionForm.reset();
        this.feesubForm.reset();
    }

    modal() {
        this.infoModal.show();
    }

    GetBatchApi() {//batch select api
        this.commanservice.Batches().subscribe((response: any) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Batchs_json = response['data'];
            }
        });
    }

    SubjectApi() { //subject api
        let nAadhaar = this.feeCollectionForm.controls['Aadhaar'].value;
        let jsonin =
            {
                'Aadhaar': nAadhaar,
                'Finyear': this.oSession.finyear,
                'CollegeCode': this.oSession.collegecode,
                'BatchCode': this.selected_batch.Batch_Code
            };
        this.commonService.Post_json(findstudentsubject, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.subject_json = response;
            this.Subjects = response.data.CurrentSubjectGoroup.Subject_group_code;
            this.SubjectsName = this.Subjects + ' - ' + response.data.CurrentSubjectGoroup.Subject_group_name;
            this.feesubForm.controls['Subjects'].setValue(this.SubjectsName);

            this.ShowInstallmentDetails(nAadhaar, this.selected_batch.Batch_Code);
            console.log('ooo');
            this.showFeesAmount(this.FeeStructure);

        });
    }

    Bankmasters() { //subject api
        if (this.feeCollectionForm.controls['Aadhaar'].value == '') {
            this.globalmessage.Show_message('Please Enter Aadhaar!');
            return;
        }

        let jsonin =
            {
                'Aadhaar': this.feeCollectionForm.controls['Aadhaar'].value,
                'Finyear': this.oSession.finyear,
                'CollegeCode': this.oSession.collegecode,
            };

        this.commonService.Post_json(Bankmasters, jsonin).subscribe(response => {
            if (response == null) {
                return;
            }
            this.banks_json = response.data;
        });
    }

    onSubmitFees() {//submit Button aoi
        this.SubmitFeesloader = true;
        let jsonin = {};

        if (this.IfChequeSelected == 'CASH' || this.IfChequeSelected == 'NEFT') {
            jsonin = {
                'Finyear': this.oSession.finyear,
                'College_code': this.oSession.collegecode,
                'Aadhaar': this.feeCollectionForm.controls['Aadhaar'].value,
                'Batch_code': this.selected_batch.Batch_Code,
                'Term_code': this.TermCode,
                'Installment': this.InstallmentID,
                'Payment_mode': this.feesubForm.controls['payment'].value,
                'Narration': this.feesubForm.controls['narration'].value,
                'Createdby': this.oSession.aadhaar
            };
        }

        if (this.IfChequeSelected == 'CHEQUE' || this.IfChequeSelected == 'DD') {
            jsonin = {
                'Finyear': this.oSession.finyear,
                'College_code': this.oSession.collegecode,
                'Aadhaar': this.feeCollectionForm.controls['Aadhaar'].value,
                'Batch_code': this.selected_batch.Batch_Code,
                'Term_code': this.TermCode,
                'Installment': this.InstallmentID,
                'Payment_mode': this.feesubForm.controls['payment'].value,
                'Bank': this.SelectedBank.Bank,
                'Chequeno': this.feesubForm.controls['chequeno'].value,
                'Chequedate': this.feesubForm.controls['chequedate'].value,
                'Narration': this.feesubForm.controls['narration'].value,
                'Createdby': this.oSession.aadhaar
            };
        }

        this.commonService.Post_json(IU_Cashreceipt, jsonin).subscribe(response => {
            if (response == null) {
                return;
            }
            if (response == true) {
                this.globalmessage.Show_successmessage('Receipt Saved!');
                this.onResetform();
                this.SubmitFeesloader = false;
            } else {
                this.globalmessage.Show_message('Receipt not Saved!');
                this.SubmitFeesloader = false;
            }
        });
    }

    onResetform() {
        this.feesubForm.reset();
        this.feeCollectionForm.reset();
        this.scholarshipForm.reset();
    }

    onChangeBatchSelect() {
    }

    SelectBank() {
    }


    showFeesAmount(FeeStructure: any) {
        if (FeeStructure == null) {
            return;
        }
        this.TermCode = FeeStructure.Header.Term_code;
        this.InstallmentID = FeeStructure.Header.Installmentid;
        this.Amount = FeeStructure.Header.Amount;
        this.Emailid = FeeStructure.Header.Emailid;
        this.FullName = FeeStructure.Header.FullName;
        this.Mobile = FeeStructure.Header.Mobile;
    }

    public themeClass: string =
        "ag-theme-quartz";


    public defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
        editable: true,
    };

    ShowInstallmentDetails(aadhaar: number, batchcode: number) {//select installment api
        this.submitted = true;

        let jsonin = {
            'collegecode': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            'batchcode': parseInt(String(batchcode)),
            'aadhaar': aadhaar
        };

        this.commonService.Post_json(StudentFeesInstallment, jsonin).subscribe(response => {
            if (response == null) {
                return;
            }

            if (this.Installments_json == null) {
                this.globalmessage.Show_message('No Installments Found');
                return;
            }
            this.Installments_json = response.data.Installments;
            this.Studentname = this.Installments_json[0].Header.FullName;
            this.Installmentamont = this.Installments_json[0].Header.Amount
        });
    }


    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }


    public rowSelection: 'single' | 'multiple' = 'single';

    onRowSelectedEvent(event: any) {

    }

    onChangeFeesHead(index: any) {

        return;
        this.selectedFeesHead = event
    }

    onSubmitScholarship() {
        this.submitScholarshiploader = true;
        let jsonin = {
            'Finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            'Aadhaar': this.scholarshipSearchForm.controls['Aadhaarfees'].value,
            'Batch_code': this.selected_batch.Batch_Code,
            'Createdby': this.oSession.aadhaar,
            'Term_code': this.selectedFeeshead.Term_code,
            'Receiptamount': this.adjustmentTotal,
            'Installment': this.selectedFeeshead.Installmentid,
            'Narration': this.scholarshipForm.controls['narrationscholarship'].value,
            'BilldeskiD': parseInt(this.schlorshipResponse_json.Billdeskid),
            'Billdesktranid': this.schlorshipResponse_json.Billdesktranid,
            // 'Billdeskdate': this.scholarshipForm.controls['date'].value,
            'Billdeskdate': this.scholarshipForm.controls['receiptdate'].value,
            'Payment_mode': 'SCHOLARSHIP',
            'Feesdetails': this.Feesstructure_json
        };

        console.log('json',jsonin)

        this.commanservice.Post_json(iu_scholarship, jsonin).subscribe(response => {
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalmessage.Show_successmessage('Data Updated Successfully!');
                this.onResetform();
                this.submitScholarshiploader = false;
            } else {
                this.globalmessage.Show_message('Data not Updated!');
                this.submitScholarshiploader = false;
            }
        });
    }

    onSubmitRefund() {
        this.refundScholarshiploader = true;
        let jsonin = {
            'Finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            'Aadhaar': this.RefundCollectionForm.controls['Aadhaarrefund'].value,
            'Batch_code': this.selected_batch.Batch_Code,
            'Createdby': this.oSession.aadhaar,
            'Term_code': this.selectedrefundterm.Term_code,
            'Receiptamount': this.refundadjustmentTotal,
            'Installment': this.selectedrefundterm.Installment_ID,
            'Narration': this.refundscholarshipForm.controls['narrationrefund'].value,
            // 'BilldeskiD': parseInt(this.refundschlorshipResponse_json.Billdeskid),
            // 'Billdesktranid': this.refundschlorshipResponse_json.Billdesktranid,
            // 'Billdeskdate': this.RefundCollectionForm.controls['date'].value,

            // 'Billdeskdate': this.Paidfeesrefund.Billdeskdate,
            'Payment_mode': 'REFUND',
            'Feesdetails': this.refundFeesstructure_json
        };

        this.commanservice.Post_json(iu_refund, jsonin).subscribe(response => {
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalmessage.Show_successmessage('Data Updated Successfully!');
                this.onResetform();
                this.refundScholarshiploader = false;
            } else {
                this.globalmessage.Show_message('Data not Updated!');
                this.refundScholarshiploader = false;
            }
        });
    }

    showScholarship() {
        this.actualTotal = 0;
        let jsonin =
            {
                'Aadhaar': this.scholarshipSearchForm.controls['Aadhaarfees'].value,
                'Finyear': this.oSession.finyear,
                'College_code': this.oSession.collegecode,
                'Batch_code': this.selected_batch.Batch_Code,
                'Moduletype': 'SCHOLARSHIP'
            };
        this.commonService.Post_json(get_scholarship, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }

            this.schlorshipResponse_json = response.data;
            this.scholarshipForm.controls['email'].setValue(this.schlorshipResponse_json.Registration.EmailID);
            this.scholarshipForm.controls['mobileno'].setValue(this.schlorshipResponse_json.Registration.MobileNumber);
            this.scholarshipForm.controls['studentname'].setValue(this.schlorshipResponse_json.Studentprofile.FirstName);

            this.Paidfees = this.schlorshipResponse_json.Paidfees;
            this.getFeesHeaderApi();

        });
    }

    showRefund() {
        this.refundactualTotal = 0;
        let jsonin =
            {
                'Aadhaar': this.RefundCollectionForm.controls['Aadhaarrefund'].value,
                'Finyear': this.oSession.finyear,
                'College_code': this.oSession.collegecode,
                'Batch_code': this.selected_batch.Batch_Code,
                'Moduletype': 'REFUND'
            };
        this.commonService.Post_json(get_scholarship, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }

            this.refundschlorshipResponse_json = response.data;
            this.refundscholarshipForm.controls['emailrefund'].setValue(this.refundschlorshipResponse_json.Registration.EmailID);
            this.refundscholarshipForm.controls['mobilenorefund'].setValue(this.refundschlorshipResponse_json.Registration.MobileNumber);
            this.refundscholarshipForm.controls['studentnamerefund'].setValue(this.refundschlorshipResponse_json.Studentprofile.FirstName);


            this.Paidfeesrefund = this.refundschlorshipResponse_json.Paidfees;
            this.getFeesHeaderrefundApi();

        });
    }


    getFeesHeaderApi() {//batch select api
        let jsonin =
            {
                'finyear': this.oSession.finyear,
                'college_code': this.oSession.collegecode,
                'batch_code': this.selected_batch.Batch_Code
            };
        this.commonService.Post_json(get_installmentheader, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_message('No data found');
                return;
            }
            this.feesHead_json = response['data'];
        });
    }

    getFeesHeaderrefundApi() {//batch select api
        let jsonin =
            {
                'finyear': this.oSession.finyear,
                'college_code': this.oSession.collegecode,
                'batch_code': this.selected_batch.Batch_Code
            };
        this.commonService.Post_json(get_installmentheader, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_message('No data found');
                return;
            }
            this.feesHead_json_refund = response['data'];
        });
    }

    onShowFeesStructure() {

        let jsonin =
            {
                'installment_id': this.selectedFeeshead.Installment_ID
            };
        this.commonService.Post_json(get_installmentdetails, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Feesstructure_json = response.data;

            for (let i = 0; i < this.Feesstructure_json.length; i++) {
                this.actualTotal += this.Feesstructure_json[i].Amount;
                this.Feesstructure_json[i]['Adjustmentamount'] = this.adjustmentAmount;
            }
        });

    }

    inputadjustmentamount: any;
    newrefundadjust: any;

    onShowRefundFeesStructure() {
        let jsonin =
            {
                'installment_id': this.selectedrefundterm.Installment_ID
            };
        this.commonService.Post_json(get_installmentdetails, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.refundFeesstructure_json = response.data;

            for (let i = 0; i < this.refundFeesstructure_json.length; i++) {
                this.refundactualTotal += parseInt(this.refundFeesstructure_json[i].Amount);

                this.refundFeesstructure_json[i]['Adjustmentamount'] = this.refundFeesstructure_json[i].Amount;
                // this.newrefundadjust = this.refundFeesstructure_json[i].Amount;
            }

            console.log('adjustamount', this.refundFeesstructure_json);
        });
    }


    findSum(Feesstructure: any) {


        this.sumupdate = false;
        this.adjustmentTotal = 0;


        for (let i = 0; i < this.Feesstructure_json.length; i++) {

            console.log('kkkk', this.Feesstructure_json[i].Adjustmentamount)

            let nAmount = this.Feesstructure_json[i].Adjustmentamount;

            if (nAmount <= 0) {
                continue;
            }

            // this.adjustmentTotal += parseInt(this.Feesstructure_json[i].Adjustmentamount);
            this.adjustmentTotal += nAmount
            console.log('total', this.adjustmentTotal)
        }

        // console.log('json',this.Feesstructure_json)

        this.sumupdate = true;

    }

    findSumrefund(Feesstructurerefund: any) {

        // this.sumupdaterefund = false ;
        this.refundadjustmentTotal = 0;
        for (let i = 0; i < this.refundFeesstructure_json.length; i++) {

            if (this.refundFeesstructure_json[i].Adjustmentamount == " ") {
                continue;
            }
            this.refundadjustmentTotal += parseInt(this.refundFeesstructure_json[i].Adjustmentamount)
            // this.refundadjustmentTotal += parseInt(this.refundFeesstructure_json[i].Adjustmentamount);
        }
        // this.sumupdaterefund = true ;

        console.log('sumupdate', this.refundadjustmentTotal)

        //this.feesDetailsrefund = Feesstructurerefund;
    }


    public onRowClick(Fees_name: number, myid: number) {


        if(this.Feesstructure_json[myid].Adjustmentamount > this.Feesstructure_json[myid].Amount){
            this.globalmessage.Show_error('Adjustment amount should ' +
                'be less than actual amount.')
            return;
        }

        this.adjustmentTotal = 0;
        // if (this.selectedRowIds.has(Fees_name)) {
        //   this.selectedRowIds.delete(Fees_name);
        // } else {
        //   this.selectedRowIds.add(Fees_name);
        // }

        if (myid >= 0) {
            this.Feesstructure_json[myid].Adjustmentamount = this.Feesstructure_json[myid].Adjustmentamount;
        }

        console.log('amnt', this.Feesstructure_json[myid])

        this.SelectedData = this.getSelectedRows();

        console.log('Selected', this.SelectedData)

        this.findSum(this.SelectedData);

    }

    public onRowClickrefund(Fees_name: number, myid: number) {
        console.log('Fees_name : ', Fees_name, ' myid : ', myid)

        this.refundadjustmentTotal = 0;

        if (myid >= 0) {
            this.refundFeesstructure_json[myid].Adjustmentamount = parseInt(this.refundFeesstructure_json[myid].Adjustmentamount);
        }

        this.refundSelectedData = this.getrefundSelectedRows();
        this.findSumrefund(this.refundSelectedData);
        console.log('sum', this.refundadjustmentTotal)
    }


    public rowIsSelected(Fees_name: number) {
        this.adjustmentTotal = 0;
        this.selectedRowIds.has(Fees_name);

        this.SelectedData = this.getSelectedRows();

        // this.findSum(this.SelectedData);


    }

    public refundrowIsSelected(Fees_name: number, myid: number) {
        this.adjustmentTotal = 0;
        this.refundselectedRowIds.has(Fees_name);
        this.refundSelectedData = this.getrefundSelectedRows();
        this.findSumrefund(this.refundSelectedData);
    }

    public getSelectedRows() {
        return this.Feesstructure_json.filter((x: any) => this.selectedRowIds.has(x.Fees_name));

    }

    public getrefundSelectedRows() {
        return this.refundFeesstructure_json.filter((x: any) => this.refundselectedRowIds.has(x.Fees_name));
    }

    //download File
    OnDownloadFile() {
        // this.downloadclicked = true;
        this.Downloadloader = true;
        this.downloaddata = {
            'college_code': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            'batch_code': this.selected_batch,
            'useraadhaar': this.oSession.aadhaar,
        };
    }

    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        if (this.xlsxFile[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            && this.xlsxFile[0].size < 2400000) {
        } else {
            this.globalmessage.Show_message('Only .xlsx file allowed!');
        }
    }


    //end
    onselect_batch(selectedIndex: any) {
        if (selectedIndex <= 0) {
            return;
        }
        this.selected_batch = this.Batchs_json[selectedIndex - 1];

        if (this.selected_batch.Batch_Code <= 0) {
            return;
        }

        this.Batch_subject_api(this.selected_batch.Batch_Code);
    }

    Batch_subject_api(selected_batchcode: number) {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: parseInt(String(selected_batchcode)),
            aadhaar: this.oSession.aadhaar,
        };
        this.commonService
            .Post_json(StudentSubjectGroup, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    return;
                }
                this.subject_json = response.data;

                if (this.selectedtab == 'admission') {
                    this.ctr_paymentbatch_fld!.setValue('');
                }
                if (this.selectedtab == 'fees') {
                    this.normal_batch!.setValue('');
                }
            });
    }

    selectBatch(bat: any) {

        this.selected_batch = bat;
    }

    onChangeSearch(search: string) {
    }

    onFocused(e: any) {
    }

    OnsubmitAadhaar(ShowaadhaarForm: FormGroup) {
        this.termName();
        // this.StudentTermsForm.controls['ctr_fromterm'].setValue(this.)
    }

    Onsubmit_Terms() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Aadhaar: this.ShowaadhaarForm.controls['ctr_aadhaar'].value,
            Useraadhaar: this.oSession.aadhaar,
            Old_term: this.OldTerm.Term_Code,
            New_term: this.NewTerm.Term_Code,
            Remarks: this.StudentTermsForm.controls['notes'].value,
        };
        this.commanservice.Post_json(iu_updateterm, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data dound')
            }
            this.updateterm = response;
            this.globalmessage.Show_successmessage('Data Updated Successfully!');

        });
    }

    OnChangeToterm($event: Event) {
        this.StudentTermsForm.value.ctr_toterm.setValue($event.target, {
            onlySelf: true,
        });
    }

    get Get_fromterm() {
        return this.StudentTermsForm.get('ctr_fromterm');
    }

    get Get_toterm() {
        return this.StudentTermsForm.get('ctr_toterm');
    }


    onselect_subject(index: any) {
        if (index <= 0) {
            return;
        }
        this.selected_subject = this.subject_json [index - 1];
        //this.CheckSubjectGroupQuota(this.selected_subject.Subject_group_id, this.selected_subject.Subject_group_code);
    }

    CheckSubjectGroupQuota(subjectid: number, subjectgroupcode: string) {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.selected_batch.Batch_Code,
            subjectgroupid: subjectid,
            subject_group_code: subjectgroupcode,
            quota_status: 'XXXX',
        };
        this.commanservice
            .Post_json(CheckSubjectGroupQuota, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    return;
                }
                if (response.data != null) {
                    let QuotaStatus = response.data[0].Quota_status;
                    if (QuotaStatus != 'OPEN') {
                        this.globalmessage.Show_message('Quota Closed! Select Different Group Code.');
                    }
                }
            });
    }

    onsubmit_normaladmission(normaladmissionform: FormGroup) {
        if (normaladmissionform.invalid) {
            return;
        }

        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.selected_aadhaar,
            batch_code: this.selected_batch.Batch_Code,
            subject_group_id: this.selected_subject.Subject_group_id,
            subject_group_code: this.selected_subject.Subject_group_code,
            term_code: 9999,
        };

        this.commanservice
            .Post_json(IU_Admission, jsonin)
            .subscribe((response) => {
                debugger;
                if (response == null) {
                    this.globalmessage.Show_error('something went wrong');
                    return;
                }
                this.iu_admission_json = response.data;

                if (this.iu_admission_json.ReceiptID > 0) {
                    this.RegistrationPayment(this.iu_admission_json.ReceiptID, this.iu_admission_json.ReceiptNo);
                }
            });
    }

    RegistrationPayment(receiptid: number, receiptno: string) {
        if (this.selected_aadhaar <= 0) {
            this.globalmessage.Show_error('Select aadhaar');
            return;
        }
        let nTranscationamount = String(this.selected_batch.FormAmount);
        if (this.normal_paymentmode!.value == 'DEMO') {
            nTranscationamount = '1';
        }
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.selected_batch.Batch_Code,
            aadhaar: this.selected_aadhaar,
            termcode: 9999,
            MerchantID: '',
            CustomerID: receiptno,
            Filler1: 'NA',
            TxnAmount: nTranscationamount,
            BankID: 'NA',
            Filler2: 'NA',
            Filler3: 'NA',
            CurrencyType: 'INR',
            ItemCode: 'NA',
            TypeField1: 'R',
            SecurityID: '',
            Filler4: 'NA',
            Filler5: 'NA',
            TypeField2: 'F',
            AdditionalInfo1: String(this.oSession.finyear),
            AdditionalInfo2: '',
            AdditionalInfo3: String(this.selected_batch.Batch_Code),
            AdditionalInfo4: String(this.selected_aadhaar),
            AdditionalInfo5: '9999',
            AdditionalInfo6: '1',
            AdditionalInfo7: String(receiptid),
            TypeField3: 'NA',
            Feestype: 'FORMFEES',
        };

        this.commonService
            .Post_json(BillDeskcheckSum, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    this.globalmessage.Show_error('something went wrong');
                    return;
                }
                if (response.data != null) {
                    //krunal
                    BilldeskPay(response.data,"","");
                }
            });
    }

    normal_admission_aadhaar() {
        this.selected_aadhaar = this.normal_aadhaar!.value;
    }

    IU_Receipt(feespaymentform: FormGroup) {
        if (feespaymentform.invalid) {
            return;
        }
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.selected_aadhaar,
            batch_code: this.selected_installment_header.Batch_code,
            term_code: this.selected_installment_header.Term_code,
            installment: this.selected_installment_header.Installmentid,

            existing_subject_group_id: parseInt(this.selected_approvedcourse.Subject_group_id.toString()),
            paid_subject_group_id: parseInt(this.selected_approvedcourse.Subject_group_id.toString()),
            existing_subject_group_code: this.selected_approvedcourse.Subject_group_code.toString(),
            paid_subject_group_code: this.selected_approvedcourse.Subject_group_code.toString(),
        };

        this.commonService.Post_json(IU_receipt, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('Something went wrong');
                return;
            }

            if (response.data.ReceiptID <= 0) {
                this.globalmessage.Show_error('Something went wrong check receipt no');
                return;
            }

            let nAmount = this.selected_installment_header.Amount;
            if (this.ctr_paymentmode_fld!.value == 'DEMO') {
                nAmount = 1;
            }
            let jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: this.oSession.finyear,
                batchcode: this.selected_installment_header.Batch_code,
                aadhaar: this.selected_aadhaar,
                termcode: this.selected_installment_header.Term_code,
                MerchantID: '',
                CustomerID: String(response.data.ReceiptNo),
                Filler1: 'NA',
                TxnAmount: nAmount.toString(),
                BankID: 'NA',
                Filler2: 'NA',
                Filler3: 'NA',
                CurrencyType: 'INR',
                ItemCode: 'NA',
                TypeField1: 'R',
                SecurityID: '',
                Filler4: 'NA',
                Filler5: 'NA',
                TypeField2: 'F',
                AdditionalInfo1: String(this.oSession.finyear),
                AdditionalInfo2: '',
                AdditionalInfo3: String(this.selected_installment_header.Batch_code),
                AdditionalInfo4: String(this.selected_aadhaar),
                AdditionalInfo5: String(this.selected_installment_header.Term_code),
                AdditionalInfo6: String(this.selected_installment_header.Installment_ID),
                AdditionalInfo7: String(response.data.ReceiptID),
                TypeField3: 'NA',
            };
            this.commonService
                .Post_json(BillDeskcheckSum, jsonin)
                .subscribe((response) => {

                    if (response.exception != null) {
                        this.globalmessage.Show_message(response.exception);
                        return;
                    }

                    if (response.data == null) {
                        this.globalmessage.Show_message('xx Something went wrong' + response.data);
                        return;
                    }

                    //krunal
                    BilldeskPay(response.data,"","");
                });
        });
    }

    onsubmit_feespayment(feespaymentform: FormGroup) {
        if (!feespaymentform.valid) {
            return;
        }
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.ctr_paymentbatch_fld!.value,
            aadhaar: this.ctr_paymentaadhaar_fld!.value,
            termcode: this.selected_installment.termcode,
            installment: this.selected_installment.InstallmentID,
        };
        this.commonService.Post_json(InstallmentValidation, jsonin).subscribe((response) => {
            if (response.data == false) {
                this.globalmessage.Show_message(response.message);
                this.feespaymentform.reset();
            }
        });

    }

    onchange_paymentaadhaar() {
        if (this.ctr_paymentaadhaar_fld!.value <= 0) {
            this.globalmessage.Show_error('Enter aadhaar');
            return;
        }
        this.selected_aadhaar = this.ctr_paymentaadhaar_fld!.value;
        this.StudentApprovedCourses(this.selected_aadhaar);
    }

    StudentApprovedCourses(student_aadhaar: number) {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            Aadhaar: parseInt(String(student_aadhaar)),
        };

        this.commanservice.Post_json(StudentApprovedCourses, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.approvedcourse_json = response.data;

        });
    }

    onselect_paymentbatch(selectedIndex: any) {
        //debugger;
        if (selectedIndex <= 0) {
            return;
        }

        this.selected_approvedcourse = this.approvedcourse_json [selectedIndex - 1];
        if (this.selected_approvedcourse == null) {
            this.globalmessage.Show_message('Selected course is null');
            return;
        }
        this.ctr_paymentsubject_fld!.setValue(this.selected_approvedcourse.Subject_group_code);
        //this.Batch_subject_api(this.selected_approvedcourse.Batch_code);
        this.ShowInstallmentDetails(this.selected_aadhaar, this.selected_approvedcourse.Batch_code);

    }


    termName() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Aadhaar": this.ShowaadhaarForm.controls['ctr_aadhaar'].value,
            "Useraadhaar": this.oSession.aadhaar,
        };
        this.commanservice.Post_json(studentsfeesterm, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data found')
                return;
            }
            this.Fromterms = response;
            console.log('termresp', this.Fromterms[0].Term_Name)

            // this.StudentTermsForm.setValue
            // this.StudentTermsForm.setValue(this.Fromterms)
            this.transfertermName()
        });
    }

    transfertermName() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Aadhaar": this.ShowaadhaarForm.controls['ctr_aadhaar'].value,
            "Useraadhaar": this.oSession.aadhaar,
        };
        this.commanservice.Post_json(FeesTerm, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data found')
            }
            this.Toterms = response.data;
        });
    }

    Tabchange($type: string) {
        this.selectedtab = $type;

        if ($type == 'fees') {
            this.feespaymentform.reset();
        }
        if ($type == 'admission') {
            this.normaladmissionform.reset();
        }

    }

    onselect_installment(selectedIndex: any) {
        if (selectedIndex <= 0) {
            return;
        }
        this.selected_installment = this.Installments_json [selectedIndex - 1];
        this.selected_installment_header = this.selected_installment.Header;
        this.selected_installment_detail = this.selected_installment.Lineitem;

        this.Feesamount_header = this.selected_installment_header.Amount

    }

    onselect_feesmode(selectedIndex: any) {
        if (selectedIndex <= 0) {
            return;
        }
        this.selected_paymentmode = this.ctr_paymentmode_fld!.value;
    }

    name = 'Table Sum in Angular';

    marksEntryList: any = [
        {
            studentId: '101',
            studentName: "Monir Zaman",
            marksDistributionList: [
                {
                    courseId: '01',
                    courseTitle: "Math",
                    obtainedMarks: 0
                },
                {
                    courseId: '02',
                    courseTitle: "English",
                    obtainedMarks: 0
                },
                {
                    courseId: '03',
                    courseTitle: "Physics",
                    obtainedMarks: 0
                }
            ]

        },
        {
            studentId: '102',
            studentName: 'Michel Jordan',
            marksDistributionList: [
                {
                    courseId: '01',
                    courseTitle: "Math",
                    obtainedMarks: 0
                },
                {
                    courseId: '02',
                    courseTitle: "English",
                    obtainedMarks: 0
                },
                {
                    courseId: '03',
                    courseTitle: "Physics",
                    obtainedMarks: 0
                }
            ]

        }

    ]

    // @ts-ignore
    TotalAmount(amount: any[]) {

        // return amount.reduce((this.adjustmentTotal, {this.adjustmentAmount}) => this.adjustmentTotal += +(this.adjustmentAmount || 0), 0);
    }

    //NEP Subjects

  get frmsubject() {
    return this.NepAdditionalsubjectForm.controls;
  }

  onusermessage(level: any) {
    if (level == 1) {
      let x = `'It is a vertical that strengthens the vertical of Maj. in terms of providing allied dimension to the core subject.
        'All subjects are interrelated as all subjects have originated from a common domain of knowledge which has elements of curiosity,
         utility and necessity and of course, all subjects ponder around understanding the wonders of the nature.
         <p></p>
        <b>Expert Tips: Choose Min. subject as the one which  you think is the subject that best complements your Maj. in enhancing  your learning of Maj.<b>'
`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 2) {
      let x = `It is a vertical that strengthens the vertical of Maj. in terms of providing allied dimension to the core subject.
        'All subjects are interrelated as all subjects have originated from a common domain of knowledge which has elements of curiosity,
         utility and necessity and of course, all subjects ponder around understanding the wonders of the nature.
         <p></p>
        <b>Expert Tips: Choose Min. subject as the one which  you think is the subject that best complements your Maj. in enhancing  your learning of Maj.</b>`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 3) {
      let x = `This vertical is the highlight NEP2020 and you will be choosing it from the basket of OE at the beginning of the academic sessions.
It is the vertical that has to be from the faculty other than the Maj. and that is where it opens the doors for you becoming the knowledgeable and
updated person in the society. If you classify all your daily routine activities, then you will realise that every single day,
you deal with little bit of science (food, medicines, electricity, mobile), little bit of commerce (banking, shopping, trading, travelling )
and a little bit of arts (reading, writing, communication, music, movie, painting).
It is a vertical that gives you chance to step out of your core subject boundary in term of utility learning.
<p></p>
<b>Expert Tips: Choose OE/GE based on your attitude towards the life and aptitude towards the learning new things.</b>
`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 4) {
      let x = `This compulsory vertical includes Hands on Training corresponding mainly to the Maj. Subject.
Whenever applicable, it will also include skill based or advanced laboratory practicals of Maj. This vertical primarily focus on the application oriented learning.
 <p></p>
<b>Expert Tips: make sure you have chosen your Maj. carefully.</b>

`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 5) {
      let x = `This compulsory vertical includes Hands on Training corresponding mainly to the Maj. Subject.
Whenever applicable, it will also include skill based or advanced laboratory practicals of Maj. This vertical primarily focus on the application oriented learning.
 <p></p>
<b>Expert Tips: make sure you have chosen your Maj. carefully.</b>

`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 6) {
      let x = `This vertical aims at enhancing your linguistic and the communication skills.
It is a compulsory vertical because the effective communication is a key to success in life in every field.
 For the Arts and Science students, Communication skills and for Commerce students, Business Communication will be taught in this vertical.
  <p></p>
<b>Expert Tips:  Good communication is the bridge between confusion and clarity.</b>


`;
      this.globalmessage.Show_message_html(x);
    }
    if (level == 7) {
      let x = `This vertical will be offered only in the first year of under graduate program and
      shall primarily focus in sensitizing you to the importance of values in life which also includes nurturing the mother-earth which unconditionally
       nurtures all of us. Environmental studies shall be taught in this vertical.
        <p></p>
<b>Expert Tips: Covid19 pandemic taught us the importance of clean green environment,
 conservation and protection of natural resources and importance of oxygen. We must love our environment.</b>
`;
      this.globalmessage.Show_message_html(x);
    }

    if (level == 8) {
      let x = `This vertical connects you back to your roots.
It aims at educating the youth today to the rich heritage of our country and traditional knowledge in the field of Arts and literature,
 Agriculture, Basic sciences, Engineering and Technology Architecture, Management, Economics etc.
 If it is well preserved and widely disseminated, this knowledge can help in further research and societal applications.
 <p></p>
<b>Expert Tips: A unique opportunity to get enlightened and enjoy and appreciate the perfect amalgamation of contemporary learning and traditional legacy. <b>
`;
      this.globalmessage.Show_message_html(x);
    }

    if (level == 9) {
      let x = `This vertical includes courses such as Health and Wellness, Yoga education, Sports and fitness, Cultural activities, NSS/NCC and Fine / Applied/ Visual/Performing Arts.
At a later stage, this vertical shall also encompass Field Projects/ Internship/Apprenticeship/ Community
 Engagement and service corresponding to the Maj.( Core) subject.
  <p></p>
<b>Expert Tips: An opportunity to look into your own self and search for your hidden talents, capabilities, commitment and multitasking ability.<b>
`;
      this.globalmessage.Show_message_html(x);
    }
  }


  Resetcontrols(level: any) {

    if (level == 0) {
      this.majorsubjects = [];
      this.minorsubjects = [];
      this.oesubjects = [];
      this.vscsubjects = [];
      this.secsubjects = [];
      this.aecsubjects = [];
      this.vecsubjects = [];
      this.ikssubjects = [];
      this.ccsubjects = [];
      this.fpsubjects = [];

      this.selected_major = <Subjects_group_h>{};
      console.log('sss', this.selected_major)
      // let jsonin: Ireq_checksubjectgroupquota = {
      this.selected_minor = <Ires_nepminorsubjects>{};
      this.selected_oe = <Ires_nepminorsubjects>{};
      this.selected_vsc = <Ires_nepminorsubjects>{};
      this.selected_sec = <Ires_nepminorsubjects>{};
      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
      //it must be [] rather than [' ']
      this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
    }

    if (level == 1) {
      this.selected_minor = <Ires_nepminorsubjects>{};
      this.selected_oe = <Ires_nepminorsubjects>{};
      this.selected_vsc = <Ires_nepminorsubjects>{};
      this.selected_sec = <Ires_nepminorsubjects>{};
      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }
    if (level == 2) {
      this.selected_oe = <Ires_nepminorsubjects>{};
      this.selected_vsc = <Ires_nepminorsubjects>{};
      this.selected_sec = <Ires_nepminorsubjects>{};
      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset('');

      this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

    if (level == 3) {
      this.selected_vsc = <Ires_nepminorsubjects>{};
      this.selected_sec = <Ires_nepminorsubjects>{};
      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

    if (level == 4) {
      this.selected_sec = <Ires_nepminorsubjects>{};
      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

    if (level == 5) {

      this.selected_aec = <Ires_nepminorsubjects>{};
      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

    if (level == 6) {

      this.selected_vec = <Ires_nepminorsubjects>{};
      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

    if (level == 7) {

      this.selected_iks = <Ires_nepminorsubjects>{};
      this.selected_cc = <Ires_nepminorsubjects>{};
      this.selected_fp = <Ires_nepminorsubjects>{};

      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();

      this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
      this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');

    }

  }

  minor_subject(level: number) {
    this.Resetcontrols(level + 1);


    let jsonin = {}

    if(this.pageType == 'A'){
      if (this.resp_singlebatch?.Batch_level == 1 &&
        this.resp_singlebatch?.Admissionboard == 'UG') {
        jsonin = {
          collegecode: this.oSession.collegecode,
          finyear: myGlobals.Global_CurrentFinYear,
          batch_code: this.BatchObject.Batch_code,
          aadhaar: this.oSession.aadhaar,
          subject_group_code: this.selected_major.Subject_group_code,
          levelno: level,
          webportal: myGlobals.Global_Webportname,
          Otherlevelcode: 0
        };
      }
    }


    if (this.oSession.studenttype == 'OUTSIDE'
    ) {
      jsonin = {
        collegecode: this.oSession.collegecode,
        finyear: myGlobals.Global_CurrentFinYear,
        batch_code: this.BatchObject.Batch_code,
        aadhaar: this.oSession.aadhaar,
        subject_group_code: this.selected_major.Subject_group_code,
        levelno: level,
        webportal: myGlobals.Global_Webportname,
        Otherlevelcode: 0
      };
    }

    //SYJC to FYbcom
    if (this.resp_singlebatch?.Batch_level == 2 &&
      this.resp_singlebatch?.Admissionboard == 'JR') {
      jsonin = {
        collegecode: this.oSession.collegecode,
        finyear: myGlobals.Global_CurrentFinYear,
        batch_code: this.BatchObject.Batch_code,
        aadhaar: this.oSession.aadhaar,
        subject_group_code: this.selected_major.Subject_group_code,
        levelno: level,
        webportal: myGlobals.Global_Webportname,
        Otherlevelcode: 0
      };
    }


    //Fy to SY (UG)
    // if (this.resp_singlebatch?.Batch_level == 2 &&
    //   this.resp_singlebatch?.Admissionboard == 'UG') {
      jsonin = {
        collegecode: this.oSession.collegecode,
        finyear: myGlobals.Global_CurrentFinYear,
        batch_code: this.BatchObject.Batch_code,
        aadhaar: this.NepAdditionalsubjectForm.controls['ctr_nepaadhaar'].value,
          subject_group_code: this.selected_major.Subject_group_code,
        levelno: level,
        webportal: myGlobals.Global_Webportname,
         Otherlevelcode: 0
      };
    // }

    console.log('jkk',jsonin)


    // let jsonin_input = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    //console.log('level json  : ' + jsonin);
    this.commonService
      .Post_json(Nepsubjects_url, jsonin)
      .subscribe((response) => {
        if (response != null) {

          //console.log('DEmo testing  : ', response);

          if (level == 2) {
            this.minorsubjects = response.data;
            return;
          }
          if (level == 3) {
            this.oesubjects = response.data;
            return;
          }
          if (level == 4) {
            this.vscsubjects = response.data;
            //console.log(this.vscsubjects);
            return;
          }
          if (level == 5) {
            this.secsubjects = response.data;
            //console.log(this.secsubjects);
            return;
          }
          if (level == 6) {
            this.aecsubjects = response.data;
            return;
          }
          if (level == 7) {
            this.vecsubjects = response.data;
            return;
          }
          if (level == 8) {
            this.ikssubjects = response.data;
            return;
          }
          if (level == 9) {
            this.ccsubjects = response.data;
            return;
          }
          if (level == 10) {
            this.fpsubjects = response.data;
            return;
          }
        }
      });

  }

  modal_Nepsubjects(level: number) {

    if (level <= 2) {
      return
    }

    let nOtherlevelcode = 0

    this.Resetcontrols(level + 1);

    let jsonin = {}


    if (this.oSession.finyear == myGlobals.Global_CurrentFinYear) {
      jsonin = {
        collegecode: this.oSession.collegecode,
        finyear: myGlobals.Global_CurrentFinYear,
        batch_code: this.BatchObject.Batch_code,
        aadhaar: this.NepAdditionalsubjectForm.controls['ctr_nepaadhaar'].value,
        subject_group_code: this.selected_major.Subject_group_code,
        levelno: level,
        webportal: myGlobals.Global_Webportname,
        Otherlevelcode: 0
      };
    } else {
      jsonin = {
        collegecode: this.oSession.collegecode,
        finyear: myGlobals.Global_CurrentFinYear,
        batch_code: this.BatchObject.Batch_code,
        aadhaar:this.NepAdditionalsubjectForm.controls['ctr_nepaadhaar'].value,
         subject_group_code: this.selected_major.Subject_group_code,
        levelno: level,
        webportal: myGlobals.Global_Webportname,
        Otherlevelcode: 0
      };
    }

    console.log('lllll',jsonin)


    // let jsonin_input = {
    //   Input: encryptUsingAES256(jsonin),
    // };


    //console.log('level json  : ' + jsonin);
    this.commonService
      .Post_json(Nepsubjects_url, jsonin)
      .subscribe((response) => {
        if (response != null) {

          //console.log('DEmo testing  : ', response);

          if (level == 2) {
            this.minorsubjects = response.data;
            return;
          }
          if (level == 3) {
            this.oesubjects = response.data;
            return;
          }
          if (level == 4) {
            this.vscsubjects = response.data;
            //console.log(this.vscsubjects);
            return;
          }
          if (level == 5) {
            this.secsubjects = response.data;
            //console.log(this.secsubjects);
            return;
          }
          if (level == 6) {
            this.aecsubjects = response.data;
            return;
          }
          if (level == 7) {
            this.vecsubjects = response.data;
            return;
          }
          if (level == 8) {
            this.ikssubjects = response.data;
            return;
          }
          if (level == 9) {
            this.ccsubjects = response.data;
            return;
          }
          if (level == 10) {
            this.fpsubjects = response.data;
            return;
          }
        }
      });
  }


  single_subject() {

    let jsonin = {}

    //Changes made by Shivam

    if(this.pageType == 'A'){
      jsonin = {
        Batch_code: this.BatchObject.Batch_code,
        Subject_group_code: this.selected_major.Subject_group_code,
        Subject_group_id: this.selected_major.Subject_group_id,
      };
    }else{
      jsonin = {
        Batch_code: this.BatchObject.Batch_code,
        // Subject_group_code: this.oSession.maxsubjectgroupcode,
        // Subject_group_id: this.oSession.maxsubjectgroupid,
      };
    }

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };

    //console.log('level json  : ' + jsonin);
    this.commonService
      .Post_json(single_subject, jsonin_input)
      .subscribe((response) => {

        this.majorsubjects.push(response.data)

      });

  }

  onLevelSelect(level: number) {
    if (level <= 0) {
      return;
    }

    if (level == 2) {
      // this.Check_nepquota(level);
    }
    this.modal_Nepsubjects(level);
  }

  StudentAppliedCourses() {
    let jsonin = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: 1,
      Aadhaar: this.oSession.aadhaar,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService
      .Post_json(StudentAppliedCourses, jsonin_input)
      .subscribe((response) => {
        this.AppliedCourses = response.data;
        // console.log(this.AppliedCourses)
        // console.log(this.modalBatch.Batch_Code)
      });
  }

  PortalOpen() {
    // this.portal = "";
    // this.BatchCode = event.Batch_Code;
    // this.formAmount = event.FormAmount;

    let sPortalopenUrl = myGlobals.Domainname

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchObject.Batch_code,
      Webportal: sPortalopenUrl
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };

    //console.log('batch code', jsonin);
    this.commonService
      .Post_json(PortalOpenv1, jsonin_input)
      .subscribe((response) => {

        this.Resetcontrols(0);
        this.portal = response.data;
        if (this.portal.Admissionstarted == true) {


          if (this.pageType == 'A') {
            if (this.oSession.maxbatchlevel == 1 &&
              this.oSession.maxadmissionboard == 'UG') {
              this.modalSelectBatchSubjects();
            }

            if (this.oSession.maxbatchlevel == 2 &&
              this.oSession.maxadmissionboard == 'JR') {
              this.modalSelectBatchSubjects();
            }

            //Changes made by Shivam

            if(this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear){
              this.modalSelectBatchSubjects();
            }

          }

          if (this.pageType == 'R') {
            if (this.oSession.maxbatchlevel == 1 &&
              this.oSession.maxadmissionboard == 'UG') {

              this.single_subject()
            } else {
              this.modalSelectBatchSubjects();
            }
          }

        } else {
          // this.portal = '';
          this.SubjectGroups = '';
          this.globalmessage.Show_message('Admission Closed for this Particular Batch!');
          this.additionalSubjectsForm.controls['batch'].setValue('');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
        }
      });
  }


  modalSelectBatchSubjects() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.BatchObject.Batch_code,
      Aadhaar: this.oSession.aadhaar,
    };
    console.log('mkmkmkmkm',jsonin)

    // let jsonin_input = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService
      .Post_json(Additionalsubjectformfees_URL, jsonin)
      .subscribe((response) => {

        //console.log('XXX',response.data.Receipt_ID);
        if (response.data.Receipt_ID <= 0) {

          this.commonService
            .Post_json(StudentSubjectGroup, jsonin)
            .subscribe((response) => {
              this.majorsubjects = response.data;


              if (this.oSession.maxadmissionboard == 'UG' &&
                this.oSession.maxbatchlevel == 2) {


                // this.selected_major.setValue(this.oSession.maxsubjectgroupcode)
              }
              // this.majorsubjects.push(this.oSession.maxsubjectgroupcode)
              // this.portal = '';
              this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
            });
        } else {
          // this.portal = '';
          this.SubjectGroups = '';
          this.NepAdditionalsubjectForm.controls['batch'].setValue('');
          this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');

          Swal.fire({
            title: 'Error!',
            text:
              'Form fees Already Paid for this Batch!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          this.onLevelSelect(0);
          //this.Resetcontrols(0);
        }
      });
  }

  onMajorSelected(event: any) {

    console.log('subbb', this.selected_major)
    let MINORLEVEL: number = 2;
    this.major_subjectgroup = event.Subject_group_name;
    this.SubjectGroupID = event.Subject_group_id;
    this.SubjectGroupCode = event.Subject_group_code;


    // this.Check_nepquota(MINORLEVEL);

    //ShivamPrakashcommented
    // this.modal_Nepsubjects(MINORLEVEL);

    //console.log(this.major_subjectgroup);
    //this.CheckSubjectGroupQuota();
  }

  NEPSelectBatch() {

    let sOutsideUrl = myGlobals.Domainname

    let jsonin = {
      Boardlevel: 'UG',
      Firstyear: 1,
      Webportal: sOutsideUrl
    };

    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService.Post_json_withouttoken(registertionbatchs, input_json).subscribe((response) => {
      this.modalBatch = response.data;
      //console.log('resss',response)
    });

  }

  asPayment() {
    this.modalSubmit = true;

    let jsonin = {}

    if (this.oSession.studenttype == 'OUTSIDE') {
      jsonin = {
        finyear: this.oSession.finyear,
        college_code: this.oSession.collegecode,
        aadhaar: this.oSession.aadhaar,
        batch_code: this.BatchObject.Batch_code,
        subject_group_id: this.selected_major.Subject_group_id,
        subject_group_code: this.selected_major.Subject_group_code,
        term_code: myGlobals.Global_FORMFEESTERMNAME,
        minor: this.selected_minor.Otherlevelcode,
        oe: this.selected_oe.Otherlevelcode,
        vsc: this.selected_vsc.Otherlevelcode,
        sec: this.selected_sec.Otherlevelcode,
        aec: this.selected_aec.Otherlevelcode,
        vec: this.selected_vec.Otherlevelcode,
        iks: this.selected_iks.Otherlevelcode,
        cc: this.selected_cc.Otherlevelcode,
        fp: this.selected_fp.Otherlevelcode,
        applicationmode: 'ADDITIONALPAPPER'
      };
    }


    if (this.oSession.maxadmissionboard == 'JR' && this.oSession.maxbatchlevel == 2) {
      jsonin = {
        finyear: this.oSession.finyear,
        college_code: this.oSession.collegecode,
        aadhaar: this.oSession.aadhaar,
        batch_code: this.BatchObject.Batch_code,
        subject_group_id: this.selected_major.Subject_group_id,
        subject_group_code: this.selected_major.Subject_group_code,
        term_code: myGlobals.Global_FORMFEESTERMNAME,
        minor: this.selected_minor.Otherlevelcode,
        oe: this.selected_oe.Otherlevelcode,
        vsc: this.selected_vsc.Otherlevelcode,
        sec: this.selected_sec.Otherlevelcode,
        aec: this.selected_aec.Otherlevelcode,
        vec: this.selected_vec.Otherlevelcode,
        iks: this.selected_iks.Otherlevelcode,
        cc: this.selected_cc.Otherlevelcode,
        fp: this.selected_fp.Otherlevelcode,
        applicationmode: 'ADDITIONALPAPPER'
      };
    }

    //FY to SY
    if (this.oSession.maxadmissionboard == 'UG' && this.oSession.maxbatchlevel == 1) {
      jsonin = {
        finyear: this.oSession.finyear,
        college_code: this.oSession.collegecode,
        aadhaar: this.oSession.aadhaar,
        batch_code: this.BatchObject.Batch_code,
        // subject_group_id: this.oSession.maxsubjectgroupid,
        // subject_group_code: this.oSession.maxsubjectgroupcode,
        term_code: myGlobals.Global_FORMFEESTERMNAME,
        minor: this.selected_minor.Otherlevelcode,
        oe: this.selected_oe.Otherlevelcode,
        vsc: this.selected_vsc.Otherlevelcode,
        sec: this.selected_sec.Otherlevelcode,
        aec: this.selected_aec.Otherlevelcode,
        vec: this.selected_vec.Otherlevelcode,
        iks: this.selected_iks.Otherlevelcode,
        cc: this.selected_cc.Otherlevelcode,
        fp: this.selected_fp.Otherlevelcode,
        applicationmode: 'ADDITIONALPAPPER'
      };
    }


    jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.NepAdditionalsubjectForm.controls['ctr_nepaadhaar'].value,
      batch_code: this.BatchObject.Batch_code,
      subject_group_id: this.selected_major.Subject_group_id,
      subject_group_code: this.selected_major.Subject_group_code,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
      minor: this.selected_minor.Otherlevelcode,
      oe: this.selected_oe.Otherlevelcode,
      vsc: this.selected_vsc.Otherlevelcode,
      sec: this.selected_sec.Otherlevelcode,
      aec: this.selected_aec.Otherlevelcode,
      vec: this.selected_vec.Otherlevelcode,
      iks: this.selected_iks.Otherlevelcode,
      cc: this.selected_cc.Otherlevelcode,
      fp: this.selected_fp.Otherlevelcode,
      applicationmode: 'ADDITIONALPAPPER'
    };

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService.Post_json(IU_nepAdmission, jsonin).subscribe((response) => {
      // console.log(response)
      this.ReceiptID = response.data.ReceiptID;
      this.ReceiptNo = response.data.ReceiptNo;
      if (this.ReceiptID > 0) {
         this.RegistrationPayment_nep();
      }
      // console.log(this.invoice)
    });
  }

   RegistrationPayment_nep() {
    let nTranscationamount = '';

    if (this.oSession.demo == 'true') {
      nTranscationamount = '1';
      this.formAmount = '1';
    } else {
      nTranscationamount = String(this.BatchObject.Formamount);
    }

    this.billdeskmsg = {
      collegecode: myGlobals.Golbal_CollegeCode,
      finyear: this.oSession.finyear,
      batchcode: this.BatchObject.Batch_code,
      aadhaar: this.oSession.aadhaar,
      termcode: 9999,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: String(this.BatchObject.Formamount),
      // TxnAmount: nTranscationamount,
      // "TxnAmount": "1",
      BankID: 'NA',
      Filler2: 'NA',
      Filler3: 'NA',
      CurrencyType: 'INR',
      ItemCode: 'NA',
      TypeField1: 'R',
      SecurityID: '',
      Filler4: 'NA',
      Filler5: 'NA',
      TypeField2: 'F',
      AdditionalInfo1: String(this.oSession.finyear),
      AdditionalInfo2: '',
      AdditionalInfo3: String(this.BatchObject.Batch_code),
      AdditionalInfo4: String(this.oSession.aadhaar),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };

    this.commonService
      .Post_json(BillDeskcheckSum, this.billdeskmsg)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        // console.log(this.billdeskRequestMsg)
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, "", "");
        }
        // this.StudentAppliedCourses();
      });
  }

  single_batch() {

    let jsonin = {
      Batchcode: this.oSession.maxbatchcode,
    };


    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService
      .Post_json(batch, input_json)
      .subscribe((response) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.resp_singlebatch = response.data;
        } else {
          this.resp_singlebatch = response;
        }

        // Admission for 2024 junior to senior ( ug batch )
        if (this.resp_singlebatch.Batch_level == 2 &&
          this.resp_singlebatch.Admissionboard == 'JR') {

           // newShiv
          // if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
          //   // this.modalSelectBatch();
          //   this.NEPSelectBatch();
          // }

        } else {

          //Admission for 2024 ug student
          if (this.resp_singlebatch.Batch_level >= 1 &&
            this.resp_singlebatch.Admissionboard == 'UG') {

            //newShiv
            // if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
            //
            //
            //   //FYBCom to SYBCom
            //   this.Incremental_batch(this.resp_singlebatch.Next_batch)
            //
            //   console.log(this.resp_singlebatch.Batch_code)
            //   console.log('NEXT BATCH', this.resp_singlebatch.Next_batch)
            // }
          }

          if (this.resp_singlebatch.Batch_level == 1 &&
            this.resp_singlebatch.Admissionboard == 'UG') {

            if (this.oSession.formfeesrecieved == 'PAID') {
              // this.modalSelectBatch();
              this.NEPSelectBatch();
            }

          }

          // if (this.pageType == 'A') {
          //   this.globalmessage.Show_error('You are not eligible for additional courses.')
          //   this.router.navigate(['/dashboard'])
          // }

          // this.Incremental_Batchapi()
        }

      });
  }



  Incremental_batch(nIncbatch: number) {
    let jsonin = {
      Batchcode: nIncbatch,
    };

    console.log('bbbb', jsonin)

    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService
      .Post_json(batch, input_json)
      .subscribe((response) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.resp_singlebatch = response.data;
        } else {
          this.resp_singlebatch = response;
        }

        this.modalBatch.push(response.data)

        console.log('batchres', this.modalBatch)

      });
  }




    protected readonly parseInt = parseInt;
    protected readonly AudioDestinationNode = AudioDestinationNode;
}
