import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangeSubjectsService, ITableData} from './change-subjects.service';
import {Router} from '@angular/router';
import {GlobalMessage} from '../../globals/global.message';
import Swal from 'sweetalert2';
import {AuthService} from "../../globals/authservice";
import {CommanService} from "../../globals/common.services";
import {
    CurrentSubjectGroupCode, GetAllBatchs,
    IU_Changeprofilesubmit,
    iu_nepsubjectv2,
    IU_UpdateSubjectGroupCode, Nepsubjects_url, Pg_batchs_URL,
    showsubjectgroup
} from "../../globals/global-api";
import {ISubjectetails} from "./change-subjects.model";
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';

//https://dev-academy.com/how-to-use-angular-interceptors-to-manage-http-requests/
@Component({
    selector: 'app-change-subjects',
    templateUrl: './change-subjects.component.html',
    styleUrls: ['./change-subjects.component.scss'],

})
export class ChangeSubjectsComponent implements OnInit {
    errors: any;
    savealert: boolean = false;
    public data!: ITableData;
    public filterQuery = '';
    submitted = false;

    changeSubForm!: FormGroup;
    currentsubForm!: FormGroup;

    Nep_findstudentform!: FormGroup;
    Nep_Changesubjectform!: FormGroup;

    batch_response!: [];

    SelectedBatch!: any;
    selectedIndex: any;
    updatesub: any;
    selected_groupcode: any = [];
    Groupid: any;
    Subject_group_code!: ISubjectetails[];

    Selected_profileedit!:any

    ///AutoComplete
    selected_batchcode: any;
    batchname_field = 'Batch_Name';
    formcreated: boolean = false;

    Nep_subjectgroup: any = [];
    NORMAL: string = 'normal';
    NEP: string = 'nep';

  submitloader = false;

    @ViewChild('infoModal') infoModal: any;
    private selectedtab!: string;
    private selected_aadhaar: number = 0;
    private selected_subjectres: any;
    public oe_json: any;
    public major_json: any;
    public minor_json: any;
    public vsc_json: any;
    public sec_json: any;
    public iks_json: any;
    public aec_json: any;
    public vec_json: any;
    public cc_json: any;
    public fp_json: any;

    private selected_oe: any;
    private selected_minor: any;
    private selected_vsc: any;
    private selected_sec: any;
    private selected_iks: any;
    private selected_aec: any;
    private selected_vec: any;
    private selected_cc: any;
    private selected_fp: any;
    public nep_submit = false;
    public profileeditspinner = false;

    showloader = false;
    selectupdatedsubject!: ISubjectetails;

    oSession!: Sessiondata;

    constructor(private router: Router, private commonService: CommanService,
                private changesubjectsService: ChangeSubjectsService,
                private globalMessage: GlobalMessage,
                private authservice: AuthService,private sessionService : SessionService) {
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionService)
        this.oSession.Getdatafromstroage();

