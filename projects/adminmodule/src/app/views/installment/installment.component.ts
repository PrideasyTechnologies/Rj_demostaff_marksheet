import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstallmentService} from './installment.service';
import {CellClickedEvent, ColDef, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {DeleteCellCustomComponent} from '../delete-cellcustom/delete-cellcustom.component';
import {Router} from '@angular/router';
import {base64StringToBlob} from 'blob-util';
import {GlobalMessage} from "../../globals/global.message";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommanService} from "../../globals/common.services";
import {
  Activedeactiveinstallments, downloadinstallmenttemplate, FeesTerm,
  GetInstallmentHeader, FeesHead,
  GetInstallments, Batchs,
  installmentdetails, IU_AttachFeesToall, IU_Installments, uploadinstallmenttemplate
} from "../../globals/global-api";
import { SessionService } from '../../globals/sessionstorage';
import { Sessiondata } from '../../models/request';
import { encryptUsingAES256 } from '../../globals/encryptdata';
import {UDownloadfiles} from "../../globals/global_downloadfiles";


type MyArrayType = Array<{id: number, name: string}>;

@Component({
    selector: 'app-installment',
    templateUrl: './installment.component.html',
    styleUrls: ['./installment.component.scss'],
    providers: [InstallmentService],
})
export class InstallmentComponent implements OnInit {


