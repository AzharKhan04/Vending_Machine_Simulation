import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';


import PropTypes from 'prop-types';


function CurrencyAddedTable(props) {

  const { data , setData} = props;

 

  const handleDelete = () => {

    console.log()
  };

  
  return (
     <React.Fragment>
         <div style={{display:'flex',flexWrap:'wrap'}}>
         {
             Object.keys(data).map((k,index)=>{
                let label = `${k} : ${data[k]}`

                 return (

                    <div style={{'padding':'4px'}} key = {index}>
                    <Stack key = {index} direction="row" spacing={2}>

                    <Chip
                      label={label}
                      onDelete={(evt)=>{

                        let newData = {...data}
                        delete newData[k]

                          setData(newData)
                      }}
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                    />
                  </Stack>
                  </div>
                
                 )
             })
         }
         </div>
     </React.Fragment>

  
  
  
  );
}

CurrencyAddedTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CurrencyAddedTable
