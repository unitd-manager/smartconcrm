import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';
// import Swal from 'sweetalert2'
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
      name: 'Edit',
      selector: "edit",
      cell: () => <Link to="/"><Icon.Edit3 /></Link>,
      grow:0,
      width:'auto',
      button:true,
      sortable:false,
  },
    {
      name: "Title",
      selector: "title",
      grow:0,
      wrap: true,
      width:'4%'
    },

    {
      name: "Trainer",
      selector: "trainer",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Date",
      selector: "from_date",
      sortable: true,
      grow:0,
    }
    ]

  return (
<>
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
                <td><Link to={`/TrainingEdit/${element.training_id}`} ><Icon.Edit2 /></Link></td>
                {/* <td><Link to=""><span onClick={()=>deleteRecord(element.training_id)}><Icon.Trash2 /></span></Link></td> */}
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
  
</>

  )
}

export default Training;