import React,{useEffect} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';
// import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
// import api from '../../constants/api';
import { getPayrollManagements } from '../../store/payrollManagement/payrollManagementSlice';

const Payrollmanagement = () => {
    // const [payrollManagementsdata,setpayrollManagementsdata] = useState(null);
    const dispatch=useDispatch();
    const payrollManagements =useSelector(state=>state.payrollManagement.payrollManagements);
    const getAllPayrollManagements = () =>{
      // api.get('/tender/getPayrollManagements')
      //   .then((res)=> {
      //       setpayrollManagements(res.data.data)
      //       console.log(res.data.data)
      //   })

      dispatch(getPayrollManagements());
      // setpayrollManagementsdata(payrollManagements);
      console.log(payrollManagements);
    }

    useEffect(() => {
        setTimeout(() => {
            $('#example').DataTable(
                {
                    pagingType: 'full_numbers',
                      pageLength: 20,
                      processing: true,
                      dom: 'Bfrtip',
                          buttons: ['csv', 'print'
                          ],
                        //   columnDefs: [
                        //   { visible: false, targets: 1 }
                        // ],
    searching: true
                }
            );
            } ,
            1000
            );
    
        getAllPayrollManagements()

    }, [])
    

    const columns = [
        {
          name: "#",
          selector: "id",
          sortable: true,
          grow:0,
          width:'auto',
        },
        {
            name: "",
            selector: "edit",
            sortable: true,
            grow:0,
            width:'auto',
            wrap: true
        },
        {
            name: "",
            selector: "flag",
            sortable: true,
            grow:0.1,
            width:'auto',
            wrap: true
        },
        {
            name: "Employee Name",
            selector: "code",
            sortable: true,
            grow:1,
        },
        {
          name: "Pay slip print",
          selector: "code",
          sortable: true,
          grow:1,
        },
        {
          name: "Month",
          selector: "project",
          sortable: true,
          grow:1,
          cell: d => <span>{d.closing.join(", ")}</span>
        },
        {
            name: "Year",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Basic Pay",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "OT",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "CPF(Employer)",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "CPF(Employee)",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Allowance",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Deductions",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Net Pay",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Status",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "ID",
            selector: "project",
            sortable: true,
            grow:1,
            cell: d => <span>{d.closing.join(", ")}</span>
          },
      ];
      
      // const deleteRecord = (id) => {
      
      //    // console.log(id)
        
      //   Swal.fire({
      //     title: `Are you sure? ${id}`,
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, delete it!'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       dispatch(deletePayrollManagement(id))
      //      .then(res=>{
      //         console.log(res)
      //         Swal.fire(
      //           'Deleted!',
      //           'Your Tender has been deleted.',
      //           'success'
      //         )
      //         getAllPayrollManagements()

      //       })
      //     }
      //   })


      //   // api.get(`/tender/deleteTender/${opportunity_id}`)
      //   //  .then((res)=> {
      //   //      setpayrollManagements(res.data.data)
      //   //  })

      // }
      

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

    <Row>
          <Col md="6">
            <Link to="/TenderDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>
                  
          </Row>

        
        <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {payrollManagements&& payrollManagements.map(element=>{
                return (<tr key={element.payroll_management_id}>
                <td>{element.opportunity_id}</td>
                <td><Link to={`/PayrollManagementDetails/${element.payroll_management_id}`} ><Icon.Edit2 /></Link></td>
                {/* <td><Link to=""><span onClick={()=>deleteRecord(element.opportunity_id)}><Icon.Trash2 /></span></Link></td> */}
               <td></td>
                <td>{element.employee_name}</td>
                <td>{element.payroll_month}</td>
                <td>{element.payroll_year}</td>
                <td>{element.basic_pay}</td>
                <td>{element.ot_amount}</td>
                <td>{element.cpf_employer}</td>
                <td>{element.cpf_employee}</td>
                <td>{element.allowance1}</td>
                <td>{element.deduction1}</td>
                <td>{element.net_total}</td>
                <td>{element.employee_status}</td>
                <td>{element.payroll_management_id}</td>
                </tr>)
            })}
          </tbody>
          {/* <tfoot>
          <tr>
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </tfoot> */}
      </table>
      </div>
    </div>)
}

export default Payrollmanagement;