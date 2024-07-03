import * as myGlobals from '../../../globals/global-variable';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, UntypedFormBuilder, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {DatePipe, PlatformLocation, registerLocaleData,} from '@angular/common';
import {StudentprofileService} from './studentprofile.service';
import {HttpClient} from '@angular/common/http';
import {BilldeskPay} from '../../../../assets/javascript/billdesk';
import {
  BatchSubjects,
  BillDeskcheckSum,
  CheckSubjectGroupQuota,
  EducationDocuments_URL, formfeesreceivedv1_url,
  Get_educationdetails,
  get_personalinfo, IsProfileSubmited_URL,
  IU_Address,
  IU_Admission, IU_documentsubmited, IU_educationsubmited,
  IU_Nationalty,
  IU_Others,
  IU_Parents,
  IU_Personalinfo,
  IU_personalsubmited,
  IU_Reservations,
  IU_Reservations_new,
  IU_StudentEducation,
  PortalOpenv1,
  ProfileResources, batch,
  ProfileSubmited,
  Registerbatch,
  Serverlink,
  StudentBatch, StudentMyProfile_URL,
  StudentProfileStatus_url,
  StudentSubjectGroup,
  Upload_profile_photo, UploadDocuments,
  Batchs,
} from '../../../globals/global-api';
import {GlobalMessage} from '../../../globals/global.message';
import {CommanService} from "../../../globals/common.services";
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from '../../../models/request';
import {EncryptData, encryptUsingAES256,} from '../../../globals/encryptdata';
import {
  Education_Document,
  Ires_Batchs,
  Ires_education, Ires_personaldata,
  Ires_personalinfo, Ires_Profilesubmited,
  Ires_registerbatch,
  Ires_Upload_Document, Res_Document,
  Res_ProfileResources, res_singlebatch,
  Student_Documents_Education,
  Subjects_group_h,
} from '../../../models/responsemodel';
import localeEs from '@angular/common/locales/es';
import {ImageCroppedEvent, ImageTransform, LoadedImage,} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
// import {DashboardService} from '../../dashboard/dashboard.service';
import {Global_CurrentFinYear} from "../../../globals/global-variable";
import { Ires_getallbatchs } from '../../../models/response';
import { GridOptions } from 'ag-grid-community';

registerLocaleData(localeEs);

type MyArrayType = Array<{ value: string }>;

