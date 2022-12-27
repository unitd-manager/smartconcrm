import React,{useEffect} from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
// import api from '../../constants/api';
import { getProducts,deleteProduct } from '../../store/product/productSlice';

const Test = () => {
    // const [productsdata,setproductsdata] = useState(null);
    const dispatch=useDispatch();
    const products =useSelector(state=>state.product.products);
    const getAllProducts = () =>{
      // api.get('/product/getProducts')
      //   .then((res)=> {
      //       setproducts(res.data.data)
      //       console.log(res.data.data)
      //   })

      dispatch(getProducts());
      // setproductsdata(products);
      console.log(products);
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
                          ],
                        //   columnDefs: [
                        //   { visible: false, targets: 1 }
                        // ],
    searching: true
                }
            );
          
            } ,
            1000
            );
    
        getAllProducts()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "product_id",
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
          name: "Item Code",
          selector: "item_code",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Product Name",
          selector: "title",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Product Type",
          selector: "product_type",
          sortable: true,
          grow:0,
        },
        {
            name: "Price",
            selector: "price",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Unit",
            selector: "unit",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Stock",
            selector: "qty_in_stock",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Updated By",
            selector: "modified_by",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Published",
            selector: "published",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
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
            dispatch(deleteProduct(id))
           .then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Product has been deleted.',
                'success'
              )
              getAllProducts()

            })
          }
        })


        // api.get(`/product/deleteProduct/${opportunity_id}`)
        //  .then((res)=> {
        //      setproducts(res.data.data)
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
            <Link to="/ProductDetails">
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
            {products&& products.map(element=>{
                return (<tr key={element.product_id}>
                <td>{element.product_id}</td>
                <td><Link to={`/ProductEdit/${element.product_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.product_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.item_code}</td>
                <td>{element.title}</td>
                <td>{element.product_type}</td>
                <td>{element.price}</td>
                <td>{element.unit}</td>
                <td>{element.qty_in_stock}</td>
                <td>{element.modified_by}</td>
                <td>{element.published}</td>
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
      </div>
    </div>)
}

export default Test;