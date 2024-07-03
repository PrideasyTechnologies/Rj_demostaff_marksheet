export const EmailIP = 'https://admission.rjcollege.edu.in:7009'; //live new
export const CommonIP = 'https://admission.rjcollege.edu.in:7009';//demo new
export const ServerIP = 'https://admission.rjcollege.edu.in:7009';//live Staff

// export const ServerIP = 'https://admission.rjcollege.edu.in:7009';//live Staff

export const downurl = 'https://www.admission.rjcollege.edu.in';//Document approval pdf

export var baseURL = 'https://admission.rjcollege.edu.in:7009';

// export var baseURL = 'https://admission.rjcollege.edu.in:7009';

// const LocalURl = "https://localhost:7010"

// const LocalURl = "https://admission.rjcollege.edu.in:7006"


const STUDENTURL = baseURL + '/v1/Students/';
const FEESURL = baseURL + '/v1/Fees/';
const MARKSHEETURL = baseURL + '/v1/Marksheet/';
const MARKSHEETREPORTSURL = baseURL + '/v1/Marksheetreports';
const COMMONURL = baseURL + '/v1/Common/';
const EAZYURL = baseURL + '/v2/eazy/';
const BILLDESKURL = baseURL + '/v1/Billdesk/';
export const Feeslogin = CommonIP + '/v1/Fees/FeesLogin';


export const finyear = ServerIP + '/v1/Common/Finyear';
export const iu_batchemail = EmailIP + '/v1/email/iu_batchemail';
export const iu_fileemail = EmailIP + '/v1/email/iu_fileemail';
export const downloadtemplate = EmailIP + '/v1/email/downloadtemplate';

export var ServerURL = location.origin + location.pathname;

export const AdmissionStatusreport = ServerIP + '/v1/Fees/AdmissionStatusreport';
export const Admissionstatusnep = ServerIP + '/v1/Fees/admissionstatusnep';
export const BilldeskStatusReport = ServerIP + '/v1/Fees/BilldeskStatusReport';

export const installmentdetails = ServerIP + '/v1/Fees/installmentdetails';// installmentdetails list


export const download_batchsemestersubject = ServerIP + '/v1/Marksheet/download_batchsemestersubject';

export const batchuserexam = ServerIP + '/v1/Marksheet/batchuserexam';

export const batchwise_semester = ServerIP + '/v1/Marksheet/batchwise_semester';
export const batchexamslist = ServerIP + '/v1/Marksheet/batchexamslist';
export const userexams = ServerIP + '/v1/Marksheet/userexams';
export const templatelist = ServerIP + '/v1/Marksheet/templatelist';
export const Insertbatchexams = ServerIP + '/v1/Marksheet/insertbatchexams';
export const editbatchexams = ServerIP + '/v1/Marksheet/editbatchexam';
export const marksheetslab = ServerIP + '/v1/Marksheet/marksheetslab';
export var Pg_batchs_URL = COMMONURL + 'pg_batchs';
export var Getselectedbatchs_url = COMMONURL + 'Getselectedbatchs';
export var BatchSubjects = COMMONURL + 'BatchSubjects';
export var Bankmasters = COMMONURL + 'Bankmasters';
export var Captch = COMMONURL + 'Captch';

export var Captchimage = COMMONURL + 'Captchimage';
export var get_menus_coreui = COMMONURL + 'get_menus_coreui';

export var WebportalURL = COMMONURL + 'webportalwisebatchs';
export var Stream_batchsURL = COMMONURL + 'streambatchs';
export var GetAllFirstYearBatchs = COMMONURL + 'GetAllFirstYearBatchs';
export var Graducationstream = COMMONURL + 'Graducationstream';

export var Validate_aadhaarURL = COMMONURL + 'validateaadhaar';
export var Validate_emailURL = COMMONURL + 'validateemail';
export var Validate_mobileURL = COMMONURL + 'validatemobile';

export var Sendbulkemail = COMMONURL + 'sendbulkemail';
export var Sendbulkemailfile = COMMONURL + 'sendbulkemailfile';

export var BilldeskFirstYearCallback = STUDENTURL + 'BilldeskFormPaymentCallback';
export var FormFeesPaid = STUDENTURL + 'FormFeesPaid'; //new


