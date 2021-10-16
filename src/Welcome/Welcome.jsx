import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Welcome = () => {

    return (
        <div style={{padding:'12px'}}>
        <Grid style={{textAlign:'start'}} container spacing={1}>
        <Grid item xs={12} sm = {12} md={12} lg={12}>
        <Typography style ={{color:'goldenrod'}} variant="h5" gutterBottom component="div">
        {' Hello there'}
      </Typography>
 
        </Grid>
        <Grid item xs={12} sm = {12} md={12} lg={12}>
        <Typography style ={{color:'lightgrey'}} variant="" gutterBottom component="div">
        {' Please click on the products below to buy'}
      </Typography>
 
        </Grid>

        </Grid>
        </div>

    )

}


export default React.memo(Welcome);