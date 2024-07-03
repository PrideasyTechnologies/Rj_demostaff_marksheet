import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AtktStudentsService} from './Atkt-students.service';
import {ColDef, GridOptions, RowSelectedEvent, SelectionChangedEvent,} from 'ag-grid-community';
import {CellCustomComponent} from '../cell-custom/cell-custom.component';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';
import {DeleteCellCustomComponent} from '../delete-cellcustom/delete-cellcustom.component';
import {UDownloadfiles} from '../../globals/global_downloadfiles';
import {GlobalMessage} from '../../globals/global.message';
import {
    Atkt_failsubjects,
    Istudentdetails,
    Req_atkt_type,
    req_inhouseform,
    req_studentatktform,
} from './Atkt-students.interface';
import {Delete_subjectatktoutside} from "./delete_subjectatktoutside";
import {Delete_Selectedsubject} from "./delete_subjectinhouse";
import {CommonService} from "../../globals/common.service";
import {
    atkt_formamount,
    ATKT_inhouse_aadhhardeletesubject,
    ATKT_inhouse_aadhharsubject,
    Atkt_studentbatch,
    atktstudentlist,
    atktstudentspaper_semesterwise,
    batchsemestersubject_outside,
    batchsemstersubjects,
    batchuserexam,
    batchwise_semester,
    Billdeskchecksum_atkt,
    deleteatktstudent,
    downloadatktmarks,
    exams,
    Finyear,
    get_atktfeesreceipt_details,
    get_atktmarksimage,
    get_atktprefix,
    Get_failaadhaar,
    Get_failsubjectes,
    get_offlineatktsubjects,
    getboardlevel_students,
    getReciept,
    IU_ATKTForm,
    IU_ATKTForm_inhouse,
    report_atktbatchsemesterstudents,
    update_atktsubject,
    uploadatktstudent
} from "../../globals/global-api";
import {
    AtktSubject,
    BatchwiseSubjects,
    CSemester,
    CSemester_outside,
    Formamount,
    IEditBatchwiseSubjects,
    IgetAllBatchs,
    IgetBatch,
    Igridsubject_detail,
    ImarksheetImage,
    IOutsideIU,
    Iprefix_month,
    IStudentdetres,
    IunhouseIU
} from "../../models/response";
import {BilldeskPay} from "../../../assets/javascript/billdesk";
import {billdeskjs} from "../../globals/global.constant";
import {aReq_IAtktsubects, Req_IAtktsubects, Req_IAtktsubects_inhouse, Sessiondata} from "../../models/request";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {IReq_Reciept} from "./Atkt-students.model";
import {NgxPrintElementService} from "ngx-print-element";
import {SessionService} from "../../globals/sessionstorage";
import {encryptUsingAES256} from "../../globals/encryptdata";

type MyArrayType = Array<{ id: number, name: string }>;

@Component({
    selector: 'app-Atkt-students',
    templateUrl: './Atkt-students.component.html',
    styleUrls: ['./Atkt-students.component.scss'],
    providers: [AtktStudentsService],
})
export class AtktStudentsComponent implements OnInit {
    @ViewChild('outside_batch') outside_batch: any;
    @ViewChild('outside_subject') outside_subject: any;
    @ViewChild('inhouse_aadhaar') inhouse_aadhaar: any;
    @ViewChild('edit_batch') edit_batch: any;
    @ViewChild('tableRef') tableElement: any;

    activePane = 0;
    FeeReceipt = false;


    public submitted: boolean = false;
    private gridApi: any;
    billdesk_AtktForm!: FormGroup;
    private gridApi_outatkt: any;

    private gridApi_show_outatkt: any;
    public outatkt_gridOptions: any;
    public outatkt_show_gridOptions: any;

    public outatktdetails_gridOptions: any;


    nRowSelectindex = -99;
    public paginationPageSize = 10;
    public gridOptions: any;
    image_viewmarksheet!: ImarksheetImage[];

    public rowdata: any;


    Demoversion: any;
    Demoversion_outside: any;
    finalloader = false;
    batchtype_inhouse: any;
    edit_batchtype_outside: any;


    selected_month_detail!: Iprefix_month;
    private selected_gender!: string;
    private selected_batchtype!: string;

    selected_subject_batcheditwisedetails!: IEditBatchwiseSubjects;

    MyMarksheetImage!: SafeResourceUrl[];

    public multiple_selection: 'single' | 'multiple' = 'multiple';
    public single_rowSelection: 'single' | 'multiple' = 'multiple';


    public single_show_rowSelection: 'single' | 'multiple' = 'single';

    private json_studentsubject_row: any;
    private json_studentsubject_inhouse_row: any;
    searchValue: any;
    error: any;
    savealert: boolean = false;
    res: any;
    selected_batchcode!: IgetAllBatchs;
    selected_batchcode_download: any;
    selected_edit_batchcode: any;
    LastSubjectgroupcode: any;
    LastUserExam: any;

    sumamount = 0;
    sumoutsideamount = 0;
    aSemester: CSemester[] = [];
    aSemester_outside: CSemester_outside[] = [];
    AselectedRows!: Req_IAtktsubects_inhouse[];
    AselectedRows_outside!: Req_IAtktsubects[];
    Aformamount_atkt_json!: Formamount[];
    atkt_subject_papers!: AtktSubject[];
    iReq_Reciept!: IReq_Reciept[];
    additionalAtkt_subject_papers!: AtktSubject[];
    atkt_editstudent_papers: any;
    json_semester_batchwise = [];
    ASubjectsdetails: aReq_IAtktsubects = [];


    json_semester_edit_batchwise = [];
    Aadhaarkeyword = 'Aadhaar';
    Batchkeyword = 'Batch_name';
    Subjectkeyword = 'Subject_name';
    Subjectbatchwisekeyword = 'Displayname';
    Subjectbatchwiseeditkeyword = 'Displayname';
    out_edit_rowselected: any;
    out_editsubject_rowselected: any;

    Downloadloader = false;
    json_userexam: any;
    Prn: any;
    Seatno: any;
    addstudent_subjects: any;
    subject_Transactionid: any;

    Downloadtabloader = false;
    Downloadtabsummaryloader = false;
    Copymarkloader = false;
    SelectedlastyearSubject: any;
    loader: any;
    uploadclicked = false;

    formData = new FormData();
    xlsxFile!: Array<File>;
    delete: any;
    Batch_Code: any;
    json_subjectorder_batchwise!: BatchwiseSubjects[];
    json_subjectorder_edit_batchwise!: IEditBatchwiseSubjects[];
    selected_subject_batchwisedetails: any;

    AtktStudentsForm!: FormGroup;
    DownloadtabForm!: FormGroup;
    DownloadUploadForm!: FormGroup;
    outAtktForm!: FormGroup;
    in_AtktForm!: FormGroup;
    in_Reciept!: FormGroup;
    outAtktForm_subject!: FormGroup;
    outAtktForm_edit_subject!: FormGroup;
    outAtktForm_subjectedit_subject!: FormGroup;

    public json_batchtype!: [{ Batchtype: 'PG' }, { Batchtype: 'UG' }];
    json_finyear: any;
    json_aadhaar: any;
    json_batchs!: IgetBatch[];
    json_edit_batchs!: IgetAllBatchs[];
    SelectedSubject: any;
    SelectedBatch: any;
    selected_userexam: any;
    selected_userexam_download: any;
    StudentAadhaar: any;
    firstname: any;
    lastname: any;
    mothername: any;
    fathername: any;
    gender: any;
    student_id: any;
    updatedata: any;

    viewsubject: any;
    json_subjectorder: any = [];
    FinYear: any;
    SelectedFinyear: any;
    SelectedLastyearUserExam: any;
    SelectedSemExam: any;
    exam: any;
    Exam: any;
    LastExam: any;
    SelectedLastSemExam: any;
    out_rowselected_outside: any;
    updatedatktsubjects: any;
    json_subjectorder_download: any;

    public inatkt_gridOptions_selected: any;

    public gridOptions_details: any;
    public gridOptions_editstudentdetails: any;
    public gridOptions_editsubjectdetails: any;
    public inatkt_gridOptions: any;
    public json_inatkt!: Atkt_failsubjects[];
    public json_inatkt_selected !: Atkt_failsubjects[];
    private inatkt_gridApi: any;
    private inatkt_gridColumnApi: any;

    private gridApi_inatkt_subjectdetails: any;
    private gridApi_inatkt_Reciept: any;
    private gridApi_outedit_studentdetails: any;
    private gridApi_outedit_subjectdetails: any;
    private gridColumnApi_inatkt_subjectdetails: any;
    private gridColumnApi_inatkt_Reciept: any;
    private gridColumnApi_outedit_studentdetails: any;
    private gridColumnApi_outedit_subjectdetails: any;

    selected_payment_type: any;
    selected_batch_type: any;
    selected_payment_type_outside: any;
    showatktstudent_outside!: IStudentdetres;

    showatktstudentsubjectsres_outside!: Igridsubject_detail;


    show_prefix_detail!: any;

    out_edit_rowselected_editdetail_image: any;

    selected_edit_batch_type: any;
    selected_batchsemester!: any
    selected_semester!: any;

