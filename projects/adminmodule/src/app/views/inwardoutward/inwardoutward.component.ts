import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalMessage} from "../../globals/global.message";
import {GridOptions} from "ag-grid-community";
import {InwardoutwardService} from "./inwardoutward.service";
import Swal from 'sweetalert2';
import {IEmp, IGridinward, IOrg} from "../../views/inwardoutward/inwardoutward.model";
import {College} from "../../globals/global-api";
import {Iinwardoutward} from "../../models/response";
import {CommanService} from "../../globals/common.services";
import {
    documenttype, getemployee,
    getorginazation,
    inwardoutwar_images,
    inwardoutward,
    inwardoutward_20,
    iu_inwardoutward,
    iu_orgnization, moduletype
} from "../../globals/global-variable";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {base64StringToBlob} from "blob-util";
import {UDownloadfiles} from "../../globals/global_downloadfiles";
import {Sessiondata} from '../../models/request';
import {SessionService} from '../../globals/sessionstorage';
import {encryptUsingAES256} from '../../globals/encryptdata';

@Component({
    selector: 'app-inwardoutward',
    templateUrl: './inwardoutward.component.html',
    styleUrls: ['./inwardoutward.component.scss']
})
export class InwardoutwardComponent {
    public organizationForm!: FormGroup;
    public inwardOutwardForm!: FormGroup;
    public reportsForm!: FormGroup;
    //Grid Rows
    public inwardRows: any = [];
    public organization_Ajson!: IOrg[];
    public Selected_orgname_json!: IOrg | undefined;

    public employee_Ajson!: IEmp[];
    public Selected_empname_json!: IEmp | undefined;

    reportrowss: any = [];
    public SelecteddocumentType: any;
    public Selecteddocument: any
    gridOptions_inwrd: any;
    out_rowselected: any;
    out_rowselected_inwrd!: IGridinward;
    Files!: Array<File>;

    // slides: any[] = new Array();

    Applicationmode: string = ""
    //public SelectedOrgName: any;
    //public SelectedEmpName: IEmp | undefined;
    public documentType: any;
    public EmpName: any;
    public res: any;
    public data: any;
    private gridApi_org: any;
    private gridApi_inwrd: any;
    private gridColumnApi_org: any;
    private gridColumnApi_inwrd: any;
    gridOptions_report: any;

    gridOptions: any;
    searchValue: any;
    public typeDocument: any;
    public gridinwrd!: IGridinward[];
    public selected_gridinwrd!: IGridinward;

    gridApi_report: any;
    gridColumnApi_report: any;
    reportinwardoutward: any;
    MyReportImage!: SafeResourceUrl[];

    // galleryOptions!: NgxGalleryOptions[];
    // galleryImages!: NgxGalleryImage[];

    public Sender_receiver: string = "";
    public paginationPageSize = 10;

    oSession!: Sessiondata;


