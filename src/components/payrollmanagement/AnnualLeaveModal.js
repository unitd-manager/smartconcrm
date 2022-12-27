import React, { useEffect } from 'react'
import { Card, CardBody,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import PropTypes from 'prop-types'
import { useSelector,useDispatch } from 'react-redux';
import { getAdjustStocks } from '../../store/inventory/adjustStockSlice';

function ViewAdjustStockHistoryModal({adjustStockHistoryModal,setAdjustStockHistoryModal,inventoryId}) {

    ViewAdjustStockHistoryModal.propTypes = {
        adjustStockHistoryModal: PropTypes.bool,
        setAdjustStockHistoryModal: PropTypes.func,
        inventoryId:PropTypes.string
      }
const dispatch=useDispatch();
      const adjustStocks=useSelector(state=>state.adjustStock.adjustStocks);

      const alcolumns = [
        
       
        {
          name: "Materials Used",
          selector: "materials_used",
          sortable: true,
          grow:0,
          wrap: true
        },
        
        {
          name: "Adjust Stock",
          selector: "adjust_stock",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Actual Stock",
          selector: "current_stock",
          sortable: true,
          grow:0,
        },
        {
            name: "Created/Updated By",
            selector: "created_by/modified_by",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          }
      ]
    useEffect(()=>{
        dispatch(getAdjustStocks())
    },[inventoryId])
    
  return (
    <>
    <Modal isOpen={adjustStockHistoryModal}>
    <ModalHeader>Adjust Stock History</ModalHeader>
    <ModalBody>
        <Row>
        <Col md="12">
        <Card>
            
            <CardBody>
            <table id="example" className="display">
          <thead>
              <tr >
                  {alcolumns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
             {adjustStocks&& adjustStocks.map(element=>{
                return (<tr key={element.adjust_stock_log_id}>
                <td>{element.materials_used}</td>
                <td>{element.adjust_stock}</td>
                <td>{element.current_stock}</td>
                <td>{element.created_by}</td>
            
                </tr>
                )
            })}

</tbody> 
          </table>
            </CardBody>
        </Card>
        </Col>
        </Row>  
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={()=>{setAdjustStockHistoryModal(false)}}> Submit </Button>
        <Button color="secondary" onClick={()=>{setAdjustStockHistoryModal(false)}}> Cancel </Button>
    </ModalFooter>
</Modal> 
</>
  )
}

export default ViewAdjustStockHistoryModal