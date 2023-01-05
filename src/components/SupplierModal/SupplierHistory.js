import React, {  useState,useEffect  } from 'react';
import Swal from 'sweetalert2'
import {ToastContainer} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import moment from 'moment';
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {  useParams,Link } from 'react-router-dom';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';








const SupplierHistory = () => {

const [history, setHistory] = useState();
const {id} = useParams()


// Get  By Id

const getHistoryById = () =>
{
  api.post('/supplier/SupplierPayment',{purchase_order_id:id})
  .then((res)=> {
      setHistory(res.data.data)
      console.log(res)  
  })
 .catch(() => {
   message("Supplier Data Not Found",'info')
  })
}





useEffect(() => {
    setTimeout(() => {
        $('#example').DataTable(
            // {
            //     pagingType: 'full_numbers',
            //       pageLength: 20,
            //       processing: true,
            //       dom: 'Bfrtip'
                  
            // }
        );
        } ,
        1000
        );
  
        getHistoryById()
  
  }, [])
  
  
  const columns = [
    {
      name: "Date",
      selector: "date",
      grow:0,
      wrap: true,
      width:'4%'
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Mode Of Payment",
      selector: "mode_of_payment",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Cancel",
      selector: "",
      sortable: true,
      grow:0,
    },
    
    
  ]
  
  const Supplier = () => {
    
    // console.log(id)
   
    Swal.fire({
     title: `Are you sure? ${id}`,
     text: "Do you like to cancel the receipt?",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes!'
   }).then((result) => {
     if (result.isConfirmed) {
       api.post('/supplier/SupplierPayment',{purchase_order_id:id}).then(res=>{
         console.log(res)
         Swal.fire(
           'Cancelled!',
           
         )
         getHistoryById()

        })
    }
  })
}
   
  

  return (
    <>
   <ComponentCard>
          <ToastContainer></ToastContainer>


         
         
                <table id="example" className="display">
        <thead title='Purchase Order Linked '>
            <tr >
                {columns.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </thead>
        <tbody>
          {history && history.map(element=>{
              return (<tr key={element.purchase_order_id}>
                <td>{moment(element.date).format('YYYY-MM-DD')}</td>
              <td>{element.amount}</td>
              <td>{element.mode_of_payment}</td>
              <td><Link to=""><span onClick={()=>Supplier(element.purchase_order_id)}>Cancel</span></Link></td>            
                </tr>)
          })}
        </tbody>
        {/* <tfoot>
        <tr>
                {columns.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </tfoot> */}
    </table> 
                
          
        </ComponentCard>
        
        
    </>
  )

                    }
export default SupplierHistory;