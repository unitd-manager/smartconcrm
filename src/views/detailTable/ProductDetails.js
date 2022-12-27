import React,{useState,useEffect} from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Button
  } from 'reactstrap';
  // import {useNavigate} from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { TextArea } from '@blueprintjs/core';
import ComponentCard from '../../components/ComponentCard';

import { createProduct } from '../../store/product/productSlice';


function ProductDetails() {

    const[title,setTitle]=useState(null);
     const dispatch=useDispatch();
  //  const navigate=useNavigate();
    const insertProduct=()=>{
      dispatch(createProduct())
    }

    const handleProductInputs=(e)=>{
      e.preventDefault();
       setTitle(e.target.value)
       console.log(title);
    }
    useEffect(()=>{},[])
  return (
    <>

<ComponentCard title="Key Details">
    <Form>
   
        <Row>
        <FormGroup>
                <Row>
                  <Col md="6">
                    <Row>
                    <Label> Product Name <span className='required'> *</span> </Label>
                    <TextArea type="text" value="" name="title" onChange={(e)=>handleProductInputs(e)} />
                    </Row>
                    </Col>
                </Row>
            </FormGroup>
        </Row>
   <Row>
    <Col md="10">
        <Button color="primary"  onClick={()=>{
          insertProduct();
        }} >
          Save & Continue
        </Button>
       
        
        <Button color="secondary" >
          Cancel
        </Button>
        </Col>
        </Row>
      </Form>
      </ComponentCard>

    </>
  )
}

export default ProductDetails