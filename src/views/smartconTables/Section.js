import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';

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


const SectionDetails= () => {
    const [section,setSection] = useState(null);
    const getSection = () =>{
      api.get('/section/getSection')
        .then((res)=> {
          setSection(res.data.data)
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
    
            getSection()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "section_id ",
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
          name: "Title",
          selector: "title",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Section Type",
          selector: "section_type",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Button Position",
          selector: "button_position",
          sortable: true,
          grow:0,
        },
        {
            name: "ID",
            selector: "sort_order",
            sortable: true,
            width:'auto',
            grow:3,
            
          },
          {
            name: "Published",
            selector: "published",
            sortable: true,
            grow:2,
            width:'auto',
          
          },
          
      ]
      
      

    return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

    <Row>
          <Col md="6">
            <Link to="/SectionDetails">
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
            {section && section.map(element=>{
                return (<tr key={element.section_id}>
                <td>{element.section_id}</td>
                <td><Link to={`/SectionEdit/${element.section_id}`} ><Icon.Edit2 /></Link></td>
                <td>{element.title}</td>
                <td>{element.section_type}</td>
                <td>{element.button_position}</td>
                <td>{element.sort_order}</td>
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

export default SectionDetails;