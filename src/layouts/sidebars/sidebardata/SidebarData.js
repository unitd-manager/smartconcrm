import * as Icon from 'react-feather';

const SidebarData = [
  // { caption: 'Home' },
  // {
  //   title: 'Dashboards',
  //   href: '/dashboards',
  //   id: 1,
  //   suffix: '4',
  //   suffixColor: 'bg-info text-dark-white',
  //   icon: <Icon.Home />,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Classic',
  //       href: '/dashboards/classic',
  //       icon: <Icon.Disc />,
  //       id: 1.1,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Crypto',
  //       href: '/dashboards/crypto',
  //       icon: <Icon.Disc />,
  //       id: 1.2,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Ecommerce',
  //       href: '/dashboards/ecommerce',
  //       icon: <Icon.Disc />,
  //       id: 1.3,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'General',
  //       href: '/dashboards/general',
  //       icon: <Icon.Disc />,
  //       id: 1.4,
  //       collapisble: false,
  //     },
  //     {
  //       title: 'Extra',
  //       href: '/dashboards/extra',
  //       icon: <Icon.Disc />,
  //       id: 1.5,
  //       collapisble: false,
  //     },
  //   ],
  // },
  {
    title: 'Tender / Project',
    href: '/',
    id: 2,
    suffix: '4',
    suffixColor: 'bg-info text-dark-white',
    icon: <Icon.FileText />,
    collapisble: true,
    children: [
      {
        title: 'Dashboard',
        href: '/',
        icon: <Icon.Disc />,
        id: 2.1,
        collapisble: false,
      },
      {
        title: 'Tender',
        href: '/Tender',
        icon: <Icon.Disc />,
        id: 2.2,
        collapisble: false,
      },
      {
        title: 'Project',
        href: '/Project',
        icon: <Icon.Disc />,
        id: 2.3,
        collapisble: false,
      },
      {
        title: 'Client',
        href: '/Client',
        icon: <Icon.Disc />,
        id:2.4,
        collapisble: false,
      },
      {
        title: 'Booking',
        href: '/Booking',
        icon: <Icon.Disc />,
        id:2.4,
        collapisble: false,
      },
      {
        title: 'Timesheet',
        href: '/Timesheet',
        icon: <Icon.Disc />,
        id:2.4,
        collapisble: false,
      },
      {
        title: 'Product',
        href: '/Product',
        icon: <Icon.Disc />,
        id: 2.5,
        collapisble: false,
      },
      // {
      //   title: 'Test',
      //   href: '/test',
      //   icon: <Icon.Disc />,
      //   id: 2.5,
      //   collapisble: false,
      // },
    ],
  },
  {
    title: 'Finance / Admin / Purchaser',
    href: '/',
    id: 3,
    suffix: '4',
    suffixColor: 'bg-info text-dark-white',
    icon: <Icon.TrendingUp />,
    collapisble: true,
    children: [
      {
        title: 'Supplier',
        href: '/Supplier',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Accounts',
        href: '/Accounts',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Sub Con',
        href: '/Subcon',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Inventory',
        href: '/Inventory',
        icon: <Icon.Disc />,
        id: 1.5,
        collapisble: false,
      },
      {
        title: 'Purchase Order',
        href: '/PurchaseOrder',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Vehicle',
        href: '/Vehicle',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
    ],
  },
  {
    title: 'Payroll / HR',
    href: '/',
    id: 4,
    suffix: '4',
    suffixColor: 'bg-info text-dark-white',
    icon: <Icon.Calendar />,
    collapisble: true,
    children: [
      {
        title: 'Leave',
        href: '/Leave',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Loan',
        href: '/Loan',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Training',
        href: '/Training',
        icon: <Icon.Disc />,
        id: 1.5,
        collapisble: false,
      },
      {
        title: 'Employee',
        href: '/Employee',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Job Information',
        href: '/JobInformation',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
      {
        title: 'Payroll Management',
        href: '/PayrollManagement',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
      {
        title: 'CPF Calculator',
        href: '/CPFCalculator',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
    ],
  },
  {
    title: 'Admin',
    href: '/',
    id: 5,
    suffix: '4',
    suffixColor: 'bg-info text-dark-white',
    icon: <Icon.Users />,
    collapisble: true,
    children: [
      {
        title: 'Staff',
        href: '/Staff',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Valuelist',
        href: '/Valuelist',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Setting',
        href: '/Setting',
        icon: <Icon.Disc />,
        id: 1.5,
        collapisble: false,
      },
      {
        title: 'User Group',
        href: '/UserGroup',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
    ],
  },
  // {
  //   title: 'Projects',
  //   href: '/projects',
  //   id: 0,
  //   suffixColor: 'bg-info text-dark-white',
  //   icon: <Icon.Home />
  // },
  // {
  //   title: 'Project Report', 
  //   href: '/projects/projectreport',
  //   id: 0,
  //   suffixColor: 'bg-info text-dark-white',
  //   icon: <Icon.Home />
  // },
 
  // { caption: 'Apps' },
  // {
  //   title: 'Notes',
  //   href: '/apps/notes',
  //   icon: <Icon.FileText />,
  //   id: 6,
  //   collapisble: false,
  // },
  // {
  //   title: 'Chat',
  //   href: '/apps/chat',
  //   icon: <Icon.MessageCircle />,
  //   id: 7,
  //   collapisble: false,
  // },
  // {
  //   title: 'Contacts',
  //   href: '/apps/contacts',
  //   icon: <Icon.User />,
  //   id: 8,
  //   collapisble: false,
  // },
  // {
  //   title: 'Calendar',
  //   href: '/apps/calendar',
  //   icon: <Icon.Calendar />,
  //   id: 9,
  //   collapisble: false,
  // },
  // {
  //   title: 'Email',
  //   href: '/apps/email',
  //   icon: <Icon.Mail />,
  //   suffix: 'New',
  //   suffixColor: 'bg-success text-dark-white',
  //   id: 10,
  //   collapisble: false,
  // },
  // {
  //   title: 'CASL',
  //   href: '/casl',
  //   icon: <Icon.UserCheck />,
  //   id: 11,
  //   collapisble: false,
  // },
  // {
  //   title: 'Ecommerce',
  //   href: '/ecom',
  //   icon: <Icon.ShoppingCart />,
  //   id: 12,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Shop',
  //       href: '/ecom/shop',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Shop Detail',
  //       href: '/ecom/shopdetail',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Ticket',
  //   href: '/tickt',
  //   icon: <Icon.Bookmark />,
  //   id: 13,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Ticket List',
  //       href: '/tickt/ticket-list',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Ticket Detail',
  //       href: '/tickt/ticket-detail',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'TreeView',
  //   href: '/apps/treeview',
  //   icon: <Icon.Triangle />,
  //   id: 14,
  //   collapisble: false,
  // },
  // { caption: 'UI' },
  // {
  //   title: 'UI Elements',
  //   href: '/ui',
  //   id: 15,
  //   suffix: '22',
  //   suffixColor: 'bg-info text-dark-white',
  //   icon: <Icon.Cpu />,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Alert',
  //       href: '/ui/alerts',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Badges',
  //       href: '/ui/badges',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Buttons',
  //       href: '/ui/buttons',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Button Group',
  //       href: '/ui/button-group',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Breadcrumbs',
  //       href: '/ui/breadcrumbs',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Cards',
  //       href: '/ui/cards',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Collapse',
  //       href: '/ui/collapse',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Dropdown',
  //       href: '/ui/dropdown',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Grid',
  //       href: '/ui/grid',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'List Group',
  //       href: '/ui/list-group',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Modal',
  //       href: '/ui/modal',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Navbar',
  //       href: '/ui/navbar',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Navs',
  //       href: '/ui/nav',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Pagination',
  //       href: '/ui/pagination',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Popover',
  //       href: '/ui/popover',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Progress',
  //       href: '/ui/progress',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Spinner',
  //       href: '/ui/spinner',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Tabs',
  //       href: '/ui/tabs',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Toasts',
  //       href: '/ui/toasts',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Tooltip',
  //       href: '/ui/tooltip',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // { caption: 'Forms' },
  // {
  //   title: 'Form Layouts',
  //   href: '/form-layout',
  //   icon: <Icon.FileText />,
  //   id: 16,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Basic Forms',
  //       href: '/form-layout/form-basic',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Form Grid',
  //       href: '/form-layout/form-grid',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Form Group',
  //       href: '/form-layout/form-group',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Form Input',
  //       href: '/form-layout/form-input',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Form Pickers',
  //   href: '/form-pickers',
  //   icon: <Icon.Droplet />,
  //   id: 17,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Datepicker',
  //       href: '/form-pickers/datepicker',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Tags & Select',
  //       href: '/form-pickers/tag-select',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Form Validation',
  //   href: '/form-validation',
  //   icon: <Icon.CheckSquare />,
  //   id: 18,
  //   collapisble: false,
  // },
  // {
  //   title: 'Form Steps',
  //   href: '/form-steps',
  //   icon: <Icon.CreditCard />,
  //   id: 19,
  //   collapisble: false,
  // },
  // {
  //   title: 'Form Editor',
  //   href: '/form-editor',
  //   icon: <Icon.Edit />,
  //   id: 20,
  //   collapisble: false,
  // },
  // { caption: 'Tables' },
  // {
  //   title: 'Basic Table',
  //   href: '/tables/basic-table',
  //   icon: <Icon.Codepen />,
  //   id: 21,
  //   collapisble: false,
  // },
  // {
  //   title: 'React Table',
  //   href: '/tables/react-table',
  //   icon: <Icon.Disc />,
  //   id: 22,
  //   collapisble: false,
  // },
  // {
  //   title: 'Bootstrap Datatable',
  //   href: '/tables/data-table',
  //   icon: <Icon.HardDrive />,
  //   id: 23,
  //   collapisble: false,
  // },
  // { caption: 'Charts' },
  // {
  //   title: 'Apexchart',
  //   href: '/charts/apex',
  //   icon: <Icon.Loader />,
  //   id: 24,
  //   collapisble: false,
  // },
  // {
  //   title: 'ChartJs',
  //   href: '/charts/chartjs',
  //   icon: <Icon.PieChart />,
  //   id: 25,
  //   collapisble: false,
  // },
  // { caption: 'Extra' },
  // {
  //   title: 'Sample Pages',
  //   href: '/sample-pages',
  //   icon: <Icon.BookOpen />,
  //   id: 26,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Starterkit',
  //       href: '/sample-pages/starterkit',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Profile',
  //       href: '/sample-pages/profile',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Search Result',
  //       href: '/sample-pages/search-result',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Gallery',
  //       href: '/sample-pages/gallery',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Helper Class',
  //       href: '/sample-pages/helper-class',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Widget',
  //   href: '/widget',
  //   icon: <Icon.Grid />,
  //   id: 27,
  //   collapisble: false,
  // },
  // {
  //   title: 'Icons',
  //   href: '/icons',
  //   icon: <Icon.Feather />,
  //   id: 28,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Bootstrap',
  //       href: '/icons/bootstrap',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Feather',
  //       href: '/icons/feather',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Vector Map',
  //   href: '/map/vector',
  //   icon: <Icon.Map />,
  //   id: 29,
  //   collapisble: false,
  // },
  // {
  //   title: 'Authentication',
  //   href: '/auth',
  //   icon: <Icon.Lock />,
  //   id: 30,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Login',
  //       href: '/auth/loginformik',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Register',
  //       href: '/auth/registerformik',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Maintanance',
  //       href: '/auth/maintanance',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Lockscreen',
  //       href: '/auth/lockscreen',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Recover Password',
  //       href: '/auth/recoverpwd',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Error',
  //       href: '/auth/404',
  //       icon: <Icon.Disc />,
  //     },
  //   ],
  // },
  // {
  //   title: 'DD Menu',
  //   href: '/',
  //   id: 31,
  //   collapisble: true,
  //   icon: <Icon.Disc />,
  //   children: [
  //     {
  //       title: 'Simple dd 1',
  //       href: '/',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Simple dd 2',
  //       href: '/',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Simple dd 3',
  //       href: '/',
  //       icon: <Icon.Disc />,
  //       children: [
  //         {
  //           title: 'Simple dd 1.1',
  //           href: '/alerts',
  //           icon: <Icon.Disc />,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default SidebarData;