@Component({
  selector: 'app-fillprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentprofileComponent implements OnInit {

  BatchNames!:Ires_getallbatchs[];
  Batchkeyword = 'Batch_Name';

  Selected_batchname!:Ires_getallbatchs;
  checkbox_personal: boolean = false;

  checkbox_percentage: boolean = true;

  items = [1, 2, 3, 4, 5, 6, 7];
  activePane = 0;

  Pagename!: string;
  FormFessBatchcode: number = 0;

  gender = [''];
  religion = [''];
  mother_tongue = [''];
  martial_status = [''];

  relation = [''];
  occupation = [''];
  annual_income = [''];
  nominee_relation = [''];


  location_area = [''];
  country = [''];
  state = [''];
  district = [''];
  bloodgroup = [''];

  reservation = [''];
  category = [''];
  specially_abled = [''];
  activity = [''];
  participation_level = [''];
  secured_rank = [''];

  hidepersonaltab = false;

  invoice: any;
  ReceiptID: any;
  ReceiptNo: any;

  PersonalBadge = false;
  ReservationBadge = false;
  EducationBadge = false;
  SubjectGroupCode: any;

  changeStateReservation = false;
  changeStatePersonal = false;
  QuotaStatus: any;
  BatchObject!: Ires_Batchs;
  DocumentTypeValue: any;
  optionValue: any = 'none';

  EducationTab = true;
  eduButtonDisableTab = true

  // EducationDetailsForm!: UntypedFormGroup;
  // reservationDetailsForm!: UntypedFormGroup;

  checkfinaleducationSubmit!: FormGroup;

  studentDetailsForm!: FormGroup;
  personalDetailsForm!: FormGroup;
  reservationdetailForm!: FormGroup;
  DocumentTypeForm!: FormGroup;
  finalsubmitForm!: FormGroup;
  educationdetailForm!: FormGroup;

  checkfinalSubmit!: FormGroup;
  ShowStudentForm!: FormGroup;

  Profilepictform!: FormGroup;
  parentDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  nationalitynomineeForm!: FormGroup;
  otherDetailsForm!: FormGroup;

  documentUploadForm!: FormGroup

  FeesAdmissionForm!: FormGroup;

  checkfinalReservationSubmit!: FormGroup;

  submitted = false;
  SSCSubmit = false;
  reservationSubmit = false;
  modalSubmit = false;
  documentSubmit = false;

  ProfileData: any;
  ReservationData: any;
  res: any;
  data: any;

  res_singlebatch!: res_singlebatch;

  rowss: any = [];
  gridOptions: any;
  gridOptions_document: any;

  college!: number;
  marks: any;
  boards: any;
  batch_name: any;
  finyear: any;
  collegecode: any;
  CheckPercentagesgpa: any;
  Value_Sgpapercentage: any

  //Images Upload and Fill Profile
  adhaar_img!: Array<File>;
  signature_img!: Array<File>;
  profile_img!: Array<File>;

  doc_pdffile!: Array<File>;

  doc_category!: File;
  doc_eligible!: File;
  doc_reservatino!: File;
  doc_ration!: File;

  formData = new FormData();
  date: any;

  selectresponse: any;
  imageError: any;
  cardImageBase64: any;
  cardImageBase66: any;
  cardImageBase68: any;

  isImageSaved: boolean = false;
  isImageSaved2: boolean = false;
  isImageSaved3: boolean = false;

  public imagePath: any;
  photo: any;
  sign: any;
  public message!: string;

  //Get Education Details
  board: any;

  Education!: Student_Documents_Education;
  UploadDocuments: any;

  //Modal
  resp_Abatchs: Ires_registerbatch[] = [];
  selected_batch!: Ires_registerbatch

  selected_document!: Ires_education;
  selected_subject!: Subjects_group_h;

  batchSubjects: any;
  batchcode: any;
  SubjectGroups: any;
  imagefile: any

  studentpercent = 0;

  SubjectGroupID: any;
  formAmount: any;

  BatchCode: any;

  billdeskRequestMsg: any;
  DocumentTab = true;
  changeStateEducation = false;

  public paymentmodalform = false;

  tabfivedisable = true;

  openoneacc = false;
  opentwoacc = false;

  IUStudentDetails: any;
  IU_parentdetails: any;

  documentType!: any;

  //Badge

  personalDetailBadge = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  containWithinAspectRatio = false;

  private Uploadprofilepicture!: File;
  private pngfilename: string = '';
  public imageURL!: string;

  canvasRotation = 0;
  transform: ImageTransform = {};

  imageChanged_signEvent: any = '';
  croppedsignImage: any = '';
  containWithinsignAspectRatio = false;

  private Uploadsignfile!: File;
  private pngsignfilename: string = '';
  public signimageURL!: string;

  signcanvasRotation = 0;
  signtransform: ImageTransform = {};

  Ires_photo: any;

  selctgen!: any;

  res_educationsubmitted: any;

  educationdocumenttype!: true;

  doc_name!: Education_Document[];
  documentType_selected!: any;

  upload_documnet!: Ires_Upload_Document[];

  res_education!: Ires_education[];

  oSession!: Sessiondata;

  // get_personaldetail!: Ires_personalinfo;
  get_personaldetail!: Ires_personaldata;

  res_documentsubmitted: any

  education!: Ires_education;

  personalsubmitted: any;

  FormFees: any;

  visiblebatch = false;

  visivlebatch_atkt = false;

  regbatchname = '';

  aSubjects!: Subjects_group_h[];


  Ires_ProfileResources!: Res_ProfileResources

  selected_edu!: Ires_education;

  private gridApi: any;

  res_finalsubmitprofile: any;
  private gridApi_document: any;

  public rowSelection: 'single' | 'multiple' = 'single';
  public rowSelection_document: 'single' | 'multiple' = 'single';


  Selected_cat!: any

  Selected_abled!: any

  Selected_otherreservation!: any;

  batchstream!: "NONE";
  hindilinguistic!: 'NO';
  inhouse!: 'NO';

  //Badge

  PhotoBadge = false;
  alleducation: boolean = false;

  documentbtn = true;
  res_Profilesubmited!: Ires_Profilesubmited;

  //Runtime Form

  formGroup!: FormGroup;

  CASTECODE = '70'
  DISABILITYCODE = '80'
  RESERVATIONCODE = '888'
  RATIONCODE = '130'
  ProfilephotoImage: any;
  SignatureImage: any;

  
  constructor(
    private http: HttpClient,
    private sessionservice: SessionService,
    private router: Router,
    private commonService: CommanService,
    private activeroute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private globalmessage: GlobalMessage,
    public datepipe: DatePipe,
  ) {

    this.gridApi_document = <GridOptions>{
      context: {
        componentParent: this
      }
    };

  }

  @ViewChild('content') content: any;
  @ViewChild('item1') item1: any;
  @ViewChild('res_table') res_tablehtml: any;

  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice);
    this.oSession.Getdatafromstroage();


    console.log('SESSS__________', this.oSession)

    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };

    this.GetBatchApi();

    this.ProfileResource();

    /// this.isProfileSubmited();


    if (this.oSession.maxbatchlevel == 3 &&
      this.oSession.maxadmissionboard == 'UG') {

      if (this.oSession.submittedyear! < myGlobals.Global_CurrentFinYear) {

      }
    }

    this.CreateForm();

  }

  // DynamicForm() {

  //   //https://stackblitz.com/edit/angular-dynamic-form-loop?file=src%2Fapp%2Fapp.component.html
  //   this.formGroup = this.formBuilder.group({
  //     participant: this.formBuilder.array([
  //       // this.getParticipant()
  //     ])
  //   });

  //   const control = <FormArray>this.formGroup.controls['participant'];

  //   // for (const data of this.get_personaldetail.education) {
  //   //   control.push(this.getParticipant(data));
  //   // }

  //   let nLoop = 0

  //   for (let edu_data of this.get_personaldetail.education) {
  //     let control = <FormArray>this.formGroup.controls['participant'];
  //     control.controls[nLoop].patchValue(edu_data)
  //     nLoop++
  //   }
  // }


  // private getParticipant(data: Ires_education) {
  //   return this.formBuilder.group({

  //       board: ['', [Validators.required]],
  //       state: ['', [Validators.required]],
  //       education_board: ['', [Validators.required]],
  //       college_name: ['', [Validators.required]],
  //       datepass: ['', [Validators.required]],
  //       rollno: ['', [Validators.required]],
  //       marksheetno: ['', [Validators.required]],
  //       marksobtained: [''],
  //       outoff: [''],
  //       percentage: [''],
  //       file: [''],
  //       sgpa: ['', [Validators.required]],
  //       checkpercentagesgpa: ['', [Validators.required]],
  //       sgpa_percentage: ['', [Validators.required]],
  //       document_code: data.document_code,
  //       document_type: data.document_type,
  //       document_type_name: data.document_type,
  //       finyear: data.finyear,
  //       college_code: data.college_code,
  //       aadhaar: data.aadhaar,

  //       // batchstream: this.batchstream,
  //       // inhouse: ['NO'],
  //       // hindilinguistic: this.hindilinguistic,

  //     }
  //   )

  // }

  Batch_selected() {
    if (this.selected_batch.Batch_code > 0) {
      this.SelectBatchSubjects(this.selected_batch.Batch_code);
    }
  }


  DisplaySubjects() {
    if (this.oSession.studenttype == 'OUTSIDE') {
      this.regbatchname = this.oSession.registerbatchname?.trim()!;
      this.visiblebatch = true;
      //hARSH
      // this.FeesAdmissionForm.controls['batch_name'].setValue(this.regbatchname);
      // this.SelectBatchSubjects();
      console.log('batchnamee::', this.regbatchname)

    } else {
      this.visivlebatch_atkt = true;
      this.visiblebatch = false;
    }
  }

  CreateForm() {

    this.ShowStudentForm = this.formBuilder.group({
      aadharNo: ['', Validators.required],
      userbatch: ['', Validators.required],
    });

    this.studentDetailsForm = this.formBuilder.group({

      firstname: ['', Validators.required],
      lastname: [''],
      fathername: ['', Validators.required],
      mothername: ['', Validators.required],
      gender: [''],
      dob: ['', Validators.required],
      placeofbirth: [''],
      religion: [''],
      mothertongue: [''],
      marital_status: [''],
      applicant_name_on_marksheet: ['', Validators.required],
      name_change_after_passing: [''],
      // nameLCstudent: ['', Validators.required],
      // nameChangestudent: ['', Validators.required],
    });


    this.Profilepictform = this.formBuilder.group({
      picture: [''],
      croped: [''],
      upload: ['', Validators.required],
      upload_signature: ['', Validators.required],
      picture_sign: [''],
      croped_sign: [''],
    });

    this.parentDetailsForm = this.formBuilder.group({
      parentsemailid: [''],
      parentsmobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      relationtype: [''],
      occupation_guardian: ['', Validators.required],
      annual_income: [''],
      ebc: [''],
    });

    this.addressDetailsForm = this.formBuilder.group({
      correpondence_flatno: ['', Validators.required],
      correpondence_colonyname: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      correpondence_villagename: [''],
      correpondence_landmark: ['', Validators.maxLength(60)],
      correpondence_location_area: ['', Validators.required],
      correpondence_country: ['', Validators.required],
      correpondence_state: ['', Validators.required],
      correpondence_district: ['', Validators.required],

      correpondence_city: ['', [Validators.required, Validators.maxLength(60)]],

      correpondence_pincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],

      permanent_flatno: ['', Validators.required],
      permanent_colonyname: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      permanent_villagename: [''],
      permanent_landmark: ['', Validators.maxLength(60)],
      permanent_location_area: ['', Validators.required],
      permanent_country: ['', Validators.required],
      permanent_state: ['', Validators.required],
      permanent_district: ['', Validators.required],
      permanent_city: ['', [Validators.required, Validators.maxLength(60)]],
      permanent_pincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      same_as_permenant: [''],
    });

    this.nationalitynomineeForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      nomineename: ['', Validators.required],
      nomineedob: ['', Validators.required],
      nomineerelation: ['', Validators.required],
    });

    this.otherDetailsForm = this.formBuilder.group({
      Pan: [''],
      voterid: [''],
      educationgap: ['', Validators.required],
      bloodgroup: [''],
      maxqualification_family: [''],
      organ_donation: [''],
    });

    this.reservationdetailForm = this.formBuilder.group({

      opencategory: [''],
      parallel_reservation: [''],
      category: ['', Validators.required],
      subcategory: [''],
      specially_abled: [''],
      percentage: [''],
      udid_no: [''],

      checkotherreservation: [''],
      checkspeciallyabled: [''],
    });


    this.finalsubmitForm = this.formBuilder.group({
      checkOne: ['', Validators.required],
      checktwo: ['', Validators.required],
      checkthree: ['', Validators.required],
    });

    this.documentUploadForm = this.formBuilder.group({
      documentUpload: ['', Validators.required],
      checkprofile_document: ['', Validators.required],

    });

    this.checkfinalSubmit = this.formBuilder.group({
      checkprofile: ['', Validators.required],
    });

    this.checkfinalReservationSubmit = this.formBuilder.group({
      checkprofilereservation: ['', Validators.required],
    });

    this.checkfinaleducationSubmit = this.formBuilder.group({
      checkeducationsubmitted: ['', Validators.required],
    });


    if (this.oSession.isprofilesubmited == 'true') {

      this.tabfivedisable = true

      console.log('bvnbv')
      this.parentDetailsForm.disable();
      this.addressDetailsForm.disable();
      this.nationalitynomineeForm.disable();
      this.otherDetailsForm.disable();
      this.reservationdetailForm.disable();

    }

    if (this.oSession.formfeesrecieved == 'NOTPAID') {
      this.router.navigate(['/formfees'])
    }

    this.formGroup =  this.formBuilder.group({

      board: ['', [Validators.required]],
      state: ['', [Validators.required]],
      education_board: ['', [Validators.required]],
      college_name: ['', [Validators.required]],
      datepass: ['', [Validators.required]],
      rollno: ['', [Validators.required]],
      marksheetno: ['', [Validators.required]],
      marksobtained: [''],
      outoff: [''],
      percentage: [''],
      file: [''],
      sgpa: ['', [Validators.required]],
      checkpercentagesgpa: ['', [Validators.required]],
      sgpa_percentage: ['', [Validators.required]],
      document_type: ['', [Validators.required]],

    });

    // this.getPersonalInfo();
  }

  Finalsubmit_enable() {


    // if (
    //     this.get_personaldetail.pagesubmited == true &&
    //     this.get_personaldetail.reservationsubmited == true &&
    //     this.get_personaldetail.educationsubmited == true
    // ) {
    //
    //
    //
    //     console.log('asdazc')
    //
    // }
  }

  get ssf() {
    return this.ShowStudentForm.controls;
}

  get sdf() {
    return this.studentDetailsForm.controls;
  }

  get pdf() {
    return this.parentDetailsForm.controls;
  }

  get adf() {
    return this.addressDetailsForm.controls;
  }

  get nnf() {
    return this.nationalitynomineeForm.controls;
  }

  get odf() {
    return this.otherDetailsForm.controls;
  }


  // get f5() {
  //   return this.EducationDetailsForm.controls;
  // }


  get rdf() {
    return this.reservationdetailForm.controls;
  }

  get edf() {
      return this.formGroup.controls;
  }

  Admission_formpayment() {
    this.paymentmodalform = !this.paymentmodalform;
    //ShiVam
    // this.modalService.open(this.content, this.NgbModalOptions);

    //Harsh
    // this.modalSelectBatch();
  }


  // ProfileSubmited() {
  //     this.StudentProfileStatus();
  //     let jsonin = {
  //         Finyear: this.oSession.finyear,
  //         Collegecode: this.oSession.collegecode,
  //         Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
  //         BatchCode: this.oSession.register_batchcode,
  //     };
  //
  //     if (
  //         this.ProfileAadhaar != 0 &&
  //         this.ProfileEducation != false &&
  //         this.ProfileReservation != 0
  //     ) {
  //         this.commonService
  //             .Post_json(ProfileSubmited, jsonin)
  //             .subscribe((response) => {
  //                 if (response.data == true) {
  //                     this.globalmessage.Show_message(
  //                         'Complete Profile Saved Successfully!'
  //                     );
  //                     this.personalDetailsForm.disable();
  //                     // this.EducationDetailsForm.disable();
  //                     // this.reservationDetailsForm.disable();
  //                     this.DocumentTypeForm.disable();
  //                     this.changeStateReservation = true;
  //                     this.changeStateEducation = true;
  //                     this.changeStatePersonal = true;
  //
  //                     this.router.navigate(['/dashboard']);
  //                 }
  //             });
  //     } else {
  //         // this.changeStateFinalSubmit = true;
  //         this.globalmessage.Show_error(
  //             'Profile Not Submitted! Please Complete Your Personal/Reservation/Education Details!'
  //         );
  //     }
  // }

  GetEducationDocuments() {

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Batchcode: this.oSession.register_batchcode,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
    };

    this.commonService
      .Post_json(EducationDocuments_URL, jsonin)
      .subscribe((response) => {
        const hasKey = 'data' in response;
        if (hasKey) {
          this.Education = response.data;
        } else {
          this.Education = response;
        }

        this.doc_name = response.data.Education;
        this.upload_documnet = response.data.UploadDocuments;

        if (this.Education.Education == null) {
          this.EducationTab = false;
        }
      });
  }

  Batch_api() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
    };


    this.commonService
      .Post_json(StudentBatch, jsonin)
      .subscribe((response) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.resp_Abatchs = response.data;
        } else {
          this.resp_Abatchs = response;
        }

      });
  }

  Register_Batch_api() {
    let single_batch: Ires_registerbatch;

    let jsonin = {
      Batch_code: this.oSession.register_batchcode
    };

   

    this.commonService

      .Post_json(Registerbatch, jsonin)
      .subscribe((response) => {


        // this.resp_Abatchs.push(single_batch)
        this.resp_Abatchs.push(response.data)

        console.log('ressss', this.resp_Abatchs)

        // const hasKey = 'data' in response;
        // if (hasKey) {
        //
        //   single_batch = response.data
        //   this.resp_Abatchs = single_batch
        // } else {
        //   single_batch = response
        //   this.resp_Abatchs = single_batch;
        // }


        this.SelectBatchSubjects(this.oSession.register_batchcode!);
      });
  }

  modalSelectBatchSubjects() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      Batchcode: this.oSession.register_batchcode,
      aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
    };

    this.commonService
      .Post_json(StudentSubjectGroup, jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.batchSubjects = response.data;
        }
      });
  }


  CheckSubjectGroupQuota() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.Batch_code,
      subjectgroupid: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      quota_status: 'XXXX',
    };

    

    this.commonService
      .Post_json(CheckSubjectGroupQuota, jsonin)
      .subscribe((response) => {
        if (response.data != null) {
          this.QuotaStatus = response.data[0].Quota_status;

          if (this.QuotaStatus != 'OPEN') {
            this.globalmessage.Show_message(
              'Quota Closed! Select Different Group Code.'
            );

            this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
            this.SubjectGroups = '';
          }
        }
      });
  }

  Btn_Payment() {


    this.modalSubmit = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: myGlobals.Golbal_CollegeCode,
      aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      batch_code: this.selected_batch.Batch_code,
      subject_group_id: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
    };


    this.commonService
      .Post_json(IU_Admission, jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.ReceiptID = response.data.ReceiptID;
          this.ReceiptNo = response.data.ReceiptNo;
          if (this.ReceiptID > 0) {
            this.RegistrationPayment();
          }
        }
      });
  }

  RegistrationPayment() {
    let nTranscationamount: string = '';
    console.log('version ', this.oSession.demo);
    if (this.oSession.demo == 'true') {
      nTranscationamount = '1';
      this.formAmount = '1';
    } else {
      nTranscationamount = String(this.formAmount);
    }

    let billdeskmsg = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.Batch_code,
      aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      termcode: myGlobals.Global_FORMFEESTERMNAME,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: nTranscationamount,
      //TxnAmount: String(this.formAmount),
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
      AdditionalInfo3: String(this.selected_batch.Batch_code),
      AdditionalInfo4: String( this.ShowStudentForm.controls['aadharNo'].value),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };

    // let input_json = {
    //   Input: encryptUsingAES256(billdeskmsg),
    // };

    this.commonService
      .Post_json(BillDeskcheckSum, billdeskmsg)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        console.log(this.billdeskRequestMsg);
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg,'','' );
        }
      });
  }

  Update_EducationDetails() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      Document_Type: '',
    };

  }


  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
      return true;
    } else {
      return false;
    }
  }


  Aadhar_fileChange(element: any) {
    this.adhaar_img = element.target.files;
    if (
      this.adhaar_img[0].type == 'image/jpeg' ||
      this.adhaar_img[0].type == 'image/png'
    ) {
      if (this.adhaar_img[0].size < 2400000) {
        this.fileChangeEvent(element, 3);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Sign_fileChange(element: any) {
    this.signature_img = element.target.files;
    if (
      this.signature_img[0].type == 'image/jpeg' ||
      this.signature_img[0].type == 'image/png'
    ) {
      if (this.signature_img[0].size < 2400000) {
        this.fileChangeEvent(element, 2);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Profile_fileChange(element: any) {
    this.profile_img = element.target.files;
    if (
      this.profile_img[0].type == 'image/jpeg' ||
      this.profile_img[0].type == 'image/png'
    ) {
      if (this.profile_img[0].size < 2400000) {
        this.fileChangeEvent(element, 1);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed');

      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  fileChangeEvent(fileInput: any, id: number) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      // const max_size = 20971520;
      // const allowed_types = ['image/png', 'image/jpeg'];
      // const max_height = 15200;
      // const max_width = 25600;

      // if (fileInput.target.files[0].size > max_size) {
      //   this.imageError =
      //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      //   return false;
      // }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          if (id == 1) {
            console.log('kkkkk');
            this.cardImageBase64 = e.target.result;
            this.isImageSaved = true;
          } else if (id == 2) {
            this.cardImageBase66 = e.target.result;
            this.isImageSaved2 = true;
          } else if (id == 3) {
            this.cardImageBase68 = e.target.result;
            this.isImageSaved3 = true;
          }

          // this.previewImagePath = imgBase64Path;
          // }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(id: any) {
    if (id == 1) {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    } else if (id == 2) {
      this.cardImageBase66 = null;
      this.isImageSaved2 = false;
    } else if (id == 3) {
      this.cardImageBase68 = null;
      this.isImageSaved3 = false;
    }
  }

  PortalOpen(event: any) {
    this.BatchCode = event.Batch_Code;
    this.formAmount = event.FormAmount;

    if (this.oSession.demo == 'true') {
      this.formAmount = '1';
    }

    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchCode,
    };
    this.commonService.Post_json(PortalOpenv1, jsonin).subscribe((response) => {
      if (response != null) {
        if (response.data.Admissionstarted == true) {
          this.modalSelectBatchSubjects();
        } else {
          // this.FeesAdmissionForm.controls['batch'].setValue('');

          this.globalmessage.Show_message(
            'Admission Closed for this Particular Batch!'
          );

          this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        }
      }
    });
  }

  handleLiveDemoChange(event: any) {
    this.paymentmodalform = event;
  }


  onSavedetails() {


    if(this.ShowStudentForm.controls['aadharNo'].value == null){
      this.globalmessage.Show_error('Please Enter the Student aadhar');
      return
    }
    
    this.studentDetailsForm.addControl('finyear', new FormControl('', []));
    this.studentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);

    this.studentDetailsForm.addControl('college_code', new FormControl('', []));
    this.studentDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    

    this.studentDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.studentDetailsForm.controls['aadhaar'].setValue(this.ShowStudentForm.controls['aadharNo'].value);

    
    this.commonService
      .Post_json(IU_Personalinfo, this.studentDetailsForm.value)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IUStudentDetails = response;
        this.globalmessage.Show_successmessage('Data updated successfully')
        this.getPersonalInfo();
      });
  }

  IU_Parents() {

    this.parentDetailsForm.addControl('finyear', new FormControl('', []));
    this.parentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);

    this.parentDetailsForm.addControl('college_code', new FormControl('', []));
    this.parentDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    this.parentDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.parentDetailsForm.controls['aadhaar'].setValue(this.ShowStudentForm.controls['aadharNo'].value);

    // let input_json = {
    //   Input: encryptUsingAES256(this.parentDetailsForm.value),
    // };

    this.commonService
      .Post_json(IU_Parents, this.parentDetailsForm.value)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.getPersonalInfo();
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  IU_Address() {

    this.addressDetailsForm.addControl('finyear', new FormControl('', []));
    this.addressDetailsForm.controls['finyear'].setValue(this.oSession.finyear);

    this.addressDetailsForm.addControl('college_code', new FormControl('', []));
    this.addressDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    this.addressDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.addressDetailsForm.controls['aadhaar'].setValue(this.ShowStudentForm.controls['aadharNo'].value);

    // let input_json = {
    //   Input: encryptUsingAES256(this.addressDetailsForm.value),
    // };

    this.commonService
      .Post_json(IU_Address, this.addressDetailsForm.value)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;

        this.globalmessage.Show_successmessage('Data uploaded successfully');
        this.getPersonalInfo()
      });
  }

  //Get Details


  getPersonalInfo() {

   
    
    let jsonin = {
      College_code: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar: this.ShowStudentForm.controls['aadharNo'].value,
      batch_code: this.Selected_batchname.Batch_Code
    };

    console.log('sjsonin:',jsonin)

    this.commonService
      .Post_json(get_personalinfo, jsonin)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('No data found');
          return
        }

        const hasKey = 'data' in response;
        if (hasKey) {
          this.get_personaldetail = response.data;
        } else {
          this.get_personaldetail = response;
        }


        this.ProfilephotoImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.get_personaldetail.Photo_image}`);

        this.SignatureImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.get_personaldetail.Signature_image}`);


        if (this.get_personaldetail.firstname.length > 0) {

          this.studentDetailsForm.controls['gender'].setValue(this.get_personaldetail.gender)
          this.studentDetailsForm.patchValue(this.get_personaldetail);
          this.studentDetailsForm.disable();
          this.hidepersonaltab = true;

        }

        if (this.get_personaldetail.pagesubmited == true &&
          this.get_personaldetail.reservationsubmited == true &&
          this.get_personaldetail.educationsubmited == true) {


          this.tabfivedisable = false;

        }


        if (this.get_personaldetail.parentsubmited && this.get_personaldetail.othersubmited &&
          this.get_personaldetail.nationalitysubmited &&
          this.get_personaldetail.addresssubmited && this.get_personaldetail.photosubmited
        ) {
          this.checkbox_personal = true;
        }

        //
        // if (this.get_personaldetail.firstname.length <= 0) {
        //   // this.studentDetailsForm.disable();
        //
        //   // this.parentDetailsForm.disable();
        //   // this.addressDetailsForm.disable();
        //   // this.nationalitynomineeForm.disable();
        //   // this.otherDetailsForm.disable();
        //   // this.reservationdetailForm.disable();
        // } else {

        this.Check_alleducation_filled();
        //

        this.parentDetailsForm.patchValue(this.get_personaldetail.parents);

        this.addressDetailsForm.patchValue(this.get_personaldetail.address);

        this.nationalitynomineeForm.patchValue(
          this.get_personaldetail.nationality
        );

        this.otherDetailsForm.patchValue(this.get_personaldetail.other);


        this.reservationdetailForm.patchValue(
          this.get_personaldetail.reservation
        );

        if (this.oSession.isprofilesubmited == 'true') {
          this.tabfivedisable = true;
        }


        // this.DynamicForm();
        this.Finalsubmit_enable();
        // this.Check_alldocument_filled();


      });


  }

  Educationtabechange() {

    const control = <FormArray>this.formGroup.controls['participant'];

    let nLoop = 0
    for (const responseElement of this.get_personaldetail.education) {

      if (responseElement.rowsubmited == true) {
        control.controls[nLoop].disable();
      }

      nLoop++

    }
    console.log('Shivam')
  }

  IU_Nationalty() {
    this.nationalitynomineeForm.addControl('finyear', new FormControl('', []));
    this.nationalitynomineeForm.controls['finyear'].setValue(
      this.oSession.finyear
    );

    this.nationalitynomineeForm.addControl(
      'college_code',
      new FormControl('', [])
    );
    this.nationalitynomineeForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    this.nationalitynomineeForm.addControl('aadhaar', new FormControl('', []));
    this.nationalitynomineeForm.controls['aadhaar'].setValue(
      this.ShowStudentForm.controls['aadharNo'].value
    );

    // let input_json = {
    //   Input: encryptUsingAES256(this.nationalitynomineeForm.value),
    // };

    this.commonService
      .Post_json(IU_Nationalty, this.nationalitynomineeForm.value)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.getPersonalInfo();
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  IU_Others() {
    this.otherDetailsForm.addControl('finyear', new FormControl('', []));
    this.otherDetailsForm.controls['finyear'].setValue(this.oSession.finyear);

    this.otherDetailsForm.addControl('college_code', new FormControl('', []));
    this.otherDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    this.otherDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.otherDetailsForm.controls['aadhaar'].setValue(this.ShowStudentForm.controls['aadharNo'].value);

    // let input_json = {
    //   Input: encryptUsingAES256(this.otherDetailsForm.value),
    // };

    this.commonService
      .Post_json(IU_Others, this.otherDetailsForm.value)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.getPersonalInfo();
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  Opencategory() {

    if (this.reservationdetailForm.controls['opencategory'].value == 'OPEN') {

      this.reservationdetailForm.controls['category'].removeValidators(Validators.required)
      this.reservationdetailForm.controls['category'].updateValueAndValidity();
    }
  }

  saveReservDetails() {

    if (this.res_singlebatch.Rationcard == 1) {
      if (this.doc_ration == null) {
        this.globalmessage.Show_error('Please upload ration card')
        return
      }
    }


    this.reservationdetailForm.addControl('finyear', new FormControl('', []));
    this.reservationdetailForm.controls['finyear'].setValue(
      this.oSession.finyear
    );

    this.reservationdetailForm.addControl(
      'college_code',
      new FormControl('', [])
    );
    this.reservationdetailForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );

    this.reservationdetailForm.addControl('aadhaar', new FormControl('', []));
    this.reservationdetailForm.controls['aadhaar'].setValue(
      this.ShowStudentForm.controls['aadharNo'].value
    );

    // if (this.doc_category.name.length > 0) {
    //
    //     this.reservationdetailForm.addControl('Castecode', new FormControl('', []));
    //     this.reservationdetailForm.controls['Castecode'].setValue(
    //         this.CASTECODE
    //     );
    // }
    //
    // if (this.doc_eligible.name.length > 0) {
    //
    //     this.reservationdetailForm.addControl('disabilitycode', new FormControl('', []));
    //     this.reservationdetailForm.controls['disabilitycode'].setValue(
    //         this.DISABILITYCODE
    //     );
    // }
    //
    // if (this.doc_reservatino.name.length > 0) {
    //
    //     this.reservationdetailForm.addControl('reservationcode', new FormControl('', []));
    //     this.reservationdetailForm.controls['reservationcode'].setValue(
    //         this.RESERVATIONCODE
    //     );
    // }

    if (this.res_singlebatch.Rationcard == 1) {

      this.reservationdetailForm.addControl('rationcode', new FormControl('', []));
      this.reservationdetailForm.controls['rationcode'].setValue(
        this.RATIONCODE
      );
    }

    console.log('value', this.reservationdetailForm.value);

    let formdata = new FormData();

    formdata.append('input_form', encryptUsingAES256(this.reservationdetailForm.value));

    // if (this.doc_category.name.length > 0) {
    //     formdata.append(this.CASTECODE, this.doc_category);
    // }
    // if (this.doc_eligible.size > 0) {
    //     formdata.append(this.DISABILITYCODE, this.doc_eligible);
    // }
    // if (this.doc_reservatino.size > 0) {
    //     formdata.append(this.RESERVATIONCODE, this.doc_reservatino);
    // }

    if (this.res_singlebatch.Rationcard == 1) {
      formdata.append(this.RATIONCODE, this.doc_ration);
    }

    this.commonService.Post_formdata(IU_Reservations_new, formdata).subscribe((response) => {

      if (response.data == true) {
        this.globalmessage.Show_message('Data uploaded successfully');
        this.getPersonalInfo();
      }
    });

    // let input_json = {
    //   Input: encryptUsingAES256(this.reservationdetailForm.value),
    // };
    //
    // this.commonService
    //   .Post_json(IU_Reservations, input_json)
    //   .subscribe((response) => {
    //     if (response) {
    //       this.globalmessage.Show_message('Data uploaded successfully');
    //     }
    //   });
  }

  saveEDUdetails() {

    this.formGroup.addControl('finyear', new FormControl('', []));
    this.formGroup.controls['finyear'].setValue(this.selected_document.finyear);

    this.formGroup.addControl('college_code', new FormControl('', []));
    this.formGroup.controls['college_code'].setValue(this.selected_document.college_code);

    this.formGroup.addControl('aadhaar', new FormControl('', []));
    this.formGroup.controls['aadhaar'].setValue(this.selected_document.aadhaar);

    this.formGroup.addControl('document_code', new FormControl('', []));
    this.formGroup.controls['document_code'].setValue(this.selected_document.document_code);

    this.formGroup.addControl('uploadedfilename', new FormControl('', []));
    this.formGroup.controls['uploadedfilename'].setValue(this.imagefile[0].name);

    if (this.formGroup.controls['checkpercentagesgpa'].value == "YES") {
      if (this.formGroup.controls['sgpa'].value > 0) {

        if (this.formGroup.controls['sgpa'].value > 10) {
          this.formGroup.controls['sgpa'].setValue(0)
          this.globalmessage.Show_error('SGPA should be less than 10.')
          return;
        }
        this.formGroup.controls['sgpa_percentage'].setValue(this.formGroup.controls['sgpa'].value)

      } else {
        this.globalmessage.Show_error('Enter sgpa ')
        return;
      }
    } else {
      if (this.formGroup.controls['percentage'].value > 0) {
        this.formGroup.controls['sgpa_percentage'].setValue(this.formGroup.controls['percentage'].value)

      } else {
        this.formGroup.controls['sgpa_percentage'].value.sgpa_percentage = 0
        this.globalmessage.Show_error('Enter percentage ')
        return;
      }
    }


    // control.controls[rownumber].get('percentage')?.setValue(parseFloat(nper.toFixed(2)))


    if (this.imagefile == null) {
      this.globalmessage.Show_error('Please select the document')
      return
    }

    console.log('inputform', this.formGroup.value)

    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(this.formGroup.value))
    formdata.append('file', this.imagefile[0])


    this.commonService
      .Post_formdata(IU_StudentEducation, formdata)
      .subscribe((response) => {
        if (response != null) {
          if (response.data == true) {

            // this.get_documentdetail();
            this.globalmessage.Show_message('Education Details Saved.');
            // this.getPersonalInfo();
            this.imagefile = null;

          }
        }
      });


  }

  Check_alleducation_filled() {

    let lBreak = false
    this.checkbox_percentage = true    //disable
    for (const edu of this.get_personaldetail.education) {
      if (edu.sgpa_percentage <= 0) {
        lBreak = true
        break;
        //this.checkbox_percentage = false
        //break;
      }
    }

    if (!lBreak) {
      this.checkbox_percentage = false
    }

  }


  Check_alldocument_filled() {

    // this.documentbtn = false
    // this.documentbtn = true
    this.documentbtn = false

    for (const documentstatus of this.get_personaldetail.document) {


      console.log('nnnnn', documentstatus.document_status)
      if (documentstatus.document_status.length <= 0) {

        console.log('lllll')

        this.documentbtn = true
        break;
      }
    }

  }

  get_documentdetail() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
    };

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService
      .Post_json(Get_educationdetails, jsonin)
      .subscribe((response:any) => {
        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_education = response.data;
        } else {
          this.res_education = response;
        }
      });
  }

  selecteddoctype(event: any) {
    this.documentType = event;
    console.log('kssssadada', this.documentType);
  }

  get picture_fld() {
    return this.Profilepictform.get('picture');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    const filebeforecorp = this.imageChangedEvent.target.files[0];
    this.Uploadprofilepicture = new File([event.blob!], filebeforecorp.name, {
      type: 'PNG',
    });

    console.log('kkkkkk', this.Uploadprofilepicture);
  }

  image_signCropped(event: ImageCroppedEvent) {
    this.croppedsignImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl!
    );
    const filebeforecorp = this.imageChanged_signEvent.target.files[0];
    this.Uploadsignfile = new File([event.blob!], filebeforecorp.name, {
      type: 'PNG',
    });

    console.log('ooooo', this.Uploadsignfile);
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  imagesignLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  cropperSignReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.globalmessage.Show_message('Issue while loading image.');
    // show message
  }

  loadSignImageFailed() {
    this.globalmessage.Show_message('Issue while loading image.');
    // show message
  }

  showPreview(event: any) {
    this.pngsignfilename = ( this.ShowStudentForm.controls['aadharNo'].value! + Math.random()).toString();

    this.imageChangedEvent = event;

    const file = (event.target as HTMLInputElement).files![0];

    console.log('Selected file ', file);

    /*
    if (file.size > 50000) {
      this.globalmessage.Show_error('File size is more than 5 MB.');
      this.Profilepictform.reset();
      return;
    }
    */

    /*
    if (file.type != 'image/png') {
      this.globalmessage.Show_error('Only .png file allowed!');
      this.Profilepictform.reset();
      return;
    }
    */

    this.Profilepictform.patchValue({picture: file});
    this.Profilepictform.get('picture')!.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.croppedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  showPreview_sign(event: any) {
    this.pngfilename = ( this.ShowStudentForm.controls['aadharNo'].value! + Math.random()).toString();

    this.imageChanged_signEvent = event;

    const file = (event.target as HTMLInputElement).files![0];

    console.log('Selected file ', file);

    this.Profilepictform.patchValue({picture: file});
    this.Profilepictform.get('picture')!.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.signimageURL = reader.result as string;
      this.croppedsignImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  picture_fld_sign() {
    return this.Profilepictform.get('picture');
  }

  UploadImage() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar: this.ShowStudentForm.controls['aadharNo'].value,
    };

    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(jsonin));
    formdata.append('files', this.Uploadprofilepicture);
    formdata.append('files', this.Uploadsignfile);

    this.commonService
      .Post_formdata(Upload_profile_photo, formdata)
      .subscribe((response: any) => {
        this.Ires_photo = response.data;

        this.globalmessage.Show_message('Data uploaded successfully.');
        this.getPersonalInfo();
      });
  }

  xlsxUpload(element: any) {
    this.doc_pdffile = element.target.files;

    //this.doc_pdffile[0].name = 'prakash.dbf'
  }


  xlsxUpload_category(element: any) {
    this.doc_category = element.target.files[0];

    //this.doc_pdffile[0].name = 'prakash.dbf'
    console.log('pdf', this.doc_category)
  }

  xlsxUpload_eligible(element: any) {
    this.doc_eligible = element.target.files[0];
    //this.doc_pdffile[0].name = 'prakash.dbf'
    console.log('pdf', this.doc_eligible)
  }

  xlsxUpload_reservation(element: any) {
    this.doc_reservatino = element.target.files[0];
    //this.doc_pdffile[0].name = 'prakash.dbf'
    console.log('pdf', this.doc_eligible)
  }

  xlsxUpload_ration(element: any) {
    this.doc_ration = element.target.files[0];
    //this.doc_pdffile[0].name = 'prakash.dbf'
    console.log('pdf', this.doc_eligible)
  }


  PersonalSubmit() {
    // if()
    // this.submitpage = 1

    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      // pagesubmited: pagesubmitted
    };

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService
      .Post_json(IU_personalsubmited, jsonin)
      .subscribe((response:any) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your data');
        }

        const hasKey = 'data' in response;
        if (hasKey) {
          this.personalsubmitted = response.data;
        } else {
          this.personalsubmitted = response;
        }

        this.globalmessage.Show_successmessage('Data submitted successfully.')
        this.getPersonalInfo();
      });
  }


  EducationSubmit() {

    if (this.get_personaldetail.educationsubmited == true) {
      this.globalmessage.Show_error('You have already submitted education details.')
      return
    }

    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.ShowStudentForm.controls['aadharNo'].value,
      educationsubmited: this.checkfinaleducationSubmit.controls['checkeducationsubmitted'].value
    };

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService
      .Post_json(IU_educationsubmited, jsonin)
      .subscribe((response:any) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your data');
        }

        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_educationsubmitted = response.data;
        } else {
          this.res_educationsubmitted = response;
        }


        if (response.data == true) {

          this.getPersonalInfo();
          this.globalmessage.Show_successmessage('Data submitted successfully.')
        }

      });

  }


  Documentupload_Submit() {

    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.ShowStudentForm.controls['aadharNo'].value,
      documentsubmited: this.documentUploadForm.controls['checkprofile_document'].value
    };

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService.Post_json(IU_documentsubmited, jsonin).subscribe((response:any) => {

      const hasKey = 'data' in response;
      if (hasKey) {
        this.res_documentsubmitted = response.data;
      } else {
        this.res_documentsubmitted = response;
      }

      this.globalmessage.Show_successmessage('Documents uploaded successfully')

    })

  }

  SelectBatchSubjects(nBatchcode: number) {

    let jsonin = {
      BatchCode: nBatchcode,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService
      .Post_json(BatchSubjects, jsonin_input)
      .subscribe((response:any) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.aSubjects = response.data;
        } else {
          this.aSubjects = response;
        }

        this.DisplaySubjects();

      });
  }


  ProfileResource() {
    this.commonService
      .Post_json(ProfileResources, "")
      .subscribe((response:any) => {

        this.Ires_ProfileResources = response.data

        this.relation = this.Ires_ProfileResources.Relation_Type
        this.occupation = this.Ires_ProfileResources.occupation_guardian
        this.annual_income = this.Ires_ProfileResources.annual_income
        this.location_area = this.Ires_ProfileResources.Location_Area
        this.country = this.Ires_ProfileResources.country
        this.state = this.Ires_ProfileResources.State

        this.district = this.Ires_ProfileResources.district
        this.bloodgroup = this.Ires_ProfileResources.BloodGroup
        this.nominee_relation = this.Ires_ProfileResources.Nominee_Relation
        this.gender = this.Ires_ProfileResources.sex
        this.religion = this.Ires_ProfileResources.Religion
        this.mother_tongue = this.Ires_ProfileResources.mother_tongue
        this.martial_status = this.Ires_ProfileResources.Marital_Status
        this.reservation = this.Ires_ProfileResources.parallel_horizontal_reservation
        this.category = this.Ires_ProfileResources.category.slice(1)
        this.specially_abled = this.Ires_ProfileResources.specially_abled
        this.activity = this.Ires_ProfileResources.activity
        this.participation_level = this.Ires_ProfileResources.participation_level
        this.secured_rank = this.Ires_ProfileResources.secured_rank

        this.board = this.Ires_ProfileResources.College_University

      });
  }

  updateAddress(event: any) {

    if (event == 'Yes') {

      this.addressDetailsForm.controls['permanent_flatno'].setValue(
        this.addressDetailsForm.controls['correpondence_flatno'].value)

      this.addressDetailsForm.controls['permanent_colonyname'].setValue(
        this.addressDetailsForm.controls['correpondence_colonyname'].value)

      this.addressDetailsForm.controls['permanent_villagename'].setValue(
        this.addressDetailsForm.controls['correpondence_villagename'].value)

      this.addressDetailsForm.controls['permanent_landmark'].setValue(
        this.addressDetailsForm.controls['correpondence_landmark'].value)

      this.addressDetailsForm.controls['permanent_location_area'].setValue(
        this.addressDetailsForm.controls['correpondence_location_area'].value)

      this.addressDetailsForm.controls['permanent_country'].setValue(
        this.addressDetailsForm.controls['correpondence_country'].value)

      this.addressDetailsForm.controls['permanent_state'].setValue(
        this.addressDetailsForm.controls['correpondence_state'].value)

      this.addressDetailsForm.controls['permanent_district'].setValue(
        this.addressDetailsForm.controls['correpondence_district'].value)

      this.addressDetailsForm.controls['permanent_city'].setValue(
        this.addressDetailsForm.controls['correpondence_city'].value)

      this.addressDetailsForm.controls['permanent_pincode'].setValue(
        this.addressDetailsForm.controls['correpondence_pincode'].value)

    } else {
      this.addressDetailsForm.controls['permanent_flatno'].setValue('')

      this.addressDetailsForm.controls['permanent_colonyname'].setValue('')

      this.addressDetailsForm.controls['permanent_villagename'].setValue('')

      this.addressDetailsForm.controls['permanent_landmark'].setValue('')

      this.addressDetailsForm.controls['permanent_location_area'].setValue('')

      this.addressDetailsForm.controls['permanent_country'].setValue('')

      this.addressDetailsForm.controls['permanent_state'].setValue('')

      this.addressDetailsForm.controls['permanent_district'].setValue('')


      this.addressDetailsForm.controls['permanent_city'].setValue('')
    }
  }

  columnDefs = [

    {
      field: '', maxWidth: 50, checkboxSelection: true
    },

    {headerName: "Document type", field: "document_type", resizable: true},
    {headerName: "Board", field: "board", resizable: true},
    {headerName: "State", field: "state", resizable: true},
    {headerName: "Education Board", field: "education_board", resizable: true},
    {headerName: "College name", field: "college_name", resizable: true},
    {headerName: "Date Pass", field: "datepass", resizable: true},
    {headerName: "Roll No", field: "rollno", resizable: true},
    {headerName: "Marksheet", field: "marksheetno", resizable: true},
    {headerName: "Grade or Marks", field: "gradesormarks", resizable: true},
    {headerName: "Marks Obtained", field: "marksobtained", resizable: true},
    {headerName: "Out Off Marks", field: "outoff", resizable: true},
    {headerName: "Percentage", field: "percentage", resizable: true},
    // {headerName: "BatchStream", field: "batchstream", resizable: true},
    // {headerName: "Inhouse", field: "inhouse", resizable: true},
    // {headerName: "Hindilinguistic", field: "hindilinguistic", resizable: true},
  ];

  columnDefs_document = [

    {
      field: '', maxWidth: 50, checkboxSelection: true
    },

    {headerName: "Document Name", field: "document_type", resizable: true, maxWidth: 150},
    {headerName: "Uploaded File", flex: 1, field: "uploadedfilename", resizable: true},
    {headerName: "SGPA/Percentage", flex: 1, field: "sgpa_percentage", resizable: true},

  ];


  onRowSelected_documentEvent(event: any) {//on checkbox selection
    // console.log("row select", event.data)
  }


  onSelectionChanged(event: any) {


    let SelectedDoc = this.gridApi.getSelectedRows()

    this.selected_edu = SelectedDoc[0]

    console.log('selectededu:::', this.selected_edu)

    // this.educationdocumenttype = true;
  }


  onSelectiondocument_Changed(event: any) {

    let selected_document = this.gridApi_document.getSelectedRows();
    this.selected_document = selected_document[0]

    console.log('selecteddoccc:',this.selected_document)

    this.formGroup.patchValue(this.selected_document)


    if(this.selected_document.rowsubmited == true){
      this.formGroup.disable()
    }else {
      this.formGroup.controls['file'].setValue('')
      this.formGroup.enable();
    }


  }

  onGridReady(params: any) {
    this.gridApi = params.api

  };

  onGridReady_document(params: any) {
    this.gridApi_document = params.api
  };




  sgpa(rownumber: number) {


    let sSGPA = 0;

    const control = <FormArray>this.formGroup.controls['participant'];

    sSGPA = control.value[rownumber].sgpa

    let fSGPA = 0;
    if (typeof (sSGPA)) {

      fSGPA = parseFloat(sSGPA.toFixed(2))
    }

    // control.controls[rownumber].get('sgpa')?.setValue(fSGPA)

    console.log('Sgpa', fSGPA)
  }

  PercentageCalculater(rownumber: number) {

    let obtainedmarks = 0;
    let outoff = 0;
    let nper = 0;


    const control = <FormArray>this.formGroup.controls['participant'];

    obtainedmarks = control.value[rownumber].marksobtained
    outoff = control.value[rownumber].outoff

    // control.value[rownumber].percentage


    if (outoff <= 0) {
      control.controls[rownumber].get('percentage')?.setValue(parseFloat(nper.toFixed(2)))

      return;
    }

    if (obtainedmarks <= 0) {
      control.controls[rownumber].get('percentage')?.setValue(parseFloat(nper.toFixed(2)))

      return;
    }


    /* if (obtainedmarks > 100) {
       this.globalmessage.Show_error('Obtain marks should be < than 100')
       return;
     }*/

    nper = (obtainedmarks / outoff) * 100;

    if (nper > 100) {

      console.log('vvvvvvv')
      nper = 0
      control.controls[rownumber].get('percentage')?.setValue(parseFloat(nper.toFixed(2)))
      return
    }


    control.controls[rownumber].get('percentage')?.setValue(parseFloat(nper.toFixed(2)))


  }


  percentCalc() {
    // if(this.formGroup.controls['percentage'].value > 100){
    //   this.globalmessage.Show_error('kkkk')
    // }
  }


  Final_ProfileSubmitted() {

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      BatchCode: this.oSession.register_batchcode,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };

    this.commonService.Post_json(ProfileSubmited, jsonin_input).subscribe((response:any) => {

      this.res_finalsubmitprofile = response


      this.globalmessage.Show_successmessage("Data uploaded successfully.")

      this.router.navigate(['/dashboard']);

      // this.parentDetailsForm.disable();
      // this.addressDetailsForm.disable();
      // this.nationalitynomineeForm.disable();
      // this.otherDetailsForm.disable();
      // this.reservationdetailForm.disable();

    });

  }


  Categorydata: MyArrayType = [
    {value: 'YES'},
    {value: 'NO'},
  ]

  // Speciallyableddata: MyArrayType = [
  //     {id: true, name: 'Yes'},
  //     {id: false, name: 'No'},
  // ]
  //
  // Otherreservation: MyArrayType = [
  //     {id: true, name: 'Yes'},
  //     {id: false, name: 'No'},
  // ]
  //
  // Gender: MyArrayType = [
  //     {id: true, name: 'Gender'},
  //     {id: false, name: 'Female'},
  // ]

  isProfileSubmited() {

    let jsonin = {

      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar:  this.ShowStudentForm.controls['aadharNo'].value,
      BatchCode: this.oSession.register_batchcode,
    };

    console.log('ionput', jsonin)

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService
      .Post_json(IsProfileSubmited_URL, jsonin_input)
      .subscribe((response:any) => {

        this.res_Profilesubmited = response.data

        if (this.res_Profilesubmited.Profilesubmited == true) {


          this.parentDetailsForm.disable();
          this.addressDetailsForm.disable();
          this.nationalitynomineeForm.disable();
          this.otherDetailsForm.disable();
          this.reservationdetailForm.disable();
          this.educationdetailForm.disable();

        }

      });
  }

  onFileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.imagefile = event.target.files;


      reader.readAsDataURL(this.imagefile[0]);

      reader.onload = () => {

        console.log('reader', reader)

        this.formGroup.patchValue({
          file: reader.result
        });

        console.log('file', this.imagefile)

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();


      };
    }


  }

  GetBatchApi() { //Batch select list displaying
    this.commonService.Post_json(Batchs,'').subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
            // this.dialogService.open({ message: 'No data found! Please Configure ValueAdded..', positive: 'Ok', })//alert
            Swal.fire({
                title: 'Error!',
                text: 'No data found! Please Configure ValueAdded..',
                icon: 'error',
                confirmButtonText: 'OK'
            })//alert
        } else {
            this.BatchNames = response['data'];
        }
    })
}


  single_batch() {

    let jsonin = {
      Batchcode: this.Selected_batchname.Batch_Code,
    }

    // if (myGlobals.Global_CurrentFinYear == this.oSession.registerfinyear) {
    //   jsonin = {
    //     Batchcode: this.oSession.register_batchcode,
    //   };
    // } else {
    //   jsonin = {
    //     Batchcode: this.oSession.currentformfeesbatchcode!,
    //   };
    // }

    // let input_json = {
    //   Input: encryptUsingAES256(jsonin),
    // };

    this.commonService
      .Post_json(batch, jsonin)
      .subscribe((response:any) => {
        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_singlebatch = response.data;
        } else {
          this.res_singlebatch = response;
        }
      });
  }

  onTabChange($event: number) {
    this.activePane = $event;

    if (this.activePane == 1) {
      this.single_batch()
    }

    if (this.activePane == 2) {
      // this.Educationtabechange()
    }
  }


  Sgpa_Percentage(i: number) {

    const control = <FormArray>this.formGroup.controls['participant'];


    if (control.value[i].percentage || control.value[i].Sgpa_percentage) {

      console.log('llll')

    }


  }

  CheckBox_input(i: number) {

    const control = <FormArray>this.formGroup.controls['participant'];

    control.value[i].disableEdubtn = true
  }

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
  }

  ShowStudent(){
    this.getPersonalInfo();
  }

  protected readonly get_personalinfo = get_personalinfo;

}



