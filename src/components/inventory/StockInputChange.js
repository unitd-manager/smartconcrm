import React,{useState} from 'react'
import { Input,Button} from 'reactstrap'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { createAdjustStock } from '../../store/inventory/adjustStockSlice';


function StockInputChange({element,setStockinputOpen,stockinputOpen}) {
    StockInputChange.propTypes = {
        stockinputOpen: PropTypes.bool,
        setStockinputOpen: PropTypes.func,
        element:PropTypes.object
      }
const dispatch=useDispatch();
      const[actualStock,setActualStock]=useState()
      const [adjuststockDetails,setAdjuststockDetails]=useState({
        // inventory_id: "",
        //           product_id:"" ,
        //           adjust_stock: "",
        //           modified_by:"" ,
        //           created_by:"" ,
        //           current_stock:"",
        //           materials_used:""
      })

    const adjuststock=(elem)=>{
        const adjustStock=elem.stock - actualStock;
         setAdjuststockDetails({
           inventory_id: elem.inventory_id,
                     product_id:elem.productId ,
                     adjust_stock:adjustStock,
                     modified_by:"",
                     created_by:"" ,
                     current_stock:elem.stock,
                     materials_used:""
         })
         
       dispatch(createAdjustStock(adjuststockDetails))
       }
       console.log("adjust",adjuststockDetails);
    return (
    <div isOpen={stockinputOpen}>

   <Input type="number" name="actualStock" value={actualStock} defaultValue={element.stock} onChange={(e)=>setActualStock(e.target.value)}/><Button onSubmit={()=>{adjuststock(element);setStockinputOpen(false)}}>save</Button>
    </div>
  )
}

export default StockInputChange