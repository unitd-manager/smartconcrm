import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2'
import {Row,Col,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import moment from 'moment';
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import api from '../../constants/api';


const Training = () => {
    const [training,setTraining] = useState(null);
    const getTraining = () =>{
      
      api.get('/training/getTraining')
        .then((res)=> {
          setTraining(res.data.data)
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
        getTraining()

    }, [])
    

   const columns = [
    {
      name: "id",
      selector: "training_id",
      grow:0,
      wrap: true,
      width:'4%'
    },
    {
      name: 'Edit',
      selector: "edit",
      cell: () => <Link to="/"><Icon.Edit3 /></Link>,
      grow:0,
      width:'auto',
      button:true,
      sortable:false,
  },
  {
      name:'Delete',
      selector: "delete",
      cell: () => <Icon.Trash/>,
      grow:0,
      width:'1%',
      wrap: true
  },
    {
      name: "Title",
      selector: "title",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Trainer",
      selector: "trainer",
      sortable: true,
      grow:0,
    },
    {
        name: "Date",
        selector: "from_date",
        sortable: true,
        width:'auto',
        grow:3,
       
      }
      
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
            api.post('/training/deleteTraining',{training_id :id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Training has been deleted.',
                'success'
              )
      

            })
          }
        })
      }
      

  return (


    <div className="MainDiv">

<Row>
    <Col md="6">
      <Link to="/TrainingDetails">
        <Button  color="primary" className="my-3">
          Add New
        </Button>
      </Link>
    </Col>     
  </Row>
    <div className="container">
      
       <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {training && training.map(element=>{
                return (<tr key={element.title}>
                    <td>{element.training_id}</td>
                    <td><Link to={`/TrainingUpdate/${element.training_id}`} ><Icon.Edit2 /></Link></td>
                    <td><Link to=""><span onClick={()=>deleteRecord(element.training_id)}><Icon.Trash2 /></span></Link></td>
                    <td>{element.title}</td>
                    <td>{element.trainer}</td>
                    <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                    
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

export default Training;