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

const Test = () => {
  const [subCon,setSubCon] = useState(null);
  const getSubCon = () =>{
    api.get('/subcon/getSubCon')
      .then((res)=> {
          setSubCon(res.data.data)
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
  
      getSubCon()

  }, [])
  

 const columns = [
      {
        name: "id",
        selector: "subcon_id",
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
        name: "Name",
        selector: "company_name",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "Website",
        selector: "email",
        sortable: true,
        grow:2,
        wrap: true
      },
      {
        name: "Telehone",
        selector: "phone",
        sortable: true,
        grow:0,
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
          api.post('/subcon/deleteSub_Con',{sub_con_id:id}).then(res=>{
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Your subcon has been deleted.',
              'success'
            )
            getSubCon()

          })
        }
      })


      // api.get(`/subcon/deleteSub_Con/${sub_con_id}`)
      //  .then((res)=> {
      //      setSubCon(res.data.data)
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
          <Link to="/SubConDetails">
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
          {subCon && subCon.map(element=>{
              return (<tr key={element.sub_con_id}>
              <td>{element.sub_con_id}</td>
              <td><Link to={`/SubConEdit/${element.sub_con_id}`} ><Icon.Edit2 /></Link></td>
              <td><Link to=""><span onClick={()=>deleteRecord(element.sub_con_id)}><Icon.Trash2 /></span></Link></td>
              <td>{element.company_name}</td>
              <td>{element.email}</td>
              <td>{element.phone}</td>
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