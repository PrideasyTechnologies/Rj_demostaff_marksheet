import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './views/pages/login/login.component';
import {DefaultLayoutComponent} from './containers';
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {FinyearComponent} from "./views/pages/finyear/finyear.component";
import {QueryTicketModule} from "./views/query-ticket/query-ticket.module";


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
        path: 'marksheet',
        loadChildren: () =>
          import('./views/marksheet/marksheet.module').then((m) => m.MarksheetModule),
      },
      {
        path: 'upload-picture',
        loadChildren: () =>
            import('./views/upload-picture/upload-picture.module').then((m) => m.UploadPictureModule),
      },
      {
        path: 'course-marks',
        loadChildren: () =>
            import('./views/course-marks/course-marks.module').then((m) => m.CourseMarksModule),
      },
      {
        path: 'Atkt-students',
        loadChildren: () =>
          import('./views/Atkt-students/Atkt-students.module').then((m) => m.AtktStudentsModule),
      },
      {
        path: 'Atkt-students/:id',
        loadChildren: () =>
            import('./views/Atkt-students/Atkt-students.module').then((m) => m.AtktStudentsModule),
      } ,
      {
        path: 'student-subject',
        loadChildren: () =>
            import('./views/student-subject/student-subject.module').then((m) => m.StudentSubjectModule),
      },
      {
        path: 'batch-exams',
        loadChildren: () =>
            import('./views/batch-exams/batch-exams.module').then((m) => m.BatchExamsModule),
      },
      {
        path: 'upload-template',
        loadChildren: () =>
            import('./views/upload-template/upload-template.module').then((m) => m.UploadTemplateModule),
      },
      {
        path: 'edit-profile',
        loadChildren: () =>
            import('./views/edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
      },
      {
        path: 'multiple-edit',
        loadChildren: () =>
            import('./views/multiple-profile/multiple-profile.module').then((m) => m.MultipleProfileModule),
      },
      {
        path: 'upload-sgpa',
        loadChildren: () =>
            import('./views/upload-sgpa/upload-sgpa.module').then((m) => m.UploadSgpaModule),
      },
      {
        path: 'query',
        loadChildren: () =>
            import('./views/query-ticket/query-ticket.module').then((m) => m.QueryTicketModule),
      },
      {
        path: 'questionpaper',
        loadChildren: () =>
          import('./views/questionpaperupload/questionpaperupload.module').then((m) => m.QuestionpaperModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
            import('./views/Report/reports.module').then((m) => m.DownloadFileModule),
      },
      {
        path: 'eligibility',
        loadChildren: () =>
            import('./views/eligible-list/eligible-list.module').then((m) => m.EligibleListModule),
      },
      {
        path: 'marksheetdownload',
        loadChildren: () =>
          import('./views/marksheetdownload/marksheetdownload.module').then((m) => m.MarksheetdownloadModule),
      },
      {
        path: 'utility',
        loadChildren: () =>
            import('./views/utility/utility.module').then((m) => m.UtilityModule),
      },

      {
        path: 'abcdapproval',
        loadChildren: () =>
            import('./views/abcd-approval/abcd.module').then((m) => m.EditProfileModule),
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

  {path: '**', redirectTo: 'login'}

  // {path: 'Atkt-students/:billdeskstatus',redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
