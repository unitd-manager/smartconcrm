import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import moment from 'moment';
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import api from '../../constants/api';

const JobInformation= () => {
  const [jobInformation,setJobInformation] = useState(null);
  const getJobInformation = () =>{

    api.get('/jobinformation/getjobinformationforList')
      .then((res)=> {
          setJobInformation(res.data.data)
          console.log(res.data.data)
      }).catch(err=>{
        console.log(err)
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
  
      getJobInformation()

  }, [])
  

  const columns = [
    {
      name: "id",
      selector: "job_information_id",
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
      name: "EMP code",
      selector: "emp_code",
      sortable: true,
      grow:0,
    },
    {
      name: "Full Name",
      selector: "first_name",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Department",
      selector: "department",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "S Pass No",
      selector: "spass_no",
      sortable: true,
      grow:0,
    },
    {
        name: "FIN No",
        selector: "fin_no",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "NRIC No",
        selector: "nric_no",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "DOB",
        selector: "date_of_birth",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "Basic Pay",
        selector: "basic_pay",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "Pass Type",
        selector: "citizen",
        sortable: true,
        grow:0,
        wrap: true
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
        api.post('/jobinformation/deletejob_information',{job_information_id:id}).then(res=>{
          console.log(res)
          Swal.fire(
            'Deleted!',
            'Your jobinformation has been deleted.',
            'success'
          )
          getJobInformation()

        })
      }
    })

    // api.get(`/supplier/deleteSupplier/${supplier_id}`)
    //  .then((res)=> {
    //      setSupplier(res.data.data)
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
        <Link to="/JobInformationDetails">
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
        {jobInformation && jobInformation.map(element=>{
            return (<tr key={element.job_information_id}>
            <td>{element.job_information_id}</td>
            <td><Link to={`/JobInformationEdit/${element.job_information_id}`} ><Icon.Edit2 /></Link></td>
            <td><Link to=""><span onClick={()=>deleteRecord(element.job_information_id)}><Icon.Trash2 /></span></Link></td>
            <td>{element.emp_code}</td>
            <td>{element.first_name}</td>
            <td>{element.department}</td>
            <td>{element.spass_no}</td>
            <td>{element.fin_no}</td>
            <td>{element.nric_no}</td>
            <td>{moment(element.date_of_birth.follow_up_date).format('YYYY-MM-DD')}</td>
            <td>{element.basic_pay}</td>
            <td>{element.citizen}</td>


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

export default JobInformation;