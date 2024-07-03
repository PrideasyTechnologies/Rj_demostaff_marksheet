import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: `Marksheet `,
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
  },
  {
    name: 'Batch Exams',
    url: '/batch-exams',
    iconComponent: {name: 'cil-notes'},
  },
  {
    name: 'Upload Template',
    url: '/upload-template',
    iconComponent: {name: 'cil-wallpaper'},
  },
  {
    name: 'ATKT Students',
    url: '/Atkt-students',
    iconComponent: {name: 'cil-tags'},
  },
  {
    name: 'Edit profile',
    iconComponent: {name: 'cil-folder'},
    children: [
      {
        name: 'Single Edits',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/edit-profile',
      },
      {
        name: 'Multiple Edits',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/multiple-edit',
      },
    ]
  },
  {
    name: 'Student Subject',
    url: '/student-subject',
    iconComponent: {name: 'cil-library'},
  },

  {
    name: 'Upload Sgpa',
    url: '/upload-sgpa',
    iconComponent: {name: 'cil-paperclip'},
  },
  {
    name: 'Marks Entry',
    url: '/marksheet',
    iconComponent: {name: 'cil-plus'},
  },
  {
    name: 'Upload Picture',
    url: '/upload-picture',
    iconComponent: {name: 'cil-wallpaper'},
  },
  {
    name: 'Value Added',
    url: '/course-marks',
    iconComponent: {name: 'cil-library-add'},
  },
  {
    name: 'Eligibility',
    url: '/eligibility',
    iconComponent: {name: 'cil-description'},
  },
  {
    name: 'Question Paper',
    url: '/questionpaper',
    iconComponent: {name: 'cil-notes'},
  },
  {
    name: 'Utility',
    url: '/utility',
    iconComponent: {name: 'cil-drop'},
  },
  {
    name: 'QueryTicket',
    url: '/query',
    iconComponent: {name: 'cil-group'},
  },
  {
    name: 'Marksheet Download',
    url: '/marksheetdownload',
    iconComponent: {name: 'cil-vertical-align-bottom'},
  },
  {
    name: 'ABCD Form Approval',
    url: '/abcdapproval',
    iconComponent: {name: 'cil-thumb-up'},
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: {name: 'cil-pen'},
  },
];
