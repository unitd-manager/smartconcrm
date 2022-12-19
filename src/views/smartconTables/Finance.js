import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
<<<<<<< HEAD
=======
import moment from 'moment';
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import api from '../../constants/api';


const Test = () => {
    const [finance,setFinance] = useState(null);
    const getFinance = () =>{
<<<<<<< HEAD
=======
      
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
      api.get('/finance/getFinances')
        .then((res)=> {
            setFinance(res.data.data)
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
    
        getFinance()

    }, [])
    

   const columns = [
<<<<<<< HEAD

=======
    {
      name: "id",
      selector: "order_id",
      grow:0,
      wrap: true,
      width:'4%'
    },
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
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
<<<<<<< HEAD
      name:'Lang',
      selector: "flag",
      cell: () => <Icon.Flag />,
=======
      name:'Delete',
      selector: "delete",
      cell: () => <Icon.Trash/>,
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
      grow:0,
      width:'1%',
      wrap: true
  },
<<<<<<< HEAD

  {
    name: "Order id",
    selector: "order_id",
    sortable: true,
    grow:2,
    wrap: true
  },
  {
    name: "Company Name",
    selector: "company_name",
    sortable: true,
    grow:0,
  },
  {
      name: "Order Date",
      selector: "order_date",
      sortable: true,
      width:'auto',
      grow:3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Project Type",
      selector: "project_type",
      sortable: true,
      grow:2,
      width:'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Amount",
      selector: "order_amount",
      sortable: true,
      width:'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },

    {
      name: "Status",
      selector: "order_status",
      sortable: true,
      grow:2,
      wrap: true,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
=======
    {
      name: "Order id",
      selector: "order_id",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Company Name",
      selector: "shipping_first_name",
      sortable: true,
      grow:0,
    },
    {
        name: "Order Date",
        selector: "creation_date",
        sortable: true,
        width:'auto',
        grow:3,
       
      },
      {
        name: "Project Type",
        selector: "project_type",
        sortable: true,
        grow:2,
        width:'auto',

      },
      {
        name: "Amount",
        selector: "order_amount",
        sortable: true,
        width:'auto',
       
      },
  
      {
        name: "Status",
        selector: "order_status",
        sortable: true,
        grow:2,
        wrap: true,

      }
  
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
 
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
<<<<<<< HEAD
            api.post('/finance/getFinances',{order_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Tender has been deleted.',
=======
            api.post('/finance/deleteorders',{order_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Finance has been deleted.',
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
                'success'
              )
              getFinance()

            })
          }
        })


        // api.get(`/tender/deleteTender/${opportunity_id}`)
        //  .then((res)=> {
        //      setTenders(res.data.data)
        //  })

      }
      

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">
<<<<<<< HEAD

   

=======
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
      
       <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {finance && finance.map(element=>{
<<<<<<< HEAD
                return (<tr key={element.title}>
                <td>{element.order_id}</td>
                <td><Link to={`/TenderEdit/${element.opportunity_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.order_id)}></span></Link></td>
                <td>{element.company_name}</td>
                <td>{element.order_date}</td>
                <td>{element.project_type}</td>
                <td>{element.order_amount}</td>
                <td>{element.order_status}</td>
                </tr>)
=======
                return (<tr key={element.order_id}>
                    <td>{element.order_id}</td>
                    <td><Link to={`/FinanceEdit/${element.order_id}`} ><Icon.Edit2 /></Link></td>
                    <td><Link to=""><span onClick={()=>deleteRecord(element.order_id)}><Icon.Trash2 /></span></Link></td>
                    <td>{element.order_id}</td>
                    <td>{element.shipping_first_name}</td>
                    <td>{moment(element.creation_date.follow_up_date).format('YYYY-MM-DD')}</td>
                    <td>{element.project_type}</td>
                    <td>{element.order_amount}</td>
                    <td>{element.order_status}</td>
              </tr>)
>>>>>>> d9101644551bd1d8f38c9223115f354d90aa1980
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