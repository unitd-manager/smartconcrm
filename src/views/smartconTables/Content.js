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


const Content = () => {
    const [content,setContent] = useState(null);
    const getContent = () =>{
      
      api.get('/content/getContent')
        .then((res)=> {
          setContent(res.data.data)
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
        getContent()

    }, [])
    

   const columns = [
    {
      name: "id",
      selector: "content_id",
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
      name: "Order",
      selector: "sort_order",
      sortable: true,
      grow:0,
    },
    {
        name: "Section",
        selector: "section_title",
        sortable: true,
        width:'auto',
        grow:3,
       
      },
      {
        name: "Category",
        selector: "category_title",
        sortable: true,
        grow:0,
        wrap: true
      },
      {
        name: "Sub Category",
        selector: "sub_category_title",
        sortable: true,
        grow:0,
      },
      {
          name: "Content Date",
          selector: "content_date",
          sortable: true,
          width:'auto',
          grow:3,
         
        },  
        {
          name: "Content Type",
          selector: "content_type",
          sortable: true,
          width:'auto',
          grow:3,
         
        },
        {
          name: "ID",
          selector: "content_id ",
          sortable: true,
          width:'auto',
          grow:3,
         
        },
        {
          name: "Published",
          selector: "published",
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
            api.post('/content/deleteContent',{content_id :id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Content has been deleted.',
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
      <Link to="/ContentDetails">
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
            {content && content.map(element=>{
                return (<tr key={element.title}>
                    <td>{element.content_id}</td>
                    <td><Link to={`/ContentUpdate/${element.content_id}`} ><Icon.Edit2 /></Link></td>
                    <td><Link to=""><span onClick={()=>deleteRecord(element.content_id)}><Icon.Trash2 /></span></Link></td>
                    <td>{element.title}</td>
                    <td>{element.sort_order}</td>
                    <td>{element.section_title}</td>
                    <td>{element.category_title}</td>
                    <td>{element.sub_category_title}</td>
                    <td>{moment(element.content_date).format('YYYY-MM-DD')}</td>
                    <td>{element.content_type}</td>
                    <td>{element.content_id}</td>
                    <td>{element.published}</td>
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

export default Content;