export var StudentReceiptDetails = STUDENTURL + 'StudentReceiptDetails'; //new
export var Paidbatchs = STUDENTURL + 'Paidbatchs'; //new
export var PortalOpen = STUDENTURL + 'PortalOpen'; //new
export var PortalOpenv1 = STUDENTURL + 'PortalOpenv1'; //new
export var CheckAdmission = STUDENTURL + 'CheckAdmission'; //new
export var formfeesreceived = STUDENTURL + 'formfeesreceived'; //new
export var StudentProfileStatus = STUDENTURL + 'StudentProfileStatus'; //new

export var studentsforgotmobile = STUDENTURL + 'studentsforgotmobile'; //new forgotpasword resendotp
export var ProfileResources = STUDENTURL + 'ProfileResources';

export var StudentBatch = STUDENTURL + 'StudentBatch';
export var studentbatchs = STUDENTURL + 'studentbatchs'; //internal marks
export var studentbatchexams = STUDENTURL + 'studentbatchexams'; //internal marks
export var Internalexammarks = STUDENTURL + 'internalexammarks'; //internal marks

export var Studentmaxbatch = STUDENTURL + 'Studentmaxbatch'; //new
export var StudentSubjectGroup = STUDENTURL + 'Selectbatchsubject';
//export var StudentSubjectGroup = STUDENTURL + 'IncrementalBatchSubjects';

export var Nextbatchsubjects = STUDENTURL + 'Nextbatchsubjects'; //new
export var Selectbatchsubject_URL = STUDENTURL + 'Selectbatchsubject'; //new

export var IsProfileSubmited_URL = STUDENTURL + 'IsProfileSubmited';
export var StudentMyProfile = STUDENTURL + 'myprofilemultiplebatchs';
export var StudentMyProfile_URL = STUDENTURL + 'myprofilemultiplebatchs';
export var StudentAppliedCourses = STUDENTURL + 'StudentAppliedCourses';
export var Nextbatch = STUDENTURL + 'Nextbatch';

//Fees
export var StudentFeesInstallment = STUDENTURL + 'StudentFeesInstallment';
export var BillDeskcheckSum = STUDENTURL + 'BillDeskcheckSum';

export var IU_receipt = STUDENTURL + 'IU_Receipt';
export var BillDeskcheckSumQuery = STUDENTURL + 'BillDeskcheckSumQuery';
export var CheckSubjectGroupQuota = STUDENTURL + 'CheckSubjectGroupQuota';
export var nepquotacheck = STUDENTURL + 'nepquotacheck';
export var StudentReceiptDetails_URL = STUDENTURL + 'StudentReceiptDetails';
export var AdmissionCancel_Request = STUDENTURL + 'AdmissionCancel_Request';
export var CancelRequestValidation = STUDENTURL + 'CancelRequestValidation';

export var Cancelledadmission = STUDENTURL + 'Cancelledadmission';

//Callback
export var BilldeskFormPaymentCallback =
    STUDENTURL + 'BilldeskFormPaymentCallback';


//FormFeesPaid
export var FormFeesPaid_URL = STUDENTURL + 'FormFeesPaid';

export var Additionalsubjectformfees_URL = STUDENTURL + 'Additionalsubjectformfees';

export var formfeesreceived_url = STUDENTURL + 'formfeesreceived';

export var formfeesreceivedv1_url = STUDENTURL + 'formfeesreceivedv1';
//InstallmentValidation
export var InstallmentValidation = STUDENTURL + 'InstallmentValidation';

export const addatktstudent = ServerIP + '/v1/Marksheet/addatktstudent';

export const ATKT_studentsubjects = ServerIP + '/v1/Marksheet/ATKT_studentsubjects';

export const get_offlineatktsubjects = ServerIP + '/v1/Marksheet/get_offlineatktsubjects';

export const get_atktmarksimage = ServerIP + '/v1/Marksheet/get_atktmarksimage';

export const update_atktsubject = ServerIP + '/v1/Marksheet/update_atktsubject';

export const ATKT_deletesubjects = ServerIP + '/v1/Marksheet/ATKT_deletesubjects';

