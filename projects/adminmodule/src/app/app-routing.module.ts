import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { DefaultLayoutComponent } from './containers';
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {FinyearComponent} from "./views/pages/finyear/finyear.component";
import {InstallmentModule} from "./views/installment/installment.module";
import {StudentsApprovalModule} from "./views/students-approval/students-approval.module";
import {AdmissionReleaseModule} from "./views/admission-release/admission-release.module";
import {InwardoutwardModule} from "./views/inwardoutward/inwardoutward.module";
import {QuestionpaperModule} from "./views/feedbackform/feedbackform.module";
import {AttachunattachFeesAllModule} from "./views/feesattachunattach/attachfees-all.module";
import {DocumentModule} from "./views/document/document.module";
import {UpdateprofileModule} from "./views/students/updateprofile/updateprofile.module";
// import {HrmsModule} from "./views/hrms/hrms.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      // title: `Home`
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'table',
        loadChildren: () =>
            import('./views/table/table.module').then((m) => m.EditProfileModule),
      },
      {
        path: 'installment',
        loadChildren: () =>
            import('./views/installment/installment.module').then((m) => m.InstallmentModule),
      },
      {
        path: 'documentapproval',
        loadChildren: () =>
          import('./views/students-approval/students-approval.module').then((m) => m.StudentsApprovalModule),
      },
      {
        path: 'attachfeesall',
        loadChildren: () =>
          import('./views/attachfees-all/attachfees-all.module').then((m) => m.AttachFeesAllModule),
      },
      {
        path: 'feesindividual',
        loadChildren: () =>
          import('./views/feestructureattachment/feestructureattachment.module').then((m) => m.FeestructureattachmentModule),
      },
      {
        path: 'feesunattach',
        loadChildren: () =>
          import('./views/fee-unattachment/fee-unattachment.module').then((m) => m.FeeUnAttachmentModule),
      },
      {
        path: 'changesubject',
        loadChildren: () =>
          import('./views/change-subjects/change-subjects.module').then((m) => m.ChangeSubjectsModule),
      },
      {
        path: 'admissioncancelstudents',
        loadChildren: () =>
          import('./views/students/canceladmission/canceladmission.module').then((m) => m.CanceladmissionModule),
      },

      {
        path: 'studentprofile',
        loadChildren: () =>
          import('./views/students/studentprofile/studentprofile.module').then((m) => m.StudentprofileModule),
      },

      {
        path: 'register',
        loadChildren: () =>
          import('./views/students/register/register.module').then((m) => m.RegisterModule),
      },
      
      {
        path: 'otp',
        loadChildren: () =>
          import('./views/students/otp/otp.module').then((m) => m.OtpModule),
      },

      {
        path: 'updateimagestudents',
        loadChildren: () =>
          import('./views/students/updateprofile/updateprofile.module').then((m) => m.UpdateprofileModule),
      },

      {
        path: 'canceladmission',
        loadChildren: () =>
          import('./views/admission-cancel/admission-cancel.module').then((m) => m.AdmissionCancelModule),
      },

      {
        path: 'batchtransfer',
        loadChildren: () =>
          import('./views/batch-transfer/batch-transfer.module').then((m) => m.BatchTransferModule),
      },
      {
        path: 'feescollection',
        loadChildren: () =>
          import('./views/fees-collection/fees-collection.module').then((m) => m.FeesCollectionModule),
      },
      {
        path: 'uploadbill',
        loadChildren: () =>
          import('./views/upload-Billdesk/upload-Billdesk.module').then((m) => m.BillDeskModule),
      },
      {
        path: 'billdesk',
        loadChildren: () =>
          import('./views/bill-desk/bill-desk.module').then((m) => m.BillDeskModule),
      },
      {
        path: 'admissionrelease',
        loadChildren: () =>
          import('./views/admission-release/admission-release.module').then((m) => m.AdmissionReleaseModule),
      },
      {
        path: 'subjectquota',
        loadChildren: () =>
          import('./views/subject-quota/subject-quota.module').then((m) => m.SubjectQuotaModule),
      },
      {
        path: 'scholarship',
        loadChildren: () =>
          import('./views/scholarship/scholarship.module').then((m) => m.ScholarshipModule),
      },
      {
        path: 'marksheet',
        loadChildren: () =>
            import('./views/Marksheet_Approval/marksheet-approval.module').then((m) => m.MarksheetApprovalModule),
      },
      {
        path: 'outsidestudents',
        loadChildren: () =>
            import('./views/outside-students/outside-students.module').then((m) => m.OutsideStudentsModule),
      },
      {
        path: 'send-message',
        loadChildren: () =>
            import('./views/send-message/send-message.module').then((m) => m.SendMessageModule),
      },
      {
        path: 'eligible-list',
        loadChildren: () =>
            import('./views/eligible-list/eligible-list.module').then((m) => m.EligibleListModule),
      },
      {
        path: 'filedownload',
        loadChildren: () =>
            import('./views/download-file/download-file.module').then((m) => m.DownloadFileModule),
      },
      {
        path: 'editprofile',
        loadChildren: () =>
            import('./views/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
      },
      {
        path: 'update-details',
        loadChildren: () =>
            import('./views/update-details/update-details.module').then((m) => m.UpdateDetailsModule),
      },
      {
        path: 'lastyear-outstandings',
        loadChildren: () =>
            // import('./views/Lastyear-outstandings/lastyear-outstandings.module').then((m) => m.LastYearOutstandingsModule),
            import('./views/Lastyear-outstandings/lastyear-outstandings.module').then((m) => m.LastYearOutstandingsModule),
      },
      {
        path: 'admission-release',
        loadChildren: () =>
            import('./views/admission-release/admission-release.module').then((m) => m.AdmissionReleaseModule),
      },
      {
        path: 'leavingcertificate',
        loadChildren: () =>
          import('./views/leaving-certificate/leaving-certificate.module').then((m) => m.LeavingCertificateModule),
      },
      {
        path: 'usercreation',
        loadChildren: () =>
          import('./views/user-creation/user-creation.module').then((m) => m.UserCreationModule),
      },
      {
        path: 'queryticket',
        loadChildren: () =>
          import('./views/query-ticket/query-ticket.module').then((m) => m.QueryTicketModule),
      },
      {
        path: 'web-portal',
        loadChildren: () =>
            import('./views/web-portal/web-portal.module').then((m) => m.WebPortalModule),
      },
      {
        path: 'division&rollno',
        loadChildren: () =>
          import('./views/assign-division/assign-division.module').then((m) => m.SubjectQuotaModule),
      },
      {
        path: 'feereports',
        loadChildren: () =>
            import('./views/fee-report/fee-report.module').then((m) => m.FeeReportModule),
      },
      {
        path: 'adminreports',
        loadChildren: () =>
            import('./views/admin-report/admin-report.module').then((m) => m.AdminReportModule),
      },
      {
        path: 'inwardoutward',
        loadChildren: () =>
            import('./views/inwardoutward/inwardoutward.module').then((m) => m.InwardoutwardModule),
      },
      {
        path: 'feedback',
        loadChildren: () =>
            import('./views/feedbackform/feedbackform.module').then((m) => m.QuestionpaperModule),
      },
      {
        path: 'abcdapproval',
        loadChildren: () =>
            import('./views/abcd-approval/abcd.module').then((m) => m.EditProfileModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./views/hrms/hrms.module').then((m) => m.HrmsModule),
      },

      {
        path: 'attachunattachfees',
        loadChildren: () =>
          import('./views/feesattachunattach/attachfees-all.module').then((m) => m.AttachunattachFeesAllModule),
      },
      {
        path: 'document',
        loadChildren: () =>
          import('./views/document/document.module').then((m) => m.DocumentModule),
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'finyear',
    component: FinyearComponent,
    data: {
      title: 'fin Page'
    }
  },

  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'dashboard Page'
    },
  },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
