import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserCreationService } from './user-creation.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DeleteCellCustomComponent } from '../delete-cellcustom/delete-cellcustom.component';
import { Router } from '@angular/router';
import { EditCellCustomComponent } from '../editcell-custom/editcell-custom.component';
import { AgGridAngular } from 'ag-grid-angular';
import { GlobalMessage } from '../../globals/global.message';
import { CommanService } from '../../globals/common.services';
import {
  IRoles,
  IReq_Rolename,
  IRes_Selectedmenus,
  IResp_Menus,
} from '../user-creation/user-creation.models';
import {
  InsertUpdateUsers,
  UsersList,
  iu_roles,
  get_roles,
  GetAllBatchs,
  config_menus,
  iu_rolemenus,
  role_selectedmenus,
} from '../../globals/global-api';
import { Sessiondata } from '../../models/request';
import { SessionService } from '../../globals/sessionstorage';
import { StoreService } from '../../globals/store.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
  providers: [UserCreationService],
})
export class UserCreationComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  showMainContent: Boolean = true;
  showadd: Boolean = false;
  showupdate: Boolean = false;
  private gridApi: any;
  private gridColumnApi: any;

  private gridApi_2: any;
  private gridColumnApi_2: any;

  gridOptions: any;
  error: any;
  data: any;
  searchValue: any;
  searchValue_menu: any;
  savealert: boolean = false;
  public filterQuery = '';
  submitted = false;
  usercreationForm!: FormGroup;
  Frm_role!: FormGroup;
  Frm_menu!: FormGroup;
  Frm_RoleAttach!:FormGroup;
  res: any;
  Batchs = [];
  Roles!: IRoles[];
  SelectedRole!: IRoles;

  Menus!: IResp_Menus[];

  selectedMenus!: IRes_Selectedmenus;

  SelectedUserRole:any;

  SelectedBatch!: any;
  userlist: any;
  password: any;
  aadhaar: any;
  createrole: any;
  Name: any;
  StudentAadhaar: any;
  ID: any;
  User_Name: any;
  User_pwd: any;
  Userrole: any;
  update: any;
  loader = false;
  rolenames: any;
  out_rowselected: any;

  currentactive: boolean = false;

  selectedUserGrid:any;

  oSession!: Sessiondata;

  public rowSelection: 'single' | 'multiple' = 'single';

  public rowSelection_menuconfig: 'single' | 'multiple' = 'multiple';

  private gridApi_menuconfig: any;
  private gridColumnApi_menuconfig: any;

  constructor(
    private router: Router,
    private UserCreationService: UserCreationService,
    private globalmessage: GlobalMessage,
    private formBuilder: FormBuilder,
    public store: StoreService,
    private commonService: CommanService,
    private sessionService: SessionService
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  ngOnInit(): void {
 


    this.oSession = new Sessiondata(this.sessionService);
    this.oSession.Getdatafromstroage();

    this.usercreationForm = new FormGroup({
      aadhaar: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      UserRole: new FormControl('', Validators.required),
    });

    this.Frm_role = this.formBuilder.group({
      rolenames: new FormControl('', Validators.required),
    });

    this.Frm_menu = this.formBuilder.group({
      roleuser: new FormControl('', Validators.required),
    });

    this.Frm_RoleAttach = this.formBuilder.group({
      userrole: new FormControl('', Validators.required),
    });

    this.GetBatchApi();
    this.GridTableApi();
    this.GetRoleApi();
  }

  GridTableApi() {
    //grid list
    this.loader = true;
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      aadhaar: this.oSession.aadhaar,
      usertype: '',
    };
    this.commonService
      .Post_json(UsersList, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        this.rowss = this.res.data;
        this.loader = false;
      });
  }

  EditCell() {
    // if (this.ID == null) {
    //   alert("please select row to edit");
    // }
    // else {
    let jsonin = {
      user_pwd: this.User_pwd,
      user_name: this.User_Name,
      aadhaar: parseInt(this.StudentAadhaar),
      user_role: this.Userrole,
      user_type: 'ALL',
      approved: parseInt(this.Approved),
    };
    console.log('update', this.update);
    this.commonService
      .Post_json(InsertUpdateUsers, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        console.log('updated models', this.res);
        if (this.res.data == true) {
          this.UpdatedDialog();
          this.GridTableApi();
          // this.CurrentUrlNavigation();
        } else {
          this.FailedResponseDialog();
        }
      });
  }

  CurrentUrlNavigation() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  //Grid column

  columnDefs = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: true,
    },
    {
      headerName: 'Aadhaar',
      field: 'Aadhaar',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Password',
      field: 'User_pwd',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Name',
      field: 'User_Name',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'User Role',
      field: 'Userrole',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Approved',
      field: 'Approved',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
 
    {
      headerName: 'Action',
      field: 'Action',
      maxWidth: 80,
      cellRenderer: EditCellCustomComponent,
    },
  ];

  columnDefsUser = [
    {
      field: '',
      maxWidth: 50,
      checkboxSelection: false,
    },
    {
      headerName: 'User Role',
      field: 'Rolenames',
      resizable: true,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ];

  columnDefsMenus = [
    {
      field: 'selection',
      headerName: '',
      headerCheckboxSelection: false,
      checkboxSelection: false,
      lockPosition: true,
      cellRenderer: (params: any) => {
        const input = document.createElement('input');
        input.type = 'checkbox';

        input.checked = false;
        if (params.node.data.isEnabled) {
          input.checked = true;
        }

        // Return the DOM element instead of an HTML string
         return input;

      },
    },
    {
      headerName: 'Main Menu',
      field: 'Mainmenu',
      filter: true,
      editable: true,
      resizable: true,
      flex: 1,
    },
    {
      headerName: 'Sub Menu',
      field: 'Menu_name',
      filter: true,
      editable: true,
      resizable: true,
      flex: 1,
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
    resizable: true,
  };

  onGridReady_menuconfig(params: any) {
    this.gridApi_menuconfig = params.api;
    this.gridColumnApi_menuconfig = params.ColumnApi;
  }

  //Grid Rows
  rowss: any = [];

  //grid- search
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  quickSearch_menu(event: any) {
    this.gridApi_menuconfig.setQuickFilter(this.searchValue_menu);
  }

  onGridReady_Tab1(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onGridReady_Tab2(params: any) {
    this.gridApi_2 = params.api;
    this.gridColumnApi_2 = params.ColumnApi;
  }

  onAddRow() {
    let jsonin = {
      aadhaar: this.usercreationForm.controls['aadhaar'].value,
      user_pwd: this.usercreationForm.controls['password'].value,
      user_name: this.usercreationForm.controls['Name'].value,
      user_role: this.usercreationForm.controls['UserRole'].value,
      user_type: 'ALL',
    };
    console.log('update', jsonin);
    this.commonService
      .Post_json(InsertUpdateUsers, jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        console.log('My Response ', this.res);
        this.globalmessage.Show_successmessage(
          'User Role Created Successfully.'
        );

        this.gridApi.setRowData(this.res.data);

        if (this.res.data == true) {
          this.GridTableApi();
          this.UpdatedDialog();
          // this.CurrentUrlNavigation();
        } else {
          this.FailedResponseDialog();
        }
      });
  }

  onCreateRole() {
    let jsonin = {
      Rolenames: this.Frm_role.controls['rolenames'].value,
    };
    console.log('NewRole::', jsonin);

    this.commonService
      .Post_json(iu_roles, this.Frm_role.value)
      .subscribe((response) => {
        this.res = response.data;
        console.log('response::--->', this.res);

        if (this.res == true) {
          let push_jsonin = {
            Rolenames: this.Frm_role.controls['rolenames'].value,
            Menus: '',
          };
          this.globalmessage.Show_message('User Role Created successfully');
          this.Roles.push(push_jsonin);
        }
      });
  }

  onDeleteRole() {
    this.Frm_role.reset();
  }

  Show() {
    this.GetMenusApi();
  }

  Approved: any;

  onRowSelectedEvent(event: any) {
    this.StudentAadhaar = event.data.Aadhaar;
    this.User_Name = event.data.User_Name;
    this.User_pwd = event.data.User_pwd;
    this.Userrole = event.data.Userrole;
    this.Approved = event.data.Approved;
  }

  onSelectionChanged_tab1(event: any) {
    let selected_outnode = this.gridApi.getSelectedRows();
    this.selectedUserGrid = selected_outnode[0];

    // if(this.selectedUserGrid.Userrole == "STUDENTS"){
    //   this.globalmessage.Show_message("User Role can't be student")
    //   return
    // }

    // console.log('selected_Education', this.selectedUserGrid);

  }

  onSelectionChanged(event: any) {
  }

  GetBatchApi() {
    this.commonService
      .Post_json(GetAllBatchs, '')
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          alert('No data found');
        } else {
          this.Batchs = response['data'];
        }
      });
  }

  GetRoleApi() {
    this.commonService.Post_json(get_roles, '').subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        alert('No data found');
      } else {
        this.Roles = response['data'];
      }
    });
  }

  GetMenusApi() {
    this.commonService
      .Post_json(config_menus, '')
      .subscribe((response: any) => {
        console.log('res', response);
        if (response == null) {
          this.globalmessage.Show_error('No data found');
          return;
        }
        this.Menus = response;

        if (this.Menus.length > 0) {
          console.log('YesMenu');
          this.Onrole_selectedmenus();
        }
      });
  }

  Onrole_selectedmenus() {
    let jsonin: IReq_Rolename = {
      Rolenames: this.SelectedRole.Rolenames,
    };

    this.commonService
      .Post_json(role_selectedmenus, jsonin)
      .subscribe((response: any) => {

        const hasKey = 'data' in response;
        if (hasKey) {
          this.selectedMenus = response.data;
        } else {
          this.selectedMenus = response;
        }

        console.log('selected menus::', this.selectedMenus);

        if (this.selectedMenus) {
          var sMenus = this.selectedMenus.Menus!;
          let AMenus = sMenus.split(',');

  
          console.log('Amenus',AMenus,sMenus)

          for (const menu of this.Menus) {

            // this.Menus[key].isEnabled = false;
            let afound = AMenus.find(
              (i) => i === menu.Myid.toString()
            );
            console.log('afound',afound)

            if (afound !== undefined) {
              menu.isEnabled = true; 
            } else {
              menu.isEnabled = false; 
            }

          }
          this.gridApi_menuconfig.redrawRows();
        }
      });
  }

  OnSelectedRow() {}

  onChangeBatchSelect() {
    console.log(this.SelectedBatch.Batch_Code);
  }

  UpdatedDialog() {
    this.globalmessage.Show_message('Row Updated Successfully!...');
  }

  FailedResponseDialog() {
    this.globalmessage.Show_message('Failed to Update');
  }

  onRowSelectedEvent_menuconfig(event: any) {}

  onSelectionChanged_menuconfig(event: any) {

    let selected_outnode = this.gridApi_menuconfig.getSelectedNodes();
    this.out_rowselected = selected_outnode.map(
      (node: { data: any }) => node.data
    );
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log('Selection updated', this.out_rowselected);
   
  }

  onSubmit() {
    if (this.out_rowselected.length <= 0) {
      this.globalmessage.Show_message('No Data Found');
      return;
    }

    let ArrayMenus = [];

    for (let i of this.out_rowselected) {
      console.log('data', i.Myid);
      ArrayMenus.push(i.Myid);
    }
    let data = '';
    data = ArrayMenus.toString();

    let jsonin = {
      Rolenames: this.SelectedRole.Rolenames,
      Menus: data,
    };

    console.log('json', jsonin);

    this.commonService.Post_json(iu_rolemenus, jsonin).subscribe((response) => {
      this.res = response.data;
      // console.log('response::', this.res);

      if (this.res == true) {
        this.globalmessage.Show_message('Data Updated Successfully');
      } else {
        this.globalmessage.Show_message('Failed to Update!');
      }
    });
  }

  onAttach(){
    console.log('slelelele',this.SelectedUserRole.Rolenames)
  }
}
