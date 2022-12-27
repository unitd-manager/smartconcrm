import React,{ useState,useEffect } from 'react';
import { Row,Col,FormGroup,Input,Button,Label,Form } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
// import message from '../Message';
import { useParams } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { convertToRaw} from 'draft-js';
import { useDispatch,useSelector } from 'react-redux';
import { getProduct,updateProduct} from '../../store/product/productSlice';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AddPictureModal from '../../components/product/AddPictureModal';
import RelatedPictureModal from '../../components/product/RelatedPictureModal';


const ComponentCard = React.lazy(() => import('../../components/ComponentCard'))

const ProductEdit = () => 

{
    const {id}=useParams();

       //redux
    const dispatch=useDispatch();
    const product=useSelector(state=>state.product.product)
    // const lineitem=useSelector(state=>state.lineItem.lineItem)

    //   Get product Edited Value
    const [productData, setProductData] = useState();
    const [description, setDescription] = useState('')
    const [addPictureModal, setAddPictureModal] = useState(false)
    const [relatedPictureModal, setRelatedPictureModal] = useState(false)
    const [getFile, setGetFile] = React.useState(null);

      const handleData = (e) => {
        setProductData({...productData, [e.target.name]:e.target.value});
      }
     
      const editProductData = () =>
    {
      // api.post('/tender/edit-Tenders',tenderDetails)
      dispatch(updateProduct(productData)).then(()=> {
        
        message('Record editted successfully','success')
        setTimeout(() => {
          window.location.reload()
        }, 300);

      })
        .catch(() => {
          message('Unable to edit record.','error')
        })
    }

      
    // const GetEditProduct = () => {

    //     // api.post('/tender/edit-TabProduct',productData)
    //     dispatch(updateProduct(productData)).then((res)=> {
    //       console.log('edit product',res.data.data)
    //         message('product Edited Successfully.','success')
    //         window.location.reload()
    //     }).catch(()=>{
    //         message('Unable to edit product. please fill all fields','error')
    //     })
    // }

    const handleDataEditor = (e,type) =>{
        
            setProductData({...product, [type]:draftToHtml(convertToRaw(e.getCurrentContent()))});

    }

    


   
    const getProductById = () =>
    {
       // api.post('/Product/getProductsById',{opportunity_id:id})

     try{
       dispatch(getProduct(id))
           setProductData(product)
           console.log(product)
        //    convertHtmlToDraft(product)
           console.log(description)
           
       }
      catch(error) {
        message("Product Data Not Found",'info')
       }
    }

     // get Files
     const getFiles = () => {
        api.get('/file/getFileList')
        .then((res)=>{
          setGetFile(res.data.reverse());
           console.log("Uploaded File",res.data)
        })
    }
console.log(product);
    useEffect(() => {
        getProductById();
      getFiles()
    
    }, [id])
    
    
  return (
    <>
     {/*  Edit Product Modal */}

     <BreadCrumbs heading={product && product.title} />
       
        
        <FormGroup>
            <ComponentCard title="Edit Product">
                <Form>
                    <FormGroup>
                    
                        <Row>
                       
                        <Col md="3">
                            <FormGroup>
                            <Label>Item Code</Label>
                            <Input type="text" name='item_code' value={product && product.item_code} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Product Name</Label>
                            <Input type="text" name="title" value={product && product.title} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Category</Label>
                            <Input type="select" name="category_id" value={product && product.category_id} onChange={handleData}>
                            <option  value="New" selected="selected">New</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Awarded">Awarded</option>
                            <option value="Not Awarded">Not Awarded</option>
                            <option value="Cancelled">Cancelled</option>
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Unit</Label>
                            <Input type="text" name="unit" value={product && product.unit} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        </Row>
                        
                        <Row>
                        <Col md="3">
                            <FormGroup>
                            <Label>List Price</Label>
                                <Input type="text" name="price" value={product && product.price} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Product Type</Label>
                            <Input type="select" name="product_type"  value={product && product.product_type} onChange={handleData}>
                                <option value="" selected="selected">Please Select</option>
                                <option  value="materials">Materials</option>
                                <option value="tools">Tools</option>
                                
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Short Description</Label>
                                <Input type="text" name="description_short" value={product && product.description_short} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                        <Label>Published</Label>

                            {/* <Form inline>
                                <div className="form-check form-check-inline">
                                <Input
                                    className="form-check-input"
                                    id="inlineradio1"
                                    type="radio"
                                    name="published"
                                    defaultValue="1"
                                    value={product && product.published} onChange={handleData}
                                />
                                <Label for="inlineradio1">yes</Label>
                                </div>
                                <div className="form-check form-check-inline">
                                <Input
                                    className="form-check-input"
                                    id="inlineradio2"
                                    type="radio"
                                    name="published"
                                    defaultValue="0"
                                    value={product && product.published} onChange={handleData}
                                />
                                <Label for="inlineradio2">No</Label>
                                </div>
                          </Form> */}
                          <Form>
<FormGroup check>
<Input name="published" defaultChecked={product && product.published === 1} type="radio" value={1} defaultValue={product && product.published} onChange={(e)=>{handleData(e); console.log(e.target.value);}}/>{' '}
<Label check>Yes</Label>
</FormGroup>
<FormGroup check>
    <Input name="published" defaultChecked={product && product.published === 0 } type="radio" value={0} defaultValue={product && product.published} onChange={(e)=>{handleData(e); console.log(e.target.value);}}/>{' '}
    <Label check> No </Label>
</FormGroup>
</Form>
                        </Col>
                    
                        <ComponentCard title="Description">
                        
                        <Editor
                            editorState={description}
                            value={product && product.description}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            onEditorStateChange={(e)=>{
                                handleDataEditor(e,'intro_drawing_quote')
                                 setDescription(e)
                            }}
                        />
                       </ComponentCard>
                       </Row>
                        <Row>
                        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                            <Button type="button" className="btn btn-success mr-2" onClick={()=>{editProductData()}} >
                            Save & Continue
                            </Button>
                            <Button color="secondary" >Cancel</Button>
                        </div>
                        </Row>

                    
                    </FormGroup> 
                
                </Form>
                </ComponentCard>
            </FormGroup>
        {/* creation & modification */}
<Row>
    <ComponentCard title="Creation and Modification" >
    <Row>
        <span>Created By  : </span>
        <span>Modified By : </span>
    </Row>
    </ComponentCard>
</Row>
    {/* END Edit Quote Modal */}
   
                    <Row>
                    <ComponentCard title="Picture">
                        <Button color="primary" onClick={()=>setAddPictureModal(true)}>
                           Add Picture
                        </Button>
                        <AddPictureModal productId={id} addPictureModal={addPictureModal} setAddPictureModal={setAddPictureModal} />

{getFile ? getFile.map(res=>{
         return (
           <>
             <a href={res.url}>{res.name}</a><br></br>
         </>
         )
     }) : (<p>no files uploaded yet</p>)}
                    </ComponentCard>
                    </Row>
                    <Row>
    <ComponentCard title="Related Picture">
                        <Button color="primary" onClick={()=>setRelatedPictureModal(true)}>
                            Add Picture
                        </Button>
                        <RelatedPictureModal productId={id} relatedPictureModal={relatedPictureModal} setRelatedPictureModal={setRelatedPictureModal} />

{getFile ? getFile.map(res=>{
         return (
           <>
             <a href={res.url}>{res.name}</a><br></br>
         </>
         )
     }) : (<p>no files uploaded yet</p>)}
                    </ComponentCard>
                    </Row>
</>
  )
}

export default ProductEdit
