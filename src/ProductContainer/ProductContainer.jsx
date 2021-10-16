import React, {useEffect,useState} from "react";
import UICard from "../UIComponent/UICard/UICard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product  from "./Product";
import ProductService from "./ProductService";
import { useDispatch } from 'react-redux'
import ACTIONS from '../Constants/actions';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ProductContainer = () => {

    const [_products,setProducts] = useState([])
    const [_selected,setSelected] = useState([])
    const [openError,setOpenError] = useState(false)


    const dispatch = useDispatch()


    const productService = new ProductService();

    
    const getProducts = async() => {
        try {
            let products = await productService.getAllProducts()
            if(products) {
                setProducts(products)
            }
        } catch(err) {
            //console.log(err)

        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    const selecteProduct  = (evt,selectedProduct) => {
        evt.preventDefault()

        if(selectedProduct.productCount<=0) {
            setOpenError(true);
            return ;
        }



        let newId = selectedProduct.id
        let newSelected  = [..._selected]

        const index = newSelected.indexOf(newId);
        if (index > -1) {
            newSelected.splice(index, 1);
            dispatch({ type: ACTIONS.PRODUCT_UNSELECTED,payload:selectedProduct })

        } else {
            newSelected.push(newId)
            dispatch({ type: ACTIONS.PRODUCT_SELECTED,payload:selectedProduct })
        }

        setSelected(newSelected)
    }



    return(
    <div style={{'padding':'12px'}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
          {
              _products.map((product,index)=>{
                let className = ''

                if(_selected.indexOf(product.id)>-1) {
                     className = 'product_selected'
                }

                  return (
                    <Grid item xs={6} sm = {6} md={3} lg={3}>
                        <div className = {className} onClick ={(evt)=>selecteProduct(evt,product)} style={{'cursor':'pointer'}}> 
                        <UICard clasess={['product_container']}>
                        <Product key = {index} data = {product}/>
                        </UICard>
                        </div>
                    </Grid>
              
                  )
              })
          }
  
      </Grid>
    </Box>

    <Dialog
        open={openError}
        onClose={()=>{
            setOpenError(false);


        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {'Sorry'} 
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontSize:'14px'}} id="alert-dialog-description">
              This Product Currently Not Available
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          style={{color:'goldenrod'}} 
          onClick={()=>{
            setOpenError(false);


          }}>Ok</Button>
        </DialogActions>
      </Dialog>


    </div>
    )

}

export default ProductContainer;