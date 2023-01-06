import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button } from 'reactstrap';
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


const Valuelist = () => {
  const [valuelist, setValuelist] = useState(null);
  const getValuelist = () => {
    api.get('/valuelist/getValueList')
      .then((res) => {
        setValuelist(res.data.data)
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
    },
      1000
    );
    getValuelist()
  }, [])


  const columns = [
    {
      name: "id",
      selector: "valuelist_id",
      grow: 0,
      wrap: true,
      width: '4%'
    },

    {
      name: 'Edit',
      selector: "edit",
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    
{
      name: "Text (English)",
      selector: "value",
      sortable: true,
      grow: 0,
      wrap: true
    },

    {
      name: "Value List Name",
      selector: "key_text",
      sortable: true,
      grow: 2,
      wrap: true
    },

    {
      name: "Code",
      selector: "code",
      sortable: true,
      grow: 0,
    },

    {
      name: "ID",
      selector: "valuelist_id",
      sortable: true,
      width: 'auto',
      grow: 3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Order",
      selector: "sort_order",
      sortable: true,
      grow: 2,
      width: 'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
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
            <Link to="/ValuelistDetails">
              <Button color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>
        </Row>


        <table id="example" className="display">
          <thead>
            <tr >
              {columns.map(cell => {
                return (<td key={cell.name}>{cell.name}</td>)
              })}
            </tr>
          </thead>
          <tbody>
            {valuelist && valuelist.map(element => {
              return (<tr key={element.valuelist_id}>
                <td>{element.valuelist_id}</td>
                <td><Link to={`/ValueListEdit/${element.valuelist_id}`} ><Icon.Edit2 /></Link></td>
                <td>{element.value}</td>
                <td>{element.key_text}</td>
                <td>{element.code}</td>
                <td>{element.valuelist_id}</td>
                <td>{element.sort_order}</td>
              </tr>)
            })}
          </tbody>
          <tfoot>
            <tr>
              {columns.map(cell => {
                return (<td key={cell.name}>{cell.name}</td>)
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>)
}

export default Valuelist;