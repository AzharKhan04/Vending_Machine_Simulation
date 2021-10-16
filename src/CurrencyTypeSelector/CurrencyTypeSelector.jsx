import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CurrencyAddedTable from './CurrencyAddedTable';

//import services
import CurrencyListService from './CurrencyListService'
import order from '../Service/Order';

function CurrencyTypeSelector(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [options, setOption] = React.useState([
      '1','2','5','10','20','50','100','200','500','2000'
  ]);
  const [currencyOpted, setCurrencyOpted] = React.useState(100);

  const [count, setCount] = React.useState(1);

  const [currencyAdded, setCurrencyAdded] = React.useState({});




  const radioGroupRef = React.useRef(null);

  const getCurrencyList = () => {

  }

  React.useEffect(() => {
    getCurrencyList();
  }, []);



  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onChangeCurrencyOpted = (evt) => {
    setCurrencyOpted(Number(evt.target.value))
  }

  const onChangeCount = (evt) => {

    let num = evt.target.value
    if(!num || typeof num!=='string') {
        num = 1
    } else if(isNaN(evt.target.value)){
        num = 1
    }  else if(Number(evt.target.value)>100) {
        num =100
    }   else if(Number(evt.target.value)<=0) {
        num =1
    } else {
        num = Number(evt.target.value)
    }
    setCount(parseInt(num))    
    }


    const getPayAmount = ()=> {

        let amt = 0;

        if(!Object.keys(currencyAdded).length) {
            amt = amt+Number(currencyOpted)*Number(count)
        } else {

            Object.keys(currencyAdded).forEach((key)=>{

                amt =amt+ Number(key)*Number(currencyAdded[key])

            })

        }

        return `Pay ${amt}`


    }

    const addCurrency = () => {

        let newCurrencyAdded = {...currencyAdded}
        newCurrencyAdded[currencyOpted] = count
        setCurrencyAdded(newCurrencyAdded)
        setCurrencyOpted(100)
        setCount(1)
    }

    const handleFinalPay = () => {


        let newCurrencyAdded = {...currencyAdded}


        if(!Object.keys(currencyAdded).length) {
            newCurrencyAdded[currencyOpted] = count
    
        }

        console.log(newCurrencyAdded)



        order(props.productSelected,newCurrencyAdded).then((res)=>{
            onClose(res);

        }).catch((err)=>{

            onClose(err)


        })



    }

  

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
      <div style={{alignItems:'center',  display:'flex'}}>
          <div>{'Wallet'}</div>
          <div>
          {/* <AccountBalanceWalletIcon></AccountBalanceWalletIcon> */}

          </div>
</div>
      </DialogTitle>
      <DialogContent >
      <div style={{alignItems:'center',  display:'flex'}}>
        <div>  
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="demo-simple-select-autowidth"
          value={currencyOpted}
          onChange={onChangeCurrencyOpted}
          autoWidth
          label="Currency"
        >
          {
              options.map((option,index)=>{
                  return (
                    <MenuItem key = {index} value={option}>{option}</MenuItem>

                  )
              })
          }
        </Select>

      </FormControl>
      </div>
      <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>

      <TextField value = {count} onChange = {onChangeCount}    InputProps={{ inputProps: { min: 1, max: 100 } }}
  type = {'number'} id="count" label="Count" variant="outlined" />
</FormControl>
          </div>
          <div>
              <AddSharpIcon onClick = {addCurrency}></AddSharpIcon>
           </div>   
    </div>

    <div>
        <CurrencyAddedTable setData = {(newData)=>{
            setCurrencyAdded(newData)

        }} data= {currencyAdded}></CurrencyAddedTable>
     </div>   

      </DialogContent>
      <DialogActions>
        <Button style={{color:'goldenrod'}}  autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button style={{color:'goldenrod'}}   onClick={handleFinalPay}>{getPayAmount()}</Button>
      </DialogActions>
    </Dialog>
  );
}

CurrencyTypeSelector.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default CurrencyTypeSelector