export const IU_ATKTForm_inhouse = ServerIP + '/v1/Marksheet/IU_ATKTForm_inhouse';

export const IU_ATKTsubjects = ServerIP + '/v1/Marksheet/IU_ATKTsubjects';


export const atktstudentspapers = ServerIP + '/v1/Marksheet/atktstudentspapers';

export const atkt_formamount = MARKSHEETURL + 'atkt_formamount';

export const ATKT_inhouse_aadhharsubject = ServerIP + '/v1/Marksheet/ATKT_inhouse_aadhharsubject';

export const ATKT_inhouse_aadhhardeletesubject = ServerIP + '/v1/Marksheet/ATKT_inhouse_aadhhardeletesubject';

export const Updateatktstudents = ServerIP + '/v1/Marksheet/updateatktstudents';

export const delete_cancelstudents =
    ServerIP + '/v1/Marksheet/delete_cancelstudents';
export const downloadfailstudents =
    ServerIP + '/v1/Marksheet/downloadfailstudents';

export const excludecurrentfinyear =
    ServerIP + '/v1/Marksheet/excludecurrentfinyear';
export const releaseinternalmarks =
    ServerIP + '/v1/Marksheet/releaseinternalmarks';
export const downloadinternalmarks =
    ServerIP + '/v1/Marksheet/downloadinternalmarks';
export const batchsemesterexamsubjects =
    ServerIP + '/v1/Marksheet/batchsemesterexamsubjects';

export const batchsemestersubject =
    ServerIP + '/v1/Marksheet/batchsemestersubject';

export const deleteallmarks = ServerIP + '/v1/Marksheet/deleteallmarks';

export const deletesinglerowtemplate =
    ServerIP + '/v1/Marksheet/deletesinglerowtemplate';
export const deletetemplate = ServerIP + '/v1/Marksheet/deletetemplate';

export const exceluploadtemplate =
    ServerIP + '/v1/Marksheet/exceluploadtemplate';
export const updatesinglerowtemplate =
    ServerIP + '/v1/Marksheet/updatesinglerowtemplate';

export const exceldownloadtemplate =
    ServerIP + '/v1/Marksheet/exceldownloadtemplate';

export const batchsemester = ServerIP + '/v1/Marksheet/batchsemester'; //batch wise

export const deleteallstudentsubjects =
    ServerIP + '/v1/Marksheet/deleteallstudentsubjects';

export const downloadstudentssubjects =
    ServerIP + '/v1/Marksheet/downloadstudentssubjects';

export const exceldownloadsgpa =
    ServerIP + '/v1/Marksheet/downloadrollcallsgpa';

export const viewstudentsubjects =
    ServerIP + '/v1/Marksheet/viewstudentsubjects';
export const uploadstudentsubjects =
    ServerIP + '/v1/Marksheet/uploadstudentsubjects';
export const batchsemstersubjects =
    ServerIP + '/v1/Marksheet/batchsemstersubjects';

export const batchsemestersubject_outside =
    ServerIP + '/v1/Marksheet/batchsemestersubject_outside';

export const get_atktfeesreceipt_details =
    ServerIP + '/v1/Marksheet/get_atktfeesreceipt_details';

export const viewstudentsgpa = ServerIP + '/v1/Marksheet/viewstudentsgpa';
export const exceluploadsgpa = ServerIP + '/v1/Marksheet/exceluploadsgpa';
export const upload_examsgpa = ServerIP + '/v1/Marksheet/upload_examsgpa';
export const updatesinglesgpa = ServerIP + '/v1/Marksheet/updatesinglesgpa';
export const updateaadhaargrade = ServerIP + '/v1/Marksheet/updateaadhaargrade';
export const showoverallgrade = ServerIP + '/v1/Marksheet/showoverallgrade';
export const deletestudentsgpa = ServerIP + '/v1/Marksheet/deletestudentsgpa';
export const download_examsgpa = ServerIP + '/v1/Marksheet/download_examsgpa';
export const editstudentsgpa = ServerIP + '/v1/Marksheet/editstudentsgpa';
export const exceldownloadstudents =
    ServerIP + '/v1/Marksheet/exceldownloadstudents';