    public mobile_no!: number;
    public out_aadhaar!: number;


    receiptId!: string;
    studentId!: string;

    oSession!: Sessiondata;

    atkt_student_batch!: Istudentdetails[];
    selected_batchstudent!: Istudentdetails;

    IUoutsideres!: IOutsideIU;
    IUinhousedata!: IunhouseIU;

    Files!: Array<File>;
    //Grid column
    public columnDefs = [
        {headerName: 'PRN No', field: 'Prnno', resizable: true},
        {headerName: 'Seat No', field: 'Rollno', resizable: true},
        {headerName: 'Aadhaar', field: 'Aadhaar', resizable: true},
        {
            headerName: 'First Name',
            field: 'Firstname',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Last Name',
            field: 'Lastname',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Fathername',
            field: 'Fathername',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Mothername',
            field: 'Mothername',
            resizable: true,
            editable: true,
        },
        {headerName: 'Gender', field: 'Gender', resizable: true, editable: true},
        {
            field: '',
            maxWidth: 50,
            checkboxSelection: true,
        },
        {
            headerName: 'Update',
            field: 'Action',
            cellRenderer: CellCustomComponent,
        },
        {
            headerName: 'Delete',
            field: 'Action',
            cellRenderer: DeleteCellCustomComponent,
        },
    ];

    public outatkt_columnDefs = [

        {headerName: 'Batch name', field: 'Batch_name', resizable: true},
        {headerName: 'Semester', field: 'Semester', resizable: true},
        {headerName: 'Pappercode', field: 'Papercode', resizable: true},
        {headerName: 'Subject name', field: 'Subject_name', resizable: true},
        {headerName: 'Subject order', field: 'Subject_order', resizable: true},
        {headerName: 'Marksheet no.', field: 'Marksheetno', resizable: true},
        {headerName: 'Prn no.', field: 'Prnno', resizable: true},

        {
            headerName: 'Delete',
            field: 'Action',
            cellRenderer: Delete_subjectatktoutside,
        },
    ];