    constructor(
        private http: HttpClient, private sanitizer: DomSanitizer,
        private router: Router, private commonService: CommanService,
        private globalmessage: GlobalMessage,
        private inwardoutwardService: InwardoutwardService,
        private formBuilder: FormBuilder,
        private sessionService: SessionService
    ) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
        this.gridOptions_inwrd = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
        this.gridOptions_report = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
    }

    ngOnInit(): void {
        // if (!this.Token) {
        //   alert('Please Login!');
        //   this.router.navigate(['/login']);
        // } else {

        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        this.ModuletypeAPI();
        this.orgTypeAPI();
        this.empTypeAPI();
        this.docType();

        this.inwardgrid_20();


        this.organizationForm = new FormGroup({
            name: new FormControl('', Validators.required),
            typedocument: new FormControl('', Validators.required),
            contactperson: new FormControl('', Validators.required),
            mobile: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),

        });

        this.inwardOutwardForm = new FormGroup({
            type: new FormControl('', Validators.required),
            typedocument: new FormControl('', Validators.required),
            orgname: new FormControl('', Validators.required),
            empname: new FormControl('', Validators.required),
            documentsubject: new FormControl('', Validators.required),
            documentno: new FormControl('', Validators.required),
            documentdate: new FormControl('', Validators.required),
            remarks: new FormControl('', Validators.required),
        });

        this.reportsForm = new FormGroup({
            type: new FormControl('', Validators.required),
            fromdate: new FormControl('', Validators.required),
            todate: new FormControl('', Validators.required),
        });


    }

    public ModuletypeAPI() {
        this.commonService.Post_json(moduletype, "").subscribe((response: any) => {
            if (response == null) {
                alert('No data found');
            } else {
                this.documentType = response;
            }
        });
    }

    public orgTypeAPI() {
        this.commonService.Post_json(getorginazation, "").subscribe((response: any) => {
            if (response == null) {
                return;
            }
            this.organization_Ajson = response.data;
        });
    }

    public empTypeAPI() {
        this.commonService.Post_json(getemployee, "").subscribe((response: any) => {
            this.res = response;
            this.inwardRows = this.res.data;
            if (response == null) {
                alert('No data found');
            } else {
                this.employee_Ajson = response.data;
            }
        });
    }

    public docType() {
        this.commonService.Post_json(documenttype, "").subscribe((response: any) => {
            if (response == null) {
                return;
            }
            this.typeDocument = response;
        })
    }

    public Receive: string = '';

    onChangedocumentType(index: any) {

        if (index <= 0) {
            return;
        }


        console.log('prakash : ', index);
        if (index == 1) {
            console.log('inward')
            this.Sender_receiver = ' ( Sender )';
            this.Receive = ' ( Receiver )';
            return;
        }
        if (index == 2) {
            console.log('outward')
            this.Sender_receiver = ' ( Receiver )';
            this.Receive = ' ( Sender ) ';
            return;
        }
    }

    onChangeIOOrgName() {


        // if (index <= 0) {
        //   return
        // }
        // this.Selected_orgname_json = this.organization_Ajson[index - 1];
        //
        // console.log('xxxxx', this.Selected_orgname_json);
    }

    onChangeEmpName() {

        // if (index <= 0) {
        //   return
        // }
        // this.Selected_empname_json = this.employee_Ajson[index - 1];
        //
        // console.log('xxxxx', this.Selected_empname_json);
        console.log('selesc', this.Selected_empname_json)
    }

    public onSubmitOrganization() {
        if (this.organizationForm.valid) {

            this.iuOrganization();
        } else {
            Swal.fire({
                title: '',
                text: 'Please select the required data!',
                icon: 'info',
                confirmButtonText: 'OK',
            }); //alert
        }
    }

    iuOrganization() {
        let jsonin = {
            // "Orgid": parseInt(this.SelectedOrgName.Orgid),
            Orgid: 0,
            CollegeCode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Orgname: this.organizationForm.controls['name'].value,
            Concatperson: this.organizationForm.controls['contactperson'].value,
            Contactmobile: this.organizationForm.controls['mobile'].value,
            Contactemail: this.organizationForm.controls['email'].value,
            Orgtype: this.organizationForm.controls['typedocument'].value,
            UserAadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json(iu_orgnization, jsonin)
            .subscribe((response: {}) => {
                this.res = response;
                if (this.res.data == true) {
                    Swal.fire({
                        text: 'Data Submitted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.orgTypeAPI();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: this.res.exception,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
                this.empTypeAPI();
            });
    }

    onUpdateInwardOutward() {
        if (this.inwardOutwardForm.valid) {

            this.iuInwardOutward();
        } else {
            Swal.fire({
                title: '',
                text: 'Please select the required data!',
                icon: 'info',
                confirmButtonText: 'OK',
            }); //alert
        }
    }

    Uploadfiles(element: any) {
        this.Files = element.target.files;
    }


    Check_isnull(): boolean {
        if (typeof this.out_rowselected_inwrd != 'undefined' && this.out_rowselected_inwrd) {
            console.log('false');
            return false;
        }
        console.log('true');
        return true;
    }

    iuInwardOutward() {

        let formdata = new FormData();

        let jsonin = {}

        if (this.Applicationmode == "EDIT") {
            jsonin = {
                'Collegecode': this.oSession.collegecode,
                'Finyear': this.oSession.finyear,
                'Moduletype': this.SelecteddocumentType,
                'Orgname': this.Selected_orgname_json!.Orgname,
                'Documenttype': this.inwardOutwardForm.controls['typedocument'].value,
                'Orgid': this.Selected_orgname_json!.Orgid.toString(),
                'Empid': this.Selected_empname_json!.Empid.toString(),
                'Empname': this.Selected_empname_json!.Full_name,
                'Documentsubject': this.inwardOutwardForm.controls['documentsubject'].value,
                'Documentno': this.inwardOutwardForm.controls['documentno'].value,
                'Remarks': this.inwardOutwardForm.controls['remarks'].value,
                'Documentdate': this.inwardOutwardForm.controls['documentdate'].value,
                'Createdby': this.oSession.aadhaar,
                'Documentid': this.out_rowselected_inwrd.Documentid.toString()
            }
        } else {
            jsonin = {
                'Collegecode': this.oSession.collegecode,
                'Finyear': this.oSession.finyear,
                'Moduletype': this.SelecteddocumentType,
                'Orgname': this.Selected_orgname_json!.Orgname,
                'Documenttype': this.inwardOutwardForm.controls['typedocument'].value,
                'Orgid': this.Selected_orgname_json!.Orgid,
                'Empid': this.Selected_empname_json!.Empid,
                'Empname': this.Selected_empname_json!.Full_name,
                'Documentsubject': this.inwardOutwardForm.controls['documentsubject'].value,
                'Documentno': this.inwardOutwardForm.controls['documentno'].value,
                'Remarks': this.inwardOutwardForm.controls['remarks'].value,
                'Documentdate': this.inwardOutwardForm.controls['documentdate'].value,
                'Createdby': this.oSession.aadhaar,
            }
        }

        // formdata.append('Collegecode', this.oSession.collegecode.toString());
        // formdata.append('Finyear', this.oSession.finyear.toString());
        // formdata.append('Moduletype', this.SelecteddocumentType),
        //   formdata.append('Orgname', this.Selected_orgname_json!.Orgname);
        // formdata.append('Documenttype', this.inwardOutwardForm.controls['typedocument'].value);
        // formdata.append('Orgid', this.Selected_orgname_json!.Orgid.toString());
        // formdata.append('Empid', this.Selected_empname_json!.Empid.toString());

        // formdata.append('Emp_id', this.Selected_empname_json.Emp_id.toString());

        // formdata.append('Empname', this.Selected_empname_json!.Full_name);

        // formdata.append('Documentsubject', this.inwardOutwardForm.controls['documentsubject'].value);
        // formdata.append('Documentno', this.inwardOutwardForm.controls['documentno'].value);
        // formdata.append('Remarks', this.inwardOutwardForm.controls['remarks'].value);
        // formdata.append('Createdby', this.oSession.aadhaar.toString());
        // formdata.append('Documentdate', this.inwardOutwardForm.controls['documentdate'].value);

        formdata.append('input_form', encryptUsingAES256(jsonin))
        // formdata.append('file', this.xlsxFile[0])

        if (this.Files != null) {
            if (this.Files.length > 0) {
                for (let i = 0; i < this.Files.length; i++)
                    formdata.append('files', this.Files[i], this.Files[i].name);
            }
        }

        console.log(jsonin);
        this.commonService.Post_formdata(iu_inwardoutward, formdata).subscribe((response) => {
          if (response == null) {
            return;
          }
          console.log('data', response)

          console.log(typeof response);//Prints "string"
          if (response > 0) {

            if (!this.Check_isnull()) {
              if (this.out_rowselected_inwrd.Documentid > 0) {
                this.globalmessage.Show_message(`Data for id ${response} number updated Successfully!`);
              }
            } else {
              this.globalmessage.Show_message(`Entry Updated Successfully!`);
            }
            this.globalmessage.Show_message(`Data for id ${response} number created Successfully!`);
            this.inwardOutwardForm.reset();
            this.inwardgrid_20();

            this.Applicationmode = "";
          } else {
            this.globalmessage.Show_message('Data not saved');
          }
        });
    }

    inwardgrid_20() {
        // console.log(this.students);
        let jsonin = {
            CollegeCode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
        };
        this.commonService.Post_json(inwardoutward_20, jsonin).subscribe((response) => {
            this.gridinwrd = response;
            this.gridApi_inwrd.setRowData(this.gridinwrd);
            this.inwardRows = this.gridinwrd;
            // console.log(this.res);
            // console.log(this.students);
        })
    }

    onSubmitReports() {
        if (this.reportsForm.valid) {
            let jsonin = {
                Doumenttype: this.reportsForm.controls['type'].value,
                Fromdate: this.reportsForm.controls['fromdate'].value,
                Todate: this.reportsForm.controls['todate'].value,
            };
            this.commonService.Post_json(inwardoutward, jsonin)
                .subscribe((response: {}) => {
                    this.res = response;
                    this.reportrowss = this.res.data;
                    // if (this.res.data == true) {
                    //   Swal.fire({ text: "Data Submitted Successfully!", icon: 'success', confirmButtonText: 'OK' })//alert
                    //   this.empTypeAPI();
                    // }
                    // else {
                    //   Swal.fire({ title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK' })//alert
                    // }
                });
        } else {
            Swal.fire({
                title: '',
                text: 'Please select the required data!',
                icon: 'info',
                confirmButtonText: 'OK',
            }); //alert
        }
    }

    public resetForms() {
        this.organizationForm.reset();
    }

//get employee response
// {
//   "Emp_id": 35,
//   "Full_name": "ARCHANA BHIDE",
//   "Department": "INFORMATION TECHNOLOGY",
//   "Designation": "ASSISTANT PROFESSOR",
//   "College": "Degree College",
//   "Biometric_id_no": "137",
//   "Address": "1406 RUBY NIRMAL LIFESTYLE LBS MARG\\r\\nMULUND W MUMBAI",
//   "Dob": "13-09-77",
//   "Doj": "09-07-07",
//   "Blood_group": "O+",
//   "Email": "archanabhide@gmail.com",
//   "Mobile": "9324087919",
//   "Alternate_mobile": "9819595542",
//   "Created_date": "0000-00-00 00:00:00"
// },

// {
//   "Orgid": 2,
//   "Orgname": "CommonUrl",
//   "Concatperson": "CommonUrl",
//   "Contactmobile": "9965236547",
//   "Contactemail": "commonUrl@gmail.com",
//   "Orgtype": "INWARD"
// }

    public Logout() {
        Swal.fire({
            showDenyButton: true,
            text: 'Are you sure..you want to Logout?',
            icon: 'info',
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }) //alert
            .then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.clear();
                    this.router.navigate(['login']);
                } else if (result.isDenied) {
                }
            });
    }

//Grid column
    organizationColumnDefs: any = [
        {
            headerName: 'Org Name',
            field: 'Orgname',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Concat Person',
            field: 'Concatperson',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Contact Mobile',
            field: 'Contactmobile',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Contact Email',
            field: 'Contactemail',
            resizable: true,
            editable: true,
        },
        {
            headerName: 'Organization Type',
            field: 'Orgtype',
            resizable: true,
            editable: true,
        },

    ];

    inwardColumns: any = [
        {
            headerName: 'Documentid',
            field: 'Documentid',
            resizable: true,
        },
        {headerName: 'Moduletype', field: 'Moduletype', resizable: true, filter: true, sortable: true},
        {headerName: 'Documenttype', field: 'Documenttype', resizable: true, filter: true, sortable: true},
        // {headerName: 'Orgid', field: 'Orgid', resizable: true},
        {headerName: 'Orgname', field: 'Orgname', resizable: true, filter: true, sortable: true},
        // {headerName: 'Empid', field: 'Empid', resizable: true},
        {headerName: 'Empname', field: 'Empname', resizable: true, filter: true, sortable: true},
        {
            headerName: 'Documentsubject',
            field: 'Documentsubject',
            resizable: true,
            sortable: true,
            filter: true
        },
        {headerName: 'Documentno', field: 'Documentno', resizable: true},
        {
            headerName: 'Documentdate',
            field: 'Documentdate',
            resizable: true, filter: true, sortable: true
        },
        {headerName: 'Remarks', field: 'Remarks', resizable: true, filter: true, sortable: true},
        // {
        //     headerName: 'Createddate',
        //     field: 'Createddate',
        //     maxWidth: 120,
        // },
        // {headerName: 'Createdby', field: 'Createdby', resizable: true},

    ];

    reportcolumnDefs: any = [
        {headerName: 'Document Type', field: 'Documenttype', resizable: true, filter: true, sortable: true},
        {headerName: 'Organization Name', field: 'Orgname', resizable: true, filter: true, sortable: true},
        {headerName: 'Employee Name', field: 'Empname', resizable: true, filter: true, sortable: true},
        {
            headerName: 'Document Subject',
            field: 'Documentsubject',
            resizable: true, filter: true, sortable: true
        },
        {headerName: 'Document No', field: 'Documentno', resizable: true, filter: true, sortable: true},
        {headerName: 'Document Date', field: 'Documentdate', resizable: true, filter: true, sortable: true},
        {headerName: 'Remarks', field: 'Remarks', resizable: true, filter: true, sortable: true},
        {headerName: 'Created Date', field: 'Createddate', resizable: true, filter: true, sortable: true},
        {headerName: 'Created By', field: 'Createdby', resizable: true, filter: true, sortable: true},
    ];

    onrowselect_organizationon(selectedRow: any) {

    }

    onselectchange_organizationon(event: any) {
        let selected_outnode = this.gridApi_org.getSelectedNodes();
        this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        console.log('Selection updated', this.out_rowselected);
    }

    inwardonRowSelectedEvent(selectedRow: any) {

    }


    inwardonSelectionChanged(event: any) {
        this.Applicationmode = "EDIT";
        let selected_outnode_inwrd = this.gridApi_inwrd.getSelectedNodes();
        let selected_map = selected_outnode_inwrd.map((node: { data: any; }) => node.data);
        this.out_rowselected_inwrd = selected_map[0];
        console.log('Selection updated', this.out_rowselected_inwrd);

        //this.Selecteddocument = this.out_rowselected_inwrd.Documenttype ;

        let orgnameindex!: IOrg | undefined
        orgnameindex = this.getDimensionsByFind(this.out_rowselected_inwrd.Orgid);
        console.log('prakash', orgnameindex);

        let empnameindex!: IEmp | undefined
        empnameindex = this.getempDimensionsByFind(this.out_rowselected_inwrd.Empid);
        console.log('shivam', empnameindex);

        this.Selected_empname_json = empnameindex;

        this.Selected_orgname_json = orgnameindex;

        console.log('setttt')

        this.inwardOutwardForm.controls['documentsubject'].setValue(this.out_rowselected_inwrd.Documentsubject);
        this.inwardOutwardForm.controls['typedocument'].setValue(this.out_rowselected_inwrd.Documenttype);
        this.inwardOutwardForm.controls['type'].setValue(this.out_rowselected_inwrd.Moduletype);
        this.inwardOutwardForm.controls['documentno'].setValue(this.out_rowselected_inwrd.Documentno);
        this.inwardOutwardForm.controls['documentdate'].setValue(this.out_rowselected_inwrd.Documentdate);
        this.inwardOutwardForm.controls['remarks'].setValue(this.out_rowselected_inwrd.Remarks);
    }

    getDimensionsByFind(id: number) {
        return this.organization_Ajson.find(orgnameindex => orgnameindex.Orgid === id);
    }

    getempDimensionsByFind(id: number) {
        return this.employee_Ajson.find(empnameindex => empnameindex.Empid === id);
    }

    reportonRowSelectedEvent(selectedRow: any) {
    }

    reportonSelectionChanged(event: any) {
        let selected_outnode_inwrd = this.gridApi_report.getSelectedNodes();
        let selected_map = selected_outnode_inwrd.map((node: { data: any; }) => node.data);
        this.out_rowselected_inwrd = selected_map[0];
        console.log('Selection updated', this.out_rowselected_inwrd);
    }

//pagination page size
    onPageSizeChanged() {
        var value = (document.getElementById('page-size') as HTMLInputElement)
            .value;
        this.gridApi_org.paginationSetPageSize(Number(value));
    }

//grid- search
    quickSearch() {
        this.gridApi_org.setQuickFilter(this.searchValue);
    }

    onGridReady_org(params: any) {
        this.gridApi_org = params.api;
        this.gridColumnApi_org = params.ColumnApi;
        // this.gridColumnApi.sizeColumnsToFit()
    }

    onGridReady_inwrd(params: any) {
        this.gridApi_inwrd = params.api;
        this.gridColumnApi_inwrd = params.ColumnApi;
        // this.gridColumnApi.sizeColumnsToFit()
    }

    Uploadfile() {
        // this.loader = true;
        // this.formData.delete("college_code");
        // this.formData.delete("finyear");
        // this.formData.delete("useraadhaar");
        // this.formData.delete("batch_code");
        // this.formData.delete("semester");
        // this.formData.delete("excel");

        // this.formData.append("college_code", sessionStorage.getItem('College')!);
        // this.formData.append("finyear", sessionStorage.getItem('Finyear')!);
        // this.formData.append("useraadhaar", sessionStorage.getItem('Aadhaar')!);
        // this.formData.append("batch_code", this.BatchCode2);
        // this.formData.append("semester", this.SelectedBatSemester.Semester);
        // this.formData.append("excel", this.xlsxFile[0]);

        //   this.uploadSgpaservice.exceluploadsgpa(this.formData).subscribe((response: {}) => {
        //     this.res = response;
        //     // console.log("My Response ", this.res);
        //     if (this.res.data == true) {
        //       // this.dialogService.open({ message: 'File Uploaded Successfully!', positive: 'Ok', })
        //       Swal.fire({title: 'Success!', text: 'File Uploaded Successfully!', icon: 'success', confirmButtonText: 'OK'})//alert
        //
        //       this.loader = false;
        //       this.viewFile();
        //       this.UploadSgpaForm.reset();
        //     } else {
        //       // this.dialogService.open({ message: 'Failed to Upload!', positive: 'Ok', }),
        //       //   this.dialogService.open({ message: this.res.exception, positive: 'Ok', })
        //       Swal.fire({title: 'Error!', text: this.res.exception, icon: 'error', confirmButtonText: 'OK'})//alert
        //
        //       this.loader = false;
        //     }
        //   })
        //   this.UploadSgpaForm.reset();
    }

    public rowSelection: 'single' | 'multiple' = 'single';
    public rowSelection_inwrd: 'single' | 'multiple' = 'single';
    public rowSelection_report: 'single' | 'multiple' = 'single';

    updateOrganization() {

        let xyz = JSON.stringify(this.out_rowselected)
        let jsonObj = JSON.parse(xyz);

        let jsonin = {
            // "Orgid": parseInt(this.SelectedOrgName.Orgid),
            Orgname: String(jsonObj[0].Orgname),
            Concatperson: String(jsonObj[0].Concatperson),
            Contactmobile: String(jsonObj[0].Contactmobile),
            Contactemail: String(jsonObj[0].Contactemail),
            Orgtype: String(jsonObj[0].Orgtype),
        };
        this.commonService.Post_json(iu_orgnization, jsonin).subscribe((response: {}) => {
            this.res = response;
            if (this.res.data == true) {
                Swal.fire({
                    text: 'Data Submitted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }); //alert
                this.orgTypeAPI();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: this.res.exception,
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
            }
            // this.empTypeAPI();
        });
    }

    onGridReady_report(params: any) {
        this.gridApi_report = params.api;
        this.gridColumnApi_report = params.ColumnApi;
    }

    ViewimageReports() {
        let jsonin = {
            CollegeCode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Documentid: parseInt(this.out_rowselected_inwrd.Documentid.toString())
        };
        console.log('input', jsonin)
        this.commonService.Post_json(inwardoutwar_images, jsonin).subscribe((response: {}) => {
            console.log('Image', response)
            if (response == null) {
                this.globalmessage.Show_error('No data found')
                return;
            }
            this.reportinwardoutward = response

            this.MyReportImage = this.reportinwardoutward.map((x: any) =>
                this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${x.Image}`));
            console.log('kkksasa', this.MyReportImage)

            // this.reportinwardoutward.forEach((value: any, key: string) => {
            //
            //   this.slides = value.Image
            //   console.log(key, "", value);
            //   // this.slides = value;
            //   console.log('slides', value.Image)
            // });

            // UDownloadfiles(this.reportinwardoutward.blobdata, this.reportinwardoutward.photofile);


            //Download multiple image SafeURL

            // let nCtr = 0 ;
            // this.reportinwardoutward.forEach((value: any, key: string) => {
            //
            //   console.log(key , "" , value);
            //
            //   UDownloadfiles(value.Image, value.Filename);

            /*
            const contentType = '';
            const blobb = base64StringToBlob(this.reportinwardoutward.key, contentType);
            let blob = new Blob([blobb], {type: 'application/blob'});
            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.reportinwardoutward.photofile;
            link.click();
            */

        });
    }

    DownloadImage() {
        let jsonin = {
            CollegeCode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Documentid: parseInt(this.out_rowselected_inwrd.Documentid.toString())
        };
        console.log('input', jsonin)
        this.commonService.Post_json(inwardoutwar_images, jsonin).subscribe((response: {}) => {
            console.log('Image', response)
            if (response == null) {
                this.globalmessage.Show_error('No data found')
                return;
            }
            this.reportinwardoutward = response
            this.MyReportImage = this.reportinwardoutward.map((x: any) =>
                this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${x.Image}`));

            let nCtr = 0;
            this.reportinwardoutward.forEach((value: any, key: string) => {

                console.log(key, "", value);

                UDownloadfiles(value.Image, value.Filename);
            });
        });
    }

    updateInward() {

        console.log('kkk', this.out_rowselected_inwrd)
        //let xyz_inwrd = JSON.stringify(this.out_rowselected_inwrd)
        //let jsonObj_inwrd = JSON.parse(xyz_inwrd);


        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Moduletype: String(this.out_rowselected_inwrd.Moduletype),
            Orgname: this.out_rowselected_inwrd.Orgname,
            Documenttype: this.out_rowselected_inwrd.Documenttype,
            Orgid: String(this.out_rowselected_inwrd.Orgid),
            Empid: String(this.out_rowselected_inwrd.Empid),
            Empname: this.out_rowselected_inwrd.Empname,
            Documentsubject: this.out_rowselected_inwrd.Documentsubject,
            Documentno: this.out_rowselected_inwrd.Documentno,
            Remarks: this.out_rowselected_inwrd.Remarks,
            Createdby: this.oSession.aadhaar,
            Documentdate: this.out_rowselected_inwrd.Documentdate,
            Documentid: this.out_rowselected_inwrd.Documentid.toString()
        }

        let formData = new FormData();

        formData.append("input_form", encryptUsingAES256(jsonin));

        if (this.Files.length > 0) {
            for (let i = 0; i < this.Files.length; i++)
                formData.append('Files[]', this.Files[i], this.Files[i].name);
        }

        this.commonService.Post_formdata(iu_inwardoutward, formData).subscribe((response: {}) => {
            // this.res = response;
            let docid = response;
            if (response == null) {
                return;
            }
            if (response == docid) {
                this.globalmessage.Show_message('Data updated successflly')
            }

        });
    }
}

