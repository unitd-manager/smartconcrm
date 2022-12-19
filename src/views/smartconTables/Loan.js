import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import moment from 'moment';
import {Row,Col,Button } from 'reactstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import api from '../../constants/api';


const Test = () => {
    const [loan,setLoan] = useState(null);
    const getLoan = () =>{
      api.get('/loan/getLoan')
        .then((res)=> {
            setLoan(res.data.data)
            console.log(res.data.data)
        })
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
                          ]
                }
            );
            } ,
            1000
            );
    
        getLoan()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "loan_id",
          grow:0,
          wrap: true,
          width:'4%'
        },
        {
            name: 'Edit',
            selector: "edit",
            cell: () => <Icon.Edit2 />,
            grow:0,
            width:'auto',
            button:true,
            sortable:false,
        },
        {
            name:'Del',
            selector: "delete",
            cell: () => <Icon.Trash />,
            grow:0,
            width:'auto',
            wrap: true
        },
        {
          name: "Employee Name",
          selector: "employee_name",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Loan Application Date",
          selector: "date",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Total Loan Amount",
          selector: "amount",
          sortable: true,
          grow:0,
        },
        {
            name: "Amount Payable(per month)",
            selector: "month_amount",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          
          
          {
            name: "Status",
            selector: "status",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          
          
      ]
      
      const deleteRecord = (id) => {
      
         // console.log(id)
        
        Swal.fire({
          title: `Are you sure? ${id}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            api.post('/loan/deleteLoan',{loan_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your loan has been deleted.',
                'success'
              )
              getLoan()

            })
          }
        })


        // api.get(`/loan/deleteLoan/${loan_id}`)
        //  .then((res)=> {
        //      setLoan(res.data.data)
        //  })

      }
      

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

    <Row>
          <Col md="6">
            <Link to="/LoanDetails">
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
            {loan && loan.map(element=>{
                return (<tr key={element.loan_id}>
                <td>{element.loan_id}</td>
                <td><Link to={`/LoanEdit/${element.loan_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.loan_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.employee_name}</td>
                <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                <td>{element.amount}</td>
                <td>{element.month_amount}</td>
                <td>{element.status}</td>

                </tr>)
            })}
          </tbody>
          <tfoot>
          <tr>
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </tfoot>
      </table>
      </div>
    </div>)
}

export default Test;

