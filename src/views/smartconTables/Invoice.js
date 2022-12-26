import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import moment from 'moment';
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import api from '../../constants/api';


const InvoiceData = () => {
    const [invoice,setInvoice] = useState(null);
    const getInvoice = () =>{
      api.get('/invoice/getMainInvoice')
        .then((res)=> {
            setInvoice(res.data.data)
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
    
        getInvoice()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "invoice_id",
          grow:0,
          wrap: true,
          width:'4%'
        },

        {
          name: "Invoice Code",
          selector: "invoice_code",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Project Name",
          selector: "title",
          sortable: true,
          grow:0,
        },
        {
          name: "Client Name",
          selector: "company_name",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Invoice Date",
          selector: "invoice_date",
          sortable: true,
          grow:0,
        },
        {
            name: "Amount",
            selector: "invoice_amount",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Due Date",
            selector: "invoice_due_date",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Age",
            selector: "age",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Status",
            selector: "status",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Type",
            selector: "invoice_type",
            sortable: true,
            width:'auto',
          },
      ]
  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
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
            {invoice && invoice.map(element=>{
                return (<tr key={element.invoice_id}>
                <td>{element.invoice_id}</td>
                <td>{element.invoice_code}</td>
                <td>{element.title}</td>
                <td>{element.company_name}</td>
                <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                <td>{element.invoice_amount}</td>
                <td>{moment(element.invoice_due_date).format('YYYY-MM-DD')}</td>
                <td>{element.age}</td>
                <td>{element.status}</td>
                <td>{element.invoice_type}</td>
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

export default InvoiceData;