export const exceluploadstudents =
    ServerIP + '/v1/Marksheet/exceluploadstudents';
export const atktstudentlist = ServerIP + '/v1/Marksheet/atktstudentlist';

export const deleteatktstudent = ServerIP + '/v1/Marksheet/deleteatktstudent';
export const downloadatktmarks = ServerIP + '/v1/Marksheet/downloadatktmarks';

export const uploadatktstudent = ServerIP + '/v1/Marksheet/uploadatktstudent';

export const semester = ServerIP + '/v1/Marksheet/semester'; //all

export const batchsubjectgroup = ServerIP + '/v1/Marksheet/batchsubjectgroup';

export const deletestudentsubjects =
    ServerIP + '/v1/Marksheet/deletestudentsubjects';
export const updatesinglemarks = ServerIP + '/v1/Marksheet/updatesinglemarks';
// export const batchuserexam = ServerIP + '/v1/Marksheet/batchuserexam';
export const exams = ServerIP + '/v1/Marksheet/exams';

// export const semester = ServerIP + '/v1/marksheet/semester';

export const internalexams = ServerIP + '/v1/Marksheet/internalexams';
export const uploadinternalmarks =
    ServerIP + '/v1/Marksheet/uploadinternalmarks';
export const batchsubjects = ServerIP + '/v1/Marksheet/batchsubjects';
export const excelmarksentryupload =
    ServerIP + '/v1/Marksheet/excelmarksentryupload';

export const uploadquestionpaper =
    ServerIP + '/v1/Marksheet/uploadquestionpaper';

export const upload_batchsemestersubject =
    ServerIP + '/v1/Marksheet/upload_batchsemestersubject';
export const batchsemstersubjectpapertype =
    ServerIP + '/v1/Marksheet/batchsemstersubjectpapertype';
export const batchsemstersubjectpaper =
    ServerIP + '/v1/Marksheet/batchsemstersubjectpaper';

export const studentuploadimage = ServerIP + '/v1/Marksheet/studentuploadimage';

export const downloadconvocation =
    ServerIP + '/v1/Marksheet/downloadconvocation';
export const uploadconvocation = ServerIP + '/v1/Marksheet/uploadconvocation';
export const excelmarksentrydownload =
    ServerIP + '/v1/Marksheet/excelmarksentrydownload';
export const downloadcoursemarks =
    ServerIP + '/v1/Marksheet/downloadcoursemarks';
export const allsemesterpoints = ServerIP + '/v1/Marksheet/allsemesterpoints';
export const currentexampoint = ServerIP + '/v1/Marksheet/currentexampoint';
//checkoutstanding
export const uploadcoursemarks = ServerIP + '/v1/Marksheet/uploadcoursemarks';
export const editcoursemarks = ServerIP + '/v1/Marksheet/editcoursemarks';
export const deletecoursemarks = ServerIP + '/v1/Marksheet/deletecoursemarks';

export const finderrorindataentry = ServerIP + '/v1/Marksheet/finderrorindataentry';
export const failstduents = ServerIP + '/v1/Marksheet/failstduents';
export const processcreditmarks = ServerIP + '/v1/Marksheet/processcreditmarks';
export const semesterwisemarks = ServerIP + '/v1/Marksheet/semesterwisemarks';
export const juniormarksheet = ServerIP + '/v1/Marksheet/juniormarksheet';
export const printvalueaddcourse = ServerIP + '/v1/Marksheet/printvalueaddcourse';
export const templatename = ServerIP + '/v1/Marksheet/templatename';
export const downloadsemestersubjects = ServerIP + '/v1/Marksheet/downloadsemestersubjects';
export const printcertificate = ServerIP + '/v1/Marksheet/printcertificate';
export const processoverallcgpa = ServerIP + '/v1/Marksheet/processoverallcgpa';
export const update_sixsemestersgpa = ServerIP + '/v1/Marksheet/update_sixsemestersgpa';
// export const examcgpacreditpoint_url = ServerIP + '/v1/Marksheet/eligiblestudents';
export const examcgpacreditpoint_url = ServerIP + '/v1/Marksheet/eligiblestudents_exam';

