import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Product = ({data}) => {

    return (

        <React.Fragment>

        {/* <div style={{textAlign:'start'}}>
            <img width={"100%"}  src="https://rukminim1.flixcart.com/image/832/832/klscivk0/spice-masala/0/5/q/turmeric-powder-pouch-tata-sampann-powder-original-imagytt7kkkcgbmk.jpeg?q=70"/>

         </div>    */}

        <div style = {{display:'flex',flexDirection:'column'}}>

<div style={{textAlign:'start',  paddingTop:'10px'}}>

{data.productName}

 </div>

 <div style={{textAlign:'start',paddingTop:'10px'}}>
<strong> &#x20B9;{`${data.productPrice || ''}`}</strong>
</div>


          </div>  

</React.Fragment>






        



    )



}

Product.defaultProps = {
    data:{}
}

export default Product;