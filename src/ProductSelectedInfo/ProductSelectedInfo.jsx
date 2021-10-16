import * as React from 'react';
import {  connect } from 'react-redux'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import CurrencyTypeSelector from '../CurrencyTypeSelector';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DialogContentText from '@mui/material/DialogContentText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ProductSelectedInfo = (props) => {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('INR');
    const [openTransactionInfoModal, setOpenTransactionInfoModal] = React.useState(false);
    const [transactionInfoData, setTransactionInfoData] = React.useState({});





    const [currencyTypeSelectorKey, setCurrencyTypeSelectorKey] = React.useState(1);



    const handleClickListItem = () => {
        setOpen(true);
      };
    
      const handleClose = (data=null) => {
        setOpen(false);
        setCurrencyTypeSelectorKey(currencyTypeSelectorKey+1);



        if(data) {
            setOpenTransactionInfoModal(true)
            setTransactionInfoData(data)
        }

    
      };

    const getPayAmount = () => {
        let amt = 0;
        props.productSelected.forEach((ps)=>{
            amt = amt+Number(ps.productPrice)
        })
        return amt
    }

    const getChangeRecived = () => {

      let result = 0;

      if(transactionInfoData && transactionInfoData.change) {
        Object.keys(transactionInfoData.change).forEach((o)=>{
          result = result + Number(o)*transactionInfoData.change[o]
        })


      }

      return result
    }

      

    return (
      <React.Fragment>
          {
              props.productSelected  && props.productSelected.length ?
                      <Box sx={{ flexGrow: 1 }}>
                      <Grid alignItems={"center"} container spacing={2}>
                        <Grid item xs={12} sm = {12} lg = {12}>
                        <Typography variant="h3" gutterBottom component="div">
                        <Button onClick = {()=>{
                            setOpen(true);

                        }} style={{width:'90%',color:'goldenrod',border:'1px solid goldenrod'}}  variant="outlined">Proceed to pay &#8377; {getPayAmount()}
                        <ArrowForwardIcon></ArrowForwardIcon>
                        </Button>
              
                    </Typography>
              
                        </Grid>
              
                      </Grid>
                    </Box> : <></>
              
          }
        <CurrencyTypeSelector
          id="ringtone-menu"
          keepMounted
          open={open}
          productSelected = {props.productSelected}
          onClose={handleClose}

          key = {currencyTypeSelectorKey}
          value={value}
        />
        {
                  <Dialog
                  open={openTransactionInfoModal}
                  onClose={()=>{
                    setOpenTransactionInfoModal(false)
                    window.location.reload()


                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle style={{fontSize:'16px'}} id="alert-dialog-title">
                   
                   {
                     transactionInfoData.message ?
                     <div style ={{textAlign:'center',color:'goldenrod'}}>
                     <CheckCircleOutlineIcon iconStyle={{fontSize:'200px'}} ></CheckCircleOutlineIcon>

                     </div>
                     : null
                   }
                   {transactionInfoData.message || transactionInfoData.error}
                   
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            transactionInfoData.data ? 
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                            {
                                transactionInfoData.data.map((product,index)=>{
                   
                                    return (
                   
                                       <div style={{'padding':'4px'}} key = {index}>
                                       <Stack key = {index} direction="row" spacing={2}>
                   
                                       <Chip
                                         label={product.productName}   
                                         variant="outlined"
                                       />
                                     </Stack>
                                     </div>
                                   
                                    )
                                })
                            }
                            </div> : <div></div>
                   
                        }

                        {
                            transactionInfoData.change ? 
                            <React.Fragment>
                            <div style={{'fontSize':'16px',textAlign:'center',paddingTop:'30px'}}>
                            {"Please Collect Your Change "}
                            &#x20B9;
                            {getChangeRecived()}

                             </div>   
                            <div style={{display:'flex',flexWrap:'wrap'}}>



                                {
            Object.keys(transactionInfoData.change).map((k,index)=>{
                let label = `${k} : ${transactionInfoData.change[k]}`

                 return (

                    <div style={{'padding':'4px'}} key = {index}>
                    <Stack key = {index} direction="row" spacing={2}>

                    <Chip
                      label={label}
                                            variant="outlined"
                    />
                  </Stack>
                  </div>
                
                 )
             })
         }


                            </div>
                            </React.Fragment> : <div></div>
                   
                        }


                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                    style={{color:'goldenrod'}} 
                    
                    onClick={()=>{
                        setOpenTransactionInfoModal(false)
                        window.location.reload()
                    }} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
          




        }

      </React.Fragment>

    )
}

const mapStateToProps =(state) => ({
    productSelected : state.productSelected
    }
)


export default connect(mapStateToProps,{})(ProductSelectedInfo);