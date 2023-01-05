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


const Booking = () => {
    const [bookings,setBookings] = useState(null);
    const getBooking = () =>{
      api.get('/booking/getBooking')
        .then((res)=> {
            setBookings(res.data.data)
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
    
        getBooking()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "booking_id",
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
          name: "Date",
          selector: "booking_date",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "AssignTime",
          selector: "assign_time",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "CustomerName",
          selector: "company_name",
          sortable: true,
          grow:0,
        },
        {
            name: "EmployeeName",
            selector: "first_name",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Address",
            selector: "address_flat",
            sortable: true,
            grow:2,
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
            api.post('/booking/deleteBooking',{booking_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Booking has been deleted.',
                'success'
              )
              getBooking()

            })
          }
        })


        // api.get(`/booking/deleteBooking/${booking_id}`)
        //  .then((res)=> {
        //      setBookings(res.data.data)
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
            <Link to="/BookingDetails">
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
            {bookings && bookings.map(element=>{
                return (<tr key={element.booking_id}>
                <td>{element.booking_id}</td>
                <td><Link to={`/BookingEdit/${element.booking_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.booking_id)}><Icon.Trash2 /></span></Link></td>
                <td>{moment(element.booking_date).format('YYYY-MM-DD')}</td>
                <td>{element.assign_time}</td>
                <td>{element.company_name}</td>
                <td>{element.first_name}</td>
                <td>{element.address_flat}</td>
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

export default Booking;
