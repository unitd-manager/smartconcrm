
import {  Route, Routes} from 'react-router-dom';

import React,{ lazy } from 'react';
import Loadable from '../layouts/loader/Loadable';

import UserToken from '../components/UserToken'
// import { Details } from '@material-ui/icons';


 const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

// Modals
const EditCostingSummaryModal = Loadable(lazy(() => import('../components/tender/EditCostingSummaryModal')));
const AddLineItemModal = Loadable(lazy(() => import('../components/tender/AddLineItemModal')));
const EditQuoteModal = Loadable(lazy(() => import('../components/tender/EditQuoteModal')));
const EditLineItemModal = Loadable(lazy(() => import('../components/tender/EditLineItemModal')));


const PdfData = Loadable(lazy(() => import('../views/smartconTables/Tickets')));
const PdfNext = Loadable(lazy(() => import('../views/smartconTables/GeneratePdf')));

const TicketsComponent = Loadable(lazy(() => import('../views/smartconTables/TicketsComponent')));
const Classic = Loadable(lazy(() => import('../views/dashboards/Cubosale')));
const Crypto = Loadable(lazy(() => import('../views/dashboards/Crypto')));
const Ecommerce = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const General = Loadable(lazy(() => import('../views/dashboards/General')));
const Extra = Loadable(lazy(() => import('../views/dashboards/Extra')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
// const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
// const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
// const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
// const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

const DataTable = Loadable(lazy(() => import('../views/cubosale/Projects')));
const Reports = Loadable(lazy(() => import('../views/cubosale/Reports')));

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

const AddProjects = Loadable(lazy(() => import('../views/cubosale/AddProjects')));
const EditProject = Loadable(lazy(() => import('../views/cubosale/EditProject')));

// Tender
const TenderTable = Loadable(lazy(() => import('../views/smartconTables/Tender')));
const ProjectTable = Loadable(lazy(() => import('../views/smartconTables/Project')));
const ClientTable = Loadable(lazy(() => import('../views/smartconTables/Client')));
const BookingTable = Loadable(lazy(() => import('../views/smartconTables/Booking')));
const TimesheetTable = Loadable(lazy(() => import('../views/smartconTables/Timesheet')));
const ProductTable = Loadable(lazy(() => import ('../views/smartconTables/product')));
const TestTable = Loadable(lazy(() => import ('../views/smartconTables/Test')));

// Details Table
const TenderDetailsTable = Loadable(lazy(() => import ('../views/detailTable/TenderDetails')))
const ClientDetailsTable = Loadable(lazy(() => import ('../views/detailTable/ClientDetails')))
const BookingDetails = Loadable(lazy(() => import ('../views/detailTable/BookingDetails')))
const TimesheetDetailsTable = Loadable(lazy(() => import ('../views/detailTable/TimesheetDetails')))
// Finance Admin
const FinanceTable = Loadable(lazy(() => import ('../views/smartconTables/Finance')))
const AccountsTable = Loadable(lazy(() => import ('../views/smartconTables/Accounts')))
const SupplierTable = Loadable(lazy(() => import ('../views/smartconTables/Supplier')))
const SupplierDetailsTable = Loadable(lazy(() => import ('../views/detailTable/SupplierDetails')))
const SubConTable = Loadable(lazy(() => import ('../views/smartconTables/Subcon')))
const SubConDetailsTable = Loadable(lazy(() => import ('../views/detailTable/SubConDetails')))
const InventoryTable = Loadable(lazy(() => import ('../views/smartconTables/Inventory')))
const PurchaseOrderTable = Loadable(lazy(() => import ('../views/smartconTables/PurchaseOrder')))
const PurchaseOrderDetails = Loadable(lazy(() => import ('../views/detailTable/PurchaseOrderDetails')))
const VehicleTable = Loadable(lazy(() => import ('../views/smartconTables/Vehicle')))
const VehicleDetails = Loadable(lazy(() => import ('../views/detailTable/VehicleDetails')))
// PayrollHR
const LeaveTable = Loadable(lazy(() => import ('../views/smartconTables/Leave')))
const LeaveDetailsTable = Loadable(lazy(() => import ('../views/detailTable/LeaveDetails')))
const LoanTable = Loadable(lazy(() => import ('../views/smartconTables/Loan')))
const LoanDeatilsTable = Loadable(lazy(() => import ('../views/detailTable/LoanDetails')))
const TrainingTable = Loadable(lazy(() => import ('../views/smartconTables/Training')))
const TrainingDetailsTable = Loadable(lazy(() => import ('../views/detailTable/TrainingDetails')))
const JobInformationTable = Loadable(lazy(() => import ('../views/smartconTables/JobInformation')))
const JobInformationDetailsTable = Loadable(lazy(() => import ('../views/detailTable/JobInformationDetails'))) 
const PayrollManagementTable = Loadable(lazy(() => import ('../views/smartconTables/PayrollManagement')))
const Employee= Loadable(lazy(() => import ('../views/smartconTables/Employee')))
const EmployeeDetailsTable = Loadable(lazy(() => import ('../views/detailTable/EmployeeDetails')))
const EmployeeDetailsData = Loadable(lazy(() => import ('../views/detailTable/EmployeeDetailsData')))
const CPFCalculatorTable = Loadable(lazy(() => import ('../views/smartconTables/CPFCalculator')))
const CPFCalculatorDetails = Loadable(lazy(() => import ('../views/detailTable/CPFCalculatorDetails')))

// Admin
const StaffTable = Loadable(lazy(() => import ('../views/smartconTables/Staff')))
const StaffDetailsTable = Loadable(lazy(() => import ('../views/detailTable/StaffDetails')))
const ValuelistTable= Loadable(lazy(() => import ('../views/smartconTables/Valuelist')))
const ValuelistDetailsTable = Loadable(lazy(() => import ('../views/detailTable/ValuelistDetails')))
const SettingTable= Loadable(lazy(() => import ('../views/smartconTables/Setting')))
const SettingDetails= Loadable(lazy(() => import ('../views/detailTable/SettingDetails')))
const UserGroupTable= Loadable(lazy(() => import ('../views/smartconTables/UserGroup')))
const UserGroupDetails= Loadable(lazy(() => import ('../views/detailTable/UserGroupDetails')))
//SupplierModal
const SupplierHistory= Loadable(lazy(() => import ('../components/SupplierModal/SupplierHistory')))


// Table Edit's
const TenderEdit= Loadable(lazy(() => import ('../views/EditData/TenderEdit')))
const ProjectEdit= Loadable(lazy(() => import ('../views/EditData/ProjectEdit')))
const SubConEdit= Loadable(lazy(() => import ('../views/EditData/SubConEdit')))
const SupplierEdit= Loadable(lazy(() => import ('../views/EditData/SupplierEdit')))
const JobInformationEdit= Loadable(lazy(() => import ('../views/EditData/JobInformationEdit')))

const PurchaseOrderEdit= Loadable(lazy(() => import ('../views/EditData/PurchaseOrderEdit')))
const PurchaseOrderAdd= Loadable(lazy(() => import ('../views/EditData/PurchaseOrderAdd')))
const TimesheetEdit= Loadable(lazy(() => import ('../views/EditData/TimesheetEdit')))

const Routernew = () => {
  const { token, setToken } = UserToken();

  if (!token) {
    return <LoginFormik setToken={setToken} />;
  }
  return (
    <div>
     
     <Routes>
     
        <Route path="/"  element={<FullLayout></FullLayout>}>

          {/* Tendar Modal */}
          <Route path="/editcostingsummary" name="editcostingsummary" element={<EditCostingSummaryModal />}></Route>
          <Route path="/addlineitem" name="addlineitem" element={<AddLineItemModal />}></Route>
          <Route path="/editquote" name="editquote" element={<EditQuoteModal />}></Route>
          <Route path="/editlineitem" name="editlineitem" element={<EditLineItemModal />}></Route>
   
      {/* Table Edit's */}
        <Route path="/TenderEdit/:id" name="clienttdata" element={<TenderEdit />}></Route>
        <Route path="/projectEdit/:id" name="clienttdata" element={<ProjectEdit />}></Route>
<<<<<<< HEAD
=======
        <Route path="/SubConEdit/:id" name="clienttdata" element={<SubConEdit />}></Route>
        <Route path="/SupplierEdit/:id" name="clienttdata" element={<SupplierEdit />}></Route>
        <Route path="/JobInformationEdit/:id" name="clienttdata" element={<JobInformationEdit />}></Route>
>>>>>>> 7549565bc88324753b35e26552233866b126d897

{/* Supplier Modal */}
<Route path="/SupplierHistory/:id" name="clienttdata" element={<SupplierHistory />}></Route>



        <Route path="/PurchaseOrderEdit/:id" name="clienttdata" element={<PurchaseOrderEdit />}></Route>
        <Route path="/PurchaseOrderAdd/:cname" name="clienttdata" element={<PurchaseOrderAdd />}></Route>
        <Route path="/TimesheetEdit/:id" name="clienttdata" element={<TimesheetEdit />}></Route>

        <Route path="/pdf/:id" name="pdfData" element={<PdfData />}></Route>
        <Route path="/pdfnext" name="pdfData" element={<PdfNext />}></Route>
        <Route path="/TicketsComponent" name="pdfData" element={<TicketsComponent />}></Route>

        <Route path="/projects" element={<DataTable />} />
        <Route path="/" element={<Classic />} />
        <Route path="/dashboards/crypto" name="Classic" element={<Crypto />}></Route>
        <Route path="/dashboards/ecommerce" name="ecommerce" element={<Ecommerce />}></Route>
        <Route path="/dashboards/general" name="general" element={<General />}></Route>
        <Route path="/dashboards/extra" name="extra" element={<Extra />}></Route>
        <Route path="/about" name="about" element={<About />}></Route>
        <Route path="/apps/notes" name="notes" element={<Notes />}></Route>
        <Route path="/apps/chat" name="chat" element={<Chat />}></Route>
        <Route path="/apps/contacts" name="contacts" element={<Contacts />}></Route>
        <Route path="/apps/calendar" name="calendar" element={<Calendar />}></Route>
        <Route path="/apps/email" name="email" element={<Email />}></Route>
        <Route path="/ecom/shop" name="email" element={<Shop />}></Route>
        <Route path="/ecom/shopdetail" name="email" element={<ShopDetail />}></Route>
        <Route path="/tickt/ticket-list" name="ticket list" element={<TicketList />}></Route>
        <Route path="/tickt/ticket-detail" name="ticket detail" element={<TicketDetail />}></Route>
        <Route path="/apps/treeview" name="email" element={<Treeview />}></Route>
        <Route path="/ui/alerts" name="alerts" element={<Alerts />}></Route>
        <Route path="/ui/badges" name="badges" element={<Badges />}></Route>
        <Route path="/ui/buttons" name="buttons" element={<Buttons />}></Route>
        <Route path="/ui/cards" name="cards" element={<Cards />}></Route>
        <Route path="/ui/grid" name="grid" element={<Grid />}></Route>
        <Route path="/ui/table" name="table" element={<Tables />}></Route>
        <Route path="/ui/forms" name="forms" element={<Forms />}></Route>
        <Route path="/ui/breadcrumbs" name="breadcrumbs" element={<Breadcrumbs />}></Route>
        <Route path="/ui/dropdown" name="dropdown" element={<Dropdowns />}></Route>
        <Route path="/ui/button-group" name="button group" element={<BtnGroup />}></Route>
        <Route path="/ui/collapse" name="collapse" element={<Collapse />}></Route>
        <Route path="/ui/list-group" name="list-group" element={<ListGroup />}></Route>
        <Route path="/ui/modal" name="modal" element={<Modal />}></Route>
        <Route path="/ui/navbar" name="navbar" element={<Navbar />}></Route>
        <Route path="/ui/nav" name="nav" element={<Nav />}></Route>
        <Route path="/ui/pagination" name="pagination" element={<Pagination />}></Route>
        <Route path="/ui/popover" name="popover" element={<Popover />}></Route>
        <Route path="/ui/progress" name="progress" element={<Progress />}></Route>
        <Route path="/ui/spinner" name="spinner" element={<Spinner />}></Route>
        <Route path="/ui/tabs" name="tabs" element={<Tabs />}></Route>
        <Route path="/ui/toasts" name="toasts" element={<Toasts />}></Route>
        <Route path="/ui/tooltip" name="tooltip" element={<Tooltip />}></Route>
        <Route path="/form-layout/form-basic" name="form-basic" element={<FormBasic />}></Route>
        <Route path="/form-layout/form-grid" name="form-grid" element={<FormGrid />}></Route>
        <Route path="/form-layout/form-group" name="form-group" element={<FormGroup />}></Route>
        <Route path="/form-layout/form-input" name="form-input" element={<FormInput />}></Route>
        <Route path="/form-pickers/datepicker" name="datepicker" element={<Datepicker />} />
        <Route path="/form-pickers/tag-select" name="tag-select" element={<TagSelect />}></Route>
        <Route path="/form-validation" name="form-validation" element={<FormValidate />}></Route>
        <Route path="/form-steps" name="form-steps" element={<FormSteps />}></Route>
        <Route path="/form-editor" name="form-editor" element={<FormEditor />}></Route>

        <Route path="/tables/basic-table" name="basic-table" element={<Basictable />}></Route>
        <Route path="/tables/react-table" name="react-table" element={<CustomReactTable />} />
        <Route path="/tables/data-table" name="data-table" element={<ReactBootstrapTable />} />
        <Route path="/charts/apex" name="apex" element={<ApexCharts />}></Route>
        <Route path="/charts/chartjs" name="chartjs" element={<ChartJs />}></Route>
        <Route path="/sample-pages/profile" name="profile" element={<Profile />}></Route>
        <Route path="/sample-pages/helper-class" name="helper-class" element={<HelperClass />} />
        <Route path="/sample-pages/starterkit" name="starterkit" element={<StarterKit />} />
        <Route path="/sample-pages/gallery" name="gallery" element={<Gallery />}></Route>
        <Route path="/sample-pages/search-result" name="search-result" element={<SearchResult />} />
        <Route path="/icons/bootstrap" name="bootstrap" element={<Bootstrap />}></Route>
        <Route path="/icons/feather" name="feather" element={<Feather />}></Route>
        <Route path="/map/vector" name="vector" element={<CustomVectorMap />}></Route>
        <Route path="/widget" name="widget" element={<Widget />}></Route>
        <Route path="/casl" name="casl" element={<CASL />}></Route>
        <Route path="/auth/404" name="404" element={<Error />}></Route>
        <Route path="/projects/addproject" name="addproject" element={<AddProjects />}></Route>
        <Route path="/projects/editproject/:id" name="editproject" element={<EditProject />}></Route>
        <Route path="/projects/projectreport" name="projectreport" element={<Reports />}></Route>
        {/* Tender */}
        <Route path="/Tender" name="tenderdata" element={<TenderTable />}></Route>
        <Route path="/TenderDetails" name="tenderdata" element={<TenderDetailsTable />}></Route>
        <Route path="/Project" name="projectdata" element={<ProjectTable />}></Route>
        <Route path="/Client" name="clienttdata" element={<ClientTable />}></Route>
        <Route path="/ClientDetails" name="clienttdata" element={<ClientDetailsTable />}></Route>
        <Route path="/Booking" name="clienttdata" element={<BookingTable />}></Route>
        <Route path="/BookingDetails" name="clienttdata" element={<BookingDetails />}></Route>
        <Route path="/Product" name="clienttdata" element={<ProductTable />}></Route>
        <Route path="/Timesheet" name="clienttdata" element={<TimesheetTable />}></Route>
        <Route path="/TimesheetDetails" name="clienttdata" element={<TimesheetDetailsTable />}></Route>

        <Route path="/Finance" name="clienttdata" element={<FinanceTable />}></Route>
        <Route path="/Accounts" name="clienttdata" element={<AccountsTable />}></Route>
        <Route path="/Supplier" name="clienttdata" element={<SupplierTable />}></Route>
        <Route path="/SupplierDetails" name="clienttdata" element={<SupplierDetailsTable />}></Route>
        <Route path="/Subcon" name="clienttdata" element={<SubConTable />}></Route>
        <Route path="/SubConDetails" name="clienttdata" element={<SubConDetailsTable />}></Route>
        <Route path="/Inventory" name="clienttdata" element={<InventoryTable />}></Route>
        <Route path="/PurchaseOrder" name="clienttdata" element={<PurchaseOrderTable />}></Route>
        <Route path="/PurchaseOrderDetails" name="clienttdata" element={<PurchaseOrderDetails />}></Route>
        <Route path="/Vehicle" name="clienttdata" element={<VehicleTable />}></Route>
        <Route path="/VehicleDetails" name="clienttdata" element={<VehicleDetails />}></Route>
        <Route path="/Leave" name="clienttdata" element={<LeaveTable />}></Route>
        <Route path="/LeaveDetails" name="clienttdata" element={<LeaveDetailsTable />}></Route>
        <Route path="/Loan" name="clienttdata" element={<LoanTable />}></Route>
        <Route path="/LoanDetails" name="clienttdata" element={<LoanDeatilsTable />}></Route>
        <Route path="/TrainingDetails" name="clienttdata" element={<TrainingDetailsTable/>}></Route>
        <Route path="/Training" name="clienttdata" element={<TrainingTable />}></Route>
        <Route path="/JobInformation" name="clienttdata" element={<JobInformationTable />}></Route>
        <Route path="/JobInformationDetails" name="clienttdata" element={<JobInformationDetailsTable />}></Route>
        <Route path="/PayrollManagement" name="clienttdata" element={<PayrollManagementTable />}></Route>
        <Route path="/CPFCalculator" name="clienttdata" element={<CPFCalculatorTable />}></Route>
        <Route path="/CPFCalculatorDetails" name="clienttdata" element={<CPFCalculatorDetails />}></Route>
        <Route path="/Staff" name="clienttdata" element={<StaffTable />}></Route>
        <Route path="/StaffDetails" name="clienttdata" element={<StaffDetailsTable />}></Route>
        <Route path="/Valuelist" name="clienttdata" element={<ValuelistTable />}></Route>
        <Route path="/ValuelistDetails" name="clienttdata" element={<ValuelistDetailsTable />}></Route>
        <Route path="/Setting" name="clienttdata" element={<SettingTable />}></Route>
        <Route path="/SettingDetails" name="clienttdata" element={<SettingDetails />}></Route>
        <Route path="/UserGroup" name="clienttdata" element={<UserGroupTable />}></Route>
        <Route path="/UserGroupDetails" name="clienttdata" element={<UserGroupDetails />}></Route>
        <Route path="/Employee" name="clienttdata" element={<Employee />}></Route>
        <Route path="/EmployeeDetails" name="clienttdata" element={<EmployeeDetailsTable />}></Route>
        <Route path="/EmployeeDetailsData" name="clienttdata" element={<EmployeeDetailsData />}></Route>
        <Route path="/test" name="clienttdata" element={<TestTable />}></Route>

        
        </Route>
      </Routes>
      
    </div>
  );
}

export default Routernew