export const junior_avgmarks = ServerIP + '/v1/Marksheet/junior_avgmarks';
export const showdse = ServerIP + '/v1/Marksheet/showdse';
export const uploaddse = ServerIP + '/v1/Marksheet/uploaddse';
export const printmarksheetexamwise = ServerIP + '/v1/Marksheet/printmarksheetexamwise';

export var checkoutstanding = STUDENTURL + 'checkoutstanding';
export var validateeliglibity = STUDENTURL + 'validateeliglibity';
export var Admissionstatus = STUDENTURL + 'Admissionstatus';
export var Feesattached = STUDENTURL + 'Feesattached';
export var validateadmissionstarted = STUDENTURL + 'validateadmissionstarted';

export var Paidfinyear = STUDENTURL + 'Paidfinyear';
export var Paidbatchs_URL = STUDENTURL + 'Paidbatchs';
export var StudentApprovedCourses = STUDENTURL + 'StudentApprovedCourses';
export var Aadhaar_unsuccesstranscation = STUDENTURL + 'Aadhaar_unsucesstranscation';
//academic bank of credits
export var abcid = STUDENTURL + 'abcid';
export var getabcid = STUDENTURL + 'getabcid';

export var createticket = STUDENTURL + 'createticket';

///displayportalmessage --Fees
export const EditProfile = FEESURL + 'EditProfile';
export const ProfileList = FEESURL + 'ProfileList';
export const Downloadaadhaar = FEESURL + 'Downloadaadhaar';

export const billdeskquery = FEESURL + 'billdeskquery';

export var ValidatePortalmessage_URL = FEESURL + 'displayportalmessage';
export var ticketcategory = FEESURL + 'ticketcategory';

// studentsmarksheetlist --marksheet
export var studentsmarksheetlist = MARKSHEETURL + 'studentsmarksheetlist';
export var studentsmarksheetlistall = MARKSHEETURL + 'studentsmarksheetlistall';

export var printmarksheet = MARKSHEETURL + 'printmarksheet';

export var printmarksheet_date = MARKSHEETURL + 'printmarksheet_date';


export var EnrollmentDetail = STUDENTURL + 'enrollmentdetail';
export var UpdateEnrollmentDetail = STUDENTURL + 'updateenrollmentdetail';

// Define API for Staff-Admin
export const DownloadReceipts = ServerIP + '/v1/Fees/DownloadReceipts';
export const pdfdownload = ServerIP + '/pdfdownload/';
export const DownloadExcel = ServerIP + '/exceldownload/';
export const Finyear = ServerIP + '/v1/Common/Finyear';
export const Login = ServerIP + '/v1/Fees/FeesLogin';
export const MarksheetLogin = ServerIP + '/v1/Marksheet/MarksheetLogin';
export const MarksheetLoginv2 = ServerIP + '/v1/Marksheet/MarksheetLoginv2';


export const College = ServerIP + '/v1/Common/College';
export const Captcha = ServerIP + '/v1/Common/Captch';
export const BatchFeesTerms = ServerIP + '/v1/Fees/BatchFeesTerms';//term batch wise
export const Batchs = ServerIP + '/v1/Common/GetAllBatchs';

export const allbatchs = ServerIP + '/v1/Common/allbatchs';
export const FeesHead = ServerIP + '/v1/Fees/FeesHead';
export const iu_nepsubjectv2 = ServerIP + '/v1/Fees/iu_nepsubjectv2';
export const FeesTerm = ServerIP + '/v1/Fees/FeesTerm';
export const IU_Installments = ServerIP + '/v1/Fees/IU_Installments';
export const GetInstallments = ServerIP + '/v1/Fees/GetInstallments';
export const DeleteAll = ServerIP + '/v1/Fees/Delete';
export const BillDesk = ServerIP + '/v1/Fees/BillDesk';
export const AdmissionApproval = ServerIP + '/v1/Fees/AdmissionApproval';
export const AdmissionApprovallist = ServerIP + '/v1/Fees/AdmissionApprovallist';
export const Marksheetapprovallist = ServerIP + '/v1/Fees/Marksheetapprovallist';
export const ViewDocument = ServerIP + '/v1/Fees/viewdocument';
export const GetStudentFeesStructure = ServerIP + '/v1/Fees/GetStudentFeesStructure';
export const IU_AttachFeesStructure = ServerIP + '/v1/Fees/IU_AttachFeesStructure';
export const EducationDetails = ServerIP + '/v1/Fees/EducationDetails';
export const AdmissionMarksheets = ServerIP + '/v1/Fees/AdmissionMarksheets';
export const CastDocument = ServerIP + '/v1/Fees/CastDocument';
export const CurrentSubjectGroupCode = ServerIP + '/v1/Fees/CurrentSubjectGroupCode';//old
export const showsubjectgroup = ServerIP + '/v1/Fees/showsubjectgroup';//old