        this.Createform();

    }

    Createform() {

        this.changeSubForm = new FormGroup({
            'Aadhaar': new FormControl('', Validators.required),
        });

        this.currentsubForm = new FormGroup({
            'GroupCode': new FormControl('', Validators.required),
            'CurrentGroupCode': new FormControl('', Validators.required),
            'change_sub': new FormControl('', Validators.required),
        });

        this.Nep_findstudentform = new FormGroup({
            ctr_nepbatch: new FormControl('', [Validators.required]),
            ctr_aadhaar: new FormControl('', [Validators.required])
        });

        this.Nep_Changesubjectform = new FormGroup({
            ctr_nepgroupcode: new FormControl('', [Validators.required]),
            ctr_nepsubjectname: new FormControl('', [Validators.required]),
            ctr_nepmajor: new FormControl('', [Validators.required]),
            ctr_nepminor: new FormControl('', [Validators.required]),
            ctr_nepoe: new FormControl('', [Validators.required]),
            ctr_nepvsc: new FormControl('', [Validators.required]),
            ctr_nepsec: new FormControl('', [Validators.required]),
            ctr_nepaec: new FormControl('', [Validators.required]),
            ctr_nepvec: new FormControl('', [Validators.required]),
            ctr_nepiks: new FormControl('', [Validators.required]),
            ctr_nepcc: new FormControl('', [Validators.required]),
             ctr_fp:  new FormControl('', [Validators.required]),
        });

        this.formcreated = true;
    }

    get fld_nepbatch() {
        return this.Nep_findstudentform.get('ctr_nepbatch');
    }

    get fld_aadhaar() {
        return this.Nep_findstudentform.get('ctr_aadhaar');
    }

    get fld_major() {
        return this.Nep_Changesubjectform.get('ctr_nepmajor');
    }

    get fld_minor() {
        return this.Nep_Changesubjectform.get('ctr_nepminor');
    }

    get fld_oe() {
        return this.Nep_Changesubjectform.get('ctr_nepoe');
    }

    get fld_vsc() {
        return this.Nep_Changesubjectform.get('ctr_nepvsc');
    }

    get fld_sec() {
        return this.Nep_Changesubjectform.get('ctr_nepsec');
    }

    get fld_aec() {
        return this.Nep_Changesubjectform.get('ctr_nepaec');
    }

    get fld_vec() {
        return this.Nep_Changesubjectform.get('ctr_nepvec');
    }

    get fld_iks() {
        return this.Nep_Changesubjectform.get('ctr_nepiks');
    }

    get fld_cc() {
        return this.Nep_Changesubjectform.get('ctr_nepcc');
    }

    get nepfind_fn() {
        return this.Nep_findstudentform.controls;
    }

    get nepchange_fn() {
        return this.Nep_Changesubjectform.controls;
    }

    modal() {
        this.infoModal.show();
    }


    Get_batchaadhharsubject() {
        this.showloader = true;
        let jsonin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode,
                'Useraadhaar':this.oSession.aadhaar
            };
        this.commonService.Post_json(CurrentSubjectGroupCode, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.selected_groupcode = response.data.CurrentSubjectGoroup.Subject_group_code;

            if (this.selectedtab == this.NORMAL) {
                this.currentsubForm.controls['GroupCode'].setValue(this.selected_groupcode);
            }
            if (this.selectedtab == this.NEP) {
                this.Nep_Changesubjectform.controls['ctr_nepgroupcode'].setValue(this.selected_groupcode);
            }
            this.showloader = false;
            this.CurrentSubjectID();
            this.CurrentSubGroupCodeApi();
        });

    }



    update_normalSubject() {//submit click
        this.submitloader = true;
        this.updatesub = this.changeSubForm.value;


        let jsoin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode,
                'useraadhaar': this.oSession.aadhaar,
                'existingsubjectgorupid': this.selected_subjectres.data.CurrentSubjectGoroup.Subject_group_id,
                'existingsubjectgroupcode': this.selected_groupcode,
                'UpdateSubjectGroupid': this.selectupdatedsubject.Subject_group_id,
                'Updatesubjectgroupcode': this.selectupdatedsubject.Subject_group_code,
                'subjectchangedby': this.oSession.aadhaar

            };

        console.log('neww',jsoin)

        this.commonService.Post_json(IU_UpdateSubjectGroupCode, jsoin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalMessage.Show_message('Updated Successfully!');
                this.submitloader = false;
            } else {
                this.globalMessage.Show_error('Error!');
            }

        }, error => {
            this.errors = error;
            this.submitloader = false;
        });
    }


    CurrentSubGroupCodeApi() {
        let jsonin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode
            };
        this.commonService.Post_json(CurrentSubjectGroupCode, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.selected_subjectres = response;

            if (this.selectedtab == this.NORMAL) {
                this.currentsubForm.controls['CurrentGroupCode'].setValue(response.data.CurrentSubjectGoroup.Subject_group_name);
                this.ChangeSubjectApi();
            }
            if (this.selectedtab == this.NEP) {
                this.Nep_Changesubjectform.controls['ctr_nepsubjectname'].setValue(response.data.CurrentSubjectGoroup.Subject_group_name);
                this.Showallsubjects();
            }

        });
    }

    CurrentSubjectID() {
        let jsonin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode
            };

        this.commonService.Post_json(CurrentSubjectGroupCode, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Groupid = response.data.CurrentSubjectGoroup.Subject_group_id;
        });
    }

    ChangeSubjectApi() {
        let jsonin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode
            };
        this.commonService.Post_json(CurrentSubjectGroupCode, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Subject_group_code = response.data.SubjectGrouplist;

            console.log("Subject Group : ", this.Subject_group_code);
        });
    }

    Showallsubjects() {
        let jsonin =
            {
                'aadhaar': this.selected_aadhaar,
                'finyear': this.oSession.finyear,
                'collegecode': this.oSession.collegecode,
                'batchcode': this.selected_batchcode
            };
        this.commonService.Post_json(showsubjectgroup, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Subject_group_code = response.data.SubjectGrouplist;

            console.log("Subject Group : ", this.Subject_group_code);
        });
    }

    GetNormalBatchApi() {
        this.commonService.Post_json(GetAllBatchs,"").subscribe((response) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.batch_response = response['data'];
            }
        });
    }

    Get_nepbatchs() {
        let jsonin = {
            webportal: 'DEGREE',
            Studenttype: '',
            Coursetype: 'UG',
        };
        this.commonService.Post_json(Pg_batchs_URL, jsonin).subscribe((response) => {
            if (response['data'] == '' || response['data'] == null) {
                alert('No data found');
            } else {
                this.batch_response = response['data'];
            }
        });
    }

    onChangeBatchSelect() {
        // console.log(this.SelectedBatch.Batch_Code);
    }

    onSelect_major(index: any) {

      console.log('lkkk',this.selectupdatedsubject)
        //https://stackblitz.com/edit/angular-dropdown-get-selected-object?file=src%2Fapp%2Fapp.component.ts
        if (index <= 0) {
            return;
        }
        this.major_json = this.Subject_group_code[index - 1];
        console.log('kkkkkk', this.major_json);
        let MINORLEVEL: number = 2;
        this.Nepsubjects(MINORLEVEL);
    }

    onLevelSelect(index: any, level: any) {
        if (level <= 0) {
            return;
        }

        if (index <= 0) {
            return;
        }
        if (level == 2) {
            console.log("minor : ", this.minor_json);
            this.selected_minor = this.minor_json[index - 1];
            console.log(this.selected_minor);
        }
        if (level == 3) {
            this.selected_oe = this.oe_json[index - 1];
        }
        if (level == 4) {
            console.log("VSC : ", this.vsc_json);
            this.selected_vsc = this.vsc_json[index - 1];
            console.log(this.selected_vsc);
        }
        if (level == 5) {
            this.selected_sec = this.sec_json[index - 1];
        }
        if (level == 6) {
            this.selected_aec = this.aec_json[index - 1];
        }
        if (level == 7) {
            this.selected_vec = this.vec_json[index - 1];
        }
        if (level == 8) {
            this.selected_iks = this.iks_json[index - 1];
        }
        if (level == 9) {
            this.selected_cc = this.cc_json[index - 1];
        }
      if (level == 10) {
        this.selected_fp = this.fp_json[index - 1];
      }




        this.Nepsubjects(level + 1);
    }

    Nepsubjects(level: number) {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.selected_batchcode,
            aadhaar: this.selected_aadhaar,
            subject_group_code: this.major_json.Subject_group_code,
            levelno: level,
            webportal: 'DEGREE',
            Otherlevelcode: 0
        };

        // console.log('level json  : ' + jsonin);
        this.commonService.Post_json(Nepsubjects_url, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    return;
                }

                if (level == 2) {
                    this.minor_json = response.data;
                    return;
                }
                if (level == 3) {
                    this.oe_json = response.data;
                    return;
                }
                if (level == 4) {
                    this.vsc_json = response.data;
                    return;
                }
                if (level == 5) {
                    this.sec_json = response.data;
                    return;
                }
                if (level == 6) {
                    this.aec_json = response.data;
                    return;
                }
                if (level == 7) {
                    this.vec_json = response.data;
                    return;
                }
                if (level == 8) {
                    this.iks_json = response.data;
                    return;
                }
                if (level == 9) {
                    this.cc_json = response.data;
                    return;
                }
              if (level == 10) {
                this.fp_json = response.data;
                return;
              }
            });
    }

    Submit_normalsubject() {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Change Your Subject?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change subject!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.update_normalSubject();
            }
        })
    }

    selectBatch(bat: any) {
        this.selected_batchcode = bat.Batch_Code;

        if (this.selectedtab == 'nep') {
            this.selected_aadhaar = 0;
            this.fld_aadhaar!.setValue(0);

            this.Nep_Changesubjectform.reset();
        }
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e: any) {
        // console.log("focused", e)
        // do something
    }

    Update_majorminor() {

    }

    Tabchange($type: string) {
        if (this.formcreated == false) {
            return;
        }
        if ($type == 'nep') {
            this.selectedtab = 'nep';
            this.Get_nepbatchs();
        }
        if ($type == 'normal') {
            this.selectedtab = 'normal';
            this.GetNormalBatchApi();
        }
    }

    aadhaar_change() {
        this.Nep_Changesubjectform.reset();

        this.selected_groupcode = '';
        if (this.selectedtab == 'nep') {
            this.selected_aadhaar = this.Nep_findstudentform.controls['ctr_aadhaar'].value;
            this.Nep_Changesubjectform.controls['ctr_nepgroupcode'].setValue(this.selected_groupcode);
        }
        if (this.selectedtab == 'normal') {
            this.currentsubForm.controls['GroupCode'].setValue(this.selected_groupcode);
            this.selected_aadhaar = this.changeSubForm.controls['Aadhaar'].value;
        }

        console.log(this.selected_aadhaar);
    }

    foucsin() {
        this.selected_groupcode = '';
        if (this.selectedtab == 'nep') {
            this.Nep_Changesubjectform.controls['ctr_nepgroupcode'].setValue(this.selected_groupcode);
        }
        if (this.selectedtab == 'normal') {
            this.selected_aadhaar = this.changeSubForm.controls['Aadhaar'].value;
        }
    }


    Submit_nep() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Change Your Subject?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change subject!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.Update_nepsubject();
            }
        })
    }

    Profile_Edit() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Edit Profile?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit Profile!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.Profile_edit();
            }
        })
    }

    Update_nepsubject() {
        this.nep_submit = true;
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            useraadhar: this.oSession.aadhaar,
            aadhaar: this.selected_aadhaar,
            batch_code: this.selected_batchcode,
            subject_group_id: this.major_json.Subject_group_id,
            subject_group_code: this.major_json.Subject_group_code,
            minor: this.selected_minor.Otherlevelcode,
            oe: this.selected_oe.Otherlevelcode,
            vsc: this.selected_vsc.Otherlevelcode,
            sec: this.selected_sec.Otherlevelcode,
            aec: this.selected_aec.Otherlevelcode,
            vec: this.selected_vec.Otherlevelcode,
            iks: this.selected_iks.Otherlevelcode,
            cc: this.selected_cc.Otherlevelcode,
            fp: this.selected_fp.Otherlevelcode
        };

        console.log('innn',jsonin)

        this.commonService.Post_json(iu_nepsubjectv2, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalMessage.Show_error('Error while updating !');
                this.nep_submit = false;
                return;
            }

            if (response.data == true) {
                this.globalMessage.Show_message('Updated Successfully!');
                this.Nep_findstudentform.reset();
                this.Nep_Changesubjectform.reset();
            }

            this.nep_submit = false;
        });
    }

    onTabChange($event: number) {
        if ($event == 1) {
            this.selectedtab = 'nep';
            this.GetNormalBatchApi();
            return;
        }
        if ($event == 0) {
            this.selectedtab = 'normal';
            this.GetNormalBatchApi();
            return;
        }
    }

    Profile_edit(){
        this.profileeditspinner = true;
        let jsonin = {
            finyear: this.oSession.finyear,
            collegecode: this.oSession.collegecode,
            aadhaar: this.selected_aadhaar,
        };

        console.log('innn',jsonin)

        this.commonService.Post_json(IU_Changeprofilesubmit, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalMessage.Show_error('Error while updating !');
                this.profileeditspinner = false;
                return;
            }

            if (response.data == true) {
                this.globalMessage.Show_message('Updated Successfully!');
                this.profileeditspinner = false;
            }
        });
    }
}
