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
import "react-data-table-component-extensions/dist/index.css";
import { Link } from 'react-router-dom';
import api from '../../constants/api';

function Timesheet() {
  const [timeSheet,setTimeSheet] = useState(null);
  const getTimeSheet = () =>{
    api.get('/timesheet/getTimeSheet')
      .then((res)=> {
        setTimeSheet(res.data.data);
        console.log(res.data.data);
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

        getTimeSheet()

}, [])

const columns = [
  {
    name: "Staff Id",
    selector: "staff_id",
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
    name: "Staff",
    selector: "staff_name",
    sortable: true,
    grow:0,
    wrap: true
  },
  {
    name: "Date",
    selector: "creation_date",
    sortable: true,
    grow:2,
    wrap: true
  },
  {
    name: "Time In",
    selector: "time_in",
    sortable: true,
    grow:0,
  },
  {
      name: "Time Out",
      selector: "leave_time",
      sortable: true,
      width:'auto',
      grow:3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "On Leave",
      selector: "on_leave",
      sortable: true,
      grow:2,
      width:'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    }
]

const deleteRecord = (id) => {
      
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
     api.post('/timesheet/deleteAttendance',{attendance_id:id}).then(res=>{
       console.log(res)
       Swal.fire(
         'Deleted!',
         'Your Timesheet has been deleted.',
         'success'
       )
       getTimeSheet()

     })
   }
 })

}

  return (
    <div className="MainDiv">
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
            {timeSheet && timeSheet.map(element=>{
                return (
                <tr key={element.staff_id}>
                    <td>{element.staff_id}</td>
                    <td><Link to={`/TimesheetEdit/${element.staff_id}`} ><Icon.Edit2 /></Link></td>
                    <td><Link to=""><span onClick={()=>deleteRecord(element.staff_id)}><Icon.Trash2 /></span></Link></td>
                    <td>{element.staff_name}</td>
                    <td>{element.creation_date}</td>
                    <td>{element.time_in}</td>
                    <td>{element.leave_time}</td>
                    <td>{element.on_leave}</td>
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

    </div>
  )
}

export default Timesheet