export const findstudentsubject = ServerIP + '/v1/Fees/findstudentsubject';//new
export const IU_UpdateSubjectGroupCode = ServerIP + '/v1/Fees/IU_UpdateSubjectGroupCode';
export const BilldeskQuery = ServerIP + '/v1/Fees/BillDeskQuery';//
export const NewRegistrationList = ServerIP + '/v1/Fees/NewRegistrationList';//
export const IU_AttachFeesToall = ServerIP + '/v1/Fees/IU_AttachFeesToall';
export const IU_UnTagFees = ServerIP + '/v1/Fees/IU_UnTagFees';
export const FeesForgotPassword = ServerIP + '/v1/Fees/FeesForgotPassword';
export const AdmissionQuotaList = ServerIP + '/v1/Fees/AdmissionQuotaList';
export const AdmissionQuotaList_minor = ServerIP + '/v1/Fees/AdmissionQuotaList_minor';
export const IU_QuotaStatusUpdate = ServerIP + '/v1/Fees/IU_QuotaStatusUpdate';
export const IU_minorstatus = ServerIP + '/v1/Fees/IU_minorstatus';
export const ReceiptReport = ServerIP + '/v1/Fees/ReceiptReport';
export const OutsideStudents = ServerIP + '/v1/Fees/OutsideStudents';
export const UpdateLastyearOutstanding = ServerIP + '/v1/Fees/UpdateLastyearOutstanding';
export const UpdateLastYearStudents = ServerIP + '/v1/Fees/UpdateLastYearStudents';
export const DocumentApproval = ServerIP + '/v1/Fees/DocumentApproval';
export const UpdateDocumentApproval = ServerIP + '/v1/Fees/UpdateDocumentApproval';
export const GetAllBatchs = ServerIP + '/v1/Common/GetAllBatchs';
export const UsersList = ServerIP + '/v1/Fees/UsersList';
export const InsertUpdateUsers = ServerIP + '/v1/Fees/InsertUpdateUsers';
export const GetUnAttachedStudents = ServerIP + '/v1/Fees/GetUnAttachedStudents';
export const Accountinfo = ServerIP + '/v1/Fees/Accountinfo';
//bill desk
export const BilldeskUpload = ServerIP + '/v1/Fees/BilldeskUpload';
export const billdeskdataupload = ServerIP + '/v1/Fees/billdeskdataupload';//old
export const billdeskdatadownload = ServerIP + '/v1/Fees/billdeskdatadownload';
export const billdeskrefundupload = ServerIP + '/v1/Fees/billdeskrefundupload';
export const billdeskrefunddownload = ServerIP + '/v1/Fees/billdeskrefunddownload';

//LC
export const downloadstudentlcdata = ServerIP + '/v1/Fees/downloadstudentlcdata';
export const downloadLC = ServerIP + '/v1/Fees/downloadlc';
export const uploadLC = ServerIP + '/v1/Fees/uploadlc';
export const deleteLC = ServerIP + '/v1/Fees/deletelc';

export const IU_Cashreceipt = ServerIP + '/v1/Fees/IU_CashReceipt';
export const iu_scholarship = ServerIP + '/v1/Fees/iu_scholarship';
export const get_scholarship = ServerIP + '/v1/Fees/get_scholarship';


export const get_installmentheader = ServerIP + '/v1/Fees/get_installmentheader';
export const get_installmentdetails = ServerIP + '/v1/Fees/get_installmentdetails';

