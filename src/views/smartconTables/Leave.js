import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
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


const Leaves = () => {
    const [leaves,setLeaves] = useState(null);
    const getLeave = () =>{
      api.get('/leave/getLeave')
        .then((res)=> {
          setLeaves(res.data.data)
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
    
            getLeave()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "leave_id",
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
          name: "Designation",
          selector: "designation",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          grow:0,
        },
        {
            name: "From date",
            selector: "from_date",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "To date",
            selector: "	to_date",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "No of Days(Current Month)",
            selector: "no_of_days",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "No of Days(Next Month)",
            selector: "no_of_days_next_month",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Leave Type",
            selector: "leave_type",
            sortable: true,
            width:'auto',
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
            api.post('/leave/deleteLeave',{leave_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Leave has been deleted.',
                'success'
              )
              getLeave()

            })
          }
        })


        // api.get(`/tender/deleteExpense/${expense_id}`)
        //  .then((res)=> {
        //      setAccounts(res.data.data)
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
            <Link to="/LeaveDetails">
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
            {leaves && leaves.map(element=>{
                return (<tr key={element.leave_id}>
                <td>{element.leave_id}</td>
                <td><Link to={`/LeavesEdit/${element.leave_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.leave_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.employee_name}</td>
                <td>{element.designation}</td>
                <td>{element.status}</td>
                <td>{element.from_date}</td>
                <td>{element.to_date}</td>
                <td>{element.no_of_days}</td>
                <td>{element.no_of_days_next_month}</td>
                <td>{element.leave_type}</td>
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

export default Leaves;