    // DefaultColDef sets props common to all Columns
    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };

    // Data that gets displayed in the grid
    public rowData$!: Observable<any[]>;

    // For accessing the Grid's AP


    // fileName= 'ExcelSheet.xlsx';

    private gridApi_install: any;
    private gridColumnApi_install: any;

    private gridApi_active: any;
    private gridColumnApi_active: any;

    installment_gridOptions: any;
    active_gridOptions: any;

    bat: string = '';
    error: any;
    GETTABLE: any = [];
    SelectedDelete: any = [];
    savealert: boolean = false;
    public filterQuery = '';
    submitted = false;

    selected_installment: any;

    installmentForm!: FormGroup;
    feesAttachmentForm!: FormGroup;
    loader!: any;
    DownloadUploadForm!: any;

    deleterequest: any;
    showlist: any;
    amount: any;
    Batchs = [];
    Fees = [];
    Terms = [];
    Installments = [];
    SelectedBatch: any;
    SelectedFees: any;
    SelectedTerm: any;
    SelectedInstallments: any;
    res: any;
    SelectedInstallment: any;
    SelectedActiveDeactive: any;
    actdeactdata: any;
    Installment: any;
    Batch_Code: any;
    Term_Name: any;
    Fees_Name: any;
    Mode: string = 'DELETE';
    searchValue: any;

    currentactive : boolean = false;


    Downloadloader = false;

    value: any;
    total = 0;

    //Grid Rows
    installment_rows: any = [];

    //pagination page size
    public paginationPageSize_installment = 10;
    public paginationPageSize_active = 10;

    oSession!: Sessiondata;

    // agGridAngular: any;

    // @ViewChild('content') content:ElementRef;

    constructor(private router: Router, private http: HttpClient,
                private installmentService: InstallmentService,
                private globalmessage: GlobalMessage,
                private formBuilder: FormBuilder,private commonService: CommanService,private sessionService : SessionService
    ) {

        this.installment_gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };

        this.active_gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
    }

    // Finyear = parseInt(sessionStorage.getItem('Finyear')!);
    // CollegeCode = parseInt(sessionStorage.getItem('College')!);
    // Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
    // Token = sessionStorage.getItem('Token')!;

    ngOnInit(): void {

        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        console.log('datada',this.oSession.aadhaar)
        console.log('datada',this.oSession.collegecode)
        console.log('datada',this.oSession.finyear)

        this.Createforms();
        this.GetBatchApi();
        this.GetFeesHeadApi();
        this.GetTermSApi();

    }

    Createforms() {
        this.installmentForm = this.formBuilder.group({
            batchname: ["", [Validators.required]],
            termname: ['', [Validators.required]],
            feesname: ['', [Validators.required]],
          installment: ['', [Validators.required]],
            amount: ['', [Validators.required]],
        });
        this.feesAttachmentForm = this.formBuilder.group({
            Batch: ["", [Validators.required]],
            Term_Name: ["", [Validators.required]],
            installmentactivedeactive: ["", [Validators.required]],
            active_deactive: ["", [Validators.required]],

        });

      this.currentactive = true;

    }

    //installment select list
    installment: MyArrayType = [
        {id: 1, name: 'First Installment'},
        {id: 2, name: 'Second Installment'},
        {id: 3, name: 'Third Installment'},
        {id: 4, name: 'Fourth Installment'},
        {id: 5, name: 'Fifth Installment'},
        {id: 6, name: 'Sixth Installment'},
        {id: 7, name: 'Seventh Installment'},
        {id: 8, name: 'Eighth Installment'},
        {id: 9, name: 'Nineth Installment'},
        {id: 10, name: 'Tenth Installment'},
        {id: 99, name: 'Full Installment'}
    ];

    //Upload File
    xlsxFile!: Array<File>;

    xlsxUpload(element: any) {
        this.xlsxFile = element.target.files;
        console.log('filee::',this.xlsxFile)
        if (this.xlsxFile[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && this.xlsxFile[0].size < 2400000) {
        } else {
            this.globalmessage.Show_message('Only .xlsx file allowed!');
        }
    }



    UploadInstallment() {

        let jsonin = {

            collegecode : this.oSession.collegecode,
            finyear : this.oSession.finyear,
            useraadhaar : this.oSession.aadhaar,
            batchcode : this.BatchCode,
            term_code : this.SelectedTerm.Term_Code,
            installmentid : this.SelectedInstallments.id,
            installment :  this.SelectedInstallments.name

        }

      let formData = new FormData();

        formData.append("input_form",encryptUsingAES256(jsonin));
        formData.append('file', this.xlsxFile[0]);

        this.commonService.Post_formdata(uploadinstallmenttemplate,formData).subscribe((response: {}) => {
            this.res = response;
            // console.log("My Response ", this.res);
            if (this.res.data == true) {
                this.globalmessage.Show_successmessage('File Uploaded Successfully!');
            } else {
                this.globalmessage.Show_error(this.res.exception);
            }
        });
    }

    //download File

    DownloadInstallment() {
        this.Downloadloader = true;
        let jsonin = {
            'Finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            'Batchcode': this.BatchCode,
            'Term_Code': this.SelectedTerm.Term_Code,
            'useraadhaar': this.oSession.aadhaar,
            'Installmentid': this.SelectedInstallments.id,
        };
        if (this.BatchCode == null) {
            this.globalmessage.Show_message('Please Select Batch!');//alert
            this.Downloadloader = false;
        } else {
            this.commonService.Post_json(downloadinstallmenttemplate,jsonin).subscribe(response => {
                this.res = response;

              UDownloadfiles(this.res.blobdata,this.res.excelfile)

                this.Downloadloader = false;
            });
        }
    }


    CreateInstallments() { //Api for Saving data on button click

        if (this.amount < 0) {
            alert('please Enter Amount');
            return;
        }
        this.submitted = true;
        let jsonin = {
            'Finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            'Batch_code': this.BatchCode,
            'Term_Code': this.SelectedTerm.Term_Code,
            'Term_Name': this.SelectedTerm.Term_Name,
            'Fees_code': this.SelectedFees.Fees_Code,
            'Fees_Name': this.SelectedFees.Fees_Name,
            'Installment': this.SelectedInstallments.name,
            'Installmentid': this.SelectedInstallments.id,
            'Amount': this.installmentForm.controls['amount'].value
        };
        this.commonService.Post_json(IU_Installments,jsonin).subscribe((response: {}) => {
            this.res = response;
            if (this.res.data == true) {
                this.GetInstallments();
                this.SaveSuccessDialog();
            } else {
                alert('Error!');
            }
        });
    }



    findsum(data: any) {

        this.value = data;
        for (let i = 0; i < data.length; i++) {
            this.total += this.value[i].Amount;
        }
    }

    GetInstallments() {

        if (this.selectBatch == null) {
            alert('select batch');
            return;
        }
        if (this.SelectedTerm == null) {
            alert('select Term');
            return;
        }
        if (this.SelectedInstallments == null) {
            alert('select Installment');
            return;
        }

        let jsonin = {
            'Finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            'Batch_code': this.BatchCode,
            'Term_Code': this.SelectedTerm.Term_Code,
            'Installment': String(this.SelectedInstallments.name),
            'Installmentid': parseInt(this.SelectedInstallments.id),
        };
        console.log('refreshinput',jsonin)

        this.GETTABLE = null;
        this.total = 0;
        this.commonService.Post_json(GetInstallments,jsonin).subscribe((response: any) => {
          console.log('Refresh res',response)
            if (response != null) {
                this.findsum(response.data);
                this.installment_gridOptions.api.setRowData(response.data);
            }
        });
    }

    DeleteApi(event: any) {
        if (event != null) {

            let jsonin = {
                'College_code': event.CollegeCode,
                'Finyear': event.Finyear,
                'Batch_code': event.BatchCode,
                'Term_Code': event.TermCode,
                'Fees_code': event.FeesCode,
                'Installment': event.Installment,
                'Installmentid': event.Installmentid,
                'Amount': event.Amount,
                'Mode': 'DELETE'
            };
            this.commonService.Post_json(IU_Installments,jsonin).subscribe((response: {}) => {

                if (response != '' || response != null) {
                    this.res = response;
                    this.GetInstallments();
                }

            });
        }
    }

    //Grid column
    installment_columnDefs = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },

        {headerName: 'ID', field: 'InstallmentID', maxWidth: 60, resizable: true},
        {headerName: 'Fees_Name', field: 'Fees_Name', resizable: true},
        {headerName: 'Term_Name', field: 'Term_Name', resizable: true},
        {headerName: 'Installment', field: 'Installment', maxWidth: 130, resizable: true},
        {headerName: 'Amount', field: 'Amount', maxWidth: 100, resizable: true},
        {headerName: 'Delete', field: 'Action', maxWidth: 80, cellRenderer: DeleteCellCustomComponent}
    ];



    onPageSizeChanged() {
        var value = (document.getElementById('page-size') as HTMLInputElement)
            .value;
        this.gridApi_install.paginationSetPageSize(Number(value));
    }

    //grid- search
    quickSearch() {
        this.gridApi_install.setQuickFilter(this.searchValue);
    }

    onGridReady_installment(params: any) {

        this.gridApi_install = params.api;
        this.gridColumnApi_install = params.ColumnApi;
    }

    onGridReady_active(params: GridReadyEvent) {

        this.gridApi_active = params.api;
        //this.gridColumnApi_active = params.ColumnApi;
    }

    //checkbox selection
    TotalAmount: any;

    onRowSelectedEvent_installment(event: any) {
        this.TotalAmount = event.data.Amount;
    }

    onSelectionChanged(event: any) {
    }


    GetBatchApi() { //Batch select list displaying

        this.commonService.Post_json(Batchs,"").subscribe((response: any) => {

            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Batchs = response['data'];

            }
        });
    }


  onChangeInstallmentSelect(){
    console.log('selected installment',this.SelectedInstallments)

  }

  onChangeInstallmentSelectactive() { //when installment is selected
    }

    onChangeTermSelect() {
    }//when term is selected

    GetTermSApi() { //select tag list displaying
        this.commonService.Post_json(FeesTerm,"").subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Terms = response['data'];
            }
        });
    }

    GetFeesHeadApi() { //select tag list displaying
        this.commonService.Post_json(FeesHead,"").subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Fees = response['data'];
            }
        });
    }

    // openYesNoDialog() {//alert dialogue box
    //
    //   this.dialogService.open(
    //     {
    //       title: '',
    //       message: 'Please Login',
    //       positive: 'Ok',
    //       // negative: 'Cancel',
    //       // neutral: 'Not sure'
    //     })
    //     .then((result :any)=> {
    //     }, () => {
    //     });
    // }

    DeleteSuccessDialog(dataevent: any) {//alert for delete button

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                this.DeleteApi(dataevent);

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

        /*
        this.dialogService.open(
          {
            title: '',
            message: 'Are you sure...You want to Delete this Data??',
            positive: 'Yes',
            negative: 'No',
            // neutral: 'Not sure'
          })
          .then((result: any) => {

            let posit = JSON.parse(result);
            if (posit.positive == 1) {
              this.DeleteApi(dataevent);
            } else {

            }
          }, () => {
          });

         */
    }

    SaveSuccessDialog() {//alert for save button
        this.globalmessage.Show_message('Your Data Updated Successfully!..')
        // this.dialogService.open(
        //   {
        //     title: '',
        //     message: 'Your Data Updated Successfully!..',
        //     positive: 'Ok',
        //     // negative: 'Cancel',
        //     // neutral: 'Not sure'
        //   })
        //   .then(result => {
        //     console.log(result);
        //   }, () => {
        //   });
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


    //Activate Installment
    //commented


    AttachAllFees() {
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            'batchcode': this.SelectedBatch.Batch_Code,
            'termcode': this.SelectedTerm.Term_Code,
        };
        this.commonService.Post_json(IU_AttachFeesToall,jsonin).subscribe((response: any) => {
            this.res = response;
            // console.log("Response ", this.res);
        });

    }

    ActiveDeactive: Array<Object> = [
        {value: 1, name: 'Active'},
        {value: 0, name: 'Deactive'},
    ];


    term: any;


    installmentdata: any;

    GetInstallmentApi() { //select tag list displaying
        let jsonin = {
            'finyear': this.oSession.finyear,
            'College_code': this.oSession.collegecode,
            // "Batch_code": this.SelectedBatch.Batch_Code,
            'Batch_code': this.BatchCode,//autocomplete
            'Term_Code': this.SelectedTerm.Term_Code,
        };
        this.commonService.Post_json(GetInstallmentHeader,jsonin).subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.Installments = response['data'];
            }
        });
    }

    onChangeActiveDeactiveSelect() {
    }

    OnUpdate() { //select tag list displaying
      console.log('selected',this.SelectedInstallments)
        let jsonin = {
            'finyear': this.oSession.finyear,
            'collegecode': this.oSession.collegecode,
            // "batchcode": this.SelectedBatch.Batch_Code,
            'batchcode': this.BatchCode,//autocomplete
            'termcode': this.SelectedTerm.Term_Code,
            // 'installment': this.SelectedInstallments.id,

          'installment': this.SelectedInstallments.id,
            'activedeactive': this.SelectedActiveDeactive.value
        };
        console.log('input',jsonin)
        this.commonService.Post_json(Activedeactiveinstallments,jsonin).subscribe((response: {}) => {
            this.res = response;
            // console.log("Response ", this.res);

            if (this.res.data == true) {
                this.globalmessage.Show_message('Updated Successfully!');
            } else {
                this.globalmessage.Show_message('Failed to Update!');
                this.globalmessage.Show_error(this.res.exception);
            }
        });
    }

    Showloader = false;
    ShowInstallmentDetails() {
        this.Showloader = true;
        let jsonin = {
            'finyear': this.oSession.finyear,
            'college_code': this.oSession.collegecode,
            'batchcode': this.BatchCode,//autocomplete
            'term_code': this.SelectedTerm.Term_Code,
        };
        this.commonService.Post_json(installmentdetails,jsonin).subscribe((response: any) => {
            if (response != null) {
                this.active_gridOptions.api.setRowData(response.data);
                this.Showloader = false;
            }
        });
        /*
        this.httpService.getData().subscribe((data) => {

          // do something with the data here

        });

         */
    }

    //Grid column
    active_columnDefs: ColDef[] = [
        // {
        //   field: '',
        //   maxWidth: 50, checkboxSelection: true
        // },
        {headerName: 'Batch Name', field: 'Batch_name', resizable: true},
        {headerName: 'Term Name', field: 'Term_name', resizable: true},
        {headerName: 'Installment', field: 'Installment', maxWidth: 130, resizable: true},
        {headerName: 'Installment ID', field: 'Installmentid', maxWidth: 120, resizable: true},
        {headerName: 'Amount', field: 'Amount', maxWidth: 100, resizable: true},
        {headerName: 'Active/Deactive', field: 'Activedeactive', maxWidth: 120, resizable: true},
        // { headerName: 'Delete', field: 'Action', maxWidth: 80, cellRendererFramework: DeleteCellCustomComponent }
    ];

    //Grid Rows
    rowss1: any = [];

    //checkbox selection


    // AllAttachDialog() {
    //
    //   this.dialogService.open(
    //     {
    //       title: 'Delete',
    //       message: 'Are You Sure!... You Want To Attached All Students??',
    //       positive: 'Yes',
    //       negative: 'Cancel',
    //       // neutral: 'Not sure'
    //     })
    //     .then(result => {
    //
    //       let posit = JSON.parse(result);
    //       // console.log(posit.positive);
    //       if (posit.positive == 1) {
    //         this.AttachAllFees();
    //       } else {
    //       }
    //     }, () => {
    //     });
    // }


    ///AutoComplete
    TermCode: any;

    keyword = 'name';
    TermKeyword = 'Term_name';


    selectAtBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
    }


    onGridReady_demo(params: GridReadyEvent) {
        this.rowData$ = this.http
            .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    }

    // Example of consuming Grid Event
    onCellClicked(e: CellClickedEvent): void {
    }

    // Example using Grid's API


  uploadfile() {

  }
}


