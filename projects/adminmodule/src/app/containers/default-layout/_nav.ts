import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
  // {
  //   name: $localize`Admission`,
  //   url: '/dashboard',
  //   iconComponent: {name: 'cil'},
  //   badge: {
  //     color: 'info',
  //     text: $localize`NEW`
  //   }
  // },
  {
    name: 'Admission Status Report',
    iconComponent: {name: 'cil-columns'},
    url: '/table',
  },

  {
    name: 'Students',
    iconComponent: {name: 'cil-layers'},
    children: [
     
      {
        name: 'Registration',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/register',
      },

      // {
      //   name: 'OTP',
      //   iconComponent: {name: 'cil-arrow-right'},
      //   url: '/otp',
      // },

      {
        name: 'Complete Profile',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/studentprofile',
      },

      {
        name: 'Admission cancel',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/admissioncancelstudents',
      },

      {
        name: 'Update Image/Email',
        iconComponent: {name: 'cil-arrow-right'},
        url: '/updateimagestudents',
      },

    ]
  },

  {
    name: 'Admin',
    iconComponent: {name: 'cil-user'},
    children: [
      {
        name: 'Website Remarks',
        url: '/send-message',
        iconComponent: {name: 'cil-arrow-right'},
      },
      // {
      //   name: 'Eligibility',
      //   url: '/eligible-list',
      //   iconComponent: {name: 'cil-arrow-right'},
      // },
      {
        name: 'Admission Release',
        url: '/admissionrelease',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Reports',
        url: '/adminreports',
        iconComponent: {name: 'cil-arrow-right'},
      },
    ]
  },
  {
    name: 'Fees',
    iconComponent: {name: 'cil-money'},
    children: [
      {
        name: 'Fee Installment',
        url: '/installment',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Attach For All',
        url: '/attachfeesall',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Attach For Individual',
        url: '/feesindividual',
        iconComponent: {name: 'cil-arrow-right'},
      },
      // {
      //   name: 'Fees attach-unattach',
      //   url: '/attachunattachfees',
      //   iconComponent: {name: 'cil-arrow-right'},
      // },
      {
        name: 'Fee Un-Attach',
        url: '/feesunattach',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Upload Bill',
        url: '/uploadbill',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Bill Desk',
        url: '/billdesk',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Scholarship',
        url: '/scholarship',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Offline Receipt',
        url: '/feescollection',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Cancel Admission',
        url: '/canceladmission',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Reports',
        url: '/feereports',
        iconComponent: {name: 'cil-arrow-right'},
      },

    ]
  },
  {
    name: 'Approvals',
    iconComponent:{name: 'cil-task'},
    children: [
      {
        name: 'Document approval',
        url: '/documentapproval',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Marksheet approval',
        url: '/marksheet',
        iconComponent: {name: 'cil-arrow-right'},
      },
      // {
      //   name: 'ABCD approval',
      //   url: '/abcdapproval',
      //   iconComponent: {name: 'cil-arrow-right'},
      // },
    ]
  },

  {
    name: 'Change and Cancel',
    iconComponent: {name: 'cil-layers'},
    children: [
      // {
      // //   name: 'Offline Receipt',
      // //   url: '/fees-collection',
      // //   icon: 'cil-description',
      // // },
      {
        name: 'Change Subjects',
        url: '/changesubject',
        iconComponent: {name: 'cil-arrow-right'},
      },

      {
        name: 'Batch transfer',
        url: '/batchtransfer',
        iconComponent: {name: 'cil-arrow-right'},
      },

      {
        name: 'Cancel admission',
        url: '/admissioncancel',
        iconComponent: {name: 'cil-arrow-right'},
      },
    ]
  },

  // {
  //   name: 'Bill Desk',
  //
  //   iconComponent: {name: 'cil'},
  //   children: [
  //
  //   ]
  // },
  {
    name: 'Outside Students',
    url: '/outsidestudents',
    iconComponent: {name: 'cil-pen'},
  },
  {
    name: 'Create and Edit',
    iconComponent: {name: 'cil-folder'},
    children: [
      {
        name: 'Subject Quota',
        url: '/subjectquota',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'User Creation',
        url: '/usercreation',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Edit Profile',
        url: '/editprofile',
        iconComponent: {name: 'cil-arrow-right'},
      },

      {
        name: 'Subject Change for Outside students',
        url: '/lastyear-outstandings',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Assign Division and Roll no.',
        url: '/division&rollno',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Admission blocking',
        url: '/web-portal',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Admission Release',
        url: '/admission-release',
        iconComponent: {name: 'cil-arrow-right'},
      },
      {
        name: 'Update Mobile & Aadhaar',
        url: '/update-details',
        iconComponent: {name: 'cil-arrow-right'},
      },
    ]
  },
  {
    name: 'Query ticket',
    url: '/queryticket',
    iconComponent: {name: 'cil-group'},
  },
  {
    name: 'Leaving Certificates',
    url: '/leavingcertificate',
    iconComponent: {name: 'cil-layers'},
  },
  {
    name: 'Inward/Outward',
    url: '/inwardoutward',
    iconComponent: {name: 'cil-transfer'},
  },
  {
    name: 'FeedbackForm',
    url: '/feedback',
    iconComponent: {name: 'cil-group'},
  },
  {
    name: 'HRMS',
    iconComponent: {name: 'cil-folder'},
    children: [
      {
        name: 'Employee',
        url: '/employee',
        iconComponent: {name: 'cil-arrow-right'},
      },
    ]
  },
  {
    name: 'Profile Configuration',
    url: '/document',
    iconComponent: {name: 'cil-money'},
  },
  {
    name: 'Reports',
    url: '/filedownload',
    iconComponent: {name: 'cil-pen'},
  },
];