export const RollCalllist = ServerIP + '/v1/Fees/RollCalllist';
export const IU_UpdateRollcall = ServerIP + '/v1/Fees/IU_UpdateRollcall';
export const UploadRollcall = ServerIP + '/v1/Fees/UploadRollcall';
export const DownloadRollcall = ServerIP + '/v1/Fees/DownloadRollcall';
export const Portallist = ServerIP + '/v1/Fees/Portallist';
export const IU_Webportal = ServerIP + '/v1/Fees/IU_Webportal';
export const ExcelPaid_UnPaidList = ServerIP + '/v1/Fees/ExcelPaid_UnPaidList';
export const ExcelRollCall = ServerIP + '/v1/Fees/ExcelRollCall';
export const ExcelFeesStructure = ServerIP + '/v1/Fees/ExcelFeesStructure';
export const ExcelAccountCollection = ServerIP + '/v1/Fees/ExcelAccountCollection';
export const ExcelIDCard = ServerIP + '/v1/Fees/ExcelIDCard';
export const ExcelStudentList = ServerIP + '/v1/Fees/ExcelStudentList';
export const DownloadReceiptspdf = ServerIP + '/v1/Fees/DownloadReceiptspdf';
export const DownloadReceiptsblob = ServerIP + '/v1/Fees/DownloadReceiptsblob';

export const ExcelOutstanding = ServerIP + '/v1/Fees/ExcelOutstanding';
export const ExcelStatistics = ServerIP + '/v1/Fees/ExcelStatistics';
export const GetInstallmentHeader = ServerIP + '/v1/Fees/GetInstallmentHeader';//installment dropdown
export const Activedeactiveinstallments = ServerIP + '/v1/Fees/Activedeactiveinstallments';// active deactive dropdown
export const ExcelDetailRegister = ServerIP + '/v1/Fees/ExcelDetailRegister';
export const Exceldetailregister_tally = ServerIP + '/v1/Fees/Exceldetailregister_tally';
export const ExcelAccountStudent = ServerIP + '/v1/Fees/ExcelAccountStudent';
export const ExcelAccountoutstanding = ServerIP + '/v1/Fees/ExcelAccountoutstanding';
export const Updatefreeship = ServerIP + '/v1/Fees/Updatefreeship';
export const excelfreeship = ServerIP + '/v1/Fees/excelfreeship';
export const showallwebsitenames = ServerIP + '/v1/Fees/showallwebsitenames';
export const updatewebsiteremarks = ServerIP + '/v1/Fees/updatewebsiteremarks';
export const uploadinstallmenttemplate = ServerIP + '/v1/Fees/uploadinstallmenttemplate';
export const downloadinstallmenttemplate = ServerIP + '/v1/Fees/downloadinstallmenttemplate';
export const showbatchadmissiondate = ServerIP + '/v1/Fees/showbatchadmissiondate';
export const updatebatchadmissiondate = ServerIP + '/v1/Fees/updatebatchadmissiondate';
export const Unpaidstudentslist = ServerIP + '/v1/Fees/Unpaidstudentslist';
export const Printprofile = ServerIP + '/v1/Fees/Printprofile';
export const Unattachfees = ServerIP + '/v1/Fees/Unattachfees';
export const transferstudentbatchs = ServerIP + '/v1/Fees/transferstudentbatchs';
export const downloadrollcallconfiguration = ServerIP + '/v1/Fees/downloadrollcallconfiguration';
export const uploadrollcallconfiguration = ServerIP + '/v1/Fees/uploadrollcallconfiguration';
export const generalregister = ServerIP + '/v1/Fees/generalregister';
export const Excelbatchcollout = ServerIP + '/v1/Fees/Excelbatchcollout';
export const iu_gapstudent = ServerIP + '/v1/Fees/iu_gapstudent';
export const Tally = ServerIP + '/v1/Tally/multiplefinyear_onlinereceipt';
// Define API for Students

// export var CheckAdmission = ServerIP + '/v1/Students/CheckAdmission';

// Define API for Marksheet

