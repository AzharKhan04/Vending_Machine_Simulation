import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Header = () => {

    return (
        <div style={{padding:'12px'}}>

        <Grid container spacing={1}>
        <Grid item xs={12} sm = {12} md={12} lg={12}>
        <Typography style ={{color:'goldenrod'}} variant="h6" gutterBottom component="div">
        {'Vending Machine '}
      </Typography>
 
        </Grid>
        </Grid>
        </div>


    )

}


export default React.memo(Header);