    public atktinhouse_defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
    };
    public inhouse_rowSelection: 'single' | 'multiple' = 'multiple';
    public atkt_inhouse = [
        {headerName: 'Finyear', field: 'Finyear', resizable: true},
        {headerName: 'Batchexam_id', field: 'Batchexam_id', resizable: true},
        {
            headerName: 'Semester',
            field: 'Semester',
            resizable: true,
            filter: 'agSetColumnFilter',
        },
        {
            headerName: 'Subject_name',
            field: 'Subject_name',
            resizable: true,
            checkboxSelection: true,
            width: 400,
            headerCheckboxSelection: true,
        },
        {headerName: 'Subject_order', field: 'Subject_order', resizable: true},
        {
            headerName: 'Userexamname',
            field: 'Userexamname',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Fullname',
            field: 'Fullname',
            width: 300,
            resizable: true,
            editable: true,
        },
    ];

    public atkt_inhouse_selected = [
        {headerName: 'Finyear', field: 'Finyear', resizable: true},
        {headerName: 'Batchexam_id', field: 'Batchexam_id', resizable: true},
        {
            headerName: 'Semester',
            field: 'Semester',
            resizable: true,
            filter: 'agSetColumnFilter',
        },
        {
            headerName: 'Subject_name',
            field: 'Subject_name',
            resizable: true,
            width: 400,
            checkboxSelection: true,
        },
        {headerName: 'Subject_order', field: 'Subject_order', resizable: true},
        {
            headerName: 'Userexamname',
            field: 'Userexamname',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Fullname',
            field: 'Fullname',
            width: 300,
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Delete',
            field: 'Action',
            cellRendererFramework: Delete_Selectedsubject,
        },
    ];

    public rowss: any = [];
    private json_failsubjects: any;
    private selected_aadhaar_inhouse: any;
    private selected_markscale: number = 0;
    private selected_editmarkscale: number = 0;
    private select_lastexam: number = 0;
    public json_outside!: Igridsubject_detail[];
    private selected_subjectorder: number = 0;
    private selected_subject_batchwiseorder: number = 0;
    selected_semesterexam: any;
    selected_edit_semesterexam: any;

    constructor(
        private router: Router,private sessionservice : SessionService,
        private renderer: Renderer2, private sanitizer: DomSanitizer,
        private Atktstudentsservice: AtktStudentsService,
        private formBuilder: FormBuilder,
        private globalmessage: GlobalMessage,
        private commonService: CommonService,
        public print: NgxPrintElementService,
        private route: ActivatedRoute) {

        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };


        this.inatkt_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.outatkt_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.inatkt_gridOptions_selected = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.gridOptions_details = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.outatkt_show_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.gridOptions_editstudentdetails = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.gridOptions_editsubjectdetails = <GridOptions>{
            context: {
                componentParent: this,
            },
        };


        this.Createform();
    }

    // Loginfinyear = parseInt(sessionStorage.getItem('Finyear')!);
    // Logincollege = parseInt(sessionStorage.getItem('College')!);
    // Loginaadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);

    onPrint1(el: any) {
        this.print.print(el).subscribe(console.log);
    }

    ngOnInit(): void {

        // let x =  window.location.host +this.router.url ;

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();


        this.route.queryParamMap.subscribe(params => {

            const nReceiptid = parseInt(params.get("receiptid")?.toString()!);
            const nAadhaar = parseInt(params.get("student")?.toString()!);
            const sBilldeskstatus = params.get("billdeskstatus");


            if (sBilldeskstatus == "SUCCESS") {
                this.globalmessage.Show_message('Data uploaded successfully')

                // this.get_atktfeesreceipt_details(nReceiptid,nAadhaar);
                return;
            }

            if (sBilldeskstatus == "BILLDESKERROR") {
                this.globalmessage.Show_error('Transaction failed please wait for 24hrs')
                return;
            }

            if (sBilldeskstatus == "CANCELLED") {
                this.globalmessage.Show_error('Failed to upload subjects.' +
                    'Please try again later')

                // api call
            }

            /*
            this.route.queryParams.subscribe(params => {

                let param1 = params[0]?.order;

            });
            */
        });


        // this.route.queryParams.subscribe
        // (params => { const successParam = params['SUCCESS'];
        //     // Split the string using '?' as the separator
        //     const splitParams = successParam.split('?');
        //
        //     // Extract the values based on the structure
        //     this.receiptId = this.extractValue(splitParams, 'receiptid');
        //     this.studentId = this.extractValue(splitParams, 'student');
        // });


        this.loadbilldesk();
        this.GetBatchApi();
        this.selectFinyearApi();
        this.Get_apiformamount();

        this.GetBatchedit_Api();
    }

    Createform() {
        this.AtktStudentsForm = this.formBuilder.group({

            userexam: ['', Validators.required],
        });

        this.DownloadtabForm = this.formBuilder.group({
            subject: ['', Validators.required],
            userexamdownload: ['', Validators.required],
            lastyearuserexam: ['', Validators.required],
            lastyearsubject: ['', Validators.required],
            Currentfinyear: ['', Validators.required],
            Exam_Name: ['', Validators.required],
            LastExam_Name: ['', Validators.required],
        });

        this.DownloadUploadForm = this.formBuilder.group({
            upload: ['', Validators.required],
        });

        this.outAtktForm = this.formBuilder.group({
            out_aadhaar: ['', Validators.required],
            out_month: ['', Validators.required],
            out_gender: ['', Validators.required],
            out_firstname: ['', Validators.required],
            out_lastname: ['', Validators.required],
            out_fathername: ['', Validators.required],
            out_mothername: ['', Validators.required],
            mobile_no: ['', Validators.required],
            out_batch: ['', Validators.required],

            out_scale: ['', Validators.required],
            payment_type_outside: new FormControl('', Validators.required),
            prn_no: ['', Validators.required],
        });

        this.outAtktForm_subject = this.formBuilder.group({
            out_exam: ['', Validators.required],
            out_semester: ['', Validators.required],
            out_scale: ['', Validators.required],
            out_subject: ['', Validators.required],
            marksheet_atktoutside: ['', Validators.required],
            out_specialisation: ['', Validators.required],
            out_examyear: ['', Validators.required],

        });

        this.in_AtktForm = this.formBuilder.group({
            in_aadhaar: ['', Validators.required],
            in_batchtype: ['', Validators.required],
            payment_type: ['', Validators.required],
            in_batch: ['', Validators.required],
            in_semester: ['', Validators.required],
        });
        // Reciept Form Build
        this.in_Reciept = this.formBuilder.group({
            reciept_aadhaar: ['', Validators.required],
        });

        this.billdesk_AtktForm = this.formBuilder.group({
            billdesk_aadhaar: ['',],

        });

        this.outAtktForm_edit_subject = this.formBuilder.group({
            edit_batchtype: new FormControl('', Validators.required),

        });

        this.outAtktForm_subjectedit_subject = this.formBuilder.group({
            edit_subjectedit_semester: new FormControl('', Validators.required),
            marksheet_subject_atktoutside: ['', Validators.required],
            out_subject_detail: ['', Validators.required],
            out_subject_scale: ['', Validators.required],
            out_editscale: ['', Validators.required],
            out_subject_specialisation: ['', Validators.required],
            pappercode_out: new FormControl('', Validators.required),
        });
    }

    // private extractValue(paramsArray: string[], key: string): string {
    //         const keyWithEqualSign = key + '=';
    //         const paramWithValue = paramsArray.find(param => param.includes(keyWithEqualSign));
    //
    //         if (paramWithValue) {
    //             return paramWithValue.split('=')[1];
    //         }
    //
    //         return null;
    //     }


    xyz(req: any) {
    }

    get out_atktform() {
        return this.outAtktForm.controls;
    }

    get in_atktform() {
        return this.in_AtktForm.controls;
    }

    get in_Resiept() {
        return this.in_Reciept.controls;
    }

    get atkt_subject() {
        return this.in_AtktForm.controls;
    }

    get in_recieptSubject() {
        return this.in_Reciept.controls;
    }

    selectFinyearApi() {
        this.commonService.Post_json(Finyear, "").subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_finyear = response['data'];
        });
    }

    Get_failaadhaar() {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchtype: this.selected_batchtype,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(Get_failaadhaar, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_aadhaar = response;
        });
    }

    onChangeFinyearSelect(data: any) {
        this.GetLastUserExamApi();
    }

    //pagination page size
    onPageSizeChanged() {
        var value = (document.getElementById('page-size') as HTMLInputElement)
            .value;
        this.gridApi.paginationSetPageSize(Number(value));
    }

    //grid- search
    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
    }

    onGridReady_outatkt(params: any) {
        this.gridApi_outatkt = params.api;
    }


    onGridReady_show_outatkt(params: any) {
        this.gridApi_show_outatkt = params.api;
    }

    onRowSelectedEvent(event: any) {
        this.StudentAadhaar = event.data.Aadhaar;
        this.firstname = event.data.Firstname;
        this.lastname = event.data.Lastname;
        this.mothername = event.data.Mothername;
        this.fathername = event.data.Fathername;
        this.gender = event.data.Gender;
        this.student_id = event.data.Student_id;
        this.Prn = event.data.Prn;
        this.Seatno = event.data.Seatno;
    }

    onRowSelected_outatkt(event: any) {

        let selected_outnode = this.gridApi_outatkt.getSelectedNodes();
        this.out_rowselected_outside = selected_outnode.map((node: { data: any; }) => node.data);

        // if (event == null) {
        //     return;
        // }
        // this.json_studentsubject_row = event.data;
        // this.sumoutsideamount = 0;
        // this.aSemester_outside = [];
        // this.AselectedRows_outside = this.gridApi_outatkt.getSelectedRows();
        // for (let oSemesterKey of this.AselectedRows_outside) {
        //
        //
        //     let aElement = this.aSemester_outside.find(i => i.Semester === oSemesterKey.Semester);
        //
        //     if (aElement == undefined) {
        //         let oSemester = new CSemester_outside();
        //         oSemester.Semester = oSemesterKey.Semester;
        //         oSemester.Totalcount = 1
        //         oSemester.Semesteramount = this.Aformamount_atkt_json[0].Formamount
        //
        //
        //         this.aSemester_outside.push(oSemester);
        //         continue;
        //     } else {
        //         let mycount = aElement.Totalcount + 1;
        //         aElement.Totalcount = mycount;
        //         if (aElement.Totalcount == 2) {
        //             aElement.Semesteramount = this.Aformamount_atkt_json[1].Formamount;
        //         }
        //         if (aElement.Totalcount > 2) {
        //             aElement.Semesteramount = this.Aformamount_atkt_json[2].Formamount;
        //         }
        //
        //     }
        // }
        //
        // for (let oSemesterKey of this.aSemester_outside) {
        //     this.sumoutsideamount = this.sumoutsideamount + oSemesterKey.Semesteramount;
        // }
        //
    }

    onSubjectSelected_outatkt() {
        // if (event == null) {
        //     return;
        // }
        // this.json_studentsubject_row = event.data;
        this.sumoutsideamount = 0;
        this.aSemester_outside = [];
        this.AselectedRows_outside = this.ASubjectsdetails;
        for (let oSemesterKey of this.AselectedRows_outside) {


            let aElement = this.aSemester_outside.find(i => i.Semester === oSemesterKey.Semester);

            if (aElement == undefined) {
                let oSemester = new CSemester_outside();
                oSemester.Semester = oSemesterKey.Semester;
                oSemester.Totalcount = 1
                oSemester.Semesteramount = this.Aformamount_atkt_json[0].Formamount


                this.aSemester_outside.push(oSemester);

            } else {
                let mycount = aElement.Totalcount + 1;
                aElement.Totalcount = mycount;
                if (aElement.Totalcount == 2) {
                    aElement.Semesteramount = this.Aformamount_atkt_json[1].Formamount;
                }
                if (aElement.Totalcount > 2) {
                    aElement.Semesteramount = this.Aformamount_atkt_json[2].Formamount;
                }

            }
        }

        for (let oSemesterKey of this.aSemester_outside) {
            this.sumoutsideamount = this.sumoutsideamount + oSemesterKey.Semesteramount;
        }
        this.sumoutsideamount = this.sumoutsideamount + 10;

    }


    onSelect_semester() {
        this.selected_batchsemester = this.json_semester_batchwise
    }

    Atkt_studentbatch() {
        let jsonin = {
            // 'Boardlevel' : this.atkt_subject_papers.Boardlevel,
            'Aadhaar': this.in_AtktForm.controls['in_aadhaar'].value,
        }
        this.commonService.Post_json(Atkt_studentbatch, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found')
            }
            this.atkt_student_batch = response
            // this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
        });
    }

    onRowSelected_show_outatkt(event: any) {

    }

    onSelectionChanged_atkt(event: any) {

    }


    onSelectionChanged_show_atkt(event: any) {
        this.outAtktForm.controls['out_firstname'].setValue(this.showatktstudent_outside)
        this.outAtktForm.controls['out_lastname'].setValue(this.showatktstudent_outside)
        this.outAtktForm.controls['out_fathername'].setValue(this.showatktstudent_outside)
        this.outAtktForm.controls['out_mothername'].setValue(this.showatktstudent_outside)
        this.outAtktForm.controls['out_examyear'].setValue(this.showatktstudent_outside)
        this.outAtktForm.controls['prn_no'].setValue(this.showatktstudent_outside)
    }

    onSelectionChanged(event: any) {
    }

    //Batch


    GetBatchApi() {
        this.commonService.getBatches().subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error('No data found!');
                return;
            }
            this.json_batchs = response['data'];
        });
    }

    onSelect_batch(index: any) {
        if (index <= 0) {
            this.globalmessage.Show_error('Select Batch');
            return;
        }


        // this.selected_batchstudent = this.atkt_student_batch[index-1],

        this.selected_batchstudent = this.atkt_student_batch[index - 1]
        this.batchwise_semester();
    }

    GetBatchedit_Api() {
        this.commonService.getallBatches().subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error('No data found!');
                return;
            }
            this.json_edit_batchs = response['data'];
        });
    }

    GetLastUserExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.SelectedFinyear,
            batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(batchuserexam, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error('No data found!');
                return;
            } else {
                this.LastUserExam = response['data'];
            }
        });
    }

    GetUserExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(batchuserexam, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error('No data found!');
                return;
            }
            this.json_userexam = response['data'];
        });
    }

    GetUserExamApi_download() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode_download,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(batchuserexam, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error('No data found!');
                return;
            }
            this.json_userexam = response['data'];
        });
    }

    GetLastSubjectApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.SelectedFinyear,
            batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedLastyearUserExam.Semester,
            batchexam_id: this.SelectedLastyearUserExam.Batchexam_id,
        };
        this.commonService.Post_json(batchsemstersubjects, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response['data'] == '' || response['data'] == null) {
                    this.globalmessage.Show_error(
                        'No data found! Please Configure StudentSubject..'
                    );
                    return;
                } else {
                    this.LastSubjectgroupcode = response['data'];
                }
            }
        );
    }

    GetSubjectApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
            semester: this.selected_userexam_download.Semester,
            batchexam_id: this.selected_userexam_download.Batchexam_id,
        };
        this.commonService.Post_json(batchsemstersubjects, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response['data'] == '' || response['data'] == null) {
                    this.globalmessage.Show_error(
                        'No data found! Please Configure StudentSubject..'
                    );
                    return;
                }

                this.json_subjectorder = response['data'];
            }
        );
    }

    GetSubjectDownloadApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode_download,
            useraadhaar: this.oSession.aadhaar,
            semester: this.selected_userexam_download.Semester,
            batchexam_id: this.selected_userexam_download.Batchexam_id,
        };
        this.commonService.Post_json(batchsemstersubjects, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response['data'] == '' || response['data'] == null) {
                    this.globalmessage.Show_error(
                        'No data found! Please Configure StudentSubject..'
                    );
                    return;
                }

                this.json_subjectorder_download = response['data'];
            }
        );
    }

    GetSemExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode_download.Batch_code,
            useraadhaar: this.oSession.aadhaar,
            semester: this.json_subjectorder_download.Semester,
        };
        this.commonService.Post_json(exams, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error(
                    'No data found! Please Configure Marksheet..'
                );
                return;
            }
            this.Exam = response['data'];
        });
    }

    GetLastSemExamApi() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.SelectedFinyear,
            batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
            semester: this.SelectedLastyearUserExam.Semester,
        };
        this.commonService.Post_json(exams, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response['data'] == '' || response['data'] == null) {
                this.globalmessage.Show_error(
                    'No data found! Please Configure Marksheet..'
                );
                return;
            }
            this.LastExam = response['data'];
        });
    }

    //when subject is Selected
    onChangeSubjectSelect() {
        this.GetSemExamApi();
    }

    //when Batch is Selected
    onChangeBatchSelect() {

        this.GetUserExamApi();
    }

    //when userexam is Selected

    onChangeUserExamSelect() {
        // this.GetBatchSemesterSubjectApi();
        this.GetSubjectApi();
    }

    onChangeUserExamDownloadSelect() {

        this.GetSubjectDownloadApi();
        // this.GetSubjectApi();
    }

    onChangeSemesterExamSelect() {

        this.GetBatchSemesterSubjectApi();
        // this.GetSubjectApi();
    }

    onChangeSemesterEditExamSelect() {

        this.GetBatchSemesterEditSubjectApi();
        // this.GetSubjectApi();
    }

    onChangelastyearSubjectSelect() {
        this.GetLastSemExamApi();
    }

    onChangeLastyearExamSelect() {
        this.GetLastSubjectApi();
    }

    onChangeSemExamSelect() {
    }

    onChangeLastSemExamSelect() {
    }

    //download File

    OnDownloadFile() {
        this.Downloadloader = true;
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode.Batch_code,
            semester: this.selected_userexam.Semester,
            batchexam_id: this.selected_userexam.Batchexam_id,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(atktstudentlist, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }

                this.gridOptions.api.setRowData(response.data);
                this.rowss = response.data;

                UDownloadfiles(response.blobdata, response.filename);
                this.Downloadloader = false;
            },
            (error) => {
                this.Downloadloader = false;

                if (error.error !== null) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.error.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.status + 'Server Error!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            }
        );
    }

    OnDownloadtabMarks() {
        this.Downloadtabloader = true;
        let jsonin = {
            Currentcollege_code: this.oSession.collegecode,
            Currentfinyear: this.SelectedFinyear,
            Currentbatchexam_id: this.selected_userexam.Batchexam_id,
            Currentexamcode: this.SelectedSemExam.Examcode,
            Subjectname: this.SelectedSubject.Subject_name,
            Currentsubjectorder: this.SelectedSubject.Subject_order,
            useraadhaar: this.oSession.aadhaar,
            Currentbatchcode: this.selected_batchcode.Batch_code,
            Reporttype: 'XL',
            Lastyearbatchexam_id: this.SelectedLastyearUserExam.Batchexam_id,
            Lastyearexamcode: this.SelectedLastSemExam.Examcode,
            Lastyearsubjectorder: this.SelectedlastyearSubject.Subject_order,
        };
        this.commonService.Post_json(downloadatktmarks, jsonin).subscribe(
            (response) => {
                this.Downloadtabloader = false;
                if (response == null) {
                    return;
                }

                this.gridOptions.api.setRowData(this.res.data);
                this.res = response;
                this.rowss = this.res.data;
                UDownloadfiles(response.data, response.filename)
            },
            (error) => {
                this.Downloadtabloader = false;

                if (error.error !== null) {
                    console.error('error caught in component', error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.error.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.status + 'Server Error!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
                // this.resetAll();
            }
        );
    }

    OnCopymarksapi() {
        this.Copymarkloader = true;
        let jsonin = {
            Currentcollege_code: this.oSession.collegecode,
            Currentfinyear: this.SelectedFinyear,
            Currentbatchexam_id: this.selected_userexam.Batchexam_id,
            Currentexamcode: this.SelectedSemExam.Examcode,
            Subjectname: this.SelectedSubject.Subject_name,
            Currentsubjectorder: this.SelectedSubject.Subject_order,
            useraadhaar: this.oSession.aadhaar,
            Currentbatchcode: this.selected_batchcode.Batch_code,
            Reporttype: 'XL',
            Lastyearbatchexam_id: this.SelectedLastyearUserExam.Batchexam_id,
            Lastyearexamcode: this.SelectedLastSemExam.Examcode,
            Lastyearsubjectorder: this.SelectedlastyearSubject.Subject_order,
        };
        this.commonService.Post_json(downloadatktmarks, jsonin).subscribe(
            (response) => {
                this.Copymarkloader = false;
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.gridOptions.api.setRowData(this.res.data);
                this.res = response;
                this.rowss = this.res.data;
                UDownloadfiles(response.data, response.filename)
            },
            (error) => {
                this.Copymarkloader = false;

                if (error.error !== null) {
                    console.error('error caught in component', error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.error.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.status + 'Server Error!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
                // this.resetAll();
            }
        );
    }

    //Upload File
    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        if (
            this.xlsxFile[0].type ==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            this.xlsxFile[0].size < 2400000
        ) {
        } else {
            // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
            Swal.fire({
                title: 'Error!',
                text: 'Only .xlsx file allowed!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert

            // this.resetAll()
        }
    }

    Uploadfile() {
        let jsonform = new FormData();
        /*
        jsonform.delete("college_code");
        jsonform.delete("finyear");
        jsonform.delete("useraadhaar");
        jsonform.delete("batch_code");
        jsonform.delete("semester");
        jsonform.delete("batchexam_id");
        jsonform.delete("excel");
        */
        jsonform.append('College_code', sessionStorage.getItem('College')!);
        jsonform.append('Finyear', sessionStorage.getItem('Finyear')!);
        jsonform.append('Useraadhaar', sessionStorage.getItem('Aadhaar')!);
        jsonform.append('Batch_code', this.selected_batchcode.Batch_code.toString());
        jsonform.append('Semester', this.selected_userexam.Semester);
        jsonform.append('Batchexam_id', this.selected_userexam.Batchexam_id);
        jsonform.append('file', this.xlsxFile[0]);

        this.commonService.Post_json(uploadatktstudent, jsonform).subscribe(
            (response: {}) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.res = response;
                if (this.res.data == true) {
                    this.globalmessage.Show_succesmessage('File Uploaded Successfully!');
                    this.GridData();
                    this.DownloadUploadForm.reset();
                } else {
                    this.globalmessage.Show_error(this.res.exception);
                }
            }
        );
    }

    resetAll() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/Atkt-students']);
        });
    }

    // //Delete button

    DeleteSuccessDialog() {
        if (this.StudentAadhaar == null) {
            this.globalmessage.Show_error('Please select Row!');
            return;
        }

        let jsonin = {
            aadhaar: this.StudentAadhaar,
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode.Batch_code,
            batchexam_id: this.selected_userexam.Batchexam_id,
            useraadhaar: this.oSession.aadhaar,
        };

        this.commonService.Post_json(deleteatktstudent, jsonin).subscribe(
            (response: {}) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }

                this.res = response;
                if (this.res.data == true) {
                    this.globalmessage.Show_message('Deleted Successfully!');
                } else {
                    this.globalmessage.Show_message('Failed to Delete!'),
                        this.globalmessage.Show_error(this.res.exception)
                }
            }
        );
    }

    Delete_Atktoutside_subjects(data: any) {

        /*
        this.rowData.splice(params.rowData.index, 1);
        this.api.updateRowData({ remove: [params.rowData] });
        this.api.forEachNode(node => {
        });
        return this.rowData;
        */


        this.ASubjectsdetails.splice(data.index, 1)
        // this.outatkt_gridOptions.api.clear();
        // this.outatkt_gridOptions.api.setRowData(this.ASubjectsdetails);
        // if (this.out_rowselected_outside == null) {
        //     this.globalmessage.Show_error('Please select Row!');
        //     return;
        // }
        //
        // this.out_rowselected_outside.splice(0)
        //


        // let jsonin = {
        //     Studentsubject_id: this.json_studentsubject_row.Studentsubject_id,
        // };
        //
        // this.Atktstudentsservice.ATKT_deletesubjects(jsonin).subscribe(
        //     (response) => {
        //         if (response == null) {
        //             return;
        //         }
        //
        //         if (response == true) {
        //             this.globalmessage.Show_message('Deleted Successfully!');
        //             this.studentatktform_outside();
        //             return;
        //         } else {
        //             this.globalmessage.Show_message('Failed to Delete!');
        //             return;
        //         }
        //     }
        // );
    }


    Delete_Selected_subject() {

        if (this.json_studentsubject_inhouse_row == null) {
            this.globalmessage.Show_error('Please select Row!');
            return;
        }

        let jsonin = {
            Studentdetail_id: this.json_studentsubject_inhouse_row.Studentdetail_id,
        };

        this.commonService.Post_json(ATKT_inhouse_aadhhardeletesubject, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }

                if (response == true) {
                    this.globalmessage.Show_message('Deleted Successfully!');
                    this.show_failsubjects();
                    return;
                } else {
                    this.globalmessage.Show_message('Failed to Delete!');
                    return;
                }
            }
        );
    }

    //update Button

    /*
    modal() {
      if (this.student_id == null) {
        this.globalmessage.Show_error('Please select Row!');
        return;
      }

      let jsonin = {
        out_firstname: this.out_firstname,
        out_lastname: this.out_lastname,
        out_mothername: this.out_mothername,
        out_fathername: this.out_fathername,
        gender: this.gender,
        student_id: parseInt(this.student_id),
        useraadhaar: this.oSession.aadhaar,
        college_code: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        seatno: parseInt(this.Seatno),
        prn: this.Prn,
      };

      this.Atktstudentsservice.Updateatktstudents(jsonin).subscribe(
        (response: {}) => {
          if (response == null) {
            return;
          }
          if (!response.hasOwnProperty('data')) {
            return;
          }

          this.res = response;
          if (this.res.data == true) {
            this.globalmessage.Show_message('Data Updated Successfully!');
            this.GridData();
          } else {
            this.globalmessage.Show_message(this.res.exception);
            return;
          }
        }
      );
    }
    */

    GridData() {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode.Batch_code,
            semester: this.selected_userexam.Semester,
            batchexam_id: this.selected_userexam.Batchexam_id,
            useraadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(atktstudentlist, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (!response.hasOwnProperty('data')) {
                    return;
                }
                this.gridApi.setRowData(response.data);
            }
        );
    }

    selectBatch(bat: any) {
        this.selected_batchcode = bat;
        this.GetUserExamApi();
    }

    selectBatch_download(bat: any) {
        this.selected_batchcode_download = bat.Batch_code;
        this.GetUserExamApi_download();
    }

    onChangeSearch(search: string) {
    }

    onFocused(e: any) {
    }

    outatakt_selectBatch(event: any) {
        this.selected_batchcode = event
        // this.GetUserExamApi();
        this.batchwise_semester();
    }

    outatakt_edit_selectBatch(event: any) {
        this.selected_edit_batchcode = event

        // this.GetUserExamApi();
        this.batchwise_edit_semester();
    }

    onSelect_gender(value: string) {
        this.selected_gender = value;
    }

    onSelect_month() {
    }


    get_atktprefix() {
        this.commonService.Post_json(get_atktprefix, "").subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found')
                return;
            }
            this.show_prefix_detail = response
        }, error => {
            this.activePane = 0;
        });
    }


    form_subjectselect(event: any) {
        this.selected_subjectorder = event.Subject_order;
    }

    form_subjectbatchwiseselect(event: any) {
        this.selected_subject_batchwisedetails = event

    }


    form_subjectbatcheditwiseselect(event: any) {
        this.selected_subject_batcheditwisedetails = event
    }

    select_Finyear($event: any) {
        this.Get_failaadhaar();
    }

    Select_aadhaar_inhouse($event: any) {
        if ($event == null) {
            return;
        }
        this.selected_aadhaar_inhouse = $event;
    }

    show_failsubjects() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            Batchtype: this.selected_batchtype,
            useraadhaar: this.oSession.aadhaar,
            studentaadhaar: parseInt(this.selected_aadhaar_inhouse.Aadhaar),
        };
        this.commonService.Post_json(Get_failsubjectes, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data found');
                return;
            }

            this.inatkt_gridOptions.api.setRowData(response);
            //this.json_inatkt = response;
            /*
            this.inatkt_gridOptions.api.getRenderedNodes().forEach(function (node:any) {
              this.globalmessage.Show_message(node.data.Subject_order);
              if (node.data.subject_order ==1){
                node.setSelected(node.data.selected);
              }

            });

            this.inatkt_gridOptions.forEachLeafNode( (node) => {
              this.globalmessage.Show_message('YYY'+node);
              if (node.data.subject_order === 1) {
                node.setSelected(true);
              }
            });
            */
        });

        this.commonService.Post_json(ATKT_inhouse_aadhharsubject, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }

            this.inatkt_gridOptions_selected.api.setRowData(response);


        });
    }


    onGridReady_inatkt(params: any) {
        //this.inatkt_gridOptions.api.setRowData(this.inatkt_data);
        this.inatkt_gridApi = params.api;
        this.inatkt_gridColumnApi = params.ColumnApi;
    }

    /*
    onGridReady_inatkt($event: GridReadyEvent<any>) {
        this.gridApi = $event.api;
        this.gridColumnApi = $event.ColumnApi;
    }

    onRowSelectedEvent_inatkt($event: RowSelectedEvent<any>) {}

    onSelectionChanged_inatkt($event: SelectionChangedEvent<any>) {}

     */

    onRowSelectedEvent_inatkt($event: RowSelectedEvent<any>) {
    }

    onSelectionChanged_inatkt($event: SelectionChangedEvent<any>) {
    }

    getSelectedRowData() {
        const selectedData = this.inatkt_gridApi.getSelectedRows();
        alert(`Selected Data:\n${JSON.stringify(selectedData)}`);
        return selectedData;
    }

    onSelect_scale(value: string) {
        this.selected_markscale = parseInt(value);
    }

    onSelectedit_scale(value: string) {
        this.selected_editmarkscale = parseInt(value);
    }

    onSelect_lastfinyear(value: string) {
        this.select_lastexam = parseInt(value);
    }

    studentatktform_outside() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Useraadhaar: this.oSession.aadhaar,
            Receipt_id: this.out_edit_rowselected[0].Receipt_id,
            Aadhaar: this.out_edit_rowselected[0].Aadhaar,
        };
        this.commonService.Post_json(get_offlineatktsubjects, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.json_outside = response;
                // this.outatkt_gridOptions.api.setRowData(this.json_outside);
            }
        );
    }

    RenderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    loadbilldesk() {
        this.RenderExternalScript(billdeskjs).onload = () => {
        };
    }

    Clear_outsideatkt() {
        this.outside_subject.clear();
        this.outside_subject.close();
    }

    make_outsidepayment() {
        this.outside_batch.clear();
        this.outside_batch.close();

        this.outside_subject.clear();
        this.outside_subject.close();

        this.outAtktForm.reset();
        this.outAtktForm_subject.reset();

        this.json_outside = [];
        this.outatkt_gridOptions.api.setRowData(this.json_outside);
    }

    studentatktform_inhouse() {
        debugger;
        const selectedData = this.inatkt_gridApi.getSelectedRows();
        if (selectedData == null) {
            this.globalmessage.Show_message('Record not selected');
            return;
        }
        let ajsonin = [];

        for (const jsoninElement of selectedData) {
            let jsonin = {
                college_code: this.oSession.collegecode,
                finyear: this.oSession.finyear,
                useraadhaar: this.oSession.aadhaar,
                batchexam_id: jsoninElement.Batchexam_id,
                aadhaar: parseInt(this.selected_aadhaar_inhouse.Aadhaar),
                subject_order: jsoninElement.Subject_order,
            };
            ajsonin.push(jsonin);
        }

        this.commonService.Post_json(IU_ATKTForm_inhouse, ajsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response == true) {
                    this.globalmessage.Show_message('Entry saved');

                    this.inhouse_aadhaar.clear();
                    this.inhouse_aadhaar.close();

                    this.json_inatkt = [];
                    this.inatkt_gridOptions.api.setRowData(this.json_inatkt);
                }
            }
        );
    }

    /*
    inatkt_onFirstDataRendered(
      params: FirstDataRenderedEvent<Atkt_failsubjects>
    ) {
      const nodesToSelect: IRowNode[] = [];
      params.api.forEachNode((node) => {
        this.globalmessage.Show_message(node.data.subject_order.toString());
        if (node.data && node.data.subject_order == 1) {
          nodesToSelect.push(node);
        }
      });

      this.inatkt_gridOptions.api.setNodesSelected({
        nodes: nodesToSelect,
        newValue: true,
      });
    }
    */
    rows: any;
    public subject_details = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Batchname', field: 'Batch_name', resizable: true, filter: true,},
        {headerName: 'Subject order', field: 'Subject_order', resizable: true, filter: true,},
        {headerName: 'Subject name', field: 'Subject_name', resizable: true, filter: true, minWidth: 550},
        {headerName: 'Semester', field: 'Semester', resizable: true, filter: true,},
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
    ];

    public additionalSubject_GridData = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Subject order', field: 'Subject_order', resizable: true, filter: true,},
        {headerName: 'Subject name', field: 'Subject_name', resizable: true, filter: true, minWidth: 550},
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
    ];

    public feesReciept_GridData = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Transactionguid', field: 'Transactionguid', resizable: true, filter: true,},
        {headerName: 'Billdesktranid', field: 'Billdesktranid', resizable: true, filter: true, minWidth: 550},
        {headerName: 'Receiptno', field: 'Receiptno', resizable: true, filter: true,},
        {headerName: 'Receiptamount', field: 'Receiptamount', resizable: true, filter: true,},
    ];


    public subject_edit_studentdetails = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Receipt id', field: 'Receipt_id', resizable: true, filter: true,},
        {headerName: 'First Name', field: 'Firstname', resizable: true, filter: true,},
        {headerName: 'Last Name', field: 'Lastname', resizable: true, filter: true,},
        {headerName: 'Mothers name', field: 'Mothername', resizable: true, filter: true},
        {headerName: 'Fathers name', field: 'Fathername', resizable: true, filter: true,},
        {headerName: 'PRN no.', field: 'Prnno', resizable: true, filter: true,},
        {headerName: 'Gender', field: 'Gender', resizable: true, filter: true,},
    ];

    public subject_edit_subjectdetails = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Receipt id', field: 'Receipt_id', resizable: true, filter: true,},
        {headerName: 'Batch Name', field: 'Batch_name', resizable: true, filter: true,},
        {headerName: 'Subject Name', field: 'Subject_name', resizable: true, filter: true,},
        {headerName: 'Subject Year', field: 'Subject_finyear', resizable: true, filter: true,},
        {headerName: 'Pappercode', field: 'Pappercode', resizable: true, filter: true},
        {headerName: 'Subject finyear', field: 'Subject_finyear', resizable: true, filter: true},
        {headerName: 'Semester', field: 'Semester', resizable: true, filter: true,},

    ];

    single_rowSelection_details: 'single' | 'multiple' = 'multiple';

    single_rowSelection_edit_studentdetails: 'single' | 'multiple' = 'single';

    single_rowSelection_edit_subjectdetails: 'single' | 'multiple' = 'single';

    // ShowAtkt() {
    //     let jsonin = {
    //         'Boardlevel': this.selected_batch_type.name,
    //         'Aadhaar': this.in_AtktForm.controls['in_aadhaar'].value,
    //         // Batchexam_id: this.selected_userexam.Batchexam_id,
    //     }
    //     this.Atktstudentsservice.atktstudentspapers(jsonin).subscribe((response) => {
    //         if (response == null) {
    //             this.globalmessage.Show_error('No data found')
    //         }
    //         this.atkt_subject_papers = response
    //         this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
    //
    //     });
    // }

    ShowAtkt(Examtype: string) {
        let jsonin = {
            'College_code': this.oSession.collegecode,
            'Finyear': this.oSession.finyear,
            'Boardlevel': this.selected_batchcode.Boardlevel,
            'Aadhaar': this.in_AtktForm.controls['in_aadhaar'].value,
            'Batch_code': this.selected_batchcode.Batch_code,
            'Semester': this.selected_semester,
            'Examtype': Examtype
            // Batchexam_id: this.selected_userexam.Batchexam_id,
        }
        if (jsonin.Semester === 5) {
            this.commonService.Post_json(atktstudentspaper_semesterwise, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                }

                if (Examtype === 'ADDITIONAL') {
                    this.additionalAtkt_subject_papers = response
                    this.gridApi_inatkt_subjectdetails.setRowData(this.additionalAtkt_subject_papers)
                    return
                } else if (Examtype === 'ATKT') {
                    this.atkt_subject_papers = response
                    this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
                    return;
                }
            });
        } else {
            this.globalmessage.Show_message("Only 5 Students Are Allowed")
        }

    }

    ShowReciept() {
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Aadhaar: this.in_Reciept.controls['reciept_aadhaar'].value
        }
        this.commonService.Post_json(getReciept, jsonin).subscribe((response) => {
            if (!response) return;
            this.iReq_Reciept = response
            this.gridApi_inatkt_Reciept.setRowData(this.iReq_Reciept)
        })
    }

    onGridReady_inatkt_selected(params: any) {
    }

    onRowSelected_inatktsubject(event: any) {
        if (event == null) {
            return;
        }
        this.json_studentsubject_inhouse_row = event.data;

    }

    onGridReady_subject_selected(params: any) {
        this.gridApi_inatkt_subjectdetails = params.api;
        this.gridColumnApi_inatkt_subjectdetails = params.ColumnApi;
    }

    onGridReady_Reciept(params: any) {
        this.gridApi_inatkt_Reciept = params.api;
        this.gridColumnApi_inatkt_Reciept = params.ColumnApi;
    }

    onGridReady_edit_student_selected(params: any) {
        this.gridApi_outedit_studentdetails = params.api;
        this.gridColumnApi_outedit_studentdetails = params.ColumnApi;
    }

    onGridReady_edit_subject_selected(params: any) {
        this.gridApi_outedit_subjectdetails = params.api;
        this.gridColumnApi_outedit_subjectdetails = params.ColumnApi;
    }

    atkt_redirect() {
        this.router.navigate(
            ['/Atkt-students'],
            {queryParams: {order: 'popular'}}
        );
    }

    // Get_apiformamount() {
    //     this.commonService.Post_json(atkt_formamount,"").subscribe((response) => {
    //         if (response == null) {
    //             return;
    //         }
    //         this.Aformamount_atkt_json = response
    //     });
    // }
    Get_apiformamount() {
        this.Atktstudentsservice.atkt_formamount().subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Aformamount_atkt_json = response
        });
    }

    onRowSelected_Reciep($event: RowSelectedEvent<any>) {
        this.FeeReceipt = true

    }

    onRowSelected_subject($event: RowSelectedEvent<any>) {
        this.sumamount = 0;
        this.aSemester = [];
        this.AselectedRows = this.gridApi_inatkt_subjectdetails.getSelectedRows();
        for (let oSemesterKey of this.AselectedRows) {


            let aElement = this.aSemester.find(i => i.Semester === oSemesterKey.Semester);

            if (aElement == undefined) {
                let oSemester = new CSemester();
                oSemester.Semester = oSemesterKey.Semester;
                oSemester.Totalcount = 1
                oSemester.Semesteramount = this.Aformamount_atkt_json[0].Formamount


                this.aSemester.push(oSemester);

            } else {
                let mycount = aElement.Totalcount + 1;
                aElement.Totalcount = mycount;
                if (aElement.Totalcount == 2) {
                    aElement.Semesteramount = this.Aformamount_atkt_json[1].Formamount;
                }
                if (aElement.Totalcount > 2) {
                    aElement.Semesteramount = this.Aformamount_atkt_json[2].Formamount;
                }

            }
        }

        for (let oSemesterKey of this.aSemester) {
            this.sumamount = this.sumamount + oSemesterKey.Semesteramount;
        }
        this.sumamount = this.sumamount + 10;
    }


    onRowSelected_editstudent($event: any) {

        let selected_outnode = this.gridApi_outedit_studentdetails.getSelectedNodes();
        this.out_edit_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        this.studentatktform_outside();
    }

    onRowSelected_editsubject($event: any) {
    }

    onSelectionChanged_editstudent($event: any) {
        let selected_outnode = this.gridApi_outedit_studentdetails.getSelectedNodes();
        this.out_editsubject_rowselected = selected_outnode.map((node: { data: any; }) => node.data);

    }


    onSelectionChanged_editsubject($event: any) {
        let selected_outnode = this.gridApi_outedit_subjectdetails.getSelectedNodes();
        let selectedmap = selected_outnode.map((node: { data: any; }) => node.data);
        this.out_edit_rowselected_editdetail_image = selectedmap[0]
    }


    Showatktstudent_edit_outside() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Boardlevel: this.selected_edit_batch_type.name,
        }
        this.commonService.Post_json(getboardlevel_students, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data found')
                return
            }
            this.atkt_editstudent_papers = response['data']
        });
    }

    paymenttype: MyArrayType = [
        {id: 1, name: 'Live'},
        {id: 2, name: 'Demo'},
    ]

    paymenttype_outside: MyArrayType = [
        {id: 1, name: 'Live'},
        {id: 2, name: 'Demo'},
    ]

    batchtype_inhouse_detail: MyArrayType = [
        {id: 1, name: 'UG'},
        {id: 2, name: 'PG'},
        {id: 3, name: 'SF'},
    ]

    batchtype_edit_outside_detail: MyArrayType = [
        {id: 1, name: 'UG'},
        {id: 2, name: 'PG'},
        {id: 3, name: 'SF'},
    ]

    // datastudent_outside_detail: MyArrayType = [
    //
    //     {this.outAtktForm.controls['']},
    //     {id: 3, name: 'SF'},
    // ]

    onChangeBatchtypeSelect(index: any) {
        this.selected_batch_type = this.batchtype_inhouse_detail[index]
    }

    onChangeBatchtypeEdit_Select(index: any) {
        this.selected_edit_batch_type = this.batchtype_edit_outside_detail[index]
    }

    onChangePaymentSelect(index: any) {
        this.selected_payment_type = this.paymenttype[index]
    }

    onChangePaymentSelect_outside(index: any) {
        this.selected_payment_type_outside = this.paymenttype_outside[index]
    }

    Uploadfiles(element: any) {
        this.Files = element.target.files;
    }

    Finalsubmit_outside() {

        let jsonin = {
            College_code : this.oSession.collegecode,
            Finyear : this.oSession.finyear,
            Aadhaar : this.oSession.aadhaar,
            Prefix_code: this.show_prefix_detail.Prefix_code,
            Prefix_month: this.show_prefix_detail.Prefix_month,
            Firstname : this.outAtktForm.controls['out_firstname'].value,
            Lastname : this.outAtktForm.controls['out_lastname'].value,
            Fathername: this.outAtktForm.controls['out_fathername'].value,
            Mothername: this.outAtktForm.controls['out_mothername'].value,
            Mobileno: this.outAtktForm.controls['mobile_no'].value,
            Useraadhaar : this.oSession.aadhaar,
            Prnno:this.outAtktForm.controls['prn_no'].value,
            Gender: this.selected_gender,
            Formtype: "OUTSIDE",
            Receiptamount: this.sumoutsideamount.toString(),
            Batch_code : this.selected_batchcode.Batch_code.toString(),
            Semester: this.selected_semesterexam.toString(),
            Dataentered: 'student',
        }



        // formdata.append('College_code', this.oSession.collegecode.toString());
        // formdata.append('Finyear', this.oSession.finyear.toString());
        // formdata.append('Aadhaar', this.outAtktForm.controls['out_aadhaar'].value);
        // formdata.append('Prefix_code', this.show_prefix_detail.Prefix_code);
        // formdata.append('Prefix_month', this.show_prefix_detail.Prefix_month);
        // formdata.append('Firstname', this.outAtktForm.controls['out_firstname'].value);
        // formdata.append('Lastname', this.outAtktForm.controls['out_lastname'].value);
        // formdata.append('Fathername', this.outAtktForm.controls['out_fathername'].value);
        // formdata.append('Mothername', this.outAtktForm.controls['out_mothername'].value);
        // formdata.append('Mobileno', this.outAtktForm.controls['mobile_no'].value);
        // formdata.append('Useraadhaar', this.oSession.aadhaar.toString());
        // formdata.append('Prnno', this.outAtktForm.controls['prn_no'].value);
        // formdata.append('Gender', this.selected_gender);
        // formdata.append('Formtype', "OUTSIDE");
        // formdata.append('Receiptamount', this.sumoutsideamount.toString());
        // formdata.append('Batch_code', this.selected_batchcode.Batch_code.toString());
        // formdata.append('Semester', this.selected_semesterexam.toString());
        // formdata.append('Dataentered', 'student');


        let formdata = new FormData();

        formdata.append('input_form', encryptUsingAES256(jsonin))


        //Shivam
        for (const subject of this.ASubjectsdetails) {
            formdata.append('Selectedsubject', JSON.stringify(subject));
        }

        if (this.Files != null) {
            if (this.Files.length > 0) {
                for (let i = 0; i < this.Files.length; i++)
                    formdata.append('Files', this.Files[i], this.Files[i].name);
            }
        }

        // for( let i = 0; i < this.AselectedRows_outside.length; i++ ) {
        //
        //     const keyPrefix = "AselectedRows_outside[" + i.toString() + "].";
        //     formdata.append( keyPrefix + "Type"  , this.AselectedRows_outside[i].type   ); // e.g. "Items[0].Type"
        //     // formdata.append( keyPrefix + "Result", this.AselectedRows_outside[i].result );
        // }

        this.commonService.Post_json(IU_ATKTForm, formdata).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.IUoutsideres = response['data']
            if (this.IUoutsideres.Receipt_id > 0) {
                this.AtktPayment_api_outside();
            }

        });
    }


    Finalsubmit(Formtype: string) {

        // let jsonin = {
        //     College_code: this.oSession.collegecode,
        //     Finyear: this.oSession.finyear,
        //     Aadhaar: this.in_AtktForm.controls['in_aadhaar'].value,
        //     Receiptamount: this.sumamount,
        //     Selectedsubject: this.AselectedRows,
        //     Formtype: "INHOUSE"
        // }

       let jsonin = {
           'College_code': this.oSession.collegecode,
           'Finyear': this.oSession.finyear,
           'Aadhaar': this.in_AtktForm.controls['in_aadhaar'].value,
           'Prefix_code': this.show_prefix_detail.Prefix_code,
           'Prefix_month': this.show_prefix_detail.Prefix_month,
           'Firstname': "",
           'Lastname': "",
           'Fathername': "",
           'Mothername': "",
           'Selected_finyear': this.select_lastexam,
           'Useraadhaar': this.oSession.aadhaar,
           'Prnno': "",
           'Gender': "",
           'Receiptamount': this.sumamount,
           'Batch_code': this.selected_batchcode.Batch_code,
           'Semester': this.selected_semester,
           'Formtype': Formtype

       }

        let formdata = new FormData();

        formdata.append('input_form', encryptUsingAES256(jsonin))


        //Shivam
        for (const subject of this.AselectedRows) {
            formdata.append('Selectedsubject', JSON.stringify(subject));
        }


        this.commonService.Post_formdata(IU_ATKTForm, formdata).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_message('No data found')
                return
            }

            this.IUinhousedata = response['data']

            if (this.IUinhousedata.Receipt_id > 0) {
                this.AtktPayment_api();
            }
        });
    }

    goProducts() {
        if (this.router) {
            this.router.navigate(
                ['/Atkt-students'],
                {queryParams: {order: 'popular'}}
            );
        }
        this.router.navigate(['/Atkt-students'])
    }


    AtktPayment_api() {
        let nTranscationamount = '';

        if (this.selected_payment_type.id == 2) {
            nTranscationamount = '1';
        } else {
            nTranscationamount = String(this.sumamount);
        }
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Aadhaar: this.in_AtktForm.controls['in_aadhaar'].value,
            Fullname: this.IUinhousedata.Fullname,
            Prefix_month: this.show_prefix_detail.Prefix_month,
            Termcode: this.show_prefix_detail.Prefix_code,
            Merchantid: '',
            Customerid: this.IUinhousedata.Transactionguid.toString(),
            Filler1: 'NA',
            Txnamount: nTranscationamount,
            Bankid: 'NA',
            Filler2: 'NA',
            Filler3: 'NA',
            Currencytype: 'INR',
            Itemcode: 'NA',
            Typefield1: 'R',
            Securityid: '',
            Filler4: 'NA',
            Filler5: 'NA',
            Typefield2: 'F',
            Additionalinfo1: String(this.oSession.finyear),
            Accountinfo: this.IUinhousedata.Billdeskaccountid,
            Additionalinfo3: this.show_prefix_detail.Prefix_code.toString(),
            Additionalinfo4: String(this.in_AtktForm.controls['in_aadhaar'].value),
            Additionalinfo5: this.show_prefix_detail.Prefix_code.toString(),
            Additionalinfo6: '1',
            Additionalinfo7: this.IUinhousedata.Receipt_id.toString(),
            TypeField3: 'NA',
            Feestype: 'ATKTFEES',
        };
        this.commonService
            .Post_json(Billdeskchecksum_atkt, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check the details');
                    return;
                }
                if (response.data != null) {
                    BilldeskPay(response.data, this.router.url, "ATKT")
                }
                // this.goProducts();
            });
    }

    AtktPayment_api_outside() {
        let nTranscationamount = '';

        if (this.selected_payment_type_outside.id == 2) {
            nTranscationamount = '1';
        } else {
            nTranscationamount = String(this.sumoutsideamount);
        }
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Aadhaar: this.outAtktForm.controls['out_aadhaar'].value,
            Fullname: this.IUoutsideres.Fullname,
            Prefix_month: this.show_prefix_detail.Prefix_month,
            Termcode: this.show_prefix_detail.Prefix_code,
            Merchantid: '',
            Customerid: this.IUoutsideres.Transactionguid.toString(),
            Filler1: 'NA',
            Txnamount: nTranscationamount,
            Bankid: 'NA',
            Filler2: 'NA',
            Filler3: 'NA',
            Currencytype: 'INR',
            Itemcode: 'NA',
            Typefield1: 'R',
            Securityid: '',
            Filler4: 'NA',
            Filler5: 'NA',
            Typefield2: 'F',
            Additionalinfo1: String(this.oSession.finyear),
            Accountinfo: this.IUoutsideres.Billdeskaccountid,
            Additionalinfo3: this.show_prefix_detail.Prefix_code.toString(),
            Additionalinfo4: String(this.outAtktForm.controls['out_aadhaar'].value),
            Additionalinfo5: this.show_prefix_detail.Prefix_code.toString(),
            Additionalinfo6: '1',
            Additionalinfo7: this.IUoutsideres.Receipt_id.toString(),
            TypeField3: 'NA',
            Feestype: 'ATKTFEES',
        };
        this.commonService
            .Post_json(Billdeskchecksum_atkt, jsonin)
            .subscribe((response: any) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check the details');
                    return;
                }
                if (response.data != null) {
                    BilldeskPay(response.data, this.router.url, "ATKT")
                }
                // this.goProducts();
            });
    }

    onSelectionChanged_subject($event: SelectionChangedEvent<any>) {
        let selected_outnode = this.gridApi_inatkt_subjectdetails.getSelectedNodes();
        //this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
    }

    batchwise_semester() {
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Batch_code: this.selected_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
        };

        this.commonService.Post_json(batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_batchwise = response;
        });
    }

    batchwise_edit_semester() {
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Batch_code: this.selected_edit_batchcode.Batch_code,
            useraadhaar: this.oSession.aadhaar,
        };

        this.commonService.Post_json(batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_edit_batchwise = response;
        });
    }

    GetBatchSemesterSubjectdownloadApi() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.selected_batchcode_download,
            "Semester": this.selected_semesterexam,
        };
        this.commonService.Post_json(batchsemestersubject_outside, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.json_subjectorder_batchwise = response;
            }
        );
    }

    GetBatchSemesterSubjectApi() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.selected_batchcode.Batch_code,
            "Semester": this.selected_semesterexam,
        };
        this.commonService.Post_json(batchsemestersubject_outside, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.json_subjectorder_batchwise = response;
            }
        );
    }

    GetBatchSemesterSubjectDownloadApi() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.selected_batchcode_download,
            "Semester": this.selected_userexam_download.Semester,
        };
        this.commonService.Post_json(batchsemestersubject_outside, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.json_subjectorder_batchwise = response;
            }
        );
    }

    GetBatchSemesterEditSubjectApi() {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Batch_code": this.selected_edit_batchcode.Batch_code,
            "Semester": this.selected_edit_semesterexam,
        };
        this.commonService.Post_json(batchsemestersubject_outside, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.json_subjectorder_edit_batchwise = response;
            }
        );
    }


    get_atktfeesreceipt_details(nReceiptid: number, nAadhaar: number) {
        let jsonin = {
            "Collegecode": this.oSession.collegecode,
            "Finyear": this.oSession.finyear,
            "Useraadhaar": this.oSession.aadhaar,
            "Receipt_id": nReceiptid,
            "Aadhaar": nAadhaar
        };

        this.commonService.Post_json(get_atktfeesreceipt_details, jsonin).subscribe((response) => {
            this.showatktstudent_outside = response

            this.outAtktForm.controls['out_aadhaar'].setValue(this.showatktstudent_outside.Aadhaar)
            this.outAtktForm.controls['out_firstname'].setValue(this.showatktstudent_outside.Firstname)
            this.outAtktForm.controls['out_lastname'].setValue(this.showatktstudent_outside.Lastname)
            this.outAtktForm.controls['out_fathername'].setValue(this.showatktstudent_outside.Fathername)
            this.outAtktForm.controls['out_mothername'].setValue(this.showatktstudent_outside.Mothername)
            this.outAtktForm.controls['prn_no'].setValue(this.showatktstudent_outside.Prnno)
            this.outAtktForm.controls['out_gender'].setValue(this.showatktstudent_outside.Gender)


            this.gridApi_outatkt.setRowData(this.showatktstudent_outside.Subjects)
        });
    }


    check_aadharlength() {
        let aadhaarlength = this.outAtktForm.controls['out_aadhaar'].value.toString();
        if (aadhaarlength.length != 12) {
            this.globalmessage.Show_error('Aadhar no is invalid');
            this.outAtktForm.controls['out_aadhaar'].setValue("0");
            return;
        }
    }

    check_mobilelength() {
        let mobilelength = this.outAtktForm.controls['mobile_no'].value.toString();
        if (mobilelength.length != 10) {
            this.globalmessage.Show_error('Mobile no is invalid');
            this.outAtktForm.controls['mobile_no'].setValue(0);
            return;
        }
    }

    Add_subjectout_detail() {

        let mobilelength = this.outAtktForm.controls['mobile_no'].value.toString();
        let aadhaarlength = this.outAtktForm.controls['out_aadhaar'].value.toString();
        if (mobilelength.length != 10) {
            this.globalmessage.Show_error('Mobile no is invalid')
            return;
        }


        if (aadhaarlength.length != 12) {
            this.globalmessage.Show_error('Aadhar no is invalid')
            return;
        }

        if (this.selected_subject_batchwisedetails == null) {
            this.globalmessage.Show_error('Please select Subject')
            return;
        }

        const subjects: Req_IAtktsubects = {

            Atkt_formid: 0,
            Receipt_id: 0,
            Batchexam_id: 0,
            Batch_code: this.selected_batchcode.Batch_code,
            Batch_name: this.selected_batchcode.Batch_name,
            Semester: this.selected_semesterexam,
            Subject_order: this.selected_subject_batchwisedetails.Subject_order,
            Subject_name: this.selected_subject_batchwisedetails.Subject_name,
            Papercode: this.selected_subject_batchwisedetails.Papercode,
            Registerfinyear: this.outAtktForm_subject.controls['out_examyear'].value,
            Marksheetno: String(this.outAtktForm_subject.controls['marksheet_atktoutside'].value),
            Specialisation: this.outAtktForm_subject.controls['out_specialisation'].value,
            Scale: this.outAtktForm_subject.controls['out_scale'].value,
            Finyear: this.oSession.finyear!,
            College_code: this.oSession.collegecode!,
            Aadhaar: this.outAtktForm.controls['out_aadhaar'].value,
            Boardlevel: this.selected_batchcode.Boardlevel,

        }

        //let lExit : boolean  = false ;
        for (var fieldarr of this.ASubjectsdetails) {
            if (fieldarr.Subject_order == subjects.Subject_order
                && fieldarr.Subject_name == subjects.Subject_name
                && fieldarr.Papercode == subjects.Papercode) {

                return;
                //lExit = true ;
                this.globalmessage.Show_error('You have already selected the subjects');
            }
        }

        // if (lExit) {
        //    return;
        // }

        //if (!lExit) {
        this.ASubjectsdetails.push(subjects);
        this.gridApi_outatkt.setRowData(this.ASubjectsdetails)
        this.onSubjectSelected_outatkt();
        // }

    }

    Viewstudent_detail() {
        if (this.outAtktForm_subjectedit_subject == null) {
            this.globalmessage.Show_error('Please check your data')
            return
        }
    }

    Viewimage_detail() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Useraadhaar: this.oSession.aadhaar,
            Receipt_id: this.out_edit_rowselected_editdetail_image.Receipt_id,
            Aadhaar: this.out_edit_rowselected_editdetail_image.Aadhaar,
        };
        this.commonService.Post_json(get_atktmarksimage, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.image_viewmarksheet = response

                this.MyMarksheetImage = this.image_viewmarksheet.map((x: any) =>
                    this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${x.Image}`));
            }
        );
    }


    Save_subjectout_detail() {
        // Receipt_id      int64
        let jsonin = {

            Atkt_formid: this.out_edit_rowselected_editdetail_image.Atkt_formid,
            Receipt_id: this.out_edit_rowselected_editdetail_image.Receipt_id,
            Batchexam_id: 0,
            Batch_code: this.selected_subject_batcheditwisedetails.Batch_code,
            Semester: this.selected_edit_semesterexam,
            Subject_name: this.selected_subject_batcheditwisedetails.Subject_name,
            Subject_order: this.selected_subject_batcheditwisedetails.Subject_order,
            Pappercode: this.selected_subject_batcheditwisedetails.Papercode,
            Finyear: this.oSession.finyear,
            Boardlevel: this.selected_edit_batchcode.Boardlevel,
            Subject_finyear: this.selected_subject_batcheditwisedetails.Subject_finyear,
            College_code: this.oSession.collegecode,
            Aadhaar: this.out_edit_rowselected_editdetail_image.Aadhaar,
        };
        this.commonService.Post_json(update_atktsubject, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.updatedatktsubjects = response
                this.globalmessage.Show_message('Data updated successfully')
            }
        );

    }


    onDelete(params: any) {
        this.ASubjectsdetails.splice(params.rowData.index, 1);
        //this.api.updateRowData({ remove: [params.ASubjectsdetails] });
        //this.api.forEachNode(node => {
        //});
        return this.ASubjectsdetails;
    }

    Delete_subjectout_detail() {
        if (this.nRowSelectindex <= 0) {
            return;
        }

        var selectedRowData = this.gridApi_outatkt.getSelectedRows();
        this.gridApi_outatkt.applyTransaction({remove: selectedRowData});

        this.ASubjectsdetails.splice(this.nRowSelectindex, 1);

        /*const index = this.ASubjectsdetails.indexOf(selectedRowData,0 );
        if (index > -1) {

        }*/

    }

    onRowClick(event: any): void {
        this.nRowSelectindex = event.rowIndex
    }

    outsidechange($event: number) {
        this.activePane = $event;
        if ($event > 1 && $event <= 5) {

            this.get_atktprefix();
        }
    }

    intToRoman(num: number) {
        const romanNumerals = [
            {value: 1000, numeral: 'M'},
            {value: 900, numeral: 'CM'},
            {value: 500, numeral: 'D'},
            {value: 400, numeral: 'CD'},
            {value: 100, numeral: 'C'},
            {value: 90, numeral: 'XC'},
            {value: 50, numeral: 'L'},
            {value: 40, numeral: 'XL'},
            {value: 10, numeral: 'X'},
            {value: 9, numeral: 'IX'},
            {value: 5, numeral: 'V'},
            {value: 4, numeral: 'IV'},
            {value: 1, numeral: 'I'}
        ];

        let roman = '';

        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                roman += romanNumerals[i].numeral;
                num -= romanNumerals[i].value;
            }
        }

        return roman;
    }

    DownloadReport(Reporttype: string) {

        if (Reporttype == 'SUMMARY') {
            this.Downloadtabsummaryloader = true
        } else {
            this.Downloadtabloader = true;
        }

        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Useraadhaar: this.oSession.aadhaar,
            Reportstype: Reporttype,
            Batch_code: this.selected_batchcode.Batch_code
        };
        this.commonService.Post_json(report_atktbatchsemesterstudents, jsonin).subscribe((response) => {
            if (!response) return;
            UDownloadfiles(response.blobdata, response.excelfile)
            this.Downloadtabloader = false;
            this.Downloadtabsummaryloader = false;
        })
    }


}