export const uploadstudenteligiblelist = ServerIP + '/v1/Marksheet/uploadstudenteligiblelist';
export const deletestudenteligiblelist = ServerIP + '/v1/Marksheet/deleteeligible';
export const showalleligiblelist = ServerIP + '/v1/Marksheet/showalleligible';
export const downloadstudenteligiblelist = ServerIP + '/v1/Marksheet/downloadstudenteligiblelist';
export const updateeligible = ServerIP + '/v1/Marksheet/updateeligible';

export const iu_eligible = ServerIP + '/v1/Marksheet/iu_eligible';



//Batch Subjects None
export const BatchSubjectsnone = ServerIP + '/v1/Common/Batchsubjectsnone';

//Cancel admission
export const AdmissionCancel = ServerIP + '/v1/Fees/AdmissionCancel';
export const viewchequeimage = ServerIP + '/v1/Fees/viewchequeimage';
export const downloadcanceldocument = ServerIP + '/v1/Fees/downloadcanceldocument';
export const CacelAdmissionList = ServerIP + '/v1/Fees/CacelAdmissionList';
//adhaar receipt
export const Aadhaarreceiptlist = ServerIP + '/v1/Fees/Aadhaarreceiptlist';
export const Printreceipt = ServerIP + '/v1/Fees/Printreceipt';
//merit list
export const merilistbatchdocument = ServerIP + '/v1/Fees/merilistbatchdocument';
export const meritlist = ServerIP + '/v1/Fees/meritlist';
//Create Rollno
export const Createrollno = ServerIP + '/v1/Fees/Createrollno';
//cancel to approve
export const canceltoapproval = ServerIP + '/v1/Fees/canceltoapproval';
//report batchoutstanding
export const batchoutstanding = ServerIP + '/v1/Fees/batchoutstanding';
//report formfees
export const formfees = ServerIP + '/v1/Fees/formfees';
//query ticket ui
export const ticketlist = ServerIP + '/v1/Fees/ticketlist';
export const ticketaction = ServerIP + '/v1/Fees/ticketaction';
//update details
export const updatemobileemail = ServerIP + '/v1/Fees/updatemobileemail';
export const Get_failaadhaar = ServerIP + '/v1/Marksheet/Get_failaadhaar';
export const Get_failsubjectes = ServerIP + '/v1/Marksheet/Get_failsubjectes';
export const sgpa = ServerIP + '/v1/Marksheet/sgpa';
export const iu_sgpa = ServerIP + '/v1/Marksheet/iu_sgpa';
export const delete_sgpa = ServerIP + '/v1/Marksheet/delete_sgpa';
export const upload_sgpa = ServerIP + '/v1/Marksheet/upload_sgpa';
export const download_sgpa = ServerIP + '/v1/Marksheet/download_sgpa';
export var studentabcdid_get = STUDENTURL + 'studentabcdid_get';
export const studentabcdid_rejectionlist = FEESURL + 'studentabcdid_rejectionlist';
export const studentabcdid_approval = FEESURL + 'studentabcdid_approval';
export const studentabcdid_list = FEESURL + 'studentabcdid_list';
export const studentabcdid_download = FEESURL + 'studentabcdid_download';
export const getboardlevel_students = ServerIP + '/v1/Marksheet/getboardlevel_students';
export var Billdeskchecksum_atkt = ServerIP + '/v1/Billdesk/Billdeskchecksum_atkt';
export const IU_ATKTForm = MARKSHEETURL + 'IU_ATKTForm';
export const get_atktprefix = MARKSHEETURL + 'get_atktprefix';
export var atkt_formcallback = BILLDESKURL + 'atkt_formcallback';
export const Atkt_studentbatch = STUDENTURL + 'Atkt_studentbatch';
export const getReciept = STUDENTURL + 'Atkt_studentreceipt';
export const atktstudentspaper_semesterwise = MARKSHEETURL + 'atktstudentspaper_semesterwise';
export const report_atktbatchsemesterstudents = MARKSHEETURL + 'report_atktbatchsemesterstudents';
export const Atkt_studentreceipt = STUDENTURL + 'Atkt_studentreceipt';
export const report_batchexamstudentcount = MARKSHEETURL + 'report_batchexamstudentcount';
export const download_hallticket = MARKSHEETREPORTSURL + '/download_hallticket';
export const version = COMMONURL + 'version';

export var eazylogin = EAZYURL + 'eazylogin';

